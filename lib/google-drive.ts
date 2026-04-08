import { google } from 'googleapis';
import { Readable } from 'stream';

function getCredentials() {
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
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
}

export function getDrive() {
  return google.drive({ version: 'v3', auth: getAuth() });
}

export async function uploadFileToDrive(
  fileName: string,
  mimeType: string,
  buffer: Buffer
) {
  const drive = getDrive();
  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [process.env.GOOGLE_PASSPORT_FOLDER_ID!],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: 'id,name',
  });
  return res.data;
}
