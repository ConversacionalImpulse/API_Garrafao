import dotenv from "dotenv";
dotenv.config();

export async function searchRecordContato(email) {
    try {
      const tableId = "302927807"
      //Buscando dados do Card Empresas
      const registroContato = await fetch(
        "https://api.pipefy.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.AUTH_PIPEFY,
          },
          body: JSON.stringify({
            "query": `{ table_records (table_id: ${tableId} search: {title:"${email}"}){ edges { node { id title record_fields { name value }}}}}`
          }),
        }
      );
  
      // Transformando resposta de string para JSON
      const dadosDoContato = await registroContato.json();

      return dadosDoContato.data.table_records.edges
      
    } catch (err) {
      console.log(err);
    }
}
