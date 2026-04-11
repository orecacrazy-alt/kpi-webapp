import { google } from 'googleapis';

export async function getSheetsClient() {
  const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const SA_KEY = process.env.GOOGLE_PRIVATE_KEY;

  if (!SA_EMAIL || !SA_KEY) {
    throw new Error('Missing Google Credentials in .env.local');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: SA_EMAIL,
      // Xử lý private key xuống dòng chuẩn để tránh lỗi Parse
      private_key: SA_KEY.replace(/\\n/g, '\n'),
    },
    // Chú ý: Dùng phân quyền Mở Rộng ('spreadsheets') thay vì ('spreadsheets.readonly') để Web có thể GHI dữ liệu
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}
