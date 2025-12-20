import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json([
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
  ]);
});

export default router;
