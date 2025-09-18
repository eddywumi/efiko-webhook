// server.js
const express = require("express");
const app = express();
const port = 3000;

const VERIFY_TOKEN = "EFIKO_WHATSAPP_2025_SECRET";

app.use(express.json());

app.get("/webhook/whatsapp", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook/whatsapp", (req, res) => {
  console.log("🔔 Incoming Webhook:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`✅ Efiko Webhook listening on port ${port}`);
});
