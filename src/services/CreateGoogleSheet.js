import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export async function CreateGoogleSheet(gClickID, conversionName, conversionDate, conversionValue, currency) {
  const credentials = {
    id_planilha: process.env.GOOGLE_SHEET_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  };

  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes,
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = credentials.id_planilha;

  try {
    // Obtém os valores atuais na planilha para determinar a próxima linha vazia
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A:E', 
    });

    const numRows = response.data.values ? response.data.values.length : 0;
    const nextRow = numRows + 1;

    // Constrói os dados a serem inseridos na nova linha
    const rowData = [
      gClickID,
      conversionName,
      conversionDate,
      conversionValue,
      currency,
    ];

    // Insere os dados na próxima linha vazia
    const data = sheets.spreadsheets.values.update({
        spreadsheetId,
      range: `A${nextRow}`,
      valueInputOption: 'RAW',
      resource: {
        values: [rowData],
      },
    });

    console.log('Nova linha adicionada com sucesso!', data);
  } catch (error) {
    console.error('Erro ao adicionar nova linha:', error.message);
  }
}
