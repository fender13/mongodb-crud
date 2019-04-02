const model = require('../models/book')

class Controller {
  static findAll(req, res) {
    model.findAll()
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(e) {
        res.status(500).json({
          error: e.message
        })
      })
  }

  static addNew(req, res) {
    const { isbn, title, author, category, stock } = req.body

    model.create(
      {
        isbn: isbn, 
        title: title, 
        author: author, 
        category: category, 
        stock: stock
      }
    )
      .then(function(data) {
        res.status(201).json(data)
      })
      .catch(function(e) {
        res.status(500).json({
          error: e.message
        })
      })
  }

  static deleteOne(req, res) {
    model.delete(
      {
        id: req.params.id
      }
    )
      .then(function(data) {
        res.status(200).json(data)
      })
      .catch(function(e) {
        res.status(500).json({
          error: e
        })
      })
  }

  static update(req, res) {
    const { isbn, title, author, category, stock} = req.body
    let id = null
    model.update(
      { id: req.params.id },
      { isbn: isbn, 
        title: title, 
        author: author, 
        category: category, 
        stock: stock }
    )
      .then(function(dataBuku) {
        res.status(200).json(dataBuku)
      })
      .catch(function(e) {
        res.status(500).json({
          error: e
        })
      }) 
  }
}

module.exports = Controller