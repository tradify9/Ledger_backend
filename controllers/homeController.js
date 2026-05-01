import HomePage from '../models/HomePage.js';
import { uploadImage } from '../utils/cloudinary.js';

// Helper to get default hero section
const getDefaultHeroSection = () => ({
  showSection: true,
  badgeText: 'Trusted by 500+ businesses worldwide',
  title: 'Transform Your Business',
  titleHighlight: 'with Smart Digital',
  titleEnd: 'Solutions',
  description: 'Consultancy services for ambitious businesses. We craft intelligent digital strategies that drive measurable growth and sustainable success.',
  primaryButtonText: 'Get Free Consultation',
  primaryButtonLink: '#enquiry-form',
  secondaryButtonText: 'Explore Services',
  secondaryButtonLink: '#services',
  heroImage: '',
  heroTexts: ['Strategic Business Consulting', 'Digital Transformation Experts', 'Growth Strategy Partners']
});

export const getHomePage = async (req, res) => {
  try {
    let page = await HomePage.findOne().lean();
    if (!page) {
      // Create full seed data
      const defaultPage = new HomePage({
        hero: getDefaultHeroSection(),
        statsSection: {
          showSection: true,
          title: 'Our Impact',
          subtitle: 'Making a measurable difference for our clients worldwide'
        },
        stats: [
          { value: '500+', icon: 'Users', label: 'Projects Completed', description: 'Successful deliveries worldwide' },
          { value: '98%', icon: 'TrendingUp', label: 'Client Satisfaction', description: 'Average satisfaction rating' },
          { value: '15+', icon: 'Briefcase', label: 'Years Experience', description: 'Industry expertise' }
        ],
        servicesSection: {
          showSection: true,
          title: 'Our Services',
          subtitle: 'Premium services powered by cutting-edge technology and deep industry expertise',
          maxServicesToShow: 6
        },
        blogSection: {
          showSection: true,
          title: 'Latest Insights',
          subtitle: 'Fresh business insights and industry trends from our expert consultants',
          maxBlogsToShow: 3
        },
        testimonialsSection: {
          showSection: true,
          title: 'What Our Clients Say',
          subtitle: 'Trusted by industry leaders and innovative startups worldwide'
        },
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
        faqSection: {
          showSection: true,
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about our consulting services'
        },
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
          }
        ],
        enquiryFormSection: {
          showSection: true,
          title: 'Ready to Transform Your Business?',
          subtitle: 'Fill out the form below and our expert consultants will contact you within 24 hours with a personalized strategy.',
          buttonText: 'Send Enquiry Now',
          successMessage: 'Your enquiry has been sent successfully. Our team will contact you within 24 hours.'
        }
      });
      page = await defaultPage.save();
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
    
    // Parse JSON body or form data
    let updateData = req.body;
    
    // If coming from form-data with JSON strings, parse them
    const jsonFields = ['hero', 'statsSection', 'servicesSection', 'blogSection', 'testimonialsSection', 'faqSection', 'enquiryFormSection', 'stats', 'testimonials', 'faqs', 'ctaButtons'];
    
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
    
    // Ensure hero section exists
    if (!page.hero) page.hero = getDefaultHeroSection();
    
    // Handle hero image upload
    if (req.files && req.files.heroImage && req.files.heroImage[0]) {
      const result = await uploadImage(req.files.heroImage[0].path);
      page.hero.heroImage = result.secure_url;
    }
    
    // Handle testimonial avatar uploads (testimonialAvatar_0, testimonialAvatar_1, etc.)
    if (req.files) {
      Object.keys(req.files).forEach(field => {
        if (field.startsWith('testimonialAvatar_')) {
          const index = parseInt(field.split('_')[1]);
          if (!isNaN(index) && page.testimonials && page.testimonials[index]) {
            const result = await uploadImage(req.files[field][0].path);
            page.testimonials[index].avatar = result.secure_url;
          }
        }
      });
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('Home update error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateHomePageJson = async (req, res) => {
  try {
    let page = await HomePage.findOne();
    if (!page) page = new HomePage();
    
    Object.assign(page, req.body);
    await page.save();
    
    res.json(page);
  } catch (error) {
    console.error('Home JSON update error:', error);
    res.status(500).json({ message: error.message });
  }
};