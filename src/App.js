import React, { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0a;
    color: #e8e6e0;
    min-height: 100vh;
  }

  .app {
    max-width: 980px;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }

  .header { margin-bottom: 32px; }
  .header h1 { font-size: 22px; font-weight: 600; letter-spacing: -0.4px; color: #f0ede6; }
  .header p  { font-size: 13px; color: #555; margin-top: 4px; }

  .add-form {
    display: flex;
    gap: 8px;
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 12px;
    align-items: center;
  }
  .add-form input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    color: #e8e6e0;
    background: transparent;
  }
  .add-form input::placeholder { color: #444; }

  .btn-add {
    background: #e8e6e0;
    color: #0a0a0a;
    border: none;
    border-radius: 7px;
    padding: 7px 16px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: opacity .15s;
    white-space: nowrap;
  }
  .btn-add:hover { opacity: .8; }

  .toolbar { display: flex; gap: 8px; margin-bottom: 12px; }
  .toolbar input {
    flex: 1;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    background: #141414;
    color: #e8e6e0;
    outline: none;
    transition: border-color .15s;
  }
  .toolbar input:focus { border-color: #555; }

  .msg-bar { display: flex; gap: 8px; margin-bottom: 6px; }
  .msg-bar input {
    flex: 1;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 13px;
    font-family: 'DM Mono', monospace;
    background: #141414;
    color: #e8e6e0;
    outline: none;
    transition: border-color .15s;
  }
  .msg-bar input:focus { border-color: #555; }

  .btn-send {
    border: 1px solid #2a2a2a;
    background: #141414;
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    color: #e8e6e0;
    transition: background .15s;
    white-space: nowrap;
  }
  .btn-send:hover { background: #1e1e1e; }

  .hint {
    font-size: 11px;
    color: #444;
    margin-bottom: 28px;
    font-family: 'DM Mono', monospace;
  }

  .section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 8px;
    padding-left: 2px;
  }

  .table-wrap {
    background: #111;
    border: 1px solid #222;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  table { width: 100%; border-collapse: collapse; font-size: 13px; }

  thead th {
    padding: 10px 14px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #444;
    background: #0e0e0e;
    border-bottom: 1px solid #222;
  }

  tbody tr { border-bottom: 1px solid #1a1a1a; transition: background .1s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #161616; }
  tbody tr.done-row { opacity: .35; }

  td { padding: 10px 14px; vertical-align: middle; }
  .check-cell { width: 36px; }

  .checkbox {
    width: 16px;
    height: 16px;
    border: 1.5px solid #333;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition: all .15s;
  }
  .checkbox.checked { background: #e8e6e0; border-color: #e8e6e0; }
  .checkbox.checked::after {
    content: '';
    display: block;
    width: 8px;
    height: 5px;
    border-left: 1.5px solid #0a0a0a;
    border-bottom: 1.5px solid #0a0a0a;
    transform: rotate(-45deg) translate(0, 1px);
  }

  .patient-name { font-weight: 500; color: #f0ede6; font-size: 14px; }

  .pill {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }
  .pill-green { background: #0d2b12; color: #4ade80; }
  .pill-gray  { background: #1a1a1a; color: #666; }
  .pill-amber { background: #2a1f08; color: #f59e0b; }
  .pill-blue  { background: #0d1a2e; color: #60a5fa; }

  .pill-sent {
    cursor: pointer;
    transition: opacity .15s, transform .1s;
    user-select: none;
  }
  .pill-sent:hover { opacity: .75; transform: scale(1.05); }

  .tbl-input {
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0a;
    color: #e8e6e0;
    outline: none;
    width: 60px;
    transition: border-color .15s;
  }
  .tbl-input:focus { border-color: #555; }

  .tbl-select {
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0a;
    color: #e8e6e0;
    outline: none;
    max-width: 150px;
    transition: border-color .15s;
  }
  .tbl-select:focus { border-color: #555; }

  .btn-loc {
    border: 1px solid #2a2a2a;
    background: #141414;
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    color: #888;
    transition: background .15s;
    white-space: nowrap;
  }
  .btn-loc:hover { background: #1e1e1e; color: #ccc; }

  .btn-del {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #333;
    font-size: 18px;
    padding: 2px 6px;
    border-radius: 4px;
    transition: color .15s;
    line-height: 1;
  }
  .btn-del:hover { color: #f87171; }

  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #e8e6e0;
    color: #0a0a0a;
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
    z-index: 99;
    white-space: nowrap;
  }
  .toast.show { opacity: 1; }

  .empty-row td {
    padding: 28px 14px;
    color: #333;
    font-size: 13px;
    text-align: center;
  }
`;

const initialPatients = [];

const nurseList = ["Enf. Alessandra", "Enf. Gabi", "Enf. Rodrigo", "Enf. Thiago", "Tranpostadora/Motorista"];
let nextId = 1;

function parseMessage(text) {
  const lower = text.toLowerCase();
  const result = {};
  const nameMatch = text.match(/^([A-ZÀ-Ú][a-zà-ú]+(?: [A-ZÀ-Ú][a-zà-ú]+)*)/);
  if (nameMatch) result.patientName = nameMatch[1];
  const volMatch = text.match(/(\d+)\s*vol/i);
  if (volMatch) result.volumes = parseInt(volMatch[1]);
  const nurseMatch = text.match(/enf\.?\s*([a-zà-ú]+)/i);
  if (nurseMatch) result.nurse = "Enf. " + nurseMatch[1].charAt(0).toUpperCase() + nurseMatch[1].slice(1);
  if (lower.includes("farmácia") || lower.includes("farmacia")) result.local = "farmácia";
  else if (lower.includes("almoxarifado")) result.local = "almoxarifado";
  return result;
}

export default function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch]     = useState("");
  const [msg, setMsg]           = useState("");
  const [newName, setNewName]   = useState("");
  const [toast, setToast]       = useState("");

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(""), 2500);
  }

  function addPatient() {
    const name = newName.trim();
    if (!name) return;
    setPatients(prev => [...prev, {
      id: nextId++, name, volumes: 0, sent: false, nurse: "", local: "almoxarifado", done: false
    }]);
    setNewName("");
    showToast("✓ Paciente adicionado: " + name);
  }

  function removePatient(id) {
    setPatients(prev => prev.filter(p => p.id !== id));
  }

  function handleMessage() {
    if (!msg.trim()) return;
    const parsed = parseMessage(msg);
    const idx = patients.findIndex(p =>
      parsed.patientName && p.name.toLowerCase().includes(parsed.patientName.toLowerCase())
    );
    if (idx === -1) { showToast("Paciente não encontrado."); return; }
    const updated = [...patients];
    const p = { ...updated[idx] };
    const changed = [];
    if (parsed.volumes !== undefined) { p.volumes = parsed.volumes; p.sent = p.volumes > 0; changed.push(parsed.volumes + " vol"); }
    if (parsed.nurse) { p.nurse = parsed.nurse; changed.push(parsed.nurse); }
    if (parsed.local) { p.local = parsed.local; changed.push(parsed.local); }
    updated[idx] = p;
    setPatients(updated);
    setMsg("");
    showToast("✓ " + p.name + ": " + changed.join(", "));
  }

  function update(id, field, value) {
    setPatients(prev => prev.map(p => {
      if (p.id !== id) return p;
      const u = { ...p, [field]: value };
      if (field === "volumes") u.sent = parseInt(value) > 0;
      return u;
    }));
  }

  function toggleSent(id) {
    setPatients(prev => prev.map(p =>
      p.id === id ? { ...p, sent: !p.sent } : p
    ));
  }

  function toggleLocal(id) {
    setPatients(prev => prev.map(p =>
      p.id === id ? { ...p, local: p.local === "almoxarifado" ? "farmácia" : "almoxarifado" } : p
    ));
  }

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const pending  = filtered.filter(p => !p.done);
  const done     = filtered.filter(p => p.done);

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="header">
          <h1>Checklist de Pacientes</h1>
          <p>{today}</p>
        </div>

        <div className="add-form">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addPatient()}
            placeholder="Nome do novo paciente..."
          />
          <button className="btn-add" onClick={addPatient}>+ Adicionar</button>
        </div>

        <div className="toolbar">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar paciente pelo nome..."
          />
        </div>

        <div className="msg-bar">
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleMessage()}
            placeholder="Ana — 3 volumes, Enf. Gabi, farmácia"
          />
          <button className="btn-send" onClick={handleMessage}>Enviar mensagem</button>
        </div>
        <p className="hint">formato: nome — N volumes, Enf. X, almoxarifado|farmácia</p>

        {patients.length === 0 && (
          <div className="table-wrap">
            <table><tbody><tr className="empty-row"><td>Nenhum paciente cadastrado. Adicione o primeiro acima.</td></tr></tbody></table>
          </div>
        )}

        {pending.length > 0 && (
          <>
            <div className="section-title">Pendentes — {pending.length}</div>
            <PatientTable patients={pending} update={update} toggleLocal={toggleLocal} toggleSent={toggleSent} removePatient={removePatient} />
          </>
        )}

        {done.length > 0 && (
          <>
            <div className="section-title">Concluídos — {done.length}</div>
            <PatientTable patients={done} update={update} toggleLocal={toggleLocal} toggleSent={toggleSent} removePatient={removePatient} isDone />
          </>
        )}

        {patients.length > 0 && filtered.length === 0 && (
          <div className="table-wrap">
            <table><tbody><tr className="empty-row"><td>Nenhum paciente encontrado.</td></tr></tbody></table>
          </div>
        )}

        <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
      </div>
    </>
  );
}

function PatientTable({ patients, update, toggleLocal, toggleSent, removePatient, isDone }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th className="check-cell"></th>
            <th>Paciente</th>
            <th>Volumes</th>
            <th>Envio</th>
            <th>Enfermeiro(a)</th>
            <th>Local</th>
            <th>Mover</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className={isDone ? "done-row" : ""}>
              <td className="check-cell">
                <div
                  className={`checkbox${p.done ? " checked" : ""}`}
                  onClick={() => update(p.id, "done", !p.done)}
                />
              </td>
              <td><span className="patient-name">{p.name}</span></td>
              <td>
                <input
                  type="number" min="0" value={p.volumes}
                  className="tbl-input"
                  onChange={e => update(p.id, "volumes", parseInt(e.target.value) || 0)}
                />
              </td>
              <td>
                <span
                  className={`pill pill-sent ${p.sent ? "pill-green" : "pill-gray"}`}
                  onClick={() => toggleSent(p.id)}
                  title="Clique para alternar"
                >
                  {p.sent ? "Enviado" : "Pendente"}
                </span>
              </td>
              <td>
                <select value={p.nurse} className="tbl-select" onChange={e => update(p.id, "nurse", e.target.value)}>
                  <option value="">— selecione —</option>
                  {nurseList.map(n => <option key={n}>{n}</option>)}
                </select>
              </td>
              <td>
                <span className={`pill ${p.local === "almoxarifado" ? "pill-amber" : "pill-blue"}`}>
                  {p.local}
                </span>
              </td>
              <td>
                <button className="btn-loc" onClick={() => toggleLocal(p.id)}>
                  {p.local === "almoxarifado" ? "→ Farmácia" : "→ Almoxarifado"}
                </button>
              </td>
              <td>
                <button className="btn-del" onClick={() => removePatient(p.id)} title="Remover">×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}