import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { issueStore } from "./data";

const app = express();
app.use(cors());

// Set up API routes
app.get("/", (req: Request, res: Response) => {
  res.send('<h1 style="font-family: sans-serif; padding: 50px;">This is the root route!</h1>');
});

app.get("/api/issues", (req, res) => {
  res.status(200).json(issueStore);
});

app.get("/api/issues/:id", (req, res) => {
  const issueId: string = req.params.id;
  const issue = issueStore.find((issue) => issue.id === issueId);
  res.status(200).json(issue);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\nServer started at http://localhost:${PORT}`);
});
