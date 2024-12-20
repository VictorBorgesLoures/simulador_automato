import { MouseEvent, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import IOutletContext from "../interfaces/IOutletContext";

export default (props: any) => {

    let { afProvider }: IOutletContext = useOutletContext();
    let [minimized, setMinimized] = useState(afProvider.afState?.isMinimized());
    let navigate = useNavigate();

    if (afProvider.afState == null) {
        navigate('/');
    }


    let tipo = afProvider.afState?.getTipo();

    function minimizar(e: MouseEvent) {
        e.preventDefault();
        if (afProvider.afState != null && !minimized) {
            afProvider.afState.minimizeAFD();
            afProvider.saveAF(afProvider.afState);
            setMinimized(true);
        }
    }

    return (
        <div className="container">
            <h1>Minimização</h1>
            <p>A minimização só é possível caso o seu autômato já esteja na forma AFD.</p>
            <div>
                <p>O tipo do Autômato é: {tipo}</p>
                {minimized ? <p>Autômato está minimizado!</p> : <p>O autômato ainda não foi minimizado!</p>}
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-primary" disabled={(tipo == "AFD" && !afProvider.afState?.isMinimized()) ? false : true} onClick={e => minimizar(e)}>Minimizar</button>
                </div>
            </div>
        </div>
    )
}