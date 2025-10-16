import { saveNewsLetterEmail } from '@/newsletter/services/subscribe';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  newsletter: defineAction({
    input: z.object({
      email: z.string().email()
    }),

    async handler({ email }) {
      console.log(email);

      const { success, error } = await saveNewsLetterEmail(email)
      
      if (!success) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error ?? "error al guadar wn la newsletter"
        })
      }

      return {
        success: true,
        message: "Email saved"
      }
    }
  })
}