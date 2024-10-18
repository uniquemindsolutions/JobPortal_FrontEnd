import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      [{ 'color': [] }, { 'background': [] }],    // Text color and background color
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],  // Text formatting
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript / superscript
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],                   // Text direction
      ['link', 'image', 'video'],                 // Links, images, and videos
      ['clean']                                   // Remove formatting
    ]
  };
const RichTextEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div>
     <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        placeholder="Start typing..."
        modules={modules} 
      />
      <div className="mt-4">
        {/* <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} /> */}
      </div>
    </div>
  );
};

export default RichTextEditor;
