import React, { useEffect, useState } from 'react'
import ToTopIcon from '../assets/to-top.svg'

const ToTop = () => {
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setShowTop(true)
            }else {
                setShowTop(false)
            }
        })
    }, [])

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }
    return (
        <React.Fragment>
            <div onClick={goTop} className={` ${showTop ? "fixed" : "hidden"} z-40 bottom-2 md:bottom-5 mb-2 right-2 md:right-20 justify-center items-center h-10 w-10 border border-white bg-[#111827] rounded-full drop-shadow-lg cursor-pointer animate__animated animate__slideInUp`}>
                <img loading="lazy" src={ToTopIcon} alt="top" className="block w-12 h-auto drop-shadow-4xl" />
            </div>
        </React.Fragment>
        
    )
}

export default ToTop