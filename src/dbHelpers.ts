import { Database } from "./types/supabase.ts"
import { supabase } from "./supabaseClient.ts"

export type DbTask = Database["public"]["Tables"]["tasks"]["Row"]

export async function addTask(tasks:string):Promise<DbTask | null> {
    const { data, error } = await supabase
        .from("tasks")
        .insert({ tasks })
        .single();
    
    if (error) { 
        console.error("Error adding task : ", error);
        return null
    }
    return data;
    
}


export async function fetchTask(): Promise<DbTask[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true });
  
      if (error) {
        console.error('Error fetching tasks:', error);
        return [];
      }
  
      console.log(data);
      return data;
    } catch (error) {
      console.error('Unexpected error:', error);
      return [];
    }
  }
  
    