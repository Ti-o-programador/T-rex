// variável global
var tamanho_xicara;

function setup()
{
    tamanho_xicara = 300;
    
    switch (tamanho_xicara) {
        case 200:
            enche_xicara(1);
            break;
        case 300:
            enche_xicara(2);
            break;
        case 500:
            enche_xicara(4);
            break;
    
        default:
            enche_xicara(0.5);
            break;
    }

}

function draw()
{

}

function enche_xicara(tempo)
{
    console.log(tempo);
}