// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== BODY MAP DATABASE =====
const bodyPartsDatabase = {
    head: { name: "🧠 Head", info: "Brain, eyes, ears, nose, mouth. Issues: headache, migraine, sinus." },
    neck: { name: "🦴 Neck", info: "Supports head. Issues: stiffness, pain, thyroid problems." },
    shoulders: { name: "💪 Shoulders", info: "Joint connecting arms. Issues: rotator cuff, dislocation." },
    chest: { name: "❤️ Chest", info: "Heart & lungs. ⚠️ Chest pain = emergency." },
    'left-arm': { name: "💪 Left Arm", info: "Bones + nerves. Pain can be heart-related." },
    'right-arm': { name: "💪 Right Arm", info: "Common issues: strain, injury." },
    stomach: { name: "🫄 Abdomen", info: "Digestive organs. Issues: indigestion, ulcers." },
    waist: { name: "🔰 Waist", info: "Lower back + hips. Issues: back pain." },
    'left-leg': { name: "🦵 Left Leg", info: "Movement + support. Issues: fractures." },
    'right-leg': { name: "🦵 Right Leg", info: "Common: knee pain, strain." },
    'left-foot': { name: "🦶 Left Foot", info: "26 bones. Issues: sprains." },
    'right-foot': { name: "🦶 Right Foot", info: "Supports weight. Issues: heel pain." }
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== BODY MAP =====
    const bodyParts = document.querySelectorAll('.body-part');
    const infoPanel = document.getElementById('info-panel');

    bodyParts.forEach(part => {
        part.addEventListener('click', function () {
            bodyParts.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const partId = this.getAttribute('data-part');
            const data = bodyPartsDatabase[partId];

            if (data && infoPanel) {
                infoPanel.innerHTML = `<h3>${data.name}</h3><p>${data.info}</p>`;
            }
        });
    });

    part.addEventListener('mouseenter', function () {
        this.style.fill = '#2d7ee9';
    });

    part.addEventListener('mouseleave', function () {
        if (!this.classList.contains('active')) {
            this.style.fill = '#c5d9ff';
        }
    });

    const faders = document.querySelectorAll('.fade-in');

    window.addEventListener('scroll', () => {
        faders.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add('show');
            }
        });
    });

    // ===== CHATBOT =====
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;

        const content = document.createElement('div');
        content.className = 'message-content';

        // FIXED formatting
        content.innerHTML = text.replace(/\n/g, "<br>");

        div.appendChild(content);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ===== SMART DETECTION =====
    function detectSeverity(input) {
        input = input.toLowerCase();

        if (input.includes("chest pain") || input.includes("can't breathe") || input.includes("heart attack")) {
            return "🚨 EMERGENCY: Call emergency services immediately!";
        }

        if (input.includes("severe") || input.includes("very painful")) {
            return "⚠️ This seems serious. Please consult a doctor.";
        }

        return null;
    }

    // ===== AI FUNCTION =====
    async function getBotResponse(input) {
        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer sk-xxxx"
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful health assistant. Keep answers simple. Always suggest seeing a doctor if serious."
                        },
                        {
                            role: "user",
                            content: input
                        }
                    ]
                })
            });

            const data = await res.json();
            return data.choices[0].message.content;

        } catch (err) {
            return "⚠️ AI not responding. Try again.";
        }
    }

    // ===== SEND MESSAGE =====
    if (sendBtn) {
        sendBtn.addEventListener('click', async () => {
            const message = userInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            userInput.value = '';

            const severity = detectSeverity(message);
            if (severity) {
                addMessage(severity, 'bot');
                return;
            }

            const response = await getBotResponse(message);

            // Generate smart report
            const report = generateHealthReport(message);

            // Combine both
            addMessage(response + "<br><br>" + report, 'bot');
        });
    }

    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });
    }

    // ===== VOICE INPUT =====
    if (micBtn && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";

        micBtn.addEventListener('click', () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            userInput.value = text;
            sendBtn.click();
        };
    }

    // ===== INITIAL MESSAGE =====
    if (chatMessages && chatMessages.children.length === 0) {
        addMessage("Hello! I'm your AI health assistant. Describe your symptoms 😊", "bot");
    }

    // ===== BREATHING EXERCISE =====
    const circle = document.getElementById('breathing-circle');
    const phaseSpan = document.getElementById('breath-phase');
    const countSpan = document.getElementById('breath-count');
    const startBtn = document.getElementById('start-breath');

    let phase = 'inhale';
    let count = 4;
    let interval;

    function updateDisplay() {
        if (phaseSpan) phaseSpan.textContent = phase;
        if (countSpan) countSpan.textContent = count;
    }

    function startBreathing() {
        if (interval) return;

        interval = setInterval(() => {
            count--;
            updateDisplay();

            if (count === 0) {
                if (phase === 'inhale') phase = 'hold';
                else if (phase === 'hold') phase = 'exhale';
                else phase = 'inhale';

                count = 4;
            }
        }, 1000);
    }

    if (startBtn) startBtn.addEventListener('click', startBreathing);

});

function generateHealthReport(input) {
    input = input.toLowerCase();

    let score = 0;
    let level = "Low";

    if (input.includes("chest pain") || input.includes("breathing")) score += 5;
    if (input.includes("fever") || input.includes("cough")) score += 2;
    if (input.includes("severe") || input.includes("pain")) score += 3;

    if (score >= 6) level = "High";
    else if (score >= 3) level = "Medium";

    return `
🧾 Health Report:

🔍 Symptoms: ${input}

📊 Risk Level: ${level}

💡 Recommendation:
${level === "High" ? "🚨 Seek immediate medical help." :
            level === "Medium" ? "⚠️ Monitor and consult doctor." :
                "✅ Rest and basic care recommended."}
`;
}