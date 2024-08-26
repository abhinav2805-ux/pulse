import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    img: "/img1.png",
  },
  {
   
    img: "img2.png",
  },
  {
    
    img: "img3.png",
  },
  {
   
    img: "/img4.png",
  },
  {
    
    img: "/img5.png",
  },
  {
    
    img: "/img6.png",
  },
];

const secondRow = reviews;

const ReviewCard = ({
  img,
}: {
  img: string;
}) => {
  return (
    <figure
    className={cn(
        "relative w-64 md:w-full h-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="h-[300px] w-full flex items-center justify-center">
        <img
          className="rounded-xl object-cover w-full h-full"
          alt=""
          src={img}
        />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
