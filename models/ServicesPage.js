import mongoose from 'mongoose';

// ─────────────────────────────────────────────────────────────────
// Service Hero Schema (for Services page hero section)
// ─────────────────────────────────────────────────────────────────
const servicesHeroSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true
  },
  badgeText: {
    type: String,
    default: 'Trusted by 500+ businesses'
  },
  title: {
    type: String,
    default: 'Our Services'
  },
  subtitle: {
    type: String,
    default: 'Transform Your Business'
  },
  description: {
    type: String,
    default: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.'
  },
  buttonText: {
    type: String,
    default: 'Explore Services'
  },
  buttonLink: {
    type: String,
    default: '/services'
  },
  secondaryButtonText: {
    type: String,
    default: 'Free Consultation'
  },
  secondaryButtonLink: {
    type: String,
    default: '/contact'
  },
  rotatingTexts: {
    type: [String],
    default: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting']
  }
}, { _id: false });

// ─────────────────────────────────────────────────────────────────
// Service Card Settings Schema (for service cards display)
// ─────────────────────────────────────────────────────────────────
const serviceCardSettingsSchema = new mongoose.Schema({
  showCategory: {
    type: Boolean,
    default: true
  },
  showCompanyName: {
    type: Boolean,
    default: true
  },
  showRating: {
    type: Boolean,
    default: true
  },
  showPrice: {
    type: Boolean,
    default: true
  },
  showDiscount: {
    type: Boolean,
    default: true
  },
  showDescription: {
    type: Boolean,
    default: false
  },
  cardStyle: {
    type: String,
    default: 'rounded'
  },
  cardShadow: {
    type: String,
    default: 'soft'
  },
  imageHeight: {
    type: String,
    default: 'medium'
  }
}, { _id: false });

// ─────────────────────────────────────────────────────────────────
// Service Detail Hero Schema (for each service detail page hero)
// ─────────────────────────────────────────────────────────────────
const serviceDetailHeroSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Expert {serviceTitle} Solutions'
  },
  subtitle: {
    type: String,
    default: 'Transform Your Business'
  },
  description: {
    type: String,
    default: 'Expert {serviceTitle} solutions built for measurable results. Trusted by 500+ businesses.'
  },
  badgeText: {
    type: String,
    default: 'Premium Service'
  },
  buttonText: {
    type: String,
    default: 'Start Project'
  },
  buttonLink: {
    type: String,
    default: '/contact'
  },
  secondaryButtonText: {
    type: String,
    default: 'Free Consultation'
  },
  secondaryButtonLink: {
    type: String,
    default: '/contact'
  },
  showStatsBar: {
    type: Boolean,
    default: true
  },
  showEnquiryForm: {
    type: Boolean,
    default: true
  },
  statsData: [{
    icon: {
      type: String,
      default: 'Users'
    },
    label: {
      type: String,
      default: 'Happy Clients'
    },
    value: {
      type: String,
      default: '500+'
    },
    color: {
      type: String,
      default: '#059669'
    }
  }]
}, { _id: false });

// ─────────────────────────────────────────────────────────────────
// Service Detail Page Settings Schema
// ─────────────────────────────────────────────────────────────────
const serviceDetailSettingsSchema = new mongoose.Schema({
  showStatsBar: {
    type: Boolean,
    default: true
  },
  showProcessTimeline: {
    type: Boolean,
    default: true
  },
  showFeaturesGrid: {
    type: Boolean,
    default: true
  },
  showBenefitsSection: {
    type: Boolean,
    default: true
  },
  showFAQSection: {
    type: Boolean,
    default: true
  },
  showTeamSection: {
    type: Boolean,
    default: true
  },
  showRelatedServices: {
    type: Boolean,
    default: true
  },
  showCTABanner: {
    type: Boolean,
    default: true
  },
  sidebarPosition: {
    type: String,
    default: 'right'
  },
  formStyle: {
    type: String,
    default: 'modern'
  }
}, { _id: false });

// ─────────────────────────────────────────────────────────────────
// Main ServicesPage Schema
// ─────────────────────────────────────────────────────────────────
const servicesPageSchema = new mongoose.Schema({
  hero: {
    type: servicesHeroSchema,
    default: () => ({})
  },
  cardSettings: {
    type: serviceCardSettingsSchema,
    default: () => ({})
  },
  detailHero: {
    type: serviceDetailHeroSchema,
    default: () => ({})
  },
  detailSettings: {
    type: serviceDetailSettingsSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});

export default mongoose.model('ServicesPage', servicesPageSchema);
