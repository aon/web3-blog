import Link from "next/link";
import { FiEdit, FiHome, FiInfo, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/account-context";

const Dropdown = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { account } = useContext(AccountContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="dropdown lg:hidden">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle lg-max:no-animation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-3 w-52 bg-base-300 p-2 shadow lg:menu-compact"
      >
        <li>
          <Link href="/">
            <a>
              <span className="w-full">Home</span>
              <FiHome />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>
              <span className="w-full">About</span>
              <FiInfo />
            </a>
          </Link>
        </li>
        {account.address && (
          <li>
            <Link href="/new-post">
              <a>
                <span className="w-full">New post</span>
                <FiEdit />
              </a>
            </Link>
          </li>
        )}
        {mounted && (
          <li onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <a>
              <span className="w-full">
                {theme === "light" ? "Dark mode" : "Light mode"}
              </span>
              {theme === "light" ? <FiSun /> : <FiMoon />}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
