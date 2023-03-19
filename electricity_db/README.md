# Electricity Generated Through varoius Renewable resources

A Backend Connectivty Project Using Nodejs and MongoDB.

Team Members:

Roll No.         Name

CB.EN.U4CSE21346 Rajyasri R A

CB.EN.U4CSE21362 Surya Ganapathy N

CB.EN.U4CSE21359 Sri Kailaash Kumar

CB.EN.U4CSE21319 Harshni Sri K S

## Getting Started

This project is a starting point for a Website that renders information from the database and reflects it.

A few resources to get you started if this is your first Node-MongoDB project:


1. Installation:

 a. Nodejs:

      https://nodejs.org/en/download/

 b. MongoDB:

      https://www.mongodb.com/docs/manual/installation/

2. Create a file index.js and npm init:

      https://docs.npmjs.com/creating-a-package-json-file


3. Install the required npm packages by refering the given links:

 a. express:
 
    https://www.npmjs.com/package/express
    
 b. mongoose:
 
    https://www.npmjs.com/package/mongoose
    
 c. ejs
 
    https://www.npmjs.com/package/ejs
    
 d. body-parser
 
    https://www.npmjs.com/package/body-parser
    
4. 

 a. Creating a server and listening port :

    const express = require("express");  
    const mongoose = require("mongoose");  
    const bodyParser = require('body-parser'); 
    const app = express();   
    const ejs = require('ejs'); 
    app.set('view engine','ejs');   
    app.use(express.json());  
    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(express.static(__dirname + '/public'));
    app.listen(3000, () => {
    console.log("Server is running at port 3000");});

 b. Connecting to the mongodb server :

    mongoose.connect('mongodb://127.0.0.1:27017/Electricitydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true});
    mongoose.set('strictQuery', false);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");});

 c. Defining Schema for different table(documents) in mongodb in index.js:

    1. const Renew_energy = new mongoose.Schema({
       Engery_id : String,
       Type : String,}) ;
       const Electricity = mongoose.model("Electricity",Renew_energy);

    2. const locSchema = new mongoose.Schema({
       Type : String,
       L_id : String,
       Location: String}) ;
       const Location = mongoose.model("Location",locSchema);

    3. const locelecSchema = new mongoose.Schema({
        L_id : String,
        Location: String,
        L_Egen : Number,
        L_Cons: Number,
        L_Waste : Number}) ;
       const Location_Electricity = mongoose.model("Location_Electricity",locelecSchema);

    4. const ObjectSchema = new mongoose.Schema({
        L_id : String,
        Location: String,
        O_id : String,
        Object: String,
        O_Egen : Number,
        O_Cost : Number,}) ;
        const Object = mongoose.model("Object",ObjectSchema);

    5. const loccostSchema = mongoose.Schema({
        L_id : String,
        Location: String,
        L_sp: Number,
        L_cp: Number,
        L_profit: Number,
        L_Loss:Number,});
        const Location_Cost = mongoose.model("Location_Cost",loccostSchema);

    6. const TypeElecSchema = mongoose.Schema({
        Engery_id: String,
        Type : String,
        E_gen : Number,
        E_Cons : Number,
        E_Wastage : Number});
        const Type_Electricity = mongoose.model("Type_Electricity",TypeElecSchema);

    7. const TypeCostSchema = mongoose.Schema({
        Engery_id: String,
        Type : String,
        E_sp : Number,
        E_cp : Number,
        E_profit : Number,
        E_loss: Number});
        const Type_Cost = mongoose.model("Type_Cost",TypeCostSchema);



5. You can populate data into respective tables in index.js or directly in mongodb refer table1.html to table7.html for data for tables:

 a. index.js

    const le1 = new Location_Electricity({
    L_id : "C01",
    Location: "Coimbature",
    L_Egen : 37961,
    L_Cons: 25841,
    L_Waste : 12120});
    le1.save();

6. Setting up The get and post requests with quering from db:

 a. index.js

    app.get('/location.html',(req,res)=>{
    res.sendFile(__dirname+"/location.html");});

    app.post('/locsubmit', (req, res) => {
    var lid = req.body.L_id;
    var loc = req.body.Location;
    Location_Electricity.find({L_id:lid,Location:loc},function(err, elec) {
    console.log(elec);
    res.render('index3',{
    eleclist: elec})})

b. location.html

c. index3.ejs

7. Go to terminal Run node index.js


