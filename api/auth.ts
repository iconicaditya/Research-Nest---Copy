import { Router } from "express";
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // TODO: Replace with real auth logic
  if (username === "admin" && password === "123") {
    return res.json({ success: true, message: "Logged in!" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

router.post("/logout", (_req, res) => {
  // TODO: destroy session if using session store
  res.json({ success: true, message: "Logged out!" });
});

export default router;
