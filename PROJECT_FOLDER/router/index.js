const router = require('express').Router()
const employeeRouter = require('./employeeRouter')
const { errorHandler } = require('../middlewares/errorHandler');

router.use('/employee', employeeRouter)

router.use(errorHandler)


module.exports = router