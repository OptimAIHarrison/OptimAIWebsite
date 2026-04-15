import { describe, it, expect, vi, beforeEach } from "vitest";
import { formsRouter } from "./forms";
import { TRPCError } from "@trpc/server";

vi.mock("../_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

describe("formsRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("submitContact", () => {
    it("should successfully submit contact form with valid data", async () => {
      const caller = formsRouter.createCaller({} as any);

      const result = await caller.submitContact({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Corp",
        message: "This is a test message for contact form",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("Thank you");
    });

    it("should reject invalid email", async () => {
      const caller = formsRouter.createCaller({} as any);

      try {
        await caller.submitContact({
          name: "John Doe",
          email: "invalid-email",
          company: "Acme Corp",
          message: "This is a test message",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("should reject short message", async () => {
      const caller = formsRouter.createCaller({} as any);

      try {
        await caller.submitContact({
          name: "John Doe",
          email: "john@example.com",
          company: "Acme Corp",
          message: "short",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });
  });

  describe("submitAudit", () => {
    it("should successfully submit audit form with valid data", async () => {
      const caller = formsRouter.createCaller({} as any);

      const result = await caller.submitAudit({
        name: "Jane Smith",
        email: "jane@example.com",
        company: "Tech Startup",
        teamSize: "1-10",
        challenge: "We need to automate our manual data entry processes",
      });

      expect(result.success).toBe(true);
      expect(result.message).toContain("Audit request submitted");
    });

    it("should reject invalid email in audit form", async () => {
      const caller = formsRouter.createCaller({} as any);

      try {
        await caller.submitAudit({
          name: "Jane Smith",
          email: "not-an-email",
          company: "Tech Startup",
          teamSize: "1-10",
          challenge: "We need to automate our manual data entry processes",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("should reject short challenge description", async () => {
      const caller = formsRouter.createCaller({} as any);

      try {
        await caller.submitAudit({
          name: "Jane Smith",
          email: "jane@example.com",
          company: "Tech Startup",
          teamSize: "1-10",
          challenge: "short",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });
  });
});
