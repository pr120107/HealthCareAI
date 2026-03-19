// Health news database
const newsDatabase = [
    {
        id: 1,
        title: 'WHO recommends new COVID-19 vaccination strategy for 2025',
        summary: 'Updated guidelines focus on high-risk populations and annual boosters for vulnerable groups.',
        content: 'The World Health Organization has released updated recommendations for COVID-19 vaccination in 2025, focusing on high-risk populations including elderly, immunocompromised individuals, and healthcare workers. Annual boosters are recommended for these groups, while healthy adults may receive boosters every two years.',
        source: 'World Health Organization',
        date: '2025-03-15',
        category: 'COVID-19',
        image: 'https://via.placeholder.com/400x200/0047ab/ffffff?text=WHO+COVID-19+Guidelines',
        url: 'https://www.who.int/news'
    },
    {
        id: 2,
        title: 'Breakthrough in early cancer detection using AI',
        summary: 'New blood test can detect 10 types of cancer years before symptoms appear with 95% accuracy.',
        content: 'Researchers have developed an AI-powered blood test that can detect 10 different types of cancer years before symptoms appear. The test analyzes DNA methylation patterns in circulating tumor DNA and has shown 95% accuracy in clinical trials. This breakthrough could revolutionize cancer screening and early intervention.',
        source: 'NIH Research',
        date: '2025-03-14',
        category: 'Cancer Research',
        image: 'https://via.placeholder.com/400x200/2ecc71/ffffff?text=AI+Cancer+Detection',
        url: 'https://www.nih.gov/news'
    },
    {
        id: 3,
        title: 'Mediterranean diet linked to longer life expectancy',
        summary: '20-year study confirms heart and brain health benefits of Mediterranean diet.',
        content: 'A 20-year study involving over 50,000 participants has confirmed that the Mediterranean diet significantly reduces the risk of heart disease, stroke, and cognitive decline. Participants who followed the diet closely lived an average of 5-7 years longer than those who didn\'t.',
        source: 'Harvard Health',
        date: '2025-03-13',
        category: 'Nutrition',
        image: 'https://via.placeholder.com/400x200/e74c3c/ffffff?text=Mediterranean+Diet',
        url: 'https://www.health.harvard.edu'
    },
    {
        id: 4,
        title: 'FDA approves new diabetes drug with fewer side effects',
        summary: 'Once-weekly injection shows promising results in clinical trials with minimal gastrointestinal issues.',
        content: 'The FDA has approved a new once-weekly injectable medication for type 2 diabetes that shows improved efficacy with fewer gastrointestinal side effects compared to existing treatments. Clinical trials showed significant reduction in HbA1c and weight loss in participants.',
        source: 'FDA',
        date: '2025-03-12',
        category: 'Diabetes',
        image: 'https://via.placeholder.com/400x200/3498db/ffffff?text=New+Diabetes+Drug',
        url: 'https://www.fda.gov/news'
    },
    {
        id: 5,
        title: 'Mental health apps show effectiveness in treating anxiety',
        summary: 'Study finds digital interventions comparable to in-person therapy for mild to moderate anxiety.',
        content: 'A comprehensive meta-analysis of 45 studies found that mental health apps are as effective as in-person therapy for treating mild to moderate anxiety. The study suggests that digital interventions could help bridge the gap in mental health care access.',
        source: 'Psychiatry Online',
        date: '2025-03-11',
        category: 'Mental Health',
        image: 'https://via.placeholder.com/400x200/9b59b6/ffffff?text=Mental+Health+Apps',
        url: 'https://psychiatryonline.org'
    },
    {
        id: 6,
        title: 'New study reveals sleep duration affects heart health',
        summary: 'Getting 7-8 hours of sleep optimal for cardiovascular health, researchers find.',
        content: 'A study of over 100,000 participants found that sleeping 7-8 hours per night is optimal for heart health. Both insufficient (<6 hours) and excessive (>9 hours) sleep were associated with increased risk of heart disease and stroke.',
        source: 'American Heart Association',
        date: '2025-03-10',
        category: 'Heart Health',
        image: 'https://via.placeholder.com/400x200/e67e22/ffffff?text=Sleep+Heart+Health',
        url: 'https://www.heart.org/news'
    }
];

module.exports = (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const limitedNews = newsDatabase.slice(0, parseInt(limit));
        
        res.json({
            count: limitedNews.length,
            total: newsDatabase.length,
            articles: limitedNews
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch health news' });
    }
};

// Get news by category
module.exports.byCategory = (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const { limit = 10 } = req.query;
        
        const filteredNews = newsDatabase.filter(
            news => news.category.toLowerCase().includes(category)
        ).slice(0, parseInt(limit));
        
        res.json({
            category: category,
            count: filteredNews.length,
            articles: filteredNews
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news by category' });
    }
};