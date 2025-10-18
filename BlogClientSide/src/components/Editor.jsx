/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const modules = {
  toolbar: [
    // Font and size dropdowns
    [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],


    ['bold', 'italic', 'underline', 'strike'],

    // Color and background
    [{ 'color': [] }, { 'background': [] }],

    // Alignment
    [{ 'align': [] }],

    // Lists (your original + check lists)
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

    // Indent/outdent
    [{ 'indent': '-1' }, { 'indent': '+1' }],

    // Script (sub/super)
    [{ 'script': 'sub' }, { 'script': 'super' }],


    // Blocks
    ['blockquote', 'code-block'],

  ],
  clipboard : {matchVisual : false}

};

const Editor = ({value, onChange}) => {
 
  return (
     <>
     <ReactQuill
     value={value}
     onChange={onChange}
     modules={modules}
     theme='snow'
     placeholder='Start typing your blogs here...'
     />
     </>
  )
}

export default Editor
