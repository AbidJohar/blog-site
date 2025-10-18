import Blog from "../models/blog.model.js";

//________________( Get all blogs )____________________

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        .populate('authorId', 'name email')
        .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            blogs
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ error: 'Server error fetching blogs' });
    }
};

//________________( get user blogs )_________________

const getUserBlogs = async (req, res) => {
  try {
    let query = {};
    if (req.user) {
      // Filter by authenticated user's ID
      query.authorId = req.user.id;  
    }

    const blogs = await Blog.find(query)
      .populate('authorId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Server error fetching  blogs' });
  }
};


//________________( Get single blog )____________________

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        .populate('authorId', 'name email');
        
        if (!blog) {
            return res.status(404).json({ error: 'blog not found' });
        }
        
       return res.json({
        success:true,
        blog
       });
    } catch (error) {
        console.error('Get blog error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(500).json({ error: 'Server error fetching blog' });
    }
};

//________________( Create blog )____________________

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const blog = new Blog({
            title,
            content,
            authorId: req.user.id
        });
        
        await blog.save();
        await blog.populate('authorId', 'name email');
        
        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ error: 'Server error creating blog' });
    }
};

//________________( Update blog )____________________

const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        
        // Check ownership
        if (blog.authorId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to edit this blog' });
        }
        
        // Update fields
        if (title) blog.title = title;
        if (content) blog.content = content;
        blog.updatedAt = Date.now();
        
        await blog.save();
        await blog.populate('authorId', 'name email');
        
        res.json({
            success: true,
            message: 'Blog updated successfully',
            blog
        });
    } catch (error) {
        console.error('Update blog error:', error);
      return  res.status(500).json({ error: 'Server error updating blog' });
    }
};

//________________( Delete Blog by Id )____________________
 
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check ownership
    if (blog.authorId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ 
      success : true,
      message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(500).json({ error: 'Server error deleting blog' });
  }
};

export {
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
    createBlog,
    getUserBlogs
}