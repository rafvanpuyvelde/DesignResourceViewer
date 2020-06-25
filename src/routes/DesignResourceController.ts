import redis from "redis";
import express, { Request, Response, NextFunction } from "express";
import DesignResourceRepository from "../repositories/DesignResourceRepository";

const client = redis.createClient(6379);

client.flushall();

const router = express.Router();

const repo = new DesignResourceRepository();

// Redis Caching
router.use("/resources", (req: Request, res: Response, next: NextFunction) => {
  client.get("resources", (error: Error | null, data: string) => {
    if (error) throw error;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else next();
  });
});

router.get("/resources", (req: Request, res: Response) => {
  repo.getResources().then((resources) => {
    // Set data to Redis
    client.setex("resources", 3600, JSON.stringify(resources));
    res.send(JSON.stringify(resources));
  });
});

export default router;
