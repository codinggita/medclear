# <center>🏥 MedClear</center>

**Detect Healthcare Overcharging Instantly**

---

<p align="center">
  <img src="https://img.shields.io/badge/status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome">
  <img src="https://img.shields.io/github/last-commit/medclear/medclear?style=for-the-badge" alt="Last Commit">
  <img src="https://img.shields.io/github/contributors/medclear/medclear?style=for-the-badge" alt="Contributors">
  <img src="https://img.shields.io/github/stars/medclear/medclear?style=for-the-badge" alt="Stars">
</p>

---

MedClear is an AI-powered healthcare billing audit tool that detects overcharging in hospital bills using OCR (Optical Character Recognition) and intelligent price comparison against NPPA + CGHS government pricing standards.

Think of it as a **" TurboTax for medical bills"** — upload your hospital bill, and MedClear instantly tells you if you've been overcharged and by how much.

---

## 📸 Preview

<p align="center">
  <img src="https://res.cloudinary.com/dr84lv5ym/image/upload/v1776165575/medclear_banner_pezjqv.jpg" alt="MedClear Dashboard">
</p>



## 🚨 Problem Statement

**Patients in India receive expensive hospital bills but have no way to verify if they are being overcharged due to lack of accessible pricing transparency.**


Healthcare billing is one of the most opaque industries in the world. Patients are expected to pay thousands — sometimes lakhs — without any way to verify if the charges are legitimate.

- **Hidden Charges** — Patients have no way to verify if hospital bill items are correctly priced. A simple "Injection" can cost ₹50 or ₹5,000 with no explanation.
- **No Transparency** — Medical billing lacks accessible standard pricing benchmarks. Unlike grocery shopping where you can compare prices, hospital bills are treated as non-negotiable.
- **Exploitation** — Estimated ₹50,000+ crores is lost annually to overcharging in India alone. In the US, medical billing errors cost patients billions every year.
- **No Recourse** — Patients rarely challenge bills because they don't have the data or expertise to prove overcharging. Hospitals know this and exploit it.

---

## 💡 Solution

MedClear bridges the information gap between patients and healthcare pricing.

**How it works:**

1. **Upload** — Patient uploads hospital bill (image or PDF)
2. **Extract** — OCR technology pulls all line items and prices from the bill
3. **Match** — Smart matching algorithm maps each item to NPPA/CGHS standard codes
4. **Compare** — Each item is checked against official government-defined rates
5. **Report** — Detailed savings report shows exactly where you were overcharged

The result? **Instant clarity. Real savings. Empowerment.**

---

## ⚙️ Features

| Feature | Description |
|:--------|:------------|
| 📄 **Upload Hospital Bill** | Drag-and-drop support for bills in JPG, PNG, or PDF format |
| 🖼️ **OCR Text Extraction** | Tesseract-powered extraction pulls line items and prices from scanned documents |
| 🔍 **Smart Matching** | Fuzzy matching algorithm maps bill items to standard NPPA/CGHS codes |
| 📊 **Price Comparison** | Real-time comparison against official NPPA + CGHS databases |
| ⚠️ **Overcharge Detection** | Flags items exceeding government-defined rates with percentage overcharge |
| 💰 **Savings Report** | Generates downloadable PDF report with itemized savings breakdown |
| 📱 **User Dashboard** | History of all uploaded bills and their audit results |
| 🔐 **Secure Storage** | Bills encrypted and stored securely with user-level access control |

---

## 🧠 How It Works

<img src="https://res.cloudinary.com/dr84lv5ym/image/upload/v1776165733/system_ibfmpq.jpg" alt="System Workflow">
 
---

**Step-by-Step Pipeline:**

1. **Upload** — User drags and drops a hospital bill (image/PDF)
2. **Preprocessing** — Image is enhanced, rotated, and noise-reduced for better OCR
3. **OCR** — Tesseract + OpenCV extracts all text, line items, and prices
4. **Entity Extraction** — NLP parses extracted text into structured data (item name, quantity, unit price, total)
5. **Code Mapping** — Fuzzy matching maps each item to NPPA drug codes or CGHS service codes
6. **Price Lookup** — Query the database for government-defined rates
7. **Comparison** — Calculate overcharge amount and percentage for each item
8. **Output** — Generate JSON response + PDF report for the user

---

## 🏗️ Tech Stack

### Why These Technologies?

We chose each technology in MedClear based on **performance, developer experience, ecosystem maturity, and scalability**. Here's why:

---

### 🖥️ Frontend

