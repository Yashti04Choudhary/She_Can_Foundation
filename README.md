# She Can Foundation — Responsive NGO Web Platform

![Hosting: Vercel](https://img.shields.io/badge/Hosting-Vercel-black?style=flat-square&logo=vercel)
![Tech: HTML5](https://img.shields.io/badge/Tech-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Tech: CSS3](https://img.shields.io/badge/Tech-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Tech: Vanilla JS](https://img.shields.io/badge/Tech-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

A semantic, responsive, multi-page web platform engineered for the **She Can Foundation** to effectively showcase their socio-economic impact metrics, foundational community pillars, and outreach initiatives.

---

## 🎯 Project Purpose & Technical Scope

This platform was developed as an **internship technical evaluation task** and serves as a practical exploration of modern frontend architecture and cloud deployment workflows. 

As a third-year Computer Science student, my core focus during this project was to move beyond textbook concepts and focus on production-level challenges, including:
* **Real-World Problem Solving:** Restructuring a project architecture dynamically without altering core local folder layouts.
* **Production-Grade UI/UX:** Translating raw NGO data—such as reaching **120,000+ girls**—into interactive UI elements that maximize user engagement.
* **DevOps Pipelines & CI/CD:** Exploring modern deployment tools by linking a local codebase to GitHub and implementing advanced server-side configuration mapping using Vercel.

---

## ✨ Key Features & Technical Implementations

* **Multi-Page Navigation Architecture:** Structured separate, native documents (`index.html`, `about.html`, `contact.html`) linked via optimized relative pathing to ensure fluid browser routing.
* **Dynamic UI Counter Engine:** Implemented high-performance Vanilla JavaScript event triggers to dynamically animate impact numbers up to **1,20,000+** upon page initialization.
* **Fully Responsive Fluid Grid system:** Built using custom CSS Flexbox and CSS Grid architectures with tailored media query break-points ensuring a seamless user experience across Mobile viewports, Tablets, and Ultra-wide screens.
* **Continuous Deployment Pipeline:** Fully integrated with Vercel's automated continuous deployment infrastructure, building and serving structural updates live directly on `git push`.

---

## 🛠️ Architecture & Technology Stack

* **Markup:** Semantic HTML5 elements (`<section>`, `<article>`, `<nav>`, `<footer>`) ensuring enhanced Accessibility (a11y) and strict SEO structural standards.
* **Styling:** Pure CSS3 utilizing native CSS Variables for global thematic tokenization (color schemes, font families, and padding scales), avoiding the bloat of pre-processors.
* **Scripting:** Native ES6+ Vanilla JavaScript for non-blocking DOM manipulation and interface interactions.
* **Deployment:** Integrated Vercel Global Content Delivery Network (CDN) utilizing automated continuous delivery hooks.

---

## 📁 Repository Directory Structure

```text
📁 SheCan_NGO_Website (Root)
 │
 ├── 📁 .vercel/              # Vercel deployment metadata and local cache
 ├── 📄 vercel.json           # Native routing rule mapping the root to /html
 ├── 📄 README.md             # Technical documentation blueprint
 │
 ├── 📁 html/                 # Web Page Documents
 │    ├── 📄 index.html       # Landing Page Architecture
 │    ├── 📄 about.html       # Impact Pillars & Timeline Representation
 │    └── 📄 contact.html     # User Ingestion & Volunteering Form
 │
 ├── 📁 css/                  # Layout Styling Engine
 │    └── 📄 style.css        # Responsive layouts, resets, and variables
 │
 └── 📁 js/                   # Logical Execution Layer
      └── 📄 main.js          # DOM Animation and counter scripts

```

---

## 🚀 Local Development Setup

To run this project locally on your machine for engineering analysis or development updates, follow these steps:

1. **Clone the repository:**
```bash
git clone [https://github.com/Yashti04Choudhary/She_Can_Foundation.git](https://github.com/Yashti04Choudhary/She_Can_Foundation.git)

```


2. **Navigate into the directory context:**
```bash
cd She_Can_Foundation

```


3. **Launch the platform:**
* Open the `/html/index.html` file inside any modern browser, or spin up a local development server utilizing the VS Code *Live Server* extension.



---

## ⚙️ CI/CD Deployment Strategy

This project leverages automated continuous integration workflows. Routing rules are maintained within `vercel.json` to handle transparent subfolder execution hooks:

```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/html/index.html",
      "permanent": true
    }
  ]
}

```

---

Developed with 💻 by **Yashti Choudhary** — Computer Science Student.

```

```
