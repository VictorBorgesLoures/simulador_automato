interface automatoMinified {
    alfabeto: string,
    estados: string,
    estadoInicial: string,
    estadosFinais: string,
    transicoes: string,
    minimized: boolean
}

export type { automatoMinified as automatoMinified };

interface IautomatoState {
    alfabeto: Array<string>,
    estados: Array<string>,
    estadoInicial: string,
    estadosFinais: Array<string>,
    transicoes: Array<Array<string>>,
    minimized: boolean
}

export type { IautomatoState as IautomatoState };

export default class AF {

    private alfabeto: Array<string> = [];
    private estados: Array<string> = [];
    private estadoInicial: string = "";
    private estadosFinais: Array<string> = [];
    private transicoes: Array<Array<string>> = [];
    private tipo: string = "";
    private minimized: boolean = false;
    public erros = {
        alfabeto: "",
        estados: "",
        estadoInicial: "",
        estadosFinais: "",
        transicoes: "",
    }

    constructor(alfabeto: string, estados: string, estadoInicial: string, estadosFinais: string, transicoes: string, minimized?:boolean) {
        this.buildAlfabeto(alfabeto);
        this.buildEstados(estados);
        this.buildEstadoInicial(estadoInicial);
        this.buildEstadosFinais(estadosFinais);
        this.buildTransicoes(transicoes);
        if(minimized)
            this.minimized = minimized;
    }

    public getTipo(): string {
        if (!this.tipo) {
            this.transicoes.forEach(transicao => {
                if (transicao[1] == "&") {
                    this.tipo = "AFN-&";
                    return;
                }
                this.transicoes.forEach(t => {
                    if (transicao[2] != t[2] && transicao[0] == t[0] && transicao[1] == t[1]) {
                        this.tipo = "AFN";
                        return;
                    }
                })
            })
        }

        if (!this.tipo)
            this.tipo = "AFD";

        return this.tipo;
    }

    public getAlfabeto(): string[] {
        return this.alfabeto;
    }

    public isMinimized(): boolean {
        return this.minimized;
    }

    public convertToAFN(): void {
        if (this.getTipo() == "AFN-&") {
            let novosEstados: Array<Array<string>>[] = [];
            let letrasEstados: Array<Array<string>>[] = [];
            let fechosEstados: Array<Array<string>> = [];
            // Constroi Fecho
            this.estados.forEach(estado => {
                let fechoEstado: Array<string> = [];
                this.transicoes.forEach(t => {
                    if (t[0] == estado && t[1] == "&" && t[2] != estado)
                        fechoEstado.push(t[2]);
                })
                fechoEstado.push(estado);
                fechosEstados.push(fechoEstado);
            });

            //Controi tabela 
            this.estados.forEach(estado => {
                let letrasEstado: Array<Array<string>> = [];
                this.alfabeto.forEach(letra => {
                    let fechoLetra: Array<string> = [];
                    this.transicoes.forEach(t => {
                        if (t[0] == estado && t[1] == letra)
                            fechoLetra.push(t[2]);
                    });
                    letrasEstado.push(fechoLetra);
                })
                letrasEstados.push(letrasEstado);
            });

            this.estados.forEach((_e, i) => {
                novosEstados.push([]);
                this.alfabeto.forEach((_letra, indiceLetra) => {
                    novosEstados[i].push([]);
                    let fechoEstado = fechosEstados[i];
                    let aux: Array<string> = [];
                    fechoEstado.forEach(estadoF => {
                        let indexEstadoFecho = this.indiceEstado(estadoF);
                        letrasEstados[indexEstadoFecho][indiceLetra].forEach((estadoPelaLetra) => {
                            let indice = this.indiceEstado(estadoPelaLetra);
                            fechosEstados[indice].forEach((a: string) => {
                                if (-1 == aux.findIndex(element => element == a))
                                    aux.push(a);
                            });
                        })
                    });
                    novosEstados[i][indiceLetra] = aux;
                })
            });

            let novasTransições: Array<Array<string>> = [];
            novosEstados.forEach((estado, i) => {
                estado.forEach((estadosDaLetra, indexLetra) => {
                    let letra = this.alfabeto[indexLetra];
                    estadosDaLetra.forEach(e => {
                        novasTransições.push([this.estados[i], letra, e]);
                    })
                });
            })

            this.transicoes = novasTransições;

            this.tipo = "AFN";
        }
        return;
    }

