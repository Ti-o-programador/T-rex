
/**
 * Tipos de variáveis
 * string = 'texto' / "texto"
 * numerico = 10 / 10.5
 * array = ["Tiago", "Andressa"] (vetor)
 * objeto = {}
 */

var aluno;
var aluno2;

function setup()
{
    aluno = {
        nome: "Tiago",
        idade: 13,
        media: 10
    }

    aluno2 = {
        nome: "Andressa",
        idade: 31,
        media: 10
    }



    console.log(aluno.nome);
    console.log(aluno.idade);
    
    console.log(aluno2.nome);


}