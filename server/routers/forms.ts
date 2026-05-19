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
        const body = [
          `Name:    ${input.name}`,
          `Email:   ${input.email}`,
          `Company: ${input.company}`,
          ``,
          `Message:`,
          input.message,
        ].join("\n");

        await sendEmail(
          "New Contact Form Submission",
          body,
          input.email
        );

        return { success: true, message: "Thank you! We'll be in touch soon." };
      } catch (error) {
        console.error("Contact form submission error:", error);
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
        const body = [
          `Name:      ${input.name}`,
          `Email:     ${input.email}`,
          `Company:   ${input.company}`,
          `Team Size: ${input.teamSize}`,
          `Timeline:  ${input.timeline}`,
          `Budget:    ${input.budget}`,
          ``,
          `Audit Areas:`,
          input.auditAreas.map(a => `  - ${a}`).join("\n"),
          ``,
          `Primary Challenge:`,
          input.challenge,
          ``,
          `Current Challenges:`,
          input.currentChallenges,
          ``,
          `Automation Goals:`,
          input.automationGoals,
        ].join("\n");

        await sendEmail(
          "New Free Audit Request",
          body,
          input.email
        );

        return { success: true, message: "Audit request submitted! We'll contact you within 24 hours." };
      } catch (error) {
        console.error("Audit form submission error:", error);
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
        const body = `Chatbot Message:\n${input.message}`;

        await sendEmail(
          "New Chatbot Message",
          body
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
        const body = [
          `Product: ${input.product}`,
          ``,
          `Name:    ${input.name}`,
          `Email:   ${input.email}`,
          `Company: ${input.company || "Not provided"}`,
          `Phone:   ${input.phone || "Not provided"}`,
        ].join("\n");

        await sendEmail(
          `New Product Inquiry — ${input.product}`,
          body,
          input.email
        );

        return { success: true, message: `Thank you! We'll be in touch soon with details about ${input.product}` };
      } catch (error) {
        console.error("Product inquiry submission error:", error);
        return { success: false, message: "Failed to submit inquiry. Please try again." };
      }
    }),
});
