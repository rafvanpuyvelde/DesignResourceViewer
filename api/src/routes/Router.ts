import express from "express";
import DesignResourceRoutes from "./DesignResourceController";

const router = express.Router();

router.use("/api", DesignResourceRoutes);

export default router;
