import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { connectDb } from "./db/db.js";
import { Joke } from "./models/joke.model.js";

config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message:
      "Hello from Node Pod running on Kubernetes. This is a simple Node.js API.",
  });
});

app.get("/error", (req, res) => {
  process.exit(1);
});

app.get("/jokes", async (req, res) => {
  try {
    const jokes = await Joke.find({});
    res.status(200).json({ success: true, message: "Joke fetched", jokes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching jokes" });
  }
});

app.post("/joke", async (req, res) => {
  try {
    const { joke } = req.body;

    const newJoke = await Joke.create({
      joke,
    });

    res.status(201).json({ success: true, message: "Joke added", newJoke });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error adding joke" });
  }
});

const PORT = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database Connection Error: ${error}`);
  });
