// Disease information database
const diseaseDatabase = {
    'lung cancer': {
        name: 'Lung Cancer',
        description: 'Lung cancer is a type of cancer that begins in the lungs and is the leading cause of cancer deaths worldwide.',
        overview: 'Lung cancer occurs when cells in the lung grow uncontrollably, forming tumors. There are two main types: non-small cell lung cancer (most common) and small cell lung cancer.',
        symptoms: [
            'Persistent cough that worsens over time',
            'Coughing up blood (even small amounts)',
            'Shortness of breath',
            'Chest pain that worsens with deep breathing',
            'Hoarseness',
            'Unexplained weight loss',
            'Bone pain',
            'Headaches'
        ],
        riskFactors: [
            'Smoking (responsible for 80-90% of cases)',
            'Secondhand smoke exposure',
            'Radon gas exposure',
            'Asbestos exposure',
            'Family history of lung cancer',
            'Air pollution',
            'Previous radiation therapy to chest'
        ],
        prevention: [
            'Don\'t smoke or quit smoking',
            'Avoid secondhand smoke',
            'Test your home for radon',
            'Avoid carcinogens at work',
            'Eat a healthy diet rich in fruits and vegetables',
            'Exercise regularly',
            'Consider annual screening if high risk (ages 50-80 with smoking history)'
        ],
        screening: [
            'Low-dose CT scan recommended for high-risk individuals',
            'Chest X-ray',
            'Sputum cytology',
            'Biopsy for definitive diagnosis'
        ],
        treatment: [
            'Surgery (removal of tumor)',
            'Radiation therapy',
            'Chemotherapy',
            'Targeted therapy',
            'Immunotherapy',
            'Clinical trials'
        ],
        prognosis: 'Early detection significantly improves survival rates. The 5-year survival rate for localized lung cancer is 63%, but drops to 7% for metastatic disease.',
        statistics: {
            newCasesYearly: 'Approximately 2.2 million worldwide',
            deathsYearly: 'Approximately 1.8 million worldwide',
            fiveYearSurvival: '63% (localized), 35% (regional), 7% (distant)'
        }
    },
    'brain cancer': {
        name: 'Brain Cancer',
        description: 'Brain cancer occurs when abnormal cells form in the brain tissue. Tumors can be benign (non-cancerous) or malignant (cancerous).',
        overview: 'Primary brain tumors start in the brain, while metastatic brain tumors spread from other parts of the body. There are over 120 types of brain tumors.',
        symptoms: [
            'Frequent headaches that worsen over time',
            'Seizures',
            'Persistent nausea and vomiting',
            'Vision problems (blurred vision, double vision)',
            'Balance difficulties',
            'Speech difficulties',
            'Personality or behavior changes',
            'Memory problems',
            'Numbness or weakness in part of the body'
        ],
        riskFactors: [
            'Family history of brain tumors',
            'Radiation exposure',
            'Age (risk increases with age)',
            'Certain genetic syndromes',
            'Weakened immune system'
        ],
        types: [
            'Gliomas (most common, including glioblastoma)',
            'Meningiomas (usually benign)',
            'Pituitary tumors',
            'Medulloblastomas (common in children)',
            'Schwannomas',
            'Craniopharyngiomas'
        ],
        diagnosis: [
            'Neurological exam',
            'Imaging tests (MRI, CT scans)',
            'Biopsy',
            'Spinal tap',
            'Molecular testing'
        ],
        treatment: [
            'Surgery (craniotomy)',
            'Radiation therapy',
            'Chemotherapy',
            'Targeted therapy',
            'Tumor treating fields',
            'Clinical trials'
        ],
        statistics: {
            newCasesYearly: 'Approximately 300,000 worldwide',
            survivalRate: 'Depends on type and grade - ranges from months to many years',
            commonAge: 'Most common in adults 40-70 years, but can occur at any age'
        }
    },
    'breast cancer': {
        name: 'Breast Cancer',
        description: 'Breast cancer is cancer that forms in the cells of the breasts. It\'s the most common cancer diagnosed in women worldwide.',
        overview: 'Breast cancer can occur in both men and women, but is far more common in women. Early detection through screening significantly improves survival rates.',
        symptoms: [
            'New lump in the breast or underarm',
            'Thickening or swelling of part of the breast',
            'Skin irritation or dimpling',
            'Redness or flaky skin in the nipple area',
            'Nipple discharge (including blood)',
            'Change in breast size or shape',
            'Pain in any area of the breast',
            'Swollen lymph nodes under the arm'
        ],
        riskFactors: [
            'Being female',
            'Increasing age',
            'Family history of breast cancer',
            'BRCA1 and BRCA2 gene mutations',
            'Early menstruation (before 12) or late menopause (after 55)',
            'Dense breast tissue',
            'Previous breast cancer',
            'Alcohol consumption',
            'Obesity after menopause'
        ],
        types: [
            'Ductal carcinoma in situ (DCIS)',
            'Invasive ductal carcinoma',
            'Invasive lobular carcinoma',
            'Triple-negative breast cancer',
            'Inflammatory breast cancer',
            'HER2-positive breast cancer'
        ],
        screening: [
            'Monthly self-exams starting at age 20',
            'Clinical breast exams every 1-3 years',
            'Mammograms starting at age 40-45',
            'MRI for high-risk individuals',
            'Genetic testing for BRCA mutations'
        ],
        treatment: [
            'Surgery (lumpectomy or mastectomy)',
            'Radiation therapy',
            'Chemotherapy',
            'Hormone therapy',
            'Targeted therapy',
            'Immunotherapy'
        ],
        statistics: {
            newCasesYearly: 'Approximately 2.3 million worldwide',
            deathsYearly: 'Approximately 685,000 worldwide',
            fiveYearSurvival: '99% (localized), 86% (regional), 29% (distant)',
            lifetimeRisk: '1 in 8 women will develop breast cancer'
        }
    },
    'colon cancer': {
        name: 'Colorectal Cancer',
        description: 'Colorectal cancer typically affects the large intestine (colon) or the rectum. It usually begins as small, noncancerous polyps.',
        overview: 'Colorectal cancer is highly preventable and treatable when caught early through screening. It\'s the second leading cause of cancer death in the US.',
        symptoms: [
            'Changes in bowel habits (diarrhea, constipation)',
            'Blood in stool or rectal bleeding',
            'Persistent abdominal discomfort',
            'Feeling that bowel doesn\'t empty completely',
            'Weakness or fatigue',
            'Unexplained weight loss',
            'Iron deficiency anemia'
        ],
        riskFactors: [
            'Age over 45',
            'Inflammatory bowel disease',
            'Family history of colorectal cancer',
            'Low-fiber, high-fat diet',
            'Sedentary lifestyle',
            'Obesity',
            'Diabetes',
            'Smoking and alcohol use'
        ],
        prevention: [
            'Start screening at age 45',
            'Eat high-fiber diet (fruits, vegetables, whole grains)',
            'Limit red and processed meats',
            'Maintain healthy weight',
            'Exercise regularly',
            'Limit alcohol and avoid smoking',
            'Consider aspirin therapy if recommended by doctor'
        ],
        screeningMethods: [
            'Colonoscopy (every 10 years)',
            'FIT test (annually)',
            'CT colonography (every 5 years)',
            'Flexible sigmoidoscopy (every 5 years)',
            'Cologuard (every 3 years)'
        ],
        treatment: [
            'Polypectomy during colonoscopy',
            'Surgery',
            'Chemotherapy',
            'Radiation therapy',
            'Targeted therapy',
            'Immunotherapy'
        ],
        statistics: {
            newCasesYearly: 'Approximately 1.9 million worldwide',
            deathsYearly: 'Approximately 935,000 worldwide',
            fiveYearSurvival: '90% (localized), 72% (regional), 14% (distant)',
            screeningRecommendation: 'Begin screening at age 45 for average risk individuals'
        }
    }
};

