console.log("✅ Connected");

let burger = document.getElementById("burger");
let menu = document.getElementById("sideMenu");
let main = document.getElementById("main");
let body = document.getElementById("body");
let links = Array.from(
  document.getElementsByClassName("navbar_menu_links_list_link")
); /** Creating an array from the HTMLcollection and passing it to 'links'*/

// Add an event listener to buttons and burger which executes menuToggle()
links.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle();
  });
});
burger.addEventListener("click", () => {
  menuToggle();
});

function menuToggle() {
  /* execute if the menu is closed */
  if (menu.getAttribute("data-toggle") == "closed") {
    menu.setAttribute("data-toggle", "open");
    menu.classList.toggle('hide')
    menu.style.display = "block";
    setTimeout(function(){
      menu.style.left = "0";
      main.classList.toggle("blur");
      menu.classList.toggle("blur");
    }, 1)

    /* execute if the menu is open */
  } else if (menu.getAttribute("data-toggle") == "open") {
    menu.setAttribute("data-toggle", "closed");
    menu.style.left = "105%";
    main.classList.toggle("blur");
    menu.classList.toggle("blur");
    setTimeout(function(){
      menu.classList.toggle('hide')},
      1000);
  }
}