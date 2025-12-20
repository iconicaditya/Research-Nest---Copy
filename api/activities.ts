import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { id: 1, name: "Seminar on AI" },
    { id: 2, name: "Workshop on Robotics" },
  ]);
});

export default router;
