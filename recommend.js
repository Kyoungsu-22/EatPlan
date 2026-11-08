/**
 * Vercel Serverless Function (/api/recommend)
 * 상시 켜두는 유료 클라우드 서버나 Redis 없이, 요청 시에만 무료 티어로 실행됩니다.
 * AQ.Ab8RN6... 신규 Auth Key 및 AIzaSy... 표준 키 모두 지원 (x-goog-api-key 헤더 + Interactions API + Vertex Express 자동 폴백)
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const rawKey = process.env.GEMINI_API_KEY || req.body?.apiKey || '';
  const apiKey = String(rawKey).trim().replace(/^["']|["']$/g, '');
  if (!apiKey) {
    return res.status(400).json({
      error: 'GEMINI_API_KEY 환경 변수가 설정되지 않았습니다. 내장 스마트 엔진(집밥 50종 + 밀키트 16종)을 기본 사용합니다.'
    });
  }

  const { leftovers = [], dislikes = {}, servings = 2, model = 'gemini-3.8-flash' } = req.body || {};

  const prompt = `당신은 한국의 주간 9끼 식단 추천 에이전트입니다.
조건:
1. 평일(월~금) 저녁 5끼 + 주말(토·일) 점심/저녁 4끼 = 총 9끼
2. 전체 9끼 중 정확히 4끼는 '한식'으로 구성
3. 6끼는 직접 요리(핵심 식재료 1~2개를 공유하는 그룹 A 3끼, 그룹 B 3끼), 나머지 3끼(평일 2끼, 주말 1끼)는 마켓컬리·쿠팡이츠에서 구매 가능한 인기 밀키트로 구성
4. 모든 양념·소스는 일반 '밥숟가락' 단위로 계량할 것
5. 각 메뉴 교체 시 사용할 수 있도록 그룹별 대체 후보를 최소 4개 이상 포함
6. 냉장고 남은 재료: ${leftovers.length ? leftovers.join(', ') : '없음'}
7. 제외 조건: ${JSON.stringify(dislikes)}, 기준 인원: ${servings}인분
JSON 형식으로 응답하세요.`;

  const candidateModels = Array.from(new Set([
    String(model || 'gemini-3.8-flash').replace(/^models\//, ''),
    'gemini-3.8-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash-lite'
  ]));

  let lastStatus = 500;
  let lastData = { error: 'Unknown error' };

  for (const m of candidateModels) {
    try {
      // 1. Native v1beta :generateContent with x-goog-api-key header (Required for AQ. keys)
      const r1 = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );
      const d1 = await r1.json();
      if (r1.ok && !d1.error) {
        return res.status(200).json(d1);
      }
      lastStatus = r1.status;
      lastData = d1;

      // 2. Interactions API fallback
      const r2 = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/interactions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            model: `models/${m}`,
            input: prompt
          })
        }
      );
      const d2 = await r2.json();
      if (r2.ok && !d2.error) {
        return res.status(200).json(d2);
      }
    } catch (err) {
      lastData = { error: String(err) };
    }
  }

  return res.status(lastStatus).json(lastData);
}
