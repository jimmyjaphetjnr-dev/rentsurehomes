import { Link } from "react-router-dom";

export default function Button({
  children,
  onClick,
  to,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
})
{
  const base =
    "px-4 py-2 rounded-lg font-medium transition duration-200";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

const classes = `
  ${base}
  ${variants[variant]}
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  ${className}
`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
  type={type}
  onClick={onClick}
  disabled={disabled}
  className={classes}
>
      {children}
    </button>
  );
}