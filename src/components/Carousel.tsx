import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSwipeable } from "react-swipeable";

// this is needed to ensure that tailwind classes are included in the stylesheet

interface CarouselButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "className"> {
  placement: "left" | "right";
}

function CarouselButton({
  placement,
  children,
  ...props
}: CarouselButtonProps) {
  const placementClass = placement === "left" ? "left-[2%]" : "right-[2%]";

  return (
    <button
      {...props}
      className={twMerge(
        "absolute top-[45%] z-10 cursor-pointer rounded-full bg-gray-500 p-2 text-white opacity-50  transition duration-300  ease-in-out hover:scale-125 hover:opacity-85 active:scale-125  active:bg-gray-300 active:opacity-85",
        placementClass,
      )}
    >
      {children}
    </button>
  );
}

export interface CarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

function Carousel({ images }: CarouselProps) {
  const maxSlide = images.length - 1;

  const slideRefs = images.map(() => useRef<HTMLDivElement>(null));
  const [currSlide, setCurrSlide] = useState(0);

  useEffect(() => {
    slideRefs.forEach((slideRef, index) => {
      if (slideRef.current) {
        slideRef.current.style.transform = `translateX(${
          (index - currSlide) * 100
        }%)`;
      }
    });
  }, [currSlide]);

  const handleNext = () => {
    if (currSlide === maxSlide) {
      setCurrSlide(0);
    } else {
      setCurrSlide((s) => s + 1);
    }
  };
  const handlePrev = () => {
    if (currSlide === 0) {
      setCurrSlide(maxSlide);
    } else {
      setCurrSlide((s) => s - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      eventData.event.preventDefault();
      setCurrSlide((currSlide + 1) % images.length);
    },
    onSwipedRight: (eventData) => {
      eventData.event.preventDefault();
      setCurrSlide((currSlide - 1 + images.length) % images.length);
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="grid place-items-center">
      <div
        className="relative h-80 w-full max-w-3xl overflow-hidden rounded-2xl"
        {...handlers}
      >
        {images.map((slide, index) => (
          <div
            key={slide.src}
            ref={slideRefs[index]}
            style={{ transform: `translateX(${index * 100}%)` }}
            className="absolute h-80 w-full max-w-3xl transition-all duration-500 ease-in-out"
          >
            <img
              className="h-full w-full object-cover"
              src={slide.src}
              alt={slide.alt}
            />
          </div>
        ))}

        <CarouselButton onClick={handlePrev} placement="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </CarouselButton>
        <CarouselButton onClick={handleNext} placement="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </CarouselButton>
        <ul className="absolute bottom-2 flex w-full justify-center space-x-2">
          {images.map((slide, index) => (
            <li
              key={slide.src}
              className={twMerge(
                `h-2 w-2 rounded-full bg-gray-500`,
                index === currSlide ? "bg-white" : "",
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Carousel;
