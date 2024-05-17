import React, { useEffect, useState } from 'react';

function ScrollHandler() {
    const [startY, setStartY] = useState(0);
    const [scrollStarted, setScrollStarted] = useState(false);

    function handleScroll(event) {
        if (!scrollStarted) {
            setScrollStarted(true);

            const currentY = event.touches ? event.touches[0].clientY : window.scrollY;
            if (currentY > startY) {
                console.log("Abajo");
            } else {
                console.log("Arriba");
            }

            setStartY(currentY);
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
        if (!scrollStarted) {
            window.addEventListener("touchmove", handleScroll, false);
        }

        return () => {
            window.removeEventListener("touchmove", handleScroll, false);
        };
    }, [scrollStarted]);

    return null;
}

export default ScrollHandler;
