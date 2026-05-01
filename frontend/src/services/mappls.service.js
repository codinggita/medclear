/**
 * Mappls (MapmyIndia) Service
 * 
 * Handles:
 *  - Loading the Mappls JS SDK + plugins (nearby, direction)
 *  - Searching nearby Jan Aushadhi stores using Mappls Nearby Plugin
 *  - Haversine distance calculation
 *  - Finding the nearest store from a list
 * 
 * NO backend dependency — everything runs client-side via Mappls APIs.
 */

const MAPPLS_KEY = import.meta.env.VITE_MAPPLS_API_KEY;

// ─── SDK Loading ───────────────────────────────────────────────

let mapSdkPromise = null;
let pluginSdkPromise = null;

/**
 * Load the main Mappls Map SDK script (only once).
 */
export function loadMapplsMapSDK() {
  if (mapSdkPromise) return mapSdkPromise;

  if (window.mappls && window.mappls.Map) {
    mapSdkPromise = Promise.resolve(window.mappls);
    return mapSdkPromise;
  }

  mapSdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="map_sdk"]');
    if (existing) {
      existing.addEventListener('load', () => {
        waitForMappls().then(resolve).catch(reject);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_KEY}/map_sdk?v=3.0&libraries=direction,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      waitForMappls().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error('Failed to load Mappls Map SDK'));
    document.head.appendChild(script);
  });

  return mapSdkPromise;
}

/**
 * Load the Mappls Plugins SDK (nearby, place search, etc.) — only once.
 */
export function loadMapplsPlugins() {
  if (pluginSdkPromise) return pluginSdkPromise;

  pluginSdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="map_sdk_plugins"]');
    if (existing) {
      existing.addEventListener('load', () => {
        waitForMappls().then(resolve).catch(reject);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_KEY}/map_sdk_plugins?v=3.0&libraries=nearby`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      waitForMappls().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error('Failed to load Mappls Plugins'));
    document.head.appendChild(script);
  });

  return pluginSdkPromise;
}

function waitForMappls(retries = 20) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      if (window.mappls) {
        resolve(window.mappls);
      } else if (attempts < retries) {
        attempts++;
        setTimeout(check, 250);
      } else {
        reject(new Error('Mappls SDK not available after waiting'));
      }
    };
    check();
  });
}

// ─── Nearby Search ─────────────────────────────────────────────

/**
 * Search for nearby Jan Aushadhi stores using Mappls Nearby Plugin.
 * 
 * @param {object} mapInstance - The initialized Mappls map instance
 * @param {number} lat - User latitude
 * @param {number} lng - User longitude
 * @returns {Promise<Array>} - Array of store objects with { placeName, placeAddress, lat, lng, distance, eLoc }
 */
export function searchNearbyStores(mapInstance, lat, lng) {
  return new Promise((resolve) => {
    if (!window.mappls || typeof window.mappls.nearby !== 'function') {
      console.warn('Mappls nearby plugin not loaded, trying alternative search...');
      // Fallback: try the search/place plugin or return empty
      resolve([]);
      return;
    }

    const searchQueries = [
      'Jan Aushadhi',
      'Janaushadhi Kendra',
      'Pradhan Mantri Bhartiya Janaushadhi Kendra',
    ];

    let allResults = [];
    let completed = 0;

    searchQueries.forEach((query) => {
      try {
        const options = {
          map: mapInstance,
          keywords: query,
          refLocation: [lat, lng],
          fitbounds: false,
          radius: 10000, // 10 km
        };

        window.mappls.nearby(options, (data) => {
          completed++;
          if (data && data.suggestedLocations) {
            allResults = [...allResults, ...data.suggestedLocations];
          } else if (data && Array.isArray(data)) {
            allResults = [...allResults, ...data];
          }
          
          if (completed === searchQueries.length) {
            // Deduplicate by eLoc or by name+coordinates
            const unique = deduplicateStores(allResults);
            // Normalize store format
            const stores = unique.map(normalizeStore);
            // Sort by distance from user
            stores.sort((a, b) => {
              const dA = haversineDistance(lat, lng, a.lat, a.lng);
              const dB = haversineDistance(lat, lng, b.lat, b.lng);
              return dA - dB;
            });
            resolve(stores);
          }
        });
      } catch (err) {
        completed++;
        console.error(`Nearby search error for "${query}":`, err);
        if (completed === searchQueries.length) {
          const unique = deduplicateStores(allResults);
          const stores = unique.map(normalizeStore);
          stores.sort((a, b) => {
            const dA = haversineDistance(lat, lng, a.lat, a.lng);
            const dB = haversineDistance(lat, lng, b.lat, b.lng);
            return dA - dB;
          });
          resolve(stores);
        }
      }
    });
  });
}

/**
 * Remove duplicate stores from results by eLoc or coordinate proximity
 */
function deduplicateStores(stores) {
  const seen = new Set();
  return stores.filter((store) => {
    const key = store.eLoc || `${store.latitude || store.lat}_${store.longitude || store.lng}_${store.placeName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Normalize store object from Mappls API response to a consistent format
 */
function normalizeStore(raw) {
  return {
    id: raw.eLoc || raw.placeId || `${raw.latitude || raw.lat}_${raw.longitude || raw.lng}`,
    placeName: raw.placeName || raw.name || 'Jan Aushadhi Store',
    placeAddress: raw.placeAddress || raw.address || raw.vicinity || '',
    lat: parseFloat(raw.latitude || raw.lat || 0),
    lng: parseFloat(raw.longitude || raw.lng || 0),
    distance: raw.distance ? parseFloat(raw.distance) : null,
    eLoc: raw.eLoc || null,
    phone: raw.contactNumber || raw.phone || null,
    category: raw.categoryCode || raw.keywords || '',
  };
}

// ─── Haversine Distance ────────────────────────────────────────

/**
 * Calculate distance between two coordinates using Haversine formula.
 * @returns {number} Distance in kilometers
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// ─── Find Nearest Store ────────────────────────────────────────

/**
 * Find the nearest store from a list of stores relative to user position.
 * @param {Array} stores - Array of normalized store objects
 * @param {number} userLat
 * @param {number} userLng
 * @returns {{ store: object, distance: number } | null}
 */
export function findNearestStore(stores, userLat, userLng) {
  if (!stores || stores.length === 0) return null;

  let nearest = null;
  let minDist = Infinity;

  stores.forEach((store) => {
    const dist = haversineDistance(userLat, userLng, store.lat, store.lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = store;
    }
  });

  return nearest ? { store: nearest, distance: minDist } : null;
}
