import express from "express"; 
import path from "path"; 
import { MongoClient, ObjectId } from "mongodb"; //use MongoClient to connect and run commands/queries

//For ES6 only (below)
const __dirname = import.meta.dirname; //Under the ES5 syntax (CJS -- Common JavaScript), __dirname was a special variable used to get the app's directory (current directory for this file)

//Create MongoDB client to run commands/queries on
const dbUrl = "mongodb://127.0.0.1:27017/"; /* localhost = 127.0.0.1 */
const db = new MongoClient(dbUrl).db("testdb"); //create a client to connect to the database cluster, then select the "testdb" database

const app = express(); //create an Express application
const port = process.env.PORT || "8888"; //process.env.PORT is an environment variable named PORT (this line of code will look to see if a PORT already exists/is set; if not, use "8888")

//set up Express app to use Pug as a template engine
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "pug");

//set up folder for static files to be used in Express app
app.use(express.static(path.join(__dirname, "public")));

//USEFUL FOR FORMS
//Set up Express app to allow urlencoded format (query string format) to use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//test Express app
app.get("/", async (request, response) => {
  let linkList = await getLinks();
  response.render("index", { title: "Home", links: linkList });
});
app.get("/about", async (request, response) => {
  let linkList = await getLinks();
  response.render("about", { title: "About", links: linkList });
});

//MENU LINK ADMIN PAGES
//Common main admin page for menu link administration
app.get("/admin/menu", async (request, response) => {
  let linkList = await getLinks();
  response.render("menu-list", { title: "Menu admin", links: linkList});
});
//CREATE
app.get("/admin/menu/add", async (request, response) => {
  let linkList = await getLinks();
  response.render("menu-add", { title: "Add link", links: linkList});
});
//Need app.post because the incoming data on submit is from a POST form (i.e. method="post")
app.post("/admin/menu/add/submit", async (request, response) => {
  //For POST requests, incoming data is in the body, so you need to access the data using request.body.<field_name>
  //console.log(request.body.name);
  let newLink = {
    weight: parseInt(request.body.weight),
    name: request.body.name,
    path: request.body.path
  };
  await addLink(newLink);
  response.redirect("/admin/menu");
});
//DELETE
app.get("/admin/menu/delete", async (request, response) => {
  //For GET requests, incoming data is via the query string, hence request.query.<field_name>
  //console.log(request.query.linkId);
  await deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
});

// EDIT
app.get("/admin/menu/edit", async (request, response) => {
  let linkList = await getLinks();
  // Get the link to edit using the _id from query string
  let linkToEdit = await db.collection("menuLinks").findOne({ _id: new ObjectId(request.query.linkId) });
  response.render("menu-edit", { 
    title: "Edit link", 
    links: linkList,
    editLink: linkToEdit 
  });
});

// Step 3: route to process edit form submission
app.post("/admin/menu/edit/submit", async (request, response) => {
  // Create filter to find the link to update
  let editFilter = { _id: new ObjectId(request.body.linkId) };
  // Create object with updated values
  let updatedLink = {
    weight: parseInt(request.body.weight),
    name: request.body.name,
    path: request.body.path
  };
  // Call editLink function to update
  await editLink(editFilter, updatedLink);
  response.redirect("/admin/menu");
});

// For link modification
async function editLink(filter, linkDoc) {
  let updateAction = {
    $set: {
      weight: linkDoc.weight,
      name: linkDoc.name,
      path: linkDoc.path
    }
  };
  let result = await db.collection("menuLinks").updateOne(filter, updateAction);
  if (result.modifiedCount === 1)
    console.log("Link updated successfully");
}


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); //since Node.js is server side, console.log() will log to the TERMINAL not in the browser's console
});

//MONGODB FUNCTIONS
/*
 * Retrieve all link documents from the menuLinks collection.
 */
async function getLinks() {
  let results = db.collection("menuLinks").find({}).sort({weight: 1}); //for select all, use an empty query for find() - {}
  //find() returns a cursor to the results. To retrieve the array of results you need to run .toArray() which is asynchronous.
  return await results.toArray(); //use await to wait for the array before prematurely returning
}

/*
 * Insert one menu link document given a JSON object containing the fields weight, name, and path.
 */
async function addLink(linkDoc) {
  let result = await db.collection("menuLinks").insertOne(linkDoc);
  if (result.insertedId)
    console.log("Link inserted successfully");
}

/*
 * Delete a single menu link by _id.
 */
async function deleteLink(id) {
  console.log(id); //coming from the query string, it needs to be converted to an ObjectId type
  let deleteFilter = { _id: new ObjectId(id) }; //using ObjectId to convert a number like this is deprecated but it still works (there isn't, as far as I know, an equivalent way to do this with any of the non-deprecated code)
  let result = await db.collection("menuLinks").deleteOne(deleteFilter);
  if (result.deletedCount === 1)
    console.log("Link deleted");
}