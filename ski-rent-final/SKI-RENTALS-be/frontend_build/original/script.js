/* ===========================
   LOGIN REDIRECTS
=========================== */
function redirectToPassword(e) {
  e.preventDefault();
  window.location.href = "Password.html";
}

function redirectToCode(e) {
  e.preventDefault();
  window.location.href = "Verification.html";
}

function redirectToDashboard(e) {
  e.preventDefault();
  window.location.href = "Info Menu.html";
}

/* ===========================
   BACKGROUND ANIMATION (Canvas Nebula + Stars)
=========================== */
(function () {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false });

  let DPR = Math.max(1, window.devicePixelRatio || 1);
  let W = 0,
    H = 0;

  function resize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    W = Math.floor(innerWidth * DPR);
    H = Math.floor(innerHeight * DPR);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    generateNebula();
  }
  addEventListener("resize", resize);

  const palettes = [
    {
      stars: ["#E6F2FF", "#BFDFFF", "#D7B9FF"],
      nebula: ["#2b3b6e", "#4a2f6c", "#14304f"],
      bg: "#020313",
    },
    {
      stars: ["#FFFFFF", "#CFEFFF", "#EFD4FF"],
      nebula: ["#1b2f55", "#3a1f4a", "#142b48"],
      bg: "#00020a",
    },
    {
      stars: ["#F7FBFF", "#C7E8FF", "#EFCFFF"],
      nebula: ["#20324f", "#4b2b6b", "#1a3242"],
      bg: "#040012",
    },
  ];
  const P = palettes[Math.floor(Math.random() * palettes.length)];

  const STAR_MIN = 180,
    STAR_MAX = 340;
  let stars = [];
  function initStars() {
    stars = [];
    const count =
      STAR_MIN + Math.floor(Math.random() * (STAR_MAX - STAR_MIN));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.4 + 0.2,
        baseA: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.03,
        color: P.stars[Math.floor(Math.random() * P.stars.length)],
      });
    }
  }

  let nebulaCanvas = document.createElement("canvas");
  let nebCtx = nebulaCanvas.getContext("2d");
  function generateNebula() {
    nebulaCanvas.width = Math.max(512, Math.floor(innerWidth));
    nebulaCanvas.height = Math.max(512, Math.floor(innerHeight));
    nebCtx.clearRect(0, 0, nebulaCanvas.width, nebulaCanvas.height);
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const cx = Math.random() * nebulaCanvas.width;
      const cy = Math.random() * nebulaCanvas.height;
      const r =
        Math.max(nebulaCanvas.width, nebulaCanvas.height) *
        (0.18 + Math.random() * 0.35);
      const color = P.nebula[Math.floor(Math.random() * P.nebula.length)];
      const grd = nebCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grd.addColorStop(0, hexToRgba(color, 0.16));
      grd.addColorStop(0.55, hexToRgba(color, 0.08));
      grd.addColorStop(1, "rgba(0,0,0,0)");
      nebCtx.fillStyle = grd;
      nebCtx.beginPath();
      nebCtx.arc(cx, cy, r, 0, Math.PI * 2);
      nebCtx.fill();
    }
  }

  function hexToRgba(hex, a = 1) {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  let comets = [];
  let meteors = [];
  function spawnComet() {
    comets.push({
      x: -100,
      y: Math.random() * innerHeight * 0.6 + innerHeight * 0.1,
      tail: 160 + Math.random() * 120,
      speed: 2.8 + Math.random() * 2.2,
      alpha: 1,
    });
    if (comets.length > 2) comets.shift();
  }
  function spawnMeteor() {
    meteors.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight * 0.45,
      length: 50 + Math.random() * 80,
      speed: 9 + Math.random() * 8,
      alpha: 1,
    });
    if (meteors.length > 6) meteors.splice(0, 1);
  }

  let supernova = null;
  function maybeSupernova() {
    if (supernova) return;
    if (Math.random() < 0.002) {
      supernova = {
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        life: 0,
        maxLife: 120 + Math.floor(Math.random() * 140),
        maxRadius: 60 + Math.random() * 120,
      };
    }
  }

  function init() {
    resize();
    initStars();
    generateNebula();
    comets = [];
    meteors = [];
    supernova = null;
  }

  let lastT = performance.now();
  function frame(now) {
    const dt = Math.min(40, now - lastT);
    lastT = now;

    ctx.fillStyle = P.bg;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.95;
    ctx.drawImage(nebulaCanvas, 0, 0, innerWidth, innerHeight);

    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.speed * dt;
      const a = s.baseA * (0.7 + 0.3 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.min(1, Math.max(0, a));
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i];
      const x = c.x;
      const y = c.y;
      const tailEndX = x - c.tail;
      const grad = ctx.createLinearGradient(x, y, tailEndX, y);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.35, "rgba(200,220,255,0.35)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(tailEndX, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx.fill();
      c.x += c.speed;
      c.alpha -= 0.001;
      if (c.x > innerWidth + 200 || c.alpha <= 0) comets.splice(i, 1);
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      const x = m.x;
      const y = m.y;
      const ex = x - m.length;
      const ey = y - m.length * 0.35;
      const grad = ctx.createLinearGradient(x, y, ex, ey);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.5, "rgba(255,220,190,0.45)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      m.x += m.speed;
      m.y += m.speed * 0.35;
      m.alpha -= 0.02;
      if (m.alpha <= 0 || m.x > innerWidth + 50) meteors.splice(i, 1);
    }

    if (supernova) {
      const s = supernova;
      s.life++;
      const t = s.life / s.maxLife;
      const radius =
        s.maxRadius * (0.85 + 0.15 * Math.sin(t * Math.PI));
      const alpha = 0.18 * (1 - t) + 0.02;
      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius);
      grad.addColorStop(0, `rgba(255,240,220,${alpha})`);
      grad.addColorStop(0.5, `rgba(220,200,255,${alpha * 0.6})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "lighter";
      if (s.life > s.maxLife) supernova = null;
    } else {
      maybeSupernova();
    }

    if (Math.random() < 0.008) spawnMeteor();
    if (Math.random() < 0.0016) spawnComet();

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    requestAnimationFrame(frame);
  }

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (media.matches) {
    function staticDraw() {
      resize();
      generateNebula();
      initStars();
      ctx.fillStyle = P.bg;
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(nebulaCanvas, 0, 0, innerWidth, innerHeight);
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.baseA * 0.9;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }
    init();
    staticDraw();
  } else {
    init();
    requestAnimationFrame(frame);
  }
  window.__regBg = { init };
})();
/* --- Local Storage Helpers --- */
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

/* --- Table Rendering --- */
function renderTable(tableId, key, columns) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  if (!tableBody) return;

  const data = loadData(key);
  tableBody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    columns.forEach(col => {
      const td = document.createElement("td");
      td.textContent = row[col] || "";
      tr.appendChild(td);
    });

    // Действия
    const tdActions = document.createElement("td");
    tdActions.classList.add("actions");

    const btnEdit = document.createElement("button");
    btnEdit.className = "action-btn action-edit";
    btnEdit.textContent = "Edit";
    btnEdit.onclick = () => editRecord(key, index, columns, tableId);

    const btnDelete = document.createElement("button");
    btnDelete.className = "action-btn action-delete";
    btnDelete.textContent = "Delete";
    btnDelete.onclick = () => deleteRecord(key, index, tableId, columns);

    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  });
}

/* --- CRUD Functions --- */
function addRecord(key, data, tableId, columns) {
  const records = loadData(key);
  records.push(data);
  saveData(key, records);
  renderTable(tableId, key, columns);
}

function editRecord(key, index, columns, tableId) {
  const records = loadData(key);
  const record = records[index];

  const updated = {};
  columns.forEach(col => {
    const newValue = prompt(`Edit ${col}`, record[col]);
    updated[col] = newValue || record[col];
  });

  records[index] = updated;
  saveData(key, records);
  renderTable(tableId, key, columns);
}

function deleteRecord(key, index, tableId, columns) {
  const records = loadData(key);
  records.splice(index, 1);
  saveData(key, records);
  renderTable(tableId, key, columns);
}

/* --- Export to CSV --- */
function exportTable(key, columns, filename = "export.csv") {
  const data = loadData(key);
  if (!data.length) {
    alert("Нет данных для экспорта");
    return;
  }

  const csvContent = [
    columns.join(","),
    ...data.map(row => columns.map(col => `"${row[col] || ""}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* --- New function to add a product --- */
function createNewProduct() {
  const product = {};
  const fields = ["name", "category", "size", "price", "stock"];
  for (const field of fields) {
    const value = prompt(`Enter ${field}`);
    if (value === null) return; // Cancelled
    product[field] = value;
  }
  addRecord("products", product, "productsTable", fields);
}

/* --- Save modifiers from inputs --- */
function saveModifiers() {
  const modifierWeek = document.querySelector("#modifierWeek");
  const modifierHoliday = document.querySelector("#modifierHoliday");
  if (modifierWeek && modifierHoliday) {
    const modifiers = {
      modifierWeek: modifierWeek.value,
      modifierHoliday: modifierHoliday.value
    };
    localStorage.setItem("modifiers", JSON.stringify(modifiers));
  }
}

/* --- Initialization --- */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize products and discounts if not present
  if (!localStorage.getItem("products")) {
    saveData("products", []);
  }
  if (!localStorage.getItem("discounts")) {
    saveData("discounts", []);
  }

  // Render only productsTable and discountsTable with updated columns
  renderTable("productsTable", "products", ["name", "category", "size", "price", "stock"]);
  renderTable("discountsTable", "discounts", ["name", "value", "min"]);

  // Load modifiers if exist and set inputs
  const modifiersStr = localStorage.getItem("modifiers");
  if (modifiersStr) {
    try {
      const modifiers = JSON.parse(modifiersStr);
      const modifierWeek = document.querySelector("#modifierWeek");
      const modifierHoliday = document.querySelector("#modifierHoliday");
      if (modifierWeek && modifiers.modifierWeek !== undefined) {
        modifierWeek.value = modifiers.modifierWeek;
      }
      if (modifierHoliday && modifiers.modifierHoliday !== undefined) {
        modifierHoliday.value = modifiers.modifierHoliday;
      }
    } catch (e) {
      // ignore JSON parse errors
    }
  }
});