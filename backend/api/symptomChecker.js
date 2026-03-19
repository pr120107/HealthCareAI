// Symptom database
const symptomDatabase = {
    headache: {
        conditions: ['Tension Headache', 'Migraine', 'Sinus Headache', 'Cluster Headache'],
        description: 'Pain or discomfort in the head, scalp, or neck',
        commonCauses: [
            'Stress and tension',
            'Dehydration',
            'Lack of sleep',
            'Eye strain',
            'Sinus congestion',
            'Caffeine withdrawal'
        ],
        homeRemedies: [
            'Rest in a dark, quiet room',
            'Apply cold or warm compress to head',
            'Stay hydrated with water',
            'Gentle neck and shoulder stretches',
            'Over-the-counter pain relievers (ibuprofen/acetaminophen)'
        ],
        professionalCare: [
            'Consult a doctor if headaches are severe or persistent',
            'Seek immediate care if headache is sudden and severe',
            'See doctor if accompanied by fever, stiff neck, or confusion'
        ],
        prevention: [
            'Maintain regular sleep schedule',
            'Stay hydrated throughout the day',
            'Manage stress through relaxation techniques',
            'Avoid known triggers',
            'Take regular breaks from screens'
        ]
    },
    fever: {
        conditions: ['Viral Infection', 'Bacterial Infection', 'Influenza', 'COVID-19'],
        description: 'Elevated body temperature, usually above 100.4°F (38°C)',
        commonCauses: [
            'Viral infections (common cold, flu)',
            'Bacterial infections',
            'Inflammatory conditions',
            'Heat exhaustion',
            'Medication side effects',
            'Vaccination response'
        ],
        homeRemedies: [
            'Rest and get plenty of sleep',
            'Drink plenty of fluids (water, electrolyte drinks)',
            'Take fever reducers (acetaminophen/ibuprofen)',
            'Use light clothing and light bedding',
            'Take lukewarm baths (not cold)'
        ],
        professionalCare: [
            'Seek medical help if fever exceeds 103°F (39.4°C)',
            'Consult doctor if fever lasts more than 3 days',
            'Get immediate care if fever is accompanied by severe headache, rash, or difficulty breathing'
        ],
        prevention: [
            'Practice good hand hygiene',
            'Avoid close contact with sick individuals',
            'Stay up to date with vaccinations',
            'Maintain a healthy immune system through diet and exercise'
        ]
    },
    cough: {
        conditions: ['Common Cold', 'Bronchitis', 'Allergies', 'Asthma', 'Post-nasal Drip'],
        description: 'Sudden, forceful expulsion of air from the lungs',
        commonCauses: [
            'Viral respiratory infections',
            'Allergies',
            'Asthma',
            'Gastroesophageal reflux (GERD)',
            'Smoking or environmental irritants',
            'Medications (ACE inhibitors)'
        ],
        homeRemedies: [
            'Drink warm fluids with honey and lemon',
            'Use a humidifier or steam inhalation',
            'Suck on cough drops or hard candy',
            'Elevate head while sleeping',
            'Avoid irritants like smoke'
        ],
        professionalCare: [
            'Consult doctor if cough persists more than 3 weeks',
            'Seek immediate care if coughing up blood',
            'See doctor if accompanied by chest pain, shortness of breath, or high fever'
        ],
        prevention: [
            'Wash hands frequently',
            'Avoid smoking and secondhand smoke',
            'Manage allergies',
            'Get flu vaccine annually'
        ]
    },
    'sore throat': {
        conditions: ['Strep Throat', 'Viral Pharyngitis', 'Tonsillitis', 'Allergies'],
        description: 'Pain, scratchiness, or irritation of the throat',
        commonCauses: [
            'Viral infections (common cold, flu)',
            'Bacterial infections (strep throat)',
            'Allergies',
            'Dry air',
            'Irritants like smoke or pollution',
            'Voice strain from shouting'
        ],
        homeRemedies: [
            'Gargle with warm salt water',
            'Drink warm tea with honey',
            'Use throat lozenges or sprays',
            'Stay hydrated with cool or warm fluids',
            'Rest your voice'
        ],
        professionalCare: [
            'See doctor if sore throat is severe or lasts more than a week',
            'Seek care if accompanied by high fever, rash, or difficulty swallowing',
            'Get tested for strep throat if symptoms persist'
        ],
        prevention: [
            'Wash hands regularly',
            'Avoid sharing food, drinks, or utensils',
            'Use a humidifier in dry environments',
            'Avoid smoking and secondhand smoke'
        ]
    },
    'stomach pain': {
        conditions: ['Indigestion', 'Gas', 'Food Poisoning', 'Gastroenteritis', 'Constipation'],
        description: 'Pain or discomfort in the abdominal area',
        commonCauses: [
            'Indigestion or overeating',
            'Gas and bloating',
            'Food poisoning',
            'Viral gastroenteritis (stomach flu)',
            'Constipation',
            'Menstrual cramps'
        ],
        homeRemedies: [
            'Rest and avoid solid foods temporarily',
            'Sip clear fluids (water, broth, herbal tea)',
            'Apply a heating pad to the abdomen',
            'Try the BRAT diet (bananas, rice, applesauce, toast)',
            'Ginger or peppermint tea for nausea'
        ],
        professionalCare: [
            'Seek immediate care if pain is severe or constant',
            'See doctor if accompanied by bloody stools, persistent vomiting, or high fever',
            'Consult if unable to pass gas or have bowel movements'
        ],
        prevention: [
            'Eat smaller, more frequent meals',
            'Chew food thoroughly and eat slowly',
            'Stay hydrated',
            'Identify and avoid trigger foods',
            'Manage stress'
        ]
    },
    fatigue: {
        conditions: ['Anemia', 'Thyroid Disorders', 'Sleep Apnea', 'Depression', 'Chronic Fatigue Syndrome'],
        description: 'Extreme tiredness or lack of energy',
        commonCauses: [
            'Poor sleep quality or quantity',
            'Iron deficiency anemia',
            'Thyroid problems',
            'Stress, anxiety, or depression',
            'Poor nutrition',
            'Dehydration',
            'Sedentary lifestyle'
        ],
        homeRemedies: [
            'Maintain a consistent sleep schedule',
            'Exercise regularly (even light activity helps)',
            'Eat a balanced diet with adequate protein',
            'Stay hydrated throughout the day',
            'Take short breaks during work',
            'Practice stress-reduction techniques'
        ],
        professionalCare: [
            'Consult doctor if fatigue persists for weeks',
            'Seek care if accompanied by unexplained weight loss or fever',
            'Get tested for underlying conditions like anemia or thyroid issues'
        ],
        prevention: [
            'Prioritize 7-9 hours of sleep nightly',
            'Exercise for at least 30 minutes daily',
            'Eat a nutrient-rich diet',
            'Manage stress through meditation or yoga',
            'Limit caffeine, especially in afternoon'
        ]
    },
    'chest pain': {
        conditions: ['URGENT - May be serious - Seek immediate care'],
        description: 'Pain, pressure, or discomfort in the chest area',
        commonCauses: [
            'Heart attack (URGENT)',
            'Angina',
            'Pulmonary embolism',
            'Pneumonia',
            'Acid reflux',
            'Anxiety or panic attack',
            'Muscle strain'
        ],
        emergencyAction: [
            '🚨 CALL EMERGENCY SERVICES (911) IMMEDIATELY',
            'Do not drive yourself to the hospital',
            'Chew aspirin if available and not allergic',
            'Stop all activity and rest',
            'Unlock door for emergency responders'
        ],
        warningSigns: [
            'Crushing chest pain or pressure',
            'Pain spreading to arm, jaw, neck, or back',
            'Shortness of breath',
            'Cold sweat',
            'Nausea or lightheadedness'
        ]
    }
};

