// CodeBlock.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import codeBlocks from "./codeBlocks";
import SmileyAnimation from "./SmileyAnimation";

const socket = io("https://online-coding-web-app-pi.vercel.app/", {
  transports: ["websocket"],
});

const CodeBlock = () => {
  const { id } = useParams();
  const codeBlock = codeBlocks[id];
  const [code, setCode] = useState(codeBlock.code);
  const sol = codeBlock.solution;
  const [isMentor, setIsMentor] = useState(() => {
    const initialValue = socket.emit("check-mentor-status");
    return initialValue;
  });
  const [showSmiley, setShowSmiley] = useState(false);

  useEffect(() => {
    socket.emit("check-mentor-status", (isMentorConnected) => {
      setIsMentor(isMentorConnected);
    });

    socket.on("mentor-connected", () => {
      setIsMentor(true);
    });

    socket.on("student-connected", () => {
      setIsMentor(false);
    });

    socket.on("code-change", (newCode) => {
      setCode(newCode);
      if (newCode === sol) {
        setShowSmiley(true);
      }
    });

    return () => {
      socket.off("code-change");
    };
  }, [sol]);

  const handleCodeChange = (newCode) => {
    if (!isMentor) {
      setCode(newCode);
    }
    if (newCode === sol) {
      setShowSmiley(true);
    } else {
      setShowSmiley(false); // Hide the smiley face when code changes
    }
    socket.emit("code-change", newCode);
  };

  return (
    <div>
      <h1>{codeBlock.title}</h1>
      <SyntaxHighlighter language="javascript" style={tomorrow}>
        {code}
      </SyntaxHighlighter>
      <h2>{console.log("isMentor", isMentor)}</h2>
      {isMentor ? (
        <p>Read-only mode (Mentor)</p>
      ) : (
        <div>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
          />
        </div>
      )}

      {/* Render the SmileyAnimation component */}
      <SmileyAnimation isVisible={showSmiley} />
    </div>
  );
};

export default CodeBlock;
