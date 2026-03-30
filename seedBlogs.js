import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';
import { slugify, generateUniqueSlug } from './utils/slugify.js';

dotenv.config();

const sampleBlogs = [
  {
    title: 'Digital Transformation Roadmap for SMEs in 2025',
    shortDescription: 'Comprehensive guide to successfully implementing digital transformation in small and medium enterprises with limited budgets.',
    content: `
<h2>Introduction</h2>
<p>Digital transformation is no longer optional. SMEs that embrace digital technologies now will dominate their markets by 2025.</p>

<h3>Why SMEs Need Digital Transformation</h3>
<ul>
  <li>80% cost reduction through automation</li>
  <li>3x faster customer response times</li>
  <li>Competitive advantage over traditional competitors</li>
</ul>

<h2>5-Step Implementation Roadmap</h2>
<p><strong>Step 1: Digital Audit</strong> - Assess current tech stack and identify gaps.</p>

<p><strong>Step 2: Cloud Migration</strong> - Move to scalable cloud infrastructure.</p>

<p><strong>Step 3: Process Automation</strong> - Implement RPA and workflow automation.</p>

<p><strong>Step 4: Customer Experience</strong> - Deploy CRM and omnichannel solutions.</p>

<p><strong>Step 5: Data Intelligence</strong> - AI analytics and predictive insights.</p>

<h2>Technology Stack Recommendations</h2>
<table>
  <tr><th>Category</th><th>Recommended Tools</th></tr>
  <tr><td>Cloud</td><td>AWS Lightsail, DigitalOcean</td></tr>
  <tr><td>Automation</td><td>Zapier, Make.com</td></tr>
  <tr><td>CRM</td><td>HubSpot Free, Pipedrive</td></tr>
</table>

<h2>Budget Breakdown</h2>
<ul>
  <li>Phase 1 (Months 1-3): $5,000</li>
  <li>Phase 2 (Months 4-6): $8,000</li>
  <li>Total Year 1: $15,000 ROI: 400%</li>
</ul>

<p><em>Ready to transform your SME? Contact us for a free digital audit.</em></p>
    `,
    category: 'digital',
    tags: ['digital-transformation', 'SME', 'automation', 'cloud', '2025'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: 'Digital Transformation Roadmap SMEs 2025 | Complete Guide',
    seoDescription: 'Step-by-step digital transformation guide for SMEs. Budget-friendly roadmap with proven ROI. Start your digital journey today.'
  },
  {
    title: '7 AI Tools Every Business Consultant Must Master in 2025',
    shortDescription: 'AI is revolutionizing consulting. Here are the 7 essential AI tools that will make you indispensable to clients.',
    content: `
<h2>AI Tool #1: ChatGPT Enterprise</h2>
<p>Advanced research assistant with 200k context window and data privacy.</p>

<h2>AI Tool #2: Claude Projects</h2>
<p>Document analysis and multi-step reasoning for complex client deliverables.</p>

<h2>AI Tool #3: Perplexity AI Pro</h2>
<p>Real-time research with 300+ sources and citation tracking.</p>

<h2>AI Tool #4: Cursor AI</h2>
<p>Code generation and automation for consultants building custom tools.</p>

<h2>AI Tool #5: Midjourney v7</h2>
<p>Professional presentations and client deliverables with stunning visuals.</p>

<h2>AI Tool #6: Notion AI</h2>
<p>Knowledge management and automated report generation.</p>

<h2>AI Tool #7: Fireflies AI</h2>
<p>Meeting transcription, insights, and automated follow-ups.</p>

<h2>Daily Workflow Template</h2>
<ol>
  <li>Research (Perplexity): 30 mins</li>
  <li>Analysis (Claude): 1hr</li>
  <li>Content (ChatGPT): 45 mins</li>
  <li>Visuals (Midjourney): 20 mins</li>
  <li>Review (Cursor): 15 mins</li>
</ol>

<p><strong>Time saved: 60% | Revenue increase: 3x</strong></p>
    `,
    category: 'technology',
    tags: ['AI', 'consulting', 'tools', '2025', 'productivity'],
    featuredImage: 'https://images.unsplash.com/photo-1701241568102-95a627aefdd1?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: '7 AI Tools Business Consultants 2025 | Must-Have Toolkit',
    seoDescription: 'Essential AI tools for business consultants. Increase productivity 3x with ChatGPT, Claude, Perplexity, and more.'
  },
  {
    title: 'Financial Strategy for Tech Startups: Scaling Without VC Funding',
    shortDescription: 'Bootstrap your tech startup to $1M ARR without venture capital. Proven financial strategies from successful founders.',
    content: `
<h2>Core Financial Principles</h2>

<h3>1. Revenue-First Mindset</h3>
<p>Target $10k MRR before hiring second employee. Customer revenue > everything.</p>

<h3>2. Unit Economics Obsession</h3>
<table>
  <tr><th>Metric</th><th>Target</th></tr>
  <tr><td>LTV:CAC</td><td>3:1 minimum</td></tr>
  <tr><td>Churn Rate</td><td><5% monthly</td></tr>
  <tr><td>Payback Period</td><td><12 months</td></tr>
</table>

<h2>3-Phase Bootstrap Roadmap</h2>

<h3>Phase 1: Solo Founder ($0-10k MRR)</h3>
<ul>
  <li>No employees, solo delivery</li>
  <li>80% gross margins minimum</li>
  <li>Services → Product transition</li>
</ul>

<h3>Phase 2: First Hires ($10k-50k MRR)</h3>
<ul>
  <li>Hire only revenue-generating roles</li>
  <li>50% reinvest in product</li>
  <li>Build sales flywheel</li>
</ul>

<h3>Phase 3: Scale ($50k+ MRR)</h3>
<ul>
  <li>Systematize delivery</li>
  <li>Raise prices 20%</li>
  <li>Selective hiring only</li>
</ul>

<h2>Real-World Case Studies</h2>
<p><strong>Clearbit:</strong> $0 → $1M ARR in 18 months, bootstrapped.</p>
<p><strong>Pieter Levels:</strong> Multiple 7-figure SaaS, all bootstrapped.</p>

<p><em>Your $1M ARR roadmap starts here.</em></p>
    `,
    category: 'business',
    tags: ['finance', 'startup', 'bootstrap', 'scaling', 'revenue'],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: 'Financial Strategy Tech Startups | Scale to $1M ARR Bootstrapped',
    seoDescription: 'Bootstrap tech startup to $1M ARR without VC. Proven financial strategies, unit economics, 3-phase roadmap.'
  },
  {
    title: 'Complete SEO Strategy for Service Businesses 2025',
    shortDescription: 'Rank #1 locally and nationally. Complete SEO playbook for consultants, agencies, and service providers.',
    content: `
<h2>SEO Fundamentals First</h2>

<h3>Technical SEO (Week 1-2)</h3>
<ul>
  <li>Google Search Console setup</li>
  <li>XML sitemap submission</li>
  <li>Core Web Vitals optimization</li>
  <li>Schema markup implementation</li>
</ul>

<h3>Local SEO Mastery (Week 3-4)</h3>
<ol>
  <li>Google Business Profile optimization</li>
  <li>50+ local citations</li>
  <li>Local schema & NAP consistency</li>
  <li>Review generation system</li>
</ol>

<h2>Content Strategy That Converts</h2>

<h3>Service Page Optimization</h3>
<p>Each service page targets 1 primary keyword + 3 secondary:</p>
<ul>
  <li>Hero H1: Primary keyword</li>
  <li>H2s: Secondary keywords</li>
  <li>FAQ schema: Voice search</li>
  <li>Case studies: Trust signals</li>
</ul>

<h3>Blog Content Calendar</h3>
<table>
  <tr><th>Type</th><th>Frequency</th><th>Purpose</th></tr>
  <tr><td>How-to Guides</td><td>2/week</td><td>Lead gen</td></tr>
  <tr><td>Case Studies</td><td>1/week</td><td>Authority</td></tr>
  <tr><td>Industry News</td><td>3/week</td><td>Traffic</td></tr>
</table>

<h2>Link Building Strategy</h2>
<p><strong>Month 1-3:</strong> 15 guest posts, 10 HARO responses</p>
<p><strong>Month 4-6:</strong> Partnerships, podcast features</p>

<p>Expected Results: 10x organic traffic in 6 months.</p>
    `,
    category: 'strategy',
    tags: ['SEO', 'local-seo', 'content-marketing', '2025', 'service-business'],
    featuredImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: 'Complete SEO Strategy Service Businesses 2025 | Rank #1 Locally',
    seoDescription: 'SEO playbook for consultants & service businesses. Local SEO, content strategy, link building. 10x traffic guaranteed.'
  },
  {
    title: 'The Future of Remote Consulting: Trends & Predictions 2025-2030',
    shortDescription: 'How AI, VR, and blockchain will transform consulting delivery. Prepare your practice for the next decade.',
    content: `
<h2>2025: AI-Augmented Consulting</h2>
<p>AI handles 60% of research & analysis. Consultants focus on strategy & relationships.</p>

<h2>2027: VR Strategy Sessions</h2>
<ul>
  <li>Virtual boardrooms with spatial computing</li>
  <li>Real-time 3D data visualization</li>
  <li>Global teams in shared virtual spaces</li>
</ul>

<h2>2030: Blockchain Trust Layer</h2>
<ol>
  <li>Smart contract consulting agreements</li>
  <li>Immutable performance tracking</li>
  <li>Tokenized consulting equity</li>
</ol>

<h2>Skills Roadmap</h2>
<table>
  <tr><th>2025</th><th>2027</th><th>2030</th></tr>
  <tr><td>AI Prompt Engineering</td><td>VR Facilitation</td><td>Smart Contracts</td></tr>
  <tr><td>Data Storytelling</td><td>Spatial UX</td><td>DAO Governance</td></tr>
</table>

<h2>Business Model Evolution</h2>
<p><strong>2025:</strong> Hybrid retainer + outcome fees</p>
<p><strong>2030:</strong> DAO membership + token revenue sharing</p>

<p>The future consultant thrives at technology-human intersection.</p>
    `,
    category: 'insights',
    tags: ['future', 'remote-work', 'AI', 'VR', 'blockchain', '2030'],
    featuredImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: 'Future Remote Consulting Trends 2025-2030 | AI VR Blockchain',
    seoDescription: 'Remote consulting evolution roadmap. AI, VR, blockchain predictions. Skills & business models for next decade.'
  },
  {
    title: 'How to Price Your Consulting Services Like a Pro (Calculator Included)',
    shortDescription: 'Stop leaving money on the table. Complete pricing framework + free calculator for consultants at any level.',
    content: `
<h2>Pricing Framework: The 5 Levels</h2>

<h3>Level 1: Hourly ($50-150/hr)</h3>
<p>Junior consultants. Easy to calculate but caps earnings.</p>

<h3>Level 2: Project-Based ($5k-25k)</h3>
<p>Specific deliverables. Risk: scope creep.</p>

<h3>Level 3: Value-Based ($25k-100k)</h3>
<p>Priced on client ROI. Requires confidence & proof.</p>

<h3>Level 4: Retainer ($10k+/month)</h3>
<p>Ongoing advisory. Predictable revenue.</p>

<h3>Level 5: Equity + Outcome ($100k+)</h3>
<p>High-risk/high-reward. Partner-level engagements.</p>

<h2>Pricing Calculator Formula</h2>
<pre><code>Price = (Client ROI × 0.25) × Risk Factor × Scope Multiplier</code></pre>

<h2>Real Examples</h2>
<table>
  <tr><th>Service</th><th>ROI Created</th><th>Your Price</th></tr>
  <tr><td>Sales Training</td><td>$500k</td><td>$75k (15%)</td></tr>
  <tr><td>Digital Audit</td><td>$2M</td><td>$250k (12.5%)</td></tr>
</table>

<h2>Objection Handling</h2>
<p>"Too expensive?" → "Your alternatives cost more in lost revenue."</p>

<p>Download pricing calculator sheet in description.</p>
    `,
    category: 'business',
    tags: ['pricing', 'consulting', 'revenue', 'calculator', 'value-based'],
    featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=630&fit=crop',
    status: 'published',
    seoTitle: 'Consulting Pricing Calculator | Price Services Like a Pro',
    seoDescription: 'Complete pricing framework for consultants. Hourly to equity pricing. Free calculator + real examples.'
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for blog seeding');

    // Clear existing blogs (development only)
    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing blogs');

    let createdCount = 0;
    for (const blogData of sampleBlogs) {
      const slug = await generateUniqueSlug(Blog, blogData.title);
      
      // Calculate read time
      const words = blogData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readTime = Math.ceil(words / 250);

      const blog = await Blog.create({
        ...blogData,
        slug,
        readTime,
        views: Math.floor(Math.random() * 5000) + 100,
        status: 'published'
      });

      console.log(`✅ Created: ${blog.title} (${blog.slug})`);
      createdCount++;
    }

    console.log(`\n🎉 SUCCESS! Seeded ${createdCount} published blogs`);
    console.log('🌐 Test URLs:');
    console.log('   Public: http://localhost:5173/blogs');
    console.log('   Admin: http://localhost:5173/admin/blogs');
    console.log('   API: https://yourdomain.com/api/blogs');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedBlogs();

