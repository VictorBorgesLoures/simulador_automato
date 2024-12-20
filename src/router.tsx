import { createHashRouter } from "react-router-dom"
import App from './App'
import Automato from './pages/Automato'
import AutomatoHome from './pages/AutomatoHome'
import Formulario from './pages/Formulario'
import Home from "./pages/Home"
import Conversor from "./pages/Conversor"
import Minimizar from "./pages/Minimizar"
import Leitor from "./pages/Leitor"
import NotFound from "./pages/notFound"

const router = createHashRouter(
    [

        {
            path: "",
            element: <App />,
            children: [
                {
                    path: "",
                    element: <Home />

                },
                {
                    path: "formulario",
                    element: <Formulario />
                },
                {
                    path: "*",
                    element: <NotFound />
                }
            ],
        },
        {
            path: "automato",
            element: <Automato />,
            children: [
                {
                    path: "",
                    element: <AutomatoHome />
                },
                {
                    path: "conversor",
                    element: <Conversor />
                },
                {
                    path: "minimizacao",
                    element: <Minimizar />
                },
                {
                    path: "leitor",
                    element: <Leitor />
                },
                {
                    path: "*",
                    element: <NotFound />
                }
            ]
        }
    ]
);

export default router;