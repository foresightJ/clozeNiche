const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// });

router.get('/complete-profile', usersCtrl.index);
router.post('/', usersCtrl.postUpdatedUser);
router.get('/new', usersCtrl.new);
// router.get('/show', usersCtrl.showAll);
router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);


// router.get('/complete-profile', usersCtrl.completeProfile);



module.exports = router;
