# MySubscription 📊

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=flat&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat&logo=vercel&logoColor=white)

---

## Description

MySubscription is a full-stack web application for tracking recurring subscriptions. The React frontend handles JWT-based authentication and a responsive dashboard UI, while a Flask REST API backend manages business logic and data persistence via SQLAlchemy against a PostgreSQL database hosted on Neon (serverless). The frontend auto-deploys to Vercel and the backend to Render on every push to `main`, giving a true zero-ops CI/CD pipeline. Users can sign up, log in, and perform full CRUD operations on their subscriptions — add new services, edit billing details, or delete cancelled ones — all from a clean, single-page interface.

---

## Key Features

- **Secure auth** — JWT-based signup and login with protected routes on both client and server
- **Full CRUD** — create, read, update, and delete subscriptions with immediate UI feedback
- **React + Axios** — responsive SPA with clean component architecture and centralized API calls
- **Flask REST API** — resource-oriented endpoints with SQLAlchemy ORM for clean data modeling
- **PostgreSQL on Neon** — serverless Postgres with connection pooling, zero cold-start overhead
- **CI/CD pipeline** — Vercel (frontend) + Render (backend) auto-deploy on every `git push`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| HTTP Client | Axios |
| Backend | Flask |
| ORM | SQLAlchemy |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT (Flask-JWT-Extended) |
| Containerization | Docker |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Architecture Overview

```
React (Vercel)  →  Axios  →  Flask API (Render)  →  SQLAlchemy  →  PostgreSQL (Neon)
     │                              │
  JWT auth                    /api/subscriptions
  Protected routes             CRUD endpoints
```

The frontend is a static SPA served from Vercel's CDN. All data fetches go through Axios to the Flask API running on Render. The API authenticates requests via JWT, then reads/writes through SQLAlchemy to a Neon-hosted PostgreSQL instance.

---

## Running Locally

**1. Clone the repo**

```bash
git clone https://github.com/your-username/my-subscription.git
cd my-subscription
```

**2. Backend**

```bash
cd backend
pip install -r requirements.txt
flask run
# API available at http://localhost:5000
```

**3. Frontend**

```bash
cd frontend
npm install
npm start
# App available at http://localhost:3000
```

**4. Environment variables**

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET_KEY=your-secret-key
```

**5. Run both together**

```bash
./run.sh
```

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://my-subs-frontend.vercel.app/login |
