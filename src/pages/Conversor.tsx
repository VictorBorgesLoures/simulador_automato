import { MouseEvent, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import IOutletContext from "../interfaces/IOutletContext";

export default (props: any) => {

    let { afProvider }: IOutletContext = useOutletContext();
    let [tipo, setTipo] = useState(afProvider.afState?.getTipo());
    let navigate = useNavigate();

    if (afProvider.afState == null) {
        navigate('/');
    }

    function converterAFN(e: MouseEvent) {
        e.preventDefault();
        if(afProvider.afState != null) {
            afProvider.afState.convertToAFN();
            afProvider.saveAF(afProvider.afState);
            setTipo(afProvider.afState?.getTipo());
        }
    }

    function converterAFD(e: MouseEvent) {
        e.preventDefault();
        if(afProvider.afState != null) {
            afProvider.afState.convertToAFD();
            afProvider.saveAF(afProvider.afState);
            setTipo(afProvider.afState?.getTipo());
        }
    }

    function buildConversor() {

        return (
            <div>
                <p>O tipo do Autômato é: {tipo}</p>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-primary" disabled={tipo == "AFN-&" ? false : true} onClick={e => converterAFN(e)}>Para AFN</button>
                    <button type="button" className="btn btn-primary" disabled={tipo == "AFN" ? false : true} onClick={e => converterAFD(e)}>Para AFD</button>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Conversor</h1>
            {buildConversor()}
        </div>
    )
}