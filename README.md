# BAHO Website

A full-stack web application built with **Next.js** for the frontend and **NestJS** for the backend.

---

## 🏗️ Project Architecture

```text
BAHO Website/
├── frontend/          # Next.js 16 (React 19, Tailwind CSS 4, Framer Motion)
└── backend/           # NestJS 11 TypeScript REST API Server
```

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion
- **Backend**: NestJS 11, TypeScript, RxJS, Express platform, Jest

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` (comes with Node.js)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "BAHO Website"
```

### 2. Frontend Setup

Navigate to the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will run at: **[http://localhost:3000](http://localhost:3000)**

### 3. Backend Setup

Navigate to the `backend` folder and install dependencies:

```bash
cd backend
npm install
```

Start the NestJS development server:

```bash
npm run start:dev
```

The backend API server will run at: **[http://localhost:3000](http://localhost:3000)** (or designated API port).

---

## 📜 Available Scripts

### Frontend (`/frontend`)

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the compiled production build
- `npm run lint` - Runs ESLint code checks

### Backend (`/backend`)

- `npm run start:dev` - Starts the server in watch mode (auto-reload)
- `npm run build` - Builds the NestJS project
- `npm run start:prod` - Runs the production build
- `npm run test` - Runs unit tests via Jest
- `npm run lint` - Lints and fixes TypeScript code formatting

---

## 📄 License

This project is private and proprietary.
