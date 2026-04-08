import { NextRequest } from 'next/server';
import { fetchSheetData } from '@/lib/google-sheets';
import { getSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { name, employeeId } = await request.json();

    if (!name || !employeeId) {
      return Response.json(
        { error: '이름과 사번을 입력해 주세요.' },
        { status: 400 }
      );
    }

    const rows = await fetchSheetData();
    const user = rows.find(
      (row) => row['이름'] === name && row['고유사번'] === employeeId
    );

    if (!user) {
      return Response.json(
        { error: '대상자를 찾을 수 없습니다. 이름과 사번을 다시 확인해 주세요.' },
        { status: 401 }
      );
    }

    const session = await getSession();
    session.name = name;
    session.employeeId = employeeId;
    session.rowIndex = parseInt(user._rowIndex, 10);
    session.department = user['소속 부서'] || '';
    session.team = user['소속 팀'] || '';
    session.title = user['호칭'] || '';
    session.attendanceStatus = user['참석여부'] || '';
    session.passportStatus = user['여권제출여부'] || '';
    await session.save();

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Auth error:', error);
    return Response.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
