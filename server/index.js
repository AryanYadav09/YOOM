import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Buffer } from "node:buffer";
dotenv.config({ path: ".env.local" });
dotenv.config();
const bufferModule = require("buffer");
if (!bufferModule.SlowBuffer) {
    bufferModule.SlowBuffer = Buffer;
}
const startServer = async () => {
    const { StreamClient } = await import("@stream-io/node-sdk");
    const app = express();
    const port = Number(process.env.PORT) || 3001;
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || process.env.VITE_STREAM_API_KEY;
    const streamApiSecret = process.env.STREAM_SECRET_KEY || process.env.VITE_STREAM_SECRET_KEY;
    if (!streamApiKey) {
        throw new Error("Missing Stream API key");
    }
    if (!streamApiSecret) {
        throw new Error("Missing Stream API secret");
    }
    const streamClient = new StreamClient(streamApiKey, streamApiSecret);
    app.use(cors());
    app.use(express.json());
    app.get("/api/health", (_req, res) => {
        res.json({ ok: true });
    });
    app.post("/api/stream/token", (req, res) => {
        const userId = req.body?.userId;
        if (!userId || typeof userId !== "string") {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const expirationTime = Math.floor(Date.now() / 1000) + 3600;
        const issuedAt = Math.floor(Date.now() / 1000) - 60;
        const token = streamClient.createToken(userId, expirationTime, issuedAt);
        res.json({ token });
    });
    app.listen(port, () => {
        console.log(`Stream token server running on http://localhost:${port}`);
    });
};
startServer().catch((error) => {
    console.error("Failed to start stream token server", error);
    process.exit(1);
});
