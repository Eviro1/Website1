/*name:Rohit Rana
  student id:301239904
  Date:22/10/2022
*/



var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage );

/* GET project page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services',indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactUsPage );

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout); 


module.exports = router;
