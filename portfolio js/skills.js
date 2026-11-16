// Character counter utility

function addCharacterCounter(textarea, maxLength) {
  const counter = document.createElement('div');
  counter.className = 'character-counter';
  counter.textContent = `0 / ${maxLength}`;
  textarea.parentNode.appendChild(counter);
  
  textarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
    
    if (currentLength > maxLength * 0.9) {
      counter.classList.add('warning');
    } else {
      counter.classList.remove('warning');
    }
    
    if (currentLength > maxLength) {
      counter.classList.add('error');
    } else {
      counter.classList.remove('error');
    }
  });
}