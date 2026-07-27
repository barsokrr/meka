/**
 * TMMOB İçmimarlar Odası — En Az Ücret Hesabı (2026)
 * PAÜ = YYA × BM × PİD × HBO × KK
 */

const KK = 1.4;

const BM_TABLE = {
  "I.A": { bm: 2600, label: "I.A — Basit yapılar", group: 1 },
  "I.B": { bm: 3900, label: "I.B — Basit yapılar", group: 1 },
  "I.C": { bm: 4200, label: "I.C — Basit yapılar", group: 1 },
  "I.D": { bm: 4800, label: "I.D — Basit yapılar", group: 1 },
  "II.A": { bm: 8100, label: "II.A — Orta yapılar", group: 2 },
  "II.B": { bm: 12500, label: "II.B — Orta yapılar", group: 2 },
  "II.C": { bm: 15100, label: "II.C — Orta yapılar", group: 2 },
  "III.A": { bm: 19800, label: "III.A — Apartman (≤3 kat)", group: 3 },
  "III.B": { bm: 21050, label: "III.B — Konut (<21,50 m)", group: 3 },
  "III.C": { bm: 23400, label: "III.C — Villa / müstakil 200–500 m²", group: 3 },
  "IV.A": { bm: 26450, label: "IV.A — Özellikli yapılar", group: 4 },
  "IV.B": { bm: 33900, label: "IV.B — Villa ≥500 m²", group: 4 },
  "IV.C": { bm: 40500, label: "IV.C — Büyük ticari / otel", group: 4 },
  "V.A": { bm: 42350, label: "V.A — Prestijli yapılar", group: 5 },
  "V.B": { bm: 43850, label: "V.B — Prestijli yapılar", group: 5 },
  "V.C": { bm: 48750, label: "V.C — Prestijli yapılar", group: 5 },
  "V.D": { bm: 53500, label: "V.D — Prestijli yapılar", group: 5 },
  "V.E": { bm: 103500, label: "V.E — Özel yapılar", group: 5 },
};

const SPACE_PRESETS = [
  { id: "daire", label: "Daire / apartman dairesi", kod: "III.A" },
  { id: "konut", label: "Konut (çok katlı bina)", kod: "III.B" },
  { id: "villa", label: "Villa / müstakil ev", kod: "III.C" },
  { id: "buyuk-villa", label: "Büyük villa (≥500 m²)", kod: "IV.B" },
  { id: "ofis", label: "Ofis / işyeri", kod: "III.B" },
  { id: "magaza", label: "Mağaza / cafe / restoran", kod: "III.B" },
  { id: "ozel", label: "Diğer (sınıfı kendim seçerim)", kod: null },
];

/** Oranlar yüzde puanı (10 = %10) — float sapmasını önlemek için */
const HBO_SERVICES = [
  {
    id: "rolove",
    kod: "a",
    puan: 10,
    title: "Rölöve",
    desc: "Mevcut durum ölçümü ve çizimi",
  },
  {
    id: "on",
    kod: "b",
    puan: 20,
    title: "Ön proje",
    desc: "Konsept, yerleşim ve ilk tasarım kararları",
  },
  {
    id: "kesin",
    kod: "c",
    puan: 30,
    title: "Kesin proje + malzeme",
    desc: "Kesinleşmiş proje ve malzeme seçimleri",
  },
  {
    id: "uygulama",
    kod: "d",
    puan: 35,
    title: "Uygulama + detaylar",
    desc: "Uygulama projesi, sistem ve imalat detayları",
  },
  {
    id: "mahal",
    kod: "e",
    puan: 5,
    title: "Mahal listesi / metraj",
    desc: "Mahal listesi, metraj ve iş programı",
  },
];

