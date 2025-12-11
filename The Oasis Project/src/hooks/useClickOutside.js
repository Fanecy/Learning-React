import { useEffect, useRef } from "react";

function useClickOutside(handler, listenerCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClose(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClose, listenerCapturing);

      return () =>
        document.removeEventListener("click", handleClose, listenerCapturing);
    },
    [handler, listenerCapturing]
  );

  return ref;
}

export default useClickOutside;
