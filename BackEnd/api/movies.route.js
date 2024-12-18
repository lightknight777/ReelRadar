import express from 'express'
const router = express.Router() // Get access to the express router
router.route('/').get((req,res)=> res.send('Hello World'))
export default router