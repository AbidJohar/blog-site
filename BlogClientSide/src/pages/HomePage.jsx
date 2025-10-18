/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import BlogCard from "../components/BlogCard";
import wallpaperImage from "../assets/wallpaper.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { getAllBlogs } from "../api/blogApi";  

function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const [blogs, setBlogs] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await getAllBlogs();  
        if (res?.success) {
          setBlogs(res.blogs);  
        }
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);
  

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ReactLoading type="bars" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="w-full">
  <div className="relative w-full h-[80vh] flex items-end justify-start overflow-hidden bg-gray-300">
  <img
    src={wallpaperImage}
    alt="Blog Banner"
    loading="lazy"
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  />

  {!isAuthenticated && (
    <Link to="/login">
      <button className="relative z-10 mb-8 ml-10 text-white font-bold py-4 px-8 rounded border-2 hover:bg-gradient-to-r from-[#0A5455] to-[#72D2F3]">
        Create Your Blog
      </button>
    </Link>
  )}
</div>


      {/* Blogs Section */}
      <div className="w-full py-8 bg-gray-100">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-6">Latest Blogs</h2>
          {  blogs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} fromPage={"home-page"} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <p className="text-gray-500 text-center">No Blogs found</p>
            </div>
          ) }
        </Container>
      </div>
    </div>
  );
}

export default HomePage;