<p align="center">
  <img src="public/og.png" alt="Toilet as a Service — Relief, as a service" width="100%" />
</p>

<h1 align="center">Toilet as a Service</h1>

<p align="center">
  Attention-funded public infrastructure.<br />
  Watch 12 seconds. Unlock 4 minutes.
</p>

<p align="center">
  <a href="https://toilet-as-a-service.juliosuas.chatgpt.site"><strong>Live experience</strong></a>
  ·
  <a href="https://toilet-as-a-service.juliosuas.chatgpt.site/press">Press room</a>
  ·
  <a href="docs/launch.md">Launch kit</a>
</p>

<p align="center">
  <a href="https://github.com/juliosuas/toilet-as-a-service/actions"><img alt="CI" src="https://github.com/juliosuas/toilet-as-a-service/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img alt="Node" src="https://img.shields.io/badge/Node-%E2%89%A522.13-339933?logo=nodedotjs&logoColor=white" />
</p>

---

Toilet as a Service (TaaS) is an interactive product satire about the attention economy reaching physical infrastructure. It presents a fictional network of spotless public restrooms where access is exchanged for one fixed sponsor message.

The product is fictional. The experience is fully functional.

## The premise

Digital products routinely exchange convenience for attention, personal data, or recurring payments. TaaS takes that logic one uncomfortable step further: what happens when a basic human need becomes ad inventory?

The project is designed to make the premise clear in five seconds, let the visitor experience it in under a minute, and remain interesting after the joke lands.

```text
Locate a unit → Watch a 12-second sponsor message → Unlock 4 minutes → Share the receipt
```

The simulation runs entirely in the browser. It does not request location, collect personal data, process payments, create accounts, or operate physical facilities.

## Product surfaces

- Interactive network map with selectable restroom units and live walking estimates
- Three-scene visual reel combining campaign art, an original motion loop, and the Higgsfield access frame
- Three switchable views for riders, city operators, and sponsoring brands
- Responsive urgency model that changes product tone without changing privacy policy
- Functional 12-second access sequence with progress, keyboard escape, and priority path
- Generated access receipt with native share and clipboard fallbacks
- Dedicated English press room with ready-to-publish launch copy
- Explicit, persistent satire and privacy disclosures

## Design system

TaaS uses a product-led visual system rather than generic campaign imagery. Interface primitives, typography, color, motion, and data carry the experience. The Unit 17 night study is the physical product anchor; a deliberately art-directed Higgsfield detail, the launch composite, and a bespoke animated countdown complete the locate → watch → unlock visual story.

| Token | Role |
| --- | --- |
| Midnight navy | Infrastructure, operational confidence |
| Electric cobalt | Primary action and product identity |
| Sky blue | Mapping and spatial context |
| Mint | Hygiene, availability, and privacy |
| Coral | Sponsored media and urgency |
| Signal yellow | Attention and connective moments |
| Warm cream | Editorial calm and contrast |

Motion is purposeful: availability pulses, a continuous network ticker, live progress, changing data states, and subtle spatial movement. `prefers-reduced-motion` is respected throughout.

## Technical overview

| Layer | Technology |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Build/runtime | Vinext, Vite, Cloudflare Workers |
| Persistence | Drizzle ORM scaffold (unused by the satire flow) |
| Testing | Node test runner + production render assertions |
| Quality | ESLint, strict TypeScript checks, GitHub Actions |
| Hosting | OpenAI Sites |

## Local development

Requirements: Node.js 22.13 or newer and npm 10 or newer.

```bash
git clone git@github.com:juliosuas/toilet-as-a-service.git
cd toilet-as-a-service
npm install
npm run dev
```

### Validation

```bash
npm run lint
npx tsc --noEmit
npm test
```

`npm test` creates a production build and verifies the rendered product experience and social metadata.

## Project structure

```text
app/
├── page.tsx          # Main product experience and access simulation
├── press/page.tsx    # Press room and launch copy
├── layout.tsx        # Metadata and application shell
└── globals.css       # Visual system, motion, and responsive layout
public/
├── favicon.svg       # Product mark
├── access-exchange-loop.svg # Lightweight original countdown animation
├── taas-unit-17.webp # Physical product concept at night
├── taas-access-moment.webp # Art-directed Higgsfield campaign frame
└── og.png            # Code-native social card
docs/
└── launch.md         # Launch copy and publishing notes
tests/
└── rendered-html.test.mjs
```

## Product principles

1. **Explain the product before revealing the critique.** The interface must read as credible infrastructure at first glance.
2. **Make the argument interactive.** The unskippable countdown is the thesis, not a decorative demo.
3. **Use product UI as the visual language.** Maps, dashboards, receipts, and operating states do the storytelling.
4. **Keep the boundary explicit.** Satire is disclosed, no false waitlist exists, and no user data is requested.
5. **Ship the whole artifact.** Product, press materials, metadata, documentation, testing, and deployment are treated as one release.

## Privacy and ethics

TaaS is a fictional, independent art and software project.

- No restroom network exists.
- No user accounts or payments are accepted.
- No personal information, precise location, or behavioral profile is collected.
- All operating metrics, unit identifiers, and commercial claims are fictional.
- The disclosure appears in the interface, press room, metadata, and repository.

## Contributing

Focused improvements are welcome. Before opening a pull request:

1. Keep the premise legible in under five seconds.
2. Preserve the visible satire disclosure and privacy guarantees.
3. Run lint, type checks, and the production test suite.
4. Include desktop and mobile screenshots for visual changes.

## Status

Active conceptual release. The website is public; the service is fictional.

---

<p align="center"><strong>No stalls. No payments. No data collection.</strong><br />Mexico City · 2026</p>
