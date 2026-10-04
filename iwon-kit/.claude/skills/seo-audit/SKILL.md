---
name: seo-audit
description: 아이원소프트뱅크 사이트의 SEO/AEO/GEO 상태를 점검한다. 사용자가 "SEO 점검", "AEO 진단", "스키마 확인", "구조화 데이터 검사", "크롤러 정책 확인"을 요청하거나, FTP 배포 전 검증이 필요할 때 사용한다.
---

# SEO / AEO / GEO 점검 절차

`AEO_PLAN.md`와 `docs/SITE_FACTS.md`를 먼저 읽는다. 아래 순서대로 **코드를 실제로 읽고** 점검한다. 추정 금지.

## 1. 크롤러 접근권 (가장 먼저 — 막히면 나머지가 무의미)

`robots.txt`를 읽고 확인:
- **인용봇 전부 Allow인가** — `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`, `Googlebot`, `Bingbot`, `Yeti`(네이버)
- 학습봇 상태 기록 — `CCBot`, `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`
- `Disallow:` 경로가 정말 막아야 할 곳인가 (관리자 Yes, 콘텐츠 No)
- `Sitemap:` 라인 존재 및 절대 URL

## 2. head 공통 요소 (`head.asp`)

동적 생성이므로 **반드시 코드를 읽는다.** "없다"고 단정하기 전에 조건 분기를 모두 확인.

- `<title>` — 페이지별로 다른가, 질문형 검색어를 반영하는가
- `meta description` — 페이지별 고유한가
- `canonical` — 절대 URL, www 유무 일관, 쿼리스트링 처리
- `hreflang` — **실존하지 않는 언어 URL을 가리키지 않는가**
- OG / Twitter 카드
- verification 메타 (구글, 네이버)
- `viewport`, `charset`

## 3. 구조화 데이터

각 JSON-LD 블록에 대해:
- 문법 — `validator.schema.org`
- **화면 일치** — 스키마 내용이 그 페이지에 실제로 렌더링되는가 ⚠️ 가장 자주 깨지는 부분
- `@id` 고정 및 상호 참조
- 타입 적합성 — QAPage(UGC 커뮤니티용) vs FAQPage(사이트 제공 FAQ) 혼동 여부
- 조작 없음 — `aggregateRating`/`review`/`price`가 실제 근거를 가지는가

리치 결과 자격은 Rich Results Test로. **단 FAQ/HowTo는 지원 중단되었으므로 RRT에 안 뜨는 것이 정상이다.**

## 4. 답변 가능성 (AEO/GEO)

주요 페이지를 "AI가 이걸 인용할 수 있나" 기준으로 본다:
- 하나의 질문에 자기완결적으로 답하는가
- 결론이 첫 문단에 있는가, 아래로 미뤄져 있는가
- 추출 가능한 **사실**(숫자, 기준, 조건, 절차)이 있는가, 형용사뿐인가
- 표·목록으로 비교 가능한가
- 최종 수정일이 표시되는가

## 5. 기술 기본기

- HTTPS 및 혼합 콘텐츠
- 301 정리 — www/non-www, http/https, `index.asp` 유무가 중복 URL을 만들지 않는가
- `sitemap.xml` — 변경 페이지 반영, 죽은 URL 없음
- 404가 200을 반환하지 않는가 (soft 404)
- 이미지 `alt`
- **디자인 개편 중이면**: 교체된 페이지의 h1/헤딩 계층/alt가 유지됐는가 (`DESIGN_PLAN.md` 5절 표와 대조)

## 6. 보고 형식

| 심각도 | 항목 | 파일:라인 | 왜 문제인가 | 수정안 |
|---|---|---|---|---|

심각도:
- **치명** — 정책 위반 리스크(화면-스키마 불일치, 조작된 rating), 인용봇 차단
- **높음** — 색인/인용을 직접 막는 것 (canonical 오류, 잘못된 hreflang, 중복 URL)
- **중간** — 이해 신호 손실 (타입 오용, 스키마 누락)
- **낮음** — 개선 여지

**리치 결과가 안 뜬다는 사실만으로 "문제"라고 보고하지 않는다.** 해당 유형이 애초에 지원되는지부터 확인한다.

## 7. 마무리

점검 결과를 `AEO_PLAN.md`에 반영한다. 새 이슈는 P0~P3 중 적절한 곳에 체크박스로 추가한다.
