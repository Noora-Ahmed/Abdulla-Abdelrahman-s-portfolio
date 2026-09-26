/* ============================================================
TRANSLATIONS
============================================================ */

const translations = {
en: {
nav_work: "Work",
nav_skills: "Skills",
nav_contact: "Contact",
lang_toggle_label: "العربية",

hero_role: "Civil Engineer",

hero_intro:
"Civil Engineer with experience in structural design, site supervision, Safety &health and BIM modelling. Skilled in AutoCAD, Revit, STAAD.Pro, ETABS...etc. Worked on various projects preparing engineering drawings, structural modelling, reinforced concrete detailing, preparing BOQs and monitoring daily construction progress while contacting with clients and contractors.",

hero_cta: "See the work",

work_title: "Selected Work",

proj1_title: "Site Engineer Intern",
proj1_sub: "Construction Site Supervision",

proj2_title: "Mosque Extension",
proj2_sub: "Masjid Ikram Project",

proj3_title: "Capstone Project",
proj3_sub: "Sky-line High-Rise Building",

view_work: "View My Work",

skills_title: "Software & Tools",
    skills_design: "Design & Drafting",
skills_structural: "Structural Analysis",
skills_infra: "Infrastructure & Hydraulic Modelling",
skills_project: "Project & Quantity Management",
skills_reports: "Technical Reports & Documentation",
skills_data: "Data Analysis",

contact_title: "Let's Connect",

contact_lead:
"Open to work opportunities, site roles, and collaboration.",

contact_linkedin: "LinkedIn",
contact_instagram: "Instagram",

footer_rights: "Abdalla Abdelrahman. All rights reserved.",

greeting_morning: "Good morning",
greeting_afternoon: "Good afternoon",
greeting_evening: "Good evening",
greeting_night: "Good night"
},

ar: {
nav_work: "الأعمال",
nav_skills: "المهارات",
nav_contact: "تواصل",
lang_toggle_label: "English",

hero_role: "مهندس مدني",

hero_intro:
"مهندس مدني متخصص في التصميم الإنشائي والإشراف على المشاريع ونمذجة معلومات البناء (BIM)، مع خبرة في إعداد الرسومات الهندسية والنمذجة الإنشائية وتفاصيل تسليح الخرسانة المسلحة وحصر الكميات (BOQ). أمتلك مهارات متقدمة في استخدام AutoCAD وRevit وSTAAD.Pro وETABS، وشاركت في العديد من المشاريع الهندسية من مرحلة التصميم وحتى التنفيذ. كما أتمتع بخبرة في متابعة أعمال الموقع، وتطبيق معايير السلامة والصحة المهنية، والتنسيق الفعال مع العملاء والاستشاريين والمقاولين لضمان تنفيذ المشاريع وفق أعلى معايير الجودة والكفاءة.​‌",

hero_cta: "استعرض الأعمال",

work_title: "أعمال مختارة",

proj1_title: "متدرب مهندس إنشاءات",
proj1_sub: "الإشراف على موقع البناء",

proj2_title: "توسعة المسجد",
proj2_sub: "مشروع مسجد إكرام",

proj3_title: "مشروع التخرج",
proj3_sub: "برج سكاي لاين الشاهق",

view_work: "عرض أعمالي",

skills_title: "البرامج والأدوات",
skills_design: "التصميم والرسم الهندسي",
skills_structural: "التحليل الإنشائي",
skills_infra: "نمذجة البنية التحتية والهيدروليكا",
skills_project: "إدارة المشاريع وحصر الكميات",
skills_reports: "التقارير الفنية والتوثيق",
skills_data: "تحليل البيانات",

contact_title: "لنتواصل",

contact_title: "لنتواصل",

contact_lead:
"متاح للفرص المهنية والتعاون والمشاريع الهندسية.",

contact_linkedin: "لينكدإن",
contact_instagram: "إنستغرام",

footer_rights: "عبدالله عبدالرحمن. جميع الحقوق محفوظة.",
greeting_morning: "صباح الخير",
greeting_afternoon: "مساء الخير",
greeting_evening: "مساء الخير",
greeting_night: "طاب مساؤك"
}
};

let currentLang = "en";

/* ============================================================
Greeting
============================================================ */

function getGreetingKey() {
const hour = new Date().getHours();

if (hour >= 5 && hour < 12) {
return "greeting_morning";
}

if (hour >= 12 && hour < 17) {
return "greeting_afternoon";
}

if (hour >= 17 && hour < 21) {
return "greeting_evening";
}

return "greeting_night";
}

function updateGreeting() {
const greeting = document.getElementById("greeting");

if (greeting) {
greeting.textContent =
translations[currentLang][getGreetingKey()];
}
}

/* ============================================================
Apply Language
============================================================ */

function applyLanguage(lang) {
currentLang = lang;

const dict = translations[lang];

document.querySelectorAll("[data-i18n]").forEach((el) => {
const key = el.getAttribute("data-i18n");

if (dict[key] !== undefined) {
el.innerHTML = dict[key];
}
});

document.documentElement.lang = lang;
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

updateGreeting();

localStorage.setItem("preferredLang", lang);
}

/* ============================================================
Language Toggle
============================================================ */

const langToggle = document.getElementById("langToggle");

if (langToggle) {
langToggle.addEventListener("click", () => {
applyLanguage(currentLang === "en" ? "ar" : "en");
});
}

/* ============================================================
Footer Year
============================================================ */

const yearElement = document.getElementById("year");

if (yearElement) {
yearElement.textContent =
"©" + new Date().getFullYear() + " ";
}

/* ============================================================
Initialize
============================================================ */

const savedLang = localStorage.getItem("preferredLang");

applyLanguage(savedLang === "ar" ? "ar" : "en");

/* ============================================================
PDF Viewer Function
============================================================ */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

async function openPdfViewer(url) {
  const modal = document.getElementById('pdf-modal');
  const container = document.getElementById('pdf-modal-frame');
  container.innerHTML = '<p class="pdf-loading">Loading…</p>';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  try {
    const pdf = await pdfjsLib.getDocument(url).promise;
    container.innerHTML = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const containerWidth = container.clientWidth || 800;
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = (containerWidth / baseViewport.width) * (window.devicePixelRatio || 1);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas';
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = '100%';
      canvas.style.height = 'auto';

      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      container.appendChild(canvas);
    }
  } catch (err) {
    container.innerHTML = '<p class="pdf-loading">Could not load PDF.</p>';
    console.error(err);
  }
}

function closePdfViewer() {
  const modal = document.getElementById('pdf-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('pdf-modal-frame').innerHTML = '';
}
