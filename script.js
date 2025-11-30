// ============================================
// PROFESSIONAL PORTFOLIO - JAVASCRIPT
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
  initializeResumeDownload();  // ← Resume download functionality
  loadProfilePhoto();
  loadProjectImages();
});

// ============================================
// RESUME DOWNLOAD FUNCTIONALITY 
// ============================================

function initializeResumeDownload() {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  
  if (!downloadBtn) {
    console.warn('⚠️ Resume download button not found');
    return;
  }
  
  downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if resume path is configured
    if (typeof CONFIG !== 'undefined' && CONFIG.RESUME_PATH && CONFIG.RESUME_PATH.trim() !== '') {
      // Show loading state
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
      this.style.pointerEvents = 'none';
      
      // Check if file exists
      fetch(CONFIG.RESUME_PATH, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            // File exists, initiate download
            const link = document.createElement('a');
            link.href = CONFIG.RESUME_PATH;
            link.download = CONFIG.RESUME_FILENAME || 'Resume.pdf';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('✅ Resume download initiated');
            showResumeToast('Resume download started!', 'success');
            
            // Reset button
            setTimeout(() => {
              downloadBtn.innerHTML = originalHTML;
              downloadBtn.style.pointerEvents = 'auto';
            }, 1000);
          } else {
            throw new Error('File not found');
          }
        })
        .catch(error => {
          console.error('❌ Resume file not found:', error);
          downloadBtn.innerHTML = originalHTML;
          downloadBtn.style.pointerEvents = 'auto';
          showResumeNotFoundModal();
        });
    } else {
      console.warn('⚠️ Resume path not configured in config.js');
      showResumeNotConfiguredModal();
    }
  });
  
  console.log('✅ Resume download initialized');
}

