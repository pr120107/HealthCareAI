const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ==================== 1. BMI CALCULATOR ====================
app.post('/api/bmi', (req, res) => {
    try {
        const { weight, height, age, gender } = req.body;
        
        // Validate input
        if (!weight || !height) {
            return res.status(400).json({ error: 'Weight and height are required' });
        }
        
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Determine category
        let category;
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        
        // Calculate BMR (Basal Metabolic Rate)
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        
        // Generate recommendations
        const recommendations = {
            diet: getDietRecommendations(category),
            exercise: getExerciseRecommendations(category),
            lifestyle: [
                'Drink 8-10 glasses of water daily',
                'Get 7-9 hours of sleep',
                'Practice stress management',
                'Track your progress weekly'
            ]
        };
        
        res.json({
            success: true,
            bmi: parseFloat(bmi),
            category: category,
            bmr: Math.round(bmr),
            dailyCalories: {
                maintain: Math.round(bmr * 1.2),
                lose: Math.round(bmr * 1.2 - 500),
                gain: Math.round(bmr * 1.2 + 500)
            },
            recommendations: recommendations,
            idealWeightRange: {
                min: (18.5 * heightInMeters * heightInMeters).toFixed(1),
                max: (24.9 * heightInMeters * heightInMeters).toFixed(1)
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'BMI calculation failed' });
    }
});

function getDietRecommendations(category) {
    const diets = {
        'Underweight': [
            'Increase calorie intake by 300-500 calories daily',
            'Eat protein-rich foods: eggs, chicken, fish, legumes',
            'Add healthy fats: avocados, nuts, olive oil',
            'Have 5-6 small meals throughout the day',
            'Include smoothies with protein powder'
        ],
        'Normal weight': [
            'Maintain balanced diet with all food groups',
            'Eat 2-3 servings of fruits daily',
            'Include 3-4 servings of vegetables',
            'Choose whole grains over refined',
            'Limit processed foods and added sugars'
        ],
        'Overweight': [
            'Reduce portion sizes by 20%',
            'Focus on lean proteins and vegetables',
            'Replace refined carbs with whole grains',
            'Avoid sugary drinks and snacks',
            'Eat mindfully without distractions'
        ],
        'Obese': [
            'Consult a nutritionist for personalized plan',
            'Start with small, sustainable changes',
            'Focus on vegetables and lean proteins',
            'Track all food intake in a journal',
            'Avoid processed and fast foods'
        ]
    };
    return diets[category] || diets['Normal weight'];
}

function getExerciseRecommendations(category) {
    const exercises = {
        'Underweight': [
            'Strength training 3-4 times per week',
            'Focus on compound exercises: squats, deadlifts',
            'Light cardio 2 times per week',
            'Progressive overload: gradually increase weights',
            'Rest 48 hours between strength sessions'
        ],
        'Normal weight': [
            '150 minutes moderate cardio weekly',
            'Strength training 2-3 times per week',
            'Mix HIIT sessions once weekly',
            'Include flexibility exercises like yoga',
            'Stay active throughout the day'
        ],
        'Overweight': [
            'Brisk walking 30-45 minutes daily',
            'Swimming or cycling for low-impact cardio',
            'Bodyweight exercises: pushups, squats',
            'Start with 3 workouts per week',
            'Gradually increase intensity'
        ],
        'Obese': [
            'Start with walking 15-20 minutes daily',
            'Water aerobics for joint-friendly exercise',
            'Chair exercises if mobility limited',
            'Consult physical therapist before starting',
            'Focus on consistency over intensity'
        ]
    };
    return exercises[category] || exercises['Normal weight'];
}

// ==================== 2. DRUG INFORMATION DATABASE ====================
const drugDatabase = {
    'ibuprofen': {
        name: 'Ibuprofen',
        generic: 'Ibuprofen',
        type: 'NSAID (Nonsteroidal Anti-inflammatory Drug)',
        uses: [
            'Relief of mild to moderate pain',
            'Reduction of fever',
            'Treatment of inflammation',
            'Menstrual cramps',
            'Arthritis pain'
        ],
        dosage: {
            adult: '200-400 mg every 4-6 hours',
            max: '1200 mg per day without prescription',
            withFood: 'Take with food or milk to prevent stomach upset'
        },
        sideEffects: [
            'Stomach pain or heartburn',
            'Nausea or vomiting',
            'Dizziness',
            'Mild headache',
            'Bloating or gas'
        ],
        seriousSideEffects: [
            'Chest pain or shortness of breath',
            'Blood in vomit or stool',
            'Black or bloody stools',
            'Swelling of face or throat',
            'Skin rash or blistering'
        ],
        warnings: [
            'Do not take with other NSAIDs',
            'Avoid alcohol while taking',
            'Consult doctor if pregnant or breastfeeding',
            'Not recommended for children under 6 months',
            'Stop before surgery as directed by doctor'
        ],
        interactions: [
            'Blood thinners (warfarin)',
            'Aspirin',
            'Blood pressure medications',
            'Diuretics (water pills)',
            'Lithium'
        ]
    },
    'paracetamol': {
        name: 'Paracetamol (Acetaminophen)',
        generic: 'Acetaminophen',
        type: 'Analgesic and Antipyretic',
        uses: [
            'Pain relief (headache, toothache, backache)',
            'Fever reduction',
            'Cold and flu symptoms',
            'Muscle aches'
        ],
        dosage: {
            adult: '500-1000 mg every 4-6 hours',
            max: '4000 mg per day (4 grams)',
            withFood: 'Can be taken with or without food'
        },
        sideEffects: [
            'Nausea',
            'Vomiting',
            'Loss of appetite',
            'Mild abdominal pain'
        ],
        seriousSideEffects: [
            'Yellowing of skin or eyes (jaundice)',
            'Dark urine',
            'Severe stomach pain',
            'Unexplained bruising',
            'Allergic reaction (rash, swelling)'
        ],
        warnings: [
            'Liver damage risk with high doses',
            'Do not combine with alcohol',
            'Check other medications for acetaminophen content',
            'Avoid if you have liver disease',
            'Do not exceed recommended dose'
        ],
        interactions: [
            'Alcohol',
            'Warfarin (blood thinner)',
            'Phenytoin (seizure medication)',
            'Carbamazepine',
            'Isoniazid (tuberculosis medication)'
        ]
    },
    'amoxicillin': {
        name: 'Amoxicillin',
        generic: 'Amoxicillin',
        type: 'Penicillin Antibiotic',
        uses: [
            'Bacterial infections of the ear, nose, throat',
            'Respiratory tract infections',
            'Urinary tract infections',
            'Skin infections',
            'Dental infections'
        ],
        dosage: {
            adult: '250-500 mg every 8 hours',
            child: 'Based on body weight',
            duration: 'Take full course as prescribed'
        },
        sideEffects: [
            'Diarrhea',
            'Nausea',
            'Vomiting',
            'Mild skin rash',
            'Yeast infections'
        ],
        seriousSideEffects: [
            'Severe allergic reaction (anaphylaxis)',
            'Severe watery diarrhea',
            'Unusual bleeding or bruising',
            'Severe skin reaction',
            'Difficulty breathing'
        ],
        warnings: [
            'Complete full course of treatment',
            'Take at evenly spaced times',
            'Do not share with others',
            'Inform doctor if allergic to penicillin',
            'May reduce effectiveness of birth control'
        ],
        interactions: [
            'Oral contraceptives',
            'Blood thinners',
            'Methotrexate',
            'Probenecid',
            'Other antibiotics'
        ]
    },
    'omeprazole': {
        name: 'Omeprazole',
        generic: 'Omeprazole',
        type: 'Proton Pump Inhibitor (PPI)',
        uses: [
            'Gastroesophageal reflux disease (GERD)',
            'Stomach ulcers',
            'Zollinger-Ellison syndrome',
            'Erosive esophagitis',
            'Heartburn prevention'
        ],
        dosage: {
            adult: '20-40 mg once daily',
            timing: 'Take before morning meal',
            duration: 'Usually 4-8 weeks'
        },
        sideEffects: [
            'Headache',
            'Nausea',
            'Diarrhea',
            'Constipation',
            'Gas'
        ],
        seriousSideEffects: [
            'Severe diarrhea (C. difficile)',
            'Kidney problems',
            'Low magnesium levels',
            'Bone fractures with long-term use',
            'Vitamin B12 deficiency'
        ],
        warnings: [
            'Do not crush or chew capsules',
            'Avoid if taking certain HIV medications',
            'Long-term use may increase fracture risk',
            'Monitor magnesium levels',
            'May mask stomach cancer symptoms'
        ],
        interactions: [
            'Clopidogrel (Plavix)',
            'Cilostazol',
            'Methotrexate',
            'Digoxin',
            'Iron supplements'
        ]
    },
    'metformin': {
        name: 'Metformin',
        generic: 'Metformin',
        type: 'Biguanide (Diabetes Medication)',
        uses: [
            'Type 2 diabetes management',
            'Prediabetes',
            'Polycystic ovary syndrome (PCOS)',
            'Weight management',
            'Metabolic syndrome'
        ],
        dosage: {
            adult: '500-2000 mg daily in divided doses',
            timing: 'Take with meals to reduce side effects',
            titration: 'Start low, increase gradually'
        },
        sideEffects: [
            'Nausea',
            'Diarrhea',
            'Stomach upset',
            'Loss of appetite',
            'Metallic taste'
        ],
        seriousSideEffects: [
            'Lactic acidosis (rare but serious)',
            'Severe allergic reaction',
            'Low blood sugar (hypoglycemia)',
            'Vitamin B12 deficiency',
            'Liver problems'
        ],
        warnings: [
            'Stop before surgery or contrast dye procedures',
            'Monitor kidney function regularly',
            'Avoid excessive alcohol',
            'Check vitamin B12 levels annually',
            'Inform doctor if pregnant'
        ],
        interactions: [
            'Contrast dyes (for X-rays)',
            'Cimetidine',
            'Diuretics',
            'Steroids',
            'Other diabetes medications'
        ]
    }
};

app.get('/api/drug/:name', (req, res) => {
    try {
        const drugName = req.params.name.toLowerCase();
        const drug = drugDatabase[drugName];
        
        if (!drug) {
            // Return similar drug suggestions
            const suggestions = Object.keys(drugDatabase).filter(d => d.includes(drugName) || drugName.includes(d));
            return res.json({
                found: false,
                message: 'Drug not found in database',
                suggestions: suggestions.slice(0, 5)
            });
        }
        
        res.json({
            found: true,
            ...drug
        });
    } catch (error) {
        res.status(500).json({ error: 'Drug lookup failed' });
    }
});

app.get('/api/drugs/search', (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || '';
        
        if (!query) {
            return res.json({
                drugs: Object.keys(drugDatabase).map(name => ({
                    name: drugDatabase[name].name,
                    generic: drugDatabase[name].generic
                }))
            });
        }
        
        const results = Object.entries(drugDatabase)
            .filter(([key, drug]) => 
                key.includes(query) || 
                drug.name.toLowerCase().includes(query) ||
                drug.generic.toLowerCase().includes(query)
            )
            .map(([key, drug]) => ({
                id: key,
                name: drug.name,
                generic: drug.generic
            }));
        
        res.json({ drugs: results });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// ==================== 3. SYMPTOM CHECKER ====================
const symptomDatabase = {
    headache: {
        conditions: ['Tension Headache', 'Migraine', 'Sinus Headache', 'Cluster Headache'],
        description: 'Pain in any region of the head',
        causes: [
            'Stress and tension',
            'Dehydration',
            'Lack of sleep',
            'Eye strain',
            'Sinus congestion',
            'Caffeine withdrawal'
        ],
        homeRemedies: [
            'Rest in a dark, quiet room',
            'Apply cold or warm compress',
            'Stay hydrated',
            'Gentle neck stretches',
            'Over-the-counter pain relievers'
        ],
        warningSigns: [
            'Sudden, severe headache',
            'Headache with fever and stiff neck',
            'Headache after head injury',
            'Headache with vision changes',
            'Headache with confusion or seizures'
        ]
    },
    fever: {
        conditions: ['Viral Infection', 'Bacterial Infection', 'Flu', 'Heat Exhaustion'],
        description: 'Elevated body temperature above 100.4°F (38°C)',
        causes: [
            'Infections (viral or bacterial)',
            'Inflammatory conditions',
            'Heat exhaustion',
            'Medication reaction',
            'Vaccination side effects'
        ],
        homeRemedies: [
            'Rest and sleep',
            'Drink plenty of fluids',
            'Take fever reducers (acetaminophen/ibuprofen)',
            'Lukewarm sponge bath',
            'Light clothing and light bedding'
        ],
        warningSigns: [
            'Fever above 103°F (39.4°C)',
            'Fever lasting more than 3 days',
            'Severe headache or rash',
            'Difficulty breathing',
            'Confusion or stiff neck'
        ]
    },
    cough: {
        conditions: ['Common Cold', 'Bronchitis', 'Allergies', 'Asthma', 'Post-nasal Drip'],
        description: 'Sudden expulsion of air from the lungs',
        causes: [
            'Viral infections',
            'Allergies',
            'Asthma',
            'Acid reflux',
            'Smoking',
            'Environmental irritants'
        ],
        homeRemedies: [
            'Honey in warm water or tea',
            'Stay hydrated',
            'Use a humidifier',
            'Ginger or peppermint tea',
            'Avoid irritants'
        ],
        warningSigns: [
            'Cough lasting more than 3 weeks',
            'Coughing up blood',
            'Chest pain with cough',
            'Difficulty breathing',
            'High fever'
        ]
    },
    'sore throat': {
        conditions: ['Strep Throat', 'Viral Pharyngitis', 'Tonsillitis', 'Allergies'],
        description: 'Pain, scratchiness or irritation of the throat',
        causes: [
            'Viral infections',
            'Bacterial infections (strep)',
            'Allergies',
            'Dry air',
            'Irritants like smoke'
        ],
        homeRemedies: [
            'Gargle with warm salt water',
            'Drink warm tea with honey',
            'Use throat lozenges',
            'Stay hydrated',
            'Rest your voice'
        ],
        warningSigns: [
            'Severe pain or difficulty swallowing',
            'Fever above 101°F',
            'Difficulty breathing',
            'Blood in saliva',
            'Lump in neck'
        ]
    },
    'stomach pain': {
        conditions: ['Indigestion', 'Gas', 'Food Poisoning', 'Gastroenteritis', 'Constipation'],
        description: 'Pain or discomfort in the abdominal area',
        causes: [
            'Indigestion or overeating',
            'Gas or bloating',
            'Food poisoning',
            'Viral infection',
            'Constipation',
            'Stress'
        ],
        homeRemedies: [
            'Rest and avoid solid foods temporarily',
            'Sip clear fluids',
            'Apply heat pack',
            'Ginger or peppermint tea',
            'BRAT diet (bananas, rice, applesauce, toast)'
        ],
        warningSigns: [
            'Severe, constant pain',
            'Bloody stools',
            'Persistent vomiting',
            'Fever above 101°F',
            'Swollen or tender abdomen'
        ]
    },
    fatigue: {
        conditions: ['Anemia', 'Thyroid Issues', 'Sleep Disorders', 'Depression', 'Chronic Fatigue'],
        description: 'Extreme tiredness or lack of energy',
        causes: [
            'Poor sleep quality',
            'Iron deficiency',
            'Thyroid problems',
            'Stress and anxiety',
            'Poor nutrition',
            'Dehydration'
        ],
        homeRemedies: [
            'Maintain consistent sleep schedule',
            'Exercise regularly',
            'Eat balanced meals',
            'Stay hydrated',
            'Take short breaks during day'
        ],
        warningSigns: [
            'Persistent fatigue for weeks',
            'Unexplained weight loss',
            'Fever with fatigue',
            'Shortness of breath',
            'Severe weakness'
        ]
    },
    'chest pain': {
        conditions: ['URGENT - May be serious'],
        description: 'Pain or discomfort in the chest area',
        causes: [
            'Heart attack (URGENT)',
            'Angina',
            'Anxiety or panic attack',
            'Acid reflux',
            'Muscle strain'
        ],
        emergencyAction: [
            'CALL EMERGENCY SERVICES IMMEDIATELY',
            'Do not drive yourself',
            'Chew aspirin if available and not allergic',
            'Stop all activity and rest',
            'Unlock door for emergency responders'
        ],
        warningSigns: [
            'Crushing chest pain or pressure',
            'Pain spreading to arm, jaw, or back',
            'Shortness of breath',
            'Cold sweat',
            'Nausea or lightheadedness'
        ]
    }
};

app.post('/api/symptom-checker', (req, res) => {
    try {
        const { symptoms, age, gender } = req.body;
        
        if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
            return res.status(400).json({ error: 'Please provide at least one symptom' });
        }
        
        // Check for emergency symptoms first
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
        
        const matchedSymptoms = [];
        const possibleConditions = [];
        const allAdvice = [];
        const allWarnings = [];
        
        symptoms.forEach(symptom => {
            const lowerSymptom = symptom.toLowerCase();
            for (const [key, data] of Object.entries(symptomDatabase)) {
                if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
                    matchedSymptoms.push({
                        symptom: key,
                        conditions: data.conditions,
                        remedies: data.homeRemedies || data.emergencyAction
                    });
                    
                    possibleConditions.push(...data.conditions);
                    
                    if (data.homeRemedies) {
                        allAdvice.push(...data.homeRemedies);
                    }
                    
                    if (data.warningSigns) {
                        allWarnings.push(...data.warningSigns);
                    }
                }
            }
        });
        
        if (matchedSymptoms.length === 0) {
            return res.json({
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
            matchedSymptoms,
            possibleConditions: [...new Set(possibleConditions)].slice(0, 5),
            generalAdvice: [...new Set(allAdvice)].slice(0, 5),
            warningSigns: [...new Set(allWarnings)].slice(0, 5),
            disclaimer: 'This is for educational purposes only. Always consult a healthcare provider.'
        });
    } catch (error) {
        res.status(500).json({ error: 'Symptom analysis failed' });
    }
});

// ==================== 4. HEALTH NEWS ====================
app.get('/api/health-news', (req, res) => {
    const news = [
        {
            id: 1,
            title: 'WHO recommends new COVID-19 vaccination strategy for 2025',
            summary: 'Updated guidelines focus on high-risk populations and annual boosters',
            source: 'World Health Organization',
            date: '2025-03-15',
            category: 'COVID-19',
            url: 'https://www.who.int/news'
        },
        {
            id: 2,
            title: 'Breakthrough in early cancer detection using AI',
            summary: 'New blood test can detect 10 types of cancer years before symptoms appear',
            source: 'NIH Research',
            date: '2025-03-14',
            category: 'Cancer Research',
            url: 'https://www.nih.gov/news'
        },
        {
            id: 3,
            title: 'Mediterranean diet linked to longer life expectancy',
            summary: '20-year study confirms heart and brain health benefits',
            source: 'Harvard Health',
            date: '2025-03-13',
            category: 'Nutrition',
            url: 'https://www.health.harvard.edu'
        },
        {
            id: 4,
            title: 'FDA approves new diabetes drug with fewer side effects',
            summary: 'Once-weekly injection shows promising results in clinical trials',
            source: 'FDA',
            date: '2025-03-12',
            category: 'Diabetes',
            url: 'https://www.fda.gov/news'
        },
        {
            id: 5,
            title: 'Mental health apps show effectiveness in treating anxiety',
            summary: 'Study finds digital interventions comparable to therapy',
            source: 'Psychiatry Online',
            date: '2025-03-11',
            category: 'Mental Health',
            url: 'https://psychiatryonline.org'
        },
        {
            id: 6,
            title: 'WHO declares global health emergency for new virus variant',
            summary: 'Increased surveillance and precautions recommended worldwide',
            source: 'WHO',
            date: '2025-03-10',
            category: 'Public Health',
            url: 'https://www.who.int/emergencies'
        },
        {
            id: 7,
            title: 'Sleep duration affects heart health, new study finds',
            summary: '7-8 hours optimal for cardiovascular health',
            source: 'American Heart Association',
            date: '2025-03-09',
            category: 'Heart Health',
            url: 'https://www.heart.org/news'
        },
        {
            id: 8,
            title: 'Exercise "snacks" improve fitness in sedentary adults',
            summary: 'Short bursts of activity throughout day show benefits',
            source: 'Exercise Science Journal',
            date: '2025-03-08',
            category: 'Fitness',
            url: 'https://journals.lww.com/acsm'
        }
    ];
    
    res.json(news);
});

app.get('/api/health-news/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const news = [
        {
            id: 1,
            title: 'WHO recommends new COVID-19 vaccination strategy for 2025',
            summary: 'Updated guidelines focus on high-risk populations and annual boosters',
            source: 'World Health Organization',
            date: '2025-03-15',
            category: 'COVID-19',
            url: 'https://www.who.int/news'
        },
        {
            id: 2,
            title: 'Breakthrough in early cancer detection using AI',
            summary: 'New blood test can detect 10 types of cancer years before symptoms appear',
            source: 'NIH Research',
            date: '2025-03-14',
            category: 'Cancer Research',
            url: 'https://www.nih.gov/news'
        },
        {
            id: 3,
            title: 'Mediterranean diet linked to longer life expectancy',
            summary: '20-year study confirms heart and brain health benefits',
            source: 'Harvard Health',
            date: '2025-03-13',
            category: 'Nutrition',
            url: 'https://www.health.harvard.edu'
        },
        {
            id: 4,
            title: 'FDA approves new diabetes drug with fewer side effects',
            summary: 'Once-weekly injection shows promising results in clinical trials',
            source: 'FDA',
            date: '2025-03-12',
            category: 'Diabetes',
            url: 'https://www.fda.gov/news'
        },
        {
            id: 5,
            title: 'Mental health apps show effectiveness in treating anxiety',
            summary: 'Study finds digital interventions comparable to therapy',
            source: 'Psychiatry Online',
            date: '2025-03-11',
            category: 'Mental Health',
            url: 'https://psychiatryonline.org'
        },
        {
            id: 6,
            title: 'WHO declares global health emergency for new virus variant',
            summary: 'Increased surveillance and precautions recommended worldwide',
            source: 'WHO',
            date: '2025-03-10',
            category: 'Public Health',
            url: 'https://www.who.int/emergencies'
        },
        {
            id: 7,
            title: 'Sleep duration affects heart health, new study finds',
            summary: '7-8 hours optimal for cardiovascular health',
            source: 'American Heart Association',
            date: '2025-03-09',
            category: 'Heart Health',
            url: 'https://www.heart.org/news'
        },
        {
            id: 8,
            title: 'Exercise "snacks" improve fitness in sedentary adults',
            summary: 'Short bursts of activity throughout day show benefits',
            source: 'Exercise Science Journal',
            date: '2025-03-08',
            category: 'Fitness',
            url: 'https://journals.lww.com/acsm'
        }
    ];
    
    const filtered = news.filter(item => item.category.toLowerCase().includes(category));
    res.json(filtered.length > 0 ? filtered : news.slice(0, 3));
});

