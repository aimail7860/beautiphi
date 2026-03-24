/* ========================================
   BEAUTIPHI MEDISPA - MAIN JAVASCRIPT
   Step 1: Core Functionality
   ======================================== */

/**
 * BeautiPhi Medispa - Main JavaScript
 * Handles navigation, mobile menu, and core interactions
 */

(function() {
  'use strict';

  // ========================================
  // DOM ELEMENTS
  // ========================================
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const siteHeader = document.querySelector('.site-header');

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  
  function toggleMobileMenu() {
    if (navMobile && mobileMenuToggle) {
      navMobile.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      if (navMobile.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  }

  // Close mobile menu when clicking outside
  function closeMobileMenuOutside(event) {
    if (navMobile && navMobile.classList.contains('active')) {
      if (!navMobile.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        toggleMobileMenu();
      }
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
  
  function handleScroll() {
    if (siteHeader) {
      if (window.scrollY > 50) {
        siteHeader.style.boxShadow = 'var(--shadow-md)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }
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
        const headerOffset = 80;
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
  // EVENT LISTENERS
  // ========================================
  
  function initEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', closeMobileMenuOutside);
    
    // Close mobile menu when clicking a link
    document.addEventListener('click', closeMobileMenuOnLinkClick);
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
    
    console.log('BeautiPhi Medispa initialized successfully');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
