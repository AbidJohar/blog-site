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
      {/* Hero Section */}
      <div
        className="w-full h-[80vh] flex items-end justify-start"
        style={{
          backgroundImage: `url(${wallpaperImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!isAuthenticated && (
          <Link to="/login">
            <button className="mb-8 ml-10 text-white font-bold py-4 px-8 rounded border-2 hover:bg-gradient-to-r from-[#0A5455] to-[#72D2F3]">
              Create Your Blog
            </button>
          </Link>
        )}
      </div>

      {/* Blogs Section */}
      <div className="w-full py-8 bg-gray-100">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-6">Latest Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs?.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id}>
                  <BlogCard blog={blog} fromPage={"home-page"} />
                </div>
              ))
            ) : (
              <p>No Blogs found</p>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;