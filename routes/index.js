const router = require('express').Router()
const controller = require('../controllers/bookControllers')

// find allbook
router.get('/findall', controller.findAll)

// post a book
router.post('/add', controller.addNew)

//delete a book
router.delete('/delete/:id', controller.deleteOne)

// put a book
router.put('/edit/:id', controller.update)

module.exports = router