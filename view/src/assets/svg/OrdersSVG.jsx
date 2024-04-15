export function OrdersSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 10H7v-2h5v2zm5-4H7V8h10v2z"></path><filter id='inset-shadow'>
            <feOffset
                dx='0'
                dy='0'
            />

            <feGaussianBlur
                stdDeviation='1'
                result='offset-blur'
            />

            <feComposite
                operator='out'
                in='SourceGraphic'
                in2='offset-blur'
                result='inverse'
            />

            <feFlood
                floodColor='black'
                floodOpacity='.95'
                result='color'
            />
            <feComposite
                operator='in'
                in='color'
                in2='inverse'
                result='shadow'
            />

            <feComposite
                operator='over'
                in='shadow'
                in2='SourceGraphic'
            />
        </filter></svg>
    )
}