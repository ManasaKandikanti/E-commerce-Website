function showPassword() {
    document.getElementById('signup-pwd').setAttribute('type', 'text');
  }
  
  function hidePassword() {
    document.getElementById('signup-pwd').setAttribute('type', 'password');
  }
  
  let isShown = false;
  
  document.getElementById("signup-eye").addEventListener("click", function () {
    isShown = !isShown;
    isShown ? showPassword() : hidePassword();
  });
  

let email = document.getElementById("email");
console.log(email);

let phone = document.getElementById("phone");
console.log(phone);

let pwd = document.getElementById("signup-pwd");
console.log(pwd);

let form = document.querySelector("form");
console.log(form);

form.addEventListener("click",(e)=>{
  e.preventDefault();
  if(e.target.innerText=="Sign up"){
    console.log(email.value);
    console.log(phone.value);
    console.log(pwd.value);
    
    window.localStorage.setItem("email",email.value);
    window.localStorage.setItem("phone",phone.value);
    window.localStorage.setItem("password",pwd.value);

    window.location.href = "./login.html";
  }
})