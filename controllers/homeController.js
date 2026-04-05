import HomePage from '../models/HomePage.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getHomePage = async (req, res) => {
  try {
    let page = await HomePage.findOne().lean();
    if (!page) {
      // Full seed data matching Home.jsx
      page = new HomePage({
        badgeText: 'Trusted by 500+ businesses worldwide',
        heroTitle: 'Transform Your Business',
        heroImage: '',
        heroTexts: [
          'Strategic Business Consulting',
          'Digital Transformation Experts',
          'Growth Strategy Partners'
        ],
        stats: [
          { value: '500+', icon: 'Users', label: 'Projects Completed', description: 'Successful deliveries worldwide' },
          { value: '98%', icon: 'TrendingUp', label: 'Client Satisfaction', description: 'Average satisfaction rating' },
          { value: '15+', icon: 'Briefcase', label: 'Years Experience', description: 'Industry expertise' }
        ],
        testimonials: [
          {
            quote: 'Their strategic insights transformed our business operations, resulting in 40% growth within 6 months.',
            author: 'Sarah Johnson',
            role: 'CEO, TechCorp',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 5
          },
          {
            quote: 'Exceptional consulting team that delivered measurable results. Highly recommended for any business looking to scale.',
            author: 'Michael Chen',
            role: 'Founder, StartupX',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5
          },
          {
            quote: 'Professional, knowledgeable, and truly invested in our success. A game-changing partnership.',
            author: 'Emily Rodriguez',
            role: 'Director, Enterprise Co.',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 5
          }
        ],
        faqs: [
          {
            question: 'What services does your consultancy offer?',
            answer: 'We provide comprehensive business consulting including strategic planning, digital transformation, market analysis, operational optimization, and growth strategies tailored to your business needs.'
          },
          {
            question: 'How long does a typical consulting engagement last?',
            answer: 'Our engagements range from 3-6 months for focused projects to 12+ months for comprehensive transformation programs, depending on your specific objectives and scope.'
          },
          {
            question: 'What industries do you serve?',
            answer: 'We work across technology, healthcare, finance, manufacturing, retail, and professional services, bringing specialized expertise to each industry vertical.'
          },
          {
            question: 'How do you ensure confidentiality?',
            answer: 'All client engagements are protected by strict NDAs and our information security protocols. We follow industry best practices and compliance standards to safeguard your proprietary information.'
          },
          {
            question: 'What is your approach to measuring success?',
            answer: 'Success is measured against clearly defined KPIs established at project outset. We provide regular progress reports, ROI analysis, and post-engagement reviews to quantify impact.'
          },
          {
            question: 'Can you work with startups and enterprises?',
            answer: 'Yes, we scale our approach to serve startups needing rapid growth strategies as well as enterprises requiring complex transformation programs.'
          }
        ]
      });
      await page.save();
    }
    res.json(page);
  } catch (error) {
    console.error('Get home page error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateHomePage = async (req, res) => {
  try {
    let page = await HomePage.findOne();
    if (!page) page = new HomePage();
    
    // Update all text fields
    Object.assign(page, req.body);
    
    // Handle hero image upload
    const imageFields = ['heroImage'];
    for (const field of imageFields) {
      if (req.files && req.files[field]) {
        const file = req.files[field][0];
        const result = await uploadImage(file.path);
        page[field] = result.secure_url;
        console.log(`✅ ${field} uploaded:`, result.secure_url);
      }
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('Home update error:', error);
    res.status(500).json({ message: error.message });
  }
};

