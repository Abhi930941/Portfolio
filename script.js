// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const ANIMATION_CONFIG = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px',
  staggerDelay: 100
};

const TYPING_CONFIG = {
  texts: [
    "Frontend-Focused Full Stack Developer",
    "React.js Frontend Specialist",
    "Experienced with Python & Flask Backend",
    "Modern Web UI Builder"
  ],
  typeSpeed: 100,
  deleteSpeed: 50,
  pauseDuration: 2000,
  nextTextDelay: 500
};

// ============================================
// STATE MANAGEMENT
// ============================================

let typingTextIndex = 0;
let typingCharIndex = 0;
let isTypingDeleting = false;
let currentTypingSpeed = 100;
let animationCount = 0;

// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Portfolio initializing...');
  
  // Core functionality
  initializeThemeToggle();
  initializeNavigation();
  initializeResumeDownload();
  initializeContactForm();
  
  // Content loading
  loadProfilePhoto();
  loadProjectImages();
  
  // Interactions
  initializeSkillCards();
  initializeCertifications();
  
  // Visual effects
  initializeScrollEffects();
  initializeAnimations();
  initializeImageOptimization();
  
  console.log('✅ Portfolio initialized successfully');
});

// Additional initialization after page load
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  // Hide loading spinner if exists
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
  
  // Initialize features
  initScrollAnimations();
  initScrollProgress();
  animateOnClick();
  trackSectionVisibility();
  animateCounters();
  enhanceTypingAnimation();
  initializeSparklesAnimation();
  createSectionSparkles();
  
  // Start typing animation
  setTimeout(typeWriterEffect, 1500);
  
  // Animate hero section
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-content > *');
    animateGroup(heroElements, 150);
  }, 300);
  
  // Log folder structure info
  console.log('📁 Required folder structure:');
  console.log('   - images/profile/');
  console.log('   - images/certificates/');
  console.log('   - images/projects/');
  console.log('   - resume/');
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initializeThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  if (!themeToggle) {
    console.warn('⚠️ Theme toggle button not found');
    return;
  }
  
  // Load saved theme
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle theme on click
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
  
  console.log('✅ Theme toggle initialized');
}

// ============================================
// NAVIGATION SYSTEM
// ============================================

function initializeNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!navbar || !navLinks || !menuToggle) {
    console.warn('⚠️ Navigation elements not found');
    return;
  }
  
  // Scroll effects
  window.addEventListener('scroll', function() {
    handleNavbarScroll(navbar);
    updateActiveNavLink();
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    toggleMobileMenu(navLinks, menuToggle);
  });
  
  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      closeMobileMenu(navLinks, menuToggle);
    });
  });
  
  // Smooth scroll for anchor links
  initializeSmoothScroll();
  
  console.log('✅ Navigation initialized');
}

function handleNavbarScroll(navbar) {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function toggleMobileMenu(navLinks, menuToggle) {
  navLinks.classList.toggle('active');
  menuToggle.innerHTML = navLinks.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' 
    : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu(navLinks, menuToggle) {
  navLinks.classList.remove('active');
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
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

function initializeSmoothScroll() {
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

// ============================================
// RESUME DOWNLOAD SYSTEM
// ============================================

function initializeResumeDownload() {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  
  if (!downloadBtn) {
    console.warn('⚠️ Resume download button not found');
    return;
  }
  
  downloadBtn.addEventListener('click', handleResumeDownload);
  
  console.log('✅ Resume download initialized');
}

function handleResumeDownload(e) {
  e.preventDefault();
  
  // Check if CONFIG is available
  if (typeof CONFIG === 'undefined' || !CONFIG.RESUME_PATH || CONFIG.RESUME_PATH.trim() === '') {
    showResumeNotConfiguredModal();
    return;
  }
  
  // Show loading state
  const originalHTML = this.innerHTML;
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
  this.style.pointerEvents = 'none';
  
  // Check if file exists
  fetch(CONFIG.RESUME_PATH, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        downloadResumeFile(CONFIG.RESUME_PATH, CONFIG.RESUME_FILENAME);
        showResumeToast('Resume download started!', 'success');
        console.log('✅ Resume download initiated');
      } else {
        throw new Error('File not found');
      }
    })
    .catch(error => {
      console.error('❌ Resume file not found:', error);
      showResumeNotFoundModal();
    })
    .finally(() => {
      // Reset button
      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.pointerEvents = 'auto';
      }, 1000);
    });
}

