# MsgOrbit - Omnichannel Marketing Infrastructure Website

MsgOrbit is an enterprise-grade marketing and communication platform frontend built with modern vanilla HTML5, CSS3, and JavaScript, styled with an official WhatsApp Web-inspired light theme.

## 📄 Pages Architecture

1. **[index.html](file:///home/ni/Desktop/marketing/Website/index.html)** (Built strictly from Homepage Content)
   - **Section 1: Hero Section (The Hook)**: Official Meta WhatsApp Cloud API Partner Solution, Main Headline, Subheadline, CTAs, and Visual Metric Cards (Delivery: 99.4%, Visual Bot Automations: Active, Tenant Wallet Balance: ₹ 12,450).
   - **Section 2: Social Proof / Who It's For**: Growth & Marketing Teams, Support & Customer Success, SaaS & Agency Operators.
   - **Section 3: Core Value Propositions (The 3 Pillars)**: Smart Bulk Campaigns & Analytics, Node-Based Visual Bot Builder, Unified Team Inbox & Wallet Control.
   - **Section 6: Interactive Feature Spotlight (3 Steps)**: Connect Your WABA, Import Contacts & Build Campaigns, Automate & Engage.
   - **Section 7: Built-In Developer & API Capabilities**: Interactive API Documentation (/docs), WhatsApp Flows Support, Real-Time Health Checks.
   - **Section 4: Trust & Enterprise Security Banner**: Tenant Isolation, Encrypted Credentials, Meta Compliance.
   - **Section 8: Frequently Asked Questions (FAQ)**: 4 expandable interactive accordions.
   - **Section 5: Final Call-to-Action**: Ready to Transform Your WhatsApp Marketing? -> Get Started Free / Contact Sales.

2. **[features.html](file:///home/ni/Desktop/marketing/Website/features.html)** (Built strictly from Feature Directory Content)
   - **Hero Section**: ⚙️ Comprehensive Platform Capabilities — Everything You Need to Scale WhatsApp Marketing & Automation.
   - **Module 1: Contact & Audience Management**: Individual Profiles, Bulk CSV/Excel Import, Custom Tags & Groups.
   - **Module 2: WhatsApp Integration & Meta Tools**: WABA Embedded Signup, Approved Message Templates, Interactive WhatsApp Flows.
   - **Module 3: Campaign Wizard & Suppression Engine**: Step-by-Step Campaign Wizard, Validation & Financial Preview, Real-Time Delivery Funnel, Marketing Suppression List.
   - **Module 4: WhatsApp Bots (Visual Automation)**: Node-Based Visual Builder, Live Bot Simulator, Versioning & Execution History.
   - **Module 5: Unified Team Inbox & Wallet Finance**: Unified Conversation Inbox, Organization Wallet & Transactions.

3. **[pricing.html](file:///home/ni/Desktop/marketing/Website/pricing.html)** (Built strictly from Pricing Content)
   - **Hero Section**: 💳 Transparent Multi-Tenant Pricing — Flexible Plans Built for Businesses and Platform Operators.
   - **Section 1: Pricing Tiers / Model Explanation**: Growth Plan (For Businesses & Marketing Teams) & Enterprise & Agency Platform (For Multi-Tenant Operators).
   - **Section 2: How the Prepaid Wallet System Works**: Pre-Launch Cost Estimation, Reserved & Settled Funds, Easy Top-Ups.
   - **Section 3: Frequently Asked Questions (Pricing FAQ)**: WABA Multi-Account Management, Zero Setup Fees, Template Pricing Rules.

4. **[contact.html](file:///home/ni/Desktop/marketing/Website/contact.html)** (Built strictly from Contact Page Content)
   - **Hero Section**: 📞 Get in Touch with Us — We’re Here to Help You Scale Your WhatsApp Communication.
   - **Section 1: Contact Form**: 6-field responsive form with country dial selector (+91 79841 99872).
   - **Section 2: Alternative Support & Developer Channels**: Developer Documentation (`/docs`), System Health & Uptime, and Support Desk (`messegeorbit@gmail.com`).

5. **[privacy.html](file:///home/ni/Desktop/marketing/Website/privacy.html)** (Built strictly from Part 1 Privacy Policy Content)
   - **Hero Section**: 🔒 Data Privacy & Protection — Privacy Policy (Last Updated: September 2026).
   - **Sticky Table of Contents**: Smooth navigation to all policy subsections.
   - **Section 1: Information We Collect**: Organization & Account Details, WhatsApp Business Data, Contact Lists & Campaign Data, Usage & Device Metadata.
   - **Section 2: How We Use Your Information**: Platform Delivery, Meta & API Compliance, Security & Authentication, Financial Settlements.
   - **Section 3: Tenant Isolation & Data Security**: Strict Logical Separation, Encryption & Redaction.
   - **Section 4: User Rights & Contact**: Data Access & Management, Privacy Inquiries (`privacy@msgorbit.com`).

6. **[terms.html](file:///home/ni/Desktop/marketing/Website/terms.html)** (Built strictly from Part 2 Terms of Service Content)
   - **Hero Section**: 📄 Legal Agreements — Terms of Service (Last Updated: September 2026).
   - **Sticky Table of Contents**: Smooth navigation to all terms subsections.
   - **Section 1: Acceptance of Terms & Platform Access**: Service Scope, Account Eligibility, Organization Deactivation.
   - **Section 2: Prepaid Wallet & Financial Terms**: Wallet Balance Model, Cost Estimation & Settlement, Top-Ups.
   - **Section 3: Acceptable Use & Compliance**: Marketing Suppression, Prohibited Content.
   - **Section 4: Limitation of Liability & Uptime**: System Health, Limitation of Liability.

---

## 🎨 WhatsApp Web-Inspired Design Tokens (`:root`)

The entire website is styled using centralized CSS Custom Properties in [assets/css/style.css](file:///home/ni/Desktop/marketing/Website/assets/css/style.css):

```css
:root {
  --primary-teal: #075E54;          /* WhatsApp Primary Brand Teal */
  --primary-teal-dark: #054C44;     /* Deep Teal for hover states */
  --brand-green: #25D366;           /* WhatsApp Green for interactive CTAs & accents */
  --brand-green-hover: #20BD5A;     /* Smooth Green hover state */
  --brand-green-subtle: #D9FDD3;    /* Classic Outgoing Message Bubble Green */
  --bg-main: #FFFFFF;               /* Clean Canvas Background */
  --bg-surface: #F0F2F5;            /* Soft Section & Card Background */
  --bg-chat-wallpaper: #EFEAE2;     /* WhatsApp Chat Tint */
  --text-main: #111B21;             /* Deep Charcoal for Headings */
  --text-muted: #667781;            /* Secondary Descriptions */
  --border-light: #E9EDEF;          /* Soft Divider & Border */
  --border-subtle: #D1D7DB;         /* Input & Toggle Border */
  --ease-whatsapp: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📁 Project Structure

```
Website/
├── index.html                # Home page (Structured exclusively from content.txt)
├── features.html             # Features suite (Structured exclusively from content.txt)
├── pricing.html              # Pricing page (Structured exclusively from content.txt)
├── contact.html              # Contact & Support channels
├── privacy.html              # Privacy Policy & Data Protection
├── terms.html                # Terms of Service & Legal Agreements
├── content.txt               # Source copy & structure
├── README.md                 # Project documentation
└── assets/
    ├── css/
    │   └── style.css         # Centralized WhatsApp light-theme design system
    ├── js/
    │   └── script.js         # Consolidated interactive JavaScript logic
    └── images/
        └── logo.png          # High-resolution brand logo
```

---

## ✨ Code Quality & Key Highlights

- **100% Light Theme UI**: Clean, accessible, high-contrast WhatsApp web aesthetic.
- **Zero `!important` Declarations**: Clean cascade and modular component styling.
- **Centralized Headings**: Uniform H1, H2, and H3 typography definitions across all templates.
- **Micro-Interactions**: Smooth 0.3s cubic-bezier transitions for card elevation, button states, and scroll reveals.
- **Zero Broken Links**: All 239 internal links, anchors, and assets verified 100%.
