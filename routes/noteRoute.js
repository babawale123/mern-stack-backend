const express = require('express')
const { getAllNote, createNote, getOneNote, update,deleteNote } = require('../controllers/noteController')
const { protect } = require('../middlewares/auth')

const router = express.Router()

router.route('/').get(protect,getAllNote)
router.route('/create').post(protect,createNote)
router.route('/:id').get(getOneNote).put(protect, update).delete(protect, deleteNote)

module.exports = router