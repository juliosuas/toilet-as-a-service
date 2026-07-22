"use client";
/* eslint-disable @next/next/no-img-element -- Vinext image optimization returns 500 for local WebP assets. */

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type View = "rider" | "operator" | "brand";
type ReelScene = "locate" | "watch" | "unlock";
type FieldStudy = "street" | "unit" | "access";
type SocialChannel = "x" | "linkedin" | "reddit";

const views: Record<View, { label: string; eyebrow: string; title: string; copy: string; stat: string; statLabel: string }> = {
  rider: {
    label: "For people",
    eyebrow: "THE RIDER APP",
    title: "Find relief before it becomes a crisis.",
    copy: "See live availability, hygiene status, and walking time. One tap starts the access sequence.",
    stat: "84 m",
    statLabel: "nearest available unit",
  },
  operator: {
    label: "For cities",
    eyebrow: "THE OPERATING SYSTEM",
    title: "Public infrastructure that can fund itself.",
    copy: "Monitor usage, cleaning cycles, supplies, and uptime from one calm operational layer.",
    stat: "99.4%",
    statLabel: "simulated network uptime",
  },
  brand: {
    label: "For brands",
    eyebrow: "THE MEDIA NETWORK",
    title: "Twelve seconds of impossible-to-ignore context.",
    copy: "Sponsor access without collecting identity, browsing history, or precise movement data.",
    stat: "12 sec",
    statLabel: "fixed attention window",
  },
};

const reelScenes: Record<ReelScene, { index: string; label: string; title: string; copy: string; meta: string; aria: string }> = {
  locate: {
    index: "01",
    label: "Locate",
    title: "Relief appears on the map.",
    copy: "Live availability turns an urgent search into one obvious next move.",
    meta: "84 M · 01:12 WALK",
    aria: "Campaign visual showing the Toilet as a Service live restroom network",
  },
  watch: {
    index: "02",
    label: "Watch",
    title: "Attention becomes the key.",
    copy: "A fixed twelve-second sponsor message funds access without tracking the person watching.",
    meta: "12 SEC · NO ACCOUNT",
    aria: "Animated sponsored access countdown",
  },
  unlock: {
    index: "03",
    label: "Unlock",
    title: "A new piece of city infrastructure.",
    copy: "Unit 17 turns the exchange into something physical: visible, immediate, and impossible to mistake for another app.",
    meta: "UNIT 17 · NIGHT SERVICE",
    aria: "A stainless-steel Toilet as a Service unit at night with a twelve-second access display",
  },
};

const fieldStudies: Record<FieldStudy, { index: string; label: string; title: string; copy: string; image: string; width: number; height: number; position: string }> = {
  street: {
    index: "01",
    label: "Street network",
    title: "Built to belong to the city.",
    copy: "A calm, legible piece of public infrastructure—visible before the need becomes urgent.",
    image: "/taas-unit-street-blue.webp",
    width: 1672,
    height: 941,
    position: "center",
  },
  unit: {
    index: "02",
    label: "Unit 17",
    title: "The twelve-second exchange, made physical.",
    copy: "The original night study, preserved and recolored in the cobalt, navy, mint, and cream product palette.",
    image: "/taas-unit-17-blue.webp",
    width: 1215,
    height: 1295,
    position: "center 44%",
  },
  access: {
    index: "03",
    label: "Access terminal",
    title: "One gesture. One clear countdown.",
    copy: "The phone starts the exchange; the physical screen makes the cost of access impossible to miss.",
    image: "/taas-access-terminal-blue.webp",
    width: 1122,
    height: 1402,
    position: "center 54%",
  },
};

