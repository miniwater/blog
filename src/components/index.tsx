import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
    const list = [
        "https://www.krjojo.com/wp-content/uploads/2025/12/广州大道.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/chongqing.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/chengdu.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/changsha.avif",
        "https://www.krjojo.com/wp-content/themes/krjojo/assets/images/glide/tianhuan.avif"
    ];
    return (
        <Carousel>
            <div className="flex items-center justify-between w-full gap-2 mb-4">
                <div>
                    <h2 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">人生是场冒险</h2>
                    <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance">请不要忘记旅途本身的意义</p>
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
                {Array.from(list).map((src, index) => (
                    <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="pb-0">
                                <img
                                    src={src}
                                    className="rounded w-full aspect-square object-cover"
                                    alt="chongqing"
                                    loading="lazy"
                                    decoding="async"
                                />
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
