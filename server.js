import express from "express";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Efiko webhook is live"));

// Verification endpoint for Meta (Facebook/WhatsApp)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "dev_verify_token";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Messages/events endpoint
app.post("/webhook", (req, res) => {
  console.log("Incoming event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// IMPORTANT for Render: must use Render's injected port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook listening on port ${PORT}`));
