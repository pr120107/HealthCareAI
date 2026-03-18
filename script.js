// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== BODY MAP DATABASE =====
const bodyPartsDatabase = {
    head: {
        name: "🧠 Head",
        info: "The head contains the brain (control center), eyes (vision), ears (hearing & balance), nose (smell & breathing), and mouth (eating & speech). Common issues include tension headaches, migraines, sinus congestion, and concussions."
    },
    neck: {
        name: "🦴 Neck",
        info: "The neck contains the cervical spine (7 vertebrae), throat (pharynx & larynx), thyroid gland, major blood vessels (carotid arteries), and lymph nodes. It supports the head and allows rotation. Common issues include muscle tension, whiplash, herniated discs, and thyroid problems."
    },
    shoulders: {
        name: "💪 Shoulders",
        info: "The shoulders are complex joints connecting arms to torso. They include the clavicle (collarbone), scapula (shoulder blade), humerus (upper arm bone), and rotator cuff muscles. Common issues include rotator cuff injuries, frozen shoulder, dislocations, and arthritis."
    },
    chest: {
        name: "❤️ Chest",
        info: "The chest (thorax) contains the heart (pumping blood), lungs (breathing), esophagus, trachea, and major blood vessels. Protected by the rib cage and sternum. Common issues include chest pain (angina, heart attack), bronchitis, pneumonia, and costochondritis. Chest pain requires immediate medical attention."
    },
    'left-arm': {
        name: "💪 Left Arm",
        info: "The left arm consists of the upper arm (humerus), elbow joint, forearm (radius and ulna), wrist, and hand. Contains major nerves (median, ulnar, radial). Common issues include fractures, tennis elbow, carpal tunnel syndrome, and referred pain from heart conditions."
    },
    'right-arm': {
        name: "💪 Right Arm",
        info: "The right arm consists of the upper arm (humerus), elbow joint, forearm (radius and ulna), wrist, and hand. Contains major nerves and blood vessels. Common issues include repetitive strain injuries, tendinitis, fractures, and arthritis."
    },
    stomach: {
        name: "🫄 Abdomen",
        info: "The abdomen contains digestive organs: stomach (breaks down food), liver (filters blood), gallbladder (stores bile), pancreas (produces insulin), small intestine (absorbs nutrients), large intestine (absorbs water), kidneys (filter waste), and spleen (fights infection). Common issues include indigestion, appendicitis, gallstones, and ulcers."
    },
    waist: {
        name: "🔰 Waist & Hips",
        info: "The waist/hip area connects the upper and lower body. Contains the lumbar spine (lower back), pelvic bones, hip joints, and major muscles (glutes, hip flexors). Common issues include lower back pain, sciatica, hip arthritis, and sacroiliac joint dysfunction."
    },
    'left-leg': {
        name: "🦵 Left Leg",
        info: "The left leg includes the thigh (femur - longest bone), knee joint (patella), calf (tibia and fibula), ankle, and foot. Contains major muscles (quadriceps, hamstrings, gastrocnemius). Common issues include fractures, ACL tears, muscle strains, and deep vein thrombosis."
    },
    'right-leg': {
        name: "🦵 Right Leg",
        info: "The right leg includes the thigh (femur), knee joint, calf, ankle, and foot. Supports body weight and enables movement. Common issues include runner's knee, shin splints, Achilles tendinitis, and varicose veins."
    },
    'left-foot': {
        name: "🦶 Left Foot",
        info: "The foot contains 26 bones, 33 joints, and over 100 muscles, tendons, and ligaments. Includes the ankle, heel (calcaneus), arch, toes (phalanges), and ball of foot. Common issues include plantar fasciitis, ankle sprains, bunions, and stress fractures."
    },
    'right-foot': {
        name: "🦶 Right Foot",
        info: "The foot is a complex structure designed for weight-bearing and propulsion. It has three sections: forefoot (toes), midfoot (arch), and hindfoot (heel). Common issues include heel pain, bunions, athlete's foot, and plantar fasciitis."
    }
};

