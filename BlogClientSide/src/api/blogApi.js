import apiClient from "./axios";

// ___________( Create Blogs  )___________________
export const createBlog = async (blogData) => {
  try {
    const res = await apiClient.post("/blogs/create-blog", blogData);
    return res.data;  
  } catch (error) {
    console.error("Create Blog Api Error:", error);
    throw error;
  }
};

// ________( Get All blogs )_______________
export const getAllBlogs = async () => {
  try {
    const response = await apiClient.get("/blogs/get-all-blogs");
    return response.data;  
  } catch (error) {
    console.error("Get Blogs Error:", error);
    throw error;
  }
};

// ________( Get All User blogs )_______________
export const getAllUserBlogs = async () => {
  try {
    const response = await apiClient.get("/blogs/get-user-blogs");
    return response.data;  
  } catch (error) {
    console.error("Get User Blogs Error:", error);
    throw error;
  }
};

//___________( Update Blog )__________________
export const updateBlog = async (blogId, blogData) => {
  try {
    const res = await apiClient.put(`/blogs/${blogId}`, blogData);
    return res.data;
  } catch (error) {
    console.error("Update Blogs Error:", error);
    throw error;
  }
};
//___________( get blog by Id )__________________
export const getBlogById = async (blogId) => {
  try {
    const res = await apiClient.get(`/blogs/get-blog-ById/${blogId}`);
    return res.data;
  } catch (error) {
    console.error("Update Blogs Error:", error);
    throw error;
  }
};

// ______________( Delete Blog )_______________
export const deleteBlogById = async (blogId) => {
  try {
    const response = await apiClient.delete(`/blogs/delete-blog-ById/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Delete blog Error:", error);
    throw error;
  }
};
