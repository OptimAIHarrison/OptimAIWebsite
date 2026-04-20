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
          title: "New Contact Form Submission - hello@optimai.com.au",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company}\nMessage: ${input.message}\n\nReply to: ${input.email}`,
        });
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
        challenge: z.string().min(10, "Please describe your challenge"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await notifyOwner({
          title: "New Free Audit Request - hello@optimai.com.au",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company}\nTeam Size: ${input.teamSize}\nChallenge: ${input.challenge}\n\nReply to: ${input.email}`,
        });
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
        await notifyOwner({
          title: "New Chatbot Message - hello@optimai.com.au",
          content: `Message: ${input.message}`,
        });
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
        await notifyOwner({
          title: "New Product Inquiry - hello@optimai.com.au",
          content: `Product: ${input.product}\nName: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "Not provided"}\nPhone: ${input.phone || "Not provided"}\n\nReply to: ${input.email}`,
        });
        return { success: true, message: "Thank you! We'll be in touch soon with details about " + input.product };
      } catch (error) {
        console.error("Product inquiry submission error:", error);
        return { success: false, message: "Failed to submit inquiry. Please try again." };
      }
    }),
});
