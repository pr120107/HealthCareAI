const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Import API modules
const symptomChecker = require('./api/symptomChecker');
const medicationInfo = require('./api/medicationInfo');
const diseaseInfo = require('./api/diseaseInfo');
const healthNews = require('./api/healthNews');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ==================== API ROUTES ====================

// Symptom Checker API
app.post('/api/symptom-checker', symptomChecker);

// Medication Information API
app.get('/api/medication/:name', medicationInfo);
app.get('/api/medications/search', medicationInfo.search);

// Disease Information API
app.get('/api/disease/:name', diseaseInfo);
app.get('/api/diseases/search', diseaseInfo.search);

// Health News API
app.get('/api/health-news', healthNews);
app.get('/api/health-news/:category', healthNews.byCategory);

// BMI Calculator API (built-in)
app.post('/api/bmi', (req, res) => {
    try {
        const { weight, height, age, gender } = req.body;
        
        if (!weight || !height) {
            return res.status(400).json({ error: 'Weight and height are required' });
        }
        
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        let category, color, risk;
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#3498db';
            risk = 'Increased risk of nutritional deficiencies';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = '#2ecc71';
            risk = 'Low risk';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#f39c12';
            risk = 'Moderate risk of health issues';
        } else {
            category = 'Obese';
            color = '#e74c3c';
            risk = 'High risk of health issues';
        }
        
        const recommendations = {
            diet: getDietRecommendations(category),
            exercise: getExerciseRecommendations(category),
            healthRisk: risk
        };
        
        res.json({
            success: true,
            bmi: parseFloat(bmi),
            category,
            color,
            recommendations
        });
    } catch (error) {
        res.status(500).json({ error: 'BMI calculation failed' });
    }
});

// Health Tips API
app.get('/api/health-tips', (req, res) => {
    const tips = [
        { id: 1, tip: 'Drink at least 8 glasses of water daily', category: 'Hydration' },
        { id: 2, tip: 'Get 7-9 hours of sleep each night', category: 'Sleep' },
        { id: 3, tip: 'Exercise for 30 minutes daily', category: 'Fitness' },
        { id: 4, tip: 'Eat 5 servings of fruits and vegetables daily', category: 'Nutrition' },
        { id: 5, tip: 'Take breaks from screens every 20 minutes', category: 'Eye Health' },
        { id: 6, tip: 'Practice deep breathing for stress relief', category: 'Mental Health' },
        { id: 7, tip: 'Wash hands frequently to prevent infections', category: 'Hygiene' },
        { id: 8, tip: 'Get annual health checkups', category: 'Prevention' }
    ];
    res.json(tips);
});

// Helper functions
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

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Available endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/bmi`);
    console.log(`   GET  http://localhost:${PORT}/api/medication/paracetamol`);
    console.log(`   GET  http://localhost:${PORT}/api/disease/cancer`);
    console.log(`   POST http://localhost:${PORT}/api/symptom-checker`);
    console.log(`   GET  http://localhost:${PORT}/api/health-news`);
    console.log(`   GET  http://localhost:${PORT}/api/health-tips`);
});