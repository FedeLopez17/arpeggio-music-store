import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <section className="flex flex-1 justify-center">
      <section className="w-full xl:w-[1280px] flex flex-col gap-6 items-center py-16 px-2">
        <article className="max-w-[700px]">
          <h2 className="flex gap-2 items-center text-xl font-bold mb-8">
            <FaCircleInfo />
            Disclaimer
          </h2>
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

        <article className="max-w-[700px]">
          <h2 className="font-bold">Credits</h2>
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
                review images, are stock images obtained from{" "}
                <a href="https://www.canva.com/" target="_blank">
                  Canva
                </a>
                .
              </p>
            </li>
          </ul>
        </article>

        <section className="max-w-[700px]">
          <h2 className="font-bold">Feedback</h2>
          <p>
            All feedback is welcome and greatly appreciated! If you have any
            suggestions on how anything could have been done better, please
            don't hesitate to reach out!
          </p>
          <section className="flex flex-col sm:flex-row gap-4 mt-5 justify-center items-center">
            <a
              href="https://github.com/FedeLopez17/shopping-cart"
              target="_blank"
            >
              <button
                type="button"
                className="bg-slate-100 hover:bg-purple-200 flex gap-2 w-48 py-4 justify-center items-center"
                title="See source code"
              >
                <FaGithub className="w-5 h-5" /> Source Code
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/federico-lopez-uy/"
              target="_blank"
            >
              <button
                type="button"
                className="bg-slate-100 hover:bg-purple-200 flex gap-2 w-48 py-4 justify-center items-center"
                title="Visit LinkedIn profile"
              >
                <FaLinkedin className="w-5 h-5" /> LinkedIn
              </button>
            </a>
          </section>
        </section>
      </section>
    </section>
  );
}
