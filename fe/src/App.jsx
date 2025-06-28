import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    message: "",
    user: {
      name: "",
      password: 0,
    },
  });
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target[0].value,
      password: e.target[1].value,
    };
    setUser({
      ...user,
      user: newUser,
      message: "User submitted successfully!",
    });
    console.log("User submitted:", newUser);

    fetch("http://localhost:3000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error submitting user:", error);
      });

    e.target.reset();
  };

  return (
    <>
    <div className="App">
      Status: 
      <div>User name response: {data?.user?.username || "No response yet"}</div>
      <div>User password response: {data?.user?.password || "No response yet"}</div>
    </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={user.user.name}
            onChange={(e) =>
              setUser({ ...user, user: { ...user.user, name: e.target.value } })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={user.user.password}
            onChange={(e) =>
              setUser({
                ...user,
                user: { ...user.user, password: e.target.value },
              })
            }
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
