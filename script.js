const log = document.getElementById('terminal-log');
const skipBtn = document.getElementById('skip-btn');

// 1. Проверяем оператора в памяти
let finalOperator = localStorage.getItem('corpOperator');

if (!finalOperator) {
    const operatorId = Math.floor(Math.random() * 100) + 1;
    finalOperator = `OPERATOR-${operatorId.toString().padStart(2, '0')}`;
    localStorage.setItem('corpOperator', finalOperator);
}

// 2. Команды для печати
const commands = [
    "> CONNECTING TO CORP_NET...",
    "> HANDSHAKE: OK",
    "> VERIFYING CLEARANCE LEVEL 3...",
    `> ASSIGNING ID: ${finalOperator}`,
    "> LOADING ARCHIVE DATA...",
    "> PREPARING...",
    "> ACCESS GRANTED"
];

let currentLine = 0;

// 3. Печать текста
function typeLine() {
    if (currentLine >= commands.length) {
        log.innerHTML = log.innerHTML.replace('<span class="cursor"></span>', '');
        return;
    }
    
    const text = commands[currentLine];
    let charIndex = 0;
    const p = document.createElement('div');
    log.appendChild(p);

    function typeChar() {
        if (charIndex < text.length) {
            p.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 30); 
        } else {
            currentLine++;
            p.innerHTML = p.innerHTML.replace('<span class="cursor"></span>', ''); 
            p.innerHTML += '<span class="cursor"></span>'; 
            
            setTimeout(() => {
                p.innerHTML = p.innerHTML.replace('<span class="cursor"></span>', ''); 
                typeLine();
            }, 500); 
        }
    }
    typeChar();
}

typeLine();

// 4. Кнопка скипа
setTimeout(() => {
    skipBtn.classList.remove('hidden-skip');
}, 2000);
skipBtn.classList.add('hidden-skip');

// 5. Автоматический переход
const totalTime = commands.length * (30 * 20 + 500) + 2000;
setTimeout (() => {
    window.location.href = 'main.html';
}, totalTime);