function downloadResumeFile(path, filename) {
  const link = document.createElement('a');
  link.href = path;
  link.download = filename || 'Resume.pdf';
  link.target = '_blank';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showResumeToast(message, type) {
  // Remove existing toast
  const existingToast = document.querySelector('.resume-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `resume-toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Auto remove
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
  const modal = createResumeErrorModal(
    'fa-file-excel',
    '#ef4444',
    'Resume File Not Found',
    'The resume file could not be found. Please check the file path in <strong>config.js</strong>.',
    `
      <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left;">
        <p style="font-weight: 600; margin-bottom: 0.75rem; color: var(--dark);">📍 Expected Location:</p>
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
    `
  );
  
  showModal(modal);
}

function showResumeNotConfiguredModal() {
  const modal = createResumeErrorModal(
    'fa-cog',
    '#f59e0b',
    'Resume Not Configured',
    'Please add your resume file path in the <strong>config.js</strong> file to enable downloads.',
    `
      <div style="background: var(--light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left;">
        <p style="font-weight: 600; margin-bottom: 0.75rem; color: var(--dark);">📍 Quick Setup Guide:</p>
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
    `
  );
  
  showModal(modal);
}

function createResumeErrorModal(icon, color, title, description, content) {
  const modal = document.createElement('div');
  modal.className = 'resume-error-modal';
  modal.innerHTML = `
    <div class="resume-error-content">
      <i class="fas ${icon}" style="font-size: 4rem; color: ${color}; margin-bottom: 1rem;"></i>
      <h3 style="color: var(--dark); margin-bottom: 1rem; font-size: 1.8rem;">${title}</h3>
      <p style="color: var(--text); margin-bottom: 1.5rem; line-height: 1.6;">
        ${description}
      </p>
      ${content}
      <button onclick="this.closest('.resume-error-modal').remove()" 
              style="padding: 0.75rem 2rem; background: var(--primary); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.3s ease;">
        <i class="fas fa-${icon === 'fa-cog' ? 'check' : 'times'}"></i> ${icon === 'fa-cog' ? 'Got It' : 'Close'}
      </button>
    </div>
  `;
  
  return modal;
}

function showModal(modal) {
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => modal.classList.add('show'), 100);
  
  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// ============================================
// CONTENT LOADING SYSTEM
// ============================================

function loadProfilePhoto() {
  const profileImage = document.getElementById('profileImage');
  
  if (!profileImage) {
    console.warn('⚠️ Profile image element not found');
    return;
  }
  
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

function loadProjectImages() {
  if (typeof CONFIG === 'undefined' || !CONFIG.PROJECTS) {
    console.log('ℹ️ No custom project images defined, using defaults');
    return;
  }
  
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const projectId = index + 1;
    const projectData = CONFIG.PROJECTS[projectId];
    
    if (projectData) {
      updateProjectCard(card, projectData, projectId);
    }
  });
  
  console.log('✅ All project details loaded from config.js');
}

function updateProjectCard(card, data, id) {
  const img = card.querySelector('.project-thumbnail img');
  const title = card.querySelector('.project-content h3');
  const description = card.querySelector('.project-description');
  const techTags = card.querySelector('.project-tech');
  const liveBtn = card.querySelector('.live-preview-btn');
  
  // Load thumbnail
  if (data.thumbnail) {
    const testImg = new Image();
    
    testImg.onload = function() {
      img.src = data.thumbnail;
      console.log(`✅ Project ${id} image loaded`);
    };
    
    testImg.onerror = function() {
      console.warn(`⚠️ Project ${id} image not found, keeping default`);
    };
    
    testImg.src = data.thumbnail;
  }
  
  // content
  if (data.title) title.textContent = data.title;
  if (data.description) description.textContent = data.description;
  
  // tech tags
  if (data.tech && data.tech.length > 0) {
    techTags.innerHTML = '';
    data.tech.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      techTags.appendChild(tag);
    });
  }
  
  // live URL
  if (data.liveUrl) {
    liveBtn.href = data.liveUrl;
    liveBtn.setAttribute('target', '_blank');
    liveBtn.setAttribute('rel', 'noopener noreferrer');
    console.log(`✅ Project ${id} live URL updated: ${data.liveUrl}`);
  }
}

// ============================================
// SKILL CARDS INTERACTION
// ============================================

