# 📈 Kanban Board - FrontEnd

![Vite](https://img.shields.io/badge/Vite-%236646FF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)


## 🏁 Getting Started

This project is a simple Kanban board application for managing tasks, built with React for the front-end.

It allows users to create, view, update, delete, and move tasks between columns (To Do → In Progress → Done). The application is designed to demonstrate clean architecture, maintainable code, and best practices.

## 📁 Project Structure

```
kanban-frontend-tech-challenge/
├── .github/workflows/                  # GitHub Actions workflows for CI/CD
│   └── ci.yml                          # Continuous Integration pipeline configuration
│
├── src/                                # Application source code
│   ├── api/                            # React Query and API requests via Axios
│   │   └── ApiProvider.tsx             # React Query provider setup
│   │
│   ├── components/                     # Reusable React components
│   │
│   ├── hooks/                          # Custom React hooks
│   │
│   ├── pages/                          # Page components (Board page, Dashboard, etc.)
│   │
│   ├── types/                          # TypeScript type definitions
│   │
│   ├── App.tsx                         # Main App component
│   └── main.tsx                        # Entry point for Vite
│
├── .prettierrc                         # Prettier configuration for code formatting
├── eslint.config.js                    # ESLint configuration for linting
├── package.json                        # Project dependencies and scripts
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
└── vite.config.ts                      # Vite configuration
```

## 🛠️ Tech Stack

- **Vite** – Build tool and development server for React  
- **React** – Frontend library for building the UI
- **TypeScript** – Strongly-typed language for safer, maintainable frontend code 
- **React Query** – Data fetching and state management  
- **Tailwind CSS** – Utility-first CSS framework for styling

## ⚙️ Installation (Frontend)

Follow these steps to run the Kanban Board frontend locally:

1. **Clone the repository**

```bash
git clone https://github.com/felippemauricio/kanban-frontend-tech-challenge.git
cd kanban-frontend-tech-challenge
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

## ⚙️ Continuous Integration (CI)

This project has **CI configured with GitHub Actions**. On every push or pull request, the pipeline automatically runs:

- **Lint & Formatting** – checks JS/TS code with ESLint and Prettier  
- **Build** – ensures the frontend builds successfully with Vite

### Commands run in CI

- **Lint**

```bash
npm run lint
```

- **Prettier check**

```bash
npm run prettier:check
```

- **Build**

```bash
npm run build
```

## 🚀 Deployment

The Kanban Board front-end is deployed on **Render** and can be accessed via:

[https://kanban-frontend-tyo9.onrender.com](https://kanban-frontend-tyo9.onrender.com)

> ⚠️ Note: This project is running on a free Render account, so the first request may take a few seconds to start the server. If the page doesn’t load immediately, please refresh after a moment.

## 💡 Curiosities

- **Optimistic Updates & Key-Value Storage** – All task updates on the frontend are **optimistic**. When a task is created, edited, moved, or deleted, a request is sent to the backend to store the change. Tasks are stored in a **key-value format**, so the frontend can update, remove, or edit a specific task quickly without searching through a list. This ensures the application remains performant even with a large number of tasks. The optimistic logic is implemented using **React Query** and can be found in the `src/api` folder.

- **LexoRank** – To manage task ordering efficiently, I implemented **LexoRank**. This approach allows tasks to be moved between columns or reordered without re-rendering or updating many other tasks in the database, keeping the UI smooth and responsive.

- **Drag and Drop** – The drag-and-drop functionality uses the native **HTML5 draggable API**. I chose this approach to demonstrate that it's possible to implement drag-and-drop without relying on external libraries like `react-beautiful-dnd` or others.
