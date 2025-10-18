/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Container from "../components/container/Container";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { getAllUserBlogs } from "../api/blogApi";

function AllUserBlogs() {
  const { userData } = useSelector((state) => state.auth);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user blogs
  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!userData) {
        setError("Please log in to view your blogs.");
        return;
      }

      setLoading(true);
      try {
        const data = await getAllUserBlogs();
        console.log("User blogs data:", data.blogs);

        if (data?.success) {
          setUserBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [userData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ReactLoading type="bars" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-100 min-h-screen">
      <Container>
        <h2 className="text-2xl font-bold text-center mb-6">
          {userData ? "Your Blogs" : "Please Log In"}
        </h2>

        {error && <p className="text-red-600 text-center mb-6">{error}</p>}

        {userData ? (
          userBlogs?.length > 0 ? (
            // Render grid only if blogs exist
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} fromPage={"home-page"} />
              ))}
            </div>
          ) : (
            // Full width centered message
            <div className="flex justify-center w-full">
              <p className="text-gray-500 text-center">No Blogs found</p>
            </div>
          )
        ) : (
          <p className="text-center text-gray-500">
            Please{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              log in
            </a>{" "}
            to view your blogs.
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllUserBlogs;
