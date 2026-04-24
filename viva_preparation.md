# MedClear Viva Preparation Guide

This document is a comprehensive, file-by-file breakdown of the MedClear project, optimized for Viva preparation. It covers purpose, logic, data flow, potential questions, and core concepts.

---

## PART 1 & 2: FILE-BY-FILE ANALYSIS & VIVA QUESTIONS

### 1. `backend/src/app.js`
**1-Line Explanation:** Initializes the Express server, sets up middleware, and mounts API routes.
**Detailed Explanation:** This file is the entry point for the Node.js backend. It imports routing definitions, applies security middlewares like `helmet` and `cors`, configures rate-limiting to prevent spam, and handles global error catching.

* **Purpose:** Acts as the backend brain, wiring together security, utilities, and endpoints.
* **Core Logic:** Sets up sequential middleware pipeline (Security -> Body Parsing -> Rate Limiting -> Logging -> Routing -> Error Handling).
* **Flow Placement:** Backend (Main Gateway).
* **Key Functions:**
  * `app.use(helmet/cors)`: Applies security policies.
  * `app.use('/api/v1/...', routes)`: Delegates requests to specific route modules.
  * `app.use(errorHandler)`: Catches and formats any errors thrown in controllers.

**Viva Questions:**
* **Basic:** What does `app.js` do? *(It configures the Express server and connects all routes and middlewares).*
* **Intermediate:** Why do we use `helmet` and `cors`? *(Helmet secures HTTP headers; CORS restricts which frontends can talk to our API).*
* **Scenario:** What happens if the rate limiter is removed? *(The server becomes vulnerable to brute-force or DDoS attacks).*

---

### 2. `backend/src/controllers/bill.controller.js`
**1-Line Explanation:** Handles the bill upload request, queues the job, and streams progress back to the user.
**Detailed Explanation:** This file manages the core lifecycle of a bill upload. It receives the file, creates a unique `jobId`, saves an initial state in MongoDB, and pushes the job to a processing queue. Crucially, it sets up an SSE (Server-Sent Events) connection to stream real-time updates (QUEUED, PROCESSING, COMPLETED) back to the frontend.

* **Purpose:** Orchestrates the flow from file upload to OCR processing and database saving.
* **Core Logic:** File ingestion -> DB initialization -> Background queueing -> Real-time status streaming.
* **Flow Placement:** Backend (Controller Layer).
* **Key Functions:**
  * `uploadBill`: Receives file, saves to DB, adds to queue, returns `jobId`.
  * `streamJobStatus`: Keeps an HTTP connection open to push live progress updates to the frontend via SSE.
  * `processJob`: The background task that calls the OCR service, runs the matcher, and updates the database.

**Viva Questions:**
* **Basic:** Why do we use a `jobId` when uploading? *(Because OCR is slow, so we return a job ID immediately and process the file in the background).*
* **Intermediate:** How does the frontend know when processing is done without constantly refreshing? *(Using Server-Sent Events (SSE) via the `streamJobStatus` function).*
* **Scenario:** What happens if the SSE connection drops? *(The job still finishes in the backend. The frontend can fetch the final status using the `getJob` endpoint or reconnect to the stream).*

---

### 3. `backend/src/utils/matcher.js`
**1-Line Explanation:** Contains the algorithm that fuzzy-matches messy OCR text to official database items.
**Detailed Explanation:** OCR output is often misspelled (e.g., "X-rray Chest"). This file normalizes the text and compares it against standard reference items using Jaccard Similarity (comparing shared words) and Levenshtein Distance (comparing character edits).

* **Purpose:** Bridges the gap between imperfect OCR data and strict database records.
* **Core Logic:** Normalizes strings -> Queries MongoDB for candidates -> Scores candidates -> Returns the highest confidence match.
* **Flow Placement:** Backend (Audit/Validation Layer).
* **Key Functions:**
  * `calculateConfidence`: Combines Jaccard (60% weight) and Levenshtein (40% weight) to score a match.
  * `findBestMatch`: Searches DB candidates via Regex/Text Search and evaluates the best fit.

**Viva Questions:**
* **Basic:** What is the purpose of `matcher.js`? *(To match imperfect OCR item names to official hospital pricing catalogs).*
* **Intermediate:** What is Levenshtein Distance? *(It measures the minimum number of single-character edits required to change one word into another).*
* **Scenario:** What if an item has a completely different name but means the same thing? *(The system also checks an `aliases` array attached to the reference items).*

---

### 4. `ocr-service/app/main.py` & `routers/ocr_router.py`
**1-Line Explanation:** The FastAPI entry point that receives images from Node.js and forwards them to the Python OCR pipeline.
**Detailed Explanation:** Node.js delegates CPU-heavy machine learning tasks to Python. This service accepts images or PDFs, validates their size/type, and runs them through `process_bill_image` asynchronously to prevent blocking the server.

