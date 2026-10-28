# Negus Consultants Homepage

Clean, type-led, and vector-designed homepage and student consultation platform for **Negus Consultants** — guiding Ethiopian scholars toward fully funded international university admissions and scholarships.

---

## 1. Quick Start / Running Locally

You can run the site locally using Python's built-in HTTP server or the custom `server.py` utility:

### Option A: Using `server.py` (Recommended, includes cache prevention)
```bash
python server.py
# By default, serves on http://localhost:8080/
# Custom port: python server.py 3000
```

### Option B: Using standard Python HTTP server
```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in your web browser.

---

## 2. Project Structure

```
negus-consultants-homepage/
├── index.html                  # Main homepage (single-page flow matching navigation order)
├── login.html                  # Dedicated student portal sign-in page
├── register.html               # Dedicated student portal registration page
├── server.py                   # Lightweight local server with no-cache headers (port 8080)
├── README.md                   # Project documentation and run guide
│
├── css/                        # Modular CSS stylesheets (WCAG AA compliant)
│   ├── base.css                # Color tokens, typography, container resets, motion accessibility
│   ├── components.css          # Navigation, buttons, badges, cards, accordion, modals
│   ├── sections.css            # Hero, orbital journey, finder, about, courses, packages, footer
│   └── auth.css                # Student portal login & register layout & styling
│
├── js/                         # JavaScript application logic (vanilla ES6, no build tools)
│   ├── main.js                 # Theme toggler, scrollspy, interactive finder, courses filter, modal
│   └── auth.js                 # Standalone portal tab switcher, validation, and redirects
│
├── assets/                     # Static media assets
│   └── images/
│       ├── logo.png            # Primary brand mark (640x640)
│       ├── negus_logo.png      # High-res master logo fallback
│       ├── hero_refined_scene.jpg
│       └── path_scene.jpg
│
├── docs/                       # Project documentation and review artifacts
│   ├── ASSUMPTIONS.md          # Architectural assumptions, client brief constraints & placeholders
│   └── screenshots/            # Verified visual regression screenshots (desktop & mobile)
│
└── _archive/                   # Inactive/superseded files retained for audit and review
    ├── negus_logo.png
    ├── hero_refined_scene.jpg
    └── path_scene.jpg
```

---

## 3. Placeholders & Client Dependencies (from ASSUMPTIONS.md)

As per the zero AI imagery policy and factual client brief constraints:
1. **Real Advisor Photography**: Real photo of founder Abrham Sinshaw and Negus advisors to be supplied by Negus.
2. **Institutional Licensing & Registration Details**: Final legal business registration entity details in Addis Ababa to be verified.
3. **Course Pricing & Schedule Dates**: Current scholarship season rate for Essay Package is verified at 2,000 Birr (regular 2,500 Birr); SAT and IELTS course dates are confirmed on inquiry.
4. **Direct Application Portal API**: Form submissions currently route to Telegram consultation booking and simulated authenticated sessions.
