/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';

const BlogCard = ({ blog, fromPage }) => {
  const { _id, title, content, createdAt, authorId } = blog;

const plainText = DOMPurify.sanitize(content).replace(/<[^>]+>/g, "");
const excerpt = plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText;

  // Author initial
  const authorInitial = authorId?.name ? authorId.name.charAt(0).toUpperCase() : "A";

  const linkTo = fromPage === "my-blogs" ? `/blog/${_id}?from=my-blogs` : `/blog/${_id}?from=home-page`;

  return (
    <Link
      to={linkTo}
      className=" bg-black/10 hover:bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-[280px] flex flex-col justify-between"
    >
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm line-clamp-5 flex-1">
          {excerpt}
        </p>
      </div>

      {/* Footer with author and date */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-700 border-t-2  border-gray-400 pt-3">
        {/* Author circle */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
            {authorInitial}
          </div>
          <span className="truncate max-w-[100px]">{authorId.name}</span>
        </div>

        {/* Date */}
        <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
