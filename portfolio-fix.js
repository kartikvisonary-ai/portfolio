/**
 * Portfolio Button & Animation Fixes
 * Enables navigation buttons, smooth scrolling, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fix image paths - replace ./my portfolio_files/ with root paths
  const images = document.querySelectorAll('img[src*="my portfolio_files"]');
  images.forEach((img) => {
    const filename = img.src.split('/').pop();
    img.src = './' + filename;
  });

  // Smooth scroll utility function
  function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Fix Navbar Navigation Buttons
  const navButtons = document.querySelectorAll('nav button[class*="text-sm font-medium"]');
  navButtons.forEach((button) => {
    const text = button.textContent.trim().toUpperCase();
    let targetId = '';

    if (text === 'ABOUT') targetId = 'about';
    else if (text === 'SERVICES') targetId = 'services';
    else if (text === 'PORTFOLIO') targetId = 'portfolio';

    if (targetId) {
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => smoothScroll(targetId));
    }
  });

  // Fix "CONTACT US" button in navbar
  const contactUsButton = document.querySelector('nav button[class*="bg-primary"]');
  if (contactUsButton) {
    contactUsButton.style.cursor = 'pointer';
    contactUsButton.addEventListener('click', () => smoothScroll('contact'));
  }

  // Fix "LET'S TALK" button in Contact section
  const letsTalkButton = document.querySelector('section#contact button[class*="bg-primary"]');
  if (letsTalkButton) {
    letsTalkButton.style.cursor = 'pointer';
    letsTalkButton.addEventListener('click', () => {
      // Scroll to contact form or re-focus on contact section
      smoothScroll('contact');
    });
  }

  // Fix Portfolio Project Buttons (Arrow buttons)
  const portfolioButtons = document.querySelectorAll('section#portfolio button[class*="rounded-full"]');
  portfolioButtons.forEach((button, index) => {
    button.style.cursor = 'pointer';
    
    // Find the parent card and extract project info
    const card = button.closest('[class*="group"]');
    if (card) {
      const projectTitle = card.querySelector('h3')?.textContent || `Project ${index + 1}`;
      
      button.addEventListener('click', () => {
        // Could open modal or link to project details
        console.log(`Portfolio project clicked: ${projectTitle}`);
        // For now, provide visual feedback
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 200);
      });

      // Add hover effect
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
      });
    }
  });

  // Enable smooth scrolling for footer links with hash navigation
  document.querySelectorAll('a[href*="#about"], a[href*="#services"], a[href*="#portfolio"], a[href*="#contact"]').forEach((link) => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.includes('#')) {
        const hash = href.split('#')[1];
        if (hash && document.getElementById(hash)) {
          e.preventDefault();
          smoothScroll(hash);
        }
      }
    });
  });

  // Scroll reveal animations - animate elements as they come into view
  function handleScrollReveal() {
    const elements = document.querySelectorAll('[data-component-name="motion.div"], [data-component-name="motion.h2"], [data-component-name="motion.p"], [style*="opacity"]');
    
    elements.forEach((el) => {
      // Check if element is in viewport
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isVisible) {
        // Force animation by setting visible states
        el.style.opacity = '1';
        el.style.transform = el.style.transform || 'translateY(0)';
        el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
      }
    });
  }

  // Initial animations on page load
  window.addEventListener('load', () => {
    // Animate all elements on load
    document.querySelectorAll('[data-component-name*="motion"]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
    });
    handleScrollReveal();
  });

  // Handle animations on scroll
  window.addEventListener('scroll', () => {
    handleScrollReveal();
  }, { passive: true });

  // Initial call for elements already in viewport
  setTimeout(() => {
    handleScrollReveal();
  }, 100);

  // Add CSS styles for smooth transitions
  const style = document.createElement('style');
  style.textContent = `
    html {
      scroll-behavior: smooth;
    }
    
    button {
      transition: all 0.3s ease;
    }

    button:active {
      transform: scale(0.98) !important;
    }

    a {
      text-decoration: none;
    }

    img {
      display: block;
    }

    [data-component-name*="motion"] {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  console.log('✓ Portfolio buttons, animations, and images fixed successfully');
});