module.exports = (req, res) => {
    try {
        const { symptoms } = req.body;
        
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({ 
                error: 'Please provide at least one symptom',
                example: { symptoms: ['headache', 'fever'] }
            });
        }
        
        // Check for emergency symptoms
        const hasEmergency = symptoms.some(s => 
            s.toLowerCase().includes('chest') || 
            s.toLowerCase().includes('breath') ||
            s.toLowerCase().includes('severe')
        );
        
        if (hasEmergency) {
            return res.json({
                emergency: true,
                message: '⚠️ URGENT: Your symptoms may indicate a serious condition',
                action: 'Seek immediate medical attention',
                details: symptomDatabase['chest pain']
            });
        }
        
        const results = [];
        const matchedConditions = [];
        const allRemedies = [];
        const allPrevention = [];
        
        symptoms.forEach(symptom => {
            const lowerSymptom = symptom.toLowerCase();
            for (const [key, data] of Object.entries(symptomDatabase)) {
                if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
                    results.push({
                        symptom: key,
                        ...data
                    });
                    
                    if (data.conditions) {
                        matchedConditions.push(...data.conditions);
                    }
                    if (data.homeRemedies) {
                        allRemedies.push(...data.homeRemedies);
                    }
                    if (data.prevention) {
                        allPrevention.push(...data.prevention);
                    }
                }
            }
        });
        
        if (results.length === 0) {
            return res.json({
                found: false,
                message: 'No specific conditions found for your symptoms',
                generalAdvice: [
                    'Rest and monitor your symptoms',
                    'Stay hydrated',
                    'Consult a healthcare provider if symptoms persist',
                    'Seek immediate care if symptoms worsen'
                ]
            });
        }
        
        res.json({
            found: true,
            results: results,
            possibleConditions: [...new Set(matchedConditions)].slice(0, 5),
            generalRemedies: [...new Set(allRemedies)].slice(0, 5),
            prevention: [...new Set(allPrevention)].slice(0, 5),
            disclaimer: '⚠️ This information is for educational purposes only. Always consult a healthcare provider for medical advice.'
        });
    } catch (error) {
        res.status(500).json({ error: 'Symptom analysis failed' });
    }
};

// Export for use in server.js
module.exports.search = (req, res) => {
    const { q } = req.query;
    const symptoms = Object.keys(symptomDatabase).filter(s => 
        s.includes(q?.toLowerCase() || '')
    );
    res.json({ symptoms });
};