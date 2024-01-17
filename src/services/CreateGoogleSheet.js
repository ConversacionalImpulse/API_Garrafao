import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export async function CreateGoogleSheet(gClickID, conversionName, conversionDate, conversionValue, currency) {
  /*const credentials = {
    id_planilha: process.env.GOOGLE_SHEET_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  };*/

  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

  const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqw/NdKSsqueNt\nigPTNR1yFe8Zh1vSNjv0Yt1DTlaIvw2FdslY+j6oSElFMQjE4ud8mMoKBUeU0lxq\nwA50aL3PQaRB+bUDyzK6+yug9IakFittgzgdfb9hzYyoH6UqDscUOV382MVnPJA4\nEiazTcldd55Hi1A5kmsj0slB5ohK7E7jSp18yVW7ZT8V5G0EqMOC2UdxAJlxVuOZ\noEMxEOuliYdSoOPz0+CP+rKYgwreKPST+1QkZgToUIGzIJ4GnW2RohDq49GU4BQt\nD3ccRFzlqyVk67IqWxGxsEWlG4uYL5uBMVo3OR72m0EMAUrsY1HAtdAyUXuXJ5Pb\nwGiWNhEzAgMBAAECggEADrMefGsCUcO9rZy/VouQdNUph2eNAmvzvkZSaKxSK6RS\nnCYNEBE+morab8/YQuaLacDXR4SL1GZFWVUeCWxIxpIOezVtHR39SHY9m7Xg7zgP\nVfaBOpysAFXK4WAT/ipWfcmwawcX+xqOCZ2aYj30cwzMfbki10ng2i0XcQpQui44\nBP8Fpu1/4sOXHhmK11TD3WXzaYh0tdcmg8+K/zrqaJWNK6YwC6GMU10WIC1egKdA\n7dAEem/OWSA3DEq3qWyrvDYkiMQj7HC6kJjDByJQ7akl7jdduJIIUd1z+VXLffh0\nAOSAjPujjN3Fw3jHt7dbpZFoYFoTp8dG9C/JHDfJ8QKBgQDwbXf3ncuNm8yAXops\nmREqthvCPAMyY4QTqfXj64AhoNbCsfLcRllKi4QiNbFeGSvTXtZwAEudthOCZpF/\nZtZTWyMvj/PLGE0CLF8XXa/gZFi7hdMD7KapUgdBB3NSK0keZnmqb4J0OpC6hiK3\n7RbeipXBI0WNway+sjYw1xwyUQKBgQC102m//QZSPfpy/pCpgSRT7mV+4KNcjuhT\n9xrZqqBY9YVshGSfSzVi8tCpmq36F7OF2l4q7ss0oCQTrGh1rOZK4tjJIKRCFkNL\nqdIVjl97ZPraQZk9Rn8dwRMNENZEpPeki3tKhRE9ay+ArkbMg5hCnWz/76WrXJiL\ncoUCLXcGQwKBgQCS4e3WwvomazZGfnuG2QSZ2WOgCFXTpOR9tunX8nn3EXHixCAg\n3oGSfyWcWL0hRbN2kIvlJOkNUr0cf1kIQmVRy231krZYL2Jsn3sApWXbarKi7aD6\n1ssCynBQFCMp4fPrtKNDspg6NcVRjr0LLLc6AeR3d/r4HYhRgEKHGAPL4QKBgHhO\naUM6BMu37JXX8BnntATA0XEw64ZbnEeqUZ7CMhSKZ3zU4MsxdSKCbSQ7j2/R7Nvd\nD7+yfsvUReqqgfeSrlHQZQY3TdfYaTCQLcxLhsvblcuB6gXMNmGWladog42p5Z1/\nGNXG1BBicmzfY0MAs2coSK3TgDexLdHetTkqof2HAoGAOm98TBmp9u7Idt2LWPlx\nzVXZu4xKfSoSpmxrPjYVp7xrDVRKbBl7vytRe19v0EEijVnuYQLQYIsxW95ReT5f\nRDAb4oaLGTJzAjERqmRO2COg8gEi9js0YhWwPWkRzRi8xZBp3ouKQzrYC+QVaxvl\nKe2J9GCijfkeHvsxGWWTsLs=\n-----END PRIVATE KEY-----\n"

  const auth = new google.auth.JWT({
    email: "api-google-ads@fourth-truck-411419.iam.gserviceaccount.com",
    key: private_key.split(String.raw`\n`).join('\n'),
    scopes,
  });

   /*email: credentials.client_email,
    key: credentials.private_key,
    scopes,*/

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = "1Nio1aDCp_xbzoDIqPkpAbq1y-9aEa8-mzfp3YkUYTjU"
  
  //credentials.id_planilha;

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

    //console.log("Retorno: ", sheets)

    console.log('Nova linha adicionada com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar nova linha: ', error.message);
  }
}
