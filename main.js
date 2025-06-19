// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = document.querySelector('#theme-toggle i');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle scroll for active nav links
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            this.closeMenu();
            this.setActiveLink(e.target);
        }
    }

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchData = [
            'Responsive Design', 'Dark Theme', 'Light Theme', 'JavaScript',
            'HTML5', 'CSS3', 'Web Development', 'Frontend', 'Backend',
            'React', 'Vue', 'Angular', 'Node.js', 'Express', 'MongoDB',
            'API', 'REST', 'GraphQL', 'TypeScript', 'Webpack', 'Vite',
            'Bootstrap', 'Tailwind', 'SASS', 'LESS', 'jQuery', 'Animation',
            'Responsive', 'Mobile First', 'Progressive Web App', 'PWA'
        ];
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showResults());
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });
    }

    handleSearch(query) {
        if (query.length === 0) {
            this.hideResults();
            return;
        }

        const filteredResults = this.searchData.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(filteredResults, query);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            this.searchResults.innerHTML = results.map(result => {
                const highlightedResult = result.replace(
                    new RegExp(query, 'gi'),
                    match => `<strong>${match}</strong>`
                );
                return `<div class="search-result-item">${highlightedResult}</div>`;
            }).join('');
        }
        this.showResults();
    }

    showResults() {
        this.searchResults.style.display = 'block';
    }

    hideResults() {
        this.searchResults.style.display = 'none';
    }
}

// Gallery Management
class GalleryManager {
    constructor() {
        this.galleryGrid = document.getElementById('gallery-grid');
        this.modal = document.getElementById('gallery-modal');
        this.modalImage = document.getElementById('modal-image');
        this.modalClose = document.getElementById('modal-close');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.currentImageIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.generateGallery();
        this.setupModalEvents();
    }

    generateGallery() {
        // Using Pexels images for demonstration
        const imageUrls = [
            'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400'
        ];

        this.images = imageUrls;
        
        this.galleryGrid.innerHTML = imageUrls.map((url, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${url}" alt="Gallery Image ${index + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');

        // Add click events to gallery items
        this.galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.openModal(index);
            });
        });
    }

    setupModalEvents() {
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    openModal(index) {
        this.currentImageIndex = index;
        this.modalImage.src = this.images[index];
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.modalImage.src = this.images[this.currentImageIndex];
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.modalImage.src = this.images[this.currentImageIndex];
    }
}

// Chart Management
class ChartManager {
    constructor() {
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.data = [65, 59, 80, 81, 56, 55, 40];
        this.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.animationProgress = 0;
        this.init();
    }

    init() {
        this.setupCanvas();
        this.animate();
    }

    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    animate() {
        this.animationProgress += 0.02;
        if (this.animationProgress > 1) this.animationProgress = 1;

        this.drawChart();

        if (this.animationProgress < 1) {
            requestAnimationFrame(() => this.animate());
        }
    }

    drawChart() {
        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;
        const padding = 60;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Set styles
        this.ctx.strokeStyle = '#667eea';
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Draw grid
        this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();
        }

        // Draw chart line
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        const maxValue = Math.max(...this.data);
        const points = [];

        this.data.forEach((value, index) => {
            const x = padding + (chartWidth / (this.data.length - 1)) * index;
            const y = padding + chartHeight - (value / maxValue) * chartHeight * this.animationProgress;
            points.push({ x, y });

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();

        // Draw area under curve
        this.ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, height - padding);
        points.forEach(point => this.ctx.lineTo(point.x, point.y));
        this.ctx.lineTo(points[points.length - 1].x, height - padding);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw points
        this.ctx.fillStyle = '#667eea';
        points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw labels
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
        this.ctx.font = '12px Inter, sans-serif';
        this.ctx.textAlign = 'center';
        
        this.labels.forEach((label, index) => {
            const x = padding + (chartWidth / (this.labels.length - 1)) * index;
            this.ctx.fillText(label, x, height - padding + 20);
        });
    }
}

// Form Management
class FormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toast-message');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        if (this.validateForm(data)) {
            this.submitForm(data);
        }
    }

    validateForm(data) {
        let isValid = true;
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            this.showError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            this.showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    this.showError(fieldName, 'Name must be at least 2 characters long');
                    return false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(fieldName, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    this.showError(fieldName, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        this.clearError(field);
        return true;
    }

    showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const field = document.getElementById(fieldName);
        
        errorElement.textContent = message;
        field.style.borderColor = '#e74c3c';
    }

    clearError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        errorElement.textContent = '';
        field.style.borderColor = '';
    }

    async submitForm(data) {
        const submitButton = this.form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        this.showToast('Message sent successfully!', 'success');
        this.form.reset();
    }

    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, this.observerOptions);

        // Observe all feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            this.observer.observe(card);
        });
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.searchManager = new SearchManager();
        this.galleryManager = new GalleryManager();
        this.chartManager = new ChartManager();
        this.formManager = new FormManager();
        this.scrollAnimations = new ScrollAnimations();

        // Setup global event listeners
        this.setupGlobalEvents();
    }

    setupGlobalEvents() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.themeManager.toggle();
        });

        // CTA button
        document.getElementById('cta-button').addEventListener('click', () => {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        });

        // Handle window resize for chart
        window.addEventListener('resize', () => {
            if (this.chartManager) {
                this.chartManager.setupCanvas();
                this.chartManager.drawChart();
            }
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Start the application
new App();