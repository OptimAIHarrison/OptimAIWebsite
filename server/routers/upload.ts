import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";

export const uploadRouter = router({
  uploadImage: adminProcedure
    .input(
      z.object({
        file: z.instanceof(Buffer),
        filename: z.string(),
        mimetype: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await storagePut(
          `articles/${Date.now()}-${input.filename}`,
          input.file,
          input.mimetype
        );
        return { success: true, url: result.url, key: result.key };
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Failed to upload image");
      }
    }),
});
