const {UserGameBiodata} = require('../models')

module.exports = {
    // API
    jsonShow: async (req, res) => {
        const userGameBiodata = await UserGameBiodata.findAll()
        res.json(userGameBiodata)
    },
    jsonShowId: (req, res) => {
        UserGameBiodata.findOne({
            where: {
                id: req.params.id
            }
        }).then((userGameBiodata) => {
            res.json(userGameBiodata)
        })
    },
    jsonCreate: async(req, res) => {
        const userGameBiodata = await UserGameBiodata.create({
            full_name: req.body.score,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            user_game_id: req.body.user_game_id
        })
        
        res.status(201).json(userGameBiodata)
    },
    jsonUpdate: async(req, res) => {
        const id = req.params.id
    
        const userGameBiodata = await UserGameBiodata.update({
            full_name: req.body.score,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
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
    
        const userGameBiodata = await UserGameBiodata.destroy({
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
        UserGameBiodata.findAll()
         .then(userGameBiodata => {
         res.render('dashboard/biodata-dashboard', {
         userGameBiodata, title: 'User Game Biodata'
         })
     })
    },
    create: (req, res) => {
        res.render('dashboard/biodata-create', {title: 'Create User Game Biodata'})
    },
    new: async(req, res) => {
        const userGamesBiodata = await UserGameBiodata.create({
            full_name: req.body.full_name,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            user_game_id: req.body.user_game_id
        })
        .then(userGamesBiodata => {
            res.status(201).redirect('/admin/userbiodata')
        })
    },
    update: async (req, res) => {
        const id = req.params.id
        const userGameBiodata = await UserGameBiodata.findByPk(id)
        res.render('dashboard/biodata-update', 
        {i: userGameBiodata, title: 'Update User Game Biodata'})
    },
    put: async(req, res) => {
        const id = req.params.id
    
        const userGameBiodata = await UserGameBiodata.update({
            full_name: req.body.full_name,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            user_game_id: req.body.user_game_id
        }, {
            where: {
                id: id
            }
        })
        .then(userGameBiodata => {
            res.redirect('/admin/userbiodata')
        })
    },
    delete: async (req, res) => {
        const id = req.params.id
        const userGameBiodata = await UserGameBiodata.findByPk(id)
        res.render('dashboard/biodata-delete', 
        {i: userGameBiodata, title: 'Delete User Game Biodata'})
    },
    destroy: async (req, res) => {
        const id = req.params.id;
    
        try {
            await UserGameBiodata.destroy({
                where: {
                    id: id
                }
            });
            res.redirect('/admin/userbiodata');
        } catch (err) {
            res.status(500).send(err);
        }
    }
}