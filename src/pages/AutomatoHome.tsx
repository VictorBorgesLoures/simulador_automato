import { MouseEvent } from "react";
import { Link, useOutletContext } from "react-router-dom";
import IOutletContext from "../interfaces/IOutletContext";

export default () => {

    let { afProvider }: IOutletContext = useOutletContext();

    function printAutomato() {
        if (afProvider.afState != null) {
            let automatoState = afProvider.afState.toAutomatoState();
            let alfabeto = <div>
                <h3>Alfabeto</h3>
                <p>[ {automatoState.alfabeto.join(', ')} ]</p>
            </div>;

            let estados = <div>
                <h3>Estados</h3>
                <p>[ {automatoState.estados.join(', ')} ]</p>
            </div>;

            let estadoInicial = <div>
                <h3>Estado Inicial</h3>
                {automatoState.estadoInicial}
            </div>;

            let estadosFinais = <div>
                <h3>Estados Finais</h3>
                <p>[ {automatoState.estadosFinais.join(', ')} ]</p>
            </div>;

            let transicoes = <div>
                <h3>Transições</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Estado atual</th>
                            <th scope="col">Letra</th>
                            <th scope="col">Próximo estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {automatoState.transicoes.map((t,i) => {
                            return <tr key={"transicao-"+i}>
                                <td>{t[0]}</td>
                                <td>{t[1]}</td>
                                <td>{t[2]}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

            return <div>
                {alfabeto}
                <br />
                {estados}
                <br />
                {estadoInicial}
                <br />
                {estadosFinais}
                <br />
                {transicoes}
            </div>;
        }
    }

    function saveAutomato(e: MouseEvent) {
        e.preventDefault();
        afProvider.afState?.save();
    }

    return (
        <div className="container">
            <br />
            <h2>Estado atual do autômato: {afProvider.afState?.getTipo() || "Undefined"}</h2>
            <br />
            {printAutomato()}
            <br />
            <div className="btn-group float-end" role="group" aria-label="Basic example">
                <button className="btn btn-primary" type="button"><Link className="btn btn-primary" to="../">Voltar</Link></button>
                <button className="btn btn-primary" type="button" onClick={e => saveAutomato(e)}>Salvar</button>
            </div>

        </div>
    )
}