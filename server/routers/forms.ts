import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sendEmail } from "../_core/notification";

export const formsRouter = router({
  submitContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        company: z.string().min(1, "Company is required"),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendEmail(
          "New Contact Form Submission",
          [
            { label: "Name",    value: input.name },
            { label: "Email",   value: input.email },
            { label: "Company", value: input.company },
            { label: "Message", value: input.message },
          ],
          input.email
        );
        return { success: true, message: "Thank you! We'll be in touch soon." };
      } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, message: "Failed to submit. Please try again." };
      }
    }),

  submitAudit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        company: z.string().min(1, "Company is required"),
        teamSize: z.string(),
        challenge: z.string().min(1, "Challenge is required"),
        auditAreas: z.array(z.string()).min(1, "Please select at least one audit area"),
        currentChallenges: z.string().min(1, "Please describe your current challenges"),
        automationGoals: z.string().min(1, "Please describe your automation goals"),
        timeline: z.string(),
        budget: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendEmail(
          "New Free Audit Request",
          [
            { label: "Name",                value: input.name },
            { label: "Email",               value: input.email },
            { label: "Company",             value: input.company },
            { label: "Team Size",           value: input.teamSize },
            { label: "Timeline",            value: input.timeline },
            { label: "Budget",              value: input.budget },
            { label: "Audit Areas",         value: input.auditAreas.join(", ") },
            { label: "Primary Challenge",   value: input.challenge },
            { label: "Current Challenges",  value: input.currentChallenges },
            { label: "Automation Goals",    value: input.automationGoals },
          ],
          input.email
        );
        return { success: true, message: "Audit request submitted! We'll contact you within 24 hours." };
      } catch (error) {
        console.error("Audit form error:", error);
        return { success: false, message: "Failed to submit. Please try again." };
      }
    }),

  submitChatbotMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendEmail(
          "New Chatbot Message",
          [
            { label: "Message", value: input.message },
          ]
        );
        return { success: true, message: "Message sent!" };
      } catch (error) {
        console.error("Chatbot message error:", error);
        return { success: false, message: "Failed to send message." };
      }
    }),

  submitProductInquiry: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        company: z.string().optional(),
        phone: z.string().optional(),
        product: z.string().min(1, "Product is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await sendEmail(
          `New Product Inquiry — ${input.product}`,
          [
            { label: "Product", value: input.product },
            { label: "Name",    value: input.name },
            { label: "Email",   value: input.email },
            { label: "Company", value: input.company || "Not provided" },
            { label: "Phone",   value: input.phone   || "Not provided" },
          ],
          input.email
        );
        return { success: true, message: `Thank you! We'll be in touch soon with details about ${input.product}` };
      } catch (error) {
        console.error("Product inquiry error:", error);
        return { success: false, message: "Failed to submit inquiry. Please try again." };
      }
    }),
});
