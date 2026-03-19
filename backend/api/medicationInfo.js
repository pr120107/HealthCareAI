// Medication database
const medicationDatabase = {
    paracetamol: {
        name: 'Paracetamol (Acetaminophen)',
        generic: 'Acetaminophen',
        type: 'Pain reliever and fever reducer',
        classification: 'Analgesic, Antipyretic',
        uses: [
            'Headache',
            'Fever',
            'Muscle aches',
            'Backache',
            'Toothache',
            'Common cold symptoms',
            'Menstrual cramps'
        ],
        dosage: {
            adult: '500-1000 mg every 4-6 hours',
            child: 'Based on weight (consult doctor)',
            maxDaily: '4000 mg (4 grams)',
            notes: 'Do not exceed 4000 mg in 24 hours. Severe liver damage can occur.'
        },
        sideEffects: {
            common: [
                'Nausea',
                'Stomach pain',
                'Loss of appetite',
                'Headache',
                'Mild rash'
            ],
            serious: [
                'Yellowing of skin or eyes (jaundice)',
                'Dark urine',
                'Severe stomach pain',
                'Allergic reaction (rash, swelling, difficulty breathing)'
            ]
        },
        warnings: [
            'Severe liver damage can occur if you take more than 4000 mg in 24 hours',
            'Do not take with other medicines containing acetaminophen',
            'Avoid alcohol while taking this medication',
            'Consult doctor if pregnant or breastfeeding',
            'Not recommended for children under 3 months without doctor approval'
        ],
        interactions: [
            'Blood thinners (warfarin)',
            'Alcohol',
            'Other acetaminophen-containing products',
            'Carbamazepine (seizure medication)'
        ],
        brandNames: ['Tylenol', 'Panadol', 'Calpol', 'Mapap', 'Ofirmev'],
        storage: 'Store at room temperature away from moisture and heat'
    },
    ibuprofen: {
        name: 'Ibuprofen',
        generic: 'Ibuprofen',
        type: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
        classification: 'NSAID, Analgesic, Antipyretic',
        uses: [
            'Headache',
            'Fever',
            'Menstrual cramps',
            'Toothache',
            'Arthritis pain',
            'Muscle aches',
            'Inflammation reduction'
        ],
        dosage: {
            adult: '200-400 mg every 4-6 hours',
            child: 'Based on weight (5-10 mg/kg)',
            maxDaily: '1200 mg (over-the-counter)',
            notes: 'Take with food or milk to prevent stomach upset. Do not exceed 1200 mg without doctor approval.'
        },
        sideEffects: {
            common: [
                'Stomach pain',
                'Heartburn',
                'Nausea',
                'Dizziness',
                'Mild headache'
            ],
            serious: [
                'Stomach bleeding',
                'Chest pain',
                'Shortness of breath',
                'Swelling of face or throat',
                'Blood in vomit or stool'
            ]
        },
        warnings: [
            'May cause stomach bleeding, especially in elderly',
            'Increased risk of heart attack or stroke',
            'Do not take with other NSAIDs',
            'Avoid alcohol',
            'Consult doctor if pregnant (avoid in third trimester)',
            'Not recommended for children under 6 months'
        ],
        interactions: [
            'Blood thinners (warfarin, aspirin)',
            'Blood pressure medications',
            'Diuretics (water pills)',
            'Lithium',
            'Methotrexate'
        ],
        brandNames: ['Advil', 'Motrin', 'Nurofen', 'Brufen'],
        storage: 'Store at room temperature, protect from light'
    },
    amoxicillin: {
        name: 'Amoxicillin',
        generic: 'Amoxicillin',
        type: 'Antibiotic',
        classification: 'Penicillin antibiotic',
        uses: [
            'Ear infections',
            'Throat infections (strep throat)',
            'Sinusitis',
            'Pneumonia',
            'Urinary tract infections',
            'Skin infections',
            'Dental infections'
        ],
        dosage: {
            adult: '250-500 mg every 8 hours',
            child: 'Based on weight (20-40 mg/kg/day)',
            duration: '7-14 days depending on infection',
            notes: 'Take full course as prescribed, even if feeling better. Take with or without food.'
        },
        sideEffects: {
            common: [
                'Diarrhea',
                'Nausea',
                'Vomiting',
                'Mild skin rash',
                'Yeast infections'
            ],
            serious: [
                'Severe allergic reaction (anaphylaxis)',
                'Severe watery diarrhea (C. difficile)',
                'Unusual bleeding or bruising',
                'Severe skin reaction',
                'Difficulty breathing'
            ]
        },
        warnings: [
            'Complete full course of treatment',
            'Do not share with others',
            'Inform doctor if allergic to penicillin',
            'May reduce effectiveness of birth control pills (use backup method)',
            'Contact doctor if severe diarrhea occurs'
        ],
        interactions: [
            'Oral contraceptives (birth control pills)',
            'Blood thinners',
            'Methotrexate',
            'Probenecid',
            'Other antibiotics'
        ],
        brandNames: ['Amoxil', 'Moxatag', 'Trimox', 'Dispermox'],
        storage: 'Store at room temperature in tight container'
    },
    omeprazole: {
        name: 'Omeprazole',
        generic: 'Omeprazole',
        type: 'Proton Pump Inhibitor (PPI)',
        classification: 'Gastric acid reducer',
        uses: [
            'Heartburn',
            'Gastroesophageal reflux disease (GERD)',
            'Stomach ulcers',
            'Erosive esophagitis',
            'Zollinger-Ellison syndrome',
            'H. pylori infection (with antibiotics)'
        ],
        dosage: {
            adult: '20-40 mg once daily',
            child: 'Based on weight (consult doctor)',
            timing: 'Take before morning meal (at least 30-60 minutes before eating)',
            duration: 'Usually 4-8 weeks'
        },
        sideEffects: {
            common: [
                'Headache',
                'Nausea',
                'Diarrhea',
                'Constipation',
                'Gas',
                'Stomach pain'
            ],
            serious: [
                'Severe diarrhea (C. difficile)',
                'Kidney problems',
                'Low magnesium levels (muscle spasms, irregular heartbeat)',
                'Bone fractures with long-term use',
                'Vitamin B12 deficiency with prolonged use'
            ]
        },
        warnings: [
            'Do not crush or chew capsules (swallow whole)',
            'Long-term use may increase fracture risk',
            'May mask stomach cancer symptoms',
            'Consult doctor before prolonged use (>14 days)',
            'Monitor magnesium levels with long-term use'
        ],
        interactions: [
            'Clopidogrel (Plavix)',
            'Cilostazol',
            'Methotrexate',
            'Digoxin',
            'Iron supplements',
            'Vitamin B12'
        ],
        brandNames: ['Prilosec', 'Losec', 'Zegerid', 'Omez'],
        storage: 'Store at room temperature, protect from light and moisture'
    },
    metformin: {
        name: 'Metformin',
        generic: 'Metformin',
        type: 'Diabetes medication',
        classification: 'Biguanide',
        uses: [
            'Type 2 diabetes',
            'Prediabetes',
            'Polycystic ovary syndrome (PCOS)',
            'Gestational diabetes',
            'Weight management (off-label)'
        ],
        dosage: {
            adult: '500-2000 mg daily in divided doses',
            timing: 'Take with meals to reduce gastrointestinal side effects',
            titration: 'Start low (500 mg once daily) and increase gradually',
            notes: 'Extended-release forms available for once-daily dosing'
        },
        sideEffects: {
            common: [
                'Nausea',
                'Diarrhea',
                'Stomach upset',
                'Loss of appetite',
                'Metallic taste',
                'Gas'
            ],
            serious: [
                'Lactic acidosis (rare but serious - seek immediate care)',
                'Severe allergic reaction',
                'Low blood sugar (hypoglycemia)',
                'Vitamin B12 deficiency with long-term use',
                'Liver problems'
            ]
        },
        warnings: [
            'Stop before surgery or contrast dye procedures (48 hours)',
            'Monitor kidney function regularly',
            'Avoid excessive alcohol (increases risk of lactic acidosis)',
            'Check vitamin B12 levels annually',
            'Inform doctor if pregnant or breastfeeding',
            'Watch for signs of lactic acidosis: unusual tiredness, muscle pain, trouble breathing'
        ],
        interactions: [
            'Contrast dyes (for X-rays, CT scans)',
            'Cimetidine',
            'Diuretics (water pills)',
            'Steroids',
            'Other diabetes medications',
            'Alcohol'
        ],
        brandNames: ['Glucophage', 'Fortamet', 'Riomet', 'Glumetza'],
        storage: 'Store at room temperature, protect from light'
    }
};

module.exports = (req, res) => {
    try {
        const drugName = req.params.name.toLowerCase();
        const drug = medicationDatabase[drugName];
        
        if (!drug) {
            // Find similar drugs
            const suggestions = Object.keys(medicationDatabase).filter(d => 
                d.includes(drugName) || drugName.includes(d)
            );
            
            return res.json({
                found: false,
                message: `Medication '${drugName}' not found in database`,
                suggestions: suggestions,
                popularMedications: Object.keys(medicationDatabase)
            });
        }
        
        res.json({
            found: true,
            ...drug
        });
    } catch (error) {
        res.status(500).json({ error: 'Medication lookup failed' });
    }
};

// Search medications
module.exports.search = (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.json({ 
                medications: Object.keys(medicationDatabase).map(name => ({
                    id: name,
                    name: medicationDatabase[name].name
                }))
            });
        }
        
        const query = q.toLowerCase();
        const results = Object.entries(medicationDatabase)
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
        
        res.json({ 
            query: q,
            results: results,
            count: results.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
};