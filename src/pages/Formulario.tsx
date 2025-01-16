import { ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import AF, { automatoMinified, IautomatoState } from "../classes/AF";
import { ReactNode, useState } from "react";

interface automatoForm {
    alfabeto: string,
    estados: string,
    estadoInicial: string,
    estadosFinais: string,
    transicoes: string,
    erros: string[]
}

const automatoDefault: automatoForm = {
    alfabeto: "a,b,c",
    estados: "Q0,Q1,Q2",
    estadoInicial: "Q0",
    estadosFinais: "Q1",
    transicoes: "Q0,a,Q0/Q0,a,Q1/Q0,a,Q2/Q1,b,Q1/Q2,c,Q2/Q2,&,Q1",
    erros: []
}

export default () => {
    const navigate = useNavigate();

    const [formState, setState] = useState<automatoForm>({
        alfabeto: "",
        estados: "",
        estadoInicial: "",
        estadosFinais: "",
        transicoes: "",
        erros: []
    });

    const [jsonFile, setJsonFile] = useState<IautomatoState>();
    const [loadJson, setLoadJson] = useState<boolean>(true);

    function submitForm(event: React.MouseEvent) {
        event.preventDefault();

        let af = new AF(formState.alfabeto, formState.estados, formState.estadoInicial, formState.estadosFinais, formState.transicoes);

        if (!af.isValidAutomato()) {
            setState({ ...formState, erros: af.listErros() });
        } else {
            af.save();
            navigate("../automato");
        }
    }

    function buildFormErros(): ReactNode {

        return formState.erros.map((e, i) => {
            return <div id={"error+" + i} key={"error-" + i} className="form-text">{e}</div>
        })
    }

    function carregarDefault(e: MouseEvent) {
        e.preventDefault();
        setState(automatoDefault);
    }

    function handleLoadJson(e: MouseEvent) {
        e.preventDefault();
        setState({ ...formState, ...AF.minify(jsonFile)});
        setLoadJson(true);
    }

    function handleJsonUpdate(e: ChangeEvent) {
        e.preventDefault();
        if (e.target.files[0].type == "application/json") {
            new Response(e.target.files[0]).json().then((json: IautomatoState) => {
                let valid = true;
                Object.keys(json).forEach(k => {
                    switch (k) {
                        case "alfabeto":
                        case "estados":
                        case "estadoInicial":
                        case "estadosFinais":
                        case "transicoes":
                            break;
                        default:
                            valid = false;
                            break;
                    }
                })
                if (valid) {
                    setJsonFile(json);
                    setLoadJson(false);
                } else {
                    alert("Os campos do arquivo json não são válidos!");
                }
            }, err => {
                // not json
            })

        } else {
            alert("O arquivo deve ser em formato .json!");
        }
    }

    return (
        <div className="container">
            <h1 className="text-left">Formulário</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="alfabeto"
                        className="form-label">
                        Alfabeto
                    </label>
                    <input type="text" className="form-control"
                        id="alfabeto"
                        placeholder="a,b,c,d"
                        value={formState.alfabeto}
                        onChange={e => setState({ ...formState, alfabeto: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="estados"
                        className="form-label">
                        Estados
                    </label>
                    <input type="text" className="form-control"
                        id="estados"
                        placeholder="Q1,Q2,Q3"
                        value={formState.estados}
                        onChange={e => setState({ ...formState, estados: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="estadoInicial"
                        className="form-label">
                        Estado Inicial
                    </label>
                    <input type="text" className="form-control"
                        id="estadoInicial"
                        placeholder="Q1"
                        value={formState.estadoInicial}
                        onChange={e => setState({ ...formState, estadoInicial: e.target.value })}
                    />                </div>
                <div className="mb-3">
                    <label htmlFor="estadosFinais"
                        className="form-label">
                        Estados Finais
                    </label>
                    <input type="text" className="form-control"
                        id="estadosFinais"
                        placeholder="Q1,Q2,Q3"
                        value={formState.estadosFinais}
                        onChange={e => setState({ ...formState, estadosFinais: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="transicoes"
                        className="form-label">
                        Transições
                    </label>
                    <input type="text" className="form-control"
                        id="transicoes"
                        placeholder="Q1,a,Q2/Q2,b,Q3"
                        value={formState.transicoes}
                        onChange={e => setState({ ...formState, transicoes: e.target.value })}
                    />
                </div>
                {buildFormErros()}
                <div className="btn-group float-end" role="group" aria-label="Basic example">
                    <input className="btn btn-primary" type="file" id="jsonInput" placeholder="Carregar JSON" onChange={e => handleJsonUpdate(e)}></input>
                    <button className="btn btn-primary" type="button" disabled={loadJson} onClick={e => handleLoadJson(e)}>Carregar JSON</button>
                    <button className="btn btn-primary" type="button" onClick={e => carregarDefault(e)}>Carregar Default</button>
                    <button type="button" onClick={(e) => submitForm(e)} className="btn btn-primary">Enviar</button>
                </div>

            </form>
        </div>
    )
}