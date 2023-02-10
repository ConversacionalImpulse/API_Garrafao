import dotenv from 'dotenv';
dotenv.config();

import { createRecordTable } from '../services/service_TableCreate.js'

export async function createData(req, res) {
  const {
    name,
    email,
    empresa,
    cnpj,
    estado,
    cidade,
    cep,
    phone,
    celular,
    tipo,
    marca,
    garrafao_20l_azul,
    garrafao_20l_rosa,
    garrafao_20l_verde,
    garrafao_10l,
    garrafao_pp_20l,
    tampa,
    tampa_vedante,
    tampa_pet,
    mensagem
  } = req.body;

  const phaseId = 318137351;
  
  try {
    //Registra Formulário na Tabela
    createRecordTable(name,
      email,
      empresa,
      cnpj,
      estado,
      cidade,
      cep,
      phone,
      celular,
      tipo,
      marca,
      garrafao_20l_azul,
      garrafao_20l_rosa,
      garrafao_20l_verde,
      garrafao_10l,
      tampa,
      tampa_vedante,
      tampa_pet,
      mensagem);

    //Buscando dados do Card Empresas
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
    console.log(newArray)

    const match = []

    newArray.map((object) => {
        if(object.title == empresa){
            return match.push(object)
        }
    })

    console.log(match)
  
    //Validação da Empresa 
    if(match.length > 0) {
      //Se existe a empresa cadastrada no card match > 0
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
                          {field_id: "quantidade_garraf_o_pp_20l", field_value: "${garrafao_20l_azul}"},
                          {field_id: "quantidade_garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                          {field_id: "quantidade_tampa_20l", field_value: "${tampa}"}]
                          }) 
                          { card {id title }}}`
                  })
              });
        const data = await novoCard.json();
        res.status(200).json({ message: "Sucess"});

  } else {
    //Criar card em Pipe Empresas
    console.log("aqui")
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
