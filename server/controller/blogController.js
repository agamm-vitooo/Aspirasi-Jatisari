const Blog = require('../models/blogModel');

// Create new blog
exports.createBlog = async(req, res) => {
    try {
        const { title, content, author, tags, published } = req.body;

        // Create and save the blog
        const blog = new Blog({ title, content, author, tags, published });
        await blog.save();

        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get all blogs
exports.getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get single blog by ID
exports.getBlogById = async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(400).json({ error: error.message });
    }
};

// Update blog by ID
exports.updateBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, published } = req.body;

        const blog = await Blog.findByIdAndUpdate(
            id, { title, content, tags, published }, { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(400).json({ error: error.message });
    }
};

// Delete blog by ID
exports.deleteBlog = async(req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(400).json({ error: error.message });
    }
};