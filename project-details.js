// ============================================
// PROJECT DETAILS PAGE
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Hide loading overlay
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
    }, 300);
  }

  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId) {
    showErrorPage('No Project Found', 'Project ID is missing from URL. Redirecting to portfolio...');
    setTimeout(() => {
      window.location.href = 'index.html#projects';
    }, 2000);
    return;
  }

  // Check if CONFIG is loaded
  if (typeof CONFIG === 'undefined') {
    showErrorPage('Configuration Error', 'Configuration file failed to load. Please refresh the page.');
    return;
  }

  // Load project details
  loadProjectDetails(projectId);

  // Smooth scroll
  initializeSmoothScroll();
});

// ============================================
// LOAD PROJECT DETAILS
// ============================================

function loadProjectDetails(projectId) {
  if (!CONFIG.PROJECTS) {
    showErrorPage('Data Error', 'Project database not found.');
    return;
  }

  const project = CONFIG.PROJECTS[projectId];

  if (!project) {
    showErrorPage('Project Not Found', `Project #${projectId} could not be found. Redirecting to portfolio...`);
    setTimeout(() => {
      window.location.href = 'index.html#projects';
    }, 2000);
    return;
  }

  // Update page title
  document.title = `${project.title} - Abhishek Sahani`;

  // Update all sections
  updateProjectHeader(project, projectId);
  updateProjectContent(project);

  // Trigger animations
  setTimeout(() => {
    animatePageElements();
  }, 100);
}

// ============================================
// UPDATE HEADER
// ============================================

function updateProjectHeader(project, projectId) {
  const categoryMap = {
    1: 'Music Platform',
    2: 'Educational Tool',
    3: 'Creative Tool',
    4: 'Weather Information',
    5: 'Voice Web Application',
    6: 'Calculator',
    7: 'E-Commerce',
    8: 'Botanical Assistant',
    9: 'Finance Tool',
    10: 'QR Code Tool'
  };

  const titleEl     = document.getElementById('projectTitle');
  const categoryEl  = document.getElementById('projectCategory');
  const taglineEl   = document.getElementById('projectTagline');
  const liveLinkEl  = document.getElementById('livePreviewLink2');

  if (titleEl)    titleEl.textContent    = project.title;
  if (categoryEl) categoryEl.textContent = categoryMap[projectId] || 'Web Application';
  if (taglineEl)  taglineEl.textContent  = project.description;

  if (liveLinkEl && project.liveUrl) {
    liveLinkEl.href = project.liveUrl;
    liveLinkEl.setAttribute('target', '_blank');
    liveLinkEl.setAttribute('rel', 'noopener noreferrer');
  }
}

// ============================================
// UPDATE CONTENT SECTIONS
// ============================================

function updateProjectContent(project) {
  updateOverview(project);
  updateTechStack(project);
  updateFeatures(project);
  updateUserGuide(project);
  updateWhyMatters(project);
}

function updateOverview(project) {
  const el = document.getElementById('projectOverview');
  if (el) {
    el.textContent = project.overview || project.description;
  }
}

function updateTechStack(project) {
  const grid = document.getElementById('techStackGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const techList = (project.tech && project.tech.length > 0)
    ? project.tech
    : ['HTML5', 'CSS3', 'JavaScript'];

  techList.forEach((tech, index) => {
    const item = document.createElement('div');
    item.className = 'tech-item';
    item.textContent = tech;
    item.style.animationDelay = `${index * 0.08}s`;
    grid.appendChild(item);
  });
}

function updateFeatures(project) {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const featureList = (project.features && project.features.length > 0)
    ? project.features
    : [
        'Modern and responsive design',
        'User-friendly interface',
        'Clean and maintainable code'
      ];

  featureList.forEach((feature, index) => {
    const item = document.createElement('div');
    item.className = 'feature-item';
    item.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>${feature}</p>
    `;
    item.style.animationDelay = `${index * 0.08}s`;
    grid.appendChild(item);
  });
}

function updateUserGuide(project) {
  const list = document.getElementById('userGuideList');
  if (!list) return;

  list.innerHTML = '';

  const steps = (project.userGuide && project.userGuide.length > 0)
    ? project.userGuide
    : [
        'Visit the live project link',
        'Explore the features and interface',
        'Try different functionalities',
        'Provide feedback for improvements'
      ];

  steps.forEach((step, index) => {
    const li = document.createElement('li');
    li.textContent = step;
    li.style.animationDelay = `${index * 0.1}s`;
    list.appendChild(li);
  });
}

function updateWhyMatters(project) {
  const el = document.getElementById('whyMatters');
  if (el) {
    el.textContent = project.whyMatters ||
      'This project demonstrates important development skills, problem-solving abilities, and modern web development practices.';
  }
}

// ============================================
// NAVIGATION
// ============================================

function goBack() {
  if (document.referrer && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = 'index.html#projects';
  }
}

// Escape key = go back
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') goBack();
});

// ============================================
// ERROR PAGE
// ============================================

function showErrorPage(title, message) {
  const container = document.querySelector('.project-details-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1.5rem; color: #ef4444;"></i>
        <h1 style="font-size: 2rem; margin-bottom: 1rem; color: #1a202c;">${title}</h1>
        <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #64748b;">${message}</p>
        <button onclick="window.location.href='index.html#projects'"
                style="background: #667eea; color: white; border: none; padding: 0.8rem 2rem;
                       border-radius: 50px; font-weight: 600; cursor: pointer; font-size: 1rem;">
          Back to Portfolio
        </button>
      </div>
    `;
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// ANIMATIONS
// ============================================

function animatePageElements() {
  const elements = document.querySelectorAll('.detail-section');

  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
}