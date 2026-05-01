import AboutPage from '../models/AboutPage.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getAboutPage = async (req, res) => {
  try {
    let page = await AboutPage.findOne().lean();
    
    if (!page) {
      // Create default page with full data
      const defaultPage = new AboutPage({
        badgeText: 'About Us',
        heroTitle: 'Transforming Businesses Since 2009',
        heroSubtitle: "We're a team of passionate experts dedicated to helping businesses achieve their full potential through innovative solutions and strategic guidance.",
        heroImage: '',
        
        stats: [
          { value: '200+', label: 'Projects Delivered', icon: 'Briefcase', color: 'blue' },
          { value: '50+', label: 'Industries Served', icon: 'Building2', color: 'green' },
          { value: '98%', label: 'Client Satisfaction', icon: 'Smile', color: 'orange' },
          { value: '$500M+', label: 'Value Generated', icon: 'DollarSign', color: 'purple' }
        ],
        
        storyTitle: 'Our Journey',
        storyContent: 'Founded in 2009 with a simple mission: to help businesses navigate complex challenges and achieve sustainable growth. What started as a team of three passionate consultants has grown into a global network of industry experts.',
        storyImage1: '',
        storyImage2: '',
        storyImage3: '',
        storyHighlights: [
          { icon: 'CheckCircle', title: '500+ Projects', description: 'Successfully delivered' },
          { icon: 'CheckCircle', title: '98% Retention', description: 'Client satisfaction' },
          { icon: 'CheckCircle', title: '24/7 Support', description: 'Always available' },
          { icon: 'CheckCircle', title: 'Global Reach', description: '30+ countries' }
        ],
        
        journeyTitle: '15 Years of Excellence',
        journeySubtitle: 'Key milestones that shaped our path to becoming industry leaders',
        milestones: [
          { year: '2009', title: 'Company Founded', description: 'Started with a vision to transform business consulting', icon: 'Rocket' },
          { year: '2013', title: 'Global Expansion', description: 'Opened offices in 3 international locations', icon: 'Globe' },
          { year: '2017', title: '500th Client', description: 'Reached milestone of serving 500+ businesses', icon: 'Trophy' },
          { year: '2021', title: 'Digital Transformation', description: 'Launched AI-powered consulting solutions', icon: 'Cpu' },
          { year: '2024', title: 'Industry Leadership', description: 'Recognized as top consulting firm', icon: 'Award' }
        ],
        
        valuesTitle: 'Core Values That Drive Us',
        valuesSubtitle: 'The principles that guide everything we do',
        values: [
          { icon: 'Lightbulb', title: 'Innovation First', description: 'Continuously pushing boundaries to deliver cutting-edge solutions.' },
          { icon: 'Users', title: 'Client-Centric', description: 'Your success is our success. We prioritize client needs above all.' },
          { icon: 'Shield', title: 'Integrity & Trust', description: 'Building lasting relationships through transparency and honesty.' },
          { icon: 'Award', title: 'Excellence', description: 'Striving for perfection in every project we undertake.' },
          { icon: 'Handshake', title: 'Collaboration', description: 'Working together to achieve remarkable results.' },
          { icon: 'TrendingUp', title: 'Sustainable Growth', description: 'Creating lasting value for businesses and communities.' }
        ],
        
        achievements: [
          { metric: '15+', label: 'Years Experience', icon: 'Calendar' },
          { metric: '500+', label: 'Happy Clients', icon: 'Users' },
          { metric: '30+', label: 'Countries', icon: 'Globe' },
          { metric: '98%', label: 'Retention Rate', icon: 'Activity' },
          { metric: '24/7', label: 'Support', icon: 'Clock' },
          { metric: '50+', label: 'Experts', icon: 'Brain' }
        ],
        impactTitle: 'Our Impact in Numbers',
        impactSubtitle: 'Making a measurable difference for our clients worldwide',
        
        testimonialsTitle: 'What Our Clients Say',
        testimonialsSubtitle: 'Trusted by industry leaders across India',
        testimonials: [
          {
            author: 'Sarah Johnson',
            role: 'CEO, TechCorp',
            quote: 'Their strategic insights transformed our business operations, resulting in 40% growth within 6 months.',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            author: 'Michael Chen',
            role: 'Founder, StartupX',
            quote: 'Exceptional consulting team that delivered measurable results. Highly recommended for any business looking to scale.',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
          },
          {
            author: 'Emily Rodriguez',
            role: 'Director, Enterprise Co.',
            quote: 'Professional, knowledgeable, and truly invested in our success. A game-changing partnership.',
            rating: 5,
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
          }
        ],
        
        ctaTitle: 'Ready to Transform Your Business?',
        ctaSubtitle: "Let's work together to achieve your goals. Contact us today for a free consultation and grow faster.",
        ctaButtons: [
          { text: 'Start a Conversation', url: '/contact', variant: 'primary' },
          { text: 'Explore Services', url: '/services', variant: 'secondary' }
        ]
      });
      
      page = await defaultPage.save();
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
    
    // Parse JSON fields from form data
    const updateData = { ...req.body };
    
    // Parse JSON string fields
    const jsonFields = ['stats', 'storyHighlights', 'milestones', 'values', 'achievements', 'testimonials', 'ctaButtons'];
    jsonFields.forEach(field => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        try {
          updateData[field] = JSON.parse(updateData[field]);
        } catch (e) {
          console.error(`Failed to parse ${field}:`, e);
        }
      }
    });
    
    // Update all fields
    Object.assign(page, updateData);
    
    // Handle image uploads
    const imageFields = ['heroImage', 'storyImage1', 'storyImage2', 'storyImage3'];
    for (const field of imageFields) {
      if (req.files && req.files[field]) {
        const file = req.files[field][0];
        const result = await uploadImage(file.path);
        page[field] = result.secure_url;
      }
    }
    
    // Handle single file upload for backward compatibility
    if (req.file && !req.files) {
      const result = await uploadImage(req.file.path);
      page.heroImage = result.secure_url;
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('About update error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutPageJson = async (req, res) => {
  try {
    let page = await AboutPage.findOne();
    if (!page) page = new AboutPage();
    
    Object.assign(page, req.body);
    await page.save();
    
    res.json(page);
  } catch (error) {
    console.error('About JSON update error:', error);
    res.status(500).json({ message: error.message });
  }
};