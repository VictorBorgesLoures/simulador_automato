interface IturingState {
    alfabeto: Array<string>,
    estados: Array<string>,
    estadoInicial: string,
    estadosFinais: Array<string>,
    transicoes: object
}

export type { IturingState as IturingState };

export default class MT {

    private alfabeto: Array<string> = [];
    private estados: Array<string> = [];
    private estadoInicial: string = "";
    private estadosFinais: Array<string> = [];
    private transicoes: object = {};
    public erros = {
        alfabeto: "",
        estados: "",
        estadoInicial: "",
        estadosFinais: "",
        transicoes: "",
    }

    constructor(data: IturingState) {
        this.buildAlfabeto(data.alfabeto);
        this.buildEstados(data.estados);
        this.buildEstadoInicial(data.estadoInicial);
        this.buildEstadosFinais(data.estadosFinais);
        this.buildTransicoes(data.transicoes);
    }

    private buildAlfabeto(alfabeto: string[]) {
        this.alfabeto = alfabeto;
        this.isValidAlfabeto();
    }

    private buildEstados(estados: string[]) {
        this.estados = estados;
        this.estados.forEach(estado => {
            if (!this.isValidEstado(estado)) {
                this.erros.estados = "O estado " + estado + " não é válido!";
                return;
            }
        })
    }

    public isValidEstado(estado: string): boolean {
        if (estado.charCodeAt(0) >= 'A'.charCodeAt(0) && estado.charCodeAt(0) <= 'Z'.charCodeAt(0))
            return true;
        return false;
    }

    private buildEstadoInicial(data: string) {
        if (this.isValidEstado(data) && this.isInEstados(data)) {
            this.estadoInicial = data;
        } else {
            this.erros.estadoInicial = "O valor " + data + " não é um estado válido.";
        }
    }

    private buildEstadosFinais(data: string[]) {
        this.estadosFinais = data;
        this.estadosFinais.forEach(estado => {
            if (!this.isValidEstado(estado) || !this.isInEstados(estado)) {
                this.erros.estadosFinais = "O estado " + estado + " não é válido!";
                return;
            }
        });
    }

    private buildTransicoes(data: object) {
        this.transicoes = data;
        Object.keys(this.transicoes).forEach(estado => {
            let transicao: Array<Array<string>> = (this.transicoes as any)[estado];
            transicao.forEach(t => {
                if (t.length != 4)
                    this.erros.transicoes = "Em cada uma das transições é necessário ter 4 elementos";
                else if (!this.isInAlfabeto(t[0]))
                    this.erros.transicoes = `${t[0]} não está no alfabeto!`;
                else if (!this.isInAlfabeto(t[1]))
                    this.erros.transicoes = `${t[1]} não está no alfabeto!`;
                else if (!this.isInEstados(t[2]))
                    this.erros.transicoes = `${t[2]} não está nos estados!`;
                else if (t[3] != 'R' && t[3] != 'L') {
                    this.erros.transicoes = `${t[3]} não é R ou L`;
                }
            })
        })
    }

    public getAlfabeto(): string[] {
        return this.alfabeto;
    }

    public readPalavra(entrada: string): boolean {
        let currentState = this.estadoInicial;
        let index = 0;
        let reading = true;
        while (reading) {
            if (index < 0) {
                entrada = "?" + entrada;
                index = 0;
            } else if (index >= entrada.length) {
                entrada = entrada + "?";
                index = entrada.length - 1;
            }
            console.log(entrada);

            let transicoes: Array<Array<string>> = (this.transicoes as any)[currentState]
            if(transicoes == null) {
                reading = false;
                continue;
            }
            console.log(currentState);
            console.log(entrada[index]);
            let found = false;
            transicoes.forEach(t => {
                if (found)
                    return;
                
                if (t[0] == entrada[index]) {
                    console.log(t);
                    found = true;

                    currentState = t[2];
                    
                    entrada = entrada.substring(0, index) + t[1] + entrada.substring(index + 1);

                    if (t[3] == "L")
                        index--;
                    else if (t[3] == "R")
                        index++;
                }
            })


            if (!found)
                reading = false;
        }
        console.log(currentState);
        return this.isInEstadoFinal(currentState);
    }

    private isInEstadoFinal(estado: string): boolean {
        for (let i = 0; i < this.estadosFinais.length; i++) {
            const e = this.estadosFinais[i];
            if (e == estado)
                return true;
        }
        return false;
    }

    public isValidAlfabeto(): boolean {
        let hash: any = {};
        this.alfabeto.forEach(letra => {

            if (letra == "") {
                this.erros.alfabeto = "Não pode possuir um caractere vazio como caractere de um alfabeto.";
                return false;
            }

            if (letra == "?") {
                this.erros.alfabeto = "O caractere '?' é reservado como BRANCO no sistema.";
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

            if (letra == "&") {
                this.erros.alfabeto = "A letra '&' não deve ser inserida no alfabeto (caractere reservado).";
                return false;
            }

            if (letra == "/") {
                this.erros.alfabeto = "A letra '/' não deve ser inserida no alfabeto (caractere reservado).";
                return false;
            }

            if (letra == ",") {
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
        if (data == "?")
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

    public isValidMaquinaTuring(): boolean {
        let found = true;
        Object.values(this.erros).forEach(erro => {
            if (erro.length > 0) {
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

    private getAttributes(): IturingState {
        return ({
            alfabeto: this.alfabeto,
            estados: this.estados,
            estadoInicial: this.estadoInicial,
            estadosFinais: this.estadosFinais,
            transicoes: this.transicoes
        })
    }

    public save(): void {
        localStorage.setItem("mt", JSON.stringify(this.getAttributes()));
    }

    public static load(): (MT | null) {
        let maquinaSavedStr = localStorage.getItem("mt");
        if (maquinaSavedStr != null) {
            let maquinaSaved: IturingState = JSON.parse(maquinaSavedStr);
            return new MT(maquinaSaved)
        }
        return null
    }
}