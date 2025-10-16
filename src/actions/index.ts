import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  newsletter: defineAction({
    input: z.object({
      email: z.string().email()
    }),
    async handler({ email }) {
      console.log(email);

      if(email === "test@test.com") {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: "User is not valid"
        })
      }

      return {
        success: true,
        message: "Email saved"
      }
      
      /* llamar a supabase
      para guardar el email en la tabla newsletter */
    }
  })
}