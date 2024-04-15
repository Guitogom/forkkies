export function HomeSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path><filter id='inset-shadow'>
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