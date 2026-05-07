# KOALNU TODO

Firebase Realtime Database 기반 할일 관리 시스템

## 📁 폴더 구조

```
shopping_mall/
├── index.html              메인 (할일 목록)
├── css/
│   └── style.css
└── js/
    ├── firebase-config.js  Firebase 초기화
    └── todo.js             할일 로직
```

## ✨ 기능

- ➕ **할일 추가** — Enter 또는 추가 버튼
- ✓ **완료 토글** — 체크박스 클릭
- ✎ **인라인 수정** — 텍스트 더블클릭 또는 ✎ 버튼 (Enter로 저장, Esc로 취소)
- × **삭제** — 개별 삭제
- 🗑️ **완료된 항목 일괄 삭제**
- 🔍 **필터** — 전체 / 미완료 / 완료
- 🔄 **실시간 동기화** — 여러 탭/기기에서 즉시 반영 (`onValue`)
- 🟢 **연결 상태 표시** — 우상단 점 색깔로 확인

## 🔥 Firebase 구조

Realtime Database `/todos`:
```json
{
  "todos": {
    "<auto-id>": {
      "text": "장보기",
      "done": false,
      "createdAt": 1746662400000
    }
  }
}
```

## 🚀 실행

로컬 서버:
```powershell
python -m http.server 5500
```
브라우저: http://localhost:5500/

## ⚠️ Firebase 보안 규칙

테스트용 (누구나 읽기/쓰기 가능):
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

운영 시에는 Firebase Auth와 결합해 사용자별 접근 제어 필요.
