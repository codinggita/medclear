# 🏥 MedClear - The Ultimate Medical Bill Audit Platform

<p align="center">
  <img src="public/logo.png" alt="MedClear Logo" width="120" />
  <br/>
  <sub>India's #1 Medical Bill Verification Platform</sub>
</p>

---

## 🚀 Project Overview

**MedClear** is a world-class, ultra-premium landing page for a medical billing fraud detection startup. Built with React + Tailwind CSS, it features a stunning newspaper-inspired design that combines classic editorial aesthetics with modern SaaS functionality.

### ✨ Key Features

- 🗞️ **Breaking News Ticker** - Animated scrolling headlines
- 📰 **Newspaper-Style Design** - Heavy typography, black borders, Georgia serif fonts
- 📊 **Interactive Analytics** - Real-time charts (Bar, Line, Pie)
- 🔍 **Live Bill Demo** - Upload and analyze medical bills
- 🏛️ **Government Database** - NPPA, CGHS, Ayushman Bharat integration
- 💬 **FAQ Accordion** - Expandable Q&A section
- 📱 **Fully Responsive** - Works on all devices

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **Tailwind CSS 4** | Styling |
| **Recharts** | Data Visualization |
| **Framer Motion** | Animations |
| **Vite** | Build Tool |
| **ESLint** | Code Quality |

---

## 🎨 Design System

### Color Palette

```css
--background: #E3D5CA;    /* Warm cream */
--card: #C8B6A6;          /* Card backgrounds */
--primary: #8D7B68;        /* Primary brown */
--secondary: #A4907C;      /* Secondary tan */
--red: #ef4444;            /* Overcharge alerts */
--blue: #2563eb;           /* CTA buttons */
--green: #22c55e;          /* Valid items */
```

### Typography

- **Headlines**: Georgia, serif
- **Body**: Inter, sans-serif  
- **Accents**: Bold, uppercase, tracking-widest

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── logo.png          # MedClear logo
│   └── favicon.png       # Website favicon
├── src/
│   ├── components/
│   │   └── LandingPage.jsx    # Main landing page
│   ├── assets/
│   │   └── hero.png
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🖥️ Development Server

```bash
npm run dev
```

Opens at: **http://localhost:5173**

---

## 📦 Build for Production

```bash
npm run build
```

Output in: `frontend/dist/`

---

## 🎯 Page Sections

1. **Breaking News Ticker** - Rotating headlines at top
2. **Hero** - Giant "STOP OVERPAYING FOR HEALTHCARE" cover story
3. **Bill Mockup** - Interactive hospital bill with overcharge detection
4. **Analytics** - 3 charts showing price comparisons, trends, savings
5. **Features** - 4 card grid (OCR, Smart Matching, Price Comparison, Bill Audit)
6. **Interactive Demo** - Live bill upload/analysis split panel
7. **Testimonials** - Success stories with quotes
8. **Government Database** - Real NPPA/CGHS/Ayushman panels
9. **FAQ** - 5 expandable questions
10. **CTA** - Final "Know Before You Pay" section
11. **Footer** - Newsletter, contact, links

---

## 🔧 Configuration

### Tailwind CSS

Configuration in `vite.config.js` using `@tailwindcss/vite`:

```javascript
import tailwindcss from '@tailwindcss/vite'
```

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|-----------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 🎨 Design Principles

- ✅ Heavy black borders (2px/4px)
- ✅ Hard shadows (box-shadow: 8px 8px 0px #000)
- ✅ Georgia serif for headlines
- ✅ Bold uppercase kickers
- ✅ Staggered animations
- ✅ Pulsing alerts for overcharges
- ✅ Clean white/cream contrast
- ❌ No clutter
- ❌ No gradients except essential
- ❌ No student-level design

---

## 🏆 Credits

**MedClear** - The Medical Billing Authority

Built with ❤️ in India

---

## 📄 License

MIT License

---

<p align="center">
  <sub>Made with ❤️ for Hackathon Club 2024</sub>
</p>