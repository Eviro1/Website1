let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



let contactcontroller= require('../controllers/business')

//Get route for the business contact list
router.get('/',contactcontroller.displayContactList);



/* GET Route for displaying the Add page - Create Operation */
router.get('/add',requireAuth,contactcontroller.displayAddPage);


/* POST Route for processing the Add page - Create Operation */
router.post('/add',requireAuth, contactcontroller.processAddPage); 

/* GET Route for displaying the Edit page - update Operation */
router.get('/edit/:id',requireAuth, contactcontroller.displayEditPage);

/* POST Route for processing the Edit page - Update Operation */
router.post('/edit/:id',requireAuth, contactcontroller.processEditPage);

// Get to perform Deletion 
router.get('/delete/:id',requireAuth, contactcontroller.deletePage);

module.exports = router;