* **Purpose:** Standalone microservice dedicated strictly to image extraction.
* **Core Logic:** Receive File -> Validate Size/Type -> Run Async OCR -> Return JSON.
* **Flow Placement:** Python OCR Microservice (Gateway).
* **Key Functions:**
  * `lifespan`: Runs on startup to verify if EasyOCR and Tesseract engines are installed and loaded.
  * `extract_bill_data`: FastAPI route handling the POST request and threading the OCR process.

**Viva Questions:**
* **Basic:** Why use Python for OCR instead of Node.js? *(Python has the best data science and ML ecosystem, specifically libraries like EasyOCR, OpenCV, and Tesseract).*
* **Intermediate:** Why is `asyncio.to_thread` used in the router? *(Because OCR is a synchronous, CPU-blocking task. Running it in a thread prevents the FastAPI server from freezing for other users).*
* **Scenario:** What happens if a user uploads a 50MB PDF? *(The router immediately rejects it with an HTTP 400 error via the `MAX_FILE_SIZE` check).*

---

### 5. `ocr-service/app/services/ocr_service.py`
**1-Line Explanation:** The brain of the OCR engine, converting raw bounding boxes into structured rows, item names, and prices.
**Detailed Explanation:** Raw OCR just gives random text boxes. This file clusters those boxes horizontally into rows. It then uses intelligent heuristics (e.g., text on the left is the name, small numbers in the middle are quantity, big numbers on the right are price) to separate the noise (phone numbers, GSTIN) from actual bill items.

* **Purpose:** Transforms unstructured visual text into structured JSON data.
* **Core Logic:** Decode Image -> Run EasyOCR -> Cluster into Rows -> Filter Noise -> Extract Name/Price/Qty.
* **Flow Placement:** Python OCR Microservice (Core Logic).
* **Key Functions:**
  * `cluster_into_rows`: Groups OCR boxes that share a similar Y-coordinate.
  * `parse_line_items`: The defense layer that skips header/noise rows and identifies total vs line-items.
  * `_extract_with_heuristics`: Uses positional logic (left/right ratio) to identify what a number represents.

**Viva Questions:**
* **Basic:** How does the system know which price belongs to which item? *(By clustering text boxes into rows based on their vertical Y-coordinates).*
* **Intermediate:** How do you prevent a phone number from being read as a bill total? *(Through aggressive "Noise Filtering" regex checks and positional heuristics).*
* **Scenario:** What happens if EasyOCR fails? *(The pipeline automatically falls back to Tesseract OCR).*

---

### 6. `frontend/src/components/UploadBill.jsx`
**1-Line Explanation:** The React component where users drag/drop files and view the live processing animation.
**Detailed Explanation:** Handles UI states for file selection (drag, click, camera). When a file is uploaded, it opens an `EventSource` to the backend's SSE stream to listen for real-time progress updates, displaying a dynamic loading bar before showing the final audit result.

* **Purpose:** User interaction point for submitting bills.
* **Core Logic:** Local File State -> FormData Upload -> Listen to SSE Stream -> Show Final Data.
* **Flow Placement:** Frontend (React UI).
* **Key Functions:**
  * `handleRealUpload`: Sends the file via `fetch`, then immediately subscribes to the `/stream` endpoint.
  * `handleDrop`/`handleDragOver`: Manages HTML5 Drag and Drop API events.

**Viva Questions:**
* **Basic:** How does the file get from the browser to the backend? *(It is appended to a `FormData` object and sent via a POST request).*
* **Intermediate:** What is `EventSource` used for in this component? *(To consume the Server-Sent Events from the backend, allowing a live progress bar without polling).*
* **Scenario:** What happens if the upload takes 2 minutes? *(The user sees a live progressing state instead of a frozen screen, enhancing UX).*

---

## PART 3: SIMPLIFIED EXPLANATIONS (Quick Reference)
* **Backend:** Express server that takes requests, coordinates database saves, and talks to Python.
* **OCR Service:** Python app that takes an image and turns it into readable line items and prices.
* **Matcher:** Algorithm that fixes spelling mistakes from the OCR to find the real item in the database.
* **Frontend:** React UI that lets users upload bills and view overcharge insights cleanly.

---

## PART 4: PROJECT FLOW UNDERSTANDING

### 1. End-to-End Flow
1. **Frontend (Upload):** User drops an image in React. `UploadBill.jsx` sends it to Express.
2. **Backend (Ingestion):** `bill.controller.js` saves a `QUEUED` state to MongoDB, returns a `jobId`, and pushes the file to an asynchronous queue.
3. **Frontend (Wait):** React connects to the backend using Server-Sent Events (SSE) to listen for updates on that `jobId`.
4. **Backend (Delegation):** The queue worker pops the job and sends the image via HTTP POST to the Python FastAPI service.
5. **OCR Microservice (Extraction):** `ocr_service.py` runs EasyOCR, clusters boxes, filters noise, and returns a JSON array of items and prices.
6. **Backend (Matching & Audit):** Node.js receives the JSON. `matcher.js` compares the items against the DB catalog to detect overcharging.
7. **Completion:** The database is updated to `COMPLETED`. The SSE stream pushes the final JSON to React, which displays the results.

