import PrivacyPage from '../models/PrivacyPage.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getPrivacyPage = async (req, res) => {
  try {
    let page = await PrivacyPage.findOne();
    if (!page) {
      // Create default page with full data
      page = new PrivacyPage({
        hero: {
          showSection: true,
          badgeText: 'Legal Document',
          title: 'Privacy Policy',
          titleHighlight: 'Policy',
          description: 'Your trust is our top priority. Learn how we protect your data and privacy.',
          heroImage: ''
        },
        complianceBadges: {
          showBadges: true,
          badges: [
            { text: 'GDPR Compliant', icon: 'CheckCircle' },
            { text: 'CCPA Ready', icon: 'Shield' },
            { text: 'ISO 27001 Certified', icon: 'Award' }
          ]
        },
        sections: [
          {
            title: 'Introduction',
            content: 'Welcome to ConsultancyPro\'s Privacy Policy. Your privacy matters to us, and we are committed to protecting your personal information. This policy explains how we collect, use, disclose, and safeguard your data when you visit our website, use our services, or interact with us.',
            icon: 'Shield',
            order: 1
          },
          {
            title: 'Information We Collect',
            content: 'We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, company information, and service preferences. We also automatically collect certain technical information when you visit our website, including IP address, browser type, device information, pages visited, and cookies.',
            icon: 'Database',
            order: 2
          },
          {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, to respond to your inquiries, to send service updates and marketing communications, to analyze usage patterns, to detect and prevent fraud, and to comply with legal obligations.',
            icon: 'TrendingUp',
            order: 3
          },
          {
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include encryption, access controls, regular security assessments, and employee training on data protection practices.',
            icon: 'Lock',
            order: 4
          },
          {
            title: 'Your Rights',
            content: 'Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your data, the right to data portability, and the right to withdraw consent. To exercise these rights, please contact us using the information provided below.',
            icon: 'Users',
            order: 5
          },
          {
            title: 'Cookies & Tracking',
            content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences. For more information, please review our Cookie Policy.',
            icon: 'Globe',
            order: 6
          },
          {
            title: 'Third-Party Services',
            content: 'We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users. These parties are contractually obligated to keep your information confidential and use it only for the purposes for which we disclose it to them.',
            icon: 'Share2',
            order: 7
          },
          {
            title: 'Children\'s Privacy',
            content: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.',
            icon: 'Heart',
            order: 8
          },
          {
            title: 'Changes to This Policy',
            content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this policy periodically for any changes.',
            icon: 'Calendar',
            order: 9
          }
        ],
        contactSection: {
          showSection: true,
          title: 'Questions about our policy?',
          subtitle: "We're here to help.",
          buttonText: 'Contact Support',
          buttonLink: '/contact',
          email: 'imran.ledgeradvisory@gmail.com',
          phone: '+91 9599239791'
        },
        footer: {
          showLastUpdated: true,
          footerText: 'Last updated'
        }
      });
      await page.save();
    }
    res.json(page);
  } catch (error) {
    console.error('Get privacy page error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePrivacyPage = async (req, res) => {
  try {
    let page = await PrivacyPage.findOne();
    if (!page) page = new PrivacyPage();
    
    // Parse JSON body or form data
    let updateData = req.body;
    
    // If coming from form-data with JSON strings, parse them
    const jsonFields = ['hero', 'complianceBadges', 'sections', 'contactSection', 'footer'];
    
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
    
    // Handle hero image upload
    if (req.files && req.files.heroImage && req.files.heroImage[0]) {
      const result = await uploadImage(req.files.heroImage[0].path);
      page.hero.heroImage = result.secure_url;
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('Privacy update error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePrivacyPageJson = async (req, res) => {
  try {
    let page = await PrivacyPage.findOne();
    if (!page) page = new PrivacyPage();
    
    Object.assign(page, req.body);
    await page.save();
    
    res.json(page);
  } catch (error) {
    console.error('Privacy JSON update error:', error);
    res.status(500).json({ message: error.message });
  }
};