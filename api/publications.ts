import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { id: 1, title: "Research Paper 1" },
    { id: 2, title: "Research Paper 2" },
  ]);
});

export default router;
