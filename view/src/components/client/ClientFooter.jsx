export function ClientFooter({ primaryColor, secondaryColor, callToActionColor, themeColor }) {
    return (
        <footer className="client-footer" style={{ backgroundColor: primaryColor }}>
            <p className="client-show-price" style={{ color: themeColor }}>10,15€</p>
            <button className="client-order" style={{ backgroundColor: secondaryColor, color: themeColor }}><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill={themeColor} stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#fff" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></g></svg> Order</button>
        </footer>
    )
}