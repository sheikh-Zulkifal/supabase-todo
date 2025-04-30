import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    if (error) {
      console.log("❌ Error while fetching data from Supabase", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    // ✅ Prevent empty input submission
    if (!newTodo.trim()) {
      alert("Todo cannot be empty!");
      return;
    }

    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .select() // ✅ Add .select() to get full inserted row
      .single();

    if (error) {
      console.log("❌ Error while inserting Todo", error);
    } else if (data) {
      console.log("✅ Inserted todo:", data);
      setTodoList((prev) => [...prev, data]);
      setNewTodo(""); // ✅ Clear input after adding
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id)
      .select() // ✅ Get updated row
      .single();

    if (error) {
      console.log("❌ Error while toggling the task", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? data : todo // ✅ Replace with updated row
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);
    if (error) {
      console.log("❌ Error while deleting a todo", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id)); // ✅ Fix: use todo.id !== id (was `"id"` string)
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New Todo.."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo Item</button>
      </div>

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <p
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.name}
            </p>
            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>
              {todo.isCompleted ? "Undo" : "Complete Task"}
            </button>
            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
