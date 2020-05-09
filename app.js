const express = require('express');
// Ensimmäinen arvo on ympäristömuuttuja ja toinen paikallisen koneen portti
const port = process.env.PORT || 8080; 
//npm install mongoose
const mongoose = require('mongoose');
const app = express();

const body_parser = require('body-parser');

const machine_parameters = require('./machine_parameters');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); // material/id

// RESTfull API
// CRUD OPERATIONS
// CREATE
app.post("/api/machining-parameter-set", machine_parameters.api_post_parameter);

// READ, lue kaikki parameterit
app.get("/api/machining-parameter-sets", machine_parameters.api_get_all_parameters);

// READ, lue tietty parametri id perusteella
app.get("/api/machining-parameter-set/:id", machine_parameters.api_get_parameter);

// UPDATE
app.put("/api/machining-parameter-set/:id", machine_parameters.api_put_parameter);

// DELETE
app.delete("/api/machining-parameter-set/:id", machine_parameters.api_delete_parameter);

// mongodb+srv://serveruser:<password>@cluster0-bupiy.mongodb.net/test?retryWrites=true&w=majority
const database_uri = "mongodb+srv://serveruser:fo6ZdflfWcjwzWmR@cluster0-bupiy.mongodb.net/machine-parameters?retryWrites=true&w=majority";
mongoose.connect(database_uri, {
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(()=>{
    console.log('database connected');
    app.listen(port);
}).catch(err=>{
    console.log(err);
});
