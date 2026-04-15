import { Request, Response } from "express";
import { storagePut } from "../storage";

export async function handleImageUpload(req: Request, res: Response) {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const result = await storagePut(
      `articles/${Date.now()}-${file.originalname}`,
      file.buffer,
      file.mimetype
    );

    return res.json({ success: true, url: result.url, key: result.key });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}
