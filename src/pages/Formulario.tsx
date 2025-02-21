import { ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import AF, { IautomatoState } from "../classes/AF";
import MT, { IturingState } from "../classes/MT";
import { ReactNode, useState } from "react";

interface automatoForm {
    alfabeto: string,
    estados: string,
    estadoInicial: string,
    estadosFinais: string,
    transicoes: string,
    erros: string[],
    maquina_turing: boolean
}

interface turingForm {
    alfabeto: string[],
    estados: string[],
    estadoInicial: string,
    estadosFinais: string[],
    transicoes: any,
    is_loaded: boolean,
    erros: string[],
}

const automatoDefault: automatoForm = {
    alfabeto: "a,b,c",
    estados: "Q0,Q1,Q2",
    estadoInicial: "Q0",
    estadosFinais: "Q1",
    transicoes: "Q0,a,Q0/Q0,a,Q1/Q0,a,Q2/Q1,b,Q1/Q2,c,Q2/Q2,&,Q1",
    erros: [],
    maquina_turing: false
}

const turingDefault: turingForm = {
    "alfabeto": ["a", "b", "x", "y"],
    "estados": ["Q0", "Q1", "Q2", "Q3", "Q4"],
    "estadoInicial": "Q0",
    "estadosFinais": ["Q4"],
    "transicoes": {
        "Q0": [
            ["a", "x", "Q1", "R"],
            ["y", "y", "Q3", "R"]
        ],
        "Q1": [
            ["y", "y", "Q1", "R"],
            ["a", "a", "Q1", "R"],
            ["b", "y", "Q2", "L"]
        ],
        "Q2": [
            ["a", "a", "Q2", "L"],
            ["y", "y", "Q2", "L"],
            ["x", "x", "Q0", "R"]
        ],
        "Q3": [
            ["y", "y", "Q3", "R"],
            ["?", "?", "Q4", "R"]
        ]
    },
    is_loaded: true,
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
        erros: [],
        maquina_turing: false
    });

    const [turingFormState, setTuringFormState] = useState<turingForm>({
        "alfabeto": [],
        "estados": [],
        "estadoInicial": "",
        "estadosFinais": [],
        "transicoes": null,
        is_loaded: false,
        erros: []
    });

    const [jsonFile, setJsonFile] = useState<any>();
    const [loadJson, setLoadJson] = useState<boolean>(true);

    function submitForm(event: React.MouseEvent) {
        event.preventDefault();

        if (!formState.maquina_turing) {
            let af = new AF(formState.alfabeto, formState.estados, formState.estadoInicial, formState.estadosFinais, formState.transicoes);

            if (!af.isValidAutomato()) {
                setState({ ...formState, erros: af.listErros() });
            } else {
                af.save();
                navigate("../automato");
            }
        } else {
            const turingMachine: IturingState = {
                alfabeto: turingFormState.alfabeto,
                estadoInicial: turingFormState.estadoInicial,
                estadosFinais: turingFormState.estadosFinais,
                estados: turingFormState.estados,
                transicoes: turingFormState.transicoes,
            };
            let mt = new MT(turingMachine);
            if (mt.isValidMaquinaTuring()) {
                mt.save();
                navigate("../turing");
            } else {
                setTuringFormState({ ...turingFormState, erros: mt.listErros() });
            }
        }
    }

    function buildFormErros(): ReactNode {
        if (formState.maquina_turing) {
            return turingFormState.erros.map((e, i) => {
                return <div id={"error+" + i} key={"error-" + i} className="form-text">{e}</div>
            })
        }

        return formState.erros.map((e, i) => {
            return <div id={"error+" + i} key={"error-" + i} className="form-text">{e}</div>
        })
    }

    function carregarDefault(e: MouseEvent) {
        e.preventDefault();
        if (!formState.maquina_turing) {
            setState(automatoDefault);
        } else {
            setTuringFormState(turingDefault);
            alert("Máquina de Turing carregada com sucesso!");
        }
    }

    function handleLoadJson(e: MouseEvent) {
        e.preventDefault();
        if (formState.maquina_turing) {
            setTuringFormState({ ...turingFormState, ...jsonFile });
        } else {
            setState({ ...formState, ...AF.minify(jsonFile) });
        }
        setLoadJson(true);
    }

    function handleJsonUpdate(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files && e.target.files[0].type == "application/json") {
            new Response(e.target.files[0]).json().then((json: any) => {
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
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="af" id="af" checked={!formState.maquina_turing}
                        onChange={e => setState({ ...formState, maquina_turing: false })} />
                    <label className="form-check-label" htmlFor="af">
                        Autômato Finito
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="mt" id="mt" checked={formState.maquina_turing}
                        onChange={e => setState({ ...formState, maquina_turing: true })} />
                    <label className="form-check-label" htmlFor="mt">
                        Máquina de Turing
                    </label>
                </div>
                <div className={formState.maquina_turing ? "d-none" : "d-block"}>
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
                </div>
                {formState.maquina_turing ? <p>A Máquina de Turing só aceita arquivo JSON</p> : null}
                {buildFormErros()}
                <div className="btn-group d-block" role="group" aria-label="Basic example">
                    <button className="btn btn-primary" type="button"
                        disabled={formState.maquina_turing ? true : false}
                        onClick={e => carregarDefault(e)}>Default Autômato Finito</button>
                    <button className="btn btn-primary" type="button"
                        disabled={formState.maquina_turing ? false : true}
                        onClick={e => carregarDefault(e)}>Default Máquina de Turing</button>
                </div>
                <div className="btn-group d-flex mt-2" style={{ "width": "50%" }} role="group" aria-label="Basic example">
                    <input className="btn btn-primary" type="file" id="jsonInput" placeholder="Carregar JSON" onChange={e => handleJsonUpdate(e)}></input>
                    <button className="btn btn-primary" type="button" disabled={loadJson} onClick={e => handleLoadJson(e)}>Carregar JSON</button>
                </div>
                <div className="btn-group d-flex float-end" role="group" aria-label="Basic example">
                    <button type="button" onClick={(e) => submitForm(e)} className="btn btn-primary d-block float-end">Enviar</button>
                </div>
            </form>
        </div>
    )
}