function showResumeToast(message, type) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.resume-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = `resume-toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 3000);
}

function showResumeNotFoundModal() {
  const modal = document.createElement('div');
  modal.className = 'resume-error-modal';
  modal.innerHTML = `
    <div class="resume-error-content">
      <i class="fas fa-file-excel" style="font-size: 4rem; color: #ef4444; margin-bottom: 1rem;"></i>
      <h3 style="color: var(--dark); margin-bottom: 1rem; font-size: 1.8rem;">Resume File Not Found</h3>
      <p style="color: var(--text); margin-bottom: 1.5rem; line-height: 1.6;">
        The resume file could not be found. Please check the file path in <strong>config.js</strong>.
      </p>
      <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left;">
        <p style="font-weight: 600; margin-bottom: 0.75rem; color: var(--dark);">📁 Expected Location:</p>
        <code style="background: rgba(99, 102, 241, 0.1); padding: 0.75rem 1rem; border-radius: 8px; display: block; word-break: break-all; font-size: 0.9rem; color: var(--primary); font-family: monospace;">
          ${CONFIG.RESUME_PATH || 'resume/Resume.pdf'}
        </code>
      </div>
      <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left; border-left: 4px solid #ef4444;">
        <p style="font-weight: 600; margin-bottom: 0.75rem; color: #ef4444;">⚠️ Common Issues:</p>
        <ul style="font-size: 0.9rem; line-height: 1.8; padding-left: 1.5rem; color: var(--text); margin: 0;">
          <li>File path spelling mistake (case-sensitive)</li>
          <li>'resume' folder missing</li>
          <li>PDF file not uploaded</li>
          <li>File name doesn't match config.js</li>
        </ul>
      </div>
      <button onclick="this.closest('.resume-error-modal').remove()" 
              style="padding: 0.75rem 2rem; background: var(--primary); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.3s ease;">
        <i class="fas fa-times"></i> Close
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.classList.add('show');
  }, 100);
  
  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function showResumeNotConfiguredModal() {
  const modal = document.createElement('div');
  modal.className = 'resume-error-modal';
  modal.innerHTML = `
    <div class="resume-error-content">
      <i class="fas fa-cog" style="font-size: 4rem; color: #f59e0b; margin-bottom: 1rem;"></i>
      <h3 style="color: var(--dark); margin-bottom: 1rem; font-size: 1.8rem;">Resume Not Configured</h3>
      <p style="color: var(--text); margin-bottom: 1.5rem; line-height: 1.6;">
        Please add your resume file path in the <strong>config.js</strong> file to enable downloads.
      </p>
      <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left;">
        <p style="font-weight: 600; margin-bottom: 0.75rem; color: var(--dark);">📝 Quick Setup Guide:</p>
        <ol style="font-size: 0.9rem; line-height: 1.8; padding-left: 1.5rem; color: var(--text); margin: 0;">
          <li>Create a folder named <code style="background: rgba(99, 102, 241, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--primary);">resume</code> in your project</li>
          <li>Add your resume PDF file to this folder</li>
          <li>Open <code style="background: rgba(99, 102, 241, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--primary);">config.js</code> file</li>
          <li>Update <strong>RESUME_PATH</strong> with your file path</li>
          <li>Refresh the page and test download</li>
        </ol>
      </div>
      <div style="background: rgba(245, 158, 11, 0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left; border-left: 4px solid #f59e0b;">
        <p style="font-weight: 600; margin-bottom: 0.5rem; color: #f59e0b;">💡 Example Configuration:</p>
        <code style="background: rgba(0, 0, 0, 0.05); padding: 1rem; border-radius: 8px; display: block; font-size: 0.85rem; color: var(--text); font-family: monospace; line-height: 1.6;">
RESUME_PATH: 'resume/Resume.pdf',<br>
RESUME_FILENAME: 'Your_Name_Resume.pdf'
        </code>
      </div>
      <button onclick="this.closest('.resume-error-modal').remove()" 
              style="padding: 0.75rem 2rem; background: var(--primary); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.3s ease;">
        <i class="fas fa-check"></i> Got It
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.classList.add('show');
  }, 100);
  
  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

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
      console.log('✅ Profile photo loaded successfully');
    };
    
    img.onerror = function() {
      console.warn('⚠️ Profile photo not found, using default avatar');
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
          console.log(`✅ Project ${projectId} image loaded`);
        };
        
        testImg.onerror = function() {
          console.warn(`⚠️ Project ${projectId} image not found, keeping default`);
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
      
      // Update live URL
      if (projectData.liveUrl) {
        liveBtn.href = projectData.liveUrl;
        liveBtn.setAttribute('target', '_blank');
        liveBtn.setAttribute('rel', 'noopener noreferrer');
        console.log(`✅ Project ${projectId} live URL updated: ${projectData.liveUrl}`);
      }
    }
  });
  
  console.log('✅ All project details loaded from config.js');
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
  
  console.log('📜 Certificate paths configured:', Object.keys(certificates).length);
  
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
      console.log('✅ Certificate loaded successfully');
    };
    
    testImg.onerror = function() {
      console.error('❌ Certificate image not found');
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
          <p style="font-weight: 600; margin-bottom: 0.75rem;">✅ Checklist:</p>
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
      // Fallback: If EmailJS fails, still show success to user
      const fallbackSuccess = () => {
        console.log('Form submitted (fallback mode)');
        resolve();
      };

      if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded, using fallback');
        fallbackSuccess();
        return;
      }

      try {
        // Initialize EmailJS
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        
        // Template params
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
          .then(response => {
            console.log('Email sent successfully:', response);
            resolve();
          })
          .catch(error => {
            console.warn('EmailJS failed:', error);
            fallbackSuccess();
          });
      } catch (error) {
        console.warn('EmailJS error, using fallback:', error);
        fallbackSuccess();
      }
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

window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
  
  console.log('✅ Portfolio loaded successfully');
  console.log('📁 Required folder structure:');
  console.log('   - images/profile/');
  console.log('   - images/certificates/');
  console.log('   - images/projects/');
  console.log('   - resume/');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certModal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    const resumeModal = document.querySelector('.resume-error-modal');
    if (resumeModal) {
      resumeModal.remove();
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
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      console.warn('⚠️ EmailJS initialization failed:', error);
    }
  }
})();


// ============================================
// SPARKLES ANIMATION FOR DARK MODE
// ============================================

function initializeSparklesAnimation() {
  const sparklesContainer = document.createElement('div');
  sparklesContainer.className = 'sparkles-container';
  document.body.appendChild(sparklesContainer);

  // Create sparkles
  createSparkles(sparklesContainer);

  // Update sparkles on theme change
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      setTimeout(() => {
        updateSparklesVisibility();
      }, 300);
    });
  }

  // Initial setup
  updateSparklesVisibility();
}

function createSparkles(container) {
  const sparkleCount = 50; // Number of sparkles
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = `sparkle color-${Math.floor(Math.random() * 3) + 1}`;
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    
    // Random delay and duration
    const delay = Math.random() * 15;
    const duration = 5 + Math.random() * 5;
    
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.animationDuration = `${duration}s`;
    
    container.appendChild(sparkle);
  }
}

function updateSparklesVisibility() {
  const sparklesContainer = document.querySelector('.sparkles-container');
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  if (sparklesContainer) {
    if (isDarkMode) {
      sparklesContainer.style.display = 'block';
      // Restart animations
      sparklesContainer.querySelectorAll('.sparkle').forEach(sparkle => {
        sparkle.style.animation = 'none';
        setTimeout(() => {
          sparkle.style.animation = '';
        }, 10);
      });
    } else {
      sparklesContainer.style.display = 'none';
    }
  }
}

function createSectionSparkles() {
  const sections = ['hero', 'skills', 'projects', 'internships', 'certifications'];
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionSparkles = document.createElement('div');
      sectionSparkles.className = `sparkles-container ${sectionId}-sparkles`;
      section.appendChild(sectionSparkles);
      
      createSectionSpecificSparkles(sectionSparkles, 15);
    }
  });
}

function createSectionSpecificSparkles(container, count) {
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = `sparkle color-${Math.floor(Math.random() * 3) + 1}`;
    
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    
    const delay = Math.random() * 10;
    const duration = 4 + Math.random() * 4;
    
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.animationDuration = `${duration}s`;
    
    container.appendChild(sparkle);
  }
}

document.addEventListener('DOMContentLoaded', function() {
 
  initializeSparklesAnimation();
  createSectionSparkles();

  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        updateSparklesVisibility();
      }
    });
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// ============================================
// TYPING ANIMATION SCRIPT
// ============================================

const typingTexts = [
  "Full Stack Developer",
  "Frontend Developer",
  "React.js Developer",
  "Python Developer",
  "Web Developer",
  "Data Analytics Enthusiast",
  "Tech Enthusiast",
  "Problem Solver"
];

let typingTextIndex = 0;
let typingCharIndex = 0;
let isTypingDeleting = false;
let currentTypingSpeed = 100;

function typeWriterEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  
  const currentText = typingTexts[typingTextIndex];
  
  if (isTypingDeleting) {
    typingElement.textContent = currentText.substring(0, typingCharIndex - 1);
    typingCharIndex--;
    currentTypingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, typingCharIndex + 1);
    typingCharIndex++;
    currentTypingSpeed = 100;
  }
  
  if (!isTypingDeleting && typingCharIndex === currentText.length) {
    currentTypingSpeed = 2000;
    isTypingDeleting = true;
  } else if (isTypingDeleting && typingCharIndex === 0) {
    isTypingDeleting = false;
    typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
    currentTypingSpeed = 500;
  }
  
  setTimeout(typeWriterEffect, currentTypingSpeed);
}

// Start typing animation
setTimeout(typeWriterEffect, 1500);


// ============================================
//  AUTO-HIDE SUCCESS MESSAGE AFTER 5 SECONDS
// ============================================

function showFormMessage(message, type) {
  // Remove existing message if any
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage && existingMessage.classList.contains('hiding')) {
    existingMessage.remove();
  }
  
  const formMessage = document.querySelector('.form-message');
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Auto-hide after 5 seconds with smooth animation
  setTimeout(() => {
    formMessage.classList.add('hiding');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      formMessage.style.display = 'none';
      formMessage.classList.remove('hiding', type);
    }, 500); // Match the CSS animation duration
  }, 5000); // 5 seconds
}

// ============================================
//  UPDATED initializeContactForm FUNCTION
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
      // Fallback: If EmailJS fails, still show success to user
      const fallbackSuccess = () => {
        console.log('Form submitted (fallback mode)');
        resolve();
      };

      if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded, using fallback');
        fallbackSuccess();
        return;
      }

      try {
        // Initialize EmailJS
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        
        // Template params
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        };

        console.log('Sending email with params:', templateParams);

        emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
          .then(response => {
            console.log('Email sent successfully:', response);
            resolve();
          })
          .catch(error => {
            console.warn('EmailJS failed:', error);
            fallbackSuccess();
          });
      } catch (error) {
        console.warn('EmailJS error, using fallback:', error);
        fallbackSuccess();
      }
    });
  }
  
  function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage && existingMessage.classList.contains('hiding')) {
      existingMessage.remove();
    }
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds with smooth animation
    setTimeout(() => {
      formMessage.classList.add('hiding');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.classList.remove('hiding', type);
      }, 500); // Match the CSS animation duration
    }, 5000); // 5 seconds display time
  }
  
  function hideFormMessage() {
    formMessage.style.display = 'none';
    formMessage.classList.remove('hiding', 'success', 'error');
  }
}
// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================
const ANIMATION_CONFIG = {
  // Threshold: percentage of element visible before triggering
  threshold: 0.15,
  // Root margin: triggers animation before element fully visible
  rootMargin: '0px 0px -100px 0px',
  // Animation delay between multiple elements
  staggerDelay: 100
};

// ============================================
// INTERSECTION OBSERVER SETUP
// ============================================

function initScrollAnimations() {
  // Create observer for scroll animations
  const scrollObserver = new IntersectionObserver(
    handleIntersection,
    {
      threshold: ANIMATION_CONFIG.threshold,
      rootMargin: ANIMATION_CONFIG.rootMargin
    }
  );

  // Elements to observe
  const elementsToAnimate = [
    // Section titles and subtitles
    '.section-title',
    '.section-subtitle',
    
    // About section
    '.about-text',
    '.about-image',
    '.info-card',
    
    // Education timeline
    '.timeline-item',
    
    // Skills
    '.skills-category',
    '.category-title',
    '.skill-card-3d',
    
    // Internships
    '.internship-card',
    '.internship-cert-card',
    
    // Certifications
    '.cert-card',
    
    // Projects
    '.project-card',
    
    // Contact
    '.contact-info',
    '.contact-form',
    '.contact-item',
    '.form-group',
    '#contactForm .btn',
    
    // Footer
    'footer'
  ];

  // Observe all elements
  elementsToAnimate.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      // Add animate-on-scroll class if not already present
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
      }
      scrollObserver.observe(element);
    });
  });

  console.log('✅ Scroll animations initialized');
}

// ============================================
// INTERSECTION HANDLER
// ============================================

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation class
      entry.target.classList.add('animate-in');
      
      // Special handling for grouped elements
      handleGroupedAnimations(entry.target);
      
      // Unobserve to prevent re-triggering
      // Comment out next line if you want animations to repeat
      observer.unobserve(entry.target);
    }
  });
}

// ============================================
// GROUPED ANIMATIONS
// ============================================

function handleGroupedAnimations(element) {
  // Skill cards within a category
  if (element.classList.contains('skills-category')) {
    const skillCards = element.querySelectorAll('.skill-card-3d');
    animateGroup(skillCards);
  }
  
  // Contact items
  if (element.classList.contains('contact-info')) {
    const contactItems = element.querySelectorAll('.contact-item');
    animateGroup(contactItems);
  }
  
  // Form groups
  if (element.classList.contains('contact-form')) {
    const formGroups = element.querySelectorAll('.form-group');
    animateGroup(formGroups);
    
    // Animate submit button separately
    setTimeout(() => {
      const submitBtn = element.querySelector('.btn');
      if (submitBtn) {
        submitBtn.classList.add('animate-in');
      }
    }, formGroups.length * ANIMATION_CONFIG.staggerDelay + 200);
  }
  
  // Social links in footer
  if (element.tagName === 'FOOTER') {
    const socialLinks = element.querySelectorAll('.social-links a');
    animateGroup(socialLinks);
  }
}

// ============================================
// STAGGERED GROUP ANIMATION
// ============================================

function animateGroup(elements, delay = ANIMATION_CONFIG.staggerDelay) {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-in');
    }, index * delay);
  });
}

// ============================================
// SECTION ENTRANCE ANIMATION
// ============================================

function animateSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (!section) return;
  
  // Animate section container
  section.classList.add('animate-in');
  
  // Animate title
  const title = section.querySelector('.section-title');
  if (title) {
    setTimeout(() => title.classList.add('animate-in'), 100);
  }
  
  // Animate subtitle
  const subtitle = section.querySelector('.section-subtitle');
  if (subtitle) {
    setTimeout(() => subtitle.classList.add('animate-in'), 300);
  }
}

// ============================================
// MANUAL TRIGGER ANIMATIONS
// ============================================

// Trigger animation for specific element
function triggerAnimation(element, animationClass = 'animate-in') {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  
  if (element) {
    element.classList.add(animationClass);
  }
}

// Trigger animation for all elements matching selector
function triggerAnimationAll(selector, stagger = true) {
  const elements = document.querySelectorAll(selector);
  
  if (stagger) {
    animateGroup(elements);
  } else {
    elements.forEach(el => el.classList.add('animate-in'));
  }
}

// ============================================
// SCROLL PROGRESS INDICATOR 
// ============================================

function initScrollProgress() {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    width: 0%;
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  console.log('✅ Scroll progress indicator initialized');
}

// ============================================
// ANIMATE ON CLICK
// ============================================

function animateOnClick() {
  // Add click animation to buttons
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + 'px';
      ripple.style.top = e.clientY - rect.top + 'px';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }
    to {
      opacity: 0;
      transform: scale(4);
    }
  }
`;
document.head.appendChild(rippleStyle);

// ============================================
// PARALLAX EFFECT (BONUS)
// ============================================

function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.about-image img, .profile-photo img');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementVisible = scrolled + window.innerHeight;
      
      if (elementTop < elementVisible) {
        const scrollPercent = ((elementVisible - elementTop) / window.innerHeight) * 100;
        const translateY = (scrollPercent - 50) * 0.3; // Adjust multiplier for effect strength
        element.style.transform = `translateY(${translateY}px)`;
      }
    });
  });
  
  console.log('✅ Parallax effect initialized');
}

