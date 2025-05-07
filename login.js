// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

function show() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'text');
}

function hide() {
    var p = document.getElementById('pwd');
    p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);



// let username = document.getElementById("txt-input").value;
// console.log(username);

// let passwordInput = document.getElementById("pwd").value;
// console.log(password);

let form = document.querySelector("form");
console.log(form);

form.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.innerText=="Log In"){
        console.log("hi");

        let username = document.getElementById("txt-input").value;
        let passwordInput = document.getElementById("pwd").value;

        let email = window.localStorage.getItem("email");
        // let phone = window.localStorage.getItem("phone");
        let password = window.localStorage.getItem("password");

        if((username === email && passwordInput === password )){
                window.location.href="./index.html";
        }
        else{
            window.alert("Invalid Username or password");
        }
        
        
    }
})