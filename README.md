# Simulador de Autômatos
Esta aplicação é o resultado de um trabalho da matéria da faculdade (CEFET-MG, curso de Engenharia de Computação): Linguagens Formais e Autômatos.

É possível inserir um Autômato Finito Determinístico, Finito Não Determinístico e Finito Não Determinístico Lambda.

Esse simulador possui as seguintes funções:
  - Inserir um autômato: através de um formulário ou de um arquivo .json.
  - Salvar o estado do autômato a qualquer momento (utiliza o Local Storage do navegador).
  - Realizar as transformações:
    - AFN-& para AFN
    - AFN para AFD
  - Se AFD:
    - É possível realizar a leitura de palavras.
    - É possível minimizar o autômato.

Algumas observações:
 - O caractere '&' representa o Lambda.
 - Os carateres ',' e '/' não podem ser usados como letras de alfabeto.
 - Qualquer estado deve começar com letras maiúsculas de A-Z. 

