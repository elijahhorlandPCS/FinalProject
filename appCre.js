const APP_ID = "application-0-dlasr";
const ATLAS_SERVICE = "mongodb-atlas";
const app = new Realm.App({ id: APP_ID });

let user_id = null;
let mongodb = null;
let coll = null;


const switcharooNH = document.getElementsByClassName("switcharooNH");
const switcharooNV = document.getElementsByClassName("switcharooNV");
function switcharoo() {
  for (let i = 0; i < switcharooNH.length; i++) {
    switcharooNH[i].style.display = "block";
  }
  
  for (let i = 0; i < switcharooNV.length; i++) {
    switcharooNV[i].style.display = "none";
  }
}

function getUser() {
  return document.getElementById("username").value;
}

function getPass() {
  return document.getElementById("password").value;
}


// Function executed by the LOGIN button.
const login = async () => {
switcharoo
try{
const email = getUser();
const password = getPass();
await app.emailPasswordAuth.registerUser({ email, password });
switcharoo()
error = document.getElementById("error")
error.classList.add('hidden')
error = document.getElementById("error2")
error.classList.remove('hidden')
}
catch (err) {
    console.error("User alr exists", err);
    error = document.getElementById("error")
    error.classList.remove('hidden')
  }
}
