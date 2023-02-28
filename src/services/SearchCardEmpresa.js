import dotenv from "dotenv";
dotenv.config();


export async function searchCardEmpresa(empresa) {
  
  const phaseId = 318137351;
  const pipeId = 302927698;
  try {
    //Buscando dados do Card Empresas
    const registrosCardEmpresas = await fetch(
      "https://api.pipefy.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': process.env.AUTH_PIPEFY,
        },
        body: JSON.stringify({
          "query": `{ allCards(pipeId: ${pipeId}, first: 100) { edges { node { id title  } } } }`,
        }),
      }
    );

    // Transformando resposta de string para JSON
    const dadosDosCards = await registrosCardEmpresas.json();
    
    // Apenas os dados dos Cards
    const Cards = dadosDosCards.data.allCards.edges;

    const CardsInArray = [];
    const company = [];

    // Filtrando objeto e transformando resultados em array
    Cards.map((dado) => {
      CardsInArray.push(dado.node);
    });

    // Validando se Existe Card com o nome da Empresa cadastrado
    CardsInArray.map((object) => {
      if (object.title === empresa) {
        return company.push(object);
      }
    });
    
    return company;

  } catch (err) {
    console.log(err);
  }
}