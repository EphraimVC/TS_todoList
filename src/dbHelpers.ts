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
  

export async function updateTaskStatus(id: string, change: boolean | string): Promise<void>{
  let updatedStatus;
  typeof change === "string" ?updatedStatus = { tasks: change } : updatedStatus = {is_complete: change}

  const { error } = await supabase
    .from("tasks")
    .update(updatedStatus)
    .eq("id", id);
  
  if (error) { 
    console.error("Error updating task: ", error)
  }
}

 
export async function deleteTask(id:string):Promise<void> { 
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);
  if (error) { 
    console.error("Error deleting task :", error);
  }
}