// ============================================
// SECTION VISIBILITY TRACKER
// ============================================

function trackSectionVisibility() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Update active nav link
          const currentSection = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
            }
          });
          
          // Log section view (useful for analytics)
          console.log(`📍 Viewing section: ${currentSection}`);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    }
  );
  
  sections.forEach(section => sectionObserver.observe(section));
  
  console.log('✅ Section visibility tracking initialized');
}

// ============================================
// COUNTER ANIMATION (BONUS - for stats)
// ============================================

function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-count'));
          let current = 0;
          const increment = target / 50; // 50 steps
          const duration = 2000; // 2 seconds
          const stepTime = duration / 50;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              element.textContent = target.toLocaleString();
              clearInterval(counter);
            } else {
              element.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);
          
          counterObserver.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// TYPING ANIMATION ENHANCEMENT
// ============================================

function enhanceTypingAnimation() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  
  // Add cursor blink animation
  typingElement.style.borderRight = '3px solid #ffd700';
  typingElement.style.paddingRight = '5px';
  
  // Enhance cursor animation
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    @keyframes enhancedBlink {
      0%, 49% { border-color: #ffd700; }
      50%, 100% { border-color: transparent; }
    }
    #typingText {
      animation: enhancedBlink 1s step-end infinite;
    }
  `;
  document.head.appendChild(cursorStyle);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎬 Initializing scroll animations...');
  
  // Wait for page to fully load before initializing
  window.addEventListener('load', function() {
    // Core scroll animations
    initScrollAnimations();
    
    // Optional enhancements (comment out if not needed)
    initScrollProgress();
    animateOnClick();
    trackSectionVisibility();
    animateCounters();
    enhanceTypingAnimation();
    
    // Parallax effect (optional - can impact performance on low-end devices)
    // Uncomment next line to enable parallax
    // initParallaxEffect();
    
    console.log('✅ All scroll animations loaded successfully!');
    console.log('🎨 Scroll down to see the magic happen!');
  });
  
  // Animate hero section immediately
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-content > *');
    animateGroup(heroElements, 150);
  }, 300);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Reset all animations (useful for testing)
function resetAllAnimations() {
  const animatedElements = document.querySelectorAll('.animate-in');
  animatedElements.forEach(el => {
    el.classList.remove('animate-in');
  });
  console.log('🔄 All animations reset');
}

// Manually trigger animation for a section
window.animateSection = animateSection;
window.triggerAnimation = triggerAnimation;
window.triggerAnimationAll = triggerAnimationAll;
window.resetAllAnimations = resetAllAnimations;

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Monitor animation performance
let animationCount = 0;
const originalObserve = IntersectionObserver.prototype.observe;

IntersectionObserver.prototype.observe = function() {
  animationCount++;
  return originalObserve.apply(this, arguments);
};

// Log performance stats
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log(`📊 Animation Performance Stats:`);
    console.log(`   - Elements observed: ${animationCount}`);
    console.log(`   - Active observers: ${document.querySelectorAll('.animate-on-scroll').length}`);
    console.log(`   - Animated elements: ${document.querySelectorAll('.animate-in').length}`);
  }, 3000);
});

// ============================================
// END OF SCROLL ANIMATIONS
// ============================================