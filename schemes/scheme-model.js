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

const add = ({ scheme_name }) => {
  return db('schemes').insert({ scheme_name })
}

const update = ({ scheme_name }, id) => {
  return db('schemes')
    .where({ id })
    .update({ scheme_name })
}

const remove = id => {
  if (isNaN(id)) {
    return null
  } else {
    return db('schemes')
      .where({ id })
      .delete()
  }
}
module.exports = { find, findById, findSteps, add, update, remove }
