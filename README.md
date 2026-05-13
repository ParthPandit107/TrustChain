# Blockchain-Based Fake Product Identification System MVP

This is an MVP built for a presentation to demonstrate how blockchain concepts (cryptographic hashing, immutable records) can be used to prevent counterfeiting.

## How to Run the Demo

You need two terminal windows to run this project: one for the backend server and one for the frontend React app.

### 1. Start the Backend Server
The backend uses a simulated in-memory MongoDB database. **You do not need to download or install MongoDB.** It runs entirely in memory while the server is active.

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd bfpis-mvp/server
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. You should see logs indicating the database connected and automatically seeded 3 demo products.

### 2. Start the Frontend
1. Open a **second** terminal and navigate to the frontend folder:
   ```bash
   cd bfpis-mvp/client
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open the provided `http://localhost:5173` link in your browser.

## Features

- **Manufacturer Dashboard:** Add new products. The system generates a SHA-256 cryptographic hash (simulating blockchain anchoring) and a unique QR code.
- **Consumer Scanner:** Uses your laptop's webcam to scan QR codes. Alternatively, you can type the Product ID manually.
- **Verification:** The system checks the database to confirm if the scanned Product ID exists and returns the full product details and hash if it is genuine.

## Demo Flow
1. Go to the **Verify Product** page.
2. In the "Enter Product ID" field, type one of the demo IDs printed in your backend server terminal (e.g., `PROD-XXXXXX`) and click search. See the "Genuine" result.
3. Type a random fake ID (e.g., `PROD-FAKE123`) and see the "Fake" result.
4. Go to the **Manufacturer** page, create a new product, and use the generated ID to verify it.