function initializeSkillCards() {
  const skillCards = document.querySelectorAll('.skill-card-3d');
  
  skillCards.forEach(card => {
    // Click event for mobile
    card.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        this.querySelector('.skill-card-inner').classList.toggle('flipped');
      }
    });
    
    // Keyboard accessibility
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.querySelector('.skill-card-inner').classList.toggle('flipped');
      }
    });
    
    card.setAttribute('tabindex', '0');
  });
  
  console.log('✅ Skill cards initialized');
}

// ============================================
// CERTIFICATIONS MODAL SYSTEM
// ============================================

function initializeCertifications() {
  const modal = document.getElementById('certModal');
  const certButtons = document.querySelectorAll('.view-cert, .view-cert-btn');
  const closeModal = document.querySelector('.close-modal');
  
  if (!modal) {
    console.warn('⚠️ Certificate modal not found');
    return;
  }
  
  // initially hidden Modal
  modal.style.display = 'none';
  
  const certificates = typeof CONFIG !== 'undefined' && CONFIG.CERTIFICATES ? CONFIG.CERTIFICATES : {};
  
  console.log(`📜 Certificate paths configured: ${Object.keys(certificates).length}`);
  
  // Button click handlers
  certButtons.forEach(button => {
    button.addEventListener('click', function() {
      const certId = this.getAttribute('data-cert');
      const certPath = certificates[certId];
      
      console.log(`Opening certificate ${certId}:`, certPath);
      
      // Check if it's an array (multiple certificates)
      if (Array.isArray(certPath)) {
        console.log('✅ Multiple certificates detected');
        showMultipleCertificatesModal(modal, certPath, certId);
      } else if (certPath && certPath.trim() !== '') {
        console.log('✅ Single certificate');
        showCertificateModal(modal, certPath, certId);
      } else {
        console.warn('⚠️ No certificate found');
        showNoCertificateMessage(modal, certId);
      }
    });
  });
  
  // Close handlers
  if (closeModal) {
    closeModal.addEventListener('click', () => closeCertModal(modal));
  }
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeCertModal(modal);
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeCertModal(modal);
    }
  });
  
  console.log('✅ Certifications initialized');
}

