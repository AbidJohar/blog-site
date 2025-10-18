 /* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createBlog } from "../api/blogApi";
import DOMPurify from 'dompurify';
import Editor from "../components/Editor";
import toast from "react-hot-toast";

const AddBlog = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    register("content", {
      required: "Content is required",
      validate: (value) =>
        value.trim() !== "" && value.trim() !== "<p><br></p>" && value.trim() !== "<p></p>"
          ? true
          : "Content cannot be empty",
    });
  }, [register]);


  const handleEditorChange = (newContent) => {
    setContent(newContent);
    setValue("content", newContent);
  };

  const onSubmit = async (data) => {
    const sanitizedContent = DOMPurify.sanitize(data.content);
    if (!sanitizedContent || sanitizedContent.trim() === "" || sanitizedContent.trim() === "<p><br></p>" || sanitizedContent.trim() === "<p></p>") {
      setError("Content is required!");
      return;
    }
    setLoading(true);
    const payload = {
      title: data.title,
      content: sanitizedContent,
      authorId: userData?._id,
    };

    try {
      setError("");
      const res = await createBlog(payload);
      if (res?.success) {
        toast(res.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating blog:", error?.response?.data?.error);
      setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create New Blog post
      </h2>
     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <Editor value={content} onChange={handleEditorChange} />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;