    public convertToAFD(): void {
        if (this.getTipo() == "AFN") {
            let novasTransicoes: Array<Array<string>> = [];
            let novosEstadosFinais: Array<string> = [];
            let transicoes: Array<Array<string>>[] = [];

            this.estados.forEach(estado => {
                let letrasEstado: Array<Array<string>> = [];
                this.alfabeto.forEach(letra => {
                    let fechoLetra: Array<string> = [];
                    this.transicoes.forEach(t => {
                        if (t[0] == estado && t[1] == letra)
                            fechoLetra.push(t[2]);
                    });
                    letrasEstado.push(fechoLetra);
                })
                transicoes.push(letrasEstado);
            });

            //A partir do estado fecho do estado inicial
            let visitados: string[] = [];
            let fila: Array<string>[] = [];
            fila.push([this.estadoInicial]);
            while (fila.length > 0) {
                let estadosAtuais = fila.shift();
                visitados.push(estadosAtuais?.join('') || "");
                estadosAtuais?.forEach(v => {
                    if (this.isInEstadoFinal(v) && novosEstadosFinais.findIndex(e => e == estadosAtuais.join('')) == -1)
                        novosEstadosFinais.push(estadosAtuais?.join('') || "");

                })
                this.alfabeto.forEach((l, i) => {
                    let vaiPara: Array<string> = [];
                    estadosAtuais?.forEach(e => {
                        let indexEstado = this.indiceEstado(e);
                        transicoes[indexEstado][i].forEach(v => vaiPara.push(v));
                    })
                    if (vaiPara.length > 0) {
                        novasTransicoes.push([estadosAtuais?.join('') || "Undefined", l, vaiPara.join('')]);
                        if (visitados.findIndex(e => e == vaiPara.join('')) == -1)
                            fila.push(vaiPara);
                    }
                });
            }
            this.estados = visitados;
            this.estadosFinais = novosEstadosFinais;
            this.transicoes = novasTransicoes;
            this.tipo = "AFD";
        }
        return;
    }

    public minimizeAFD(): void {
        if (!this.isMinimized()) {
            let tabela: Array<Array<string>>[] = [];
            for (let i = 0; i < this.estados.length; i++) {
                let aux: string[][] = [];
                for (let j = 0; j < this.estados.length; j++) {
                    aux.push([]);
                }
                tabela.push(aux);
            }

            // Remoção dos triviais
            for (let i = 0; i < this.estados.length; i++) {
                for (let j = 0; j < this.estados.length; j++) {
                    if (j < i) {
                        if (this.isInEstadoFinal(this.estados[i]) != this.isInEstadoFinal(this.estados[j])) {
                            tabela[i][j].push("X");
                        }
                    }
                }
            }

            // Marcar estados não equivalentes
            for (let i = 0; i < this.estados.length; i++) {
                for (let j = 0; j < this.estados.length; j++) {
                    if (j < i && tabela[i][j][0] != "X") {
                        //para cada letra do alfabeto pegar a transição equivalente do estado i e j;
                        for (let l = 0; l < this.alfabeto.length; l++) {
                            let estadoFI = "-1";
                            let estadoFJ = "-1";
                            let letra = this.alfabeto[l];
                            for (let k = 0; k < this.transicoes.length; k++) {
                                const transicao = this.transicoes[k];
                                if (letra == transicao[1]) {
                                    if (transicao[0] == this.estados[i]) {
                                        estadoFI = transicao[2];
                                    }
                                    if (transicao[0] == this.estados[j])
                                        estadoFJ = transicao[2];
                                }
                            }
                            // Estados finais diferentes, marcar na tabela
                            if (estadoFI != estadoFJ) {
                                if (estadoFI != "-1" && estadoFJ != "-1") {
                                    let iFI = this.indiceEstado(estadoFI);
                                    let iFJ = this.indiceEstado(estadoFJ);
                                    if (iFJ > iFI) {
                                        let aux = iFJ;
                                        iFJ = iFI;
                                        iFI = aux;
                                    }
                                    if (tabela[iFI][iFJ].length > 0 && tabela[iFI][iFJ][0] == "X") {
                                        let self = this;
                                        function removerLista(a: number, b: number) {
                                            let listToRemove = tabela[a][b];
                                            tabela[a][b] = ["X"];
                                            for (let n = 0; n < listToRemove.length; n++) {
                                                let pair = listToRemove[n].split(',');
                                                removerLista(self.indiceEstado(pair[0]), self.indiceEstado(pair[1]));
                                            }
                                        }
                                        removerLista(i, j);
                                    }
                                } else {
                                    tabela[i][j] = ["X"];
                                }
                            }
                        }
                    }
                }
            }

            //Unificar estados
            for (let i = 0; i < this.estados.length; i++) {
                for (let j = 0; j < this.estados.length; j++) {
                    if (j < i) {
                        if(tabela[i][j].length > 0)
                            continue;
                        let novoEstado = this.estados[i] + this.estados[j];

                        for (let k = 0; k < this.estadosFinais.length; k++) {
                            if (this.estadosFinais[k] == this.estados[i] || this.estadosFinais[k] == this.estados[j])
                                this.estadosFinais[k] = novoEstado;
                        }
                        for (let k = 0; k < this.transicoes.length; k++) {
                            if (this.transicoes[k][0] == this.estados[i] || this.transicoes[k][0] == this.estados[j])
                                this.transicoes[k][0] = novoEstado;
                            if (this.transicoes[k][2] == this.estados[i] || this.transicoes[k][2] == this.estados[j])
                                this.transicoes[k][2] = novoEstado;
                        }
                        for (let k = 0; k < this.estados.length; k++) {
                            if (this.estados[k] == this.estados[i] || this.estados[k] == this.estados[j])
                                this.estados[k] = novoEstado;
                        }
                    }

                }

            }

        }
        this.removerDuplicatas();
        this.minimized = true;
        return;
    }

