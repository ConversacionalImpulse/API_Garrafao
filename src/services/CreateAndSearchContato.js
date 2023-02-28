import dotenv from "dotenv";
import { searchRecordContato } from "../services/SearchTableRecordContato.js";
import { createRecordContato } from "../services/CreateRecordContato.js";
dotenv.config();

export async function createAndSearchContato(name, celular, phone, email, maxWaitTime) {
    const startTime = Date.now();
    
    let contact = await searchRecordContato(email);
  
    if (contact.length === 0) {
      await createRecordContato(name, celular, phone, email);
  
      while (contact.length === 0 && Date.now() - startTime < maxWaitTime) {
        
        await new Promise((resolve) => {
          setTimeout(resolve, 1000)
        }); // espera 1 segundo
  
        contact = await searchRecordContato(email);
      }
    }
  
    return contact;
}