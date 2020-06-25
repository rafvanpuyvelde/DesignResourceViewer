import express, { Request, Response } from "express";
import DesignResourceRepository from "../repositories/DesignResourceRepository";

const router = express.Router();

const repo = new DesignResourceRepository();

router.get("/resources", (req: Request, res: Response) => {
  repo.getResources().then((resources) => {
    res.send(JSON.stringify(resources));
  });
});

export default router;
