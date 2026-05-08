# Rimora Threads - Full Stack Storefront

This repository contains a complete **frontend + backend** implementation for **Rimora Threads**, a fashion ecommerce-style website inspired by premium apparel themes.

## Project structure

- `backend/` - Node.js API server for store content + newsletter endpoint and static file hosting for the frontend.
- `frontend/` - Storefront UI (HTML/CSS/JS), rendered dynamically using API content.

## Run the whole app (recommended)

```bash
node backend/server.js
```

Then open:

- `http://localhost:5050` for the full storefront
- `http://localhost:5050/api/health` for API health

## API endpoints

- `GET /api/health`
- `GET /api/content`
- `GET /api/products`
- `GET /api/products?category=Women`
- `POST /api/newsletter` with `{ "email": "you@example.com" }`

## Frontend-only dev mode (optional)

If you host frontend separately, set `window.RIMORA_API_BASE` before loading `app.js` (or ensure backend is at the same origin `/api`).

Example static serve:

```bash
cd frontend
python3 -m http.server 4173
```

In this mode, API defaults to same origin unless overridden.


## Implemented UX features

- Responsive layout for mobile, tablet, and desktop navigation and grids.
- Functional add-to-cart side panel with quantity controls, remove actions, and persistent cart via localStorage.


## Vercel deployment

This repo now includes `vercel.json` + `api/index.js` so Vercel serves:

- Frontend from `frontend/`
- API from `/api/*` serverless routes

No custom build step is required for basic deployment.
