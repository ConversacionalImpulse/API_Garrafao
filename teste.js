/* import dotenv from 'dotenv';
dotenv.config();

const phaseId = 318137351;

function zeroAEsquerda(num) {
    return num>= 10? num: `0${num}`;
}

function formataData (data){
    const dia = zeroAEsquerda(data.getDate());
    const mes = zeroAEsquerda(data.getMonth()+1);
    const ano = zeroAEsquerda(data.getFullYear());
    return `${dia}/${mes}/${ano}`
}

export async function cardSearchEmpresa (empresa) {
    try {
    //Buscando dados do Card Empresas
        const registrosCardEmpresas = await fetch("https://api.pipefy.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.AUTH_PIPEFY,
          },
          body: JSON.stringify({
            "query": ` { phase (id:${phaseId}){cards { edges { node { age id title}}}}}`,
          }),
        });

    // Transformando resposta de string para JSON
    const dadosDosCards = await registrosCardEmpresas.json();

    // Apenas os dados dos Cards
        const Cards = dadosDosCards.data.phase.cards.edges

        const CardsInArray = []
        const match = []
    
    // Filtrando objeto e transformando resultados em array
        Cards.map((dado) =>{
            CardsInArray.push(dado.node)
        })
    
    // Validando se Existe Card com o nome da Empresa cadastrado
        CardsInArray.map((object) => {
            if(object.title == empresa){
                return match.push(object)
            }
        })
    
    return match

    } catch (err){
        console.log(err)
    }
} */