# SEO / AEO / GEO 마스터 플랜 — 아이원소프트뱅크

최종 갱신: 2026-10-04 · 3차 교차검증 반영 + 로컬 작업 전환

> **디자인 개편이 동시 진행된다.** 같은 파일을 건드리므로 착수 전 `DESIGN_PLAN.md` 6절(충돌)을 반드시 확인한다.

---

## 1. 현재 상태

**완료 (로컬 수정, FTP 미업로드)**
- FAQPage JSON-LD (`faq.asp`), BreadcrumbList, SoftwareApplication (`brand.asp`)
- canonical 고정, 카피라이트 정정
- robots.txt AI 크롤러 정책, llms.txt, sitemap 갱신

**기존 완비 확인됨** — Organization/WebSite 스키마, 서브페이지 OG, verification 메타
> `head.asp`가 동적 생성하는 것을 외부 진단이 놓쳐 "누락"으로 오진단한 건. head.asp는 **읽고 나서** 판단한다.

**미실시** — FTP 업로드, 라이브 검증, 색인 요청, AEO 재진단
**신규 확인** — `C:\_`는 git 저장소가 아니다 → `START_HERE.md` 0단계가 모든 작업의 선행 조건

---

## 2. 전략 요약 — 어디에 힘을 쓸 것인가

**스키마는 이미 기본기를 넘었다. 여기서 더 늘려도 수익이 거의 없다.**
남은 스키마 작업(P0)은 반나절이면 끝난다. 이후 성과는 **크롤러 접근권**과 **인용 가능한 콘텐츠**에서 나온다.

| 레버 | 현재 | 남은 상승 여력 | 비용 |
|---|---|---|---|
| 구조화 데이터 | 상위권 | **작음** | 낮음 |
| AI 크롤러 접근 정책 | 미확정(일부 차단) | **매우 큼** — 차단하면 스키마가 무의미 | 낮음(결정만) |
| 답변형 콘텐츠 | 취약 | **가장 큼** | 높음(지속) |
| 네이버 채널 신호 | 미측정 | 큼(국내 B2B는 네이버가 관문) | 중간 |
| llms.txt | 배치됨 | **거의 없음** | — |

---

## 3. 로드맵

### P0 — 즉시 (1커밋, 반나절)

> ⚠️ `head.asp`가 디자인으로 전체 교체될 예정이면 hreflang 항목은 교체 **후**로 미룬다. `DESIGN_PLAN.md` 6절 참조.

- [ ] **FAQPage JSON-LD ↔ 화면 표시 일치** ⚠️ *정책 위반 리스크라 최우선*
  `faq.asp`의 DB 자동 생성 쿼리에 **비공개·임시저장·삭제 FAQ 제외 필터**가 있는지 확인. 없으면 추가.
  화면에 없는 내용이 스키마에 있으면 구조화 데이터 수동 조치 대상이다.
- [ ] **hreflang 정리** — 다국어 미운영이므로 `head.asp`의 en/ja 라인 삭제 (`x-default`만 유지 또는 전체 제거)
- [ ] **QAPage → FAQPage 교체** — `faq_view.asp`. QAPage는 사용자 답변이 여러 개 달리는 UGC 커뮤니티용 타입이라 부적합
- [ ] **Organization 스키마 완전성** — 존재 확인만으로는 부족. 실제 값으로 채운다:
  `name` / `url` / `logo`(절대경로 112px+) / `telephone`(1877-0256) / `address`(PostalAddress 전체) / `sameAs`(**운영 중인 채널만**) / `@id` 고정
- [ ] **robots.txt 크롤러 정책 재구성** — 4절 참조

### P1 — 배포·검증 (P0 커밋 직후)

1. [ ] FTP 업로드
2. [ ] 라이브 검증
   - [ ] Rich Results Test — BreadcrumbList, Organization, SoftwareApplication (**FAQ는 안 뜨는 게 정상**)
   - [ ] `validator.schema.org` — FAQPage 문법
   - [ ] 라이브 `robots.txt` 실제 응답 (캐시 아닌 실물)
   - [ ] canonical 렌더링 (view-source 기준)
   - [ ] hreflang 삭제 반영
3. [ ] Search Console + 네이버 서치어드바이저 색인 요청
4. [ ] **AEO 재진단 → 6절 진행 기록 표에 기록** (필수)
5. [ ] Bing Webmaster Tools 등록 확인 — ChatGPT 검색이 Bing 인덱스 기반인데 국내 사이트가 자주 놓치는 구멍

### P2 — 디자인 개편 완료 후

