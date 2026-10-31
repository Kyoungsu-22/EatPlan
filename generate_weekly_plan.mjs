/**
 * GitHub Actions 클라우드 스케줄러에서 매주 자동 실행되는 스크립트입니다.
 * PC를 켜두지 않아도 GitHub 무료 클라우드에서 실행되어 weekly_plan_latest.json을 갱신합니다.
 */
import fs from 'node:fs';

const apiKey = process.env.GEMINI_API_KEY;
const now = new Date().toISOString();

async function main() {
  const summary = {
    generatedAt: now,
    account: 'k528ky@gmail.com',
    mode: apiKey ? 'gemini-api-cloud-cron' : 'built-in-smart-cluster-cron',
    rules: {
      totalMeals: 9,
      koreanMealsQuota: 4,
      homeCookedSharedGroups: 'Group A (3 meals) + Group B (3 meals)',
      mealKits: 'Group M (3 meals: 2 Weekday + 1 Weekend from Market Kurly & Coupang Eats)',
      minSwapCandidatesPerMeal: 5
    }
  };

  fs.writeFileSync('weekly_plan_latest.json', JSON.stringify(summary, null, 2), 'utf-8');
  console.log('Weekly meal plan metadata updated at', now);
}

main();
