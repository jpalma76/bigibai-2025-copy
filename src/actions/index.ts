import { saveNewsletterEmail } from '@/newsletter/sevices/subscribe'; 
import { ActionError, defineAction } from 'astro:actions';
import { string, z } from 'astro:schema';

export const server = {
  newsletter: defineAction({
    input: z.object({
      email: z.string().email("¡Lo siento, El email no es válido!")
    }),
    async handler({ email }) {
      const { success, duplicated } = await saveNewsletterEmail(email);

      if (!success) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: "¡Error al Guardar en la newsletter!"
        })
      }

      if (duplicated) {
        return {
          success: false,
          message: "¡Este usuario ya estaba en la newsletter"
        }
      }

      if (success) {
        return {
          success: true,
          message: "¡Te has suscrito a la newsletter!"
        }
      }
    }
  })
}