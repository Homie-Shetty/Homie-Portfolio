

function playLoginSound() {
  // Placeholder: play a sound effect (to be implemented with an actual audio file)
  // Example: new Audio('../src/assets/login.wav').play();
}

function glitchText(text) {
  // Simple glitch: randomly replace some chars with symbols for a frame
  const chars = '!@#$%^&*()_+=-[]{};:<>?/|';
  return text.split('').map(c => (Math.random() < 0.2 ? chars[Math.floor(Math.random() * chars.length)] : c)).join('');
}

function startLoginSequence() {
  const steps = [
    'Accessing secure vault...',
    'Identity verified: [USERNAME]',
    'Access granted ✅'
  ];
  let i = 0;
  function nextStep() {
    if (i < steps.length) {
      let frame = 0;
      function animateGlitch() {
        if (frame < 6) {
          printToTerminal(glitchText(steps[i]));
          frame++;
          setTimeout(animateGlitch, 40);
        } else {
          printToTerminal(steps[i]);
          playLoginSound();
          i++;
          setTimeout(nextStep, 700);
        }
      }
      animateGlitch();
    }
  }
  nextStep();
}

function startMatrixEasterEgg() {
  // Clear terminal
  terminalOutput.innerHTML = '';
  const cols = 40;
  const rows = 16;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  let rain = Array(cols).fill(0);
  let interval;
  function drawMatrix() {
    let output = '';
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.975) {
          rain[c] = 0;
        }
        if (rain[c] > r) {
          line += charset[Math.floor(Math.random() * charset.length)];
        } else {
          line += ' ';
        }
      }
      output += `<div class='text-green-400 font-mono'>${line}</div>`;
    }
    terminalOutput.innerHTML = output;
    rain = rain.map(y => y > rows ? 0 : y + (Math.random() > 0.9 ? 2 : 1));
  }
  interval = setInterval(drawMatrix, 60);
  setTimeout(() => {
    clearInterval(interval);
    terminalOutput.innerHTML = '';
    printToTerminal('Wake up, dev... The world is yours to hack. 🟩');
    printToTerminal('You have unlocked the Matrix badge!');
  }, 3500);
}
