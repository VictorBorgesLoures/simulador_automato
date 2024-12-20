export default interface IAFdata {
    alfabeto: Array<string>,
    estados: Array<string>,
    estadoInicial: string,
    estadosFinais: Array<string>,
    transicoes: Array<Array<string>>
};