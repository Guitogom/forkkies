import React from 'react'

export function PlaySVG({ rotation = '0deg' }) {
    return (
        <svg
            fill="#000000"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            style={{ transform: `rotate(${rotation})` }}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <style type="text/css">
                    {`.st0{fill:none;}`}
                </style>
                <path d="M9,18l7-6L9,6V18z"></path>
                <rect className="st0" width="24" height="24"></rect>
                <rect className="st0" width="24" height="24"></rect>
            </g>
        </svg>
    )
}
