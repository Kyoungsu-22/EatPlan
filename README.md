# 🥗 잇플랜 (EatPlan) - 주간 9끼 서버리스 식단 에이전트

유료 클라우드 서버나 Redis 없이 **서버 유지비 0원**으로 작동하는 개인 맞춤 식단 웹 앱입니다.
`k528ky@gmail.com` GitHub 계정에 바로 올려 **GitHub Pages** 또는 **Vercel**로 무료 호스팅할 수 있도록 구성되어 있습니다.

## ✅ 반영된 핵심 기능
1. **주간 9끼 구성**: 월~금 저녁(5끼) + 토·일 점심/저녁(4끼)
2. **한식 4끼 우선 배정 (기준 A)**: 집밥 요리(6끼)와 밀키트(3끼)를 합쳐 전체 9끼 중 한식 4끼 자동 맞춤
3. **2×3 재료 공유 + 인기 밀키트 3끼 (방식 A)**:
   - 직접 요리 6끼: 그룹 A(3끼) + 그룹 B(3끼)가 신선 식재료를 100% 공유해 버리는 재료 방지
   - 밀키트 3끼(평일 2끼 + 주말 1끼): **마켓컬리** & **쿠팡이츠 마트(로켓프레시)** 베스트셀러 밀키트 추천 및 구매 링크 연동
4. **교체 후보 최소 5~8개 보장**: 어떤 요리를 눌러도 같은 재료 공유 그룹 후보 5개 + 자유 조합 3개(밀키트는 컬리·쿠팡이츠 인기 후보 7개)가 즉시 제시됨
5. **유튜브 레시피 & 최종 요리 사진 공유**: 모든 메뉴에 실제 유튜브 조리 영상 링크 및 완성 요리 사진 탑재

---

## 🚀 GitHub (`k528ky@gmail.com`) 무료 배포 방법 (3분 완성)

### 방법 1: GitHub 웹페이지에서 마우스 드래그 앤 드롭으로 올리기 (가장 쉬움)
1. [GitHub](https://github.com/)에 `k528ky@gmail.com` 계정으로 로그인합니다.
2. 우측 상단 **+** 버튼 → **New repository**를 누르고 저장소 이름을 `eatplan`으로 입력한 뒤 **Create repository**를 클릭합니다.
3. 생성된 화면에서 **uploading an existing file** 링크를 누르고, 이 압축파일(`eatplan_serverless_app.zip`) 안의 모든 파일을 드래그해서 넣은 뒤 **Commit changes**를 누릅니다.
4. 저장소 상단 메뉴의 **Settings** → 좌측 **Pages**로 이동해 **Branch**를 `main`으로 선택하고 **Save**를 누릅니다.
5. 1분 뒤 `https://<본인GitHub아이디>.github.io/eatplan/` 주소가 생성됩니다! 스마트폰 브라우저로 접속해 **'홈 화면에 추가'**를 누르면 일반 앱처럼 언제든 쓸 수 있습니다.

### 방법 2: 터미널(Git) 명령어로 올리기
```bash
git init
git config user.email "k528ky@gmail.com"
git config user.name "k528ky"
git add .
git commit -m "feat: initial EatPlan serverless web app"
git branch -M main
git remote add origin https://github.com/<본인GitHub아이디>/eatplan.git
git push -u origin main
```
