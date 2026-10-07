/**
 * Moulya Chidanand — Portfolio JavaScript Controller
 * High-performance, modular scripts for navigation, modal case studies, AI chat, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. AMBIENT BACKGROUND CANVAS (SUBTLE GEOMETRIC TECH NODES)
     ========================================================================== */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connection lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ==========================================================================
     2. NAVIGATION, READING PROGRESS & BACK-TO-TOP
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const readingProgress = document.getElementById('reading-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;

    // Progress Bar
    if (readingProgress) {
      readingProgress.style.width = `${progress}%`;
    }

    // Navbar Elevation
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('bg-white/85');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.add('bg-white/85');
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }

    // Active Nav Highlighting via Scroll Position
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. SKILLS FILTERING TABS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach((b) => {
        b.classList.remove('active', 'bg-slate-900', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-slate-900', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      // Filter skill cards
      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. CASE STUDY MODAL CONTROLLER
     ========================================================================== */
  const modal = document.getElementById('case-study-modal');
  const openModalBtn = document.getElementById('open-case-study-btn');
  const interactiveCard = document.getElementById('project-card-interactive');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const closeModalBottomBtn = document.getElementById('close-modal-bottom-btn');

  function openCaseStudy() {
    if (modal) {
      modal.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }

  function closeCaseStudy() {
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openCaseStudy);
  if (interactiveCard) {
    interactiveCard.addEventListener('click', openCaseStudy);
    interactiveCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCaseStudy();
      }
    });
  }
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCaseStudy);
  if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeCaseStudy);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCaseStudy();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeCaseStudy();
      }
    });
  }

  /* ==========================================================================
     6. AI PORTFOLIO CHAT ("ASK ABOUT ME")
     ========================================================================== */
  const chatForm = document.getElementById('portfolio-chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const quickQueryBtns = document.querySelectorAll('.quick-query-btn');
  const openChatNavBtn = document.getElementById('open-chat-nav-btn');
  const mobileChatBtn = document.getElementById('mobile-chat-btn');

  // Knowledge Base about Moulya
  const knowledgeBase = [
    {
      keywords: ['skill', 'skills', 'know', 'tech', 'technology', 'stack', 'programming'],
      response: `<strong>Moulya's Technical Skills Overview:</strong><br>
      • <strong>Languages:</strong> C (Pointers, Dynamic Memory Allocation, Multi-dim Arrays), Python.<br>
      • <strong>Python Deep-Dive:</strong> Lists, Tuples, Strings, Loops, Functions, Modules, File Handling, References, Shallow & Deep Copy, LEGB Scope Rules, NumPy, Broadcasting, Algorithms (Fibonacci, Collatz).<br>
      • <strong>AI & Emerging Tech:</strong> AI Agents (Learning & Utility-based), Knowledge Representation, Prompt Engineering (Zero/One/Few-Shot, Self-Consistency), AIoT, AIaaS, Classification.<br>
      • <strong>Hardware & Systems:</strong> IoT, ESP8266, Turbidity Sensors, Embedded C++, Firebase Realtime Database, 3D Printing, Basic Electronics.`
    },
    {
      keywords: ['project', 'projects', 'build', 'work', 'iot', 'water', 'turbidity', 'system'],
      response: `<strong>Featured Project — Smart IoT Water Quality & Turbidity Monitoring System:</strong><br>
      • <strong>Hardware:</strong> ESP8266-12F microcontroller, Optical Turbidity Sensor, 16x2 I2C LCD, RGB LED status indicator, Audio Alert Buzzer.<br>
      • <strong>Cloud & App:</strong> Firebase Realtime Database and custom Android app built with MIT App Inventor.<br>
      • <strong>Functionality:</strong> Real-time water clarity detection, instant visual/buzzer safety warnings, and cloud data synchronization.<br><br>
      <em>Additionally, Moulya conducts hands-on learning labs in Python memory architecture, C pointer structures, and Prompt Engineering workflows.</em>`
    },
    {
      keywords: ['education', 'college', 'degree', 'study', 'academic', 'engineering', 'course'],
      response: `<strong>Academic Background:</strong><br>
      • Moulya is pursuing a <strong>Bachelor of Engineering (B.E.)</strong> degree.<br>
      • Her coursework covers Programming Foundations (C/Python), Engineering Mathematics, Physics & Engineering Science, Chemistry / Environmental Engineering, Computer Technologies, and Artificial Intelligence.`
    },
    {
      keywords: ['interest', 'interests', 'passion', 'curious', 'explore', 'about', 'who is', 'moulya'],
      response: `<strong>Who is Moulya?</strong><br>
      Moulya Chidanand is an engineering student passionate about software development, Artificial Intelligence, Python programming, AIoT (AI on IoT), and building practical engineering solutions. She focuses on understanding technical systems from first principles and turning theoretical knowledge into reliable, functioning projects.`
    },
    {
      keywords: ['python', 'numpy', 'copy', 'legb', 'fibonacci', 'collatz'],
      response: `<strong>Python Specialization:</strong><br>
      Moulya has explored Python language internals including the LEGB scope model, object referencing, shallow vs. deep copy mechanisms, high-performance array broadcasting with NumPy, file stream handling, and algorithmic patterns like Fibonacci generators and Collatz sequences.`
    },
    {
      keywords: ['ai', 'prompt', 'agent', 'few-shot', 'zero-shot', 'self-consistency', 'aiot', 'aiaas'],
      response: `<strong>AI & Prompt Engineering Exploration:</strong><br>
      Moulya studies AI Agent paradigms (Learning Agents, Utility-Based Agents), Knowledge Representation, Classification concepts, and structured Prompt Engineering methodologies (Zero-Shot, One-Shot, Few-Shot exemplars, and Self-Consistency reasoning). She is also exploring AIoT (AI on IoT) and AIaaS.`
    },
    {
      keywords: ['contact', 'email', 'linkedin', 'github', 'social', 'connect', 'reach'],
      response: `<strong>Connect with Moulya:</strong><br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/moulya-chidanand-289109442" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">linkedin.com/in/moulya-chidanand-289109442</a><br>
      • <strong>GitHub:</strong> <a href="https://github.com/moulyachidanand1411-commits" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">github.com/moulyachidanand1411-commits</a><br>
      • You can also use the contact form on this portfolio!`
    }
  ];

  function appendChatMessage(sender, text, isHtml = false) {
    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex items-start gap-3 ${sender === 'user' ? 'justify-end' : ''}`;

    if (sender === 'bot') {
      messageWrapper.innerHTML = `
        <div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
          AI
        </div>
        <div class="bg-slate-800 text-slate-100 p-4 rounded-2xl rounded-tl-xs max-w-xl border border-slate-700/80 leading-relaxed text-xs sm:text-sm">
          ${text}
        </div>
      `;
    } else {
      messageWrapper.innerHTML = `
        <div class="bg-blue-600 text-white p-3.5 px-4 rounded-2xl rounded-tr-xs max-w-md leading-relaxed text-xs sm:text-sm shadow-xs">
          ${text}
        </div>
        <div class="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
          You
        </div>
      `;
    }

    chatMessagesContainer.appendChild(messageWrapper);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'flex items-start gap-3';
    indicator.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
        AI
      </div>
      <div class="bg-slate-800 text-slate-400 p-3 px-4 rounded-2xl rounded-tl-xs border border-slate-700/80 text-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.15s"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.3s"></span>
      </div>
    `;
    chatMessagesContainer.appendChild(indicator);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    return indicator;
  }

  function processQuery(queryText) {
    if (!queryText.trim()) return;

    // Append User message
    appendChatMessage('user', queryText.trim());
    if (chatInput) chatInput.value = '';

    const lower = queryText.toLowerCase();

    // Show typing indicator
    const typingElem = showTypingIndicator();

    setTimeout(() => {
      if (typingElem && typingElem.parentNode) {
        typingElem.parentNode.removeChild(typingElem);
      }

      // Find best match in knowledgeBase
      let bestMatch = null;
      let maxScore = 0;

      knowledgeBase.forEach((item) => {
        let score = 0;
        item.keywords.forEach((keyword) => {
          if (lower.includes(keyword)) {
            score++;
          }
        });
        if (score > maxScore) {
          maxScore = score;
          bestMatch = item;
        }
      });

      if (bestMatch && maxScore > 0) {
        appendChatMessage('bot', bestMatch.response, true);
      } else {
        appendChatMessage(
          'bot',
          `Moulya is an engineering student focused on Python development, C programming, Artificial Intelligence, and IoT systems (like her Water Quality & Turbidity Monitor). Feel free to ask about her <strong>skills</strong>, <strong>IoT case study</strong>, <strong>education</strong>, or <strong>social profiles</strong>!`
        );
      }
    }, 450);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (chatInput) processQuery(chatInput.value);
    });
  }

  quickQueryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      if (q) processQuery(q);
    });
  });

  function scrollToChat() {
    const chatSection = document.getElementById('ai-chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      if (chatInput) chatInput.focus();
    }
  }

  if (openChatNavBtn) openChatNavBtn.addEventListener('click', scrollToChat);
  if (mobileChatBtn) mobileChatBtn.addEventListener('click', scrollToChat);

  /* ==========================================================================
     7. CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email || !message) {
        formFeedback.className = 'p-4 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 block';
        formFeedback.textContent = 'Please fill out all required fields before sending.';
        return;
      }

      // Simulated smooth submission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        `;
      }

      setTimeout(() => {
        formFeedback.className = 'p-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 block';
        formFeedback.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message has been prepared. (This portfolio demonstrates client-side submission logic).`;
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          `;
        }

        setTimeout(() => {
          formFeedback.className = 'hidden';
        }, 7000);
      }, 700);
    });
  }

  /* ==========================================================================
     8. INTERSECTION OBSERVER FOR SMOOTH SCROLL REVEALS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.skill-card, .ai-concept-card, .project-learning-card, #education > div > div');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }

});
