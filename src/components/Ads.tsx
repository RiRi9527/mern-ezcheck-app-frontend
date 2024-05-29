import { Card } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const Ads = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleCircleClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        className=" flex justify-center items-center "
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="flex justify-center items-center h-[260px] min-w-[90px] ">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
      </Carousel>
      <div className="flex justify-center mt-4 space-x-2 -translate-y-16">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleCircleClick(index)}
            className={`w-4 h-4 rounded-full ${
              current === index + 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Ads;