const PID_ROWS = [
  [500, 3.92, 4.48, 5.04, 5.6, 6.16],
  [1000, 3.02, 3.58, 4.14, 4.7, 5.26],
  [2500, 2.42, 2.84, 3.27, 3.7, 4.12],
  [5000, 2.0, 2.31, 2.62, 2.93, 3.24],
  [7500, 1.8, 2.07, 2.32, 2.59, 2.84],
  [10000, 1.69, 1.91, 2.15, 2.38, 2.61],
  [12500, 1.57, 1.79, 2.0, 2.21, 2.42],
  [15000, 1.49, 1.68, 1.87, 2.07, 2.27],
  [17500, 1.41, 1.58, 1.76, 1.94, 2.12],
  [20000, 1.34, 1.51, 1.67, 1.84, 2.0],
  [22500, 1.28, 1.43, 1.57, 1.73, 1.88],
  [25000, 1.22, 1.35, 1.5, 1.64, 1.79],
  [27500, 1.16, 1.29, 1.42, 1.55, 1.68],
  [30000, 1.1, 1.22, 1.35, 1.47, 1.61],
  [32500, 1.05, 1.18, 1.31, 1.44, 1.57],
  [35000, 1.01, 1.14, 1.26, 1.39, 1.51],
  [37500, 0.98, 1.1, 1.22, 1.34, 1.46],
  [40000, 0.95, 1.07, 1.18, 1.3, 1.41],
  [42500, 0.92, 1.04, 1.15, 1.26, 1.37],
  [45000, 0.89, 1.01, 1.11, 1.23, 1.33],
  [47500, 0.87, 0.98, 1.08, 1.19, 1.3],
  [50000, 0.85, 0.96, 1.05, 1.16, 1.26],
  [52500, 0.83, 0.93, 1.03, 1.14, 1.23],
  [55000, 0.81, 0.91, 1.0, 1.11, 1.2],
  [57500, 0.79, 0.89, 0.98, 1.09, 1.18],
  [60000, 0.77, 0.87, 0.96, 1.06, 1.15],
  [62500, 0.76, 0.85, 0.94, 1.04, 1.13],
  [65000, 0.74, 0.84, 0.93, 1.02, 1.11],
  [67500, 0.73, 0.82, 0.91, 1.0, 1.09],
  [70000, 0.72, 0.81, 0.89, 0.98, 1.07],
  [72500, 0.7, 0.79, 0.88, 0.97, 1.05],
  [75000, 0.69, 0.78, 0.86, 0.95, 1.03],
  [77500, 0.68, 0.77, 0.85, 0.93, 1.02],
  [80000, 0.67, 0.75, 0.83, 0.92, 1.0],
];

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function getPidRate(yya, group) {
  if (!Number.isInteger(group) || group < 1 || group > 5) return null;
  if (!Number.isFinite(yya) || yya <= 0) return null;

  if (yya <= 500) return PID_ROWS[0][group] / 100;
  if (yya >= 80000) return PID_ROWS[PID_ROWS.length - 1][group] / 100;

  let i = 0;
  while (i < PID_ROWS.length - 1 && PID_ROWS[i + 1][0] <= yya) i += 1;

  const a1 = PID_ROWS[i][0];
  const r1 = PID_ROWS[i][group];
  if (a1 === yya || i === PID_ROWS.length - 1) return r1 / 100;

  const a2 = PID_ROWS[i + 1][0];
  const r2 = PID_ROWS[i + 1][group];
  if (a2 === a1) return r1 / 100;

  const r = r1 - ((yya - a1) * (r1 - r2)) / (a2 - a1);
  return r / 100;
}

function formatTL(n) {
  if (n == null || !Number.isFinite(n)) return "—";
  return (
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n) + " ₺"
  );
}

