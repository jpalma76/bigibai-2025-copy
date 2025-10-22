/* Conexión a la base de datos para guardar el email */
import { supabase } from "@/supabase"

const ERROR_CODE_ALREADY_EXISTS = "23505"

export const saveNewsletterEmail = async ( email: string ) => {
  const { error } = await supabase.from('newsletter').insert({ email })
  console.log(error);
  
  // si el email ya se encuentra registrado
  if (error?.code === ERROR_CODE_ALREADY_EXISTS) {
    return {
      duplicated: true,
      success: true,
      error: "El email existe!"
    }
  }

  // Si hay algun error
  if(error) {
    console.log(error);
    
    return {
      duplicated: false,
      success: true,
      error: "Error al guardar el email!"
    }
  }

  // si no hay ningún error
  return {
    duplicated: false,
    success: true,
    error: "Email guardado exitosamente!"
  }
}