// Body map interactions
document.addEventListener('DOMContentLoaded', function() {
    const bodyParts = document.querySelectorAll('.body-part');
    const infoPanel = document.getElementById('info-panel');
    
    if (bodyParts.length > 0) {
        bodyParts.forEach(part => {
            part.addEventListener('click', function() {
                // Remove active class from all parts
                bodyParts.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked part
                this.classList.add('active');
                
                const partId = this.getAttribute('data-part');
                const partInfo = bodyPartsDatabase[partId];
                
                if (partInfo && infoPanel) {
                    infoPanel.innerHTML = `
                        <h3>${partInfo.name}</h3>
                        <p>${partInfo.info}</p>
                    `;
                }
            });
            
            // Hover effects
            part.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.fill = '#2d7ee9';
                }
            });
            
            part.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.fill = '#c5d9ff';
                }
            });
        });
    }
});

// ===== AI CHATBOT =====
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Symptom responses database
const symptomResponses = {
    headache: {
        response: "🤕 **Headache Information**\n\n**Common causes:** tension, dehydration, lack of sleep, eye strain, sinus issues\n\n**Relief options:** rest in dark room, stay hydrated, apply cold compress, over-the-counter pain relievers\n\n**⚠️ See doctor if:** severe, with fever, after head injury, or with vision changes"
    },
    fever: {
        response: "🌡️ **Fever Information**\n\n**Common causes:** viral infections, bacterial infections, heat exhaustion\n\n**Home care:** rest, stay hydrated, take fever reducers (acetaminophen/ibuprofen), lukewarm sponge bath\n\n**⚠️ Seek help if:** >103°F (39.4°C), lasts >3 days, with severe headache or rash"
    },
    cough: {
        response: "🤧 **Cough Information**\n\n**Common causes:** viral infections, allergies, asthma, acid reflux, smoking\n\n**Relief methods:** honey in warm water, stay hydrated, cough drops, humidifier, avoid irritants\n\n**⚠️ See doctor if:** >3 weeks, with blood, chest pain, or difficulty breathing"
    },
    'stomach pain': {
        response: "🫄 **Stomach Pain Information**\n\n**Common causes:** indigestion, gas, food poisoning, infections, stress, menstrual cramps\n\n**Home care:** bland diet (BRAT: bananas, rice, applesauce, toast), ginger tea, heat pack, rest\n\n**⚠️ Seek care if:** severe pain, with fever, bloody stools, or persistent vomiting"
    },
    cold: {
        response: "🤧 **Common Cold Information**\n\n**Causes:** viral infections affecting upper respiratory tract\n\n**Remedies:** rest, warm fluids, saline nasal spray, steam inhalation, over-the-counter cold meds\n\n**⚠️ See doctor if:** symptoms persist >10 days or with high fever"
    },
    'chest pain': {
        response: "🚨 **URGENT: Chest Pain**\n\n**This could indicate:** heart attack, angina, pulmonary embolism, or other serious conditions\n\n**IMMEDIATE ACTION REQUIRED:**\nCall emergency services (911) IMMEDIATELY if you experience:\n• Crushing chest pain\n• Pain spreading to arm/jaw\n• Shortness of breath\n• Cold sweat\n• Nausea\n\n**Do NOT ignore chest pain. Seek emergency care immediately.**"
    },
    default: "Please describe your symptoms in more detail. For example:\n• 'I have a headache'\n• 'I feel feverish'\n• 'My stomach hurts'\n• 'I have a cough'"
};

// Greeting responses
const greetingResponses = [
    "Hello! I'm your AI health assistant. How can I help you today? Please describe your symptoms.",
    "Hi there! I'm here to provide health information. What symptoms are you experiencing?",
    "Welcome! I can help with information about common health concerns. What would you like to know?"
];

// Thank you responses
const thankYouResponses = [
    "You're welcome! Take care of your health. 😊",
    "Happy to help! Remember to consult a healthcare provider for persistent symptoms.",
    "Glad I could assist! Stay healthy and don't hesitate to ask if you have more questions."
];

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase().trim();
    
    // Check for greetings
    if (input.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/)) {
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // Check for thanks
    if (input.match(/thank|thanks|appreciate|grateful/)) {
        return thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
    }
    
    // Check for specific symptoms
    if (input.includes('headache') || input.includes('head pain') || input.includes('migraine')) {
        return symptomResponses.headache.response;
    }
    
    if (input.includes('fever') || input.includes('temperature') || input.includes('hot')) {
        return symptomResponses.fever.response;
    }
    
    if (input.includes('cough') || input.includes('coughing')) {
        return symptomResponses.cough.response;
    }
    
    if (input.includes('stomach') || input.includes('belly') || input.includes('abdominal') || input.includes('tummy')) {
        return symptomResponses['stomach pain'].response;
    }
    
    if (input.includes('cold') || input.includes('flu') || input.includes('sneezing')) {
        return symptomResponses.cold.response;
    }
    
    if (input.includes('chest pain') || input.includes('heart pain') || input.includes('chest tightness')) {
        return symptomResponses['chest pain'].response;
    }
    
    return symptomResponses.default;
}

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 500);
        }
    });
}