function formatPct(n) {
  if (n == null || !Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("tr-TR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function parseYya(raw) {
  if (raw == null) return NaN;
  const cleaned = String(raw).trim().replace(/\s/g, "").replace(",", ".");
  if (cleaned === "") return NaN;
  return Number(cleaned);
}

function parseKdv(raw) {
  if (raw === "" || raw == null) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function calculate({ yya, kod, selectedIds, kdvOran }) {
  const warnings = [];

  if (!Number.isFinite(yya) || yya <= 0) {
    return { ok: false, error: "Metrekare pozitif bir sayı olmalıdır." };
  }
  if (!kod || !BM_TABLE[kod]) {
    return { ok: false, error: "Mekân / yapı tipi seçiniz." };
  }

  const selected = HBO_SERVICES.filter((s) => selectedIds.includes(s.id));
  if (selected.length === 0) {
    return { ok: false, error: "En az bir hizmet seçeneği işaretleyin." };
  }

  const { bm, group } = BM_TABLE[kod];
  const hboPuan = selected.reduce((sum, s) => sum + s.puan, 0);
  const hbo = hboPuan / 100;
  const pid = getPidRate(yya, group);

  if (pid == null) {
    return { ok: false, error: "PİD oranı hesaplanamadı." };
  }

  if (yya < 500) {
    warnings.push(
      "PİD cetveli 500 m²'den başlar; küçük alanlarda oran pratikte daha yüksek olabilir."
    );
  }

  const pau = round2(yya * bm * pid * hbo * KK);
  const pauKdv = round2(pau * (1 + kdvOran));
  const perM2 = round2(pau / yya);
  const perM2Kdv = round2(pauKdv / yya);

  // Kırılım: kuruş bazlı dağıtım (toplam = PAÜ)
  const selectedSet = new Set(selectedIds);
  const selectedOnly = HBO_SERVICES.filter((s) => selectedSet.has(s.id));
  let remainingKurus = Math.round(pau * 100);
  const tutarById = {};

  selectedOnly.forEach((s, idx) => {
    if (idx === selectedOnly.length - 1) {
      tutarById[s.id] = remainingKurus / 100;
    } else {
      const share = Math.round((pau * 100 * s.puan) / hboPuan);
      tutarById[s.id] = share / 100;
      remainingKurus -= share;
    }
  });

  const breakdown = HBO_SERVICES.map((s) => {
    const on = selectedSet.has(s.id);
    return {
      ...s,
      oran: s.puan / 100,
      on,
      tutar: on ? tutarById[s.id] : 0,
    };
  });

  return {
    ok: true,
    error: null,
    warnings,
    bm,
    group,
    pid,
    hbo,
    kk: KK,
    pau,
    pauKdv,
    perM2,
    perM2Kdv,
    yapiMaliyeti: round2(yya * bm),
    breakdown,
  };
}

/* ─── UI ─── */

const $ = (sel) => document.querySelector(sel);

function initSpaceSelect() {
  const sel = $("#spaceType");
  sel.innerHTML = "";
  SPACE_PRESETS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.label;
    sel.appendChild(opt);
  });
}

function initClassSelect() {
  const sel = $("#classKod");
  sel.innerHTML = "";
  Object.entries(BM_TABLE).forEach(([kod, meta]) => {
    const opt = document.createElement("option");
    opt.value = kod;
    opt.textContent = `${meta.label} — ${meta.bm.toLocaleString("tr-TR")} ₺/m²`;
    sel.appendChild(opt);
  });
}

function initServices() {
  const box = $("#services");
  box.innerHTML = "";
  HBO_SERVICES.forEach((s) => {
    const id = `svc-${s.id}`;
    const label = document.createElement("label");
    label.className = "service";
    label.htmlFor = id;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.name = "svc";
    input.value = s.id;
    input.checked = true;

    const check = document.createElement("span");
    check.className = "service__check";
    check.setAttribute("aria-hidden", "true");

    const body = document.createElement("span");
    body.className = "service__body";
    body.innerHTML = `
      <span class="service__title">${s.title} <em>${formatPct(s.puan / 100)}</em></span>
      <span class="service__desc">${s.desc}</span>
    `;

    label.append(input, check, body);
    box.appendChild(label);
  });
}

function getSelectedServices() {
  return [...document.querySelectorAll('input[name="svc"]:checked')].map(
    (el) => el.value
  );
}

function resolveKod() {
  const presetId = $("#spaceType").value;
  const preset = SPACE_PRESETS.find((p) => p.id === presetId);
  if (!preset) return null;
  if (preset.kod) return preset.kod;
  return $("#classKod").value || null;
}

function syncClassVisibility() {
  const isOzel = $("#spaceType").value === "ozel";
  const wrap = $("#classWrap");
  wrap.hidden = !isOzel;
  wrap.setAttribute("aria-hidden", String(!isOzel));
  $("#classKod").disabled = !isOzel;
}

function getWhatsAppFromConfig() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = (params.get("wa") || "").replace(/\D/g, "");
  if (fromUrl.length >= 10) return fromUrl;
  const fromConfig = ((window.APP_CONFIG && window.APP_CONFIG.WHATSAPP) || "").replace(
    /\D/g,
    ""
  );
  if (fromConfig.length >= 10 && fromConfig !== "905320000000") return fromConfig;
  return "";
}

