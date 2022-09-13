import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const ModalPortal = ({ children, closePortal }) => {
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
        <div className="modal-background" role="presentation" onClick={closePortal} />
        <div className="modal-content">
          <div className="modal_content_header">
            <div id="modal-title" className="modal_content_title">
              컬럼 수정
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