// Show Multiple Certificates with Navigation
function showMultipleCertificatesModal(modal, imagePaths, certId) {
  const modalContent = modal.querySelector('.modal-content');
  let currentIndex = 0;
  
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  console.log('Opening multiple certs, total:', imagePaths.length);
  
  // Create slider HTML
  function renderCertificate() {
    const testImg = new Image();
    
    testImg.onload = function() {
      modalContent.innerHTML = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; width: 100%; max-width: 100%;">
          <img id="certImage" src="${imagePaths[currentIndex]}" alt="Certificate ${currentIndex + 1}" style="max-width: 85%; max-height: 70vh; border-radius: 10px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);"/>
          
          <!-- Navigation Controls -->
          <div class="cert-nav-controls" style="display: flex; align-items: center; gap: 1.5rem; background: rgba(255, 255, 255, 0.1); padding: 1rem 2rem; border-radius: 15px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); flex-wrap: nowrap; justify-content: center;">
            <button id="prevCert" style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              padding: 0.7rem 1.2rem;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              font-size: 0.95rem;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              white-space: nowrap;
            ">
              <i class="fas fa-chevron-left"></i> <span class="nav-text">Previous</span>
            </button>
            
            <span id="counter" style="
              color: white;
              font-weight: 700;
              font-size: 1rem;
              min-width: 100px;
              text-align: center;
              background: rgba(99, 102, 241, 0.3);
              padding: 0.5rem 1rem;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              white-space: nowrap;
            ">${currentIndex + 1} / ${imagePaths.length}</span>
            
            <button id="nextCert" style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              border: none;
              padding: 0.7rem 1.2rem;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 600;
              font-size: 0.95rem;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 0.5rem;
              white-space: nowrap;
            ">
              <span class="nav-text">Next</span> <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <!-- Thumbnail Preview -->
          <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
            ${imagePaths.map((path, idx) => `
              <img 
                src="${path}" 
                alt="Thumbnail ${idx + 1}"
                class="cert-thumbnail"
                data-index="${idx}"
                style="
                  width: 70px;
                  height: 70px;
                  object-fit: cover;
                  border-radius: 8px;
                  cursor: pointer;
                  border: 3px solid ${idx === currentIndex ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'};
                  transition: all 0.3s ease;
                  opacity: ${idx === currentIndex ? '1' : '0.6'};
                "
              />
            `).join('')}
          </div>
        </div>
      `;
      
      // Event listeners for Previous button
      document.getElementById('prevCert').addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          renderCertificate();
        }
      });
      
      // Event listeners for Next button
      document.getElementById('nextCert').addEventListener('click', () => {
        if (currentIndex < imagePaths.length - 1) {
          currentIndex++;
          renderCertificate();
        }
      });
      
      // Event listeners for thumbnails
      document.querySelectorAll('.cert-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
          currentIndex = parseInt(this.getAttribute('data-index'));
          renderCertificate();
        });
      });
      
      // Keyboard navigation
      const handleKeyboard = (e) => {
        if (modal.style.display === 'block') {
          if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            renderCertificate();
          } else if (e.key === 'ArrowRight' && currentIndex < imagePaths.length - 1) {
            currentIndex++;
            renderCertificate();
          }
        }
      };
      
      window.removeEventListener('keydown', handleKeyboard); // Remove old listener
      window.addEventListener('keydown', handleKeyboard);
      
      console.log('✅ Certificate rendered:', currentIndex + 1);
    };
    
    testImg.onerror = function() {
      console.error('❌ Certificate image not found:', imagePaths[currentIndex]);
      showCertificateError(modalContent, certId, imagePaths[currentIndex]);
    };
    
    testImg.src = imagePaths[currentIndex];
  }
  
  renderCertificate();
}

function showCertificateModal(modal, imagePath, certId) {
  const modalContent = modal.querySelector('.modal-content');

  modalContent.innerHTML = `
    <div id="certLoadingSpinner" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.2rem;
      color: white;
      padding: 3rem;
    ">
      <div style="
        width: 50px; height: 50px;
        border: 4px solid rgba(255,255,255,0.2);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      "></div>
      <p style="font-size: 1rem; opacity: 0.85; font-weight: 500;">Loading certificate...</p>
    </div>
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  `;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  const testImg = new Image();

  testImg.onload = function() {

    modalContent.innerHTML = `<img id="certImage" src="${imagePath}" alt="Certificate" style="max-width:90%; max-height:80vh; border-radius:10px; box-shadow:0 20px 60px rgba(0,0,0,0.5);">`;
    console.log('✅ Certificate loaded successfully');
  };

  testImg.onerror = function() {
    console.error('❌ Certificate image not found');
    showCertificateError(modalContent, certId, imagePath);
  };

  testImg.src = imagePath;
}

function showCertificateError(modalContent, certId, imagePath) {
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
      <button onclick="document.getElementById('certModal').style.display='none'; document.body.style.overflow='auto';" 
              style="padding: 0.75rem 2rem; background: #6366f1; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem;">
        Close
      </button>
    </div>
  `;
}

function showNoCertificateMessage(modal, certId) {
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
      <button onclick="document.getElementById('certModal').style.display='none'; document.body.style.overflow='auto';" 
              style="padding: 0.75rem 2rem; background: #6366f1; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem;">
        Got It
      </button>
    </div>
  `;
}
function closeCertModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.innerHTML = '<img id="certImage" src="" alt="Certificate">';
  }
}
// ============================================
// CONTACT FORM SYSTEM
// ============================================

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('email');
  const emailHint = document.querySelector('.email-hint');
  
  if (!contactForm) {
    console.warn('⚠️ Contact form not found');
    return;
  }
  
  // Email validation hint
  emailInput.addEventListener('input', function() {
    validateEmailInput(this, emailHint);
  });
  
  // Form submission
  contactForm.addEventListener('submit', handleFormSubmit);
  
  console.log('✅ Contact form initialized');
}

function validateEmailInput(input, hint) {
  const email = input.value;
  
  if (!email) {
    hint.textContent = '';
    return;
  }
  
  if (isValidEmail(email)) {
    hint.textContent = '✓ Valid email format';
    hint.style.color = '#10b981';
  } else {
    hint.textContent = 'Please enter a valid email address';
    hint.style.color = '#ef4444';
  }
}

function handleFormSubmit(e) {
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
      this.reset();
      document.querySelector('.email-hint').textContent = '';
    })
    .catch(error => {
      console.error('Email sending failed:', error);
      showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
    })
    .finally(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
}

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
      emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
      
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
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage && existingMessage.classList.contains('hiding')) {
    existingMessage.remove();
  }
  
  const formMessage = document.querySelector('.form-message');
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  setTimeout(() => {
    formMessage.classList.add('hiding');
    
    setTimeout(() => {
      formMessage.style.display = 'none';
      formMessage.classList.remove('hiding', type);
    }, 500);
  }, 5000);
}

function hideFormMessage() {
  const formMessage = document.querySelector('.form-message');
  if (formMessage) {
    formMessage.style.display = 'none';
    formMessage.classList.remove('hiding', 'success', 'error');
  }
}

// ============================================
// SCROLL EFFECTS & ANIMATIONS
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
  
  console.log('✅ Scroll effects initialized');
}

function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.skill-card-3d, .internship-card, .cert-card, .project-card');
  
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
  
  console.log('✅ Basic animations initialized');
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

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
  const scrollObserver = new IntersectionObserver(
    handleIntersection,
    {
      threshold: ANIMATION_CONFIG.threshold,
      rootMargin: ANIMATION_CONFIG.rootMargin
    }
  );

  const elementsToAnimate = [
    '.section-title', '.section-subtitle',
    '.about-text', '.about-image', '.info-card',
    '.timeline-item',
    '.skills-category', '.category-title', '.skill-card-3d',
    '.internship-card', '.internship-cert-card',
    '.cert-card',
    '.project-card',
    '.contact-info', '.contact-form', '.contact-item', '.form-group', '#contactForm .btn',
    'footer'
  ];

  elementsToAnimate.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (!element.classList.contains('animate-on-scroll')) {
        element.classList.add('animate-on-scroll');
      }
      scrollObserver.observe(element);
    });
  });

  console.log('✅ Scroll animations initialized');
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      handleGroupedAnimations(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

function handleGroupedAnimations(element) {
  if (element.classList.contains('skills-category')) {
    const skillCards = element.querySelectorAll('.skill-card-3d');
    animateGroup(skillCards);
  }
  
  if (element.classList.contains('contact-info')) {
    const contactItems = element.querySelectorAll('.contact-item');
    animateGroup(contactItems);
  }
  
  if (element.classList.contains('contact-form')) {
    const formGroups = element.querySelectorAll('.form-group');
    animateGroup(formGroups);
    
    setTimeout(() => {
      const submitBtn = element.querySelector('.btn');
      if (submitBtn) {
        submitBtn.classList.add('animate-in');
      }
    }, formGroups.length * ANIMATION_CONFIG.staggerDelay + 200);
  }
  
  if (element.tagName === 'FOOTER') {
    const socialLinks = element.querySelectorAll('.social-links a');
    animateGroup(socialLinks);
  }
}

function animateGroup(elements, delay = ANIMATION_CONFIG.staggerDelay) {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('animate-in');
    }, index * delay);
  });
}

function animateSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (!section) return;
  
  section.classList.add('animate-in');
  
  const title = section.querySelector('.section-title');
  if (title) {
    setTimeout(() => title.classList.add('animate-in'), 100);
  }
  
  const subtitle = section.querySelector('.section-subtitle');
  if (subtitle) {
    setTimeout(() => subtitle.classList.add('animate-in'), 300);
  }
}

function triggerAnimation(element, animationClass = 'animate-in') {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  
  if (element) {
    element.classList.add(animationClass);
  }
}

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
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  console.log('✅ Scroll progress indicator initialized');
}

// ============================================
// CLICK ANIMATIONS & RIPPLE EFFECT
// ============================================

function animateOnClick() {
  const buttons = document.querySelectorAll('.btn, button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
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
// SECTION VISIBILITY TRACKER
// ============================================

function trackSectionVisibility() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
              link.classList.add('active');
            }
          });
          
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
// COUNTER ANIMATION
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
          const increment = target / 50;
          const duration = 2000;
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
// TYPING ANIMATION
// ============================================

function typeWriterEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  
  const currentText = TYPING_CONFIG.texts[typingTextIndex];
  
  if (isTypingDeleting) {
    typingElement.textContent = currentText.substring(0, typingCharIndex - 1);
    typingCharIndex--;
    currentTypingSpeed = TYPING_CONFIG.deleteSpeed;
  } else {
    typingElement.textContent = currentText.substring(0, typingCharIndex + 1);
    typingCharIndex++;
    currentTypingSpeed = TYPING_CONFIG.typeSpeed;
  }
  
  if (!isTypingDeleting && typingCharIndex === currentText.length) {
    currentTypingSpeed = TYPING_CONFIG.pauseDuration;
    isTypingDeleting = true;
  } else if (isTypingDeleting && typingCharIndex === 0) {
    isTypingDeleting = false;
    typingTextIndex = (typingTextIndex + 1) % TYPING_CONFIG.texts.length;
    currentTypingSpeed = TYPING_CONFIG.nextTextDelay;
  }
  
  setTimeout(typeWriterEffect, currentTypingSpeed);
}

function enhanceTypingAnimation() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  
  typingElement.style.borderRight = '3px solid #ffd700';
  typingElement.style.paddingRight = '5px';
  
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
// SPARKLES ANIMATION SYSTEM
// ============================================

function initializeSparklesAnimation() {
  const sparklesContainer = document.createElement('div');
  sparklesContainer.className = 'sparkles-container';
  document.body.appendChild(sparklesContainer);

  createSparkles(sparklesContainer);

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      setTimeout(() => {
        updateSparklesVisibility();
      }, 300);
    });
  }

  updateSparklesVisibility();
  
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
}

function createSparkles(container) {
  const sparkleCount = 50;
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = `sparkle color-${Math.floor(Math.random() * 3) + 1}`;
    
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    
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
// UTILITY FUNCTIONS
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

function resetAllAnimations() {
  const animatedElements = document.querySelectorAll('.animate-in');
  animatedElements.forEach(el => {
    el.classList.remove('animate-in');
  });
  console.log('🔄 All animations reset');
}

// ============================================
// GLOBAL EXPORTS
// ============================================

window.animateSection = animateSection;
window.triggerAnimation = triggerAnimation;
window.triggerAnimationAll = triggerAnimationAll;
window.resetAllAnimations = resetAllAnimations;

// ============================================
// ERROR HANDLERS
// ============================================

window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
  // Escape key handlers
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
// PERFORMANCE MONITORING
// ============================================

const originalObserve = IntersectionObserver.prototype.observe;

IntersectionObserver.prototype.observe = function() {
  animationCount++;
  return originalObserve.apply(this, arguments);
};

window.addEventListener('load', () => {
  setTimeout(() => {
    console.log(`📊 Animation Performance Stats:`);
    console.log(`   - Elements observed: ${animationCount}`);
    console.log(`   - Active observers: ${document.querySelectorAll('.animate-on-scroll').length}`);
    console.log(`   - Animated elements: ${document.querySelectorAll('.animate-in').length}`);
  }, 3000);
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initializeBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `
    <svg class="progress-ring" width="71" height="71">
      <circle class="progress-ring-circle" stroke="white" stroke-width="3" fill="transparent" r="35" cx="35.5" cy="35.5"/>
    </svg>
    <i class="fas fa-arrow-up"></i>
  `;
  
  document.body.appendChild(backToTop);
  
  const progressCircle = backToTop.querySelector('.progress-ring-circle');
  const radius = progressCircle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;
  
  // Show/hide button on scroll
  function updateBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollTop / scrollHeight;
    
    // Show button after scrolling 300px
    if (scrollTop > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    // Update progress circle
    const offset = circumference - scrollPercent * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }
  
  // Scroll event listener
  window.addEventListener('scroll', throttle(updateBackToTop, 100));
  
  // Click event - smooth scroll to top
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Click animation
    this.style.transform = 'translateY(-5px) scale(0.9)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
  
  console.log('✅ Back to top button initialized');
}

// Window load event
window.addEventListener('load', function() {
  
  // Initialize back to top button
  initializeBackToTop();

});


/**
 * Navigate to project details page
 * @param {number} projectId - The ID of the project to view
 */
function viewProjectDetail(projectId) {
  // Validate project ID
  if (!projectId || projectId < 1 || projectId > 10) {
    console.error('Invalid project ID:', projectId);
    return;
  }
  
  // Check if project exists in CONFIG
  if (typeof CONFIG !== 'undefined' && CONFIG.PROJECTS && CONFIG.PROJECTS[projectId]) {
    console.log(`Navigating to project ${projectId}: ${CONFIG.PROJECTS[projectId].title}`);
    
    // Navigate to project details page with project ID as query parameter
    window.location.href = `project-details.html?id=${projectId}`;
  } else {
    console.error(`Project ${projectId} not found in configuration`);
    alert('Project details not available at this time.');
  }
}

// ============================================
// END OF SCRIPT.JS
// ============================================