function updateLeadCta(result, meta) {
  const lead = $("#leadCta");
  const contact = $("#leadContact");
  const wa = $("#leadWhatsapp");
  if (!lead || !contact) return;

  if (!result.ok) {
    lead.hidden = true;
    return;
  }

  const name = meta.projectName || "Proje";
  const yyaText = Number.isFinite(meta.yya)
    ? meta.yya.toLocaleString("tr-TR")
    : "—";
  const summary = `${name} · ${yyaText} m² · ${meta.kod || "—"} · Asgari ${formatTL(result.pau)} (KDV hariç) / ${formatTL(result.pauKdv)} (KDV dahil)`;

  const params = new URLSearchParams({
    kaynak: "proje-bedeli",
    ozet: summary,
    konu: "Proje bedeli hesabı sonrası görüşme",
  });
  if (Number.isFinite(meta.yya)) {
    if (meta.yya < 50) params.set("alan", "0–50 m²");
    else if (meta.yya < 100) params.set("alan", "50–100 m²");
    else if (meta.yya < 200) params.set("alan", "100–200 m²");
    else if (meta.yya < 400) params.set("alan", "200–400 m²");
    else params.set("alan", "400 m²+");
  }

  contact.href = `/iletisim?${params.toString()}`;
  lead.hidden = false;

  const phone = getWhatsAppFromConfig();
  if (wa && phone) {
    const text = encodeURIComponent(
      `Merhaba, proje bedeli hesapladım:\n${summary}\nGörüşmek istiyorum.`
    );
    wa.href = `https://wa.me/${phone}?text=${text}`;
    wa.hidden = false;
  } else if (wa) {
    wa.hidden = true;
  }
}

function render(result, meta) {
  const status = $("#status");
  const results = $("#results");

  if (!result.ok) {
    status.textContent = result.error;
    status.className = "status status--warn";
    status.hidden = false;
    results.classList.add("is-muted");
    $("#pau").textContent = "—";
    $("#pauKdv").textContent = "—";
    $("#perM2").textContent = "—";
    $("#perM2Kdv").textContent = "—";
    $("#metaLine").textContent = "";
    $("#breakdownBody").innerHTML = "";
    $("#projectTitleOut").textContent = meta.projectName || "Proje";
    updateLeadCta(result, meta);
    return;
  }

  results.classList.remove("is-muted");
  if (result.warnings.length) {
    status.textContent = result.warnings.join(" ");
    status.className = "status status--info";
    status.hidden = false;
  } else {
    status.textContent = "";
    status.hidden = true;
  }

  $("#pau").textContent = formatTL(result.pau);
  $("#pauKdv").textContent = formatTL(result.pauKdv);
  $("#perM2").textContent = formatTL(result.perM2);
  $("#perM2Kdv").textContent = formatTL(result.perM2Kdv);

  const name = meta.projectName || "İsimsiz proje";
  const yyaText = Number.isFinite(meta.yya)
    ? meta.yya.toLocaleString("tr-TR")
    : "—";
  $("#metaLine").textContent = `${name} · ${yyaText} m² · ${meta.kod} · PİD ${formatPct(result.pid)} · HBO ${formatPct(result.hbo)} · KK ${result.kk}`;

  $("#breakdownBody").innerHTML = result.breakdown
    .map(
      (row) => `
      <tr class="${row.on ? "" : "is-off"}">
        <td>${row.title}</td>
        <td>${formatPct(row.oran)}</td>
        <td>${row.on ? "Evet" : "Hayır"}</td>
        <td>${row.on ? formatTL(row.tutar) : "—"}</td>
      </tr>`
    )
    .join("");

  $("#projectTitleOut").textContent = name;
  updateLeadCta(result, meta);
}