module.exports = (req, res) => {
    try {
        const diseaseName = req.params.name.toLowerCase();
        
        // Find exact match or similar
        let disease = diseaseDatabase[diseaseName];
        
        if (!disease) {
            // Try to find similar disease names
            const similarDiseases = Object.keys(diseaseDatabase).filter(d => 
                d.includes(diseaseName) || diseaseName.includes(d)
            );
            
            return res.json({
                found: false,
                message: `Disease '${diseaseName}' not found in database`,
                suggestions: similarDiseases,
                availableDiseases: Object.keys(diseaseDatabase)
            });
        }
        
        res.json({
            found: true,
            ...disease
        });
    } catch (error) {
        res.status(500).json({ error: 'Disease information lookup failed' });
    }
};

// Search diseases
module.exports.search = (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.json({ 
                diseases: Object.keys(diseaseDatabase).map(name => ({
                    id: name,
                    name: diseaseDatabase[name].name
                }))
            });
        }
        
        const query = q.toLowerCase();
        const results = Object.entries(diseaseDatabase)
            .filter(([key, disease]) => 
                key.includes(query) || 
                disease.name.toLowerCase().includes(query)
            )
            .map(([key, disease]) => ({
                id: key,
                name: disease.name,
                description: disease.description.substring(0, 100) + '...'
            }));
        
        res.json({ 
            query: q,
            results: results,
            count: results.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
};