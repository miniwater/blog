import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
    return (
        <Carousel className="w-md">
            <div className="flex items-center justify-between w-full gap-2 mb-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">人生是场冒险</h2>
                    <p className="mt-1 text-gray-600 dark:text-neutral-400">请不要忘记旅途本身的意义</p>
                </div>

                {/* 按钮容器 */}
                <div className="flex items-center gap-2">
                    <CarouselPrevious
                        className="static translate-y-0"
                    />
                    <CarouselNext
                        className="static translate-y-0"
                    />
                </div>
            </div>
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6 h-48">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext className="" /> */}
        </Carousel>
    )
}
