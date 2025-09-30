import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useDisprod } from "@/api/queryproducts";
import { ErrorComponent } from "./error";

export default function CustomCarousel() {
    const { data, error, isError } = useDisprod();

    if (isError) {
        return <ErrorComponent err={error.message} />;
    }
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 7000,
                }),
            ]}
            opts={{
                loop: true,
            }}
            className="mx-auto mt-3 w-11/12 bg-gray-500 rounded-md"
        >
            <CarouselContent>
                {data?.map((pr, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1 flex w-3/4 mx-auto gap-8 justify-center items-center">
                            <div className="w-[300px] h-[300px] bg-white object-cover relative">
                                <img src={pr.thumbnail} alt={pr.title} />
                                <div className="absolute z-10 top-[20%] left-[70%] h-16 w-16 rounded-full bg-slate-300 flex justify-center items-center">
                                    <span className="text-red-700">
                                        {pr.discount_percentage} %
                                    </span>
                                </div>
                            </div>
                            <div className="text-gray-100">
                                <p className="font-semibold text-2xl">
                                    {pr.title}
                                </p>
                                <p className="">${pr.price}</p>
                                <Button
                                    variant={"destructive"}
                                    className="font-bold mt-2"
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