| Technology | Why We Chose It |
|:-----------|:----------------|
| **React 18** | Industry-standard component library with excellent performance via concurrent rendering. Used by Netflix, Airbnb, and Instagram. |
| **TypeScript** | Static typing catches 30% of bugs at compile time. Essential for a financial/healthcare application where errors are costly. |
| **Tailwind CSS** | Utility-first CSS allows rapid UI development without context-switching between files. Smaller bundle size than traditional CSS frameworks. |
| **Vite** | Next-gen build tool that's 10-100x faster than webpack. Instant server start and lightning-fast HMR. |
| **Zustand** | Lightweight state management without the boilerplate of Redux. Perfect for our simple auth + UI state needs. |
| **React Query** | Handles server state, caching, and background refetching. Eliminates manual "loading" management. |
| **Framer Motion** | Production-ready animations that make the app feel premium and polished. |

```
React + TypeScript + Tailwind + Vite + Zustand + React Query + Framer Motion
```

---

### ⚙️ Backend

| Technology | Why We Chose It |
|:-----------|:----------------|
| **Node.js** | Event-driven I/O is perfect for our I/O-heavy OCR pipeline. Same language as frontend = full-stack productivity. |
| **Express.js** | Minimal, unopinionated framework. We only pay for what we use. Massive ecosystem of middleware. |
| **TypeScript** | End-to-end type safety from backend to frontend. Auto-complete everywhere. |
| **Prisma** | Type-safe ORM that feels like a query builder. Migration system is best-in-class. |
| **MongoDB** | NoSQL database for flexible data storage. Perfect for unstructured billing data with complex queries. |
| **JWT** | Stateless authentication. Perfect for scalable APIs. |
```
Node.js + Express + TypeScript + Prisma + MongoDB + JWT + Zod
```

---

### 🤖 OCR & AI Services

| Technology | Why We Chose It |
|:-----------|:----------------|
| **Python** | Dominant language for AI/ML. Tesseract, OpenCV, and scikit-learn all have Python-first APIs. |
| **Tesseract OCR** | Open-source, battle-tested OCR. Supports 100+ languages. No API costs = free at scale. |
| **OpenCV** | Computer vision library for image preprocessing (contrast, deskew, denoising). Critical for accurate OCR on blurry hospital bills. |
| **FuzzyWuzzy** | String matching library for matching bill items to NPPA codes. Handles typos and variations. |
| **Pandas** | Data processing for analyzing large NPPA datasets efficiently. |
| **FastAPI** | Async Python web framework. High-performance API for OCR results.uvicorn as the ASGI server. |

```
Python + Tesseract + OpenCV + FuzzyWuzzy + Pandas + FastAPI + Uvicorn
```

---

### 🗄️ Database & Infrastructure

| Technology | Why We Chose It |
|:-----------|:----------------|
| **PostgreSQL** | The gold standard for relational data. JSON support for flexible metadata. Perfect for billing records. |
| **Pinecone** | Vector database for semantic search. Enables "find similar drugs/services" functionality. |
| **Docker** | Containerization ensures the same environment from dev to production. Essential for Python + Node compatibility. |
| **Docker Compose** | Local development with one command. All services (DB, Redis, API) start together. |
| **GitHub Actions** | Free CI/CD for open-source. Automated testing and deployment. |

```
PostgreSQL + Pinecone + Docker + Docker Compose + GitHub Actions
```

---

### 📁 Project Structure (Monorepo)

```
medclear/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── utils/
│   └── package.json
│
├── backend/           # Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── ocr-service/       # Python + FastAPI
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   └── utils/
│   └── requirements.txt
│
└── docker-compose.yml # All services orchestration
```

---

## 📊 Example Output

```json
{
  "audit_result": {
    "bill_id": "BILL-2024-00123",
    "hospital_name": "Apollo Hospitals",
    "total_bill": "₹1,42,500",
    "overcharged": "₹42,300",
    "savings_percentage": "29.7%",
    "status": "audit_complete",
    "flagged_items": [
      {
        "item": "Private Ward (3 days)",
        "category": "room_charges",
        "charged": "₹45,000",
        "allowed_cghs": "₹12,000",
        "overcharge": "₹33,000",
        "overcharge_percentage": "275%"
      },
      {
        "item": "Injection (Ceftriaxone 1g)",
        "category": "medications",
        "charged": "₹850",
        "allowed_nppa": "₹45",
        "overcharge": "₹805",
        "overcharge_percentage": "1789%"
      },
      {
        "item": "Blood Test (CBC)",
        "category": "diagnostics",
        "charged": "₹600",
        "allowed_cghs": "₹150",
        "overcharge": "₹450",
        "overcharge_percentage": "300%"
      }
    ],
    "recommendations": [
      "Dispute the ward charges with hospital billing department",
      "Request itemized bill with drug NDC codes",
      "File a complaint with NPPA if charges are not rectified"
    ]
  }
}
```

