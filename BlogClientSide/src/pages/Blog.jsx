/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { getBlogById, deleteBlogById } from "../api/blogApi";
import DOMPurify from "dompurify";
export default function Blog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isFromMyBlogs = searchParams.get("from") === "my-blogs";

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = blog && userData && isAuthenticated;

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const data = await getBlogById(id);

        if (data?.success) {
          setBlog(data.blog);
        } else {
          toast.error("Blog not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Get Blog Error:", error);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const deleteBlog = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to delete this blog");
      return;
    }
    setLoading(true);
    try {
      const data = await deleteBlogById(id);
      if (data?.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Delete blog Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ReactLoading type="bars" color="#00ffff" height={100} width={100} />
      </div>
    );
  }

  return blog ? (
    <Container>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-6 border border-gray-200">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-500 flex justify-between mb-6 border-b pb-3">
            <span>✍️ Author: {blog.authorId.name}</span>
            <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          ></div>

          {/* Author Actions */}
          {isAuthor && isFromMyBlogs ? (
            <div className="flex gap-3 mt-8">
              <Link to={`/edit-blog/${blog.id}`}>
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  ✏️ Edit
                </button>
              </Link>
              <button
                onClick={deleteBlog}
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                🗑️ Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  ) : null;
}
