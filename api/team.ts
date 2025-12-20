import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { id: 1, name: "Alice", role: "Researcher" },
    { id: 2, name: "Bob", role: "Professor" },
  ]);
});

export default router;
