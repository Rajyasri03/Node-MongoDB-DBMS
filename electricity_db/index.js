const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');
app.set('view engine','ejs'); 



app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://127.0.0.1:27017/Electricitydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.set('strictQuery', false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const Renew_energy = new mongoose.Schema({
    
    Engery_id : String,
    Type : String,
    

}) ;
const Electricity = mongoose.model("Electricity",Renew_energy);

// const electricity1 = new Electricity({
//      Engery_id: "S01",
//      Type:"Solar"
// });

// const electricity2 = new Electricity({
//     Engery_id: "S02",
//     Type:"Hydro"
// });

// Electricity.insertMany([electricity1,electricity2],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully saved");
//     }
// });

// Electricity.find(function(err,Electricity){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(Electricity);
        
//     }
// });

const locSchema = new mongoose.Schema({
    Type : String,
    L_id : String,
    Location: String
}) ;
const Location = mongoose.model("Location",locSchema);

// const location1 = new Location({
//      Type:"Solar",
//      L_id: "C01",
//      Location:"Coimbatore"
// });

// app.post('/', (req, res) => {
//     var type = req.body.Type;
//     Location.find({Type:type},function(err, elec) {
//         console.log(elec);
//         res.render('index2',{
//             eleclist: elec
//         })
//     })
// });

const locelecSchema = new mongoose.Schema({
        L_id : String,
        Location: String,
        L_Egen : Number,
        L_Cons: Number,
        L_Waste : Number
    }) ;

const Location_Electricity = mongoose.model("Location_Electricity",locelecSchema);


    // const le1 = new Location_Electricity({
    //     L_id : "C01",
    //     Location: "Coimbature",
    //     L_Egen : 37961,
    //     L_Cons: 25841,
    //     L_Waste : 12120
    // });
    // le1.save();

    // app.post('/', (req, res) => {
    //     var lid = req.body.L_id;
    //     var loc = req.body.Location;
    //     Location_Electricity.find({L_id:lid,Location:loc},function(err, elec) {
    //         console.log(elec);
    //         res.render('index3',{
    //             eleclist: elec
    //         })
    //     })
    // });
    const ObjectSchema = new mongoose.Schema({
    
        L_id : String,
        Location: String,
        O_id : String,
        Object: String,
        O_Egen : Number,
        O_Cost : Number,
    
    }) ;
    const Object = mongoose.model("Object",ObjectSchema);
    // const obj1 = new Object({
    //     L_id : "C01",
    //     Location: "Coimbatore",
    //     O_id : "O01",
    //     Object: "Solar Pannel",
    //     O_Egen : 12548,
    //     O_Cost : 50000,
    // })
    // obj1.save();
    // app.post('/', (req, res) => {
    //     var lid = req.body.L_id;
    //     var loc = req.body.Location;
    //     Object.find({L_id:lid,Location:loc},function(err, elec) {
    //         console.log(elec);
    //         res.render('index4',{
    //             eleclist: elec
    //         })
    //     })
    // });

    const loccostSchema = mongoose.Schema({
        L_id : String,
        Location: String,
        L_sp: Number,
        L_cp: Number,
        L_profit: Number,
        L_Loss:Number,

    });
    const Location_Cost = mongoose.model("Location_Cost",loccostSchema);
    // const lc1 = new Location_Cost({
    //     L_id : "C01",
    //     Location: "Coimbatore",
    //     L_sp: 542183,
    //     L_cp: 100000,
    //     L_profit:442183,
    //     L_Loss:0,
    // });
    // lc1.save();
    // app.post('/', (req, res) => {
    //     var lid = req.body.L_id;
    //     var loc = req.body.Location;
    //     Location_Cost.find({L_id:lid,Location:loc},function(err, elec) {
    //         console.log(elec);
    //         res.render('index5',{
    //             eleclist: elec
    //         })
    //     })
    // });

    const TypeElecSchema = mongoose.Schema({
        Engery_id: String,
        Type : String,
        E_gen : Number,
        E_Cons : Number,
        E_Wastage : Number
    });

    const Type_Electricity = mongoose.model("Type_Electricity",TypeElecSchema);

    // const te1 = new Type_Electricity({
    //     Engery_id: "S01",
    //     Type : "Solar",
    //     E_gen : 195546,
    //     E_Cons : 104642,
    //     E_Wastage : 90904
    // });
    // te1.save();
    // app.post('/', (req, res) => {
    //     var type = req.body.Type;
    //     Type_Electricity.find({Type:type},function(err, elec) {
    //         console.log(elec);
    //         res.render('index6',{
    //             eleclist: elec
    //         })
    //     })
    // });

    const TypeCostSchema = mongoose.Schema({
        Engery_id: String,
        Type : String,
        E_sp : Number,
        E_cp : Number,
        E_profit : Number,
        E_loss: Number
    });
    const Type_Cost = mongoose.model("Type_Cost",TypeCostSchema);

    // const tc1 = new Type_Cost({
    //     Engery_id: "S01",
    //     Type : "Solar",
    //     E_sp : 2137782,
    //     E_cp : 535500,
    //     E_profit : 1602282,
    //     E_loss: 0
    // });
    // tc1.save();
    // app.post('/', (req, res) => {
    //     var type = req.body.Type;
    //     Type_Cost.find({Type:type},function(err, elec) {
    //         console.log(elec);
    //         res.render('index7',{
    //             eleclist: elec
    //         })
    //     })
    // });