- [ ] **`Service` 스키마 추가** ⭐ 우선순위 상향
  파는 것은 소프트웨어가 아니라 **ERP 도입·구축·컨설팅·유지보수 서비스**다.
  `Service` + `provider`(Organization `@id` 참조) + `areaServed` + `serviceType`.
  현재 `SoftwareApplication`만 있으면 AI는 이 사이트를 "더존 제품 설명 페이지"로 이해하고 인용은 더존 본사로 간다.
- [ ] 제품별 `SoftwareApplication` — WEHAGO / iCUBE / Bizbox (각 제품 전용 페이지)
- [ ] 301 리다이렉트 정리 (중복 URL, www/non-www, `index.asp` 유무)
- [ ] 내부 링크 구조 — 제품 ↔ FAQ ↔ 도입사례
- [ ] 페이지 제목·H1을 **질문형 검색어**에 맞춰 재작성

### P3 — 지속

- [ ] **답변형 콘텐츠 제작** — GEO의 실제 엔진. 8절 참조
- [ ] 네이버 채널 운영 (블로그·카페)
- [ ] AI 인용 모니터링 루틴 (7절)

---

## 4. AI 크롤러 정책 — 두 종류를 분리하라

기존 계획의 "CCBot 허용/차단"은 **질문이 하나로 뭉쳐 있어서** 결정이 막혀 있었다. 성격이 다른 두 가지다.

### 4-1. 인용·검색 봇 (Retrieval) — **무조건 Allow**

실시간으로 가져와 **출처를 달아 인용**하는 봇. 차단하면 GEO 목표 자체가 성립하지 않는다.
학습 데이터로 쓰이지 않으므로 **콘텐츠 정책 이슈가 아니다. 결정 대상이 아니라 기본값이다.**

| User-agent | 소속 | 역할 |
|---|---|---|
| `OAI-SearchBot` | OpenAI | ChatGPT 검색 인덱싱 |
| `ChatGPT-User` | OpenAI | 사용자 요청 실시간 fetch |
| `PerplexityBot` | Perplexity | 인용 인덱싱 |
| `Perplexity-User` | Perplexity | 사용자 요청 fetch |
| `Claude-SearchBot` | Anthropic | 검색 인덱싱 |
| `Claude-User` | Anthropic | 사용자 요청 fetch |
| `Googlebot` | Google | 일반 검색 + **AI Overviews** |
| `Bingbot` | Microsoft | Bing + ChatGPT 검색 소스 |
| `Yeti` | Naver | 네이버 검색 |

> **중요**: `GPTBot`(학습)을 차단해도 `OAI-SearchBot`(검색)을 허용하면 ChatGPT 검색에는 계속 노출된다. 둘은 독립이며 **각각 명시해야 한다.**
> **중요**: `Google-Extended`를 차단해도 구글 **검색 순위와 AI Overviews에는 영향이 없다.** AI Overviews는 Googlebot 인덱스를 쓴다. Google-Extended는 Gemini 앱/Vertex AI 학습·그라운딩만 통제한다.

### 4-2. 학습 봇 (Training) — **대표 결정 대기**

콘텐츠를 모델 학습에 쓰게 할지의 **콘텐츠 라이선스 정책** 문제. 여기가 진짜 결정 항목이다.

| User-agent | 소속 | 현재 | 권고 |
|---|---|---|---|
| `CCBot` | Common Crawl | Disallow | **Allow** |
| `GPTBot` | OpenAI | `<확인필요>` | Allow |
| `ClaudeBot` | Anthropic | `<확인필요>` | Allow |
| `Google-Extended` | Google | `<확인필요>` | Allow |
| `Applebot-Extended` | Apple | `<확인필요>` | Allow |
| `Bytespider` | ByteDance | `<확인필요>` | 선택 (트래픽 부하 큼) |

**권고 근거**: 콘텐츠는 제품 소개·FAQ·도입 안내다. 보호할 독점 자산이 아니라 **알려질수록 이득인 마케팅 자산**이다. 모델이 "국내 더존 ERP 도입 파트너"를 학습할 때 아이원소프트뱅크가 들어가는 것이 목표 그 자체다.
**반대 논거**: 학습 데이터로 소비되면 클릭 없이 답만 소비될 수 있다. 다만 B2B ERP 도입은 결국 상담 전화가 필요하므로 리스크가 낮다.

- [ ] **결정 필요**: 4-2 학습 봇 일괄 Allow 여부 → 결정 후 robots.txt 반영

---

## 5. SoftwareApplication 한계 (문서화 완료)

