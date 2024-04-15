export function ProductsSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 3h20v4H2zm17 5H3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8h-2zm-3 6H8v-2h8v2z"></path><filter id='inset-shadow'>
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