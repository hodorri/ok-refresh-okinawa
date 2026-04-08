import { google } from 'googleapis';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

export interface SheetRow {
  [key: string]: string;
  _rowIndex: string;
}

export async function fetchSheetData(): Promise<SheetRow[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: '대상자',
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  return rows.slice(1).map((row, i) => {
    const obj: SheetRow = { _rowIndex: String(i + 2) };
    headers.forEach((header: string, j: number) => {
      obj[header] = row[j] || '';
    });
    return obj;
  });
}

export async function updateCell(range: string, value: string) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range,
    valueInputOption: 'RAW',
    requestBody: { values: [[value]] },
  });
}
