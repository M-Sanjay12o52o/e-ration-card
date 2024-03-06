"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../components/ui/infinate-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                images={images}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const images = [
    {
        image: "/one.jpeg",
        name: "ration image one",
    },
    {
        image: "/tw.jpeg",
        name: "ration image two"
    },
    {
        image: "/three.jpeg",
        name: "ration image three"
    },
    {
        image: "/four.jpeg",
        name: "ration image four"
    },
    {
        image: "/five.jpeg",
        name: "ration image five"
    }
]
