import { useEffect, useState } from 'react'

function ScrollHandler({ divHeight, setDivHeight, targetRef }) {
    const [startY, setStartY] = useState(0)

    function handleScroll(event) {
        const currentY = event.touches ? event.touches[0].clientY : window.scrollY

        if (!targetRef.current.contains(event.target)) {
            return
        }

        if (currentY > startY + 20) {
            if (divHeight === '150px') return
            setDivHeight('150px')
        } else {
            if (divHeight === '0px') return
            setDivHeight('0px')
        }
    }

    useEffect(() => {
        const handleTouchStart = (event) => {
            if (!targetRef.current.contains(event.target)) {
                return
            }
            setStartY(event.touches ? event.touches[0].clientY : window.scrollY)
        }

        window.addEventListener("touchstart", handleTouchStart, false)

        return () => {
            window.removeEventListener("touchstart", handleTouchStart, false)
        }
    }, [targetRef])

    useEffect(() => {
        window.addEventListener("touchmove", handleScroll, false)

        return () => {
            window.removeEventListener("touchmove", handleScroll, false)
        }
    }, [startY, targetRef])

    return null
}

export default ScrollHandler
