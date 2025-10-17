import { supabase } from "@/supabase";

const ERROR_CODE_ALREADY_EXIST ="23505"

export const saveNewsLetterEmail = async (email: string) => {
  const { error } = await supabase.from('newsletter').insert({email})
  
  if (error?.code === ERROR_CODE_ALREADY_EXIST) {
    return {
      duplicated: true,
      success: false,
      error: "¡El email ya existe en la newsletter!"
    }
  }

  if(error) {
    console.error(error);
    
    return {
      duplicated: false,
      success: true,
      error: "Error al guardar el email en la newsletter"
    }
  }

  return {
    duplicated: false,
    success:true,
    error: null
  }
}