> ⚠️ **You were overcharged ₹42,300** — that's ₹33,000 just on ward charges alone (275% over CGHS rates).

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Purpose |
|:-----|:--------|:--------|
| Node.js | 18+ | Frontend & Backend runtime |
| Python | 3.9+ | OCR Service |
| MongoDB | 14+ | Primary database |
| npm / pip | Latest | Package management |

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/Rachit-Kakkad1/medclear.git
cd medclear

# Install frontend dependencies
cd frontend
npm install

# Go back and install backend dependencies
cd ../backend
npm install

# Install OCR service dependencies
cd ../ocr-service
pip install -r requirements.txt
```

### Configure Environment

Create a `.env` file in `backend/`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/medclear"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Redis
REDIS_URL="redis://localhost:6379"

# OCR Service
OCR_SERVICE_URL="http://localhost:8000"

# NPPA API (Government pricing data)
NPPA_API_URL="https://api.nppa.gov.in/pricing"
NPPA_API_KEY="your-api-key"

# App Config
NODE_ENV="development"
PORT=3000
```

Create a `.env` file in `ocr-service/`:

```env
# Tesseract OCR
TESSDATA_PREFIX="/usr/share/tesseract-5/ tessdata"

# Image Processing
MAX_IMAGE_SIZE=10485760
SUPPORTED_FORMATS="jpg,jpeg,png,pdf"

# Server
HOST="0.0.0.0"
PORT=8000
```

### Database Setup

```bash
cd backend

# Run Prisma migrations
npx prisma migrate dev

# Seed NPPA/CGHS pricing data
npx prisma db seed
```

### Run the Application

#### Option 1: Manual Start (3 terminals)

```bash
# Terminal 1 — Backend API
cd backend
npm run dev
# Starts at http://localhost:3000

# Terminal 2 — Frontend
cd frontend
npm run dev
# Starts at http://localhost:5173

# Terminal 3 — OCR Service
cd ocr-service
uvicorn app.main:app --reload
# Starts at http://localhost:8000
```

#### Option 2: Docker Compose (One command)

```bash
# Start all services with Docker
docker-compose up --build
```

**Visit `http://localhost:5173` to start auditing bills.**

---

## 🔮 Future Scope

We're just getting started. Here's what's on our roadmap:

| Feature | Status | Description |
|:--------|:-------|:------------|
| 🏥 **Prescription Scanner** | Planned | Analyze doctor prescriptions for medication overpricing |
| 🛡️ **Insurance Integration** | Planned | Auto-submit audit reports to insurance providers |
| 📈 **Real-time Pricing** | Planned | Live API integration from NPPA for latest drug prices |
| 📱 **Mobile App** | Planned | Native iOS and Android applications |
| 🌍 **Multi-country Support** | Researching | Support for US (Medicare), UK (NHS), EU pricing standards |
| 🤖 **AI Recommendations** | Researching | Personalized cost-saving suggestions based on medical history |
| 📊 **Analytics Dashboard** | Planned | Hospital-level pricing analytics for researchers |
| 🔔 **Alert System** | Planned | Push notifications when pricing data updates |

---

## 🤝 Contribution

We welcome contributions from developers, designers, and healthcare professionals!

### How to Contribute

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/medclear.git

# 3. Create a feature branch
git checkout -b feature/amazing-new-feature

# 4. Make your changes
# 5. Run tests
npm test        # Frontend
npm run test    # Backend
pytest          # OCR Service

# 6. Commit with descriptive message
git commit -m "Add: New feature that does X"

# 7. Push to your fork
git push origin feature/amazing-new-feature

# 8. Open a Pull Request
```

### Contribution Areas

- 🐛 **Bug Fixes** — Help us squash bugs
- 🎨 **UI/UX** — Make MedClear beautiful
- 📈 **Features** — Build new capabilities
- 📚 **Documentation** — Improve docs
- 🧪 **Testing** — Increase test coverage
- 🔍 **Security** — Audit for vulnerabilities

> 💡 Looking for a way to contribute? Check out our [Good First Issues](https://github.com/medclear/medclear/labels/good%20first%20issue) label.

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Built with ❤️ for healthcare transparency</strong>
</p>