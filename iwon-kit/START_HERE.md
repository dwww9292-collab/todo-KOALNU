# 시작하기 — 아이원소프트뱅크 홈페이지 작업 환경

대상 폴더: **`C:\_`** (ASP 사이트 소스)
디자인 참조: **`C:\soft_bank-main`** (디자이너 작업 중)

---

## ⚠️ 0단계. git을 먼저 깔아야 합니다 (건너뛰지 마세요)

`C:\_`는 **git 저장소가 아닙니다.** 확인된 사실입니다. 지금 상태는 이렇습니다:

- 되돌릴 수 없습니다. 파일 하나 잘못 고치면 복구 방법이 없습니다
- 무엇이 바뀌었는지 알 수 없습니다. FTP로 올린 뒤 "뭘 바꿨지?"가 안 됩니다
- 디자인 개편처럼 **여러 파일을 동시에 건드리는 작업**은 이 상태에서 하면 사고가 납니다

SEO 스키마 작업만 해도 `head.asp` 같은 공통 파일을 고칩니다. 거기에 디자인 개편이 겹치면
**어느 변경이 사이트를 깨뜨렸는지 분리할 수 없습니다.** 그래서 git이 선행 조건입니다.

### 명령 (PowerShell)

```powershell
cd C:\_

# 1. 백업 먼저 — git 넣기 전에 통째로 복사해 둔다
Copy-Item -Path C:\_ -Destination C:\_backup_20261004 -Recurse

# 2. git 초기화
git init
git branch -M main

# 3. .gitignore 배치 (이 키트에 포함됨) 후 현재 상태를 통째로 1커밋
git add -A
git commit -m "chore: 기존 사이트 소스 초기 커밋 (디자인 개편 전 기준점)"
```

이 커밋이 **되돌아갈 수 있는 기준점**입니다. 여기까지 하면 뭘 망쳐도 `git checkout .` 로 복구됩니다.

GitHub에 올릴지는 별개입니다. 라이브 사이트 소스에 DB 접속 정보나 키가 들어있을 수 있으니,
**먼저 `.gitignore`와 하드코딩된 비밀값을 점검한 뒤에** 원격 연결을 결정하세요. 로컬 git만으로도 되돌리기는 됩니다.

### git이 설치 안 돼 있으면
`winget install Git.Git` 또는 https://git-scm.com/download/win

---

## 1단계. 키트 배치

압축을 풀어 아래처럼 놓습니다:

```
C:\_\
├── CLAUDE.md                            ← Claude Code가 자동으로 읽는 규칙
├── AEO_PLAN.md                          ← SEO/AEO/GEO 계획·진행 기록
├── DESIGN_PLAN.md                       ← 디자인 개편 계획 (여기를 채워나감)
├── .gitignore
├── docs\
│   └── SITE_FACTS.md                    ← 사실 단일 원본
├── .claude\
│   └── skills\
│       ├── seo-audit\SKILL.md           ← /seo-audit
│       └── design-diff\SKILL.md         ← /design-diff
│
├── head.asp                             ← 기존 사이트 소스 (그대로)
├── faq.asp
└── ...
```

> `.claude` 앞의 점(`.`)을 빠뜨리지 마세요. 탐색기에서 안 보이면 [보기] → [숨긴 항목] 체크.

---

## 2단계. VSCode에서 열기

**`C:\_` 폴더 자체를 엽니다.** 하위 폴더를 열면 `CLAUDE.md`가 로드되지 않습니다.

디자인 폴더도 같이 보려면 VSCode에서 **[파일] → [폴더를 작업 영역에 추가]** 로
`C:\soft_bank-main`을 추가하세요. 그러면 Claude Code가 두 폴더를 모두 읽습니다.

확인:
```
지금 로드된 CLAUDE.md를 요약해줘
```
규칙이 요약돼 나오면 성공입니다.

---

## 3단계. 소스 전체 파악 — 아래를 그대로 붙여넣으세요

```
C:\_ 의 ASP 사이트 소스 전체를 파악해줘. 아직 아무것도 수정하지 마.

1. 파일 트리 (상위 2~3단계. 업로드 이미지 폴더 같은 건 개수만)
2. 공통 include 구조 — head.asp / 상단·하단 / DB 연결 파일이 각각 뭐고 어디서 include 되는지
3. 페이지 목록과 각 페이지의 역할
4. 파일 인코딩 — EUC-KR인지 UTF-8인지 (ASP 지시자와 meta charset 둘 다 확인)
5. 현재 들어가 있는 SEO 자산 — JSON-LD, canonical, meta, OG, hreflang이 각각 어느 파일 몇 번째 줄에 있는지
6. DB에서 끌어오는 콘텐츠와 하드코딩된 콘텐츠 구분
7. 하드코딩된 비밀값 (DB 접속정보, API 키) — 있으면 위치만. 값은 출력하지 마

결과를 docs/SOURCE_MAP.md 로 저장해줘.
```

이게 끝나면 `docs/SOURCE_MAP.md`가 생깁니다. 이후 모든 작업의 기준 문서입니다.

---

## 4단계. 디자인 대조 — 그 다음 이걸 붙여넣으세요

```
/design-diff
```

또는 직접:
```
C:\soft_bank-main 의 디자이너 작업 파일과 C:\_ 의 현재 ASP 소스를 대조해서
DESIGN_PLAN.md 를 채워줘. 아직 수정은 하지 마.

특히 이걸 알고 싶다:
- 디자인 폴더가 정적 HTML인지, 빌드 결과물인지, 어떤 템플릿 기반인지
- 페이지 단위로 어떻게 대응되는지 (디자인 파일 ↔ ASP 파일)
- 디자인을 ASP로 옮길 때 깨질 위험이 있는 것 — ASP 로직, include, DB 바인딩, 인코딩
- 기존 SEO 자산(JSON-LD, canonical, meta) 중 템플릿 교체로 날아갈 것
- 작업 순서 제안 (한 번에 다 바꾸지 않는 순서)
```

---

## 5단계. 그 다음

`DESIGN_PLAN.md`와 `AEO_PLAN.md`가 채워지면 둘의 **충돌 지점**을 먼저 정리합니다.
두 작업이 같은 파일(`head.asp` 등)을 건드리기 때문에 순서를 잘못 잡으면 서로 덮어씁니다.
`DESIGN_PLAN.md`의 "SEO 작업과의 충돌" 절을 보세요.

---

## 참고 — 웹 Claude(여기)와 로컬 Claude Code의 역할

| | 할 수 있는 것 | 못 하는 것 |
|---|---|---|
| **로컬 Claude Code** (VSCode) | `C:\_`, `C:\soft_bank-main` 직접 읽기·수정, git 커밋 | — |
| **웹 Claude** (여기) | GitHub 저장소 읽기, 계획·검토·조사, 정책 사실 검증 | 고객님 PC의 파일 접근 |

**파일 작업은 로컬에서, 판단이 필요한 상담은 여기서.** 원격에 올리기로 결정하시면
그때부터는 여기서도 소스를 직접 읽고 작업할 수 있습니다.
