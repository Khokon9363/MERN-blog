export default function FooterComponent(){
    return (
        <footer className="bg-light text-center text-lg-start mt-3">
            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                © 2020 Copyright : {process.env.REACT_APP_NAME} {new Date().getFullYear()}
            </div>
        </footer>
    )
}