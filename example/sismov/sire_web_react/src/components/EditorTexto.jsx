import React from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorTexto = ({ altura, ...props}) => {
  const styles = {
    display: "block",
    width: "100%",
    height: altura === '' ? altura="550px": altura,
    backgroundColor:"white",
  };

  return (
    <>
      <EditorToolbar />
      <ReactQuill
        {...props}
        style={styles}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default EditorTexto;
