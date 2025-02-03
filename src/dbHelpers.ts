import { Database } from "./types/supabase.ts"
import { supabase } from "./supabaseClient.ts"
import { UUIDTypes } from "uuid";

export type DbTask = Database["public"]["Tables"]["tasks"]["Row"]
// ------------------------------------------------------------------------------- 
export async function getUserId() {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error)
  } else {
    return user.user.id
  }
}
// ------------------------------------------------------------------------------- 
export async function addTask(tasks: string): Promise<DbTask | null> {
  console.log(tasks)
  //vi är inte autentiserade här
    const { data, error } = await supabase
        .from("tasks")
        .insert([{ tasks, is_complete: false, user_id: await getUserId() }])
        .single();
    
    if (error) { 
        console.error("Error adding task : ", error);
        return null
    }
    return data;
}
// ------------------------------------------------------------------------------- 
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
      return data;
    } catch (error) {
      console.error('Unexpected error:', error);
      return [];
    }
}
 // -------------------------------------------------------------------------------  

export async function updateTaskStatus(id: string, change: string): Promise<void> {
  const { error } = await supabase
  .from("tasks")
  .update({tasks:change})
  .eq("id", id);
  if (error) { 
    console.error("Error updating task: ", error)
  }
  fetchTask()
}


// -------------------------------------------------------------------------------  
export async function deleteTask(id: string): Promise<void> { 
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", await getUserId()
    )
  if (error) {
    console.error("Error deleting task :", error);
  } else {  
    fetchTask()
  }
}
// -------------------------------------------------------------------------------  