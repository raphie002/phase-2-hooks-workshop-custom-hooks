import { useEffect, useState } from "react";

function getLocalStorageValue(key, initialValue) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return initialValue;
    }
    return JSON.parse(storedValue);
  } catch (error) {
    const storedValue = localStorage.getItem(key); 
    return storedValue !== null ? storedValue : initialValue; 
  }
}


function setLocalStorageValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage key:", key, error);
  }
}

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => getLocalStorageValue(key, initialValue));

  // Effect to save state to localStorage
  useEffect(() => {
    setLocalStorageValue(key, state);
  }, [key, state]);

  // Effect to listen for storage events (for bonus 2)
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        setState(getLocalStorageValue(key, initialValue));
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [state, setState];
}

function Form() {
  const [name, setName] = useLocalStorage("username", ""); // Used a unique key
  console.log(name);

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  const [formData, setFormData] = useLocalStorage("blogPost", { // Used a unique key
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="name">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}