// ==================== 5. HOSPITAL LOCATOR (Demo) ====================
const hospitals = [
    {
        id: 1,
        name: 'City General Hospital',
        address: '123 Main Street, New York, NY 10001',
        phone: '(212) 555-0123',
        emergency: true,
        specialties: ['Emergency', 'Cardiology', 'Pediatrics'],
        hours: '24/7',
        rating: 4.5
    },
    {
        id: 2,
        name: 'St. Mary\'s Medical Center',
        address: '456 Park Avenue, New York, NY 10022',
        phone: '(212) 555-0456',
        emergency: true,
        specialties: ['Oncology', 'Neurology', 'Orthopedics'],
        hours: '24/7',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Community Health Clinic',
        address: '789 Broadway, New York, NY 10003',
        phone: '(212) 555-0789',
        emergency: false,
        specialties: ['Primary Care', 'Pediatrics', 'Women\'s Health'],
        hours: '8:00 AM - 8:00 PM',
        rating: 4.2
    },
    {
        id: 4,
        name: 'University Medical Center',
        address: '321 College Street, New York, NY 10027',
        phone: '(212) 555-0321',
        emergency: true,
        specialties: ['Trauma', 'Surgery', 'Research'],
        hours: '24/7',
        rating: 4.7
    },
    {
        id: 5,
        name: 'Urgent Care Center',
        address: '555 5th Avenue, New York, NY 10017',
        phone: '(212) 555-0555',
        emergency: false,
        specialties: ['Urgent Care', 'X-Ray', 'Lab Services'],
        hours: '7:00 AM - 11:00 PM',
        rating: 4.0
    }
];

