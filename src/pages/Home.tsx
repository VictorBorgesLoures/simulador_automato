export default () => {

    return (
        <div className="container">
            <h1>Simulador de Autômatos</h1>
            <p>Esta aplicação possui como objetivo ser um trabalho da matéria de Linguagens Formais e Autômatos</p>
            <p>Nesta aplicação você pode usar o Formulário para inserir um Autômato ou fazer o upload de um arquivo json seguindo o formato:</p>
            <p>{"{"}</p>
            <p style={{ marginLeft: '30px' }}>"alfabeto": Array{"<string>"}</p>
            <p style={{ marginLeft: '30px' }}>"estados": Array{"<string>"}</p>
            <p style={{ marginLeft: '30px' }}>"estadoInicial": string</p>
            <p style={{ marginLeft: '30px' }}>"transicoes": {"Array<Array<string>>"}</p>
            <p>{"}"}</p>
            <h2>Exemplo de JSON</h2>
            <p>{"{"}</p>
            <p style={{ marginLeft: '30px' }}>{`"alfabeto": ["a","b","c"]`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estados": ["Q0","Q1","Q2"]`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estadoInicial": "Q0"`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estadosFinais": ["Q1","Q2"]`}</p>
            <p style={{ marginLeft: '30px' }}>{"{"}</p>
            <p style={{ marginLeft: '50px' }}>{`"transicoes": [`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q0","a","Q0"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q0","a","Q1"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q0","a","Q2"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q1","b","Q1"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q2","c","Q2"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`["Q2","&","Q1"],`}</p>
            <p style={{ marginLeft: '50px' }}>{"]"}</p>
            <p>{"}"}</p>
        </div>
    )
}