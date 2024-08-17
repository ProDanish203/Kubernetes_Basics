// Create a basic server using express in ES6
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/error", (req, res) => {
  process.exit(1);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running live on: http://localhost:${port}`);
});
