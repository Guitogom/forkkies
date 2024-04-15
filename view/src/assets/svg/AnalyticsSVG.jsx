export function AnalyticsSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 21H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1zm7 0h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1z"></path><filter id='inset-shadow'>
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
                flood-color='black'
                flood-opacity='.95'
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