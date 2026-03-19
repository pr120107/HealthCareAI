import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sk-xxxxxxxx"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful health assistant. Keep answers simple and safe."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));