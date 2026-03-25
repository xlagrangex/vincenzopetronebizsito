import { useState } from "react";

const rows = [
  {
    id: "specializzazione",
    label: "Specializzazione",
    freelancer: "Solo design/creatività, senza strategia",
    agency: 'Siti vetrina "pronti all\'uso" ma poco performanti',
    bigCompany: "Servizi generalisti (social, grafica, web, pubblicità…)",
    bizstudio: "Solo siti web strategici",
    details: "BizStudio si occupa ESCLUSIVAMENTE di siti web strategici: belli, veloci e orientati al business. Non facciamo social, grafica o pubblicità - solo siti che convertono visitatori in clienti.",
  },
  {
    id: "rapporto",
    label: "Rapporto & Comunicazione",
    freelancer: "WhatsApp instabile",
    agency: "Telefonate saltuarie",
    bigCompany: "Ticket impersonali, linguaggio tecnico",
    bizstudio: "Consulente dedicato",
    details: "Hai un consulente dedicato che traduce il tecnico in semplice, ti ascolta e ti guida con trasparenza. Comunicazione chiara, diretta, onesta.",
  },
  {
    id: "pagamento",
    label: "Pagamento",
    freelancer: "100% in anticipo",
    agency: "Anticipo + saldo (spesso con costi nascosti)",
    bigCompany: "Canoni vincolanti e clausole nascoste",
    bizstudio: "Pagamento a fasi",
    details: "Paghi solo dopo approvazione scritta di ogni step. Non devi mai versare l'intero importo in anticipo.",
  },
  {
    id: "velocita",
    label: "Velocità Consegna",
    freelancer: "1–3 mesi (se non sparisce)",
    agency: "1–3 mesi, tempi incerti",
    bigCompany: "2–6 mesi (processi lenti e burocratici)",
    bizstudio: "7–30 giorni",
    details: "Consegniamo in 7-30 giorni grazie al nostro metodo a fasi ottimizzato. Richiediamo collaborazione attiva.",
  },
  {
    id: "approccio",
    label: "Approccio Strategico",
    freelancer: "Estetico, senza pensare al ritorno",
    agency: "Tecnico, senza focus sul cliente finale",
    bigCompany: "Dispersivo (fanno di tutto, senza focus profondo)",
    bizstudio: "Business-centrico + conversioni",
    details: "Analizziamo il tuo business, studiamo la psicologia del consumatore e ottimizziamo ogni elemento per massimizzare le conversioni.",
  },
  {
    id: "fiducia",
    label: "Fiducia & Trasparenza",
    freelancer: "Rischio alto (può sparire)",
    agency: "Costi nascosti, poca chiarezza contrattuale",
    bigCompany: "Contratti rigidi e cavilli",
    bizstudio: "Contratti chiari, zero sorprese",
    details: "Contratti semplici e chiari, senza clausole nascoste. Se non possiamo fare qualcosa, te lo diciamo subito.",
  },
  {
    id: "revisioni",
    label: "Revisioni",
    freelancer: "1–2 round poi extra",
    agency: "1–2 inclusi",
    bigCompany: "3–5 inclusi",
    bizstudio: "Revisioni illimitate",
    details: "Revisioni illimitate fino alla consegna finale, MA con una condizione chiara: devi rispettare i tempi di risposta concordati.",
  },
  {
    id: "supporto",
    label: "Supporto Post-Lancio",
    freelancer: "Quasi nullo",
    agency: "Scarso o assente",
    bigCompany: "Pacchetti costosi e vincolanti",
    bizstudio: "90 giorni inclusi + supporto a vita",
    details: "90 giorni di supporto completo inclusi. Dopo: assistenza tecnica base sempre gratuita per tutta la vita.",
  },
  {
    id: "garanzie",
    label: "Garanzie",
    freelancer: "Nessuna",
    agency: "Minime",
    bigCompany: "Standard generici",
    bizstudio: "Soddisfazione garantita",
    details: "Se il sito finale non rispetta quanto concordato, lo rifacciamo completamente gratis oppure non lo paghi.",
  },
];

