const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");
      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }
// js code to toggle dark and light mode
      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        // js code to keep user selected mode even page refresh or file reopen
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });
// js code to toggle search box
        searchToggle.addEventListener("click" , () =>{
        searchToggle.classList.toggle("active");
      });
 
      
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});


// ccarousel button sectionone 
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let imgbox = document.getElementById("imgbox");

let scrollleft = 216;
prevBtn.addEventListener("click",()=>{
    imgbox.scrollBy({left:scrollleft,behavior:"smooth"});
})

nextBtn.addEventListener("click",()=>{
    imgbox.scrollBy({left:-scrollleft,behavior:"smooth"});
})


document.getElementById("viewAllBtn").addEventListener("click", function() {
    // Check if the user is logged in by checking localStorage
    let userEmail = localStorage.getItem("email"); // assuming email is used for login check
    
    if (userEmail) {
        // If user is logged in, redirect to full collection page
        window.location.href = "./products.html"; // Change this to the URL of your full collection page
    } else {
        // If user is not logged in, prompt them to log in and redirect
        alert("Please log in to view the full collection.");
        window.location.href = "./login.html"; // Redirect to login page
    }
});
