import { Link } from "react-router-dom"

export default (props:any) => {

    return (
        <div className="container">
            <h1>Simulador de Autômatos</h1>
            <p>Esta aplicação possui como objetivo ser um trabalho da matéria de Linguagens Formais e Autômatos</p>
            <p>Nesta aplicação você pode usar o Formulário para inserir um Autômato ou fazer o upload de um arquivo json seguindo o formato:</p>
            <p>{"{"}</p>
            <p style={{marginLeft: '30px'}}>"alfabeto": string</p>
            <p style={{marginLeft: '30px'}}>"estados": string</p>
            <p style={{marginLeft: '30px'}}>"estadoInicial": string</p>
            <p style={{marginLeft: '30px'}}>"transicoes": string</p>
            <p>{"}"}</p>            
        </div>
    )
}