import React from "react";

const SmileyModal = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <span role="img" aria-label="smiley" style={{ fontSize: "5em" }}>
            😊
          </span>
        </div>
      )}
    </>
  );
};

export default smileyModal;
