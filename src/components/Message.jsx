import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, children, onClose }) {
  useEffect(() => {
    // ✅ Only run timer if onClose exists
    if (!onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert
      variant={variant}
      dismissible={!!onClose}   // show close button only if onClose exists
      onClose={onClose}
    >
      {children}
    </Alert>
  );
}

export default Message;