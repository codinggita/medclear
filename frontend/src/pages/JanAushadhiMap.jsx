import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Phone, Map as MapIcon, ChevronRight, Loader2, X, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import { fetchNearbyStores } from '../services/storeService';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function JanAushadhiMap({ 
  onLogout, 
  onNavigateToUpload, 
  onNavigateToDashboard, 
  onNavigateToReports, 
  onNavigateToInsights, 
  onNavigateToGovData, 
  onNavigateToProfile,
  onNavigateToNotifications,
  currentPage 
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  const MAPPLS_KEY = import.meta.env.VITE_MAPPLS_API_KEY || 'your_default_key';

  useEffect(() => {
    // 1. Get User Location
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        loadMapplsScript(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Please enable location access to find nearby stores');
        setIsLoading(false);
        // Fallback to a default location (e.g., Delhi)
        const fallbackLat = 28.6139;
        const fallbackLng = 77.2090;
        setUserLocation({ lat: fallbackLat, lng: fallbackLng });
        loadMapplsScript(fallbackLat, fallbackLng);
      }
    );
  }, []);

  const loadMapplsScript = (lat, lng) => {
    if (window.mappls) {
      initMap(lat, lng);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_KEY}/map_sdk?v=3.0&libraries=direction,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTimeout(() => initMap(lat, lng), 500);
    };
    script.onerror = () => setError('Failed to load map SDK');
    document.head.appendChild(script);
  };

  const initMap = (lat, lng) => {
    if (!window.mappls || !mapRef.current) return;

    try {
        mapInstance.current = new window.mappls.Map('mappls-map', {
          center: { lat, lng },
          zoom: 12,
          hybrid: true
        });

        const onMapLoad = () => {
          setMapLoaded(true);
          addUserMarker(lat, lng);
          getStores(lat, lng);
        };

        if (mapInstance.current.on) {
            mapInstance.current.on('load', onMapLoad);
        } else if (mapInstance.current.addListener) {
            mapInstance.current.addListener('load', onMapLoad);
        } else {
            onMapLoad();
        }
    } catch (e) {
        console.error("Map init error:", e);
        setError("Error initializing map container");
    }
  };

  const addUserMarker = (lat, lng) => {
    if (!window.mappls || !mapInstance.current) return;
    
    try {
        new window.mappls.Marker({
          map: mapInstance.current,
          position: { lat, lng },
          icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          width: 40,
          height: 40,
          popupHtml: '<div>Your Location</div>'
        });
    } catch (e) {
        console.error("User marker error:", e);
    }
  };

  const getStores = async (lat, lng) => {
    try {
      const response = await fetchNearbyStores(lat, lng);
      if (response && response.success) {
        setStores(response.data);
        plotStoreMarkers(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stores:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const plotStoreMarkers = (storesData) => {
    if (!window.mappls || !mapInstance.current) return;

    if (markersRef.current) {
        markersRef.current.forEach(m => m.remove && m.remove());
    }
    markersRef.current = [];

    storesData.forEach(store => {
      try {
          const marker = new window.mappls.Marker({
            map: mapInstance.current,
            position: { 
              lat: store.location.coordinates[1], 
              lng: store.location.coordinates[0] 
            },
            title: store.name,
            width: 35,
            height: 35
          });

          marker.addListener('click', () => {
            handleStoreSelect(store);
          });

          markersRef.current.push(marker);
      } catch (e) {
          console.error("Marker plot error:", e);
      }
    });
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    calculateRoute(store);
    
    if (mapInstance.current && mapInstance.current.setCenter) {
        mapInstance.current.setCenter({
          lat: store.location.coordinates[1],
          lng: store.location.coordinates[0]
        });
        mapInstance.current.setZoom(15);
    }
  };

  const calculateRoute = (store) => {
    if (!window.mappls || !userLocation || !mapInstance.current) return;

    if (typeof window.mappls.direction !== 'function') {
        console.warn('Mappls Direction plugin not ready');
        setRouteInfo({
            distance: calculateDistance(userLocation.lat, userLocation.lng, store.location.coordinates[1], store.location.coordinates[0]).toFixed(2),
            duration: '?'
        });
        return;
    }

    try {
        const directionOption = {
          map: mapInstance.current,
          start: { lat: userLocation.lat, lng: userLocation.lng },
          end: { lat: store.location.coordinates[1], lng: store.location.coordinates[0] },
          callback: (res) => {
            if (res && res.routes && res.routes.length > 0) {
              const route = res.routes[0];
              setRouteInfo({
                distance: (route.distance / 1000).toFixed(2),
                duration: Math.round(route.duration / 60)
              });
            }
          }
        };

        if (polylineRef.current && polylineRef.current.remove) {
            polylineRef.current.remove();
        }

        window.mappls.direction(directionOption, (res) => {
            polylineRef.current = res;
        });
    } catch (e) {
        console.error("Routing error:", e);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-background transition-colors duration-300"
    >
      <Navbar
        onLogout={onLogout}
        onNavigateToUpload={onNavigateToUpload}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToReports={onNavigateToReports}
        onNavigateToInsights={onNavigateToInsights}
        onNavigateToGovData={onNavigateToGovData}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToNotifications={onNavigateToNotifications}
        onNavigateToJanAushadhi={() => {}}
        currentPage={currentPage}
      />

      <main className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-96 bg-card border-r border-primary/10 flex flex-col z-10 shadow-xl">
          <div className="p-6 border-b border-primary/10">
            <h2 className="font-serif text-2xl text-text-main flex items-center gap-2">
              <MapIcon className="text-primary" />
              Nearby Stores
            </h2>
            <p className="text-primary text-sm mt-1">
              Find government-certified Jan Aushadhi stores near you
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="animate-spin text-primary mb-4" size={32} />
                <p className="text-primary">Finding stores...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 flex items-start gap-3">
                <Info className="text-red-500 shrink-0" size={20} />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            ) : stores.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="mx-auto text-primary/30 mb-4" size={48} />
                <p className="text-primary">No stores found within 10km.</p>
              </div>
            ) : (
              stores.map(store => (
                <motion.div
                  key={store._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStoreSelect(store)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedStore?._id === store._id
                      ? 'bg-primary border-primary shadow-lg text-white'
                      : 'bg-background border-primary/10 text-text-main hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold leading-tight">{store.name}</h3>
                    <Navigation size={16} className={selectedStore?._id === store._id ? 'text-white/80' : 'text-primary'} />
                  </div>
                  <p className={`text-sm mb-3 ${selectedStore?._id === store._id ? 'text-white/80' : 'text-primary/70'}`}>
                    {store.address}, {store.city}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    {store.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {store.phone}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
          <AnimatePresence>
            {selectedStore && routeInfo && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="p-6 bg-[#8D7B68] text-white border-t border-white/10"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-wider font-bold mb-1">Shortest Route</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{routeInfo.distance}</span>
                      <span className="text-sm opacity-80">km away</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs uppercase tracking-wider font-bold mb-1">Est. Time</p>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-2xl font-bold">{routeInfo.duration}</span>
                      <span className="text-sm opacity-80">mins</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="w-full mt-4 py-3 bg-white text-[#8D7B68] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedStore.location.coordinates[1]},${selectedStore.location.coordinates[0]}&travelmode=driving`;
                    window.open(url, '_blank');
                  }}
                >
                  <Navigation size={18} />
                  Start Navigation
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div id="mappls-map" ref={mapRef} className="w-full h-full" />
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center">
                <Loader2 className="animate-spin text-[#8D7B68] mb-4" size={40} />
                <h3 className="font-serif text-xl text-[#1a1a1a]">Initializing Map</h3>
                <p className="text-[#8D7B68] text-sm mt-2">Connecting to Mappls SDK...</p>
              </div>
            </div>
          )}

          {selectedStore && (
            <button 
              onClick={() => setSelectedStore(null)}
              className="absolute top-6 right-6 p-3 bg-white rounded-2xl shadow-xl text-[#8D7B68] hover:bg-[#8D7B68] hover:text-white transition-all z-20"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </main>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C8B6A6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8D7B68;
        }
      `}</style>
    </motion.div>
  );
}
