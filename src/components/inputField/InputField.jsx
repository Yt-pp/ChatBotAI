import React from "react";
import { useState } from "react";

const TextAreaComponent = () => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div style={{ maxHeight: "25dvh", overflowY: "auto" }}>
      <textarea
        value={text}
        onChange={handleTextChange}
        class="form-control h-10 w-100 resize-none border-0 bg-transparent px-0 py-2 text-primary placeholder-secondary text-black"
        placeholder="Your placeholder text here"
      />
    </div>
  );
};
export const InputField = () => {
  return (
    <div className="fs-6 px-3 px-md-4 mx-auto w-100 px-md-5 px-lg-4 px-xl-5">
      <div className="d-flex w-100 gap-2 rounded-5 p-2 bg-secondary">
        <div>Voice</div>

        <TextAreaComponent />
      </div>
    </div>
  );
};
