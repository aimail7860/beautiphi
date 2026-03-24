/* ========================================
   BEAUTIPHI MEDISPA - MAIN JAVASCRIPT
   Step 2: Visual Design System & Interactions
   ======================================== */

/**
 * BeautiPhi Medispa - Main JavaScript
 * Handles navigation, mobile menu, scroll effects, and animations
 */

(function() {
  'use strict';

  // ========================================
  // DOM ELEMENTS
  // ========================================
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navOverlay = document.getElementById('navOverlay');
  const siteHeader = document.querySelector('.site-header');
  const fadeElements = document.querySelectorAll('.fade-in-up');

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  
  function toggleMobileMenu() {
    if (navMobile && mobileMenuToggle) {
      const isActive = navMobile.classList.toggle('active');
      
      // Toggle hamburger animation class
      mobileMenuToggle.classList.toggle('active', isActive);
      
      // Toggle overlay
      if (navOverlay) {
        navOverlay.classList.toggle('active', isActive);
      }
      
      // Update ARIA attributes
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    }
  }

  // Close mobile menu when clicking overlay
  function closeMobileMenuOnOverlay() {
    if (navMobile && navMobile.classList.contains('active')) {
      toggleMobileMenu();
    }
  }

  // Close mobile menu when clicking a link
  function closeMobileMenuOnLinkClick(event) {
    if (event.target.classList.contains('nav-link')) {
      if (navMobile && navMobile.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  
  let lastScrollY = window.scrollY;
  
  function handleScroll() {
    if (siteHeader) {
      // Add scrolled class for shadow effect
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    
    lastScrollY = window.scrollY;
  }

  // ========================================
  // FADE IN UP ANIMATION ON SCROLL
  // ========================================
  
  function checkFadeElements() {
    if (!fadeElements.length) return;
    
    const triggerBottom = window.innerHeight * 0.85;
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        element.classList.add('visible');
      }
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  
  function handleAnchorLinks(event) {
    const link = event.target.closest('a[href^="#"]');
    
    if (link && link.getAttribute('href') !== '#') {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMobile && navMobile.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    }
  }

  // ========================================
  // IMAGE LAZY LOADING ENHANCEMENT
  // ========================================
  
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  
  function initEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenuOnOverlay);
    }
    
    // Close mobile menu when clicking a link
    document.addEventListener('click', closeMobileMenuOnLinkClick);
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fade in up animations on scroll
    window.addEventListener('scroll', checkFadeElements, { passive: true });
    
    // Smooth scroll for anchor links
    document.addEventListener('click', handleAnchorLinks);
    
    // Handle resize events
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && navMobile && navMobile.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  }

  // ========================================
  // KEYBOARD ACCESSIBILITY
  // ========================================
  
  function handleKeyboardNavigation(event) {
    if (event.key === 'Escape' && navMobile && navMobile.classList.contains('active')) {
      toggleMobileMenu();
      mobileMenuToggle.focus();
    }
  }

  // ========================================
  // INITIALIZATION
  // ========================================
  
  function init() {
    initEventListeners();
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Check fade elements on load
    checkFadeElements();
    
    // Initialize lazy loading
    initLazyLoading();
    
    console.log('BeautiPhi Medispa initialized successfully');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
