const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// require User model
const User = require('../models/user');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK,
		},
		function (accessToken, refreshToken, profile, cb) {
			// a user has logged in with OAuth...
			User.findOne({ googleID: profile.id }, function (err, user) {
				if (err) return cb(err);
				if (user) {
					return cb(null, user);
				} else {
					// register a new user via OAuth
					var newUser = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						googleId: profile.id,
					});
					newUser.save(function (err) {
						if (err) return cb(err);
						return cb(null, newUser);
					});
				}
			});
		}
	)
);
// passport method to set up cookie session
passport.serializeUser(function (user, done) {
	done(null, user.id);
});
// passport method ts se user from db to req.user
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});
