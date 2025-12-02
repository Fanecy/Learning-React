/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

function LinkButton({ src, children }) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-400 hover:text-blue-700 hover:underline";

  if (src === "-1")
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );

  return (
    <Link to={src} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
