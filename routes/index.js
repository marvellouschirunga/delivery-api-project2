const router = require('express').Router();
const passport = require('passport');

// Include Swagger documentation routes
router.use('/', require('./swagger'));

// Include routes related to deliveries
router.use('/deliveries', require('./deliveries'));

// Route for user login using GitHub OAuth
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Route for user logout
router.get('/logout', function (req, res, next) {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Export the router module for use in the main application
module.exports = router;
