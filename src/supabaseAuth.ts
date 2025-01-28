import { supabase } from "./supabaseClient.ts";
import { renderList } from "./main.ts";

const emailInput = document.querySelector ("#emailInput")! as HTMLInputElement;
const passwordInput = document.querySelector("#passwordInput")! as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn")! as HTMLButtonElement;
const errorMessage = document.querySelector("#errorMessage")! as HTMLParagraphElement;

 async function login () {
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
            window.location.assign("/index.html") 
          
        }
    } catch (error) {
        console.error("Login error: ", error)
        errorMessage.textContent = "unexpected error occured"
    }
};

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { 
        if (emailInput.value === " " && passwordInput.value === " ") return;
       login()
    }
})
loginBtn.addEventListener("click", () => {
       login()
})