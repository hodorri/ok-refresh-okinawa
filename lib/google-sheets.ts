import { google } from 'googleapis';

function getCredentials() {
  // base64 인코딩된 서비스 계정 JSON이 있으면 우선 사용
  if (process.env.GOOGLE_SERVICE_ACCOUNT_BASE64) {
    const json = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString();
    const sa = JSON.parse(json);
    return { client_email: sa.client_email, private_key: sa.private_key };
  }
  return {
    client_email: process.env.GOOGLE_CLIENT_EMAIL || '',
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: getCredentials(),
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
