// ============================================
// PROFESSIONAL PORTFOLIO - COMPLETE JAVASCRIPT
// ============================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeThemeToggle();
  initializeNavigation();
  initializeSkillCards();
  initializeCertifications();
  initializeContactForm();
  initializeScrollEffects();
  initializeAnimations();
  initializeImageOptimization();
  loadProfilePhoto();
  loadProjectImages();
});

// ============================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ============================================

function initializeThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
  });
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ============================================
// PROFILE PHOTO LOADING
// ============================================

function loadProfilePhoto() {
  const profileImage = document.getElementById('profileImage');
  
  if (typeof CONFIG !== 'undefined' && CONFIG.PROFILE_PHOTO && CONFIG.PROFILE_PHOTO.trim() !== '') {
    const img = new Image();
    
    img.onload = function() {
      profileImage.src = CONFIG.PROFILE_PHOTO;
      profileImage.classList.add('loaded');
      console.log('✓ Profile photo loaded successfully');
    };
    
    img.onerror = function() {
      console.warn('⚠ Profile photo not found, using default avatar');
      profileImage.src = `https://ui-avatars.com/api/?name=Developer&size=200&background=6366f1&color=fff&bold=true`;
    };
    
    img.src = CONFIG.PROFILE_PHOTO;
  } else {
    profileImage.src = `https://ui-avatars.com/api/?name=Developer&size=200&background=6366f1&color=fff&bold=true`;
  }
  
  profileImage.addEventListener('load', function() {
    this.classList.add('loaded');
  });
}

// ============================================
// PROJECT IMAGES LOADING
// ============================================

function loadProjectImages() {
  if (typeof CONFIG === 'undefined' || !CONFIG.PROJECTS) {
    console.log('No custom project images defined, using defaults');
    return;
  }
  
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const projectId = index + 1;
    const projectData = CONFIG.PROJECTS[projectId];
    
    if (projectData) {
      const img = card.querySelector('.project-thumbnail img');
      const title = card.querySelector('.project-content h3');
      const description = card.querySelector('.project-description');
      const techTags = card.querySelector('.project-tech');
      const liveBtn = card.querySelector('.live-preview-btn');
      
      // Load custom thumbnail
      if (projectData.thumbnail) {
        const testImg = new Image();
        
        testImg.onload = function() {
          img.src = projectData.thumbnail;
          console.log(`✓ Project ${projectId} image loaded`);
        };
        
        testImg.onerror = function() {
          console.warn(`⚠ Project ${projectId} image not found, keeping default`);
        };
        
        testImg.src = projectData.thumbnail;
      }
      
      // Update project details if provided
      if (projectData.title) {
        title.textContent = projectData.title;
      }
      
      if (projectData.description) {
        description.textContent = projectData.description;
      }
      
      if (projectData.tech && projectData.tech.length > 0) {
        techTags.innerHTML = '';
        projectData.tech.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tech-tag';
          tag.textContent = tech;
          techTags.appendChild(tag);
        });
      }
      
      // Update live URL - FIXED!
      if (projectData.liveUrl) {
        liveBtn.href = projectData.liveUrl;
        liveBtn.setAttribute('target', '_blank');
        liveBtn.setAttribute('rel', 'noopener noreferrer');
        console.log(`✓ Project ${projectId} live URL updated: ${projectData.liveUrl}`);
      }
    }
  });
  
  console.log('✓ All project details loaded from config.js');
}

// ============================================
// SKILL CARDS FUNCTIONALITY
// ============================================

function initializeSkillCards() {
  const skillCards = document.querySelectorAll('.skill-card-3d');
  
  skillCards.forEach(card => {
    card.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        this.querySelector('.skill-card-inner').classList.toggle('flipped');
      }
    });
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.querySelector('.skill-card-inner').classList.toggle('flipped');
      }
    });
    
    card.setAttribute('tabindex', '0');
  });
}

// ============================================
// CERTIFICATIONS FUNCTIONALITY
// ============================================

