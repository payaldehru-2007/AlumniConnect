# AlumniConnect

A full-stack alumni networking platform built for college students to search, connect with, and learn from their institution's alumni network.

## 🚀 Live Demo
- **Frontend:** [alumni-connect-1e46.vercel.app](https://alumni-connect-1e46.vercel.app)
- **Backend (Deep Search):** Not deployed — Railway requires a paid card for the always-on service this module needs, and Vercel's serverless limits don't support it. Fully functional locally (see setup below).

## ✨ Features

- 🔍 **Deep Search Module** — Search and discover alumni profiles using real-time data via SerpAPI
- 👥 **Alumni Management** — Browse, filter, and connect with alumni profiles
- 🔐 Secure backend API with 7 RESTful endpoints
- 📱 Responsive UI built with React

## 🛠️ Tech Stack

**Frontend:** React, Node.js
**Backend (Deep Search):** Python, FastAPI, SerpAPI
**Backend (Alumni Management):** Node.js, Supabase
**Database:** Supabase (PostgreSQL)

## 👩‍💻 My Contribution

I built the **Deep Search module** — the backend service responsible for finding and returning real alumni profiles:
- Designed and implemented **7 FastAPI endpoints**
- Integrated **SerpAPI** to fetch real-world profile data
- Handled API request/response structuring and error handling
- Debugged and resolved CORS issues for cross-origin requests from the frontend

## 🤝 Team

This project was built with classmate [Laxmi](#) — she developed the **Alumni Management module** (React frontend + Node.js/Supabase backend).

## ⚙️ Setup & Installation

### Deep Search Backend (Python/FastAPI)
```bash
cd deep-search-service
pip install -r requirements.txt
python main.py
```
Server runs on `http://localhost:8000` (or your configured port)

### Alumni Backend (Node/Supabase)
```bash
cd alumni-backend
npm install
npm start
```

### Frontend (React)
```bash
cd alumni-frontend
npm install
npm start
```

## 📌 Known Limitations
- Deep Search backend requires a paid hosting tier (Railway) for persistent deployment — currently runs locally


## 📄 License
This project is open for educational and portfolio purposes.
