const express = require('express');
const router = express.Router();
// import passport authentication middleware
const passport = require('passport');

router.get('/', function (req, res, next) {
	res.render('index');
});

// Google OAuth login route
router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
// route to call when user consent to sign in with google
router.get(
	'/oauthclozenichecallback',
	passport.authenticate('google', {
		successRedirect: '/users/complete-profile',
		failureRedirect: '/users',
	})
);

// OAuth logout route
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/users/index');
});

module.exports = router;