if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// Suggestion buttons
if (suggestionBtns.length > 0) {
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const symptom = btn.getAttribute('data-symptom');
            userInput.value = symptom;
            sendBtn.click();
        });
    });
}

// ===== BREATHING EXERCISE - FULLY WORKING =====
document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    const circle = document.getElementById('breathing-circle');
    const phaseSpan = document.getElementById('breath-phase');
    const countSpan = document.getElementById('breath-count');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-breath');
    const pauseBtn = document.getElementById('pause-breath');
    const resetBtn = document.getElementById('reset-breath');
    const progressBar = document.getElementById('progress-bar');
    const cycleSpan = document.getElementById('cycle-count');
    
    // Phase elements
    const inhalePhase = document.getElementById('inhale-phase');
    const holdPhase = document.getElementById('hold-phase');
    const exhalePhase = document.getElementById('exhale-phase');
    const inhaleIndicator = document.getElementById('inhale-indicator');
    const holdIndicator = document.getElementById('hold-indicator');
    const exhaleIndicator = document.getElementById('exhale-indicator');
    
    // Check if elements exist before proceeding
    if (!circle || !phaseSpan || !countSpan || !startBtn || !pauseBtn || !resetBtn || !progressBar) {
        console.log('Breathing exercise elements not found');
        return;
    }
    
    // State variables
    let phase = 'inhale';
    let count = 4;
    let cycle = 1;
    let interval = null;
    let isRunning = false;
    
    // Maximum cycles
    const MAX_CYCLES = 5;
    
    // Initialize display
    updateDisplay();
    updateActivePhase();
    
    // Event listeners
    startBtn.addEventListener('click', startBreathing);
    pauseBtn.addEventListener('click', pauseBreathing);
    resetBtn.addEventListener('click', resetBreathing);
    
    // Phase click handlers
    if (inhalePhase) {
        inhalePhase.addEventListener('click', () => setPhase('inhale'));
    }
    if (holdPhase) {
        holdPhase.addEventListener('click', () => setPhase('hold'));
    }
    if (exhalePhase) {
        exhalePhase.addEventListener('click', () => setPhase('exhale'));
    }
    
    function startBreathing() {
        if (isRunning) return;
        
        isRunning = true;
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        pauseBtn.disabled = false;
        pauseBtn.style.opacity = '1';
        
        // Clear any existing interval
        if (interval) clearInterval(interval);
        
        // Start the breathing cycle
        interval = setInterval(() => {
            count--;
            updateDisplay();
            
            // Update progress bar (0-100% based on count)
            const progress = ((4 - count) / 4) * 100;
            progressBar.style.width = progress + '%';
            
            // Update timer display
            if (timerDisplay) {
                timerDisplay.textContent = count + 's';
            }
            
            // Update phase indicators
            updateIndicators(progress);
            
            // When count reaches 0, move to next phase
            if (count === 0) {
                moveToNextPhase();
            }
        }, 1000);
    }
    
    function pauseBreathing() {
        if (!isRunning) return;
        
        isRunning = false;
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        pauseBtn.disabled = true;
        pauseBtn.style.opacity = '0.5';
        
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    
    function resetBreathing() {
        // Pause first
        if (isRunning) {
            pauseBreathing();
        }
        
        // Reset state
        phase = 'inhale';
        count = 4;
        cycle = 1;
        
        // Reset UI
        updateDisplay();
        updateActivePhase();
        resetIndicators();
        
        // Reset circle classes
        circle.classList.remove('inhale', 'hold', 'exhale');
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Reset timer display
        if (timerDisplay) {
            timerDisplay.textContent = '4s';
        }
        
        // Update cycle count
        if (cycleSpan) {
            cycleSpan.textContent = cycle;
        }
        
        // Enable start button
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        pauseBtn.disabled = true;
        pauseBtn.style.opacity = '0.5';
    }
    
    function setPhase(newPhase) {
        if (phase === newPhase) return;
        
        phase = newPhase;
        count = 4;
        
        updateDisplay();
        updateActivePhase();
        resetIndicators();
        
        // Update circle classes
        circle.classList.remove('inhale', 'hold', 'exhale');
        circle.classList.add(phase);
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Reset timer display
        if (timerDisplay) {
            timerDisplay.textContent = '4s';
        }
        
        // If running, restart the interval
        if (isRunning) {
            pauseBreathing();
            startBreathing();
        }
    }
    
    function moveToNextPhase() {
        // Move to next phase
        if (phase === 'inhale') {
            phase = 'hold';
        } else if (phase === 'hold') {
            phase = 'exhale';
        } else if (phase === 'exhale') {
            phase = 'inhale';
            // Increment cycle when completing exhale
            cycle++;
            if (cycleSpan) {
                cycleSpan.textContent = cycle;
            }
            
            // Stop after max cycles
            if (cycle > MAX_CYCLES) {
                resetBreathing();
                alert('🎉 Great job! You completed 5 breathing cycles. Take a moment to notice how you feel. 🧘');
                return;
            }
        }
        
        count = 4;
        
        updateDisplay();
        updateActivePhase();
        resetIndicators();
        
        // Update circle classes
        circle.classList.remove('inhale', 'hold', 'exhale');
        circle.classList.add(phase);
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Reset timer display
        if (timerDisplay) {
            timerDisplay.textContent = '4s';
        }
    }
    
    function updateDisplay() {
        // Update phase text
        if (phaseSpan) {
            phaseSpan.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
        }
        
        // Update count
        if (countSpan) {
            countSpan.textContent = count;
        }
        
        // Update timer display
        if (timerDisplay) {
            timerDisplay.textContent = count + 's';
        }
    }
    
    function updateActivePhase() {
        // Remove active class from all phases
        if (inhalePhase) inhalePhase.classList.remove('active');
        if (holdPhase) holdPhase.classList.remove('active');
        if (exhalePhase) exhalePhase.classList.remove('active');
        
        // Add active class to current phase
        if (phase === 'inhale' && inhalePhase) {
            inhalePhase.classList.add('active');
        } else if (phase === 'hold' && holdPhase) {
            holdPhase.classList.add('active');
        } else if (phase === 'exhale' && exhalePhase) {
            exhalePhase.classList.add('active');
        }
    }
    
    function resetIndicators() {
        // Reset all indicators
        if (inhaleIndicator) inhaleIndicator.style.width = '0%';
        if (holdIndicator) holdIndicator.style.width = '0%';
        if (exhaleIndicator) exhaleIndicator.style.width = '0%';
    }
    
    function updateIndicators(progress) {
        // Update indicator for current phase
        if (phase === 'inhale' && inhaleIndicator) {
            inhaleIndicator.style.width = progress + '%';
        } else if (phase === 'hold' && holdIndicator) {
            holdIndicator.style.width = progress + '%';
        } else if (phase === 'exhale' && exhaleIndicator) {
            exhaleIndicator.style.width = progress + '%';
        }
    }
    
    // Initialize
    resetBreathing();
});

// ===== LANGUAGE DROPDOWN =====
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        const langNames = {
            'en': 'English',
            'hi': 'हिन्दी',
            'bn': 'বাংলা',
            'te': 'తెలుగు',
            'ta': 'தமிழ்',
            'mr': 'मराठी',
            'gu': 'ગુજરાતી'
        };
        
        const langBtnSpan = document.querySelector('.lang-btn span');
        if (langBtnSpan) {
            langBtnSpan.textContent = langNames[lang];
        }
        
        // Show language change notification
        alert(`🌐 Language changed to ${langNames[lang]}`);
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAVIGATION ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== INITIALIZE CHAT WITH GREETING =====
document.addEventListener('DOMContentLoaded', function() {
    // Add initial bot message if chat exists and is empty
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages && chatMessages.children.length === 0) {
        const initialMessage = "Hello! I'm your AI health assistant. Please describe your symptoms below. For example: 'I have a headache' or 'I feel feverish'.";
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = initialMessage;
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
    }
});