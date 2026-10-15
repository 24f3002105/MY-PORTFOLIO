/**
 * ABHAY SHUKLA - CYBERNETIC OS TERMINAL EMULATOR
 * Interactive Command Center (ABHAY-AI OS v2.5)
 */

class CyberTerminal {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = -1;

    if (!this.input || !this.output) return;

    this.commands = {
      help: () => this.cmdHelp(),
      about: () => this.cmdAbout(),
      projects: () => this.cmdProjects(),
      skills: () => this.cmdSkills(),
      iit: () => this.cmdIIT(),
      education: () => this.cmdIIT(),
      experience: () => this.cmdExperience(),
      certifications: () => this.cmdCertifications(),
      contact: () => this.cmdContact(),
      hire: () => this.cmdHire(),
      matrix: () => this.cmdMatrix(),
      clear: () => this.cmdClear()
    };

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = this.input.value.trim();
        if (raw) {
          this.execute(raw);
          this.history.push(raw);
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Quick chips
    document.querySelectorAll('.t-quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          if (window.soundEngine) window.soundEngine.playClick();
          this.execute(cmd);
        }
      });
    });
  }

  printLine(html, type = 't-bot-resp') {
    const line = document.createElement('div');
    line.className = `t-line ${type}`;
    line.innerHTML = html;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const parent = this.output.parentElement;
    if (parent) {
      parent.scrollTop = parent.scrollHeight;
    }
  }

  execute(rawCmd) {
    const clean = rawCmd.toLowerCase().trim();
    this.printLine(`<span class="terminal-prompt-sym">abhay@iit-madras:~$</span> ${rawCmd}`, 't-user-cmd');

    if (window.soundEngine) window.soundEngine.playTerminalSuccess();

    const parts = clean.split(' ');
    const main = parts[0];

    if (this.commands[main]) {
      this.commands[main](parts.slice(1));
    } else {
      this.printLine(`Command not recognized: '<span style="color:#ef4444">${clean}</span>'. Type '<span style="color:var(--cyan-core)">help</span>' for a list of available telemetry commands.`);
    }
  }

  cmdHelp() {
    const text = `
    <span style="color:#38bdf8; font-weight:700;">AVAILABLE OS COMMANDS:</span><br>
    - <b style="color:#fff;">about</b> : View Abhay's bio & career objective<br>
    - <b style="color:#fff;">projects</b> : Inspect all 5 advanced projects & metrics<br>
    - <b style="color:#fff;">skills</b> : Review Python, JS, Vue, Java, Linux, SQL & toolstack<br>
    - <b style="color:#fff;">iit</b> : Educational trajectory at IIT Madras (CGPA 8.25)<br>
    - <b style="color:#fff;">experience</b> : Leadership as Event Coordinator at IIT Madras<br>
    - <b style="color:#fff;">certifications</b> : Python & Machine Learning accredited credentials<br>
    - <b style="color:#fff;">hire</b> : Why Abhay is an exceptional addition to your engineering team<br>
    - <b style="color:#fff;">contact</b> : Transmission coordinates, emails & LinkedIn<br>
    - <b style="color:#fff;">matrix</b> : Run Matrix quantum visual telemetry<br>
    - <b style="color:#fff;">clear</b> : Wipe terminal viewport
    `;
    this.printLine(text);
  }

  cmdAbout() {
    this.printLine(`
    <b style="color:#38bdf8;">[IDENTIFICATION]:</b> Abhay Shukla<br>
    <b style="color:#fff;">[STATUS]:</b> 2nd Year Bachelor of Science (BS) @ IIT Madras | CGPA: 8.25<br>
    <b style="color:#fff;">[STACK]:</b> Python, JavaScript, Vue.js, Java, Linux, SQL, Machine Learning<br>
    <b style="color:#fff;">[OBJECTIVE]:</b> Motivated tech student and software developer. Seeking an entry-level role or internship where I can apply technical skills, problem-solving capability, and project experience to contribute to organizational growth while continuously mastering cutting-edge technologies.
    `);
  }

  cmdProjects() {
    this.printLine(`
    <b style="color:#38bdf8;">[INITIALIZING PROJECT ARCHIVE (5 ACTIVE ARCHITECTURES)]:</b><br>
    1. <b style="color:#fff;">AI Automated Attendance System:</b> Single-shot group photo facial recognition + Voice chat attendance logging.<br>
    2. <b style="color:#fff;">Full-Stack Trekking Management Platform:</b> Multi-tier ecosystem uniting Trekkers, Staff/Guides, and Organizers.<br>
    3. <b style="color:#fff;">Career & Placement Drive Ecosystem:</b> Enterprise hiring environment connecting Companies, Placement Drives, and Students.<br>
    4. <b style="color:#fff;">Smart Hospital Management System:</b> EHR tracking, OPD queue scheduling, and clinic billing workflows.<br>
    5. <b style="color:#fff;">Automated Inventory & Stock Tracking Engine:</b> Real-time stock audit, threshold reorder triggers, and supplier ledger.<br>
    <i>Tip: Scroll to the Holographic Projects Deck to trigger interactive 3D architecture deep-dives!</i>
    `);
  }

  cmdSkills() {
    this.printLine(`
    <b style="color:#38bdf8;">[TECHNICAL TELEMETRY MATRIX]:</b><br>
    • <b style="color:#fff;">Programming Languages:</b> Python (OOP, Automation), JavaScript (ES6+, Async), Java (Core, Collections)<br>
    • <b style="color:#fff;">Frontend & Web:</b> Vue.js (SPA, Reactivity), HTML5, CSS3, Jinja / Jinja2 Templating<br>
    • <b style="color:#fff;">Systems & OS:</b> Linux (CLI navigation, Bash scripting, process/file management), Git & GitHub<br>
    • <b style="color:#fff;">Databases & SQL:</b> Relational Schema, Joins, Triggers, Views, Normalization<br>
    • <b style="color:#fff;">AI & Data Science:</b> Machine Learning Certified, OpenCV Computer Vision, Data Handling<br>
    • <b style="color:#fff;">Enterprise Tools:</b> MS Excel (Advanced Modeling), MS Word, MS PowerPoint<br>
    • <b style="color:#fff;">Domain Competencies:</b> Trading Fundamentals, Event Coordination, Technical Communication
    `);
  }

  cmdIIT() {
    this.printLine(`
    <b style="color:#34d399;">[ACADEMIC CREDENTIALS]:</b><br>
    🏛️ <b style="color:#fff;">Indian Institute of Technology Madras (IIT Madras)</b><br>
    Degree: Bachelor of Science (BS) — 2nd Year<br>
    Academic Standing: <b>CGPA 8.25 / 10.0</b><br><br>
    🏫 <b style="color:#fff;">Jeevan Jyoti Public School (CBSE Board)</b><br>
    - Intermediate (Senior Secondary)<br>
    - High School (Secondary)
    `);
  }

  cmdExperience() {
    this.printLine(`
    <b style="color:#a78bfa;">[LEADERSHIP & ROLES]:</b><br>
    🎯 <b style="color:#fff;">Event Coordinator — Indian Institute of Technology Madras</b><br>
    • Spearheaded end-to-end event execution and participant operations across premier campus symposiums.<br>
    • Orchestrated inter-team logistics, crisis handling, and stakeholder coordination under tight schedules.
    `);
  }

  cmdCertifications() {
    this.printLine(`
    <b style="color:#fbbf24;">[VERIFIED CREDENTIALS]:</b><br>
    📜 <b>Python Programming Certification</b> — Core syntax, OOP paradigms, file streaming & algorithmic problem solving.<br>
    📜 <b>Machine Learning Certification</b> — Supervised learning, regression models, classification, and feature engineering.
    `);
  }

  cmdHire() {
    this.printLine(`
    <b style="color:#38bdf8;">[WHY HIRE ABHAY SHUKLA?]:</b><br>
    1. <b style="color:#fff;">IIT Madras Pedigree & High Academic Discipline:</b> Solid 8.25 CGPA reflecting rigorous problem-solving rigor.<br>
    2. <b style="color:#fff;">Versatile Modern Tech Stack:</b> Proven across Python, JavaScript, Vue.js, Java, Linux, and SQL.<br>
    3. <b style="color:#fff;">End-to-End Builder Mindset:</b> Demonstrated through 5 substantial systems in AI, multi-tenant web platforms, and database engineering.<br>
    4. <b style="color:#fff;">Bridge of Tech & Leadership:</b> Proven coordination prowess as IITM Event Coordinator paired with strong communication.<br>
    5. <b style="color:#fff;">Rapid Adaptability:</b> Fast learner with passion for continuous tech stack mastery.
    `);
  }

  cmdContact() {
    this.printLine(`
    <b style="color:#38bdf8;">[TRANSMISSION RELAY & DIRECT CHANNELS]:</b><br>
    • <b style="color:#fff;">Name:</b> Abhay Shukla<br>
    • <b style="color:#fff;">LinkedIn:</b> <a href="https://www.linkedin.com/in/abhay-shukla7379" target="_blank" style="color:#38bdf8;">linkedin.com/in/abhay-shukla7379</a><br>
    • <b style="color:#fff;">Personal Email:</b> <a href="mailto:abhayshukla11487@gmail.com" style="color:#38bdf8;">abhayshukla11487@gmail.com</a><br>
    • <b style="color:#fff;">College Email:</b> <a href="mailto:24f3002105@ds.study.iitm.ac.in" style="color:#38bdf8;">24f3002105@ds.study.iitm.ac.in</a><br>
    • <b style="color:#fff;">Institution:</b> IIT Madras (BS 2nd Year, CGPA 8.25)<br>
    • <b style="color:#fff;">Base Station:</b> Chennai // Open to Remote & Pan-India<br>
    • <b style="color:#34d399;">Status:</b> Actively Interviewing for Internships & Entry-Level Roles
    `);
  }

  cmdMatrix() {
    this.printLine('<span style="color:#10b981;">[INITIALIZING QUANTUM MATRIX STREAM...] 01001001 01001001 01010100 00100000 01001101 01000001 01000100 01010010 01000001 01010011</span>');
    setTimeout(() => {
      this.printLine('<span style="color:#10b981;">&gt;&gt; STREAM VERIFIED: ABHAY SHUKLA // IITM BS STUDENT // READY FOR DEPLOYMENT</span>');
    }, 600);
  }

  cmdClear() {
    this.output.innerHTML = '';
    this.printLine('<span class="t-system">System cleared. Type "help" for telemetry commands.</span>');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cyberTerminal = new CyberTerminal();
});
