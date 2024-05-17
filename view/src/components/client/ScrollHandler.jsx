import React, { useEffect, useState } from 'react';

function ScrollHandler() {
    const [startY, setStartY] = useState(0)
    const [isTouching, setIsTouching] = useState(false)

    function handleScroll(event) {
        const currentY = event.touches ? event.touches[0].clientY : window.scrollY;

        if (currentY > startY) {
            console.log("Abajo");
            setIsTouching(true);
        } else {
            console.log("Arriba");
            setIsTouching(true);
        }
    }

    useEffect(() => {
        const handleTouchStart = (event) => {
            setStartY(event.touches ? event.touches[0].clientY : window.scrollY);
        };

        window.addEventListener("touchstart", handleTouchStart, false);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart, false);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("touchmove", handleScroll, false);

        return () => {
            window.removeEventListener("touchmove", handleScroll, false);
        };
    }, [startY]);

    return null;
}

export default ScrollHandler;
