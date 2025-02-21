export default () => {

    return (
        <div className="container">
            <h1>Simulador de Máquina de Turing</h1>
            <p>A Máquina de Turing nada mais é do que um modelo teórico de computador criado pelo matemático Alan Turing em 1936.</p>
            <p>Através deste simulador é possível comprovar que uma Máquina de Turing (computador atual) pode simular uma outra Máquina de Turing.</p>
            <p>Abaixo está um exemplo de como devem ser feitos os envios de um arquivo JSON com todos os dados necessários!</p>
            <p>{"{"}</p>
            <p style={{ marginLeft: '30px' }}>"alfabeto": Array{"<string>"}</p>
            <p style={{ marginLeft: '30px' }}>"estados": Array{"<string>"}</p>
            <p style={{ marginLeft: '30px' }}>"estadoInicial": string</p>
            <p style={{ marginLeft: '30px' }}>"transicoes": {"Object<Array<Array<string>>>"}</p>
            <p>{"}"}</p>
            <h2>Exemplo de JSON</h2>
            <p>As transições são objetos tal que a chave deve ser o valor de um estado e a matriz deve ser composta
                por 4 valores respectivamente nas posições 0, 1, 2 e 3 do vetor: leitura, escrita, estado e movimento.
            </p>
            <p>L representa movimento do cabeçote para esquerda e R o movimento para a direita.</p>
            <p>{"{"}</p>
            <p style={{ marginLeft: '30px' }}>{`"alfabeto": ["a","b","c"]`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estados": ["Q0","Q1","Q2"]`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estadoInicial": "Q0"`}</p>
            <p style={{ marginLeft: '30px' }}>{`"estadosFinais": ["Q1","Q2"]`}</p>
            <p style={{ marginLeft: '30px' }}>{"{"}</p>
            <p style={{ marginLeft: '50px' }}>{`"transicoes": {`}</p>
            <p style={{ marginLeft: '70px' }}>{`"Q0": [ ["a","c","Q0","R"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`        ["b","c","Q1","L"] ],`}</p>
            <p style={{ marginLeft: '70px' }}>{`"Q1": [ ["b","c","Q1","L"],`}</p>
            <p style={{ marginLeft: '70px' }}>{`        ["c","c","Q2","R"] ],`}</p>
            <p style={{ marginLeft: '70px' }}>{`"Q2": [ ["&","c","Q1","L"] ]`}</p>
            <p style={{ marginLeft: '50px' }}>{"}"}</p>
            <p>{"}"}</p>
        </div>
    )
}