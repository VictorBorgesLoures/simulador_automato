import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export default (): ReactNode => {

    return (
        <div className="bg-light">
            <nav className="container navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className={({ isActive }) => {
                    return isActive ? "navbar-brand nav-link active" : "navbar-brand nav-link";
                }} to="/">AF</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => {
                                return isActive ? "nav-link active" : "nav-link";
                            }} to="/formulario">Formulário</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <script type="javascript">

            </script>
        </div>
    )
}