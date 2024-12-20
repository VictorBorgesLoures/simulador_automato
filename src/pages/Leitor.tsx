import { MouseEvent, useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";
import IOutletContext from "../interfaces/IOutletContext";

export default (props: any) => {

    let { afProvider }: IOutletContext = useOutletContext();
    let [palavra, setPalavra] = useState("");
    let [leitura, setLeitura] = useState(false);
    let [tentouLer, setTentouLer] = useState(false);
    let navigate = useNavigate();

    if (afProvider.afState == null) {
        navigate('/');
    }

    let af = afProvider.afState;

    let tipo = af?.getTipo();

    function trySetPalavra(value: string) {
        if(value == "") {
            setPalavra(value);
        } else if(af?.isInAlfabeto(value[value.length - 1])) {
            if (palavra == value.substring(0,value.length-1) || palavra.substring(0, palavra.length-1) == value ) {
                setPalavra(value);
            }
        }
    }

    function lerPalavra(e: MouseEvent) {
        e.preventDefault();
        if (af != null && tipo == "AFD") {
            setLeitura(af.readPalavra(palavra));
            setTentouLer(true);
        }

    }

    return (
        <div className='container'>
            <h1>Leitor</h1>
            <p>Caso o tipo do seu automato não seja AFD, faça a conversão para que possa realizar a leitura de uma palavra!</p>
            <p>Só é possível aceitar as seguintes letras: {JSON.stringify(af?.getAlfabeto())}</p>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="palavra" className="col-form-label">Palavra: </label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="palavra" value={palavra} className="form-control" aria-describedby="palavra" placeholder='Digite a palavra' onChange={e => trySetPalavra(e.target.value)} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary" disabled={tipo == "AFD" ? false : true} onClick={e => lerPalavra(e)}>Ler Palavra</button>
            </div>
            {(leitura && tentouLer) ? <p className="text-success">Este autômato lê essa palavra!</p> : (tentouLer ? <p className="text-danger">Este autômato não lê esse tipo de palavra!</p> : "")}
        </div>
    )
}