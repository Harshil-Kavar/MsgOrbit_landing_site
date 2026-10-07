/* 
================================================================================
MsgOrbit Core JavaScript Interactions (Light Theme Only)
================================================================================
Clean, vanilla JavaScript handling all interactive components across:
- index.html (Showcase Tabs, Template Switcher, Counters, Testimonials Carousel)
- features.html (Feature Filter Tabs, Category View)
- pricing.html (Pricing Period Switch, Interactive Volume Cost Calculator, FAQ)
- contact.html (Form Submission Simulation & Feedback Message)
- Global (Sticky Header, Mobile Drawer Menu, Scroll Reveal Observer, Clipboard Copy)
================================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Observer ---
  const header = document.querySelector('.header');
  if (header) {
    const checkHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
    checkHeaderScroll();
  }

  // --- 2. Mobile Menu Toggle Drawer ---
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-actions a');

  if (menuBtn && mobileNav) {
    const closeMenu = () => {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('active');
      menuBtn.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Reset when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, { passive: true });
  }

  // --- 3. Scroll Reveal Observer (Animate on Scroll) ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  }

  // --- 4. Showcase Tab Switching (Home & Product View) ---
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const showcaseContents = document.querySelectorAll('.mock-ui-content');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(`showcase-${targetId}`);
      if (!targetContent || tab.classList.contains('active')) return;

      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      showcaseContents.forEach(c => {
        if (c.classList.contains('active')) {
          c.style.opacity = '0';
          c.style.transform = 'translateY(6px)';
          setTimeout(() => {
            c.classList.remove('active');
            targetContent.classList.add('active');
            void targetContent.offsetWidth; 
            targetContent.style.opacity = '1';
            targetContent.style.transform = 'translateY(0)';
          }, 150);
        }
      });
    });
  });

  // --- 5. Template Showcase Selector (Home) ---
  const selectorCards = document.querySelectorAll('.selector-card');
  const chatBubbles = document.querySelectorAll('.phone-message-bubble');

  selectorCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;

      selectorCards.forEach(c => c.classList.remove('active'));
      chatBubbles.forEach(b => b.classList.remove('active'));

      card.classList.add('active');
      const targetId = card.getAttribute('data-template');
      const targetBubble = document.getElementById(`bubble-${targetId}`);
      if (targetBubble) {
        targetBubble.classList.add('active');
      }
    });
  });

  // --- 6. Live Statistics Count-up Observer ---
  const counterElements = document.querySelectorAll('.counter-num');
  
  const countUp = (element) => {
    const target = parseFloat(element.getAttribute('data-target'));
    const isDecimal = element.getAttribute('data-decimal') === 'true';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1600;
    const stepTime = 16;
    const steps = duration / stepTime;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = (isDecimal ? target.toFixed(1) : Math.floor(target)) + suffix;
        clearInterval(timer);
      } else {
        element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      }
    }, stepTime);
  };

  const counterSection = document.querySelector('.analytics-counters, .analytics-section');
  if (counterSection && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterElements.forEach(element => countUp(element));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    counterObserver.observe(counterSection);
  }

  // --- 7. Testimonials Carousel Slider ---
  const slider = document.querySelector('.testimonials-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slider) {
    const cards = slider.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let autoScrollTimer = null;

    if (cards.length > 0 && dotsContainer) {
      cards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          scrollToCard(idx);
          resetAutoScroll();
        });
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll('.slider-dot');

      const updateSlider = () => {
        const gap = 24;
        const width = cards[0].offsetWidth;
        const translation = currentIndex * (width + gap);

        slider.style.transform = `translate3d(-${translation}px, 0, 0)`;

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      };

      const scrollToCard = (index) => {
        if (index < 0) {
          currentIndex = cards.length - 1;
        } else if (index >= cards.length) {
          currentIndex = 0;
        } else {
          currentIndex = index;
        }
        updateSlider();
      };

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          scrollToCard(currentIndex - 1);
          resetAutoScroll();
        });

        nextBtn.addEventListener('click', () => {
          scrollToCard(currentIndex + 1);
          resetAutoScroll();
        });
      }

      const startAutoScroll = () => {
        autoScrollTimer = setInterval(() => {
          scrollToCard(currentIndex + 1);
        }, 5500);
      };

      const resetAutoScroll = () => {
        clearInterval(autoScrollTimer);
        startAutoScroll();
      };

      startAutoScroll();
      window.addEventListener('resize', updateSlider, { passive: true });
    }
  }

  // --- 8. Pricing Toggle Switch (Monthly vs Yearly) ---
  const pricingSwitch = document.querySelector('.pricing-switch');
  const periodLabelMonthly = document.getElementById('period-monthly');
  const periodLabelYearly = document.getElementById('period-yearly');
  const priceValues = document.querySelectorAll('.price-val');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (pricingSwitch) {
    const setPricingPeriod = (isYearly) => {
      pricingSwitch.classList.toggle('active', isYearly);

      if (periodLabelMonthly && periodLabelYearly) {
        periodLabelMonthly.classList.toggle('active', !isYearly);
        periodLabelYearly.classList.toggle('active', isYearly);
      }

      priceValues.forEach(el => {
        const monthlyPrice = parseInt(el.getAttribute('data-monthly'), 10);
        const yearlyPrice = parseInt(el.getAttribute('data-yearly'), 10);
        
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';
        
        setTimeout(() => {
          el.textContent = isYearly ? yearlyPrice : monthlyPrice;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 120);
      });

      pricePeriods.forEach(el => {
        el.textContent = isYearly ? '/yr' : '/mo';
      });
    };

    pricingSwitch.addEventListener('click', () => {
      setPricingPeriod(!pricingSwitch.classList.contains('active'));
    });

    if (periodLabelMonthly) {
      periodLabelMonthly.addEventListener('click', () => setPricingPeriod(false));
    }
    if (periodLabelYearly) {
      periodLabelYearly.addEventListener('click', () => setPricingPeriod(true));
    }
  }

  // --- 9. FAQ Accordion Toggle ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // --- 10. Interactive WhatsApp Message Delivery & Volume Calculator ---
  const volumeSlider = document.getElementById('contact-volume-slider') || document.getElementById('message-volume-slider');
  const sliderVolumeVal = document.getElementById('slider-volume-val');
  const sliderCostVal = document.getElementById('slider-cost-val');
  const sliderRecommendedPlan = document.getElementById('slider-recommended-plan');
  const sliderSavingsVal = document.getElementById('slider-savings-val');
  const calcTypeBtns = document.querySelectorAll('.calc-type-btn');
  const calcPresetBtns = document.querySelectorAll('.calc-preset-btn');

  let currentRatePerMsg = 1.06; // Default to Marketing message rate (₹1.06)

  if (calcTypeBtns.length > 0) {
    calcTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        calcTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRatePerMsg = parseFloat(btn.getAttribute('data-rate')) || 1.06;
        if (volumeSlider) updateCalculator();
      });
    });
  }

  if (calcPresetBtns.length > 0 && volumeSlider) {
    calcPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        calcPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = parseInt(btn.getAttribute('data-val'), 10);
        if (val) {
          volumeSlider.value = val;
          updateCalculator();
        }
      });
    });
  }

  const formatINR = (val) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const updateCalculator = () => {
    if (!volumeSlider || !sliderVolumeVal) return;
    const volume = parseInt(volumeSlider.value, 10);
    sliderVolumeVal.textContent = volume.toLocaleString('en-IN') + ' Messages';

    const estimatedDeliveryCost = volume * currentRatePerMsg;
    if (sliderCostVal) {
      sliderCostVal.textContent = formatINR(estimatedDeliveryCost);
    }

    if (sliderRecommendedPlan) {
      if (volume <= 5000) {
        sliderRecommendedPlan.textContent = 'Monthly Plan (₹499/mo)';
        if (sliderSavingsVal) sliderSavingsVal.textContent = 'Ideal for low-volume testing & quick broadcasts';
      } else if (volume <= 25000) {
        sliderRecommendedPlan.textContent = 'Quarterly Plan (₹1,199 / 3mo)';
        if (sliderSavingsVal) sliderSavingsVal.textContent = 'Save ~20% (₹298 savings) vs Monthly billing';
      } else {
        sliderRecommendedPlan.textContent = 'Annual Plan (₹3,399 / 12mo)';
        if (sliderSavingsVal) sliderSavingsVal.textContent = 'Best Value: Save >40% (₹2,589 savings) with Annual plan';
      }
    }
  };

  if (volumeSlider) {
    volumeSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // --- 11. Code Block Copy to Clipboard ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeWrap = btn.closest('.code-block-wrap');
      const codeEl = codeWrap ? codeWrap.querySelector('.code-block') : null;
      if (!codeEl) return;

      const codeText = codeEl.textContent.trim();
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = 'var(--color-primary)';
        btn.style.color = '#ffffff';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Copy failed', err);
      });
    });
  });

  // --- 12. Category Filter Tabs (Features Page) ---
  const filterBtns = document.querySelectorAll('.filter-btn, .feature-filter-tab');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterGroup = btn.parentElement.querySelectorAll('.filter-btn, .feature-filter-tab');
      filterGroup.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');
      if (!category) return;

      const filterableElements = document.querySelectorAll('[data-category]');
      filterableElements.forEach(el => {
        const itemCat = el.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    });
  });

  // --- 13. Contact & Sales Form Submission Simulation ---
  const contactForm = document.getElementById('contact-form') || document.getElementById('sales-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const responseBox = document.getElementById('form-response-message');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        if (responseBox) {
          responseBox.style.display = 'block';
          responseBox.className = 'badge badge-green';
          responseBox.style.padding = '0.85rem 1.25rem';
          responseBox.style.fontSize = '0.95rem';
          responseBox.style.width = '100%';
          responseBox.style.textAlign = 'center';
          responseBox.style.borderRadius = 'var(--radius-md)';
          responseBox.textContent = '✨ Thank you! Your message has been received. Our team will get back to you shortly.';
        }
        contactForm.reset();
      }, 1000);
    });
  }

  // --- 14. Scroll-to-Top (Bottom-to-Top) Floating Button ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    let isTicking = false;

    const toggleScrollBtn = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
      isTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        window.requestAnimationFrame(toggleScrollBtn);
        isTicking = true;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial check on load
    toggleScrollBtn();
  }
});
