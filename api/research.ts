import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { id: 1, title: "AI in Healthcare" },
    { id: 2, title: "Quantum Computing" },
  ]);
});

export default router;