function initializeCertifications() {
  const modal = document.getElementById('certModal');
  const certButtons = document.querySelectorAll('.view-cert, .view-cert-btn');
  const closeModal = document.querySelector('.close-modal');
  
  const certificates = typeof CONFIG !== 'undefined' && CONFIG.CERTIFICATES ? CONFIG.CERTIFICATES : {};
  
  console.log('📁 Certificate paths configured:', Object.keys(certificates).length);
  
  certButtons.forEach(button => {
    button.addEventListener('click', function() {
      const certId = this.getAttribute('data-cert');
      const certPath = certificates[certId];
      
      console.log(`Opening certificate ${certId}: ${certPath}`);
      
      if (certPath && certPath.trim() !== '') {
        showCertificateModal(certPath, certId);
      } else {
        showNoCertificateMessage(certId);
      }
    });
  });
  
  function showCertificateModal(imagePath, certId) {
    const certImage = document.getElementById('certImage');
    const modalContent = modal.querySelector('.modal-content');
    
    // Reset modal
    modalContent.innerHTML = '<img id="certImage" src="" alt="Certificate" style="opacity: 0.5;">';
    const newCertImage = document.getElementById('certImage');
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Load image
    const testImg = new Image();
    
    testImg.onload = function() {
      newCertImage.src = imagePath;
      newCertImage.style.opacity = '1';
      console.log('✓ Certificate loaded successfully');
    };
    
    testImg.onerror = function() {
      console.error('✗ Certificate image not found');
      showCertificateError(certId, imagePath);
    };
    
    testImg.src = imagePath;
  }
  
  function showCertificateError(certId, imagePath) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
      <div style="text-align: center; color: white; padding: 3rem; max-width: 600px;">
        <i class="fas fa-image" style="font-size: 5rem; margin-bottom: 1.5rem; color: #6366f1; opacity: 0.5;"></i>
        <h3 style="margin-bottom: 1rem; font-size: 1.8rem;">Certificate Image Not Found</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">
          Certificate #${certId} could not be loaded.
        </p>
        <div style="background: rgba(99, 102, 241, 0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <p style="font-size: 0.95rem; margin-bottom: 1rem; font-weight: 600;">Expected path:</p>
          <code style="background: rgba(0,0,0,0.3); padding: 0.75rem 1rem; border-radius: 8px; display: block; word-break: break-all; font-size: 0.85rem;">
            ${imagePath}
          </code>
        </div>
        <div style="text-align: left; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <p style="font-weight: 600; margin-bottom: 0.75rem;">✓ Checklist:</p>
          <ul style="font-size: 0.9rem; line-height: 1.8; padding-left: 1.5rem;">
            <li>Check if 'images/certificates/' folder exists</li>
            <li>Verify image file name matches config.js</li>
            <li>Ensure file format is .jpg, .png, or .jpeg</li>
            <li>Check file path spelling (case-sensitive)</li>
          </ul>
        </div>
        <button onclick="document.getElementById('certModal').style.display='none'; document.body.style.overflow='auto';" 
                style="padding: 0.75rem 2rem; background: #6366f1; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem;">
          Close
        </button>
      </div>
      <img id="certImage" src="" alt="Certificate" style="display: none;">
    `;
  }
  
  function showNoCertificateMessage(certId) {
    const modalContent = modal.querySelector('.modal-content');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    modalContent.innerHTML = `
      <div style="text-align: center; color: white; padding: 3rem; max-width: 600px;">
        <i class="fas fa-folder-open" style="font-size: 5rem; margin-bottom: 1.5rem; color: #f59e0b; opacity: 0.8;"></i>
        <h3 style="margin-bottom: 1rem; font-size: 1.8rem;">Certificate Not Configured</h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.9;">
          Please add certificate #${certId} path in config.js file.
        </p>
        <div style="text-align: left; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
          <p style="font-weight: 600; margin-bottom: 0.75rem;">Steps:</p>
          <ol style="font-size: 0.9rem; line-height: 1.8; padding-left: 1.5rem;">
            <li>Add your certificate image to 'images/certificates/' folder</li>
            <li>Open config.js file</li>
            <li>Update CERTIFICATES object with the file path</li>
            <li>Refresh the page</li>
          </ol>
        </div>
        <button onclick="document.getElementById('certModal').style.display='none'; document.body.style.overflow='auto';" 
                style="padding: 0.75rem 2rem; background: #6366f1; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem;">
          Got It
        </button>
      </div>
      <img id="certImage" src="" alt="Certificate" style="display: none;">
    `;
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModalFunc();
    }
  });
  
  function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = '<img id="certImage" src="" alt="Certificate">';
  }
}

// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('email');
  const emailHint = document.querySelector('.email-hint');
  const formMessage = document.querySelector('.form-message');
  
  if (!contactForm) return;
  
  emailInput.addEventListener('input', function() {
    const email = this.value;
    
    if (!email) {
      emailHint.textContent = '';
      return;
    }
    
    if (isValidEmail(email)) {
      emailHint.textContent = '✓ Valid email format';
      emailHint.style.color = '#10b981';
    } else {
      emailHint.textContent = 'Please enter a valid email address';
      emailHint.style.color = '#ef4444';
    }
  });
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    sendEmail(formData)
      .then(() => {
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        emailHint.textContent = '';
      })
      .catch(error => {
        console.error('Email sending failed:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
  
  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    hideFormMessage();
    
    if (!name || name.length < 2) {
      showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
      return false;
    }
    
    if (!email || !isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return false;
    }
    
    if (!subject || subject.length < 3) {
      showFormMessage('Please enter a subject (at least 3 characters).', 'error');
      return false;
    }
    
    if (!message || message.length < 10) {
      showFormMessage('Please enter a message (at least 10 characters).', 'error');
      return false;
    }
    
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function sendEmail(formData) {
    return new Promise((resolve, reject) => {
      if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded');
        setTimeout(resolve, 1500);
        return;
      }
      
      if (typeof CONFIG === 'undefined' || !CONFIG.EMAILJS_SERVICE_ID || !CONFIG.EMAILJS_TEMPLATE_ID || !CONFIG.EMAILJS_PUBLIC_KEY) {
        console.warn('EmailJS not configured in config.js');
        setTimeout(resolve, 1500);
        return;
      }
      
      if (!emailjs.init) {
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
      }
      
      emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: CONFIG.YOUR_EMAIL
        }
      ).then(
        function(response) {
          console.log('Email sent successfully:', response);
          resolve();
        },
        function(error) {
          console.error('Email sending failed:', error);
          reject(error);
        }
      );
    });
  }
  
  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  function hideFormMessage() {
    formMessage.style.display = 'none';
  }
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.skill-card-3d, .internship-card, .cert-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.skill-card-3d, .internship-card, .cert-card, .project-card');
  
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
}

// ============================================
// IMAGE OPTIMIZATION
// ============================================

function initializeImageOptimization() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
  
  console.log('✓ Portfolio loaded successfully');
  console.log('📁 Images folder structure required:');
  console.log('   - images/profile/');
  console.log('   - images/certificates/');
  console.log('   - images/projects/');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certModal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// ============================================
// EMAILJS INITIALIZATION
// ============================================

(function() {
  if (typeof emailjs !== 'undefined' && typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY) {
    try {
      emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
      console.log('✓ EmailJS initialized successfully');
    } catch (error) {
      console.warn('⚠ EmailJS initialization failed:', error);
    }
  }
})();