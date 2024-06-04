import { Link } from "react-router-dom";
import storeLogo from "../assets/images/arpeggio.svg";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white flex justify-center py-14">
      <section className="w-full xl:w-[1280px] flex items-center justify-between flex-col sm:flex-row sm:box-border sm:px-8 xl:px-0">
        <section className="max-w-[500px]">
          <img
            src={storeLogo}
            alt="Arpeggio Music Store's Logo"
            className="h-6 m-auto sm:m-0"
          />
          <p className="mt-2 text-center sm:text-left text-sm opacity-70">
            Arpeggio is your ultimate destination for all things musical. We're
            a tight-knit group of musicians and instrument aficionados dedicated
            to enriching your musical journey.
            <br />
            At Arpeggio, we don't just sell instruments, we cultivate musical
            journeys.
          </p>
        </section>
        <section className="text-center mt-4 sm:mt-0 self-center sm:text-right sm:self-end">
          <nav>
            <ul>
              <li className="hover:text-purple-400">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-purple-400">
                <Link to="/catalog/1">Catalog</Link>
              </li>
              <li className="hover:text-purple-400">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="hover:text-purple-400">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <section className="flex gap-4 justify-end mt-4 text-2xl">
            <FaFacebookSquare title="facebook" className="cursor-pointer" />
            <FaInstagram title="instagram" className="cursor-pointer" />
            <FaTwitter title="twitter" className="cursor-pointer" />
          </section>
        </section>
      </section>
    </footer>
  );
}
