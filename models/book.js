const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const mongoOptions = { useNewUrlParser: true }

const dbName = 'library'

class Book {
  constructor(isbn, title, author, category, num) {
    this.isbn = isbn
    this.title = title
    this.author = author
    this.category = category
    this.stock = num
  }

  static findAll() {
    const client = new MongoClient(url, mongoOptions)
    return new Promise((resolve, reject) => {
      client.connect(function(err) {
        if (!err) {
          console.log('Connected successfully to server')
          const db = client.db(dbName)
          db.collection('books')
            .find()
            .toArray(function(err, data) {
              if (err) {
                reject(err)
              } else {
                resolve(data)
              }
            })
          client.close()
        } else {
          cbAll(err)
        }
      })
    })
  }

  static create(data) {
    const client = new MongoClient(url, mongoOptions)
    return new Promise((resolve, reject) => {
      client.connect(function(err) {
        if (!err) {
          console.log('Connected successfully to server')
          const db = client.db(dbName)
          db.collection('books')
            .insertOne(data, function(err, data) {
              if (err) {
                reject(err)
              } else {
                resolve(data)
                client.close()
              }
            })
          client.close()
        } else {
          reject(err)
        }
      })
    })
  }

  static delete(id) {
    const client = new MongoClient(url, mongoOptions)
    return new Promise((resolve, reject) => {
      client.connect(function(err) {
        if (!err) {
          console.log('Connected successfully to server')
          const db = client.db(dbName)
          const getId = { _id: mongodb.ObjectID(id.id)}
          db.collection('books')
            .findOneAndDelete(getId, function(err, data) {
              if (err) {
                reject(err)
              } else {
                resolve(data)
                client.close()
              }
            })
        } else {
          reject(err)
        }
      })
    })
  }

  static update(id, data) {
    const client = new MongoClient(url, mongoOptions)
    return new Promise((resolve, reject) => {
      client.connect(function(err) {
        if (!err) {
          console.log('Connected succesfully to server')
          const db = client.db(dbName)
          const getId = { _id: mongodb.ObjectID(id.id)}
          console.log(getId)
          const newData = { $set: data }
          db.collection('books')
            .findOneAndUpdate(getId, newData, function(err, data) {
              if (err) {
                reject(err)
              } else {
                resolve(data)
                client.close()
              }
            })
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = Book