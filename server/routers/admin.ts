import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

// Load admin config from file
function loadAdminConfig() {
  try {
    const configPath = path.join(process.cwd(), "admin-config.json");
    const configData = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(configData);
  } catch (error) {
    console.error("Failed to load admin config:", error);
    return { admins: [] };
  }
}

export const adminRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const config = loadAdminConfig();
      
      const admin = config.admins.find(
        (a: any) => a.email === input.email && a.password === input.password
      );

      if (!admin) {
        throw new Error("Invalid email or password");
      }

      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${input.email}:${Date.now()}`).toString("base64");

      return {
        token,
        email: admin.email,
        message: "Login successful",
      };
    }),

  logout: publicProcedure.mutation(async () => {
    return { message: "Logged out successfully" };
  }),

  verifyToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const decoded = Buffer.from(input.token, "base64").toString("utf-8");
        const [email] = decoded.split(":");
        return { valid: true, email };
      } catch {
        return { valid: false, email: null };
      }
    }),
});
