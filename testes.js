import dotenv from 'dotenv';
dotenv.config();

//Verifica  as empresas cadastradas
const phaseId = 318137351;
const empresa = "Impulse Teste";

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
                          {field_id: "empresa", field_value: "${empresa}"}]
                          }) 
                          { card {id title }}}`
                  })
      });

      const dataEmpresa = await novoCardEmpresa.json();

/*
const registroCardEmpresa = await fetch("https://api.pipefy.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_PIPEFY,
      },
      body: JSON.stringify({
        "query": ` { phase (id:${phaseId}){cards { edges { node { age id title}}}}}`,
      }),
});

const dataCard = await registroCardEmpresa.json();

const dadosCardFiltrados = dataCard.data.phase.cards.edges

const newArray = []

dadosCardFiltrados.map((dado) =>{
    newArray.push(dado.node)
})

const match = []

newArray.map((object) => {
    if(object.title == empresa){
        return match.push(object)
    }
})

//Verifica se a empresa já está cadastrada
if(match.length > 0) {
    // Criar Card em Oportunidades
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

    const novoCard = await fetch('https://api.pipefy.com/graphql',{
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
                        {field_id: "quantidade_garraf_o_pp_20l", field_value: "${match[0].id}"},
                        {field_id: "quantidade_garraf_o_pp_10l", field_value: "${match[0].id}"},
                        {field_id: "quantidade_tampa_20l", field_value: "${match[0].id}"},
                        {field_id: "quantidade_tampa_20l", field_value: "${match[0].id}"},
                    ]
                        }) 
                        { card {id title }}}`
                })
            });
            const data = await novoCard.json();
            console.log(data)
} else {

    console.log("Card Não Encontrado")
}

//const ContemEmpresa = (Impulse) => newArray.includes(Impulse)
//console.log(newArray, ContemEmpresa())

*/