var express=require("express");
var router=express.Router({mergeParams:true});
var prod=require("../models/products");
//var comment=require("../models/comment");
var middleware=require("../middleware");
router.get("/",function(req,res){
    prod.find({},function(err,allproducts){
        if(err){
            console.log(err);
        }
        else{
            console.log("found something");
            res.render("products/index",{products:allproducts, currentuser:req.user});
        }
    });
    
}); 
router.post("/",middleware.isLoggedin,function(req,res){
    var pname=req.body.name;
    var pimage=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var price=req.body.price;
    var qty=req.body.qty;
    var thr=req.body.threshold;
    var cg={name: pname,image: pimage,description: desc,author:author,price:price,qty:qty,threshold:thr};
    prod.create(cg,function(err,prod){
        if(err){
            console.log(err);
        }
        else{
            console.log("newly created product");
            res.redirect("/products");
        }
    });
    
});
router.get("/new",middleware.isLoggedin,function(req,res){
    res.render("products/new");
});
router.get("/:id",function(req,res){
    var id=req.params.id;
    prod.findById(id,function(err,foundp){
        if(err){
            console.log(err);
        }
        else{
            res.render("products/show",{prod:foundp});
        }
    });
    
});
//EDIT campground route
router.get("/:id/edit",middleware.checkcampgauth,function(req,res){
    prod.findById(req.params.id,function(err,foundp){
        if(err){
            console.log(err);
        }
        else res.render("products/edit",{prod:foundp});                
    });
});
//UPDATE campground route
router.put("/:id",middleware.checkcampgauth,function(req,res){
    prod.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundcg){
        if(err) res.redirect("/products");
        else{
            res.redirect("/products/"+req.params.id);
        }
    });
});
//DESTROY campground
router.delete("/:id",middleware.checkcampgauth,function(req,res){
    prod.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/products");
        }
        else{
            res.redirect("/products");
        }
    });
});
module.exports=router;