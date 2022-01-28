const User = require('../models/user');
const Commets = require('../models/comments');
const Improvements = require('../models/improvement');
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

module.exports = {
	index,
	show,
	new: newUser,
	create,
	postUpdatedUser
	// completeProfile,
};

// get the complete profile page
function index(req, res, next) {
	console.log(req.user)
	res.render('users/completeProfile', {
		user: req.user,
		title: "create your profile"
	});
}

// create a new user profile
function newUser(req, res) {
	res.render('users/new');
}

// function index(req, res) {
// 	User.find({}, function (err, movies) {
// 		res.render('users/index', { title: 'All Movies', users });
// 	});
// }


// // Get Complete Profile
// async function completeProfile(req, res){
// 	try {
// 		console.log(localStorage.getItem('userId'));
// 		res.render("users/new",{

// 		}
// 	)
// 	} catch (err) {
		
// 	}
// }

// Create New User
async function create(req, res) {
	try {
		console.log(req.body)
		const data = {	
			username: req.body.username,
			about: req.body.about,
			avatar: req.body.avatar,
			googleId: req.body.email,
			
			strengths: req.body.strengths,
			interests: req.body.interests,
			helpMeImprove: req.body.helpMeImprove,
		}
		// console.log(data)
	
		const user = await new User(data);
		console.log(user)
		console.log(user._id);
		res.redirect(`/users/${user._id}`);
		
	} catch (error) {
		console.log(error)
	}
	// user.save(function (err) {
	// 	if (err) return res.redirect('/users/new');
	// 	console.log(user);
	// });
}

// Show user Account Page
async function show(req, res) {

	try {
		const userId = req.params.id
		const user = await User.find({})
		// console.log(userId)
		// console.log(user);
			res.render('users/show', { title: 'User Profile', user:user});

	} catch (error) {
		console.log(error);
	}
}



// post updated User Profile
async function postUpdatedUser(req, res) {
	try {
		console.log(req.user._id)
		console.log(req.body)
	
		const userId = req.user._id
		const user  = await User.findById(userId)
		
		console.log(user)
		const strengths = []
		const interests = []
		const title = req.body.title
		const reason = req.body.reason
		const deadline  = req.body.deadline
		const contact = {
			linkedIn : req.body.linkedIn,
			gitHub : req.body.gitHub,
			plum : req.body.plum
		}
		user.contact[0] = contact
		// user.contact.linkedIn = req.body.linkedIn
		// user.contact.gitHub = req.body.gitHub
		// user.contact.plum = req.body.plum

		const newImprove = new Improvements ({
			title: title,
			reason: reason,
			deadline: deadline,
			userId: userId
		})
		const int = [req.body.in0, req.body.in1, req.body.in2, req.body.in3, req.body.in4]
		const st = [req.body.st0, req.body.st1, req.body.st2, req.body.st3, req.body.st4]
		
		
		for (let i = 0; i < int.length; i++) {
			if(int[i] !== undefined || ""){
				interests.push(int[i])
			}
		}
		for (let i = 0; i < st.length; i++) {
			if(st[i] !== undefined || ""){
				interests.push(st[i])
			}
		}
		console.log(strengths)
		console.log(interests)
		user.strengths = st
		user.interests = int
		const savedImprove =  await newImprove.save()
		user.improvements.push(savedImprove._id)
		const savedInfo = await user.save()
		console.log(savedImprove)
		console.log(savedInfo)
		
		// const data = {	
		// 	username: req.body.username,
		// 	about: req.body.about,
		// 	avatar: req.body.avatar,
		// 	googleId: req.body.email,
		// 	strengths: req.body.strengths,
		// 	interests: req.body.interests,
		// 	helpMeImprove: req.body.helpMeImprove,
		// }
		// console.log(data)
	
		// const user = await User.findById(userId);
		// user.username = req.body.username;
		// user.about = req.body.about;
		// user.avatar = req.body.avatar;
		// user.googleId = req.body.email;
		// user.strengths = req.body.strengths;
		// user.interests = req.body.interests;
		// user.helpMeImprove = req.body.helpMeImprove;
		// user.save()
		// res.redirect(`/users/${userId}`);
		
	} catch (error) {
		console.log(error)
	}




	// user.save(function (err) {
	// 	if (err) return res.redirect('/users/new');
	// 	console.log(user);
	// });
}


	// Delete a user Account
const deleteUser = async () => {
	try {
		console.log(req.body.userId)
		const userId = req.body.userId;
		const user = await User.findByIdAndRemove(userId)
		// redirect to homescreen
		
	} catch (error) {
		console.log(error)
	}
}
