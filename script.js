console.log("✅ Connected")


let burger = document.getElementById("burger")
let menu = document.getElementById("sideMenu")
let main = document.getElementById("main")
let body = document.getElementById("body")

// BugHunter =>  Dimitri
burger.addEventListener("click", () => {
    if (menu.getAttribute("data-toggle") == "closed") {
        menu.setAttribute("data-toggle", "open")
        burger.style.left = "0"
        menu.style.left = "calc(100% / 3 * 2)"
        main.classList.toggle("blur")
        menu.classList.toggle("blur")
        console.log("opened")
        
    } else if (menu.getAttribute("data-toggle") =="open") {
        menu.setAttribute("data-toggle", "closed")
        burger.style.left = "calc(100% - 10vh)"
        menu.style.left = "105%"
        main.classList.toggle("blur")
        menu.classList.toggle("blur")
        console.log("closed")
        

    }
})