### 2. Data Flow
* `Image File` -> Browser -> Node.js -> Python FastAPI
* `Raw Text/Boxes` -> Python Heuristics -> Clean JSON Array
* `Clean JSON` -> Node.js -> Fuzzy Matcher -> MongoDB
* `Audit Report` -> Node.js -> Server-Sent Events -> React UI

---

## PART 5: CORE CONCEPT QUESTIONS

* **Routing (Express vs FastAPI):** Express uses a middleware chain architecture (`req, res, next`), making it great for I/O and standard CRUD. FastAPI utilizes Python decorators (`@app.get`) and `asyncio`, making it highly performant for ML and heavy data validation.
* **Middleware:** Functions that run between the request and the final route. Examples used: `helmet` (security), `cors` (cross-origin), `upload.single` (Multer for parsing files).
* **Async Handling:** The system relies heavily on asynchronous non-blocking I/O. In Python, `asyncio.to_thread` prevents the ML model from blocking other API requests. In Node.js, `async/await` is used so the server can handle thousands of concurrent requests while waiting for the OCR or Database.
* **Server-Sent Events (SSE):** A unidirectional protocol where the server pushes data to the client over a single long-lived HTTP connection, rather than the client polling the server repeatedly.

---

## PART 6: EDGE CASES & LIMITATIONS

* **Edge Case 1 (Handwritten Bills):** OCR engines struggle with cursive handwriting. **Limitation:** The system is heavily optimized for printed/typed bills.
* **Edge Case 2 (Crumpled/Dark Images):** **Handling:** `image_preprocess.py` utilizes CLAHE (Contrast Limited Adaptive Histogram Equalization) and Deskewing algorithms to clean the image before OCR.
* **Edge Case 3 (Missing Columns):** If a bill lacks a standard table layout, the system falls back to positional heuristics (Name on left, Price on right).
* **System Limitation:** Rate limiting restricts users to 100 requests per 15 minutes to prevent OCR server overload. PDF processing requires standard system dependencies (`poppler`).

---

## PART 7: FINAL PREPARATION MODE

### Top 15 Most Likely Viva Questions

1. **What is the overall architecture of your project?**
   *A React frontend, Node.js/Express backend, Python/FastAPI OCR microservice, and MongoDB database.*
2. **Why separate the backend and OCR into Node.js and Python?**
   *Node.js is excellent for handling web requests and database I/O, while Python has superior libraries for Machine Learning and Computer Vision.*
3. **How does the frontend know when the OCR is finished?**
   *Through Server-Sent Events (SSE). The server pushes real-time status updates over an open connection.*
4. **Which OCR engines are you using?**
   *EasyOCR is the primary engine (deep learning), with PyTesseract as a fallback.*
5. **Why do you cluster text boxes into rows?**
   *OCR engines return text boxes randomly. We group them by Y-coordinates to read left-to-right like a human.*
6. **How do you prevent phone numbers from being registered as prices?**
   *We use regex noise filters and positional heuristics (e.g., rejecting 10-digit numbers or numbers with GSTIN formats).*
7. **What is Levenshtein distance and where is it used?**
   *It measures string difference. We use it to match misspelled OCR item names to actual hospital catalogs in the database.*
8. **What does `helmet` do in your Node.js app?**
   *It secures Express apps by setting various HTTP headers to prevent attacks like XSS or Clickjacking.*
9. **How do you handle file uploads?**
   *Using the `multer` middleware in Express to parse `multipart/form-data`.*
10. **What happens if multiple users upload bills at the exact same time?**
    *The Node.js controller pushes them to a local queue (`queue.service.js`) to process them sequentially without crashing the Python server.*
11. **Why do you use `asyncio.to_thread` in Python?**
    *To run the CPU-blocking OCR pipeline in a separate thread so the FastAPI server can continue accepting new requests.*
12. **How do you identify if a hospital is overcharging?**
    *We compare the extracted OCR price against the `matchedReference` price in our standard database catalog.*
13. **What is Jaccard Similarity?**
    *A mathematical formula used in our matcher that calculates similarity based on the intersection divided by the union of two sets of words.*
14. **Why do you preprocess images before OCR?**
    *To enhance contrast, remove noise, and deskew rotated images, which drastically improves text recognition accuracy.*
15. **What was the hardest bug you faced and how did you fix it?**
    *(Standard Answer): OCR reading random numbers like IDs as prices. Fixed by implementing layout column detection and strict regex validation.*

### Important Keywords to Drop in Viva:
* **Microservices Architecture**
* **Asynchronous Queueing**
* **Server-Sent Events (SSE)**
* **Heuristic Layout Parsing**
* **Fuzzy String Matching (Levenshtein/Jaccard)**
* **Middleware Pipeline**
* **Cross-Origin Resource Sharing (CORS)**
