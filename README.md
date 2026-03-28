# User Management Dashboard (Next.js + TypeScript + MUI)

A frontend user management application built using Next.js, React, and Material UI.
This project demonstrates clean UI design, component-based architecture, and strict TypeScript usage by implementing Create and Update operations.

---

## Project Overview

This project was developed as part of a fullstack developer screening task.
The goal was to build a user table interface with add and edit functionality using a JSON data source.

---

## Features

* Display users in a structured table (grid view)
* Add new user via modal form
* Edit existing user with prefilled data
* Form validation (required fields + email validation + password validation)
* UI updates after successful backend and database operations
* Clean and reusable component structure
* Type-safe implementation using TypeScript
* Pagination in UserTable

---

## Tech Stack

* **Framework:** Next.js
* **Library:** React.js
* **Language:** TypeScript (ts/tsx)
* **UI Toolkit:** Material UI (MUI)

---

## Data Model

```ts
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
```

---

## Project Structure

```bash
/components
  ├── UserFormModal.tsx
  ├── UserTable.tsx
/pages
  ├── api
  │     └── hello.ts
  ├── login
  │     └── index.tsx
  ├── _app.tsx
  ├── _document.tsx
  └── index.tsx
/data
  ├── users.json
/types
  ├── user.ts

```

---

## Installation & Setup

```bash
git clone -b dev https://github.com/loku619/Next-UI.git
cd Next-UI
npm install
npm run dev
```

Run locally:

```
http://localhost:3000
```

---

## Functionality

### 🔹 User Table

* Displays JSON data
* Columns: ID, First Name, Last Name, Email, Password

### 🔹 Add User

* "Add User" button above table
* Opens modal dialog with form
* Validates input fields
* Updates data and re-renders UI

### 🔹 Edit User

* Edit button in each row
* Opens modal with prefilled data
* Updates selected user

---

## Validation Rules

* First Name → Required
* Last Name → Required
* Password → Required + Minimum length 6
* Email → Required + valid email format

---

## Key Concepts Demonstrated

* Strict TypeScript typing (interfaces, props)
* Controlled forms with validation
* React Hooks (`useState`, `useEffect`)
* Component reusability
* Separation of UI and logic
* State-driven UI updates

---

## Challenges & Learnings

* Managing state updates with backend persistence
* Reusing modal for both create and update flows
* Maintaining clean TypeScript types across components
* Structuring components for scalability

---

---

## 📄 License

This project is created for assessment purposes.