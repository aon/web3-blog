import Link from "next/link";
import ThemeSwitch from "../theme-switch";
import ConnectWalletButton from "../connect-wallet-button";
import Dropdown from "./dropdown";
import { AccountContext } from "../../context/account-context";
import { useContext } from "react";

const NavBar = () => {
  const { account } = useContext(AccountContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-base-100 lg:p-4">
      <div className="navbar bg-base-300 lg:min-h-12 lg:max-h-12 lg:rounded-full">
        <div className="navbar-start">
          <Dropdown />

          <Link href="/">
            <a className="btn btn-ghost text-2xl normal-case lg:text-xl lg-max:no-animation">
              <span className="mr-2">📓</span>
              <span className="hidden lg:flex">Blog</span>
            </a>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal menu-compact items-center p-0 ">
            <li>
              <Link href="/">
                <a className="active:bg-info">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="active:bg-info">About</a>
              </Link>
            </li>
            {account.address && (
              <li className="mx-2">
                <Link href="/new-post">
                  <a className="btn btn-outline btn-sm py-0 normal-case">
                    New post
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end">
          <span className="mr-4 hidden lg:flex">
            <ThemeSwitch className="lg-max:no-animation" />
          </span>
          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
