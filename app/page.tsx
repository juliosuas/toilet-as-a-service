"use client";

import { useEffect, useState } from "react";

const launchCopy =
  "La economía de la atención encontró lo último que quedaba: tu urgencia. Mira 12 segundos. Desbloquea 4 minutos. Toilet as a Service.";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [seconds, setSeconds] = useState(12);
  const [toast, setToast] = useState("");
  const unlocked = seconds === 0;

  useEffect(() => {
    if (!demoOpen || seconds <= 0) return;
    const timer = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [demoOpen, seconds]);

  useEffect(() => {
    if (!demoOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDemoOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [demoOpen]);

  function openDemo() {
    setSeconds(12);
    setDemoOpen(true);
  }

  async function shareExperience() {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share) {
        await navigator.share({ title: "Toilet as a Service", text: launchCopy, url });
      } else {
        await navigator.clipboard.writeText(`${launchCopy} ${url}`);
      }
      setToast("Copy y enlace listos. La urgencia ya es contenido.");
    } catch {
      setToast("Compartir cancelado.");
    }
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <main>
      <section className="hero" id="inicio">
        <div className="hero-image" role="img" aria-label="Cabina urbana de Toilet as a Service durante la noche" />
        <div className="hero-shade" />

        <nav className="nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="Toilet as a Service, inicio">
            <span className="brand-mark">T/</span>
            <span>TOILET AS A SERVICE</span>
          </a>
          <div className="nav-meta">
            <span>CDMX · 2026</span>
            <a href="/press">PRESS KIT</a>
          </div>
        </nav>

        <div className="hero-copy">
          <div className="eyebrow"><i /> INFRAESTRUCTURA FINANCIADA POR ATENCIÓN</div>
          <h1>Mira 12 segundos.<br /><em>Desbloquea 4 minutos.</em></h1>
          <p>Baños públicos impecables. Acceso inmediato. Un intercambio incómodamente simple.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={openDemo}>DESBLOQUEAR DEMO <span>↗</span></button>
            <button className="quiet-action" onClick={shareExperience}>COMPARTIR LANZAMIENTO</button>
          </div>
        </div>

        <aside className="live-unit" aria-label="Estado de la unidad más cercana">
          <div><span>UNIDAD</span><b>WC—044</b></div>
          <div><span>DISTANCIA</span><b>84 M</b></div>
          <div><span>ESTADO</span><b className="available">DISPONIBLE</b></div>
        </aside>

        <div className="satire-label">SÁTIRA INTERACTIVA · NO EXISTEN CABINAS REALES</div>
      </section>

      <section className="manifesto section-shell">
        <p className="section-index">01 / LA TESIS</p>
        <div>
          <h2>Internet monetizó tu atención.<br />Nosotros encontramos lo que faltaba.</h2>
          <p className="manifesto-copy">TaaS imagina infraestructura urbana patrocinada por anuncios imposibles de omitir. No es una startup. Todavía.</p>
        </div>
      </section>

      <section className="protocol" id="protocolo">
        <div className="protocol-frame">
          <div className="protocol-heading">
            <p className="section-index">02 / PROTOCOLO DE ACCESO</p>
            <h2>La urgencia,<br />convertida en flujo.</h2>
          </div>
          <div className="protocol-steps">
            <article>
              <span>01</span>
              <div className="map-visual" aria-hidden="true"><i /><i /><i /><b>84 m</b></div>
              <h3>ENCUENTRA</h3>
              <p>La unidad disponible aparece antes de que sea demasiado tarde.</p>
            </article>
            <article className="yellow-step">
              <span>02</span>
              <div className="timer-visual" aria-hidden="true"><small>ANUNCIO EN CURSO</small><b>00:12</b><i /></div>
              <h3>MIRA</h3>
              <p>Doce segundos de atención. Sin skip. Sin letra pequeña.</p>
            </article>
            <article>
              <span>03</span>
              <div className="unlock-visual" aria-hidden="true"><i>✓</i><b>04:00</b><small>ACCESO CONCEDIDO</small></div>
              <h3>ENTRA</h3>
              <p>La puerta se abre. Tu dignidad conserva un recibo.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="demo-section section-shell">
        <div className="demo-statement">
          <p className="section-index">03 / PRUEBA DE CONCEPTO</p>
          <h2>Product–market fit.<br /><em>Biológico.</em></h2>
          <p>Una demostración local de 12 segundos. No pedimos ubicación, correo ni tarjeta.</p>
          <button className="primary-action dark" onClick={openDemo}>INICIAR SIMULACIÓN <span>↗</span></button>
        </div>
        <div className="receipt-preview" aria-label="Ejemplo de recibo de acceso">
          <div className="receipt-top"><span>T/ ACCESS RECEIPT</span><span>#WC044</span></div>
          <div className="receipt-score"><small>URGENCY SCORE</small><b>94</b><span>/100</span></div>
          <dl>
            <div><dt>ATTENTION SPENT</dt><dd>00:12</dd></div>
            <div><dt>RELIEF UNLOCKED</dt><dd>04:00</dd></div>
            <div><dt>DATA COLLECTED</dt><dd>NONE</dd></div>
          </dl>
          <p>THIS RECEIPT CERTIFIES THAT ONE BASIC HUMAN NEED WAS TEMPORARILY CONVERTED INTO MEDIA INVENTORY.</p>
        </div>
      </section>

      <section className="closing">
        <p>TOILET AS A SERVICE™</p>
        <h2>EL FUTURO NO<br />SE PUEDE OMITIR.</h2>
        <button onClick={shareExperience}>PUBLICAR LA IDEA <span>↗</span></button>
      </section>

      <footer className="footer">
        <div className="brand"><span className="brand-mark">T/</span><span>TOILET AS A SERVICE</span></div>
        <p>Proyecto conceptual independiente sobre infraestructura, privacidad y economía de la atención.</p>
        <div><a href="/press">PRESS KIT</a><a href="https://github.com/juliosuas/toilet-as-a-service">GITHUB ↗</a></div>
        <small>Sin cabinas. Sin pagos. Sin recolección de datos. Ciudad de México · 2026.</small>
      </footer>

      {demoOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDemoOpen(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
            <button className="modal-close" aria-label="Cerrar simulación" onClick={() => setDemoOpen(false)}>×</button>
            {!unlocked ? (
              <>
                <div className="modal-header"><span>MENSAJE DEL PATROCINADOR FICTICIO</span><span>NO SE PUEDE OMITIR</span></div>
                <div className="ad-creative"><small>FIBRA PRIME®</small><h2>QUE MAÑANA<br />NO TE SORPRENDA.</h2><p>Decisiones que se sienten.</p></div>
                <div className="progress"><i style={{ width: `${((12 - seconds) / 12) * 100}%` }} /></div>
                <div className="countdown"><span>ACCESO EN</span><b>{String(seconds).padStart(2, "0")}</b><small>SEGUNDOS</small></div>
                <button className="priority-access" onClick={() => setSeconds(0)}>ACCESO PRIORITARIO · OMITIR SÁTIRA</button>
              </>
            ) : (
              <div className="unlock-state">
                <span className="unlock-check">✓</span>
                <p>WC—044 · ACCESO CONCEDIDO</p>
                <h2 id="demo-title">Intercambiaste atención<br />por una necesidad básica.</h2>
                <div className="mini-receipt"><span>URGENCY SCORE</span><b>94/100</b><small>12s VISTOS · 04:00 DESBLOQUEADOS</small></div>
                <p className="disclosure">TaaS es una sátira interactiva. La cabina no existe. El modelo de negocio sí podría.</p>
                <button className="primary-action" onClick={shareExperience}>COMPARTIR MI RECIBO <span>↗</span></button>
              </div>
            )}
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}<button onClick={() => setToast("")}>×</button></div>}
    </main>
  );
}
