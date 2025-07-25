// Terminal core logic

window.terminalInit = function() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  function printToTerminal(text, options = {}) {
    const line = document.createElement('div');
    line.textContent = text;
    if (options.className) line.className = options.className;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Typewriter animation for terminal lines
  function animateTerminalLine(text, options = {}, cb) {
    const line = document.createElement('div');
    if (options.className) line.className = options.className;
    terminalOutput.appendChild(line);
    let i = 0;
    function type() {
      line.textContent = text.slice(0, i);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      if (i < text.length) {
        i++;
        setTimeout(type, 12); // speed of typing
      } else if (cb) {
        cb();
      }
    }
    type();
  }

  // Expose globally for login.js and Matrix
  window.printToTerminal = printToTerminal;
  window.animateTerminalLine = animateTerminalLine;
  window.terminalOutput = terminalOutput;

  // Allow contenteditable input to submit commands
  window.handleCommandFromContentEditable = handleCommand;

  function handleCommand(cmd) {
    const command = cmd.trim();
    if (!command) return;
    animateTerminalLine('> ' + command, { className: 'text-green-500' }, () => {
      if (command === 'help') {
        const helpLines = [
          'Available commands:',
          '  help         - Show this help message',
          '  login        - Access the system (fun animation)',
          '  aboutme      - Learn about the developer',
          '  projects     - View featured projects',
          '  certificates - List certificates',
          '  socials      - Show social links',
          '  clear        - Clear the terminal',
          '  easteregg    - Find a secret badge',
          '  sudo hacktheworld - ???',
        ];
        let delay = 0;
        helpLines.forEach(line => {
          setTimeout(() => animateTerminalLine(line), delay);
          delay += 300;
        });
      } else if (command === 'clear') {
        terminalOutput.innerHTML = '';
      } else if (command === 'socials') {
        const socials = [
          { name: 'GitHub', url: 'https://github.com/GODTREX' },
          { name: 'Instagram', url: 'https://www.instagram.com/homie_shettyy?igsh=MTBvMnptMXYzMno0cw==' },
          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harshith-shetty-3562ba256' },
          { name: 'Twitter', url: 'https://twitter.com/yourusername' },
        ];
        let delay = 0;
        animateTerminalLine('🌐 Social Links:', { className: 'text-green-400' });
        socials.forEach(s => {
          setTimeout(() => {
            const a = document.createElement('a');
            a.href = s.url;
            a.textContent = `  • ${s.name}`;
            a.target = '_blank';
            a.style.color = '#39ff14';
            a.style.textDecoration = 'underline';
            const line = document.createElement('div');
            line.appendChild(a);
            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
          }, delay);
          delay += 350;
        });
      } else if (command === 'certificates') {
        const certs = [
          '📜 Certificates:',
          '  • JavaScript Algorithms and Data Structures (freeCodeCamp)',
          '  • Responsive Web Design (freeCodeCamp)',
          '  • Frontend Development Libraries (freeCodeCamp)',
          '  • Python for Everybody (Coursera)',
          '  • Google IT Support (Coursera)',
          '  • [Add your own!]',
        ];
        let delay = 0;
        certs.forEach(line => {
          setTimeout(() => animateTerminalLine(line), delay);
          delay += 350;
        });
      } else if (command === 'login') {
        startLoginSequence(); // from login.js (keeps glitch effect)
      } else if (command === 'aboutme') {
        animateTerminalLine('user: harshith_shetty');
        setTimeout(() => animateTerminalLine('role: creative developer'), 400);
        setTimeout(() => animateTerminalLine('focus: interactive web, gamified UI, creative code'), 800);
        setTimeout(() => animateTerminalLine('skills: html, css, js, phaser.js, gsap, canvas'), 1200);
        setTimeout(() => animateTerminalLine('status: open to collab | internship | freelance'), 1600);
      } else if (command === 'projects') {
        const projects = [
          { name: 'Pixel Platformer', desc: 'A retro pixel-art platformer game built with Phaser.js.', tech: 'Phaser.js, JavaScript, HTML5', link: 'https://github.com/sample/pixel-platformer' },
          { name: 'Terminal Portfolio', desc: 'This interactive hacker-themed portfolio site.', tech: 'HTML, CSS, JS, Tailwind', link: 'https://github.com/sample/terminal-portfolio' },
          { name: 'Story Engine', desc: 'A branching narrative engine for interactive fiction.', tech: 'JavaScript, Node.js', link: 'https://github.com/sample/story-engine' },
        ];
        let delay = 0;
        animateTerminalLine('Projects:', { className: 'text-green-400' });
        projects.forEach((proj, idx) => {
          setTimeout(() => animateTerminalLine(`  [${idx+1}] ${proj.name} - ${proj.desc}`), delay += 350);
        });
        setTimeout(() => animateTerminalLine('Type project [number] (e.g., project 1) to view details.'), delay += 400);
        // Listen for project detail commands
        window.handleProjectDetail = function(detailCmd) {
          const match = detailCmd.match(/^project (\d)$/i);
          if (match) {
            const i = parseInt(match[1], 10) - 1;
            if (projects[i]) {
              animateTerminalLine(`Project: ${projects[i].name}`, { className: 'text-green-400' });
              setTimeout(() => animateTerminalLine(`Description: ${projects[i].desc}`), 350);
              setTimeout(() => animateTerminalLine(`Tech: ${projects[i].tech}`), 700);
              setTimeout(() => animateTerminalLine(`Repo: ${projects[i].link}`), 1050);
            } else {
              animateTerminalLine('No such project.');
            }
            return true;
          }
          return false;
        };
      } else if (window.handleProjectDetail && window.handleProjectDetail(command)) {
        // handled by project detail
        return;
      } else if (command === 'easteregg') {
        animateTerminalLine('🐣 You found a secret! Here is your badge: [HACKER EGG BADGE]');
        setTimeout(() => animateTerminalLine('Hint: Try the command: sudo hacktheworld'), 600);
      } else if (command === 'sudo hacktheworld') {
        startMatrixEasterEgg(); // Matrix animation easter egg
      } else {
        animateTerminalLine(`Unknown command: ${command}`);
      }
    });
  }

  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  // No initial welcome message here, since it's printed in index.html after creation
  terminalInput.focus();
};