const launchCopy = "The last unmonetized moment is now a media channel. Toilet as a Service: watch 12 seconds, unlock 4 minutes.";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [seconds, setSeconds] = useState(12);
  const [toast, setToast] = useState("");
  const [view, setView] = useState<View>("rider");
  const [urgency, setUrgency] = useState(72);
  const [selectedUnit, setSelectedUnit] = useState("WC—044");
  const [reelScene, setReelScene] = useState<ReelScene>("unlock");
  const [fieldStudy, setFieldStudy] = useState<FieldStudy>("street");
  const unlocked = seconds === 0;

  const urgencyState = useMemo(() => {
    if (urgency > 84) return { label: "CRITICAL", eta: "NOW", color: "coral" };
    if (urgency > 55) return { label: "HIGH", eta: "2 MIN", color: "sun" };
    return { label: "MANAGEABLE", eta: "6 MIN", color: "mint" };
  }, [urgency]);

  useEffect(() => {
    if (!demoOpen || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [demoOpen, seconds]);

  useEffect(() => {
    if (!demoOpen) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDemoOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [demoOpen]);

  function openDemo() {
    setSeconds(12);
    setDemoOpen(true);
  }

  async function shareExperience() {
    const url = window.location.href.split("#")[0];
    try {
      if (navigator.share) await navigator.share({ title: "Toilet as a Service", text: launchCopy, url });
      else await navigator.clipboard.writeText(`${launchCopy} ${url}`);
      setToast("Launch copy and link copied.");
    } catch {
      setToast("Share cancelled.");
    }
    window.setTimeout(() => setToast(""), 3000);
  }

  function shareTo(channel: SocialChannel) {
    const url = window.location.href.split("#")[0];
    const destinations: Record<SocialChannel, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(launchCopy)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Toilet as a Service — the future cannot be skipped")}`,
    };
    window.open(destinations[channel], "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <header className="topbar shell">
        <a className="brand" href="#top" aria-label="Toilet as a Service, home"><span>T/</span><b>TOILET AS A SERVICE</b></a>
        <nav aria-label="Primary navigation"><a href="#product">Product</a><a href="#model">Model</a><a href="#ethics">Ethics</a></nav>
        <button className="nav-cta" onClick={openDemo}>Find relief <span>↗</span></button>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="beta-pill"><i /> PRIVATE BETA · 12 UNITS ONLINE</div>
          <h1>Relief,<br /><em>as a service.</em></h1>
          <p>A clean public restroom when you need it. Watch one short sponsor message. Unlock the door. Carry on.</p>
          <div className="hero-actions"><button className="button primary" onClick={openDemo}>Try the access flow <span>↗</span></button><a href="#product">See the product <span>↓</span></a></div>
          <div className="hero-proof"><div><b>4.9</b><span>concept rating</span></div><div><b>84 m</b><span>nearest unit</span></div><div><b>0</b><span>personal data points</span></div></div>
        </div>

        <div className="network-console" aria-label="Interactive network map">
          <div className="console-head"><div><span>LIVE NETWORK</span><b>ROMA NORTE, CDMX</b></div><div className="online"><i /> 12 ONLINE</div></div>
          <div className="map">
            <div className="road road-a" /><div className="road road-b" /><div className="road road-c" /><div className="road road-d" />
            <span className="district d1">ROMA N.</span><span className="district d2">JUÁREZ</span><span className="district d3">CONDESA</span>
            <button className={`map-pin p1 ${selectedUnit === "WC—044" ? "active" : ""}`} onClick={() => setSelectedUnit("WC—044")} aria-label="Select unit WC-044"><i />044</button>
            <button className={`map-pin p2 ${selectedUnit === "WC—027" ? "active" : ""}`} onClick={() => setSelectedUnit("WC—027")} aria-label="Select unit WC-027"><i />027</button>
            <button className={`map-pin p3 ${selectedUnit === "WC—081" ? "active" : ""}`} onClick={() => setSelectedUnit("WC—081")} aria-label="Select unit WC-081"><i />081</button>
            <div className="you-are-here"><i /> YOU</div>
          </div>
          <div className="unit-card">
            <div><span>SELECTED UNIT</span><h2>{selectedUnit}</h2><p>Available · cleaned 3 min ago</p></div>
            <div className="arrival"><span>WALK</span><b>{selectedUnit === "WC—044" ? "1:12" : selectedUnit === "WC—027" ? "3:40" : "5:08"}</b></div>
            <button onClick={openDemo}>Reserve for 2 min <span>→</span></button>
          </div>
          <div className="float-card hygiene"><span>HYGIENE</span><b>98%</b><i /></div>
          <div className="float-card access"><span>ACCESS</span><b>12 sec ad</b></div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div>ACCESS 24/7 <i /> LIVE AVAILABILITY <i /> CONTACTLESS ENTRY <i /> PRIVACY BY DEFAULT <i /> CLEANING VERIFIED <i /> ACCESS 24/7 <i /> LIVE AVAILABILITY <i /> CONTACTLESS ENTRY <i /></div></div>

      <section className="thesis shell">
        <p className="section-label">THE OPPORTUNITY</p>
        <h2>The attention economy has entered the <em>physical world.</em></h2>
        <div className="thesis-bottom"><p>We imagine a new category of urban infrastructure: useful enough for cities, sustainable enough for operators, and strange enough to make the point.</p><span className="big-number">#01</span></div>
      </section>

      <section className="experience-reel shell" aria-label="The sponsored access story">
        <header className="reel-heading">
          <div><p className="section-label">THE ACCESS MOMENT</p><h2>Three beats.<br /><em>One inevitable flow.</em></h2></div>
          <div><p>The sponsor message is not a banner around the product. It is the product interaction.</p><button onClick={openDemo}>Experience the exchange <span>↗</span></button></div>
        </header>
        <div className={`reel-canvas scene-${reelScene}`} key={reelScene}>
          <div className="reel-media" role="img" aria-label={reelScenes[reelScene].aria} />
          <div className="reel-scan" aria-hidden="true" />
          <div className="reel-number" aria-hidden="true">{reelScenes[reelScene].index}</div>
          <div className="reel-caption">
            <span>{reelScenes[reelScene].meta}</span>
            <h3>{reelScenes[reelScene].title}</h3>
            <p>{reelScenes[reelScene].copy}</p>
          </div>
          <div className="reel-credit">{reelScene === "unlock" ? "CONCEPT UNIT 17 · NIGHT DEPLOYMENT STUDY" : reelScene === "watch" ? "ORIGINAL MOTION LOOP · T/AAS STUDIO" : "LIVE PRODUCT COMPOSITE · PRIVATE BETA"}</div>
        </div>
        <div className="reel-controls" role="tablist" aria-label="Access story scenes">
          {(Object.keys(reelScenes) as ReelScene[]).map((key) => (
            <button key={key} role="tab" aria-selected={reelScene === key} onClick={() => setReelScene(key)}>
              <span>{reelScenes[key].index}</span><b>{reelScenes[key].label}</b><i aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="field-studies shell" aria-labelledby="field-studies-title">
        <header className="field-heading">
          <div><p className="section-label">FIELD STUDIES · BLUE HOUR</p><h2 id="field-studies-title">One system.<br /><em>Three distances.</em></h2></div>
          <p>From the block to the screen, every surface uses the same visual language: civic steel, electric cobalt, quiet mint, and a countdown you can read at a glance.</p>
        </header>
        <div className="field-stage">
          <img
            key={fieldStudy}
            src={fieldStudies[fieldStudy].image}
            alt={`${fieldStudies[fieldStudy].label}: ${fieldStudies[fieldStudy].title}`}
            width={fieldStudies[fieldStudy].width}
            height={fieldStudies[fieldStudy].height}
            style={{ objectPosition: fieldStudies[fieldStudy].position }}
          />
          <div className="field-wash" aria-hidden="true" />
          <div className="field-copy" key={`${fieldStudy}-copy`}>
            <span>STUDY {fieldStudies[fieldStudy].index} · T/AAS SYSTEM</span>
            <h3>{fieldStudies[fieldStudy].title}</h3>
            <p>{fieldStudies[fieldStudy].copy}</p>
          </div>
          <div className="field-mark" aria-hidden="true">T/</div>
        </div>
        <div className="field-switcher" role="tablist" aria-label="Physical product field studies">
          {(Object.keys(fieldStudies) as FieldStudy[]).map((key) => (
            <button key={key} role="tab" aria-selected={fieldStudy === key} onClick={() => setFieldStudy(key)}>
              <span className="field-thumb"><img src={fieldStudies[key].image} alt="" width={fieldStudies[key].width} height={fieldStudies[key].height} style={{ objectPosition: fieldStudies[key].position }} /></span>
              <span className="field-tab-copy"><small>{fieldStudies[key].index}</small><b>{fieldStudies[key].label}</b></span>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
      </section>

      <section className="product shell" id="product">
        <div className="product-tabs" role="tablist" aria-label="Product views">
          {(Object.keys(views) as View[]).map((key) => <button key={key} role="tab" aria-selected={view === key} onClick={() => setView(key)}><span>0{(Object.keys(views) as View[]).indexOf(key) + 1}</span>{views[key].label}</button>)}
        </div>
        <div className="product-stage">
          <div className="product-copy" key={view}><span>{views[view].eyebrow}</span><h2>{views[view].title}</h2><p>{views[view].copy}</p><button onClick={openDemo}>Open live prototype <span>↗</span></button></div>
          <div className={`product-demo demo-${view}`}>
            <div className="demo-orbit orbit-one" /><div className="demo-orbit orbit-two" />
            <div className="phone-shell">
              <div className="phone-top"><span>9:41</span><i /></div>
              {view === "rider" && <><div className="mini-map"><i className="mini-user" /><i className="mini-pin mp1" /><i className="mini-pin mp2" /><div className="mini-route" /></div><div className="phone-panel"><span>NEAREST UNIT</span><b>WC—044 · 84 m</b><button onClick={openDemo}>UNLOCK ACCESS</button></div></>}
              {view === "operator" && <><div className="ops-title"><span>NETWORK HEALTH</span><b>12 / 12</b><small>ALL SYSTEMS OPERATIONAL</small></div><div className="ops-bars"><i style={{height:"72%"}}/><i style={{height:"48%"}}/><i style={{height:"88%"}}/><i style={{height:"64%"}}/><i style={{height:"92%"}}/><i style={{height:"58%"}}/></div><div className="ops-row"><span>Next service cycle</span><b>18 min</b></div></>}
              {view === "brand" && <><div className="ad-preview"><small>SPONSORED ACCESS</small><b>12</b><span>SECONDS</span><i /></div><div className="brand-row"><span>PRIVACY MODE</span><b>ANONYMOUS ✓</b></div></>}
            </div>
            <div className="stage-stat"><span>{views[view].statLabel}</span><b>{views[view].stat}</b></div>
          </div>
        </div>
      </section>

      <section className="model" id="model">
        <div className="shell"><p className="section-label">THE BUSINESS MODEL</p><div className="model-head"><h2>Simple enough<br />to sound inevitable.</h2><p>The sponsor funds access. The operator maintains the network. The user gets a clean restroom without an account or a payment.</p></div>
          <div className="flow"><article><span>01</span><div className="flow-icon radar"><i /></div><h3>Locate</h3><p>Live supply meets urgent demand.</p></article><b>→</b><article><span>02</span><div className="flow-icon play">▶</div><h3>Watch</h3><p>One fixed sponsor message.</p></article><b>→</b><article><span>03</span><div className="flow-icon check">✓</div><h3>Unlock</h3><p>Four minutes of private access.</p></article></div>
        </div>
      </section>

      <section className="simulator shell">
        <div className="sim-copy"><p className="section-label">LIVE URGENCY MODEL</p><h2>How badly do you need it?</h2><p>Adjust the slider. The product changes its tone, never its privacy policy.</p></div>
        <div className={`urgency-card ${urgencyState.color}`}>
          <div className="urgency-top"><span>URGENCY INDEX</span><b>{urgency}</b></div>
          <input aria-label="Urgency level" type="range" min="10" max="100" value={urgency} onChange={(event) => setUrgency(Number(event.target.value))} style={{"--value": `${urgency}%`} as CSSProperties} />
          <div className="range-labels"><span>PLENTY OF TIME</span><span>CRITICAL</span></div>
          <div className="urgency-result"><div><span>STATUS</span><b>{urgencyState.label}</b></div><div><span>RECOMMENDED ACCESS</span><b>{urgencyState.eta}</b></div><button onClick={openDemo}>START 12-SECOND ACCESS <span>↗</span></button></div>
        </div>
      </section>

      <section className="ethics" id="ethics"><div className="shell ethics-grid"><div><p className="section-label">THE IMPORTANT PART</p><h2>A provocative idea.<br />A clear boundary.</h2></div><div><p>TaaS is interactive satire, not an operating restroom network. The prototype collects no location, identity, payment, or behavioral data.</p><ul><li>No physical units</li><li>No payments</li><li>No personal data</li><li>No fake waitlist</li></ul></div></div></section>

      <section className="launch-rail shell" id="share">
        <div><p className="section-label">MAKE THE PREMISE TRAVEL</p><h2>Too plausible<br />to keep private.</h2></div>
        <div className="launch-actions">
          <p>Put the idea where attention already lives. Every link carries the full social preview and the satire disclosure.</p>
          <div><button onClick={() => shareTo("x")}>Post on X <span>↗</span></button><button onClick={() => shareTo("linkedin")}>Share on LinkedIn <span>↗</span></button><button onClick={() => shareTo("reddit")}>Submit to Reddit <span>↗</span></button><button onClick={shareExperience}>Copy launch link <span>⧉</span></button></div>
        </div>
      </section>

      <section className="closing shell"><div><span>TOILET AS A SERVICE™</span><h2>The future cannot be skipped.</h2></div><button className="button primary" onClick={shareExperience}>Share the idea <span>↗</span></button></section>

      <footer className="footer shell"><div className="brand"><span>T/</span><b>TOILET AS A SERVICE</b></div><p>Independent conceptual project · Mexico City · 2026</p><div><a href="/press">Press kit</a><a href="https://github.com/juliosuas/toilet-as-a-service">GitHub ↗</a></div></footer>

      {demoOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDemoOpen(false)}><section className="modal" role="dialog" aria-modal="true" aria-label="Sponsored access simulation"><button className="modal-close" aria-label="Close simulation" onClick={() => setDemoOpen(false)}>×</button>{!unlocked ? <><div className="modal-ad"><div className="modal-ad-top"><span>SPONSORED ACCESS · FICTIONAL AD</span><span>NO SKIP</span></div><div className="ad-message"><small>FIBER PRIME®</small><h2>Tomorrow has<br />enough surprises.</h2><p>Make one less of them yours.</p><div className="ad-shapes"><i /><i /><i /></div></div><div className="ad-progress"><i style={{width:`${((12-seconds)/12)*100}%`}} /></div><div className="modal-count"><span>ACCESS IN</span><b>{String(seconds).padStart(2,"0")}</b><small>SECONDS</small></div><button className="priority" onClick={() => setSeconds(0)}>PRIORITY ACCESS · SKIP THE SATIRE</button></div></> : <div className="unlocked"><div className="success-mark">✓</div><span>WC—044 · ACCESS GRANTED</span><h2>You traded attention<br />for a basic human need.</h2><div className="receipt"><span>URGENCY SCORE</span><b>{urgency}/100</b><small>12 SEC WATCHED · 04:00 UNLOCKED</small></div><p>TaaS is interactive satire. The unit does not exist. The business model could.</p><button className="button primary" onClick={shareExperience}>Share my receipt <span>↗</span></button></div>}</section></div>}
      {toast && <div className="toast" role="status">{toast}<button onClick={() => setToast("")}>×</button></div>}
    </main>
  );
}
