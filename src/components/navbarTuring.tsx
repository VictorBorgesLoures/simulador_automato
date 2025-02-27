import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export default (): ReactNode => {

    return (
        <div className="bg-light">
            <nav className="container navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => {
                                return isActive ? "nav-link active" : "nav-link";
                            }} to={{
                                pathname: "/"
                            }}>Simulador</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => {
                                return isActive ? "nav-link active" : "nav-link";
                            }} end to={{
                                pathname: "/turing"
                            }}>Turing</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <script type="javascript">

            </script>
        </div>
    )
}