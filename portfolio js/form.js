// Form Validation System

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
    this.isValid = true;
    this.init();
  }

  init() {
    if (!this.form) return;
    
    // Add real-time validation
    this.addRealTimeValidation();
    
    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Add visual feedback elements
    this.addValidationElements();
  }

  addValidationElements() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      // Create error message container
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.id = `${input.id}-error`;
      input.parentNode.appendChild(errorDiv);
      
      // Add success indicator
      const successDiv = document.createElement('div');
      successDiv.className = 'field-success';
      successDiv.innerHTML = '✓';
      input.parentNode.appendChild(successDiv);
    });
  }

  addRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Validate on blur (when user leaves field)
      input.addEventListener('blur', () => {
        this.validateField(input);
        this.updateFieldVisuals(input);
      });
      
      // Clear errors on focus
      input.addEventListener('focus', () => {
        this.clearFieldError(input);
      });
      
      // Real-time validation for specific fields
      if (input.type === 'email') {
        input.addEventListener('input', this.debounce(() => {
          this.validateField(input);
          this.updateFieldVisuals(input);
        }, 500));
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors for this field
    delete this.errors[fieldName];

    switch (fieldName) {
      case 'name':
        const nameValidation = this.validateName(value);
        if (!nameValidation.isValid) {
          isValid = false;
          errorMessage = nameValidation.message;
        }
        break;

      case 'email':
        const emailValidation = this.validateEmail(value);
        if (!emailValidation.isValid) {
          isValid = false;
          errorMessage = emailValidation.message;
        }
        break;

      case 'subject':
        const subjectValidation = this.validateSubject(value);
        if (!subjectValidation.isValid) {
          isValid = false;
          errorMessage = subjectValidation.message;
        }
        break;

      case 'message':
        const messageValidation = this.validateMessage(value);
        if (!messageValidation.isValid) {
          isValid = false;
          errorMessage = messageValidation.message;
        }
        break;
    }

    if (!isValid) {
      this.errors[fieldName] = errorMessage;
    }

    return isValid;
  }

  validateName(name) {
    if (!name) {
      return { isValid: false, message: 'Name is required' };
    }
    
    if (name.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    
    if (name.length > 50) {
      return { isValid: false, message: 'Name must be less than 50 characters' };
    }
    
    // Check for valid characters
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name)) {
      return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    
    // Check for consecutive spaces or special characters
    if (/\s{2,}/.test(name) || /[-']{2,}/.test(name)) {
      return { isValid: false, message: 'Invalid name format' };
    }

    return { isValid: true, message: '' };
  }

  validateEmail(email) {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }

    // More comprehensive email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    if (email.length > 254) {
      return { isValid: false, message: 'Email address is too long' };
    }

    // Check for common typos in popular domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1];
    const suggestions = this.getSimilarDomain(domain, commonDomains);
    
    if (suggestions.length > 0) {
      return { 
        isValid: true, 
        message: '', 
        suggestion: `Did you mean ${email.split('@')[0]}@${suggestions[0]}?` 
      };
    }

    return { isValid: true, message: '' };
  }

  validateSubject(subject) {
    if (!subject) {
      return { isValid: false, message: 'Subject is required' };
    }
    
    if (subject.length < 3) {
      return { isValid: false, message: 'Subject must be at least 3 characters long' };
    }
    
    if (subject.length > 100) {
      return { isValid: false, message: 'Subject must be less than 100 characters' };
    }

    // Check for spam-like patterns
    const spamPatterns = [
      /^(urgent|important|act now|free|win|cash|money|loan)/i,
      /[!]{3,}/,
      /[A-Z]{10,}/
    ];
    
    for (let pattern of spamPatterns) {
      if (pattern.test(subject)) {
        return { isValid: false, message: 'Subject appears to be spam-like. Please use a more professional subject.' };
      }
    }

    return { isValid: true, message: '' };
  }

  validateMessage(message) {
    if (!message) {
      return { isValid: false, message: 'Message is required' };
    }
    
    if (message.length < 10) {
      return { isValid: false, message: 'Message must be at least 10 characters long' };
    }
    
    if (message.length > 2000) {
      return { isValid: false, message: 'Message must be less than 2000 characters' };
    }

    // Check for excessive repetition
    if (/(.)\1{10,}/.test(message)) {
      return { isValid: false, message: 'Message contains excessive character repetition' };
    }

    // Word count validation
    const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 3) {
      return { isValid: false, message: 'Message must contain at least 3 words' };
    }

    return { isValid: true, message: '' };
  }

  getSimilarDomain(domain, commonDomains) {
    return commonDomains.filter(commonDomain => {
      return this.levenshteinDistance(domain, commonDomain) <= 2 && domain !== commonDomain;
    });
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  updateFieldVisuals(field) {
    const fieldName = field.name;
    const errorDiv = document.getElementById(`${field.id}-error`);
    const successDiv = field.parentNode.querySelector('.field-success');
    const hasError = this.errors[fieldName];

    // Remove previous states
    field.classList.remove('field-valid', 'field-invalid', 'field-warning');
    errorDiv.textContent = '';
    errorDiv.className = 'field-error';
    successDiv.style.opacity = '0';

    if (field.value.trim() === '') {
      // Empty field - neutral state
      return;
    }

    if (hasError) {
      // Error state - removed vibration animation
      field.classList.add('field-invalid');
      errorDiv.textContent = hasError;
      errorDiv.classList.add('show');
    } else {
      // Valid state
      field.classList.add('field-valid');
      successDiv.style.opacity = '1';
      
      // Check for suggestions (like email suggestions)
      const validation = this.getFieldValidation(field);
      if (validation && validation.suggestion) {
        errorDiv.textContent = validation.suggestion;
        errorDiv.classList.add('suggestion');
        field.classList.add('field-warning');
      }
    }
  }

  getFieldValidation(field) {
    const value = field.value.trim();
    switch (field.name) {
      case 'email':
        return this.validateEmail(value);
      default:
        return null;
    }
  }

  clearFieldError(field) {
    const errorDiv = document.getElementById(`${field.id}-error`);
    field.classList.remove('field-invalid');
    errorDiv.classList.remove('show');
  }

  validateForm() {
    this.errors = {};
    this.isValid = true;
    
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      const fieldValid = this.validateField(input);
      this.updateFieldVisuals(input);
      
      if (!fieldValid) {
        this.isValid = false;
      }
    });

    return this.isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Reset form message
    this.clearFormMessage();
    
    // Validate entire form
    if (this.validateForm()) {
      this.submitForm();
    } else {
      this.showFormMessage('Please correct the errors above.', 'error');
      
      // Focus on first error field
      const firstErrorField = this.form.querySelector('.field-invalid');
      if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
      // Simulate API call (replace with actual submission logic)
      await this.simulateSubmission();
      
      this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
      this.form.reset();
      
      // Clear all field states
      const fields = this.form.querySelectorAll('input, textarea');
      fields.forEach(field => {
        field.classList.remove('field-valid', 'field-invalid', 'field-warning');
        const errorDiv = document.getElementById(`${field.id}-error`);
        const successDiv = field.parentNode.querySelector('.field-success');
        if (errorDiv) errorDiv.textContent = '';
        if (successDiv) successDiv.style.opacity = '0';
      });
      
    } catch (error) {
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  }

  simulateSubmission() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% success rate)
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Animate in
    setTimeout(() => {
      messageDiv.classList.add('show');
    }, 10);
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        this.clearFormMessage();
      }, 5000);
    }
  }

  clearFormMessage() {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
      messageDiv.classList.remove('show');
      setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
      }, 300);
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

  // Initialize the enhanced form validator
  const formValidator = new FormValidator('contact-form');
  
  // Add character counter for message field
  const messageField = document.getElementById('message');
  if (messageField) {
    addCharacterCounter(messageField, 2000);
  }