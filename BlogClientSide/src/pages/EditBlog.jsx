/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getBlogById, updateBlog } from "../api/blogApi";  
import Editor from "../components/Editor";
import toast from "react-hot-toast";
import ReactLoading from 'react-loading';
import DOMPurify from 'dompurify';


const EditBlog = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id || !userData) {
        setError("Invalid blog or user not authenticated.");
        setFetchLoading(false);
        return;
      }

      setFetchLoading(true);
      setError("");
      try {
        const res = await getBlogById(id);
        if (res?.success) {
          const blog = res.blog;
          setValue("title", blog.title);
          setContent(blog.content || ""); // Set content for Editor
          reset({ title: blog.title });  
        } else {
          setError("Blog not found or access denied.");
          navigate("/");  
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog data.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchBlog();
  }, [id, userData, dispatch, setValue, reset, navigate]);

  const onSubmit = async (data) => {
   const sanitizedContent = DOMPurify.sanitize(data.content);
    if (!sanitizedContent || sanitizedContent.trim() === "" || sanitizedContent.trim() === "<p><br></p>" || sanitizedContent.trim() === "<p></p>") {
      setError("Content is required!");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      id,  
      title: data.title,
      content: content,
    };

    try {
      const res = await updateBlog(payload);
      if (res?.success) {
        toast(res?.message);  
        navigate(`/blog/${id}`);  
        setError(res?.message || "Failed to update blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setError(error.message || "Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
            <ReactLoading type="bars" color="#00ffff" height={100} width={100} />
          </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Blog Post
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          {/* Pass state to Editor and get value */}
          <Editor value={content} onChange={setContent} />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}  
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;