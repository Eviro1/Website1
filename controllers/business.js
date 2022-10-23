let express = require('express');
let router = express.Router();
let mongoose= require('mongoose');
const contact = require('../models/contact');

let Contact = require("../models/contact")

//Get route for the business contact list
module.exports.displayContactList = (req, res, next) => {
    Contact.find((err,contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else{
               
            //console log contactlist
            console.log(contactList);
            res.render("Business/list",{title: 'Contact List',ContactList : contactList})
        }
    });
}

module.exports.displayAddPage = (req,res,next) => {
    res.render('Business/add',{title: 'Add Contact'})
}

module.exports.processAddPage = (req,res,next) => {
    let newContact = Contact({
        "name": req.body.name,
        "number":req.body.number,
        "email":req.body.email
    }); 

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        } 
        else {
            //refresh contact-list
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage= (req,res,next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contacttoedit) => {
      if(err){

      console.log(err);
      res.end(err);
  } else{
      //show the edit view
      res.render('business/edit.ejs', {title:'Edit Contact', contact: contacttoedit})
  }
    });

}

module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id;
    
    let updatedcontact= Contact({
        "_id":id,
        "name": req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });

    Contact.updateOne({_id: id}, updatedcontact, (err) => {
        if(err){
    
            console.log(err);
            res.end(err);
        } 
        else{
            //refresh the contact list
            res.redirect('contact-list');
        }
    });
}

module.exports.deletePage = (req,res,next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) =>{
        if(err){
    
            console.log(err);
            res.end(err);
        } else{
             //refresh the contact list
             res.redirect('contact-list');
        }
    })
}
