const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.post("/api/v1/user/register", (req, res) => {
    console.log("body", req.body);
  const username = req.body.name;
  const password = req.body.password;

  //Save user to database logic would go here

  const response = {
    message: "User registered successfully",
    user: {
      username: username,
      password: password, // In a real application, never return passwords in responses
    },
  };
  console.log("response", response);
  res.status(201).json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
