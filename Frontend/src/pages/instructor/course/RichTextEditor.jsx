import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, decription: content });
  };
  return (
    <ReactQuill theme="snow" value={input.decription} onChange={handleChange} />
  );
};

export default RichTextEditor;
