$(document).ready(function() {
  'use strict';

  
  // Sidebar Dropdown toggle functionality
  $('.adb-nav-link.adb-dropdown-toggle').on('click', function(e) {
      e.preventDefault();
      
      const $this = $(this);
      const $dropdown = $this.siblings('.adb-dropdown-menu');
      
      // Close other dropdowns
      $('.adb-dropdown-menu.adb-show').not($dropdown).removeClass('adb-show');
      $('.adb-nav-link.adb-expanded').not($this).removeClass('adb-expanded');
      
      // Toggle current dropdown
      $dropdown.toggleClass('adb-show');
      $this.toggleClass('adb-expanded');
  });
  
  // Close dropdown when clicking outside
  $(document).on('click', function(e) {
      if (!$(e.target).closest('.adb-nav-item').length) {
          $('.adb-dropdown-menu.adb-show').removeClass('adb-show');
          $('.adb-nav-link.adb-expanded').removeClass('adb-expanded');
      }
  });
  
  // Handle dropdown item clicks
  $('.adb-dropdown-item').on('click', function(e) {
      // e.preventDefault();
      console.log('Clicked:', $(this).text());
      // Add your navigation logic here
  });


  // profile name dropdown menu
  // Add this to your existing dropdown toggle functionality
$('.adb-avatar-name.adb-dropdown-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const $this = $(this);
    const $dropdown = $this.siblings('.adb-user-dropdown');
    
    // Close other dropdowns
    $('.adb-dropdown-menu.adb-show').not($dropdown).removeClass('adb-show');
    $('.adb-dropdown-toggle.adb-expanded').not($this).removeClass('adb-expanded');
    
    // Toggle current dropdown
    $dropdown.toggleClass('adb-show');
    $this.toggleClass('adb-expanded');
});

// Handle user dropdown item clicks
$('.adb-user-dropdown .adb-dropdown-item').on('click', function(e) {
    e.preventDefault();
    const action = $(this).find('span').text();
    console.log('User action clicked:', action);
    
    // Add your specific logic for each menu item
    if ($(this).hasClass('adb-logout')) {
        // Handle logout
        console.log('Logging out...');
        // Add logout logic here
    }
});

 // FAQ Accordion functionality
    $(function(){
      $(".faq-question").on("click", function(){
        var parent = $(this).closest(".faq-item");
        parent.toggleClass("active");
        parent.siblings().removeClass("active");
      });
    });


  
  // Dashboard namespace
  const ArabicDashboard = {
    
    // Initialize dashboard
    init: function() {
      this.setupMobileMenu();
      this.setupLanguageToggle();
      this.setupAnimations();
      this.setupResponsive();
      this.initializeComponents();
    },
    
    // Setup mobile menu functionality
    setupMobileMenu: function() {
      const $sidebar = $('.adb-sidebar');
      const $mobileToggle = $('.adb-mobile-toggle');
      const $body = $('body');
      
      // Create overlay for mobile
      if (!$('.adb-sidebar-overlay').length) {
        $body.append('<div class="adb-sidebar-overlay"></div>');
      }
      
      const $overlay = $('.adb-sidebar-overlay');
      
      // Toggle mobile menu
      $mobileToggle.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        $sidebar.toggleClass('show');
        $overlay.toggleClass('show');
        $body.toggleClass('adb-sidebar-open');
      });
      
      // Close menu when clicking overlay
      $overlay.on('click', function() {
        $sidebar.removeClass('show');
        $overlay.removeClass('show');
        $body.removeClass('adb-sidebar-open');
      });
      
      // Close menu when clicking outside on mobile
      $(document).on('click', function(e) {
        if ($(window).width() <= 991) {
          if (!$(e.target).closest('.adb-sidebar, .adb-mobile-toggle').length) {
            $sidebar.removeClass('show');
            $overlay.removeClass('show');
            $body.removeClass('adb-sidebar-open');
          }
        }
      });
      
      // Handle window resize
      $(window).on('resize', function() {
        if ($(window).width() > 991) {
          $sidebar.removeClass('show');
          $overlay.removeClass('show');
          $body.removeClass('adb-sidebar-open');
        }
      });
    },
    
    // Setup language toggle functionality
    setupLanguageToggle: function() {
      window.toggleLanguage = function() {
        const $html = $('html');
        const currentLang = $html.attr('lang');
        const currentDir = $html.attr('dir');
        
        if (currentLang === 'ar') {
          // Switch to English
          $html.attr('lang', 'en').attr('dir', 'ltr');
          
          // Update text content for English
          $('.adb-sidebar-title').text('Main Page');
          $('.adb-nav-link span').each(function(index) {
            const englishTexts = [
              'Dashboard',
              'Floors & Units List',
              'Invoices List',
              'Profile',
              'Help & Support',
              'Logout'
            ];
            if (englishTexts[index]) {
              $(this).text(englishTexts[index]);
            }
          });
          
          // Update stat labels
          $('.adb-stat-label').each(function(index) {
            const englishLabels = [
              'Total Invoice Value',
              'Paid Invoices Value',
              'Unpaid Invoices Value',
              'Pending Confirmation Value',
              'Cancelled Invoices Value',
              'Total Invoices Count',
              'Paid Invoices Count',
              'Unpaid Invoices Count',
              'Pending Confirmation Count',
              'Unit Floors Count',
              'Electricity Meters Count',
              'Water Meters Count'
            ];
            if (englishLabels[index]) {
              $(this).text(englishLabels[index]);
            }
          });
          
          // Update user info
          $('.adb-user-name').text('Waleed Salem Al-Jabri');
          $('.adb-user-status').text('Active');
          
          // Update footer
          // $('.adb-footer-text').first().html('<i class="fas fa-code"></i> Development: Information Systems Development');
          // $('.adb-footer-text').last().text('© Majeed Tower - All Rights Reserved 2025');
          
          // Update navigation
          $('.adb-nav-links .adb-nav-link').each(function(index) {
            const navTexts = ['Home', 'Dashboard'];
            if (navTexts[index]) {
              $(this).text(navTexts[index]);
            }
          });
          
        } else {
          // Switch to Arabic
          $html.attr('lang', 'ar').attr('dir', 'rtl');
          
          // Restore Arabic text content
          $('.adb-sidebar-title').text('الصفحة الرئيسية');
          $('.adb-nav-link span').each(function(index) {
            const arabicTexts = [
              'لوحة التحكم',
              'قائمة الطوابق والوحدات',
              'قائمة الفواتير',
              'الملف الشخصي',
              'المساعدة والدعم',
              'تسجيل خروج'
            ];
            if (arabicTexts[index]) {
              $(this).text(arabicTexts[index]);
            }
          });
          
          // Restore Arabic stat labels
          $('.adb-stat-label').each(function(index) {
            const arabicLabels = [
              'قيمة الفواتير الكلية',
              'قيمة الفواتير المدفوعة',
              'قيمة الفواتير غير المدفوعة',
              'قيمة الفواتير في انتظار التأكيد',
              'قيمة الفواتير المُلغاة',
              'عدد الفواتير الكلي',
              'عدد الفواتير المدفوعة',
              'عدد الفواتير غير المدفوعة',
              'عدد الفواتير في انتظار التأكيد',
              'عدد طوابق الوحدة',
              'عدد عدادات الكهرباء',
              'عدد عدادات المياه'
            ];
            if (arabicLabels[index]) {
              $(this).text(arabicLabels[index]);
            }
          });
          
          // Restore Arabic user info
          $('.adb-user-name').text('وليد سالم الجابري');
          $('.adb-user-status').text('فعال');
          
          // Restore Arabic footer
          // $('.adb-footer-text').first().html('<i class="fas fa-code"></i> تطوير: تطوير أنظمة المعلومات');
          // $('.adb-footer-text').last().text('© برج مجيد - جميع الحقوق محفوظة 2025');
          
          // Restore Arabic navigation
          $('.adb-nav-links .adb-nav-link').each(function(index) {
            const navTexts = ['الرئيسية', 'لوحة التحكم'];
            if (navTexts[index]) {
              $(this).text(navTexts[index]);
            }
          });
        }
        
        // Add animation class
        $('.adb-content').addClass('adb-fade-in');
        setTimeout(function() {
          $('.adb-content').removeClass('adb-fade-in');
        }, 500);
      };
    },
    
    // Setup animations
    setupAnimations: function() {
      // Animate stats cards on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            $(entry.target).addClass('adb-fade-in');
          }
        });
      }, observerOptions);
      
      $('.adb-stat-card').each(function() {
        observer.observe(this);
      });
      
      // Counter animation for numbers
      this.animateCounters();
    },
    
    // Animate counter numbers
    animateCounters: function() {
      $('.adb-stat-number').each(function() {
        const $this = $(this);
        const countTo = parseInt($this.text().replace(/,/g, ''));
        
        if (!isNaN(countTo)) {
          $({ countNum: 0 }).animate({
            countNum: countTo
          }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum).toLocaleString());
            },
            complete: function() {
              $this.text(countTo.toLocaleString());
            }
          });
        }
      });
    },
    
    // Setup responsive behavior
    setupResponsive: function() {
      const $window = $(window);
      
      // Handle responsive changes
      $window.on('resize', function() {
        const windowWidth = $window.width();
        
        // Adjust card layouts on mobile
        if (windowWidth <= 767) {
          $('.adb-stat-card .card-body').addClass('text-center');
        } else {
          $('.adb-stat-card .card-body').removeClass('text-center');
        }
      }).trigger('resize');
    },
    
    // Initialize additional components
    initializeComponents: function() {
      // Initialize tooltips if Bootstrap is available
      if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }
      
      // Initialize intl-tel-input if available and needed
      if (typeof intlTelInput !== 'undefined') {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(function(input) {
          intlTelInput(input, {
            preferredCountries: ['sa', 'ae', 'kw', 'qa'],
            separateDialCode: true
          });
        });
      }
      
      // Add smooth scrolling
      $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
          e.preventDefault();
          $('html, body').stop().animate({
            scrollTop: target.offset().top - 100
          }, 1000);
        }
      });
    },
    
    // Utility functions
    utils: {
      // Format numbers with commas
      formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      
      // Show notification (can be extended with toast library)
      showNotification: function(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        // Can be extended with actual notification library
      },
      
      // Debounce function
      debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
          const context = this;
          const args = arguments;
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
    }
  };
  
  // Initialize dashboard
  ArabicDashboard.init();
  
  // Make dashboard available globally
  window.ArabicDashboard = ArabicDashboard;
  
  // Additional event handlers
  $('.adb-sidebar-nav .adb-nav-link').on('click', function(e) {
    // Remove active class from all links
    $('.adb-sidebar-nav .adb-nav-link').removeClass('active');
    // Add active class to clicked link
    $(this).addClass('active');
    
    // Close mobile menu if open
    if ($(window).width() <= 991) {
      $('.adb-sidebar').removeClass('show');
      $('.adb-sidebar-overlay').removeClass('show');
      $('body').removeClass('adb-sidebar-open');
    }
  });
  
  // Handle stat card clicks (can be extended for navigation)
  $('.adb-stat-card').on('click', function() {
    $(this).addClass('adb-fade-in');
    setTimeout(() => {
      $(this).removeClass('adb-fade-in');
    }, 500);
  });
  
  // Keyboard navigation support
  $(document).on('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.keyCode === 27) {
      $('.adb-sidebar').removeClass('show');
      $('.adb-sidebar-overlay').removeClass('show');
      $('body').removeClass('adb-sidebar-open');
    }
  });

  
  // Initialize all tooltips
  $('[data-bs-toggle="tooltip"]').tooltip();


  // OTP Input logic
  $(".otp-input").on("input", function() {
    if (this.value.length === 1) {
      $(this).addClass("filled");
      $(this).next(".otp-input").focus(); // move to next
    } else {
      $(this).removeClass("filled");
    }
  });

  $(".otp-input").on("keydown", function(e) {
    if (e.key === "Backspace" && this.value === "") {
      $(this).prev(".otp-input").focus();
    }
  });

  // Countdown timer
  let time = 120; // 2 minutes
  function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    $("#otp-timer").text(
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    );
    if (time > 0) {
      time--;
      setTimeout(updateTimer, 1000);
    } else {
      $("#otp-timer").text("انتهى الوقت");
      $(".otp-input").prop("disabled", true);
    }
  }
  updateTimer();

    
});
