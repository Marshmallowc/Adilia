import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// In production, you would configure a webhook URL (e.g., Feishu, Enterprise WeChat, DingTalk, or Email service)
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || "";

// Log directory in appData for persistent lead collection
const LOG_DIR = "/Users/a1234/.gemini/antigravity/leads";
const LOG_FILE = path.join(LOG_DIR, "captured_leads.jsonl");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, platforms, budget, timeline, details } = body;

    // Simple backend validation
    if (!name || !contact || !budget || !timeline || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const leadRecord = {
      timestamp: new Date().toISOString(),
      name,
      contact,
      platforms,
      budget,
      timeline,
      details: details.substring(0, 1000) // Truncate to prevent abuse
    };

    // Save lead persistently to APP DATA for backup, ensuring zero loss of commercial leads
    try {
      if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
      }
      fs.appendFileSync(LOG_FILE, JSON.stringify(leadRecord) + "\n", "utf8");
    } catch (fsErr) {
      console.error("Failed to write lead to local file system:", fsErr);
    }

    // Attempt webhook notification (e.g., Feishu / Slack / Email)
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            msg_type: "text",
            content: {
              text: `🚨 收到新项目商业询价意向！\n\n👤 客户称呼: ${name}\n📞 联系方式: ${contact}\n💻 研发平台: ${platforms.join(", ")}\n💰 预算区间: ${budget}\n📅 期望周期: ${timeline}\n📝 需求详情: ${details}`
            }
          })
        });
      } catch (webhookErr) {
        console.error("Webhook notification failed:", webhookErr);
      }
    }

    console.log("Successfully captured lead:", name);

    return NextResponse.json({ success: true, message: "Lead captured successfully" });
  } catch (err) {
    console.error("Lead processing error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
