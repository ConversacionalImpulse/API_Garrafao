import dotenv from 'dotenv';
dotenv.config();

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
    tampa,
    tampa_vedante,
    tampa_pet,
    mensagem
  } = req.body;



  const newCEP = cep.replace("-","")
  const tableId = "302927808";

  try {
    const result = await fetch("https://api.pipefy.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_PIPEFY,
      },
      body: JSON.stringify({
        "query": `mutation { createTableRecord (input: {table_id:${tableId}  fields_attributes: [
                        {field_id: "nome", field_value: "${name}"},
                        {field_id: "celular", field_value: "${celular}"},
                        {field_id: "telefone", field_value: "${phone}"}, 
                        {field_id: "e_mail", field_value: "${email}"},
                        {field_id: "empresa", field_value: "${empresa}"},
                        {field_id: "cnpj", field_value: "${cnpj}"},
                        {field_id: "cep", field_value: "${newCEP}"},
                        {field_id: "estado", field_value: "${estado}"},
                        {field_id: "cidade", field_value: "${cidade}"},
                        {field_id: "garraf_o_pp_20l", field_value: "${garrafao_20l_azul}"},
                        {field_id: "garraf_o_pet_20l", field_value: ""},
                        {field_id: "garraf_o_pp_10l", field_value: "${garrafao_10l}"},
                        {field_id: "tampa_20l", field_value: "${tampa}"},
                        {field_id: "tampa_pco_1881", field_value: " "},
                        {field_id: "garraf_o_gua_mineral_20l", field_value: " "},
                        {field_id: "garraf_o_gua_mineral_10l", field_value: " "},
                        {field_id: "tampa_garrafa_pet", field_value: " "},
                        {field_id: "stretch_com_tubete", field_value: " "},
                        {field_id: "stretch_sem_tubete", field_value: " "},
                        {field_id: "termo_encolhivel", field_value: " "},
                        {field_id: "tampa_20l_com_vedante", field_value: " "},
                        {field_id: "mensagem", field_value: "${mensagem}"},
                        ] 
                        }) 
                      { clientMutationId }}`,
      }),
    });

    const data = await result.json();
  
    res.status(200).json({ message: "Record criado com sucesso!", data });

  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
}
