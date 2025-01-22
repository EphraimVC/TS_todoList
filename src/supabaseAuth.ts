import { supabase } from "./supabaseClient";
import { renderList } from "./main";

const emailInput = document.querySelector("#emailInput")! as HTMLInputElement;
const passwordInput = document.querySelector("#passwordInput")! as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn")! as HTMLButtonElement;
const errorMessage = document.querySelector("#errorMessage")! as HTMLParagraphElement;
const authForm = document.querySelector(".auth-form")! as HTMLDivElement
const tasksDisplay = document.querySelector(".task-form")! as HTMLDivElement 

 loginBtn.onclick = async () => {
    console.log("login btn clicked");
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    if (!email || !password) {
        errorMessage.textContent = "Please fill in both fields"
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            errorMessage.textContent = error.message
        } else {
            errorMessage.textContent = `Login Succesfull \n Welcome ${data.user.email}`
            console.log("logged in user", data.user);
            await renderList()
            tasksDisplay.classList.remove("hide")
            authForm.classList.add("hide")
           
          
        }
    } catch (error) {
        console.error("Login error: ", error)
        errorMessage.textContent = "unexpected error occured"
    }
};
