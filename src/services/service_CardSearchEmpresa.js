import dotenv from 'dotenv';
dotenv.config();

const phaseId = 318137351;
const pipeIdOportunidade = "302927684";
const phaseIdOportunidade = "318137273";
const dataAtual = new Date()

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
    
    // Cria nova Oportunidade Vinculando o Card Empresa Existente
        if(match.length > 0) {
          
          const novoCardOportunidade = await fetch('https://api.pipefy.com/graphql',{
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json',
                      'Authorization': process.env.AUTH_PIPEFY
                      },
                      body: JSON.stringify({
                          "query": `mutation{ createCard (input: {pipe_id:${pipeIdOportunidade}  phase_id:${phaseIdOportunidade}  fields_attributes: [
                              {field_id: "oportunidade", field_value: "${match[0].title} - ${formataData(dataAtual)}"},
                              {field_id: "origem", field_value: "Formulário Garrafão Brasil"}, 
                              {field_id: "empresa", field_value: "${match[0].id}"},
                              {field_id: "mensagem", field_value: "${mensagem}"},
                              {field_id: "quantidade_garraf_o_pp_20l", field_value: "${garrafao_20l_azul}"},
                              {field_id: "quantidade_garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                              {field_id: "quantidade_tampa_20l", field_value: "${tampa}"}]
                              }) 
                              { card {id title }}}`
                      })
                  });
            const dadosOportunidade = await novoCardOportunidade.json();
            return res.status(200).json({ message: "Sucess"});
    
      } else {
        //Criar card em Pipe Empresas
    
        const pipeIdEmpresa = "302927698";
        const phaseIdEmpresa = "318137351";
    
        const novoCardEmpresa = await fetch('https://api.pipefy.com/graphql',{
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json',
                      'Authorization': process.env.AUTH_PIPEFY
                      },
                      body: JSON.stringify({
                          "query": `mutation{ createCard (input: {pipe_id:${pipeIdEmpresa}  phase_id:${phaseIdEmpresa}  fields_attributes: [
                              {field_id: "empresa", field_value: "${empresa}"},
                              {field_id: "cnpj", field_value: "${cnpj}"}, 
                              {field_id: "cep", field_value: "${newCEP}"},
                              {field_id: "cidade", field_value: "${cidade}"},
                              {field_id: "tipo_de_empresa", field_value: "outros"},
                              {field_id: "observa_es", field_value: "Site Garrafão Brasil"},
                            ]
                              }) 
                              { card {id title }}}`
                      })
          });
    
          const dataEmpresa = await novoCardEmpresa.json();
    
          const pipeIdOportunidade = "302927684"
          const phaseIdOportunidade = "318137273"
          const dataAtual = new Date()
      
          function zeroAEsquerda(num) {
              return num>= 10? num: `0${num}`;
          }
      
          function formataData (data){
              const dia = zeroAEsquerda(data.getDate());
              const mes = zeroAEsquerda(data.getMonth()+1);
              const ano = zeroAEsquerda(data.getFullYear());
              return `${dia}/${mes}/${ano}`
          }
    
          //##################################################################################
          //Buscando dados do Card Empresa
        const buscaRegistroCardEmpresa = await fetch("https://api.pipefy.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.AUTH_PIPEFY,
          },
          body: JSON.stringify({
            "query": ` { phase (id:${phaseId}){cards { edges { node { age id title}}}}}`,
          }),
        });
    
        const dataCardEmpresa = await buscaRegistroCardEmpresa.json();
    
        const dadosCardFiltradosEmpresa = dataCardEmpresa.data.phase.cards.edges
        
    
        const newArrayEmpresa = []
    
        dadosCardFiltradosEmpresa.map((dado) =>{
          newArrayEmpresa.push(dado.node)
        })
        console.log(newArrayEmpresa, empresa)
        const matchEmpresa = []
    
        newArrayEmpresa.map((object) => {
            if(object.title == empresa){
                return matchEmpresa.push(object)
            }
        })
        console.log(matchEmpresa)
      
          const novoCardOportunidade = await fetch('https://api.pipefy.com/graphql',{
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json',
                      'Authorization': process.env.AUTH_PIPEFY
                      },
                      body: JSON.stringify({
                          "query": `mutation{ createCard (input: {pipe_id:${pipeIdOportunidade}  phase_id:${phaseIdOportunidade}  fields_attributes: [
                              {field_id: "oportunidade", field_value: "${matchEmpresa[0].title} - ${formataData(dataAtual)}"},
                              {field_id: "origem", field_value: "Formulário Garrafão Brasil"}, 
                              {field_id: "empresa", field_value: "${matchEmpresa[0].id}"},
                              {field_id: "mensagem", field_value: "${mensagem}"},
                              {field_id: "quantidade_garraf_o_pp_20l", field_value: "${garrafao_20l_azul}"},
                              {field_id: "quantidade_garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                              {field_id: "quantidade_tampa_20l", field_value: "${tampa}"}]
                              }) 
                              { card {id title }}}`
                      })
                  });
            const dataFinal = await novoCardOportunidade.json();
                  console.log(dataFinal)
            res.status(200).json({ message: "Sucess"});
    
      }
    
      } catch (err) {
        console.log(err)
        res.status(500).end();
      }
}