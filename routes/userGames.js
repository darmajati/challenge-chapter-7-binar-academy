// user game
const express = require('express');
const userGameControllers = require('../controllers/userGameControllers');
const userGameBiodataControllers = require('../controllers/userGameBiodataControllers');
const userGameHistoryControllers = require('../controllers/userGameHistoryControllers')
const restrict = require('../middlewares/restrict')

const router = express();
router.use(express.json())

// user games API
router.get('/usergame', userGameControllers.jsonShow)
router.get('/usergame/:id', userGameControllers.jsonShowId)  
router.post('/usergame', userGameControllers.jsonCreate)
router.put('/usergame/:id', userGameControllers.jsonUpdate)
router.delete('/usergame/:id', userGameControllers.jsonDelete)
// end user games

// user game biodata API
router.get('/usergamebiodata', userGameBiodataControllers.jsonShow)
router.get('/usergamebiodata/:id', userGameBiodataControllers.jsonShowId)
router.post('/usergamebiodata', userGameBiodataControllers.jsonCreate)
router.put('/usergamebiodata/:id', userGameBiodataControllers.jsonUpdate)
router.delete('/usergamebiodata/:id', userGameBiodataControllers.jsonDelete)
// end user game biodata

//user game histories API
router.get('/usergamehistory', userGameHistoryControllers.jsonShow)
router.get('/usergamehistory/:id', userGameHistoryControllers.jsonShowId)
router.post('/usergamehistory', userGameHistoryControllers.jsonCreate)
router.put('/usergamehistory/:id', userGameHistoryControllers.jsonUpdate)
router.delete('/usergamehistory/:id', userGameHistoryControllers.jsonDelete)
// end user game histories


// website render
router.get('/alldashboard', restrict, (req, res) => {
    res.render('alldashboard', {title:'All Dashboard'})
})

// user games
router.get('/usergames', restrict, userGameControllers.show)
router.get('/usergames/create', restrict, userGameControllers.create)
router.post('/usergames/create', restrict, userGameControllers.new)
router.get('/usergames/update/:id',restrict, userGameControllers.update)
router.post('/usergames/update/:id', restrict, userGameControllers.put)
router.get('/usergames/delete/:id', restrict, userGameControllers.delete)
router.post('/usergames/delete/:id', restrict, userGameControllers.destroy);


// user game biodata
router.get('/userbiodata', restrict, userGameBiodataControllers.show)
router.get('/userbiodata/create', restrict, userGameBiodataControllers.create)
router.post('/userbiodata/create', restrict, userGameBiodataControllers.new)
router.get('/userbiodata/update/:id', restrict, userGameBiodataControllers.update)
router.post('/userbiodata/update/:id', restrict, userGameBiodataControllers.put)
router.get('/userbiodata/delete/:id', restrict, userGameBiodataControllers.delete)
router.post('/userbiodata/delete/:id', restrict, userGameBiodataControllers.destroy);

// user game history
router.get('/userhistories', restrict, userGameHistoryControllers.show)
router.get('/userhistories/create', restrict, userGameHistoryControllers.create)
router.post('/userhistories/create', restrict, userGameHistoryControllers.new)
router.get('/userhistories/update/:id', restrict, userGameHistoryControllers.update)
router.post('/userhistories/update/:id', restrict, userGameHistoryControllers.put)
router.get('/userhistories/delete/:id', restrict, userGameHistoryControllers.delete)
router.post('/userhistories/delete/:id', restrict, userGameHistoryControllers.destroy);

module.exports = router

