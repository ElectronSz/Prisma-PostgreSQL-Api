import express, { Request, Response, NextFunction } from "express";
import { createPost, findMany, findPostByAuthor } from "../services/post";

const postRoutes = express.Router();

//create new post
postRoutes.post(
  "/create",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    let postObj = req.body;
    try {
      const post = await createPost(postObj);
      return res.status(200).json({ result: post });
    } catch (err) {
      next(err);
    }
  }
);

//get all posts
postRoutes.get(
  "/getAll",
  async (req: Request<never>, res: Response, next: NextFunction) => {
    try {
      const posts = await findMany();
      return res.status(200).json({ result: posts });
    } catch (err) {
      next(err);
    }
  }
);

//get posts by <authorId>
postRoutes.get(
  "/getByAuthor/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    let id: number = req.params.id as unknown as number;
    try {
      const posts = await findPostByAuthor(id);
      return res.status(200).json({ result: posts });
    } catch (err) {
      next(err);
    }
  }
);

export { postRoutes };
