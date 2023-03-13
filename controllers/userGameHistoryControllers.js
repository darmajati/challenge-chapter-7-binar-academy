const {UserGameHistory} = require('../models')

module.exports = {
    // API
    jsonShow: async (req, res) => {
        const UserGameHistories = await UserGameHistory.findAll()
        res.json(UserGameHistories)
    },
    jsonShowId: (req, res) => {
        UserGameHistory.findOne({
            where: {
                id: req.params.id
            }
        }).then((UserGameHistories) => {
            res.json(UserGameHistories)
        })
    }, 
    jsonCreate: async(req, res) => {
        const UserGameHistories = await UserGameHistory.create({
            score: req.body.score,
            user_game_id: req.body.user_game_id
        })
        
        res.status(201).json(UserGameHistories)
    },
    jsonUpdate: async(req, res) => {
        const id = req.params.id
    
        const UserGameHistories = await UserGameHistory.update({
            score: req.body.score,
            user_game_id: req.body.user_game_id
        }, {
            where: {
                id: id
            }
        })
        res.json({
            message: 'Updated article'
        })
    },
    jsonDelete: async (req, res) => {
        const id =req.params.id
    
        const UserGameHistories = await UserGameHistory.destroy({
            where: {
                id:id
            }
        })
        res.json({
            message: 'Deleted article'
        })
    },
    // end of API

    // render
    show: (req, res) => {
        UserGameHistory.findAll()
         .then(userGameHistories => {
         res.render('dashboard/history-dashboard', {
         userGameHistories, title: 'User Game History'
         })
     })
    },
    create: (req, res) => {
        res.render('dashboard/history-create', {title: 'Create User Game History'})
    },
    new: async(req, res) => {
        const userGamesHistories = await UserGameHistory.create({
            score: req.body.score,
            user_game_id: req.body.user_game_id
        })
        .then(userGamesHistories => {
            res.status(201).redirect('/admin/userhistories')
        })
    },
    update: async (req, res) => {
        const id = req.params.id
        const userGamesHistories = await UserGameHistory.findByPk(id)
        res.render('dashboard/history-update', 
        {i: userGamesHistories, title: 'Update User Game History'})
    },
    put: async(req, res) => {
        const id = req.params.id
    
        const userGamesHistories = await UserGameHistory.update({
            score: req.body.score,
            user_game_id: req.body.user_game_id
        }, {
            where: {
                id: id
            }
        })
        .then(userGamesHistories => {
            res.redirect('/admin/userhistories')
        })
    },
    delete: async (req, res) => {
        const id = req.params.id
        const userGameHistories = await UserGameHistory.findByPk(id)
        res.render('dashboard/history-delete', 
        {i: userGameHistories, title: 'Delete User Game History'})
    },
    destroy: async (req, res) => {
        const id = req.params.id;
    
        try {
            await UserGameHistory.destroy({
                where: {
                    id: id
                }
            });
            res.redirect('/admin/userhistories');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}