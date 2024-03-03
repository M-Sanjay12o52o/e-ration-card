import { FC } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'


interface CarouselProps {

}

const CarouselComponent: FC<CarouselProps> = ({ }) => {
    return <div className='h-screen flex justify-center items-center'>
        <Carousel>
            <CarouselContent className='ml-96 mt-24'>
                <CarouselItem><Image className='rounded-lg' src={"/five.jpeg"} height={600} width={600} alt='ration image' /></CarouselItem>
                <CarouselItem><Image className='rounded-lg' src={"/four.jpeg"} height={600} width={600} alt='ration image' /></CarouselItem>
                <CarouselItem><Image className='rounded-lg' src={"/three.jpeg"} height={600} width={600} alt='ration image' /></CarouselItem>
                <CarouselItem><Image className='rounded-lg' src={"/tw.jpeg"} height={600} width={600} alt='ration image' /></CarouselItem>
                <CarouselItem><Image className='rounded-lg' src={"/one.jpeg"} height={600} width={600} alt='ration image' /></CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='absolute left-0 top-1/2 transform -translate-y-1/2' />
            <CarouselNext className='absolute right-0 top-1/2 transform -translate-y-1/2' />
        </Carousel>
    </div>

}

export default CarouselComponent