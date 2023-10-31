// Importing necessary libraries and modules
const express = require("express"); 
const storage = require("node-persist");  
const cors = require("cors"); //  Cross-Origin Resource Sharing for triggering backend from frontend

// Creating an Express application
const app = express();
// Initializing the storage
storage.init();

// Body parsing middleware of incoming JSON requests
app.use(express.json());
// Setting up CORS middleware to handle cross-origin requests
app.use(cors());

//Defining a POST route to add the To-Do's
app.post("/", async (req, res) => {
  try {
    // Extracting data from the request body (Destructuring)
    const { task } = req.body;
    // console.log("Received POST request with data:", req.body.task);

    // Store the task data with the provided ID
    const resp = await storage.setItem(task, {task});

    // Respond with a 201 status (Created) and the created a todo item
    res.status(201).send(resp);
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).send(error);
  }
});
//Defining a GET route to get the To-Do's
app.get("/", async (req, res) => {
  try {
    // Retrieve all the todo items
    const resp = await storage.values();
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Clear the Node-persist storage after each restarts
const clear = async ()=>{
      await storage.init();
  try {
    await storage.clear()
    console.log("Storage cleared.");
  } catch (error) {
    console.log(error)
  }
}


// Starting the server and listening on the 5000 port
app.listen(5000, async () => {
  console.log("Server Started on PORT 5000 successfully");
  await clear();
});
