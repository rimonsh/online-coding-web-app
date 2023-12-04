import React, { useEffect, useState } from "react";

const SmileyAnimation = ({ isVisible }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 6000);
    }
  }, [isVisible]);

  return show ? <div style={{ fontSize: "3em" }}>😊</div> : null;
};

export default SmileyAnimation;
