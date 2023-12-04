import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import codeBlocks from "./codeBlocks";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const CodeBlock = () => {
  const { id } = useParams();
  const codeBlock = codeBlocks[id];
  const [code, setCode] = useState(codeBlock.code);
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    socket.on("mentor-connected", () => {
      setIsMentor(true);
    });

    socket.on("student-connected", () => {
      setIsMentor(false);
    });

    socket.on("code-change", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("student-connected");
      socket.off("code-change");
    };
  }, []);

  const handleCodeChange = (newCode) => {
    if (!isMentor) {
      setCode(newCode); // Update the code immediately for the current user
    }
    socket.emit("code-change", newCode);
  };

  return (
    <div>
      <h1>{codeBlock.title}</h1>
      <SyntaxHighlighter language="javascript" style={tomorrow}>
        {code}
      </SyntaxHighlighter>
      {isMentor ? (
        <p>Read-only mode (Mentor)</p>
      ) : (
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default CodeBlock;
