(function () {
  /* Quadro de horários das aulas coletivas (fonte: quadro da House Fitness). Cada dia tem 4 células, uma por modalidade. Vazio = sem aula. */
  var SCHEDULE = {
    columns: ["Funcional", "Dança", "Muay Thai", "Jiu-Jitsu"],
    rows: [
      ["Segunda", ["", "19h30", "18h", ""]],
      ["Terça",   ["09h · 15h · 19h", "", "", "Baby 17h10\nAdulto/juv. 09h · 18h"]],
      ["Quarta",  ["", "19h30", "", ""]],
      ["Quinta",  ["09h · 15h · 19h", "", "18h", "Baby 17h10\nAdulto/juv. 09h · 19h"]],
      ["Sexta",   ["", "19h30", "", ""]]
    ]
  };

  var head = document.getElementById("schedule-head");
  var body = document.getElementById("schedule-body");
  var table = document.getElementById("schedule");
  var buttons = [];

  function th(btnLabel, filter) {
    var cell = document.createElement("th");
    cell.scope = "col";
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = btnLabel;
    b.setAttribute("aria-pressed", filter === 0 ? "true" : "false");
    b.addEventListener("click", function () { setFilter(filter); });
    cell.appendChild(b);
    buttons.push(b);
    head.appendChild(cell);
  }
  th("Aulas", 0);
  SCHEDULE.columns.forEach(function (c, i) { th(c, i + 1); });

  SCHEDULE.rows.forEach(function (r) {
    var tr = document.createElement("tr");
    var d = document.createElement("th");
    d.scope = "row"; d.textContent = r[0];
    tr.appendChild(d);
    r[1].forEach(function (t, i) {
      var td = document.createElement("td");
      td.setAttribute("data-c", i + 1);
      td.textContent = t || "";
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });

  function setFilter(n) {
    if (n === 0) table.removeAttribute("data-filter"); else table.setAttribute("data-filter", n);
    buttons.forEach(function (b, i) { b.setAttribute("aria-pressed", i === n ? "true" : "false"); });
  }

  /* Vídeo do hero: sem som; pausado para quem prefere menos movimento */
  var hv = document.getElementById("hero-video");
  if (hv) {
    hv.muted = true;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { hv.removeAttribute("autoplay"); hv.pause(); }
    else { var pr = hv.play(); if (pr && pr.catch) pr.catch(function () {}); }
  }

  /* Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* Formulário: monta a mensagem e abre o WhatsApp da House Fitness */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = document.getElementById("f-nome").value.trim();
    var contato = document.getElementById("f-contato").value.trim();
    var mod = document.getElementById("f-mod").value;
    if (!nome || !contato) { status.textContent = "Preencha nome e contato para continuar."; return; }
    var msg = "Olá! Meu nome é " + nome + ". Tenho interesse em " + mod + ". Meu contato: " + contato + ".";
    var url = "https://wa.me/558487455882?text=" + encodeURIComponent(msg);
    status.textContent = "Mensagem pronta. ";
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener"; a.className = "text-link"; a.textContent = "Continuar no WhatsApp";
    status.appendChild(a);
    try { window.open(url, "_blank", "noopener"); } catch (err) {}
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
