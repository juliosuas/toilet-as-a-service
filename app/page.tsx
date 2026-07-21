"use client";

import { useEffect, useState } from "react";

const testimonials = [
  { quote: "Llegué con 3% de batería y 0% de dignidad. Funcionó.", name: "M. Duarte", role: "Reacción ficticia · CDMX" },
  { quote: "Por fin monetizamos el tiempo muerto del cliente.", name: "L. Serrano", role: "Personaje del piloto conceptual" },
  { quote: "El anuncio fue raro, pero el baño estaba impecable.", name: "Sofía R.", role: "Reacción ficticia · Flush+" },
];

const shareCopy = "Aguanté 12 segundos de publicidad para desbloquear un baño que no existe. Lo preocupante es que el modelo sí podría existir.";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [seconds, setSeconds] = useState(12);
  const [toast, setToast] = useState("");
  const [vote, setVote] = useState<"inevitable" | "absurdo" | null>(null);
  const unlocked = seconds === 0;

  useEffect(() => {
    if (!demoOpen || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [demoOpen, seconds]);

  useEffect(() => {
    if (!demoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDemoOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [demoOpen]);

  function openDemo() {
    setSeconds(12);
    setDemoOpen(true);
  }

  function reserve() {
    setToast("Simulación finalizada. Ninguna vejiga fue monetizada.");
    window.setTimeout(() => setToast(""), 3500);
    setDemoOpen(false);
  }

  async function shareExperience() {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share) {
        await navigator.share({ title: "Toilet as a Service", text: shareCopy, url });
        setToast("Experimento compartido. La distopía te agradece.");
      } else {
        await navigator.clipboard.writeText(`${shareCopy} ${url}`);
        setToast("Enlace y copy copiados.");
      }
    } catch {
      setToast("Compartir cancelado. Tu dignidad permanece intacta.");
    }
    window.setTimeout(() => setToast(""), 3500);
  }

  return (
    <main>
      <nav className="nav shell" aria-label="Navegación principal">
        <a href="#inicio" className="brand" aria-label="TaaS, inicio"><span className="brand-mark">T/</span><span>TOILET AS A SERVICE</span></a>
        <div className="nav-links"><a href="#como">Cómo funciona</a><a href="#negocios">Para negocios</a><a href="#planes">Precios</a></div>
        <button className="button button-small" onClick={openDemo}>Encontrar un baño <span>↗</span></button>
      </nav>

      <section className="hero shell" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> PROTOTIPO INTERACTIVO · RED SIMULADA</div>
          <h1>El alivio,<br /><em>patrocinado.</em></h1>
          <p className="hero-lede">Baños limpios donde los necesitas. Mira un anuncio breve, desbloquea la puerta y sigue con tu día.</p>
          <div className="hero-actions"><button className="button button-primary" onClick={openDemo}>Iniciar simulación <span>↗</span></button><a className="text-link" href="#como">Ver cómo funciona <span>↓</span></a></div>
          <div className="trust"><div className="faces"><span>AM</span><span>JR</span><span>LS</span><span>+9k</span></div><div><b>4.9</b> <span className="stars">★★★★★</span><small>valor ilustrativo del piloto conceptual</small></div></div>
        </div>

        <div className="hero-console" aria-label="Estado del baño más cercano">
          <div className="console-top"><span>SIMULACIÓN · WC—044</span><span className="status"><i /> DISPONIBLE</span></div>
          <div className="console-visual">
            <div className="door"><div className="door-number">044</div><div className="handle" /><div className="scan-line" /></div>
            <div className="distance"><b>84</b><span>m<br />de ti</span></div>
          </div>
          <div className="console-data"><div><span>HIGIENE</span><b>98%</b></div><div><span>ESPERA</span><b>0:00</b></div><div><span>ACCESO</span><b>12s ad</b></div></div>
          <button className="console-button" onClick={openDemo}><span>DESBLOQUEAR UNIDAD</span><b>↗</b></button>
          <p>Al continuar aceptas que la urgencia puede ser utilizada para personalizar tu experiencia publicitaria.</p>
        </div>
      </section>

      <section className="ticker" aria-label="Beneficios"><div>ACCESO 24/7 <span>•</span> LIMPIEZA CERTIFICADA <span>•</span> SIN EFECTIVO <span>•</span> PUBLICIDAD RELEVANTE* <span>•</span> PAPEL GARANTIZADO** <span>•</span> ACCESO 24/7 <span>•</span> LIMPIEZA CERTIFICADA</div></section>

      <section className="share-strip shell" aria-label="Compartir el experimento"><div><span>¿ABSURDO O INEVITABLE?</span><p>{vote ? (vote === "inevitable" ? "Inevitable. Eso es lo preocupante." : "Absurdo. Por ahora.") : "Decide después de probarlo."}</p></div><div className="share-actions"><button aria-pressed={vote === "inevitable"} onClick={() => setVote("inevitable")}>Inevitable</button><button aria-pressed={vote === "absurdo"} onClick={() => setVote("absurdo")}>Absurdo</button><button className="share-primary" onClick={shareExperience}>Compartir ↗</button></div></section>

      <section className="steps shell section" id="como">
        <div className="section-kicker">01 / PROTOCOLO DE ALIVIO</div>
        <div className="section-heading"><h2>Tres pasos.<br />Cero monedas.</h2><p>Convertimos cada pausa necesaria en un intercambio de valor simple, medible y extrañamente inevitable.</p></div>
        <div className="step-grid">
          <article><span className="step-no">01</span><div className="mini-ui map-ui"><i /><i /><i /><b>84 m</b></div><h3>Encuentra</h3><p>Ubica la cabina disponible más cercana. El color verde significa que todavía llegas.</p></article>
          <article><span className="step-no">02</span><div className="mini-ui ad-ui"><span>PUBLICIDAD</span><b>00:12</b><div><i /></div><small>No se puede omitir</small></div><h3>Mira</h3><p>Disfruta un mensaje cuidadosamente seleccionado según tu ubicación y nivel de urgencia.</p></article>
          <article><span className="step-no">03</span><div className="mini-ui unlock-ui"><div className="unlock-ring"><span>✓</span></div><b>ACCESO CONCEDIDO</b><small>04:00 restantes</small></div><h3>Alíviate</h3><p>Tu pase abre la puerta durante cuatro minutos. Tiempo adicional sujeto a patrocinio.</p></article>
        </div>
      </section>

      <section className="metrics section" id="negocios">
        <div className="shell metrics-inner"><div className="section-kicker light">02 / MODELO DE IMPACTO · DATOS SIMULADOS</div><div className="metrics-head"><h2>Cuando la naturaleza llama,<br /><em>tu marca contesta.</em></h2><p>Escenario ilustrativo de una red hipotética. Ninguna cifra representa operaciones reales.</p></div>
          <div className="metric-grid"><div><b>97.8%</b><span>view-through rate</span></div><div><b>12.4s</b><span>atención promedio</span></div><div><b>3.2M</b><span>impresiones inevitables</span></div><div><b>0.4%</b><span>abandono de sesión</span></div></div>
          <div className="quote"><p>“El contexto perfecto no existe. Pero hay momentos en los que nadie puede mirar a otro lado.”</p><span>ANA BAÑOS · PERSONAJE FICTICIO DEL CONCEPTO</span></div>
        </div>
      </section>

      <section className="pricing shell section" id="planes">
        <div className="section-kicker">03 / ELIGE TU NIVEL DE PRIVACIDAD</div>
        <div className="section-heading"><h2>Tu necesidad.<br />Tus términos.*</h2><p>Acceso básico sin costo. O paga para que ninguna marca sepa que hoy comiste picante.</p></div>
        <div className="price-grid">
          <article><div><span className="plan">AD—SUPPORTED</span><h3>Free Flush</h3><p>Para necesidades espontáneas.</p></div><div className="price"><b>$0</b><span>MXN / acceso</span></div><ul><li>1 anuncio de 12–30 segundos</li><li>4 minutos de acceso</li><li>Papel estándar incluido</li><li>Audio obligatorio</li></ul><button onClick={openDemo}>Usar gratis <span>↗</span></button></article>
          <article className="featured"><div className="popular">MÁS ELEGIDO</div><div><span className="plan">MEMBRESÍA</span><h3>Flush+</h3><p>Acceso frecuente sin interrupciones.</p></div><div className="price"><b>$79</b><span>MXN / mes · hipotético</span></div><ul><li>Acceso sin anuncios</li><li>10 minutos por sesión</li><li>Papel de doble hoja</li><li>Modo incógnito sanitario</li></ul><button onClick={openDemo}>Ver demo de Flush+ <span>↗</span></button></article>
          <article><div><span className="plan">EMPRESAS</span><h3>Fleet Relief</h3><p>Convierte metros cuadrados en ingresos.</p></div><div className="price"><b>A medida</b><span>concepto para operadores</span></div><ul><li>Panel de ocupación</li><li>Marca de cabina</li><li>Participación publicitaria</li><li>SLA de papel 99.9%</li></ul><button onClick={() => document.querySelector("#press")?.scrollIntoView({ behavior: "smooth" })}>Ver propuesta conceptual <span>↗</span></button></article>
        </div><p className="fineprint">* Tus términos pueden incluir los nuestros. Cargo de $4.99 MXN por minuto extra. El papel garantizado requiere consentimiento de cookies.</p>
      </section>

      <section className="testimonials shell section"><div className="section-kicker">04 / DESCARGA SOCIAL</div><div className="testimonial-grid">{testimonials.map((item) => <figure key={item.name}><div className="quote-mark">“</div><blockquote>{item.quote}</blockquote><figcaption><b>{item.name}</b><span>{item.role}</span></figcaption></figure>)}</div></section>

      <section className="press-room shell section" id="press"><div className="section-kicker">05 / PRESS ROOM</div><div className="press-grid"><div><h2>Una idea absurda.<br /><em>Demasiado plausible.</em></h2><p>TaaS es una sátira interactiva sobre la monetización de necesidades básicas, creada en Ciudad de México.</p></div><div className="press-card"><span>LA LÍNEA EN 15 PALABRAS</span><b>Una startup convierte la urgencia humana en atención publicitaria medible.</b><button onClick={shareExperience}>Compartir el experimento ↗</button><a href="/og.png" download>Descargar imagen de prensa ↓</a></div></div></section>

      <section className="cta"><div className="shell cta-inner"><div><span>ESCENARIO DE DEMOSTRACIÓN · 12 UNIDADES</span><h2>No aguantes<br /><em>el futuro.</em></h2></div><button className="cta-button" onClick={openDemo}><span>INICIAR SIMULACIÓN</span><b>↗</b></button></div></section>

      <footer className="footer shell" id="disclosure"><div className="brand"><span className="brand-mark">T/</span><span>TOILET AS A SERVICE</span></div><p>Sanitation, monetized responsibly™</p><div><a href="#disclosure">Privacidad: no recopilamos datos</a><a href="/press">Prensa</a><a href="#negocios">Concepto para negocios</a></div><small>Proyecto conceptual independiente · Ciudad de México · 2026<br />Sátira sobre infraestructura, privacidad y economía de la atención. No hay cabinas reales.</small></footer>

      {demoOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setDemoOpen(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-title"><button className="modal-close" aria-label="Cerrar simulación" onClick={() => setDemoOpen(false)}>×</button>{!unlocked ? <><div className="ad-label">DEMO INTERACTIVA · MENSAJE DEL PATROCINADOR FICTICIO</div><div className="ad-creative"><span>FIBRA<br />PRIME</span><p>Decisiones que se sienten<br /><b>mañana.</b></p></div><div className="ad-progress" role="progressbar" aria-label="Progreso del anuncio" aria-valuemin={0} aria-valuemax={12} aria-valuenow={12 - seconds}><div style={{ width: `${((12 - seconds) / 12) * 100}%` }} /></div><h2 id="demo-title">Tu alivio comienza en <b>{seconds}s</b></h2><p className="modal-copy">Simulación local. No se recopila ubicación ni información personal.</p><button className="emergency-access" onClick={() => setSeconds(0)}>Acceso prioritario sin publicidad</button></> : <><div className="success-ring">✓</div><div className="ad-label">IDENTIDAD DE VEJIGA VERIFICADA · RECIBO #WC044</div><h2 id="demo-title">Sobreviviste <b>12 segundos</b> de publicidad.</h2><p className="reveal-copy">Acabas de intercambiar atención por una necesidad básica. TaaS es una sátira interactiva: no hay una cabina detrás de esta pantalla. La economía de la atención sí existe.</p><div className="receipt"><span>URGENCY SCORE</span><b>94/100</b><small>WC—044 · CDMX · SIMULACIÓN</small></div><button className="button button-primary full" onClick={shareExperience}>Compartir mi pase <span>↗</span></button><button className="button full secondary" onClick={reserve}>Finalizar simulación</button></>}</section></div>}
      {toast && <div className="toast" role="status">{toast}<button onClick={() => setToast("")}>×</button></div>}
    </main>
  );
}
