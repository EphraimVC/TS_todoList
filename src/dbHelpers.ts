import { Database } from "./types/supabase.ts"
import { supabase } from "./supabaseClient.ts"

type DbTask = Database["public"]["Tables"]["tasks"]["Row"]

export async function addTask(title:string):Promise<DbTask | null> {
    const { data, error } = await supabase
        .from("tasks")
        .insert({ title })
        .single();
    
    if (error) { 
        console.error("Error adding task : ", error);
        return null
    }
    return data;
}
