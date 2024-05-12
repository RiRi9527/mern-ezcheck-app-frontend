import {
  Card,
  //   CardContent,
  //   CardDescription,
  //   CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Ads = () => {
  return (
    <Carousel className="flex justify-center items-center">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="flex justify-center items-center h-[260px] ">
              <h1>Hello World!</h1>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
    </Carousel>
  );
};

export default Ads;
