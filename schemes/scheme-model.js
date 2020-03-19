const db = require('../data/db-config')

const find = () => {
  return db('schemes')
}

const findById = id => {
  if (isNaN(id)) {
    return null
  } else {
    return db('schemes').where({ id })
  }
}
