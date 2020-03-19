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

const findSteps = id => {
  return db('steps')
    .select('steps.id', 'scheme_name', 'step_number', 'instructions')
    .where({ scheme_id: id })
    .join('schemes', 'steps.scheme_id', '=', 'schemes.id')
    .orderBy('step_number', 'asc')
}

module.exports = { find, findById, findSteps }
