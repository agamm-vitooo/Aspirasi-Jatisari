const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const validateObjectId = require('../middleware/validateObjectId');

// Define routes
router.post('/', blogController.createBlog); // Create new blog
router.get('/', blogController.getAllBlogs); // Get all blogs
router.get('/:id', validateObjectId, blogController.getBlogById); // Get blog by ID
router.put('/:id', validateObjectId, blogController.updateBlog); // Update blog by ID
router.delete('/:id', validateObjectId, blogController.deleteBlog); // Delete blog by ID

module.exports = router;