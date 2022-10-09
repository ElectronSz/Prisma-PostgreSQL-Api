import express from "express";
import { authRoutes } from "./src/routes/auth.router";
import { postRoutes } from "./src/routes/post.router";

const app = express();

const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