app.get('/api/hospitals/search', (req, res) => {
    try {
        const { city, zip, emergency } = req.query;
        
        let results = [...hospitals];
        
        if (emergency === 'true') {
            results = results.filter(h => h.emergency);
        }
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Hospital search failed' });
    }
});

app.get('/api/hospitals/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const hospital = hospitals.find(h => h.id === id);
        
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch hospital details' });
    }
});

// ==================== 6. HEALTH TIPS ====================
const healthTips = [
    {
        id: 1,
        category: 'General Health',
        tip: 'Drink at least 8 glasses of water daily to stay hydrated',
        icon: '💧'
    },
    {
        id: 2,
        category: 'Sleep',
        tip: 'Maintain a consistent sleep schedule, even on weekends',
        icon: '😴'
    },
    {
        id: 3,
        category: 'Exercise',
        tip: 'Take the stairs instead of the elevator for extra activity',
        icon: '🏃'
    },
    {
        id: 4,
        category: 'Nutrition',
        tip: 'Eat a rainbow of fruits and vegetables for diverse nutrients',
        icon: '🥗'
    },
    {
        id: 5,
        category: 'Mental Health',
        tip: 'Practice deep breathing for 5 minutes when feeling stressed',
        icon: '🧘'
    },
    {
        id: 6,
        category: 'Prevention',
        tip: 'Wash hands frequently to prevent infection spread',
        icon: '🧼'
    },
    {
        id: 7,
        category: 'Heart Health',
        tip: 'Limit sodium intake to less than 2,300mg per day',
        icon: '❤️'
    },
    {
        id: 8,
        category: 'Bone Health',
        tip: 'Get adequate calcium and vitamin D for strong bones',
        icon: '🦴'
    },
    {
        id: 9,
        category: 'Eye Health',
        tip: 'Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds',
        icon: '👁️'
    },
    {
        id: 10,
        category: 'Immune System',
        tip: 'Get 7-9 hours of sleep to support immune function',
        icon: '🛡️'
    }
];

