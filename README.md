# ✅ Todo List App with Supabase

A simple Todo List web application built using **React** and **Supabase**. Users can:

- Add new tasks
- Mark tasks as completed or undo them
- Delete tasks
- Tasks are stored and synced with a Supabase PostgreSQL backend

---

## 🚀 Features

- 📄 Add, update (complete/incomplete), and delete todos
- 🔄 Real-time syncing with Supabase backend
- ✅ Task completion toggling
- 🧼 Clean and readable UI

---

## 🛠️ Tech Stack

- **Frontend:** React (with Hooks)
- **Backend:** [Supabase](https://supabase.io/) (as a Firebase alternative)
- **Styling:** Basic CSS (customizable)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo


git clone https://github.com/your-username/todo-supabase-app.git
cd todo-supabase-app
 2. Install Dependencies
npm install
3. Setup Supabase
Go to Supabase.io and create a new project.

Create a table named TodoList with the following structure:
| Column      | Type      | Notes         |
|-------------|-----------|---------------|
| id          | int8      | Primary Key   |
| name        | text      | Todo name     |
| isCompleted | boolean   | default: false|

Get your Supabase project URL and anon key.

Create a file supabase-client.js in your src/ directory with the following content:
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-url.supabase.co";
const supabaseKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
4. Run the App
npm run dev
# or
npm start
