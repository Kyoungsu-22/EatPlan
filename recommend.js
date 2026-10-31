/**
 * Vercel Serverless Function (/api/recommend)
 * 상시 켜두는 유료 클라우드 서버나 Redis 없이, 요청 시에만 무료 티어로 실행됩니다.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || req.body?.apiKey;
  if (!apiKey) {
    return res.status(400).json({
      error: 'GEMINI_API_KEY 환경 변수가 설정되지 않았습니다. 내장 스마트 엔진을 기본 사용합니다.'
    });
  }

  const { leftovers = [], dislikes = {}, servings = 2 } = req.body || {};

  const prompt = `당신은 한국의 주간 9끼 식단 추천 에이전트입니다.
조건:
1. 평일(월~금) 저녁 5끼 + 주말(토·일) 점심/저녁 4끼 = 총 9끼
2. 전체 9끼 중 정확히 4끼는 '한식'으로 구성
3. 6끼는 직접 요리(3끼씩 신선 식재료를 공유하는 그룹 A 3끼, 그룹 B 3끼), 나머지 3끼(평일 2끼, 주말 1끼)는 마켓컬리·쿠팡이츠에서 구매 가능한 인기 밀키트로 구성
4. 각 메뉴 교체 시 사용할 수 있도록 그룹별 대체 후보를 최소 4개 이상 포함
5. 냉장고 남은 재료: ${leftovers.length ? leftovers.join(', ') : '없음'}
6. 제외 조건: ${JSON.stringify(dislikes)}, 기준 인원: ${servings}인분
JSON 형식으로 응답하세요.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