//homepage
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/home.html")
});
app.get('/table2.html',(req,res)=>{
    res.sendFile(__dirname+"/table2.html")
});
app.get('/table3.html',(req,res)=>{
    res.sendFile(__dirname+"/table3.html")
});
app.get('/table4.html',(req,res)=>{
    res.sendFile(__dirname+"/table4.html")
});
app.get('/table5.html',(req,res)=>{
    res.sendFile(__dirname+"/table5.html")
});
app.get('/table6.html',(req,res)=>{
    res.sendFile(__dirname+"/table6.html")
});
app.get('/table7.html',(req,res)=>{
    res.sendFile(__dirname+"/table7.html")
});

app.get('/datavisual.html',(req,res)=>{
    res.sendFile(__dirname+"/datavisual.html")
});
app.get('/chart1.html',(req,res)=>{
    res.sendFile(__dirname+"/chart1.html")
});
app.get('/chart2.html',(req,res)=>{
    res.sendFile(__dirname+"/chart2.html")
});
app.get('/login.html',(req,res)=>{
    res.sendFile(__dirname+"/login.html")
});

app.post('/loginsubmit', (req, res) => {
    const  login = req.body.login;
    console.log(login);
    if(login=='Admin@gmail.com'){
        res.sendFile(__dirname+"/admin.html")
    }
}
);


app.get('/signup2.html',(req,res)=>{
    res.sendFile(__dirname+"/signup2.html")
});
00

//locationQuery
app.get('/location.html',(req,res)=>{
    res.sendFile(__dirname+"/location.html");
    
});

app.post('/locsubmit', (req, res) => {
const  Option1 = req.body.Option;
console.log(Option1);
if(Option1=='All'){
    Location.find(function(err, elec) {
        console.log(elec);
        res.render('index2',{
            eleclist: elec
        })
    })
    }
else{
    if(Option1=='Object'){
        var lid = req.body.L_id;
        var loc = req.body.Location;
        Object.find({L_id:lid,Location:loc},function(err, elec) {
            console.log(elec);
            res.render('index4',{
                eleclist: elec
            })
        })
    }
    else{
        if(Option1=='Electricity'){
            var lid = req.body.L_id;
        var loc = req.body.Location;
        Location_Electricity.find({L_id:lid,Location:loc},function(err, elec) {
            console.log(elec);
            res.render('index3',{
                eleclist: elec
            })
        })
        }
        else{
            if(Option1=='Cost'){
                var lid = req.body.L_id;
        var loc = req.body.Location;
        Location_Cost.find({L_id:lid,Location:loc},function(err, elec) {
            console.log(elec);
            res.render('index5',{
                eleclist: elec
                    })
                })
            }
        }
    }
}
});
//typeQuery
app.get('/Type.html',(req,res)=>{
    res.sendFile(__dirname+"/Type.html");
    
});

app.post('/typesubmit', (req, res) => {
const  Option1 = req.body.Option;
console.log(Option1);
if(Option1=='All'){
    Electricity.find(function(err, elec) {
        console.log(elec);
        res.render('index1',{
            eleclist: elec
        })
    })
}
else{
    if(Option1=='Location'){
        var type = req.body.Type;
    Location.find({Type:type},function(err, elec) {
        console.log(elec);
        res.render('index2',{
            eleclist: elec
        })
    })
    }
    else{
        if(Option1=='Electricity'){
            var type = req.body.Type;
    Type_Electricity.find({Type:type},function(err, elec) {
        console.log(elec);
        res.render('index6',{
            eleclist: elec
        })
    })
        }
        else{
            if(Option1=='Cost'){
                var type = req.body.Type;
    Type_Cost.find({Type:type},function(err, elec) {
        console.log(elec);
        res.render('index7',{
            eleclist: elec
        })
            })
            }
        }
    }
}

});

//insert 
    app.get('/admin.html',(req,res)=>{
        res.sendFile(__dirname+"/admin.html");
    });
    app.post('/admininsert',(req,res)=>{
        const obj2 = new Object({
            L_id : req.body.L_id,
            Location: req.body.Location,
            O_id : req.body.O_id,
            Object: req.body.Object,
            O_Egen : req.body.O_Egen,
            O_Cost : req.body.O_Cost,
        });
        obj2.save();
        res.write("<p>Values inserted</p>");
    });
    //delete
    app.post('/admindelete',(req,res)=>{
        Object.findOneAndDelete({L_id : req.body.L_id,
            Location: req.body.Location,
            O_id : req.body.O_id,
            Object: req.body.Object,
            O_Egen : req.body.O_Egen,
            O_Cost : req.body.O_Cost,}).then(function(){
            console.log("Record deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });
        res.write("<p>Values deleted</p>");
    });
    //update
    app.post('/adminupdate',(req,res)=>{
        Object.updateOne({L_id : req.body.L_id,
            Location: req.body.Location,
        },{$set:{
            O_id : req.body.O_id,
            Object: req.body.Object,
            O_Egen : req.body.O_Egen,
            O_Cost : req.body.O_Cost
        }}
        
        ).then(function(){
            console.log("Record updated"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });
        res.write("<p>Values Updated</p>");
    });

    

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});