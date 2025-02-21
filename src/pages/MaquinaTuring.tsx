import { MouseEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavbarTuring from "../components/navbarTuring";
import MT from '../classes/MT';

export default (props: any) => {

    let [palavra, setPalavra] = useState("");
    let [leitura, setLeitura] = useState(false);
    let [tentouLer, setTentouLer] = useState(false);
    let navigate = useNavigate();

    let machine = MT.load();

    if (machine == null)
        navigate('/');
    

    function trySetPalavra(value: string) {
        if(value == "") {
            setPalavra(value);
        } else if(machine?.isInAlfabeto(value[value.length - 1])) {
            if (palavra == value.substring(0,value.length-1) || palavra.substring(0, palavra.length-1) == value ) {
                setPalavra(value);
            }
        }
    }

    function lerPalavra(e: MouseEvent) {
        e.preventDefault();
        if (machine != null) {
            setLeitura(machine.readPalavra(palavra));
            setTentouLer(true);
        }

    }

    return (
        <>
        <NavbarTuring />
        <div className='container'>
            <h1>Leitor</h1>
            <p>Escreva a palavra que deseja verificar.</p>
            <p>Lebrando: só é possível aceitar as seguintes letras: {JSON.stringify(machine?.getAlfabeto())}</p>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="palavra" className="col-form-label">Palavra: </label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="palavra" value={palavra} className="form-control" aria-describedby="palavra" placeholder='Digite a palavra' onChange={e => trySetPalavra(e.target.value)} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={e => lerPalavra(e)}>Ler Palavra</button>
            </div>
            {(leitura && tentouLer) ? <p className="text-success">Este autômato lê essa palavra!</p> : (tentouLer ? <p className="text-danger">Este autômato não lê esse tipo de palavra!</p> : "")}
        </div>
        </>
    )
}