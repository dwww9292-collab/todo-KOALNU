// ============================================
// 할일 관리 — Firebase Realtime Database
// 기능: 추가 / 완료 토글 / 인라인 수정 / 삭제 / 필터 / 일괄삭제
// ============================================
import { app } from "./firebase-config.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const db = getDatabase(app);
const todosRef = ref(db, "todos");

// ===== DOM =====
const form          = document.getElementById("todoForm");
const input         = document.getElementById("todoInput");
const list          = document.getElementById("todoList");
const filtersEl     = document.getElementById("filters");
const clearDoneBtn  = document.getElementById("clearDoneBtn");
const syncStatus    = document.getElementById("syncStatus");
const countAll      = document.getElementById("countAll");
const countActive   = document.getElementById("countActive");
const countDone     = document.getElementById("countDone");

// ===== 상태 =====
let allTodos = [];          // [{ id, text, done, createdAt }]
let currentFilter = "all";  // 'all' | 'active' | 'done'

// ============================================
// 1. 추가
// ============================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  try {
    await push(todosRef, {
      text,
      done: false,
      createdAt: Date.now(),
    });
    input.value = "";
  } catch (err) {
    console.error("[Todo] 추가 실패:", err);
    alert("저장 실패: " + err.message);
  }
});

// ============================================
// 2. 실시간 구독 (onValue)
// ============================================
syncStatus.title = "연결 중...";
onValue(
  todosRef,
  (snapshot) => {
    syncStatus.classList.add("connected");
    syncStatus.title = "연결됨";

    const data = snapshot.val();
    allTodos = data
      ? Object.entries(data).map(([id, v]) => ({ id, ...v }))
      : [];

    // 최신순 정렬
    allTodos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    render();
  },
  (err) => {
    syncStatus.classList.remove("connected");
    syncStatus.classList.add("error");
    syncStatus.title = "연결 실패";
    console.error("[Todo] 읽기 실패:", err);
    list.innerHTML = `
      <li class="todo-empty">
        <strong>읽기 실패</strong><br>
        <small>${escapeHtml(err.message)}</small><br>
        <small>Firebase 콘솔에서 Realtime Database 보안 규칙을 확인하세요</small>
      </li>`;
  }
);

// ============================================
// 3. 렌더링
// ============================================
function render() {
  // 카운트
  const doneCount = allTodos.filter((t) => t.done).length;
  countAll.textContent    = allTodos.length;
  countActive.textContent = allTodos.length - doneCount;
  countDone.textContent   = doneCount;

  // 필터링
  const filtered = allTodos.filter((t) => {
    if (currentFilter === "active") return !t.done;
    if (currentFilter === "done")   return t.done;
    return true;
  });

  if (filtered.length === 0) {
    const msg = allTodos.length === 0
      ? "아직 할 일이 없습니다. 위에서 첫 항목을 추가해보세요!"
      : "이 필터에 해당하는 항목이 없습니다.";
    list.innerHTML = `<li class="todo-empty">${msg}</li>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (t) => `
    <li class="todo-item ${t.done ? "done" : ""}" data-id="${t.id}">
      <input type="checkbox" class="check" ${t.done ? "checked" : ""} />
      <span class="text" title="더블클릭하여 수정">${escapeHtml(t.text)}</span>
      <button class="icon-btn edit" title="수정">✎</button>
      <button class="icon-btn delete" title="삭제">×</button>
    </li>`
    )
    .join("");

  bindItemEvents();
}

// ============================================
// 4. 항목 이벤트 (체크 / 수정 / 삭제)
// ============================================
function bindItemEvents() {
  list.querySelectorAll(".todo-item").forEach((li) => {
    const id = li.dataset.id;
    const itemRef = ref(db, `todos/${id}`);

    // 완료 토글
    li.querySelector(".check").addEventListener("change", (e) => {
      update(itemRef, { done: e.target.checked });
    });

    // 인라인 수정 (더블클릭 또는 ✎ 클릭)
    const textEl = li.querySelector(".text");
    const startEdit = () => beginEdit(li, id, textEl.textContent);
    textEl.addEventListener("dblclick", startEdit);
    li.querySelector(".edit").addEventListener("click", startEdit);

    // 삭제
    li.querySelector(".delete").addEventListener("click", () => {
      if (confirm("이 항목을 삭제하시겠습니까?")) {
        remove(itemRef);
      }
    });
  });
}

function beginEdit(li, id, oldText) {
  const itemRef = ref(db, `todos/${id}`);
  const editor = document.createElement("input");
  editor.type = "text";
  editor.value = oldText;
  editor.className = "edit-input";

  const textEl = li.querySelector(".text");
  textEl.replaceWith(editor);
  editor.focus();
  editor.select();

  const commit = () => {
    const newText = editor.value.trim();
    if (newText && newText !== oldText) {
      update(itemRef, { text: newText });
    } else {
      render(); // 변경 없으면 원상복구
    }
  };

  editor.addEventListener("blur", commit);
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Enter") editor.blur();
    if (e.key === "Escape") render();
  });
}

// ============================================
// 5. 필터
// ============================================
filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  filtersEl.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.toggle("active", b === btn);
  });
  render();
});

// ============================================
// 6. 완료된 항목 일괄 삭제
// ============================================
clearDoneBtn.addEventListener("click", async () => {
  const doneItems = allTodos.filter((t) => t.done);
  if (doneItems.length === 0) {
    alert("완료된 항목이 없습니다.");
    return;
  }
  if (!confirm(`완료된 ${doneItems.length}개 항목을 삭제하시겠습니까?`)) return;

  // 병렬 삭제
  await Promise.all(
    doneItems.map((t) => remove(ref(db, `todos/${t.id}`)))
  );
});

// ============================================
// 유틸
// ============================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
