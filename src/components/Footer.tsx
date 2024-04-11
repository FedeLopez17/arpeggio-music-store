import { Link } from "react-router-dom";
import storeLogo from "../assets/images/arpeggio.svg";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white flex justify-center py-14">
      <section className="w-full xl:w-[1280px] flex justify-between flex-col md:flex-row sm:box-border sm:px-8 xl:px-0">
        <section className="max-w-[500px]">
          <img
            src={storeLogo}
            alt="Arpeggio Music Store's Logo"
            className="h-6 m-auto sm:m-0"
          />
          <p className="mt-2 text-center sm:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            eaque, facere laborum incidunt quod magni mollitia? Quisquam
            repudiandae harum quod aut eius sunt itaque blanditiis, beatae
            facilis ipsum id ad?
          </p>
        </section>
        <section className="text-center self-center sm:text-right sm:self-end">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <section className="flex gap-4 justify-end mt-4 text-2xl">
            <FaFacebookSquare />
            <FaInstagram />
            <FaTwitter />
          </section>
        </section>
      </section>
    </footer>
  );
}
