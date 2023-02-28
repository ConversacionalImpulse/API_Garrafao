import dotenv from "dotenv";
dotenv.config();

export async function createRecordContato(nome, celular, phone, email) {
  try {
    //Buscando dados do Card Empresas
    const registroContato = await fetch("https://api.pipefy.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_PIPEFY,
      },
      body: JSON.stringify({
        query: `mutation { createTableRecord (input: {
                    table_id: "302927807"
                    fields_attributes: [
                        {field_id: "nome_do_respons_vel", field_value: "${nome}"},
                        {field_id: "celular", field_value: "${celular}"},
                        {field_id: "telefone", field_value: "${phone}"},
                        {field_id: "e_mail", field_value: "${email}"}
                    ]
                }) { 
                    clientMutationId
                }}`,
      }),
    });

    // Transformando resposta de string para JSON
    const dadosDoContato = await registroContato.json();
    
    return 
  } catch (err) {
    console.log(err);
  }
}