export default function ComparisonTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          {/* Gradient column background — positioned over the last 20% of the table */}
          <div
            className="pointer-events-none absolute right-0 top-0 z-0 h-full w-[20%]"
            style={{ background: "linear-gradient(180deg, #1B4088 0%, #A51B80 50%, #DA5713 100%)" }}
          />

          <table className="relative z-[1] w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-white/10 bg-transparent px-6 py-5 text-left font-medium text-white/50 w-[20%]"></th>
                <th className="border-b border-white/10 bg-transparent px-6 py-5 text-left font-bold uppercase tracking-[0.1em] text-white/60 text-xs w-[20%]">Freelancer</th>
                <th className="border-b border-white/10 bg-transparent px-6 py-5 text-left font-bold uppercase tracking-[0.1em] text-white/60 text-xs w-[20%]">Web Agency</th>
                <th className="border-b border-white/10 bg-transparent px-6 py-5 text-left font-bold uppercase tracking-[0.1em] text-white/60 text-xs w-[20%]">Grande Azienda</th>
                <th className="border-b border-white/20 px-6 py-5 text-left w-[20%]">
                  <img src="/images/bizstudio-logo-white.png" alt="BizStudio" className="h-6" />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border-b border-white/5 bg-transparent px-6 py-5 font-bold text-white text-[0.8125rem]">
                    {row.label}
                  </td>
                  <td className="border-b border-white/5 bg-transparent px-6 py-5 text-white/40 text-[0.8125rem]">{row.freelancer}</td>
                  <td className="border-b border-white/5 bg-transparent px-6 py-5 text-white/40 text-[0.8125rem]">{row.agency}</td>
                  <td className="border-b border-white/5 bg-transparent px-6 py-5 text-white/40 text-[0.8125rem]">{row.bigCompany}</td>
                  <td className="border-b border-white/10 px-6 py-5 text-[0.8125rem]">
                    <button
                      onClick={() => setOpenId(openId === row.id ? null : row.id)}
                      className="flex w-full cursor-pointer items-center justify-between text-left"
                    >
                      <span className="font-semibold text-white">{row.bizstudio}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className={`ml-2 flex-shrink-0 transition-transform duration-300 ${openId === row.id ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        maxHeight: openId === row.id ? "200px" : "0px",
                        opacity: openId === row.id ? 1 : 0,
                        marginTop: openId === row.id ? "8px" : "0px",
                      }}
                    >
                      <p className="text-sm leading-relaxed text-white/70">{row.details}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {rows.map((row) => (
          <div key={row.id} className="overflow-hidden rounded-2xl border border-white/10">
            <div className="bg-transparent p-5">
              <div className="mb-3 text-sm font-bold text-white">{row.label}</div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold uppercase tracking-wider text-white/30">Freelancer</span>
                  <span className="text-right text-white/40">{row.freelancer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold uppercase tracking-wider text-white/30">Agency</span>
                  <span className="text-right text-white/40">{row.agency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold uppercase tracking-wider text-white/30">Grande Azienda</span>
                  <span className="text-right text-white/40">{row.bigCompany}</span>
                </div>
              </div>
            </div>
            <div
              className="p-5"
              style={{ background: "linear-gradient(135deg, #1B4088, #A51B80 50%, #DA5713)" }}
            >
              <button
                onClick={() => setOpenId(openId === row.id ? null : row.id)}
                className="flex w-full cursor-pointer items-center justify-between"
              >
                <span className="text-sm font-semibold text-white">{row.bizstudio}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${openId === row.id ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  maxHeight: openId === row.id ? "200px" : "0px",
                  opacity: openId === row.id ? 1 : 0,
                  marginTop: openId === row.id ? "8px" : "0px",
                }}
              >
                <p className="text-sm leading-relaxed text-white/70">{row.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
