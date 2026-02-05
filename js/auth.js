const API_URL = "YOUR_APPS_SCRIPT_WEBAPP_URL";

function login(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");
  const btn = document.getElementById("btn");

  msg.innerText = "";

  if(!email || !password){
    msg.innerText = "❌ Email & Password required";
    return;
  }

  btn.disabled = true;
  msg.innerText = "🔐 Authenticating...";

  fetch(API_URL,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      action:"LOGIN",
      data:{ email, password }
    })
  })
  .then(res=>res.json())
  .then(res=>{
    btn.disabled=false;

    if(res.success){
      localStorage.setItem("skillrank_token",res.token);
      localStorage.setItem("skillrank_role",res.role);
      msg.innerText="✅ Login successful";

      setTimeout(()=>{
        location.href = res.role.toLowerCase() + "-dashboard.html";
      },600);

    }else{
      msg.innerText="❌ "+res.message;
    }
  })
  .catch(()=>{
    btn.disabled=false;
    msg.innerText="❌ Server error";
  });
}
