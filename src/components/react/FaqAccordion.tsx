import { useState } from "react";

const tabs = ["Costi & Prezzi", "Tempi & Processo", "Servizi", "Aspetti Tecnici", "Supporto & Garanzie"];

const faqData: Record<string, { question: string; answer: string }[]> = {
  "Costi & Prezzi": [
    { question: "Ok, ma quanto costa davvero?", answer: "Tra i 1.000€ e i 6.000€. Dipende dalla tipologia di sito (un monopagina non può costare quanto un e-commerce da 5000 prodotti). È come scegliere tra una Panda e una Tesla: entrambe ti portano a destinazione, ma l'esperienza è diversa." },
    { question: "Ma poi devo pagare hosting, dominio e altre cose strane?", answer: "Dominio sì (15€/anno), hosting dipende. Puoi usare il tuo o il nostro (99€/anno). Nessun costo nascosto, nessuna sorpresa. Il sito è TUO, non sei legato a noi." },
    { question: "Mi importate anche i prodotti nell'e-commerce?", answer: "L'importazione prodotti è un servizio separato. Creiamo la struttura perfetta, ma caricare 5000 prodotti è un altro lavoro. Possiamo farlo, ma ha un costo a parte." },
    { question: "Mi portate clienti automatici?", answer: "NO. I nostri siti sono studiati per convertire, non per fare magie. Possiamo fare stime e previsioni, ma dipende da troppi fattori. Siamo onesti: se vuoi certezze assolute sui clienti, non le avrai da noi." },
  ],
  "Tempi & Processo": [
    { question: "In quanto tempo? No, davvero.", answer: "2-4 settimane. SE CI CONDIVIDI TUTTO IN TEMPO, FIRMI LE REVISIONI E NON FAI RIPENSAMENTI. Siamo più veloci delle tue idee. Se hai fretta per una fiera, dillo subito e troviamo il modo di comunicare." },
    { question: "Cosa mi serve per partire?", answer: "Pochissimo: un'idea chiara di cosa vuoi ottenere, qualche contenuto base (anche provvisorio) e voglia di collaborare. Il resto lo costruiamo insieme." },
    { question: "Come comunicate? Non ci capisco niente di tecnico...", answer: "Parliamo italiano, non tecnichese. Spirito di iniziativa nostro, comunicazione semplice e personale sempre. Se non capisci qualcosa, è colpa nostra." },
    { question: "E se il sito non mi piace?", answer: "Non succede. Procediamo a step e tu approvi ogni fase, quindi te ne accorgi subito se stiamo andando nella direzione sbagliata. In tal caso modifichiamo finché non ti piace." },
  ],
  "Servizi": [
    { question: "Fate solo siti o anche il resto?", answer: "Solo siti e app, con una grandissima visione d'insieme su marketing e business. Sapremmo fare altro (infatti molti clienti diventano partner), ma sarebbe una bugia dire che siamo specializzati in altri servizi." },
    { question: "WordPress, Shopify o cosa?", answer: "Dipende. WordPress per flessibilità, Shopify/WooCommerce per e-commerce puro, Framer/Webflow per chi vuole il wow effect, React per app. Non sai cosa scegliere? Ti guidiamo noi." },
    { question: "SEO inclusa?", answer: "Le basi SEO sempre. Per scalare Google e vivere solo di quello, ti presentiamo i nostri contatti specializzati. Siamo onesti: è un altro mestiere." },
    { question: "E le foto?", answer: "Quelle stock le mettiamo noi (e non ti consigliamo di mettere foto modificate con l'ai). Per foto e shooting personalizzati, purtroppo non abbiamo ancora contatti validi da consigliarvi, ma ci stiamo lavorando." },
    { question: "Il mio logo fa schifo, lo rifate?", answer: "Se è veramente messo male ci mettiamo una mano veloce, giusto per non avere un pugno nell'occhio sul sito. Ma non siamo un'agenzia di logo design, solo un aiutino per coerenza grafica." },
  ],
  "Aspetti Tecnici": [
    { question: "Il sito rimane mio o è vostro?", answer: "È TUO al 100%. Codice, design, contenuti, tutto. Puoi hostarlo dove vuoi, gestirlo come vuoi. Non sei ostaggio nostro, mai." },
    { question: "Posso modificarlo da solo o devo chiamarvi ogni volta?", answer: "Ti insegniamo tutto. Ma se dopo 3 mesi chiami ancora per cambiare una virgola, ti mandiamo un video tutorial personalizzato con dedica." },
    { question: "Non so scegliere tra WordPress, Shopify, Framer...", answer: "Non devi saperlo tu, per questo ci siamo noi. Ascoltiamo le tue esigenze e ti orientiamo verso la soluzione migliore. Siamo i tuoi trusted advisor, non venditori." },
  ],
  "Supporto & Garanzie": [
    { question: "Perché dovrei scegliere voi e non l'agenzia sotto casa?", answer: "Perché non siamo un'agenzia. Siamo un team di professionisti che hanno unito le forze. Poche persone che amano quello che fanno e si vede nei risultati." },
    { question: "E se il mio progetto vi piace davvero?", answer: "Potremmo proporti di diventare partner. È successo già 3 volte. Il rapporto umano per noi vale più del contratto." },
  ],
};

export default function FaqAccordion() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = faqData[activeTab] || [];

  return (
    <div>
      {/* Tab pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setOpenIndex(null); }}
            className="relative cursor-pointer overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.03em] transition-colors duration-500"
            style={{
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#000" : "rgba(255,255,255,0.5)",
              border: activeTab === tab ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: "#fff",
                transform: activeTab === tab ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
            <span className="relative z-[1]">{tab}</span>
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="flex flex-col">
        {questions.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={`${activeTab}-${i}`}
              style={{ animation: `fadeSlideIn 0.4s ease ${i * 0.06}s both` }}
            >
              <div className="h-px w-full bg-white/10" />
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/50">
                    {i + 1}
                  </div>
                  <span className="text-base font-semibold text-white md:text-lg">{faq.question}</span>
                </div>
                {/* +/- button */}
                <div className="relative ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center">
                  <div className="h-px w-3 bg-white transition-opacity duration-300" />
                  <div
                    className="absolute h-3 w-px bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="pb-6 pl-11">
                  <p className="text-sm leading-[170%] text-white/50 md:text-base">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-px w-full bg-white/10" />
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
