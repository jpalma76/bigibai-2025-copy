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
      
      const { success, error, duplicated } = await saveNewsLetterEmail(email)
      
      if (!success) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error ?? "error al guadar en la newsletter"
        })
      }

      if (duplicated) {
        return {
          success: true,
          message: "¡Este usuario ya está en la newsletter!"
        }
      }

      return {
        success: true,
        message: "Te has suscrito a la newsletter"
      }
    }
  })
}