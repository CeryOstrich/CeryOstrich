# Product Requirement Document (PRD)
## Project: Personal Portfolio Website (Ceryostrich.my.id)
## Style: UI Maximalism / Neo-Brutalisme Anti-Mainstream

---

## 1. Executive Summary & Overview
* **Project Name:** Ceryostrich Personal Portfolio
* **Domain:** Ceryostrich.my.id
* **Target Audience:** Potential clients, digital asset buyers, game studios, indie developers, and tech recruiters.
* **Core Value Proposition:** A highly expressive, high-impact portfolio that breaks the mold of traditional minimalist portfolios by utilizing a bold, high-contrast, texturally rich **Maximalist / Neo-Brutalist** aesthetic. It showcases a rare hybrid skill set: professional visual design (Graphic & UI/UX) backed by solid software engineering.

---

## 2. Visual & Aesthetic Guidelines (Maximalism Direction)
To ensure the website remains highly structured and functional despite the "More is More" philosophy, the UI must strictly adhere to the following stylistic rules:

* **Typography:** 
  * Over-sized headlines using bold, high-impact display fonts (e.g., heavy sans-serif, chunky slabs, or geometric display faces).
  * Monospace or clean geometric fonts for functional body copy to ensure high readability.
* **Color Palette:** 
  * High-contrast, saturated, or electric primary/secondary accents (e.g., deep purples, electric greens, or vibrant yellows) layered on top of textured or deeply saturated dark backgrounds.
* **UI Elements (Neo-Brutalist Core):**
  * Thick, rigid black borders (`border: 3px solid #000;`).
  * Hard, non-blurry drop shadows (`box-shadow: 4px 4px 0px #000;`) that snap instantly rather than fading.
  * Generous use of textures (grain/noise filters, scanlines, or repeating geometric patterns) on background wrappers.
  * Layout asymmetry with overlapping blocks, slightly tilted frames, and continuous ticker tapes (`marquee` effects).

---

## 3. Core Feature Requirements & Structure

### A. Hero Section (The Hook)
* **Objective:** Capture attention within 2 seconds through raw visual impact and clear identity.
* **Functional Requirements:**
  * Giant marquee text running horizontally across the top screen: `"SALMAN // UI DESIGNER // GRAPHIC ARTIST // CODER"`.
  * Interactive "sticker-style" badges representing skill categories that animate slightly on hover.
  * Direct, primary Call-To-Action (CTA) button styled like a retro terminal button prompting users to explore projects.

### B. Project Showcase (The Main Vault)
* **Objective:** Present design work without conforming to a clean generic grid.
* **Functional Requirements:**
  * **Categorized Modules:** Split into distinct visual cards for **UI/UX Design Case Studies** and **Graphic Design & Digital Assets**.
  * **Hover Interaction:** When hovered, cards should shift positions or invert colors instantly, providing immediate visual feedback.
  * **Tech Stack Badges:** Each project card must cleanly display the development and design workflow tools (e.g., `PHP`, `JS`, `Affinity V3`, `Clip Studio Paint`) inside stylized pill boxes.

### C. "About & Skills" Interactive Dashboard
* **Objective:** Inform visitors of Salman's academic background and technical expertise in an engaging way.
* **Functional Requirements:**
  * Simulated OS Window component mimicking a retro/vintage desktop environment.
  * Draggable interface components (using vanilla JavaScript) allowing users to reorganize asset boxes or technical capability cards on the screen.
  * Clear presentation of Informatics background and technical stack proficiency (JavaScript, PHP Native, UI layouting).

### D. Digital Store Funnel (Monetization Bridge)
* **Objective:** Funnel traffic directly into external digital marketplaces.
* **Functional Requirements:**
  * Dedicated high-visibility block teasing premium asset packs (exclusively focusing on rich foliage, environmental props, and inanimate world-building components).
  * Quick-access outward hyperlinks pointing directly to the digital storefront (e.g., Itch.io).

### E. Contact & Footprint Terminal
* **Objective:** Provide a fast, reliable mechanism for communication.
* **Functional Requirements:**
  * Ultra-simplified, brutalist input fields for quick messaging.
  * Explicit social handles and professional network anchors (Email, GitHub, LinkedIn).

---

## 4. Technical Stack & Implementation Preferences
* **Frontend Execution:** Vanilla HTML5, structural CSS (with heavy utilization of custom properties and transforms), and native JavaScript for DOM-manipulation/draggables. No heavy, unnecessary framework overhead to ensure blazing-fast load times.
* **Backend Framework:** Lightweight PHP engine for modular component rendering and dynamic layout routing.
* **Development Environment:** Local development managed through Laragon ecosystem matching existing deployment setups.

---

## 5. Non-Functional Requirements
* **Performance:** Overall page load speed under 1.5 seconds despite heavy visual components; assets must be heavily optimized using modern compressed formats.
* **Responsive Fluidity:** The layout must adapt gracefully from ultra-wide monitors down to compact mobile displays without losing the chaotic charm of the maximalist aesthetic.
* **Accessibility:** Text elements must preserve strong contrast ratios against background elements to maintain readability.
