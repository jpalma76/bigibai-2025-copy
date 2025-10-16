import { supabase } from "@/supabase";

export const saveNewsLetterEmail = async (email: string) => {
  const { data, error } = await supabase.from('newsletter').insert({email})
  
  if(error) {
    console.log(error);
    
    return {
      success: true,
      error: "Error al guardar el email en la newsletter"
    }
  }

  return {
    success:true,
    error: null
  }
}