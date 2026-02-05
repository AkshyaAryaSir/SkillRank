const API = "YOUR_APPS_SCRIPT_URL";

function login(){
  const email = emailEl().value;
  const password = passEl().value;
  msg("");

  fetch(API,{
    method:"POST",
    body:JSON.stringify({action:"login",email,password})
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.status==="success"){
      sessionStorage.setItem("token",d.token);
      location.href="dashboard.html";
    }else msg(d.message);
  });
}

function signup(){
  fetch(API,{
    method:"POST",
    body:JSON.stringify({
      action:"signup",
      name:nameEl().value,
      email:emailEl().value,
      password:passEl().value,
      role:roleEl().value
    })
  })
  .then(r=>r.json())
  .then(d=>msg(d.message));
}

function msg(t){document.getElementById("msg").innerText=t;}
const emailEl=()=>document.getElementById("email");
const passEl=()=>document.getElementById("password");
const nameEl=()=>document.getElementById("name");
const roleEl=()=>document.getElementById("role");
