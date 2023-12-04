import React from "react";
import codeBlocks from "./codeBlocks";

import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1> Hello! Welcome To The Online Coding Web Application!</h1>
      <h2> Choose a code block</h2>
      <ul>
        {codeBlocks.map((block, index) => (
          <li key={index}>
            <Link to={`/code-block/${index}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
