import { FaGithub } from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="flex flex-1 justify-center">
      <section className="w-full xl:w-[1280px] bg-pink-300 flex flex-col gap-4">
        <article>
          <h2>Disclaimer</h2>
          <p>
            <b>Arpeggio is a fictional store.</b> If you are looking for musical
            instruments or related products, please note that all products shown
            on this page where gathered from{" "}
            <a href="https://www.thomannmusic.com/" target="_blank">
              Thomann Music's website
            </a>
            , so consider searching for your desired product on their page.
          </p>
        </article>
        <article>
          <h2>Credits</h2>
          <ul>
            <li>
              <p>
                As stated above, product information and images were sourced
                from{" "}
                <a href="https://www.thomannmusic.com/" target="_blank">
                  Thomann Music's website
                </a>
                .
              </p>
            </li>
            <li>
              <p>
                All none-product images, such as banners and (made-up) customer
                reviews, are stock images obtained from{" "}
                <a href="https://www.canva.com/" target="_blank">
                  Canva
                </a>
                .
              </p>
            </li>
          </ul>
        </article>
        <section>
          <a
            href="https://github.com/FedeLopez17/shopping-cart"
            target="_blank"
          >
            <button
              type="button"
              className="bg-red-500 flex gap-2 w-44 py-4 justify-center items-center"
              title="See source code"
            >
              <FaGithub /> Source Code
            </button>
          </a>
        </section>
      </section>
    </section>
  );
}
