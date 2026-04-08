import { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';
import { fetchSheetData, updateCell } from '@/lib/google-sheets';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session.name || !session.rowIndex) {
      return Response.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const { status, reason } = await request.json();

    if (!status || !['참석', '불참'].includes(status)) {
      return Response.json(
        { error: '참석 또는 불참을 선택해 주세요.' },
        { status: 400 }
      );
    }

    // Find the column letters for 참석여부 and 불참사유
    const rows = await fetchSheetData();
    const sheets = await import('@/lib/google-sheets').then(m => m.getSheets());
    const headerRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: '대상자!1:1',
    });
    const headers = headerRes.data.values?.[0] || [];
    const attendanceCol = getColumnLetter(headers.indexOf('참석여부'));
    const reasonCol = getColumnLetter(headers.indexOf('25년도 불참사유'));

    if (attendanceCol) {
      await updateCell(`대상자!${attendanceCol}${session.rowIndex}`, status);
    }

    if (status === '불참' && reason && reasonCol) {
      await updateCell(`대상자!${reasonCol}${session.rowIndex}`, reason);
    }

    // Update session
    session.attendanceStatus = status;
    await session.save();

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Attendance error:', error);
    return Response.json(
      { error: '저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

function getColumnLetter(index: number): string | null {
  if (index < 0) return null;
  let letter = '';
  let i = index;
  while (i >= 0) {
    letter = String.fromCharCode((i % 26) + 65) + letter;
    i = Math.floor(i / 26) - 1;
  }
  return letter;
}
