const express = require('express')

const Schemes = require('./scheme-model.js')

const router = express.Router()

router.get('/', (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.json(schemes)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme)
      } else {
        res
          .status(404)
          .json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' })
    })
})

router.get('/:id/steps', (req, res) => {
  const { id } = req.params

  Schemes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.json(steps)
      } else {
        res
          .status(404)
          .json({ message: 'Could not find steps for given scheme' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' })
    })
})

router.post('/', (req, res) => {
  const schemeData = req.body

  console.log(schemeData)

  Schemes.add(schemeData)
    .then(scheme => {
      Schemes.findById(scheme[0]).then(data => {
        res.status(201).json(data[0])
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to create new scheme' })
    })
})

router.post('/:id/steps', (req, res) => {
  const stepData = req.body
  const { id } = req.params

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id).then(step => {
          res.status(201).json(step)
        })
      } else {
        res
          .status(404)
          .json({ message: 'Could not find scheme with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(changes, id).then(updatedScheme => {
          Schemes.findById(id).then(data => {
            res.json(data[0])
          })
        })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Failed to update scheme' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  let schemeToDelete

  Schemes.findById(id).then(data => {
    schemeToDelete = data[0]
  })

  Schemes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: schemeToDelete })
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete scheme' })
    })
})

module.exports = router
