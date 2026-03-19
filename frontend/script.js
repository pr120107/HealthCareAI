// API Base URL - Make sure this matches your backend
const API_BASE = 'http://localhost:3000/api';

// ==================== BMI CALCULATOR ====================
document.addEventListener('DOMContentLoaded', function () {
    // BMI Calculator
    const calculateBtn = document.getElementById('calculate-bmi-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }

    // Medication Search
    const searchBtn = document.getElementById('search-medication-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchMedication);
    }

    const medicationInput = document.getElementById('medication-search');
    if (medicationInput) {
        medicationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchMedication();
        });
    }

    // Medication tags
    document.querySelectorAll('.med-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const input = document.getElementById('medication-search');
            if (input) {
                input.value = tag.textContent.toLowerCase();
                searchMedication();
            }
        });
    });

    // Symptom Checker
    const addSymptomBtn = document.getElementById('add-symptom-btn');
    if (addSymptomBtn) {
        addSymptomBtn.addEventListener('click', addSymptom);
    }

    const symptomInput = document.getElementById('symptom-input');
    if (symptomInput) {
        symptomInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addSymptom();
        });
    }

    const analyzeBtn = document.getElementById('analyze-symptoms-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeSymptoms);
    }

    // Load data
    loadHealthNews();
    loadHealthTips();

    // ==================== AI CHATBOT ====================
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

    // Chatbot response database
    const chatbotResponses = {
        greetings: {
            patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                "Hello! I'm your AI health assistant. How can I help you today?",
                "Hi there! Please tell me your symptoms or ask any health-related question.",
                "Greetings! I'm here to provide health information. What would you like to know?"
            ]
        },
        thanks: {
            patterns: ['thank', 'thanks', 'appreciate', 'grateful'],
            responses: [
                "You're welcome! Take care of your health.",
                "Happy to help! Feel free to ask if you have more questions.",
                "Glad I could assist! Stay healthy!"
            ]
        },
        headache: {
            patterns: ['headache', 'head pain', 'migraine', 'throbbing head'],
            response: "🤕 **Headache Information**\n\n**Common causes:**\n• Tension and stress\n• Dehydration\n• Lack of sleep\n• Eye strain\n• Sinus congestion\n\n**Relief options:**\n• Rest in a dark, quiet room\n• Apply cold or warm compress\n• Stay hydrated\n• Over-the-counter pain relievers\n\n**⚠️ See a doctor if:**\n• Headache is sudden and severe\n• Accompanied by fever or stiff neck\n• After a head injury"
        },
        fever: {
            patterns: ['fever', 'high temperature', 'hot', 'temperature', 'feverish'],
            response: "🌡️ **Fever Information**\n\n**Common causes:**\n• Viral infections (flu, cold)\n• Bacterial infections\n• Heat exhaustion\n\n**Home care:**\n• Rest and sleep\n• Stay hydrated\n• Take fever reducers\n• Lukewarm sponge bath\n\n**⚠️ Seek medical help if:**\n• Fever > 103°F (39.4°C)\n• Lasts more than 3 days\n• With severe headache or rash"
        },
        cough: {
            patterns: ['cough', 'coughing', 'dry cough', 'wet cough'],
            response: "🤧 **Cough Information**\n\n**Common causes:**\n• Viral infections\n• Allergies\n• Asthma\n• Smoking\n• Post-nasal drip\n\n**Relief methods:**\n• Honey in warm water\n• Stay hydrated\n• Use cough drops\n• Use a humidifier\n\n**⚠️ Consult doctor if:**\n• Cough > 3 weeks\n• Coughing up blood\n• Chest pain\n• Difficulty breathing"
        },
        'sore throat': {
            patterns: ['sore throat', 'throat pain', 'painful swallowing', 'throat irritation'],
            response: "😷 **Sore Throat Information**\n\n**Common causes:**\n• Viral infections\n• Strep throat\n• Allergies\n• Dry air\n\n**Soothing remedies:**\n• Warm salt water gargle\n• Honey and lemon tea\n• Throat lozenges\n• Rest your voice\n\n**⚠️ See doctor if:**\n• Severe pain\n• Difficulty swallowing\n• High fever\n• White patches on tonsils"
        },
        'stomach pain': {
            patterns: ['stomach', 'stomach pain', 'abdominal pain', 'tummy ache', 'indigestion'],
            response: "🫄 **Stomach Pain Information**\n\n**Common causes:**\n• Indigestion\n• Gas and bloating\n• Food poisoning\n• Viral infection\n• Constipation\n\n**Home care:**\n• Rest and avoid solid foods\n• Sip clear fluids\n• Apply heat pack\n• BRAT diet (bananas, rice, applesauce, toast)\n\n**⚠️ Seek care if:**\n• Severe pain\n• Bloody stools\n• Persistent vomiting\n• High fever"
        },
        nausea: {
            patterns: ['nausea', 'queasy', 'sick to stomach', 'vomit', 'throwing up'],
            response: "🤢 **Nausea Information**\n\n**Common causes:**\n• Food poisoning\n• Viral infection\n• Motion sickness\n• Pregnancy\n• Medications\n\n**Relief measures:**\n• Ginger tea or candies\n• Small sips of clear fluids\n• Peppermint\n• Fresh air\n\n**⚠️ Seek care if:**\n• Vomiting > 24 hours\n• Signs of dehydration\n• Blood in vomit\n• Severe abdominal pain"
        },
        'back pain': {
            patterns: ['back pain', 'backache', 'lower back', 'spine pain'],
            response: "🔰 **Back Pain Information**\n\n**Common causes:**\n• Muscle strain\n• Poor posture\n• Herniated disc\n• Arthritis\n• Sedentary lifestyle\n\n**Management:**\n• Hot/cold therapy\n• Gentle stretching\n• Maintain good posture\n• Over-the-counter pain relievers\n\n**⚠️ See doctor if:**\n• Pain down legs\n• Numbness/tingling\n• Loss of bladder control\n• After a fall/injury"
        },
        'joint pain': {
            patterns: ['joint pain', 'arthritis', 'knee pain', 'elbow pain', 'swollen joint'],
            response: "🦴 **Joint Pain Information**\n\n**Common causes:**\n• Arthritis\n• Injury or overuse\n• Gout\n• Bursitis\n• Autoimmune conditions\n\n**Relief strategies:**\n• Rest the joint\n• Ice and heat therapy\n• Compression wrap\n• Anti-inflammatory meds\n\n**⚠️ Consult if:**\n• Severe swelling\n• Joint deformity\n• Unable to move joint\n• With fever"
        },
        fatigue: {
            patterns: ['fatigue', 'tired', 'exhaustion', 'low energy', 'sleepy'],
            response: "😴 **Fatigue Information**\n\n**Common causes:**\n• Lack of quality sleep\n• Iron deficiency\n• Thyroid disorders\n• Stress and anxiety\n• Poor nutrition\n\n**Energy boosters:**\n• Regular sleep schedule\n• Exercise regularly\n• Balanced diet\n• Stay hydrated\n• Stress management\n\n**⚠️ See doctor if:**\n• Persistent fatigue > 2 weeks\n• With unexplained weight loss\n• With fever"
        },
        allergy: {
            patterns: ['allergy', 'allergic', 'hay fever', 'pollen', 'dust', 'hives'],
            response: "🤧 **Allergy Information**\n\n**Common triggers:**\n• Pollen (seasonal)\n• Dust mites\n• Pet dander\n• Mold\n• Certain foods\n\n**Management:**\n• Antihistamines\n• Avoid triggers\n• Air purifiers\n• Saline nasal rinse\n\n**⚠️ Emergency if:**\n• Difficulty breathing\n• Swelling of face/lips\n• Severe hives\n• Dizziness"
        },
        anxiety: {
            patterns: ['anxiety', 'stress', 'nervous', 'panic', 'worry', 'tense'],
            response: "😰 **Anxiety Information**\n\n**Common causes:**\n• Stressful situations\n• Genetics\n• Life changes\n• Medical conditions\n\n**Coping strategies:**\n• Deep breathing exercises\n• Mindfulness meditation\n• Regular exercise\n• Adequate sleep\n• Talk to friends/family\n\n**⚠️ Seek help if:**\n• Panic attacks\n• Avoiding daily activities\n• With depression"
        },
        'chest pain': {
            patterns: ['chest pain', 'chest tightness', 'heart pain', 'pressure in chest'],
            response: "🚨 **URGENT: Chest Pain**\n\n**This could be a medical emergency!**\n\n**Immediate action required:**\n• CALL EMERGENCY SERVICES (911) IMMEDIATELY\n• Do not drive yourself\n• Stop all activity and rest\n• Chew aspirin if available and not allergic\n\n**Warning signs:**\n• Crushing chest pain or pressure\n• Pain spreading to arm, jaw, or back\n• Shortness of breath\n• Cold sweat\n• Nausea or lightheadedness"
        },
        covid: {
            patterns: ['covid', 'corona', 'coronavirus', 'covid-19'],
            response: "🦠 **COVID-19 Information**\n\n**Common symptoms:**\n• Fever or chills\n• Cough\n• Shortness of breath\n• Fatigue\n• Loss of taste or smell\n\n**Prevention:**\n• Get vaccinated and boosted\n• Wear masks in crowded places\n• Wash hands frequently\n• Maintain physical distance\n\n**⚠️ Seek care if:**\n• Difficulty breathing\n• Persistent chest pain\n• Confusion\n• Bluish lips or face"
        },
        diabetes: {
            patterns: ['diabetes', 'high blood sugar', 'sugar', 'diabetic'],
            response: "💉 **Diabetes Information**\n\n**Common symptoms:**\n• Increased thirst\n• Frequent urination\n• Unexplained weight loss\n• Fatigue\n• Blurred vision\n\n**Management:**\n• Monitor blood sugar\n• Healthy eating plan\n• Regular exercise\n• Take medications as prescribed\n\n**⚠️ Emergency signs:**\n• Very high blood sugar\n• Confusion\n• Fruity breath\n• Loss of consciousness"
        },
        'blood pressure': {
            patterns: ['blood pressure', 'high bp', 'hypertension', 'low bp'],
            response: "❤️ **Blood Pressure Information**\n\n**Normal range:** Below 120/80 mmHg\n\n**High blood pressure (hypertension):**\n• Often has no symptoms\n• Risk factors: diet, stress, obesity, smoking\n• Management: reduce salt, exercise, medication\n\n**Low blood pressure (hypotension):**\n• Symptoms: dizziness, fainting, fatigue\n• Causes: dehydration, heart problems\n\n**⚠️ Seek care if:**\n• Severely high readings (>180/120)\n• Chest pain\n• Severe headache\n• Shortness of breath"
        }
    };

    // Default responses for when no pattern matches
    const defaultResponses = [
        "I'm here to help with health-related questions. Could you please describe your symptoms in more detail?",
        "I can provide information about common symptoms like headache, fever, cough, stomach pain, etc. What are you experiencing?",
        "For the best assistance, please tell me your main symptom (like 'headache', 'fever', 'cough') and any other details.",
        "Remember, I'm an AI assistant and cannot replace professional medical advice. Please describe your symptoms so I can help."
    ];

    // Function to find matching response
    function getChatbotResponse(message) {
        const lowercaseMsg = message.toLowerCase().trim();

        // Check for greetings
        for (const item of chatbotResponses.greetings.patterns) {
            if (lowercaseMsg.includes(item)) {
                const responses = chatbotResponses.greetings.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Check for thanks
        for (const item of chatbotResponses.thanks.patterns) {
            if (lowercaseMsg.includes(item)) {
                const responses = chatbotResponses.thanks.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Check for specific symptoms
        for (const [key, data] of Object.entries(chatbotResponses)) {
            if (key === 'greetings' || key === 'thanks') continue;

            for (const pattern of data.patterns) {
                if (lowercaseMsg.includes(pattern)) {
                    return data.response;
                }
            }
        }

        // Check if message is too short
        if (lowercaseMsg.length < 5) {
            return "Please describe your symptoms in more detail. For example, try: 'I have a headache' or 'I feel feverish'.";
        }

        // Return random default response
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Function to add message to chat
    function addChatMessage(message, isUser) {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Format message with line breaks
        contentDiv.innerHTML = message.replace(/\n/g, '<br>');

        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send message
    function sendChatMessage() {
        if (!chatInput || !chatMessages) return;

        const message = chatInput.value.trim();

        if (message === '') return;

        // Add user message
        addChatMessage(message, true);

        // Clear input
        chatInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="message-content">...</div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate typing delay
        setTimeout(() => {
            // Remove typing indicator
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) typingIndicator.remove();

            // Get and add bot response
            const response = getChatbotResponse(message);
            addChatMessage(response, false);
        }, 1000);
    }

    // Add event listeners for chat
    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

// Global symptoms array
let symptoms = [];

async function calculateBMI() {
    const weight = document.getElementById('weight')?.value;
    const height = document.getElementById('height')?.value;
    const age = document.getElementById('bmi-age')?.value || 30;
    const gender = document.getElementById('bmi-gender')?.value || 'male';
    const resultsDiv = document.getElementById('bmi-results');

    if (!weight || !height) {
        alert('Please enter weight and height');
        return;
    }

    if (resultsDiv) {
        resultsDiv.innerHTML = '<div class="loader"></div>';
        resultsDiv.style.display = 'block';
    }

    try {
        const response = await fetch(`${API_BASE}/bmi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                weight: parseFloat(weight),
                height: parseFloat(height),
                age: parseInt(age),
                gender
            })
        });

        const data = await response.json();

        if (resultsDiv) {
            if (data.error) {
                resultsDiv.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                resultsDiv.innerHTML = `
                    <div class="bmi-result-card">
                        <h3>Your BMI: ${data.bmi}</h3>
                        <p style="color: ${data.color}; font-size: 1.5rem; font-weight: bold;">
                            ${data.category}
                        </p>
                        
                        <h4>🥗 Diet Recommendations:</h4>
                        <ul>
                            ${data.recommendations.diet.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        
                        <h4>💪 Exercise Recommendations:</h4>
                        <ul>
                            ${data.recommendations.exercise.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                        
                        <p><small>⚠️ Consult a doctor before starting any new diet or exercise program.</small></p>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('BMI Error:', error);
        if (resultsDiv) {
            resultsDiv.innerHTML = '<p class="error">Error calculating BMI. Make sure the server is running on port 3000.</p>';
        }
    }
}

async function searchMedication() {
    const medication = document.getElementById('medication-search')?.value.trim().toLowerCase();
    const resultsDiv = document.getElementById('medication-results');

    if (!medication) {
        alert('Please enter a medication name');
        return;
    }

    if (resultsDiv) {
        resultsDiv.innerHTML = '<div class="loader"></div>';
        resultsDiv.style.display = 'block';
    }

    try {
        const response = await fetch(`${API_BASE}/medication/${medication}`);
        const data = await response.json();

        if (resultsDiv) {
            if (!data.found) {
                resultsDiv.innerHTML = `
                    <div class="error-message">
                        <p>❌ "${medication}" not found in database</p>
                        ${data.suggestions && data.suggestions.length > 0 ? `
                            <p>Did you mean: ${data.suggestions.map(s =>
                    `<span class="suggestion-link" onclick="document.getElementById('medication-search').value='${s}'; searchMedication()">${s}</span>`
                ).join(', ')}</p>
                        ` : `
                            <p>Try: paracetamol, ibuprofen, amoxicillin, omeprazole, metformin</p>
                        `}
                    </div>
                `;
            } else {
                resultsDiv.innerHTML = `
                    <div class="drug-card">
                        <h3>${data.name}</h3>
                        <p><strong>Type:</strong> ${data.type}</p>
                        <p><strong>Generic:</strong> ${data.generic}</p>
                        
                        <h4>Uses:</h4>
                        <ul>${data.uses.map(u => `<li>${u}</li>`).join('')}</ul>
                        
                        <h4>Dosage:</h4>
                        <p><strong>Adult:</strong> ${data.dosage.adult}</p>
                        <p><strong>Maximum:</strong> ${data.dosage.maxDaily}</p>
                        <p><em>${data.dosage.notes || ''}</em></p>
                        
                        <h4>Common Side Effects:</h4>
                        <ul>${data.sideEffects.common.map(s => `<li>${s}</li>`).join('')}</ul>
                        
                        <h4>⚠️ Warnings:</h4>
                        <ul class="warnings-list">${data.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
                        
                        <p><strong>Brand Names:</strong> ${data.brandNames.join(', ')}</p>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Medication Error:', error);
        if (resultsDiv) {
            resultsDiv.innerHTML = '<p class="error">Error fetching medication information. Make sure the server is running.</p>';
        }
    }
}

function addSymptom() {
    const input = document.getElementById('symptom-input');
    if (!input) return;

    const symptom = input.value.trim().toLowerCase();

    if (symptom && !symptoms.includes(symptom)) {
        symptoms.push(symptom);
        renderSymptomTags();
        input.value = '';
    }
}

window.removeSymptom = function (symptom) {
    symptoms = symptoms.filter(s => s !== symptom);
    renderSymptomTags();
};

function renderSymptomTags() {
    const container = document.getElementById('symptom-tags');
    if (!container) return;

    container.innerHTML = symptoms.map(s => `
        <span class="symptom-tag">
            ${s} <i class="fas fa-times" onclick="removeSymptom('${s}')"></i>
        </span>
    `).join('');
}

async function analyzeSymptoms() {
    const resultsDiv = document.getElementById('symptom-results-content');
    const resultsCard = document.getElementById('symptom-results');

    if (symptoms.length === 0) {
        alert('Please add at least one symptom');
        return;
    }

    if (resultsDiv) {
        resultsDiv.innerHTML = '<div class="loader"></div>';
    }
    if (resultsCard) {
        resultsCard.style.display = 'block';
    }

    try {
        const response = await fetch(`${API_BASE}/symptom-checker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms })
        });

        const data = await response.json();

        if (resultsDiv) {
            if (data.emergency) {
                resultsDiv.innerHTML = `
                    <div class="emergency-warning">
                        <h3>🚨 ${data.message}</h3>
                        <p><strong>Action:</strong> ${data.action}</p>
                        <h4>Emergency Steps:</h4>
                        <ul>
                            ${data.details.emergencyAction.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else if (data.found) {
                resultsDiv.innerHTML = `
                    <h3>Analysis Results:</h3>
                    <p><strong>Possible conditions:</strong> ${data.possibleConditions.join(', ')}</p>
                    
                    <h4>💡 General Remedies:</h4>
                    <ul>${data.generalRemedies.map(r => `<li>${r}</li>`).join('')}</ul>
                    
                    <h4>🛡️ Prevention:</h4>
                    <ul>${data.prevention.map(p => `<li>${p}</li>`).join('')}</ul>
                    
                    <p class="disclaimer">${data.disclaimer}</p>
                `;
            } else {
                resultsDiv.innerHTML = `
                    <p>${data.message || 'No specific conditions found'}</p>
                    <ul>${data.generalAdvice.map(a => `<li>${a}</li>`).join('')}</ul>
                `;
            }
        }
    } catch (error) {
        console.error('Symptom Checker Error:', error);
        if (resultsDiv) {
            resultsDiv.innerHTML = '<p class="error">Error analyzing symptoms. Make sure the server is running.</p>';
        }
    }
}

async function loadHealthNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = '<div class="loader"></div>';

    try {
        const response = await fetch(`${API_BASE}/health-news`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            container.innerHTML = data.articles.map(item => `
                <div class="news-card">
                    <img src="${item.image}" alt="${item.title}" class="news-image" onerror="this.src='https://via.placeholder.com/300x200/0047ab/ffffff?text=Health+News'">
                    <div class="news-content">
                        <h4>${item.title}</h4>
                        <p>${item.summary}</p>
                        <div class="news-meta">
                            <span>${item.source}</span>
                            <span>${item.date}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p>No news available</p>';
        }
    } catch (error) {
        console.error('News Error:', error);
        container.innerHTML = '<p class="error">Failed to load health news</p>';
    }
}

async function loadHealthTips() {
    const container = document.getElementById('tips-container');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/health-tips`);
        const tips = await response.json();

        container.innerHTML = tips.map(tip => `
            <div class="tip-card">
                <p>💡 ${tip.tip}</p>
                <small>${tip.category}</small>
            </div>
        `).join('');
    } catch (error) {
        console.error('Tips Error:', error);
        // Fallback tips
        const fallbackTips = [
            'Drink at least 8 glasses of water daily',
            'Get 7-9 hours of sleep each night',
            'Exercise for 30 minutes daily',
            'Eat 5 servings of fruits and vegetables daily'
        ];
        container.innerHTML = fallbackTips.map(tip => `
            <div class="tip-card">
                <p>💡 ${tip}</p>
            </div>
        `).join('');
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});