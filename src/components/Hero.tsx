"use client"

import React, { FC, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from './ui/card'

interface HeroProps {

}

const Hero: FC<HeroProps> = ({ }) => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return <Carousel
        plugins={[plugin.current]}
        className="mt-48"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
    >
        <CarouselContent>
            <CarouselItem className='w-screen h-screen'>
                <Image
                    alt='hills image'
                    src={"/landing/hills.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                />
            </CarouselItem>
            <CarouselItem className='w-screen h-screen'>
                <Image
                    alt='kambala image'
                    src={"/landing/kambla.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                />
            </CarouselItem>
            <CarouselItem className='w-screen h-screen'>
                <Image alt='kamsale image'
                    src={"/landing/kamsale.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                />
            </CarouselItem>
            <CarouselItem className='w-screen h-screen'>
                <Image alt='tiger image'
                    src={"/landing/tiger.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                />
            </CarouselItem>
            <CarouselItem className='w-screen h-screen'>
                <Image alt='vidhanasoudha image'
                    src={"/landing/vidhansoudha.jpg"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    quality={100}
                    style={{ width: '100%', height: 'auto' }}
                />
            </CarouselItem>
        </CarouselContent>
    </Carousel>

}

export default Hero