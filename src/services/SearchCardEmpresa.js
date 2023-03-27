import dotenv from "dotenv";
dotenv.config();


export async function searchCardEmpresa(email) {
  
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
          "query": `{ findCards(pipeId: "${pipeId}", search: {fieldValue: "${email}", fieldId: "e_mail"}) {
            edges {
              node {
                id
                fields {
                  name
                  value
                }
              }
            }
          } }`,
        }),
      }
    );

    // Transformando resposta de string para JSON
    const dadosDosCards = await registrosCardEmpresas.json();
    
    // Apenas os dados dos Cards
    const Card = dadosDosCards.data.findCards.edges;
    
    if(Card.length == 0){
      return {
        id: null
      }
    } else {

      //const CardsInArray = [];
      //const company = [];
      // Filtrando objeto e transformando resultados em array
      /* Card[0].node.fields.map((dado) => {
        CardsInArray.push(dado.node);
      }); */
      /* // Validando se Existe Card com o nome da Empresa cadastrado
      CardsInArray.map((object) => {
        if (object.title === empresa) {
          return company.push(object);
        }
      }); */
      
      return {
        id: Card[0].node.id
      };
    }

  } catch (err) {
    console.log(err);
  }
}