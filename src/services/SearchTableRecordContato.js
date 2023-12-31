import dotenv from "dotenv";
dotenv.config();

export async function searchRecordContato(idRegistro) {
    try {
      const tableId = "302927808"
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
            "query": `{ table_records (table_id: "${tableId}", search:{title: "${idRegistro}"}){ edges { node { id title record_fields { name value }}}}}`
          }),
        }
      );
  
      // Transformando resposta de string para JSON
      const dadosDoContato = await registroContato.json();
      return
    } catch (err) {
      console.log(err);
    }
}