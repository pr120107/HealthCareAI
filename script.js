// ===== MOBILE MENU =====
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
    head: { name: "🧠 Head", info: "Brain, eyes, ears, nose, mouth." },
    chest: { name: "❤️ Chest", info: "Heart & lungs. ⚠️ Chest pain = emergency." },
    stomach: { name: "🫄 Abdomen", info: "Digestive organs." }
};

// ===== MAIN =====
document.addEventListener('DOMContentLoaded', function () {

    const bodyParts = document.querySelectorAll('.body-part');
    const infoPanel = document.getElementById('info-panel');

    bodyParts.forEach(part => {

        // CLICK
        part.addEventListener('click', function () {
            bodyParts.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const partId = this.getAttribute('data-part');
            const data = bodyPartsDatabase[partId];

            if (data && infoPanel) {
                infoPanel.innerHTML = `<h3>${data.name}</h3><p>${data.info}</p>`;
            }
        });

        // ✅ FIXED HOVER BUG
        part.addEventListener('mouseenter', function () {
            this.style.fill = '#2d7ee9';
        });

        part.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.fill = '#c5d9ff';
            }
        });
    });

    // ===== CHATBOT =====
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = text.replace(/\n/g, "<br>");

        div.appendChild(content);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // ===== AI CALL (FIXED) =====
    async function getBotResponse(input) {
        try {
            const res = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: input })
            });

            const data = await res.json();
            return data.choices[0].message.content;

        } catch (err) {
            return "⚠️ AI not responding.";
        }
    }

    // ===== SEND =====
    sendBtn.addEventListener('click', async () => {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        userInput.value = '';

        const response = await getBotResponse(message);
        addMessage(response, 'bot');
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });

});