export default function Guest({ children }) {
    return (
        <div className="row justify-content-center bg-dark vh-100">
            <div className="col-auto mt-8 text-white">
                <div className="shadow bg-white p-4 rounded">
                    {children}
                </div>
            </div>
        </div>
    );
}
