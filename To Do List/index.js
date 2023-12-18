const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("style"));

var regular=[];
var work_items=[];
var shopping_items =[];

app.get("/", (req,res)=>{
    var date = new Date();
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long"
    }

    var day = date.toLocaleDateString("en-US", options);
    res.render("list", {listitle:day, newly_added_item:regular});
});

app.get("/work", (req,res)=>{
    res.render("list", {listitle:"Work", newly_added_item:work_items});
});

app.get("/shopping", (req,res)=>{
    res.render("list", {listitle:"Shopping", newly_added_item:shopping_items});
})

app.post("/add", (req,res)=>{
    var listitem = req.body.newitem;
    
    if(req.body.list === "Work"){
        work_items.push(listitem);
        res.redirect("/work");
    }
    else if(req.body.list === "Shopping"){
        shopping_items.push(listitem);
        res.redirect("/shopping");
    }
    else{
        regular.push(listitem);
        res.redirect("/");
    }
})

app.post("/remove", (req, res) => {
    var removeItem = req.body.remove;
    
    if(req.body.list === "Work"){
        var index = work_items.indexOf(removeItem);
        work_items.splice(index, 1); 
        res.redirect("/work");
    }
    else if(req.body.list === "Shopping"){
        var index = shopping_items.indexOf(removeItem);
        shopping_items.splice(index, 1); 
        res.redirect("/shopping");
    }
    else{
        var index = regular.indexOf(removeItem);
            regular.splice(index, 1); 
        res.redirect("/");
    }
});

app.listen(3000,()=>{
    console.log("Server running...");
})