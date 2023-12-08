// Just stories routes and not followed by something (i.e /stories, /stories/add)
const express = require('express')
const router = express.Router()
const {ensureGuest, ensureAuth} = require('../middleware/auth')
const storyController = require('../controllers/stroriesController')



//  @route  GET /stories/add
router.get('/add', ensureAuth, storyController.addStory)


//  @route  GET /stories/:id
router.get('/:id', ensureAuth, storyController.singlePage )


//  @route  GET /stories/user/:id
router.get('/user/:id', ensureAuth, storyController.authorStories)


//  @route  POST /stories/
router.post('/', ensureAuth, storyController.postStory)


//  @route  GET /stories/
router.get('/', ensureAuth, storyController.ShowAllStories)


//  @route  GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, storyController.editPage)


//  @route  PUT /stories/:id
router.put('/:id', ensureAuth, storyController.updateStory) 


//  @desc   Delete STORIES PAGE
//  @route  DELETE /stories/delete/:id
router.delete('/delete/:id', ensureAuth, storyController.deleteStory)

module.exports = router