    private removerDuplicatas(): void {
        this.estados = Array.from(new Set(this.estados));
        this.estadosFinais = Array.from(new Set(this.estadosFinais));
        let novasTransicoes: Array<string>[] = [];
        this.transicoes.sort();
        novasTransicoes.push(this.transicoes[0]);
        for (let i = 1; i < this.transicoes.length; i++) {
            const tPrev = this.transicoes[i-1];
            const t = this.transicoes[i];
            if(!(t[0] == tPrev[0] && t[1] == tPrev[1] && t[2] == tPrev[2]))
                novasTransicoes.push(t);
        }
        /*
        for (let i = 0; i < this.transicoes.length; i++) {
            const t = this.transicoes[i];
            let found = false;
            this.transicoes.forEach(v => {
                if(t[0] == v[0] && t[1] == v[1] && t[2] == v[2]) {
                    this.transicoes.splice(i, 1);
                    found = true;
                    return;
                }
            })
        }
        */
        this.transicoes = novasTransicoes;
    }

    public readPalavra(palavra: string): boolean {
        let i = 0
        let estadoFinal = false;
        let estadoAtual = this.estadoInicial;
        if(palavra.length == 0) {
            if(this.isInEstadoFinal(estadoAtual))
                return true;
        }
        for (; i < palavra.length; i++) {
            const letra = palavra[i];
            if (!this.isInAlfabeto(letra))
                break;
            let k = 0
            for (; k < this.transicoes.length; k++) {
                if (estadoAtual == this.transicoes[k][0] && letra == this.transicoes[k][1]) {
                    estadoAtual = this.transicoes[k][2];
                    if (this.isInEstadoFinal(estadoAtual))
                        estadoFinal = true;
                    else
                        estadoFinal = false;
                    break;
                }
            }
            if (k == this.transicoes.length) {
                break;
            }

        }
        return i == palavra.length && estadoFinal;
    }

    private indiceEstado(estado: string) {
        for (let i = 0; i < this.estados.length; i++) {
            if (estado == this.estados[i])
                return i;
        }
        return -1;
    }

    private isInEstadoFinal(estado: string): boolean {
        for (let i = 0; i < this.estadosFinais.length; i++) {
            const e = this.estadosFinais[i];
            if (e == estado)
                return true;
        }
        return false;
    }

    private buildAlfabeto(data: string) {
        this.alfabeto = data.split(',');
        this.isValidAlfabeto();
    }

    private buildEstadoInicial(data: string) {
        if (this.isValidEstado(data) && this.isInEstados(data)) {
            this.estadoInicial = data;
        } else {
            this.erros.estadoInicial = "O valor " + data + " não é um estado válido.";
        }
    }

    private buildEstados(data: string) {
        this.estados = data.split(',');
        this.estados.forEach(estado => {
            if (!this.isValidEstado(estado)) {
                this.erros.estados = "O estado " + estado + " não é válido!";
                return;
            }
        })
    }

    private buildEstadosFinais(data: string) {
        this.estadosFinais = data.split(',');
        this.estadosFinais.forEach(estado => {
            if (!this.isValidEstado(estado) || !this.isInEstados(estado)) {
                this.erros.estadosFinais = "O estado " + estado + " não é válido!";
                return;
            }
        });

    }

