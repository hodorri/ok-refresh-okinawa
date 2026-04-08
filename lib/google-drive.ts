import { google } from 'googleapis';
import { Readable } from 'stream';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
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
