export default function FooterComponent() {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                <span>Copyright © {process.env.REACT_APP_NAME} {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    )
}