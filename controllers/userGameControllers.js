const {UserGame} = require('../models')

module.exports = {
    // API
    jsonShow: async (req, res) => {
        const userGames = await UserGame.findAll()
        res.json(userGames)
    },
    jsonShowId: (req, res) => {
        UserGame.findOne({
            where: {
                id: req.params.id
            }
        }).then((userGame) => {
            res.json(userGame)
        })
    },
    jsonCreate: async(req, res) => {
        const userGames = await UserGame.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        
        res.status(201).json(userGames)
    },
    jsonUpdate: async(req, res) => {
        const id = req.params.id
    
        const userGames = await UserGame.update({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }, {
            where: {
                id: id
            }
        })
        res.json({
            message: 'Updated user games'
        })
    },
    jsonDelete: async (req, res) => {
        const id =req.params.id
    
        const userGames = await UserGame.destroy({
            where: {
                id:id
            }
        })
        res.json({
            message: 'Deleted user games'
        })
    },
    // end of API

    // render
    show: (req, res) => {
        UserGame.findAll()
         .then(userGames => {
         res.render('dashboard/usergames-dashboard', {
         userGames, title: 'User Game'
         })
     })
    },
    create: (req, res) => {
        res.render('dashboard/usergames-create', {title: 'Create User Game'})
    },
    new: async(req, res) => {
        const userGames = await UserGame.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        })
        .then(userGames => {
            res.status(201).redirect('/admin/usergames')
        })
    },
    update:  async (req, res) => {
        const id = req.params.id
        const userGame = await UserGame.findByPk(id)
        res.render('dashboard/usergames-update', 
        {i: userGame, title: 'Update User Game'})
    },
    put: async(req, res) => {
        const id = req.params.id
    
        const userGames = await UserGame.update({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }, {
            where: {
                id: id
            }
        })
        .then(userGames => {
            res.redirect('/admin/usergames')
        })
    },
    delete: async (req, res) => {
        const id = req.params.id
        const userGame = await UserGame.findByPk(id)
        res.render('dashboard/usergames-delete', 
        {i: userGame, title: 'Delete User Game'})
    },
    destroy: async (req, res) => {
        const id = req.params.id;
    
        try {
            await UserGame.destroy({
                where: {
                    id: id
                }
            });
            res.redirect('/admin/usergames');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}