import { GiMineralHeart } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <div className="flex w-full justify-center">
        <p>made with </p>
        <GiMineralHeart color="blue" />
        <p>
          by{" "}
          <a
            href="https://github.com/aon"
            className="font-bold hover:underline"
          >
            aon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
