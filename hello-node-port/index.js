import express from "express";
import os from "os";

const app = express();

app.get("/", (req, res) => {
  try {
    return res.json({
      success: true,
      message: `VERSION 2: Hello World from pod: ${os.hostname()}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// kubectl rollout status deployment node-hello