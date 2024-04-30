/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import '../../styles/Landing.css'
import useMeasure from 'react-use-measure'
import { animate, useMotionValue, motion } from 'framer-motion'
import { BackArrow } from '../../assets/svg/BackArrow.jsx'
import { useEffect } from 'react'

export function Landing() {
    let [ref, { height }] = useMeasure()
    const yTranslation = useMotionValue(0)
    const yTranslationReverse = useMotionValue(0)

    useEffect(() => {
        let controls
        let finalPosition = -height / 2 - 8
        let finalPositionReverse = height / 2 - 8

        controls = animate(yTranslation, [0, finalPosition], {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.4,
            delay: 0.5,
        })

        controls = animate(yTranslationReverse, [0, finalPositionReverse], {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.4,
            delay: 0.5,
        })

        return controls.stop
    }, [yTranslation, yTranslationReverse, height])

    const generateBoxes = (count, isCube = false) => {
        const boxes = [];
        for (let i = 0; i < count; i++) {
            if (isCube) {
                boxes.push(<div key={i} className="box-landing-cube"></div>);
            } else {
                boxes.push(<div key={i} className="box-landing"></div>);
            }
        }
        return boxes;
    }

    useEffect(() => {
        if (localStorage.getItem('session_token') !== null) {
            window.location.href = '/dashboard'
        }
    }, [])

    return (
        <main className='landing-base'>
            <div className="header-landing">
                <motion.div className='side-landing left-side-landing' ref={ref} style={{ y: yTranslation }}>
                    {generateBoxes(2)}
                    <div className="box-landing-four">
                        {generateBoxes(4, true)}
                    </div>
                    {generateBoxes(2)}
                    <div className="box-landing-four">
                        {generateBoxes(4, true)}
                    </div>
                    {generateBoxes(2)}
                </motion.div>
                <section className='center-landing'>
                    <h1 className='title-landing'>FORKKIES</h1>
                    <h3 className='subtitle-landing'>Self-service online orders</h3>
                    <Link to='/register' className='get-started-landing'>Get Started <BackArrow /></Link>
                    <p>You already have an account</p>
                    <Link to='/login' className='log-in-landing'>Log In</Link>
                </section>
                <motion.div className='side-landing right-side-landing' ref={ref} style={{ y: yTranslationReverse }}>
                    {generateBoxes(2)}
                    <div className="box-landing-four">
                        {generateBoxes(4, true)}
                    </div>
                    {generateBoxes(2)}
                    <div className="box-landing-four">
                        {generateBoxes(4, true)}
                    </div>
                    {generateBoxes(2)}
                </motion.div>
            </div>
        </main >
    )
}