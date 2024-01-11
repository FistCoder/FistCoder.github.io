console.log("✅ Connected");

let burger = document.getElementById("burger");
let menu = document.getElementById("sideMenu");
let main = document.getElementById("main");
let body = document.getElementById("body");
let links = Array.from(
  document.getElementsByClassName("navbar_menu_links_list_link")
); /** Creating an array from the HTMLcollection and passing it to 'links'*/

// For each link from the 'links' array add an event listener and execute menuToggle()
links.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle();
  });
});

// Listen for clicks of the burger and execute menuToggle() each time it is clicked
burger.addEventListener("click", () => {
  menuToggle();
});

function menuToggle() {
  if (menu.getAttribute("data-toggle") == "closed") {
    /* execute if the menu is closed */
    menu.setAttribute("data-toggle", "open");
    burger.style.left = "0";
    menu.style.left = "calc(100% / 3 * 2)";
    main.classList.toggle("blur");
    menu.classList.toggle("blur");
    console.log("opened");
  } else if (menu.getAttribute("data-toggle") == "open") {
    /* execute if the menu is open */
    menu.setAttribute("data-toggle", "closed");
    burger.style.left = "calc(100% - 10vh)";
    menu.style.left = "105%";
    main.classList.toggle("blur");
    menu.classList.toggle("blur");
    console.log("closed");
  }
}
