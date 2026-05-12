import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const formsRouter = router({
  submitContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        company: z.string().min(1, "Company is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await notifyOwner({
          title: "New Contact Form Submission - Website",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company}\nMessage: ${input.message}\n\nReply to: ${input.email}`,
        });

        return {
          success: true,
          message: "Contact form submitted successfully",
        };
      } catch (error) {
        console.error("Contact form submission error:", error);

        return {
          success: false,
          message: "Failed to submit contact form",
        };
      }
    }),

  submitAudit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        company: z.string().min(1, "Company is required"),
        teamSize: z.string(),
        challenge: z.string().min(10, "Challenge must be at least 10 characters"),
        auditAreas: z.array(z.string()).min(1, "Please select at least one audit area"),
        currentChallenges: z.string().min(10, "Please describe your current challenges"),
        automationGoals: z.string().min(10, "Please describe your automation goals"),
        timeline: z.string(),
        budget: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const auditAreasText = input.auditAreas.join(", ");

        await notifyOwner({
          title: "New Free Audit Request",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company}\nTeam Size: ${input.teamSize}\nChallenge: ${input.challenge}\n\nAudit Areas: ${auditAreasText}\n\nCurrent Challenges: ${input.currentChallenges}\n\nAutomation Goals: ${input.automationGoals}\n\nTimeline: ${input.timeline}\nBudget: ${input.budget}\n\nReply to: ${input.email}`,
        });

        return {
          success: true,
          message: "Audit request submitted successfully",
        };
      } catch (error) {
        console.error("Audit submission error:", error);

        return {
          success: false,
          message: "Failed to submit audit request",
        };
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
        await notifyOwner({
          title: "New Chatbot Message",
          content: `Message: ${input.message}`,
        });

        return {
          success: true,
          message: "Message submitted successfully",
        };
      } catch (error) {
        console.error("Chatbot message submission error:", error);

        return {
          success: false,
          message: "Failed to submit chatbot message",
        };
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
        await notifyOwner({
          title: "New Product Inquiry",
          content: `Product: ${input.product}\nName: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "Not provided"}\nPhone: ${input.phone || "Not provided"}\n\nReply to: ${input.email}`,
        });

        return {
          success: true,
          message:
            "Thank you! We'll be in touch soon with details about " +
            input.product,
        };
      } catch (error) {
        console.error("Product inquiry submission error:", error);

        return {
          success: false,
          message: "Failed to submit inquiry. Please try again.",
        };
      }
    }),
});