app.get('/api/health-tips', (req, res) => {
    const { category, limit } = req.query;
    
    let tips = healthTips;
    
    if (category) {
        tips = tips.filter(t => t.category.toLowerCase().includes(category.toLowerCase()));
    }
    
    if (limit) {
        tips = tips.slice(0, parseInt(limit));
    }
    
    res.json(tips);
});

app.get('/api/health-tips/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    res.json(healthTips[randomIndex]);
});

// ==================== 7. FIRST AID GUIDE ====================
const firstAid = {
    bleeding: {
        title: 'Severe Bleeding',
        steps: [
            'Wear gloves if available',
            'Apply direct pressure with clean cloth',
            'Elevate injured area above heart',
            'Add more cloth if blood soaks through',
            'Apply pressure bandage when bleeding slows'
        ],
        whenToCall: 'Call emergency services immediately if bleeding is severe or does not stop'
    },
    choking: {
        title: 'Choking',
        steps: [
            'Ask "Are you choking?"',
            'Stand behind person, wrap arms around waist',
            'Make fist above navel',
            'Give quick inward-upward thrusts',
            'Repeat until object is expelled'
        ],
        whenToCall: 'Call emergency if person becomes unconscious or cannot breathe'
    },
    cpr: {
        title: 'CPR (Adult)',
        steps: [
            'Check responsiveness',
            'Call emergency services',
            'Start chest compressions',
            'Push hard and fast (100-120 per minute)',
            'Allow chest to fully recoil'
        ],
        whenToCall: 'Call emergency immediately before starting CPR'
    },
    burn: {
        title: 'Burns',
        steps: [
            'Remove source of burn',
            'Cool with cool (not cold) running water for 10-20 minutes',
            'Cover with sterile gauze',
            'Take pain reliever if needed',
            'Do not apply ice or butter'
        ],
        whenToCall: 'Call emergency for large burns, face burns, or difficulty breathing'
    },
    fracture: {
        title: 'Fracture',
        steps: [
            'Keep injured area still',
            'Apply ice pack wrapped in cloth',
            'Elevate if possible',
            'Create splint with rigid object',
            'Seek medical help'
        ],
        whenToCall: 'Call emergency if bone is visible, severe pain, or cannot move'
    },
    poisoning: {
        title: 'Poisoning',
        steps: [
            'Call poison control center',
            'Have product container ready',
            'Do not induce vomiting unless instructed',
            'If vomit, turn person on side',
            'Save vomit sample if possible'
        ],
        whenToCall: 'Call emergency if person is unconscious, having seizures, or difficulty breathing'
    }
};

app.get('/api/first-aid/:type', (req, res) => {
    try {
        const type = req.params.type.toLowerCase();
        const guide = firstAid[type];
        
        if (!guide) {
            return res.status(404).json({ error: 'First aid guide not found' });
        }
        
        res.json(guide);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch first aid guide' });
    }
});

app.get('/api/first-aid', (req, res) => {
    res.json(Object.keys(firstAid));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Healthcare API server running on http://localhost:${PORT}`);
    console.log(`📊 Available endpoints:`);
    console.log(`   POST /api/bmi - BMI Calculator`);
    console.log(`   GET  /api/drug/:name - Drug Information`);
    console.log(`   GET  /api/drugs/search - Search Drugs`);
    console.log(`   POST /api/symptom-checker - Symptom Checker`);
    console.log(`   GET  /api/health-news - Health News`);
    console.log(`   GET  /api/hospitals/search - Hospital Locator`);
    console.log(`   GET  /api/health-tips - Health Tips`);
    console.log(`   GET  /api/first-aid - First Aid Guides`);
});