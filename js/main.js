    // 1. Initial State: Always Default to Light Mode on First Visit
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      if (window.lucide) {
        lucide.createIcons();
      }
      initOrbitalSteps();
    });

    function initTheme() {
      try {
        const storedTheme = localStorage.getItem('negus_theme');
        const toggleBtn = document.getElementById('theme-toggle');
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
          if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', 'true');
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
          }
        } else {
          document.documentElement.classList.remove('dark');
          if (toggleBtn) {
            toggleBtn.setAttribute('aria-pressed', 'false');
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
          }
        }
      } catch (e) {
        document.documentElement.classList.remove('dark');
      }
    }

    function toggleTheme() {
      const html = document.documentElement;
      const toggleBtn = document.getElementById('theme-toggle');
      const isDark = html.classList.toggle('dark');

      try {
        localStorage.setItem('negus_theme', isDark ? 'dark' : 'light');
      } catch (e) {}

      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      }
    }

    // 2. Mobile Navigation Toggle
    function toggleMobileNav() {
      const panel = document.getElementById('mobile-nav-panel');
      const btn = document.getElementById('mobile-menu-toggle');
      if (panel && btn) {
        const isOpen = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    }

    // 3. Scroll Spy for Nav Links
    window.addEventListener('scroll', () => {
      const sections = [
        { id: 'hero', navText: 'Home' },
        { id: 'about-section', navText: 'About' },
        { id: 'courses-section', navText: 'Courses' },
        { id: 'packages-section', navText: 'Packages' },
        { id: 'scholarship-training', navText: 'Open Scholarship' },
        { id: 'results-section', navText: 'Testimonials' },
        { id: 'resources-section', navText: 'Blogs & Tips' }
      ];

      const scrollPos = window.scrollY + 120;
      let currentSectionId = 'hero';

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = sec.id;
            break;
          }
        }
      }

      document.querySelectorAll('#desktop-nav-list .nav-item').forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });

    // 4. Hero Compass Interaction
    function updateCompassHub(title, desc) {
      const hubTitle = document.getElementById('compass-hub-title');
      const hubDesc = document.getElementById('compass-hub-desc');
      if (hubTitle) hubTitle.textContent = title;
      if (hubDesc) hubDesc.textContent = desc;
    }

    function handleCompassClick(sectionId, title, desc) {
      updateCompassHub(title, desc);
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // 5. Audience Mode Switcher
    function switchAudienceMode(mode) {
      const knownView = document.getElementById('view-known-path');
      const finderView = document.getElementById('view-finder-wizard');
      const btnKnown = document.getElementById('btn-mode-known');
      const btnFinder = document.getElementById('btn-mode-finder');

      if (mode === 'known') {
        if (knownView) knownView.style.display = 'grid';
        if (finderView) finderView.style.display = 'none';
        if (btnKnown) {
          btnKnown.classList.add('active');
          btnKnown.setAttribute('aria-selected', 'true');
        }
        if (btnFinder) {
          btnFinder.classList.remove('active');
          btnFinder.setAttribute('aria-selected', 'false');
        }
      } else {
        if (knownView) knownView.style.display = 'none';
        if (finderView) finderView.style.display = 'block';
        if (btnKnown) {
          btnKnown.classList.remove('active');
          btnKnown.setAttribute('aria-selected', 'false');
        }
        if (btnFinder) {
          btnFinder.classList.add('active');
          btnFinder.setAttribute('aria-selected', 'true');
        }
      }
    }

    // 6. Path Finder Wizard Logic
    let finderGoal = '';
    let finderDelivery = '';

    function selectFinderGoal(goal, btn) {
      finderGoal = goal;
      const allBtns = document.querySelectorAll('#finder-step-1 .finder-option-btn');
      allBtns.forEach(b => b.classList.remove('selected'));
      if (btn) btn.classList.add('selected');

      setTimeout(() => {
        if (goal === 'unsure') {
          showFinderResult('Free Advisory Triage', 'Direct strategy session with an advisor to evaluate eligibility, target countries, and testing requirements.', 'Online or Phone', 'Free consultation', '#contact-section');
        } else {
          document.getElementById('finder-step-1').style.display = 'none';
          document.getElementById('finder-step-2').style.display = 'block';
          document.getElementById('finder-step-indicator').textContent = 'STEP 2 OF 2';
        }
      }, 180);
    }

    function selectFinderDelivery(delivery, btn) {
      finderDelivery = delivery;
      const allBtns = document.querySelectorAll('#finder-step-2 .finder-option-btn');
      allBtns.forEach(b => b.classList.remove('selected'));
      if (btn) btn.classList.add('selected');

      setTimeout(() => {
        if (finderGoal === 'sat') {
          showFinderResult('Digital SAT Preparation', 'Computer-adaptive Digital SAT curriculum, targeted problem sets, and diagnostic score analysis.', delivery === 'online' ? 'Online Sessions' : (delivery === 'inperson' ? 'In-Person Coaching' : 'Online or In-Person'), 'Price: to be confirmed', '#sat-prep');
        } else if (finderGoal === 'ielts') {
          showFinderResult('IELTS Preparation', 'Targeted training covering Speaking, Writing, Listening, and Reading modules with feedback.', delivery === 'online' ? 'Online Sessions' : (delivery === 'inperson' ? 'In-Person Coaching' : 'Online or In-Person'), 'Price: to be confirmed', '#ielts-prep');
        } else if (finderGoal === 'essays') {
          showFinderResult('Essay Writing Package (2,000 Birr)', 'Expert-written essays tailored to your voice. Includes personal statement and supplemental essays with multiple revisions.', 'Online & Collaborative', '2,000 Birr (was 2,500 Birr)', '#courses-section');
        } else if (finderGoal === 'scholarships') {
          showFinderResult('General Scholarship Training', 'Comprehensive flagship roadmap for students seeking fully funded international university scholarships across 4 phases.', delivery === 'online' ? 'Online Sessions' : 'Online & In-person options', 'Price: Details to be confirmed', '#scholarship-training');
        } else {
          showFinderResult('Full Application Support', 'Complete end-to-end guidance from college selection and essay editing to financial aid documentation and visa preparation.', 'Online & In-Person', 'Consultation based', '#packages-section');
        }
      }, 180);
    }

    function showFinderResult(title, desc, format, price, linkHref) {
      document.getElementById('finder-step-1').style.display = 'none';
      document.getElementById('finder-step-2').style.display = 'none';
      const resultBox = document.getElementById('finder-result');
      resultBox.style.display = 'block';

      document.getElementById('rec-title').textContent = title;
      document.getElementById('rec-desc').textContent = desc;
      document.getElementById('rec-format').textContent = 'Format: ' + format;
      document.getElementById('rec-price').textContent = price;
      
      const actionBtn = document.getElementById('rec-action-btn');
      if (actionBtn) actionBtn.setAttribute('href', linkHref);
    }

    function prevFinderStep(step) {
      document.getElementById('finder-step-1').style.display = 'block';
      document.getElementById('finder-step-2').style.display = 'none';
      document.getElementById('finder-result').style.display = 'none';
      document.getElementById('finder-step-indicator').textContent = 'STEP 1 OF 2';
    }

    function resetFinder() {
      prevFinderStep(1);
      const allBtns = document.querySelectorAll('.finder-option-btn');
      allBtns.forEach(b => b.classList.remove('selected'));
    }

    // 7. "How Your Journey Unfolds": Orbital Step Selector Logic (Nodes completely still)
    const orbitalStepsData = [
      {
        num: "01",
        title: "Tell us your goal",
        desc: "We assess your academic background, test target (SAT or IELTS), and financial situation to understand which scholarships you qualify for.",
        preview: "<strong>Example assessment review:</strong> Target country preferences, testing timeline, and institutional aid eligibility profile.<div style='font-size: 11px; color: var(--ink-600); margin-top: 4px;'>*Preview uses example data.*</div>",
        arcOffset: 1194
      },
      {
        num: "02",
        title: "Get a plan and train",
        desc: "Follow tailored test drills, craft personal essays with iterative feedback, and build a strategic, realistic college list with proven institutional aid opportunities.",
        preview: "<strong>Example study plan:</strong> Essay outline review, practice sets, and Common App activity framing.<div style='font-size: 11px; color: var(--ink-600); margin-top: 4px;'>*Preview uses example data.*</div>",
        arcOffset: 796
      },
      {
        num: "03",
        title: "Apply with confidence",
        desc: "Submit polished applications, file institutional aid forms (ISFAA / CSS Profile), and prepare thoroughly for consular visa interviews.",
        preview: "<strong>Example submission checklist:</strong> Application deadlines, institutional aid documentation, and interview question rehearsals.<div style='font-size: 11px; color: var(--ink-600); margin-top: 4px;'>*Preview uses example data.*</div>",
        arcOffset: 398
      }
    ];

    let currentOrbitStep = 1;

    function initOrbitalSteps() {
      selectOrbitStep(1, false);

      const section = document.getElementById('how-it-works');
      if (section && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const arc = document.getElementById('orbit-arc-path');
              if (arc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                arc.style.strokeDashoffset = '796';
              }
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.35 });
        observer.observe(section);
      }
    }

    function selectOrbitStep(stepNum, animate = true) {
      if (stepNum < 1 || stepNum > 3) return;
      currentOrbitStep = stepNum;
      const data = orbitalStepsData[stepNum - 1];

      for (let i = 1; i <= 3; i++) {
        const node = document.getElementById(`orbit-node-${i}`);
        if (node) {
          if (i === stepNum) {
            node.classList.add('active');
            node.setAttribute('aria-selected', 'true');
            node.setAttribute('tabindex', '0');
          } else {
            node.classList.remove('active');
            node.setAttribute('aria-selected', 'false');
            node.setAttribute('tabindex', '-1');
          }
        }
      }

      const arc = document.getElementById('orbit-arc-path');
      if (arc) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !animate) {
          arc.style.transition = 'none';
          arc.style.strokeDashoffset = data.arcOffset;
        } else {
          arc.style.transition = 'stroke-dashoffset 0.5s ease-out';
          arc.style.strokeDashoffset = data.arcOffset;
        }
      }

      const hubNum = document.getElementById('orbit-hub-num');
      const hubTitle = document.getElementById('orbit-hub-title');
      if (hubNum && hubTitle) {
        hubNum.textContent = data.num;
        hubTitle.textContent = data.title;
      }

      const badge = document.getElementById('orbital-badge');
      const heading = document.getElementById('orbital-heading');
      const desc = document.getElementById('orbital-desc');
      const preview = document.getElementById('orbital-preview');
      const counter = document.getElementById('orbit-step-counter');
      const prevBtn = document.getElementById('orbit-prev-btn');
      const nextBtn = document.getElementById('orbit-next-btn');

      if (heading) heading.textContent = data.title;
      if (badge) badge.textContent = `Step ${stepNum} of 3`;
      if (desc) desc.textContent = data.desc;
      if (preview) preview.innerHTML = data.preview;
      if (counter) counter.textContent = `Step ${stepNum} of 3`;

      if (prevBtn) prevBtn.disabled = (stepNum === 1);
      if (nextBtn) {
        if (stepNum === 3) {
          nextBtn.innerHTML = '<span>Apply now</span> <i data-lucide="check" style="width:16px;height:16px;"></i>';
          nextBtn.onclick = () => { document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' }); };
        } else {
          nextBtn.innerHTML = '<span>Next step</span> <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>';
          nextBtn.onclick = () => { stepOrbit(1); };
        }
        if (window.lucide) lucide.createIcons();
      }
    }

    function stepOrbit(delta) {
      selectOrbitStep(currentOrbitStep + delta);
    }

    function handleOrbitKey(e, stepNum) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = stepNum === 3 ? 1 : stepNum + 1;
        selectOrbitStep(next);
        document.getElementById(`orbit-node-${next}`)?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = stepNum === 1 ? 3 : stepNum - 1;
        selectOrbitStep(prev);
        document.getElementById(`orbit-node-${prev}`)?.focus();
      }
    }

    // 8. Course Filtering Logic
    function filterCourses(category, btn) {
      const allChips = document.querySelectorAll('.filter-chip');
      allChips.forEach(c => c.classList.remove('active'));
      if (btn) btn.classList.add('active');

      const cards = document.querySelectorAll('.course-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = card.classList.contains('featured-course-box') ? 'grid' : 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 9. FAQ Accordion Logic
    function toggleFaq(btn) {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    // 10. Consultation Form Submission
    function handleConsultationSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('form-name');
      const email = document.getElementById('form-email');
      const contact = document.getElementById('form-contact');
      const interest = document.getElementById('form-interest');
      let isValid = true;

      if (!name.value.trim()) {
        document.getElementById('err-name').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('err-name').style.display = 'none';
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        document.getElementById('err-email').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('err-email').style.display = 'none';
      }

      if (!contact.value.trim()) {
        document.getElementById('err-contact').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('err-contact').style.display = 'none';
      }

      if (!interest.value) {
        document.getElementById('err-interest').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('err-interest').style.display = 'none';
      }

      if (isValid) {
        const submitBtn = document.getElementById('form-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting request...';

        setTimeout(() => {
          document.getElementById('consultation-form').style.display = 'none';
          document.getElementById('form-success-banner').style.display = 'block';
        }, 500);
      }
    }

    // 11. Modal Management & Student Portal Auth
    function openAuthModal(tab) {
      const modal = document.getElementById('auth-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        switchAuthTab(tab || 'login');
      }
    }

    function closeAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    function switchAuthTab(tab) {
      const panelLogin = document.getElementById('auth-panel-login');
      const panelRegister = document.getElementById('auth-panel-register');
      const tabSignIn = document.getElementById('tab-btn-signin');
      const tabRegister = document.getElementById('tab-btn-register');
      const alertBox = document.getElementById('portal-alert');
      if (alertBox) alertBox.className = 'portal-status-alert';

      if (tab === 'login') {
        if (panelLogin) panelLogin.style.display = 'block';
        if (panelRegister) panelRegister.style.display = 'none';
        if (tabSignIn) {
          tabSignIn.classList.add('active');
          tabSignIn.setAttribute('aria-selected', 'true');
        }
        if (tabRegister) {
          tabRegister.classList.remove('active');
          tabRegister.setAttribute('aria-selected', 'false');
        }
      } else {
        if (panelLogin) panelLogin.style.display = 'none';
        if (panelRegister) panelRegister.style.display = 'block';
        if (tabSignIn) {
          tabSignIn.classList.remove('active');
          tabSignIn.setAttribute('aria-selected', 'false');
        }
        if (tabRegister) {
          tabRegister.classList.add('active');
          tabRegister.setAttribute('aria-selected', 'true');
        }
      }
      if (window.lucide) lucide.createIcons();
    }

    function handleBackdropClick(e, modalId) {
      if (e.target.id === modalId) {
        closeAuthModal();
      }
    }

    function handlePortalLogin(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('login-submit-btn');
      const alertBox = document.getElementById('portal-alert');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Signing in...';
      }
      setTimeout(() => {
        if (alertBox) {
          alertBox.className = 'portal-status-alert success';
          alertBox.textContent = 'Welcome back! Signed in to your student portal successfully.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Sign In to Student Portal</span> <i data-lucide="arrow-right" style="width:18px;height:18px;"></i>';
          if (window.lucide) lucide.createIcons();
        }
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      }, 600);
    }

    function handlePortalRegister(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('reg-submit-btn');
      const alertBox = document.getElementById('portal-alert');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating account...';
      }
      setTimeout(() => {
        if (alertBox) {
          alertBox.className = 'portal-status-alert success';
          alertBox.textContent = 'Account created successfully! Welcome to Negus Consultants.';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Create Student Account</span> <i data-lucide="check" style="width:18px;height:18px;"></i>';
          if (window.lucide) lucide.createIcons();
        }
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      }, 600);
    }

    function handleForgotPassword() {
      const email = prompt('Enter your registered email to reset your password:', 'melat@example.com');
      if (email) {
        alert('Password reset instructions have been dispatched to ' + email);
      }
    }

    // Check for URL hash (#login or #register)
    window.addEventListener('load', () => {
      if (window.location.hash === '#login') {
        openAuthModal('login');
      } else if (window.location.hash === '#register') {
        openAuthModal('register');
      }
    });
  
    // Accurate Scrollspy matching Navigation link order
    document.addEventListener('DOMContentLoaded', () => {
      const navLinks = Array.from(document.querySelectorAll('#desktop-nav-list .nav-item'));
      const sectionsToWatch = [
        document.getElementById('hero'),
        document.getElementById('about-section'),
        document.getElementById('courses-section'),
        document.getElementById('packages-section'),
        document.getElementById('scholarship-training'),
        document.getElementById('results-section'),
        document.getElementById('resources-section')
      ].filter(Boolean);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === '#' + id) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
              }
            });
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 });

      sectionsToWatch.forEach(sec => observer.observe(sec));
    });

