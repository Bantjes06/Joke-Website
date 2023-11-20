import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Declaring port, app for express usage and api url
const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

//Enabling use for static files
app.use(express.static("public"));

//Enabling body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//Defining get route
app.get("/", (req, res) => {
      res.render("index.ejs");
  });

  //Defining post route
app.post('/handle-joke', async (req, res) => {
    const jokeType = req.body.jokeType;

    try {
        const response = await axios.get(API_URL + jokeType);
        const type = response.data;
        const joke = response.data.joke;
        const setup = response.data.setup;
        const delivery = response.data.delivery;
        console.log(type.type);
        res.render("index.ejs", {
            joke: joke,
            setup: setup,
            delivery: delivery,
            type: type
        });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).send('Error fetching joke');
    }
});

//Binding to port 3000
app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
})