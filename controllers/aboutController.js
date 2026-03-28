import AboutPage from '../models/AboutPage.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getAboutPage = async (req, res) => {
  try {
    let page = await AboutPage.findOne().lean();
    if (!page) {
      // Full seed data
      page = new AboutPage({
        badgeText: 'About Us',
        heroTitle: 'Transforming Businesses Since 2009',
        heroSubtitle: "We're a team of passionate consultants dedicated to helping businesses achieve their full potential through innovative strategies and data-driven solutions.",
        heroImage: '',
        stats: [
          { value: '500+', label: 'Projects Completed', icon: 'Briefcase', color: 'blue' },
          { value: '98%', label: 'Happy Clients', icon: 'Users', color: 'green' },
          { value: '15+', label: 'Years Experience', icon: 'Clock', color: 'purple' },
          { value: '30+', label: 'Global Reach', icon: 'Globe', color: 'orange' }
        ],
        storyTitle: 'Our Story',
        storyContent: 'Founded in 2009 with a simple mission: to help businesses navigate complex challenges and achieve sustainable growth. What started as a team of three passionate consultants has grown into a global network of industry experts.',
        storyHighlights: [
          { icon: 'CheckCircle', title: '500+ Projects', description: 'Successfully delivered' },
          { icon: 'CheckCircle', title: '98% Retention', description: 'Client satisfaction' },
          { icon: 'CheckCircle', title: '24/7 Support', description: 'Always available' },
          { icon: 'CheckCircle', title: 'Global Reach', description: '30+ countries' }
        ],
        milestones: [
          { year: '2009', title: 'Company Founded', description: 'Started with 3 consultants', icon: 'Rocket' },
          { year: '2012', title: 'First 100 Clients', description: 'Reached milestone of 100 clients', icon: 'Users' },
          { year: '2015', title: 'Global Expansion', description: 'Opened offices in 5 countries', icon: 'Globe' },
          { year: '2018', title: 'Digital Transformation', description: 'Launched digital practice', icon: 'Zap' },
          { year: '2021', title: 'Industry Recognition', description: 'Awarded Top Consultancy', icon: 'Award' },
          { year: '2024', title: 'AI Innovation Hub', description: 'Launched AI solutions center', icon: 'Rocket' }
        ],
        values: [
          { icon: 'Lightbulb', title: 'Innovation First', description: 'We embrace cutting-edge solutions and creative thinking to solve complex business challenges.' },
          { icon: 'Target', title: 'Client Success', description: 'Our success is measured by the tangible results we deliver to our clients.' },
          { icon: 'Shield', title: 'Integrity Always', description: 'We operate with transparency, honesty, and ethical practices in everything we do.' },
          { icon: 'Users', title: 'Collaborative Spirit', description: 'We believe the best solutions come from working together as a team.' },
          { icon: 'TrendingUp', title: 'Continuous Growth', description: 'We constantly learn, adapt, and improve to stay ahead of industry trends.' },
          { icon: 'Award', title: 'Passion for Excellence', description: 'We go above and beyond to deliver exceptional quality in every project.' }
        ],
        teamMembers: [
          {
            name: 'Dr. Sarah Johnson',
            role: 'CEO & Founder',
            specialty: 'Business Strategy',
            bio: '20+ years of experience in corporate strategy',
            image: ''
          },
          {
            name: 'Michael Chen',
            role: 'Managing Director',
            specialty: 'Digital Transformation',
            bio: 'Former McKinsey consultant, tech expert',
            image: ''
          }
        ],
        achievements: [
          { metric: '98%', label: 'Client Retention', icon: 'Heart' },
          { metric: '$2B+', label: 'Value Created', icon: 'TrendingUp' },
          { metric: '500+', label: 'Successful Projects', icon: 'CheckCircle' },
          { metric: '50+', label: 'Expert Consultants', icon: 'Users' },
          { metric: '30+', label: 'Countries Served', icon: 'Globe' },
          { metric: '24/7', label: 'Support Available', icon: 'Clock' }
        ],
        testimonials: [
          {
            name: 'Robert Anderson',
            role: 'CEO, TechCorp',
            content: 'ConsultancyPro transformed our business operations. Their expertise and dedication are unmatched.',
            rating: 5,
            image: ''
          },
          {
            name: 'Jennifer Martinez',
            role: 'COO, Global Solutions',
            content: 'The team delivered exceptional results. Highly recommended for any business transformation needs.',
            rating: 5,
            image: ''
          }
        ],
        ctaTitle: 'Ready to Transform Your Business?',
        ctaSubtitle: "Let's work together to achieve your goals. Contact us today for a free consultation.",
        ctaButtons: [
          { text: 'Start a Conversation', url: '/contact', variant: 'primary' },
          { text: 'Explore Services', url: '/services', variant: 'secondary' }
        ]
      });
      await page.save();
    }
    res.json(page);
  } catch (error) {
    console.error('Get about page error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutPage = async (req, res) => {
  try {
    let page = await AboutPage.findOne();
    if (!page) page = new AboutPage();
    
    // Update text fields
    // Ensure dynamic section titles exist
    const dynamicFields = ['journeyTitle', 'journeySubtitle', 'valuesTitle', 'valuesSubtitle', 'teamTitle', 'teamSubtitle'];
    dynamicFields.forEach(field => {
      if (!page[field]) page[field] = '';
    });
    
    Object.assign(page, req.body);
    
    // Handle multiple image uploads
    const imageFields = ['heroImage', 'storyImage1', 'storyImage2', 'storyImage3'];
    for (const field of imageFields) {
      if (req.files && req.files[field]) {
        const file = req.files[field][0]; // multer array
        const result = await uploadImage(file.path);
        page[field] = result.secure_url;
        console.log(`✅ ${field} uploaded:`, result.secure_url);
      } else if (req.file && field === 'heroImage') {
        // Fallback for single file (existing routes)
        const result = await uploadImage(req.file.path);
        page.heroImage = result.secure_url;
      }
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('About update error:', error);
    res.status(500).json({ message: error.message });
  }
};
