import { Link } from "react-router-dom"

export default () => {

    return (
        <div className="container">
            <h1>Simulador de Autômatos Finitos e Máquina de Turing</h1>
            <p>Esta aplicação possui como objetivo ser um trabalho da matéria de Linguagens Formais e Autômatos!</p>
            <p>Nesta aplicação você pode usar o Formulário para inserir um Autômato ou Máquina de Turing.</p>
            <p>Você pode acessar o <Link to="/formulario">formulário</Link> para inserir os autômatos que quiser!</p>
        </div>
    )
}