    private buildTransicoes(data: string) {
        let transicoes: Array<string> = data.split('/');
        transicoes.forEach(transicao => {
            let vTransicao = transicao.split(',');
            if (vTransicao.length != 3) {
                this.erros.transicoes = "A transição " + transicao + " não é válida!";
            } else {
                if (!this.isInEstados(vTransicao[0])
                    || !this.isInEstados(vTransicao[2])
                    || !this.isInAlfabeto(vTransicao[1])
                ) {
                    this.erros.transicoes = "A transição " + transicao + " não é válida!";
                } else {
                    this.transicoes.push(vTransicao);
                }
            }
        });

    }

    public isValidAlfabeto(): boolean {
        let hash: any = {};
        this.alfabeto.forEach(letra => {

            if(letra == "") {
                this.erros.alfabeto = "Não pode possuir um caractere vazio como caractere de um alfabeto.";
                return false;
            }

            if (hash[letra]) { //letra duplicada
                this.erros.alfabeto = "Letra " + letra + "duplicada.";
                return false;
            } else {
                hash[letra] = 1;
            }
            if (letra.length > 1) {
                this.erros.alfabeto = "A letra '" + letra + "' deve possuir apenas um caracter.";
                return false;
            }

            if(letra == "&") {
                this.erros.alfabeto = "A letra '&' não deve ser inserida no alfabeto (caractere reservado).";
                return false;
            }

            if(letra == "/") {
                this.erros.alfabeto = "A letra '/' não deve ser inserida no alfabeto (caractere reservado).";
                return false;
            }

            if(letra == ",") {
                this.erros.alfabeto = "A letra ',' não deve ser inserida no alfabeto (caractere reservado).";
                return false;
            }
        })
        return true;
    }

    public isInAlfabeto(data: string): boolean {
        for (let i = 0; i < this.alfabeto.length; i++) {
            if (this.alfabeto[i] == data) {
                return true;
            }
        }
        if (data == "&")
            return true;
        return false;
    }

    public isInEstados(data: string): boolean {
        for (let i = 0; i < this.estados.length; i++) {
            if (this.estados[i] == data) {
                return true;
            }
        }
        return false;
    }

    public isValidEstado(estado: string): boolean {
        if (estado.charCodeAt(0) >= 'A'.charCodeAt(0) && estado.charCodeAt(0) <= 'Z'.charCodeAt(0))
            return true;
        return false;
    }

    public isValidTransicao(): boolean {
        return false;
    }

    public isValidAutomato(): boolean {
        let found = true;
        Object.values(this.erros).forEach(erro => {
            if (erro.length > 0) {
                console.log(erro);
                found = false;
                return;
            }
        })
        return found;
    }

    public listErros(): string[] {
        let erros: string[] = [];
        Object.values(this.erros).forEach(erro => {
            erros.push(erro);
        })
        return erros;

    }

    public toAutomatoState(): IautomatoState {
        return {
            alfabeto: this.alfabeto,
            estados: this.estados,
            estadoInicial: this.estadoInicial,
            estadosFinais: this.estadosFinais,
            transicoes: this.transicoes,
            minimized: this.isMinimized()
        }
    }

    public static minify(d: IautomatoState): automatoMinified {
        let data: automatoMinified = {
            alfabeto: "",
            estados: "",
            estadoInicial: "",
            estadosFinais: "",
            transicoes: "",
            minimized: d.minimized
        };
        data.alfabeto = d.alfabeto.join(",");
        data.estados = d.estados.join(",");
        data.estadoInicial = d.estadoInicial;
        data.estadosFinais = d.estadosFinais.join(",");
        let ar: string[] = d.transicoes.map(a => {
            return a.join(',');
        });
        data.transicoes = ar.join("/");

        return data;
    }

    public save(): void {
        localStorage.setItem("af", JSON.stringify(AF.minify(this.toAutomatoState())));
    }

    public static load(): (AF | null) {
        let automatoSavedStr = localStorage.getItem("af");
        if (automatoSavedStr != null) {
            let automatoSaved: automatoMinified = JSON.parse(automatoSavedStr);
            return new AF(automatoSaved.alfabeto, automatoSaved.estados, automatoSaved.estadoInicial, automatoSaved.estadosFinais, automatoSaved.transicoes, automatoSaved.minimized)
        }
        return null
    }
}