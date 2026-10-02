# POS Project

A full-stack Point of Sale (POS) application for managing a restaurant workflow from order entry to kitchen handling and administration.

## Features

- Role-focused screens for administrators, cashiers, and kitchen staff
- Authentication pages for sign-in and registration
- Product and category browsing for cashier order creation
- Order management with order items
- Admin dashboard, menu management, staff management, and sales views
- Kitchen views for inside and outside orders
- REST API and admin panel powered by Strapi

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router |
| UI and state | Tailwind CSS, DaisyUI, Zustand |
| Forms and notifications | Formik, Yup, React Hot Toast, SweetAlert2 |
| Backend | Strapi 5 |
| Database (development) | SQLite via `better-sqlite3` |

## Project structure

```text
POS-Project/
|- frontend/   # React + Vite client application
`- backend/    # Strapi API, content types, and admin panel
```

The backend defines content types for `category`, `product`, `order`, and `order-item`.

## Prerequisites

- Node.js 20 through 26
- npm

## Getting started

### 1. Start the backend

```bash
cd backend
copy .env.example .env
npm install
npm run develop
```

Strapi starts on `http://localhost:1337` by default. On its first run, open `http://localhost:1337/admin` to create the local administrator account.

> On macOS or Linux, use `cp .env.example .env` instead of `copy`.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local application URL in the terminal, typically `http://localhost:5173`.

## Available scripts

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview the production build |

### Backend

| Command | Description |
| --- | --- |
| `npm run develop` | Start Strapi with auto-reload |
| `npm run build` | Build the Strapi admin panel |
| `npm run start` | Start Strapi without auto-reload |
| `npm run console` | Open the Strapi console |

## Environment variables

Use `backend/.env.example` as the starting point for your local `backend/.env`. Replace all placeholder secrets before using the application outside local development.

The default database is a local SQLite file at `backend/.tmp/data.db`. Database files, uploads, dependencies, and `.env` files are excluded from version control.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Login |
| `/register` | Registration |
| `/admin` | Admin dashboard |
| `/admin/staff` | Staff management |
| `/admin/menu` | Menu management |
| `/admin/sales` | Sales view |
| `/cashier` | Cashier workspace |
| `/kitchen` | Kitchen workspace |

## License

This project is intended for educational and portfolio use unless a separate license is added.