- `brand.asp`의 SoftwareApplication은 `offers`/`aggregateRating` 부재로 **구글 리치 결과 자격 없음.**
- 용도는 **"AI 이해 신호 전용"**이다. 리치 결과를 기대하지 않는다.
- **가짜 가격·리뷰로 채우지 않는다.**
- **offers 검토 결론**: Amaranth10 무료체험이 실재하므로 `offers: { price: "0", priceCurrency: "KRW" }`는 사실 기반이라 허용 범위. 다만 `aggregateRating` 없이는 여전히 리치 결과 자격이 안 생겨 **실익이 작다.** → P2 이하, 급하지 않다.
- 더 중요한 건 P2의 **`Service` 스키마**다.

---

## 6. 진행 기록

| 날짜 | 작업 | AEO 점수 | 라이브 검증 | 비고 |
|---|---|---|---|---|
| 2026-08-27 | 1차 스키마 로컬 수정 | — | 미실시 | FTP 미업로드 |
| 2026-10-04 | 로컬 작업 환경 전환, git 미도입 확인 | — | — | START_HERE 0단계 선행 |
| | | | | |

> FTP 업로드할 때마다 한 행 추가. **점수만 적지 말고 무엇을 바꿔서 그렇게 됐는지 함께 적는다.**

---

## 7. 측정 — 벤더 점수를 KPI로 삼지 않는다

AEO 진단 점수는 **체크리스트 이행률**이지 성과가 아니다. 만점이어도 인용이 0일 수 있다.

**① AI 인용 실측 (월 1회)**
실제 구매자 질문 20~30개를 고정 세트로 만들어 매달 던지고 **우리 도메인이 출처로 뜨는지** 기록.
예: "중소기업 ERP 추천", "더존 iCUBE 도입 비용", "WEHAGO와 iCUBE 차이", "Amaranth10 무료체험 방법", "더존 ERP 구축 업체"

| 질의 | ChatGPT | Perplexity | Gemini | 네이버 | 측정일 |
|---|---|---|---|---|---|
| | | | | | |

**② AI 봇 실제 크롤링 (IIS 로그)**
`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `CCBot` User-Agent 히트 집계.
robots.txt 변경이 실제로 먹혔는지 확인하는 **유일하게 확실한 방법**이다.

**③ 검색 노출** — Search Console 노출/클릭, 네이버 서치어드바이저 유입

---

## 8. 답변형 콘텐츠 — GEO의 실제 엔진

AI가 인용하는 페이지의 공통점: **한 페이지가 하나의 질문에 자기완결적으로 답한다.**
"저희는 최고의 파트너입니다"는 인용될 수 없다. **추출 가능한 사실**만 인용된다.

**작성 규칙**
- 제목 = 실제 검색 질문 그대로
- 첫 문단에서 **답부터**. 결론을 아래로 미루지 않는다
- 숫자·기준·조건 명시 (직원 수 기준, 도입 기간, 필요 서류, 라이선스 형태)
- 표·목록으로 비교 가능하게
- 근거 있는 1차 정보 — 직접 겪은 도입 사례, 실제 소요 기간
- 최종 수정일 표시

**우선 제작 후보**
1. WEHAGO vs iCUBE vs Amaranth10 — 규모별 선택 기준 비교표
2. 더존 ERP 도입 절차와 소요 기간 (단계별 실제 일정)
3. ERP 도입 비용 구성 요소 (금액 아니어도 구조만으로 인용 가치 큼)
4. Amaranth10 무료체험 신청 방법 (단계별)
5. 기존 회계프로그램에서 더존으로 데이터 이관하기

> 디자인 개편 시 이 페이지들의 **본문 구조(표·목록·헤딩)를 디자인이 깨뜨리지 않도록** 주의한다.

---

## 9. llms.txt에 대한 솔직한 평가

- OpenAI·Google·Anthropic·Meta 중 프로덕션에서 llms.txt를 읽는다고 **공식 확약한 곳이 없다.** 구글은 검색에서 사용하지 않는다고 명시했다.
- 실질 용도는 AI 코딩 도구의 문서 조회에 가깝다. 도입률 5~15%.
- **결론: 이미 만들어 뒀으니 유지한다. 더 시간을 쓰지 않는다.** 우선순위 최하위.

---

## 10. 프로세스 규칙

- 금지 사항·검증 기준·도구 역할 분담은 `CLAUDE.md` 참조 (중복 기재하지 않는다)
- 이 파일이 SEO 작업의 **진실의 원본**이다. 작업하면 체크박스와 1절을 갱신한다
- 사실 관계는 `docs/SITE_FACTS.md`에서만 가져온다
- 디자인 작업과의 순서는 `DESIGN_PLAN.md` 6절이 결정한다