function run() {
  syncClassVisibility();
  const projectName = $("#projectName").value.trim();
  const yya = parseYya($("#yya").value);
  const kod = resolveKod();
  const kdvOran = parseKdv($("#kdv").value);
  const selectedIds = getSelectedServices();

  const result = calculate({ yya, kod, selectedIds, kdvOran });
  render(result, { projectName, yya, kod });
}

function bind() {
  ["#projectName", "#yya", "#spaceType", "#classKod", "#kdv"].forEach((sel) => {
    $(sel).addEventListener("input", run);
    $(sel).addEventListener("change", run);
  });
  $("#services").addEventListener("change", run);

  $("#btnAll").addEventListener("click", () => {
    document.querySelectorAll('input[name="svc"]').forEach((el) => {
      el.checked = true;
    });
    run();
  });
  $("#btnNone").addEventListener("click", () => {
    document.querySelectorAll('input[name="svc"]').forEach((el) => {
      el.checked = false;
    });
    run();
  });
  $("#btnDraw").addEventListener("click", () => {
    const keep = new Set(["on", "kesin", "uygulama"]);
    document.querySelectorAll('input[name="svc"]').forEach((el) => {
      el.checked = keep.has(el.value);
    });
    run();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAccessGate(() => {
    initSpaceSelect();
    initClassSelect();
    initServices();
    bind();
    $("#spaceType").value = "daire";
    $("#yya").value = "120";
    $("#projectName").value = "Örnek daire projesi";
    $("#classKod").value = "III.A";
    run();
  });
});

/* ─── Kişisel erişim ─── */

function getAccessKey() {
  return (window.APP_CONFIG && window.APP_CONFIG.ACCESS_KEY) || "";
}

function getSessionKey() {
  return (window.APP_CONFIG && window.APP_CONFIG.SESSION_KEY) || "icmimar_unlock";
}

function isUnlocked() {
  try {
    return sessionStorage.getItem(getSessionKey()) === "1";
  } catch {
    return false;
  }
}

function setUnlocked(on) {
  try {
    if (on) sessionStorage.setItem(getSessionKey(), "1");
    else sessionStorage.removeItem(getSessionKey());
  } catch {
    /* ignore */
  }
}

function keyFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("k") || params.get("key") || "").trim();
}

function showApp() {
  const gate = $("#gate");
  const root = $("#appRoot");
  if (gate) gate.hidden = true;
  if (root) root.hidden = false;
}

function showGate() {
  const gate = $("#gate");
  const root = $("#appRoot");
  if (gate) gate.hidden = false;
  if (root) root.hidden = true;
}

function tryUnlock(rawKey) {
  const expected = getAccessKey();
  if (!expected) {
    setUnlocked(true);
    return true;
  }
  if ((rawKey || "").trim() === expected) {
    setUnlocked(true);
    return true;
  }
  return false;
}

function setupAccessGate(onReady) {
  const urlKey = keyFromUrl();
  if (urlKey && tryUnlock(urlKey)) {
    // Temiz URL (anahtar adres çubuğunda kalmasın)
    const clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", clean);
    showApp();
    onReady();
    bindLock();
    return;
  }

  if (isUnlocked()) {
    showApp();
    onReady();
    bindLock();
    return;
  }

  showGate();
  const btn = $("#gateBtn");
  const input = $("#gateKey");
  const err = $("#gateError");

  const attempt = () => {
    if (tryUnlock(input.value)) {
      err.hidden = true;
      showApp();
      onReady();
      bindLock();
    } else {
      err.hidden = false;
      input.focus();
      input.select();
    }
  };

  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") attempt();
  });
  input.focus();
}

function bindLock() {
  const lockBtn = $("#lockBtn");
  if (!lockBtn || lockBtn.dataset.bound) return;
  lockBtn.dataset.bound = "1";
  lockBtn.addEventListener("click", () => {
    setUnlocked(false);
    showGate();
    const input = $("#gateKey");
    const err = $("#gateError");
    if (err) err.hidden = true;
    if (input) {
      input.value = "";
      input.focus();
    }
  });
}
