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
});
