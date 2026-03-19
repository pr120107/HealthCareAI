// ===== API CONFIGURATION =====
const API_BASE = 'http://localhost:3000/api';

// ===== SYMPTOM CHECKER =====
let symptoms = [];

document.getElementById('add-symptom-btn').addEventListener('click', addSymptom);
document.getElementById('symptom-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addSymptom();
});

function addSymptom() {
    const input = document.getElementById('symptom-input');
    const symptom = input.value.trim().toLowerCase();
    
    if (symptom && !symptoms.includes(symptom)) {
        symptoms.push(symptom);
        renderSymptomTags();
        input.value = '';
    }
}

function renderSymptomTags() {
    const container = document.getElementById('symptom-tags');
    container.innerHTML = symptoms.map(s => `
        <span class="symptom-tag">
            ${s} <i class="fas fa-times" onclick="removeSymptom('${s}')"></i>
        </span>
    `).join('');
}

window.removeSymptom = (symptom) => {
    symptoms = symptoms.filter(s => s !== symptom);
    renderSymptomTags();
};

document.getElementById('analyze-symptoms-btn').addEventListener('click', async () => {
    if (symptoms.length === 0) {
        alert('Please add at least one symptom');
        return;
    }
    
    const loader = document.getElementById('symptom-loader');
    const resultsDiv = document.getElementById('symptom-results-content');
    
    loader.style.display = 'block';
    resultsDiv.innerHTML = '';
    
    try {
        const response = await fetch(`${API_BASE}/symptom-checker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                symptoms: symptoms,
                age: parseInt(document.getElementById('patient-age').value),
                gender: document.getElementById('patient-gender').value
            })
        });
        
        const data = await response.json();
        
        if (data.result && data.result.analysis) {
            const analysis = data.result.analysis;
            resultsDiv.innerHTML = `
                <div class="analysis-result">
                    <h4>Possible Conditions:</h4>
                    ${analysis.possibleConditions.map(c => `
                        <div class="condition-card">
                            <h5>${c.condition}</h5>
                            <p>${c.description}</p>
                            <p><strong>Risk Level:</strong> ${c.riskLevel}</p>
                        </div>
                    `).join('')}
                    
                    <h4>General Advice:</h4>
                    <ul>
                        ${analysis.generalAdvice.recommendedActions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                    
                    <div class="warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        ${analysis.generalAdvice.whenToSeekMedicalAttention.join(' ')}
                    </div>
                </div>
            `;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p class="error">Error analyzing symptoms. Please try again.</p>`;
    } finally {
        loader.style.display = 'none';
    }
});

// ===== MEDICATION LOOKUP =====
document.getElementById('search-medication-btn').addEventListener('click', searchMedication);
document.getElementById('medication-search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMedication();
});

document.querySelectorAll('.med-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.getElementById('medication-search').value = tag.dataset.med;
        searchMedication();
    });
});

async function searchMedication() {
    const medication = document.getElementById('medication-search').value.trim();
    if (!medication) return;
    
    const loader = document.getElementById('medication-loader');
    const resultsDiv = document.getElementById('medication-results');
    
    loader.style.display = 'block';
    resultsDiv.style.display = 'none';
    
    try {
        const response = await fetch(`${API_BASE}/medication-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ medication })
        });
        
        const data = await response.json();
        
        // Parse NHS API response format
        resultsDiv.innerHTML = `
            <div class="medication-card">
                <h3>${medication.charAt(0).toUpperCase() + medication.slice(1)}</h3>
                <div class="med-info">
                    ${data.mainEntity?.description || 'Information available from NHS'}
                </div>
            </div>
        `;
        resultsDiv.style.display = 'block';
    } catch (error) {
        resultsDiv.innerHTML = `<p class="error">Error fetching medication information</p>`;
        resultsDiv.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

// ===== BMI CALCULATOR =====
document.getElementById('calculate-bmi-btn').addEventListener('click', calculateBMI);

async function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('bmi-age').value;
    const gender = document.getElementById('bmi-gender').value;
    
    if (!weight || !height) {
        alert('Please enter weight and height');
        return;
    }
    
    const loader = document.getElementById('bmi-loader');
    const resultsDiv = document.getElementById('bmi-results');
    
    loader.style.display = 'block';
    resultsDiv.style.display = 'none';
    
    try {
        const response = await fetch(`${API_BASE}/bmi-calculator`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weight, height, age, gender })
        });
        
        const data = await response.json();
        
        resultsDiv.innerHTML = `
            <div class="bmi-result-card">
                <h3>Your BMI: ${data.bmi}</h3>
                <p class="bmi-category ${data.category.toLowerCase().replace(' ', '-')}">
                    ${data.category}
                </p>
                <div class="bmi-recommendations">
                    <h4>Personalized Recommendations:</h4>
                    ${Object.entries(data.recommendations).map(([key, value]) => `
                        <div class="rec-section">
                            <h5>${key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                            <ul>
                                ${Array.isArray(value) ? value.map(item => `<li>${item}</li>`).join('') : `<li>${value}</li>`}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        resultsDiv.style.display = 'block';
    } catch (error) {
        resultsDiv.innerHTML = `<p class="error">Error calculating BMI</p>`;
        resultsDiv.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

// ===== HEALTH NEWS =====
async function loadHealthNews() {
    const container = document.getElementById('news-container');
    
    try {
        const response = await fetch(`${API_BASE}/health-news`);
        const articles = await response.json();
        
        container.innerHTML = articles.map(article => `
            <div class="news-card">
                <h4>${article.title}</h4>
                <p>${article.description || ''}</p>
                <div class="news-meta">
                    <span><i class="fas fa-newspaper"></i> ${article.source.name}</span>
                    <a href="${article.url}" target="_blank">Read More →</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p class="error">Failed to load health news</p>';
    }
}

// ===== AI CHATBOT =====
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-chat-btn');
let chatHistory = [];

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    chatHistory.push({
        role: 'user',
        parts: [{ text: message }]
    });
    
    try {
        const response = await fetch(`${API_BASE}/ai-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                history: chatHistory.slice(-5) // Send last 5 messages for context
            })
        });
        
        const data = await response.json();
        addMessage(data.response, 'bot');
        
        chatHistory.push({
            role: 'model',
            parts: [{ text: data.response }]
        });
    } catch (error) {
        addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// ===== INITIALIZE =====
loadHealthNews();

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});