
const APP_ID = "application-0-dlasr";
const ATLAS_SERVICE = "mongodb-atlas";
const app = new Realm.App({ id: APP_ID });

const API_KEY_HY = "d49b1b79-d2c7-458f-823c-8643ba31528b";


let user_id = null;
let mongodb = null;
let coll = null;
const API_KEY = "d49b1b79-d2c7-458f-823c-8643ba31528b";


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

  try{
    const email = getUser();
    const password = getPass();
    await app.emailPasswordAuth.registerUser({ email, password });
    }
    catch (err) {
        console.error("User alr exists", err);
      }
    

  const credentials = Realm.Credentials.emailPassword(getUser(), getPass());
  console.log(credentials);
  try {
    const user = await app.logIn(credentials);
    $("#userid").empty().append(user.id); // update the user div with the user ID
    $("#emailLogged").empty().append(getUser); // update the email address section with the email address
    user_id = user.id;
    mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    coll = mongodb.db("FINALPROJECT").collection("FINAL");
    console.log(coll);
    switcharoo()
    find_todos()

  } catch (err) {
    console.error("Failed to log in", err);
  }
};

// Function executed by the create button.
const insert_todo = async () => {
  const task = document.getElementById("taskInput").value;
  const userEmail = getUser();
  await coll.insertOne({ task, status: false, owner_id: user_id, userEmail });
  find_todos();
};

async function update(playerUUID, p2,d,todos_div ){
  sessvar = null;
fetch("https://api.hypixel.net/status?uuid=" + playerUUID + "&key=" + API_KEY_HY)
.then((result) => result.json())
.then(({ session }) => {
  //

  if(session.online){
    p2.append("online");
    d.appendChild(p2)
    todos_div.append(d);
    }
    else{
    p2.append("offline");
    d.appendChild(p2)
    todos_div.append(d);

    }

})
}


const delete_todo = async () => {
  console.log("DELETE");
  const task = document.getElementById("taskInput").value;
  await coll.deleteOne({ task, owner_id: user_id });
  find_todos();
};

// Function executed by the "FIND" button.
const find_todos = async () => {
  if (mongodb == null || coll == null) {
    $("#userid").empty().append("Need to login first.");
    console.error("Need to log in first", err);
    return;
  }

  //here's where it actually makes it a usable object
  
  var divElement = document.getElementById("todos");
  var paragraphCount = 0;
  
  var childNodes = divElement.children;
  

  const todos = await coll.find(
    {},
    {
      projection: {
        _id: 0,
        task: 1,
        status: 1
      }
    }
  );

  // Access the todos div and clear it.
  let todos_div = $("#todos");
  todos_div.empty();

  // Loop through the todos and display them in the todos div.
  for (const todo of todos) {
    let d = document.createElement("div");
    let p = document.createElement("p");
    p.append(todo.task);
    d.appendChild(p)
    p.setAttribute("id", "UUID");

    let p2 = document.createElement("p");
    p2.append(" is ");

    update(todo.task, p2,d,todos_div)





  }
};
