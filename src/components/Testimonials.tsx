import federico from "../assets/images/testimonials/federico-lopez.png";
import kyra from "../assets/images/testimonials/kyra-best.png";
import aadya from "../assets/images/testimonials/aadya-dewan.png";
import clark from "../assets/images/testimonials/clark-sawyer.png";

const TESTIMONIALS = [
  {
    name: "Federico López",
    role: "Guitarist",
    text: "Fabulous service. On time and everything in perfect condition. Very impressed - once again!",
    picture: federico,
  },
  {
    name: "Kyra Best",
    role: "Pianist",
    text: "The service from Arpeggio is always outstanding and I highly recommend you to all my musician friends!",
    picture: kyra,
  },
  {
    name: "Aadya Dewan",
    role: "Bassist",
    text: "Thanks for the speedy delivery of my order, couldn't be happier. Excellent service, will be buying from you again. Thanks again!",
    picture: aadya,
  },
  {
    name: "Clark Sawyer",
    role: "Drummer",
    text: "A big thank you for the brilliant service you give. My new cymbals arrived to me in the UK in less than a week, packaged perfectly.",
    picture: clark,
  },
];

function Testimonial({
  clientImage,
  testimonial,
  clientName,
  clientRole,
}: {
  clientImage: string;
  testimonial: string;
  clientName: string;
  clientRole: string;
}) {
  return (
    <section className="relative w-[300px] bg-blue-300 mt-[50px]">
      <section className="bg-red-400 rounded-full w-[100px] h-[100px] absolute top-[-50px] flex items-center overflow-hidden left-[calc(50%-50px)]">
        <img
          src={clientImage}
          alt={`${clientName}'s picture`}
          className="w-full h-fit"
        />
      </section>
      <p className="mt-[50px]">{testimonial}</p>
      <p>
        <span>{clientName}</span> - <span>{clientRole}</span>
      </p>
    </section>
  );
}

export default function Testimonials() {
  return (
    <section className="flex gap-2">
      {TESTIMONIALS.map((testimonial) => (
        <Testimonial
          key={testimonial.name}
          clientImage={testimonial.picture}
          clientName={testimonial.name}
          clientRole={testimonial.role}
          testimonial={testimonial.text}
        />
      ))}
    </section>
  );
}
