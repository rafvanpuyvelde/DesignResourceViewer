import express, { Request, Response } from "express";

const router = express.Router();

router.get("/resources", (req: Request, res: Response) => {
  res.send("Test route");
});

export default router;
