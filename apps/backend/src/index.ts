import Anthropic from "@anthropic-ai/sdk";
import { Hono } from "hono";

type Bindings = {
  CLAUDE_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  const claudeAPIKey = c.env.CLAUDE_API_KEY;

  const anthropic = new Anthropic({ apiKey: claudeAPIKey });

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0,
    system: "Respond only with short poems.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Why is the ocean salty?",
          },
        ],
      },
    ],
  });

  return c.text(JSON.stringify(msg));
});

export default app;
