import produtNotFound from "../assets/images/not-found-404.png";

export default function ProductNotFound() {
  return (
    <section className="flex flex-col items-center flex-grow">
      <img
        src={produtNotFound}
        alt="404 Error"
        className="w-[min(300px,60%)] aspect-square mt-20"
      />
      <h4 className="font-bold text-3xl mt-8 mb-2 px-2">
        Sorry, this product
        <span className="text-purple-500"> couldn't be found</span>!
      </h4>
    </section>
  );
}
