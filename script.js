document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminal-body');
    const historyContainer = document.getElementById('history');
    const input = document.getElementById('command-input');

    // --- Command Data ---
    const commands = {
        'help': `
            <span style="color: var(--highlight-color);">Available Commands:</span><br>
            <span style="color: var(--command-color);">about</span>      - Who am I? <br>
            <span style="color: var(--command-color);">skills</span>     - What I can do. <br>
            <span style="color: var(--command-color);">projects</span>   - My featured works. <br>
            <span style="color: var(--command-color);">contact</span>    - How to reach me. <br>
            <span style="color: var(--command-color);">clear</span>      - Clear the terminal screen. <br>
            <span style="color: var(--command-color);">help</span>       - Show this help message.
        `,
        'about': `
            <h2>ABOUT ME :: AI 개발자 신재성</h2>
            <p>Name: 신재성 (메타버스 AI반 소속)</p>
            <p>Title: 이미지 생성과 LLM 분야에 특화된 AI 개발자</p>
            <br>
            <p>저는 ai 메타버스의 수업을 듣고있는 신재성 이라고 합니다.</p>
            <p style="color: var(--prompt-color);"><i>"Efficiency in Simplicity."</i> - My core philosophy.</p>
        `,
        'skills': `
            <h2>TECHNICAL SKILLS</h2>
            <div class="skill-bar"><span class="skill-bar-name">Python</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 95%;"></div></div></div>
            <div class="skill-bar"><span class="skill-bar-name">COMFYUI</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 85%;"></div></div></div>
            <div class="skill-bar"><span class="skill-bar-name">Machine-learning</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 90%;"></div></div></div>
            <div class="skill-bar"><span class="skill-bar-name">FASTAPI</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 85%; background-color: var(--prompt-color);"></div></div></div>
            <div class="skill-bar"><span class="skill-bar-name">OPEN-CV</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 80%; background-color: var(--prompt-color);"></div></div></div>
            <div class="skill-bar"><span class="skill-bar-name">LangChain</span><div class="skill-bar-progress"><div class="skill-bar-fill" style="width: 85%; background-color: var(--highlight-color);"></div></div></div>
        `,
        'projects': `
            <h2>글로벌 음악스트리밍 테이터 분석</h2>
            <h3>1. </h3>
            <p>  - title: 음악의 길이 장르 등에 따른 차이.</p>
            <p>  - LINK: <a href="https://mtvs.kr/user/project/view?bbsCd=BBS_00007&bbscCd=BBSC_01377"_blank">링크</a></p>

            <br>
            <h3>2. 정치 만족도 평가 프로젝트</h3>
            <p>  - title: 사람들의 정치 만족도를 예측.</p>
            <p>  - LINK: <a href="https://mtvs.kr/user/project/view?bbsCd=BBS_00007&bbscCd=BBSC_01378" target="_blank">링크</a></p>

        `,
        'contact': `
            <h2>CONTACT & CONNECT</h2>
            <p>Logical Address: The vast network of interconnected nodes</p>
            <p>GitHub: <a href="https://github.com" target="_blank">github.com</a></p>
            <p>Email: <a href="abc@conceptual.space">contact@abc</a></p>
        `
    };

    // --- Event Listener for Command Input ---
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            input.value = '';
            
            // Add command to history
            const commandHistoryLine = document.createElement('div');
            commandHistoryLine.innerHTML = `<span class="prompt">guest@MTVS:~$</span> <span class="output-command">${command}</span>`;
            historyContainer.appendChild(commandHistoryLine);

            if (command === 'clear') {
                historyContainer.innerHTML = '';
            } else if (commands[command]) {
                typewriterEffect(commands[command]);
            } else if (command) {
                typewriterEffect(`<span class="error">'${command}': command not found. Type 'help' for a list of commands.</span>`);
            }
            
            scrollToBottom();
        }
    });

    // --- Terminal Click Focuses Input ---
    terminalBody.addEventListener('click', () => {
        input.focus();
    });

    // --- Helper Functions ---
    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function typewriterEffect(html) {
        const outputLine = document.createElement('div');
        outputLine.classList.add('output-line');
        historyContainer.appendChild(outputLine);

        // For simplicity and performance, we'll type line by line instead of char by char
        const lines = html.split('<br>');
        let lineIndex = 0;

        function typeLine() {
            if (lineIndex < lines.length) {
                const line = lines[lineIndex];
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = line;
                
                // Animate skill bars if they exist
                const skillFills = tempDiv.querySelectorAll('.skill-bar-fill');
                if (skillFills.length > 0) {
                    skillFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => { fill.style.width = width; }, 100);
                    });
                }
                
                outputLine.innerHTML += line + (lineIndex < lines.length - 1 ? '<br>' : '');
                lineIndex++;
                scrollToBottom();
                setTimeout(typeLine, 50); // Delay between lines
            }
        }
        typeLine();
    }
    
    // --- Boot Sequence ---
    function bootSequence() {
        const bootMessages = [
            { text: "[INITIALIZING CORE... OK]", time: 1000 },
            { text: "[LOADING LANGUAGE MODELS... OK]", time: 1500 },
            { text: "[ESTABLISHING USER INTERFACE... OK]", time: 800 },
            { text: `<br><span style="color: var(--highlight-color);">Welcome to my portfolio.</span>`, time: 500 },
            { text: `Type '<span style="color: var(--command-color);">help</span>' to see available commands.`, time: 500 }
        ];

        let delay = 500;
        bootMessages.forEach(msg => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.classList.add('output-line', 'hidden');
                line.innerHTML = msg.text;
                historyContainer.appendChild(line);
                setTimeout(() => line.classList.remove('hidden'), 50); // For fade-in effect
                scrollToBottom();
            }, delay);
            delay += msg.time;
        });
    }

    bootSequence();
});
