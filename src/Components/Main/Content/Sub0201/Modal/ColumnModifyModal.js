import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const ModalPortal = ({ children, closePortal, title }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById("modal");
      ref.current = dom;
    }
    return () => {
      setMounted(false);
    };
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <div className="modal">
        <div className="modal_background" role="presentation" onClick={closePortal} />
        <div className="modal_content">
          <div className="modal_content_header">
            <div id="modal_title" className="modal_content_title">
              {title}
            </div>
            <FaTimes className="modal_content_close" onClick={closePortal} />
          </div>
          <div className="modal_content_main">
            {children}
          </div>
        </div>
      </div>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;