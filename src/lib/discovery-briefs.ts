export type DiscoveryIcon =
  | 'calendar'
  | 'clock'
  | 'credit-card'
  | 'file-text'
  | 'globe'
  | 'heart-handshake'
  | 'megaphone'
  | 'package'
  | 'printer'
  | 'route'
  | 'shield'
  | 'shopping-cart'
  | 'truck'
  | 'users'

export type DiscoveryQuestion = {
  id: string
  label: string
  placeholder: string
  multiline?: boolean
}

export type DiscoveryQuestionGroup = {
  id: string
  title: string
  summary: string
  icon: DiscoveryIcon
  questions: DiscoveryQuestion[]
}

export type DiscoveryPhaseCard = {
  title: string
  description: string
}

export type DiscoveryBrief = {
  slug: string
  title: string
  metadataTitle: string
  metadataDescription: string
  intro: string
  brandLabel: string
  brandSubtext: string
  benchmarkTitle: string
  benchmarkDescription: string
  benchmarkIcon: DiscoveryIcon
  benchmarkItems: string[]
  phaseCards: DiscoveryPhaseCard[]
  questionGroups: DiscoveryQuestionGroup[]
  handoffTitle: string
  handoffDescription: string
  preparedFor: string
  downloadFileName: string
}

const printServicesBrief: DiscoveryBrief = {
  slug: 'print-services',
  title: 'Print & Branding Website Discovery Brief',
  metadataTitle: 'Print & Branding Website Discovery Brief',
  metadataDescription:
    'A Highbee discovery brief for planning a local print and branding website with product ordering and social media support.',
  intro:
    'These questions help us understand the brand, products, ordering flow, delivery process, payment needs, and social media direction before we plan the website properly.',
  brandLabel: 'Highbee',
  brandSubtext: 'Website and social media discovery',
  benchmarkTitle: 'What "Printivo-like" means here',
  benchmarkDescription:
    'We are not copying another brand. We are using the benchmark to understand the level of clarity customers expect from a serious print business online.',
  benchmarkIcon: 'printer',
  benchmarkItems: [
    'Product categories with clear starting points',
    'Product details for materials, sizes, finishing, and quantity',
    'Quote/order paths that match how the team already works',
    'Delivery, payment, support, and refund expectations',
    'Social proof, gallery work, testimonials, and launch content',
  ],
  phaseCards: [
    {
      title: 'Launch Foundation',
      description:
        'Brand story, product catalogue, enquiry/order paths, contact channels, and clear delivery expectations.',
    },
    {
      title: 'Online Ordering',
      description:
        'File uploads, quote requests, product options, payment readiness, order status, and customer support flow.',
    },
    {
      title: 'Growth Support',
      description:
        'Social media structure, content calendar, launch campaign, testimonials, analytics, and future marketplace ideas.',
    },
  ],
  questionGroups: [
    {
      id: 'brand',
      title: 'Brand Basics',
      summary: 'Help us understand who the business is before we shape the website.',
      icon: 'shield',
      questions: [
        {
          id: 'business-name-location',
          label: 'What is the business name, location, and current service area?',
          placeholder: 'Example: Brand name, city, office/shop address, areas served',
        },
        {
          id: 'brand-story',
          label: 'How would you describe the business in a few sentences?',
          placeholder: 'What you do, who you serve, and why customers choose you',
          multiline: true,
        },
        {
          id: 'brand-assets',
          label: 'Do you already have a logo, colors, brand guide, photos, or sample designs?',
          placeholder: 'Mention what exists and what still needs to be created',
          multiline: true,
        },
        {
          id: 'brand-tone',
          label: 'What tone should the brand have online?',
          placeholder: 'Professional, friendly, premium, affordable, bold, corporate, etc.',
        },
      ],
    },
    {
      id: 'products',
      title: 'Products & Services',
      summary: 'Define what customers should be able to browse, request, and order.',
      icon: 'package',
      questions: [
        {
          id: 'service-list',
          label: 'What print, branding, and design services do you offer?',
          placeholder: 'Business cards, flyers, banners, mugs, shirts, stickers, packaging, etc.',
          multiline: true,
        },
        {
          id: 'best-sellers',
          label: 'Which products sell fastest or should appear first on the website?',
          placeholder: 'List 5-10 priority products if possible',
          multiline: true,
        },
        {
          id: 'product-options',
          label: 'What options matter for each product?',
          placeholder: 'Sizes, materials, finishing, colors, print sides, lamination, quantity ranges',
          multiline: true,
        },
        {
          id: 'minimums-design',
          label: 'Do you have minimum order quantities or paid design assistance?',
          placeholder: 'Example: minimum 100 pieces, design fee, free template, custom quote',
        },
      ],
    },
    {
      id: 'customers',
      title: 'Customers',
      summary: 'Clarify the audience so the content and social posts speak to the right people.',
      icon: 'users',
      questions: [
        {
          id: 'target-customers',
          label: 'Who are your main customers?',
          placeholder: 'Small businesses, schools, churches, event planners, fashion brands, etc.',
          multiline: true,
        },
        {
          id: 'customer-problems',
          label: 'What problems do customers usually need you to solve?',
          placeholder: 'Urgent delivery, clean design, affordable bulk print, packaging help, etc.',
          multiline: true,
        },
        {
          id: 'competitors',
          label: 'Which local competitors or online print brands should we be aware of?',
          placeholder: 'Names, links, or what customers compare you against',
          multiline: true,
        },
        {
          id: 'trust-proof',
          label: 'What proof can we show that customers can trust the business?',
          placeholder: 'Reviews, years in business, major clients, photos, videos, press, guarantees',
          multiline: true,
        },
      ],
    },
    {
      id: 'ordering',
      title: 'Ordering Flow',
      summary: 'Choose the simplest online path that matches how the business already works.',
      icon: 'shopping-cart',
      questions: [
        {
          id: 'preferred-flow',
          label: 'How should customers start an order online?',
          placeholder: 'Buy directly, request a quote, WhatsApp first, upload design, or book a call',
          multiline: true,
        },
        {
          id: 'upload-design',
          label: 'Should customers upload their own design files?',
          placeholder: 'Yes/no, accepted formats, file size concerns, approval process',
          multiline: true,
        },
        {
          id: 'request-design',
          label: 'Should customers be able to request design help from your team?',
          placeholder: 'Design request details, fee, turnaround, review/approval steps',
          multiline: true,
        },
        {
          id: 'order-tracking',
          label: 'Do customers need order status updates or tracking?',
          placeholder: 'Manual WhatsApp updates, email/SMS updates, account dashboard, order number',
        },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing & Payments',
      summary: 'Set expectations for quotes, checkout, deposits, taxes, and refunds.',
      icon: 'credit-card',
      questions: [
        {
          id: 'pricing-model',
          label: 'Do products have fixed prices, quote-based prices, or both?',
          placeholder: 'Mention products that can show prices and products that need custom quotes',
          multiline: true,
        },
        {
          id: 'payment-methods',
          label: 'What payment methods should customers use?',
          placeholder: 'Bank transfer, card, Paystack, Flutterwave, cash, POS, payment on pickup',
        },
        {
          id: 'deposits',
          label: 'Do customers pay full price upfront or a deposit?',
          placeholder: 'Example: 70% deposit before production, balance before delivery',
        },
        {
          id: 'tax-refunds',
          label: 'Are VAT, delivery fees, refunds, or cancellation rules already defined?',
          placeholder: 'Share what applies today or what needs to be decided',
          multiline: true,
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Delivery & Support',
      summary: 'Make the fulfilment promise clear before customers place orders.',
      icon: 'truck',
      questions: [
        {
          id: 'delivery-areas',
          label: 'Where do you deliver, and where can customers pick up orders?',
          placeholder: 'Local pickup, citywide delivery, interstate delivery, courier partners',
          multiline: true,
        },
        {
          id: 'turnaround',
          label: 'What is the usual turnaround time for common products?',
          placeholder: 'Example: 24 hours, 3-5 working days, depends on quantity',
          multiline: true,
        },
        {
          id: 'support-channels',
          label: 'Which support channels should appear on the website?',
          placeholder: 'Phone, WhatsApp, email, Instagram DM, physical office address, office hours',
          multiline: true,
        },
        {
          id: 'complaints',
          label: 'How do you handle damaged, delayed, or incorrect orders?',
          placeholder: 'Replacement, refund, reprint, escalation contact, proof needed',
          multiline: true,
        },
      ],
    },
    {
      id: 'website',
      title: 'Website Content',
      summary: 'Decide the pages and content needed for a confident first launch.',
      icon: 'globe',
      questions: [
        {
          id: 'required-pages',
          label: 'Which pages should the website include?',
          placeholder: 'Home, products, product details, about, contact, FAQs, gallery, policies',
          multiline: true,
        },
        {
          id: 'product-categories',
          label: 'How should products be grouped?',
          placeholder: 'Cards, flyers, banners, clothing, packaging, corporate gifts, event prints',
          multiline: true,
        },
        {
          id: 'gallery',
          label: 'Do you have photos or videos of finished work we can use?',
          placeholder: 'Product shots, shop photos, client deliveries, before/after design work',
          multiline: true,
        },
        {
          id: 'legal-pages',
          label: 'Do you already have policies for privacy, terms, delivery, returns, or artwork files?',
          placeholder: 'Mention existing documents or what needs to be written',
          multiline: true,
        },
      ],
    },
    {
      id: 'social',
      title: 'Social Media',
      summary: 'Plan the management work so content supports the website launch.',
      icon: 'megaphone',
      questions: [
        {
          id: 'handles',
          label: 'What social media accounts exist today?',
          placeholder: 'Instagram, Facebook, TikTok, LinkedIn, X, WhatsApp catalog links',
          multiline: true,
        },
        {
          id: 'platforms',
          label: 'Which platforms should we manage or prioritize?',
          placeholder: 'Mention primary and secondary platforms',
        },
        {
          id: 'content-style',
          label: 'What kind of content should the brand post?',
          placeholder: 'Product showcases, customer work, promos, educational posts, reels, stories',
          multiline: true,
        },
        {
          id: 'content-process',
          label: 'How should content approvals, posting frequency, and ad budget work?',
          placeholder: 'Who approves, weekly/monthly cadence, paid ads budget, reporting needs',
          multiline: true,
        },
      ],
    },
    {
      id: 'operations',
      title: 'Operations',
      summary: 'Identify who will own updates, enquiries, approvals, and admin access.',
      icon: 'file-text',
      questions: [
        {
          id: 'product-owner',
          label: 'Who will update products, prices, and availability?',
          placeholder: 'Owner, manager, sales team, designer, or Highbee support',
        },
        {
          id: 'enquiries-owner',
          label: 'Who should receive website enquiries and order notifications?',
          placeholder: 'Names, roles, email addresses, WhatsApp numbers',
          multiline: true,
        },
        {
          id: 'admin-users',
          label: 'Who needs admin access to the website?',
          placeholder: 'Owner, sales, social media manager, designer, accountant',
          multiline: true,
        },
        {
          id: 'integrations',
          label: 'What tools should the website connect with?',
          placeholder: 'WhatsApp, payment gateway, email, Google Analytics, Meta Pixel, CRM',
          multiline: true,
        },
      ],
    },
    {
      id: 'timeline',
      title: 'Timeline',
      summary: 'Keep the first launch focused, realistic, and useful.',
      icon: 'clock',
      questions: [
        {
          id: 'launch-date',
          label: 'Is there a target launch date or important event deadline?',
          placeholder: 'Date, event, campaign, or reason for urgency',
        },
        {
          id: 'priority-features',
          label: 'What must be ready for version 1?',
          placeholder: 'Product catalog, quote form, WhatsApp ordering, payments, social setup',
          multiline: true,
        },
        {
          id: 'budget-range',
          label: 'Is there a budget range or preferred payment schedule?',
          placeholder: 'A rough range helps us recommend the right phased approach',
        },
        {
          id: 'decision-makers',
          label: 'Who needs to review and approve the project?',
          placeholder: 'Names, roles, and how decisions are made',
          multiline: true,
        },
      ],
    },
  ],
  handoffTitle: 'Send these answers back to Highbee when ready.',
  handoffDescription:
    'Once we have this context, we can shape a practical website and social media plan that fits the business instead of guessing from the outside.',
  preparedFor: 'Highbee',
  downloadFileName: 'print-branding-website-discovery-answers.txt',
}

const localBusinessBrief: DiscoveryBrief = {
  slug: 'local-business',
  title: 'Local Business Website Discovery Brief',
  metadataTitle: 'Local Business Website Discovery Brief',
  metadataDescription:
    'A Highbee discovery brief for planning a practical website, marketing flow, and online operations for a local business.',
  intro:
    'These questions help us understand the business, customers, offers, operations, and marketing needs before we recommend the right website or online workflow.',
  brandLabel: 'Highbee',
  brandSubtext: 'Local business discovery',
  benchmarkTitle: 'What a strong local business website should clarify',
  benchmarkDescription:
    'The goal is not to overbuild. The goal is to make the business easier to trust, contact, buy from, book with, or visit online.',
  benchmarkIcon: 'heart-handshake',
  benchmarkItems: [
    'A clear offer and reason to choose the business',
    'Simple conversion paths for enquiries, bookings, orders, or visits',
    'Trust proof through reviews, photos, work samples, and customer stories',
    'Practical contact, support, fulfilment, and payment expectations',
    'A social media plan that supports sales instead of posting randomly',
  ],
  phaseCards: [
    {
      title: 'Clarity First',
      description:
        'Define the offer, audience, proof, service area, and the fastest path from interest to enquiry.',
    },
    {
      title: 'Conversion Flow',
      description:
        'Choose the right first version: WhatsApp leads, booking, quote requests, ecommerce, content, or a hybrid.',
    },
    {
      title: 'Growth System',
      description:
        'Connect social content, search visibility, follow-up, analytics, and repeatable operations.',
    },
  ],
  questionGroups: [
    {
      id: 'brand',
      title: 'Brand Basics',
      summary: 'Understand the business identity, location, tone, and existing assets.',
      icon: 'shield',
      questions: [
        {
          id: 'business-name-location',
          label: 'What is the business name, location, and service area?',
          placeholder: 'Name, city, physical address if relevant, and places served',
        },
        {
          id: 'business-summary',
          label: 'What does the business do in simple words?',
          placeholder: 'A short explanation of the main offer and who it helps',
          multiline: true,
        },
        {
          id: 'brand-assets',
          label: 'What brand assets already exist?',
          placeholder: 'Logo, colors, photos, videos, product images, menu, brochures, documents',
          multiline: true,
        },
        {
          id: 'brand-tone',
          label: 'How should the business sound online?',
          placeholder: 'Friendly, premium, practical, expert, playful, corporate, community-focused',
        },
      ],
    },
    {
      id: 'customers',
      title: 'Customers',
      summary: 'Define who the website and social content need to persuade.',
      icon: 'users',
      questions: [
        {
          id: 'target-customers',
          label: 'Who are the main customers?',
          placeholder: 'Individuals, families, students, businesses, event planners, homeowners, etc.',
          multiline: true,
        },
        {
          id: 'customer-needs',
          label: 'What do customers usually need help with?',
          placeholder: 'Urgent need, better price, convenience, quality, trust, expert guidance',
          multiline: true,
        },
        {
          id: 'buying-triggers',
          label: 'What makes someone contact or buy from the business?',
          placeholder: 'Price, speed, location, reviews, portfolio, referrals, availability, guarantee',
          multiline: true,
        },
        {
          id: 'competitors',
          label: 'Which competitors or alternatives should we understand?',
          placeholder: 'Names, links, social handles, or what customers compare against',
          multiline: true,
        },
      ],
    },
    {
      id: 'offers',
      title: 'Offers',
      summary: 'List the products, services, packages, and priorities for version 1.',
      icon: 'package',
      questions: [
        {
          id: 'service-list',
          label: 'What products or services should the website show?',
          placeholder: 'List everything important, then mark the most profitable or popular offers',
          multiline: true,
        },
        {
          id: 'top-priorities',
          label: 'Which offers should appear first?',
          placeholder: 'Top 3-5 services/products the business wants to sell more of',
          multiline: true,
        },
        {
          id: 'offer-details',
          label: 'What details matter before a customer decides?',
          placeholder: 'Sizes, prices, duration, location, requirements, add-ons, packages, availability',
          multiline: true,
        },
        {
          id: 'custom-requests',
          label: 'Does the business handle custom requests?',
          placeholder: 'What customers can request, what needs a quote, and what is not offered',
          multiline: true,
        },
      ],
    },
    {
      id: 'conversion',
      title: 'Conversion Flow',
      summary: 'Choose the simplest online path that fits how the business sells today.',
      icon: 'route',
      questions: [
        {
          id: 'primary-action',
          label: 'What should visitors do first?',
          placeholder: 'Call, WhatsApp, book, request a quote, place an order, visit, subscribe',
        },
        {
          id: 'current-sales-flow',
          label: 'How does a customer currently buy, book, or enquire offline?',
          placeholder: 'Explain the normal steps from first contact to payment or delivery',
          multiline: true,
        },
        {
          id: 'online-flow',
          label: 'What should the online flow look like for version 1?',
          placeholder: 'Simple contact form, WhatsApp button, booking form, checkout, quote request',
          multiline: true,
        },
        {
          id: 'follow-up',
          label: 'Who follows up with leads, bookings, or orders?',
          placeholder: 'Name/role, WhatsApp number, email, response time, handover process',
          multiline: true,
        },
      ],
    },
    {
      id: 'pricing-payment',
      title: 'Pricing & Payment',
      summary: 'Clarify what can be shown publicly and what needs manual confirmation.',
      icon: 'credit-card',
      questions: [
        {
          id: 'pricing-visibility',
          label: 'Should prices be shown on the website?',
          placeholder: 'Show all prices, show starting prices, hide prices, or quote-based only',
        },
        {
          id: 'payment-methods',
          label: 'How do customers pay today?',
          placeholder: 'Cash, bank transfer, POS, card, Paystack, Flutterwave, wallet, invoice',
          multiline: true,
        },
        {
          id: 'deposit-rules',
          label: 'Are deposits, part payments, or balances required?',
          placeholder: 'Example: 50% deposit before work starts, balance on delivery',
          multiline: true,
        },
        {
          id: 'refunds-cancellations',
          label: 'Are refund, cancellation, or rescheduling rules already defined?',
          placeholder: 'Share existing rules or say what still needs to be decided',
          multiline: true,
        },
      ],
    },
    {
      id: 'fulfilment',
      title: 'Fulfilment & Support',
      summary: 'Make the delivery, visit, booking, or service promise clear.',
      icon: 'truck',
      questions: [
        {
          id: 'service-delivery',
          label: 'How is the product or service delivered?',
          placeholder: 'In-store, home service, delivery, pickup, online session, appointment',
          multiline: true,
        },
        {
          id: 'turnaround',
          label: 'What timeline should customers expect?',
          placeholder: 'Same day, 24 hours, 3-5 days, weekly, depends on project size',
          multiline: true,
        },
        {
          id: 'support-channels',
          label: 'Which contact and support channels should be public?',
          placeholder: 'Phone, WhatsApp, email, Instagram, physical address, business hours',
          multiline: true,
        },
        {
          id: 'issues',
          label: 'How should complaints or issues be handled?',
          placeholder: 'Who receives them, response time, replacement/refund policy, escalation',
          multiline: true,
        },
      ],
    },
    {
      id: 'content',
      title: 'Website Content',
      summary: 'Gather the pages, photos, proof, and policies needed to launch with confidence.',
      icon: 'globe',
      questions: [
        {
          id: 'required-pages',
          label: 'Which pages should the website include?',
          placeholder: 'Home, services, about, contact, booking/order page, FAQs, gallery, policies',
          multiline: true,
        },
        {
          id: 'proof',
          label: 'What proof can we show to build trust?',
          placeholder: 'Reviews, client logos, project photos, before/after, certifications, awards',
          multiline: true,
        },
        {
          id: 'faqs',
          label: 'What questions do customers ask often?',
          placeholder: 'List the common questions and simple answers if available',
          multiline: true,
        },
        {
          id: 'policies',
          label: 'What policies or legal pages are needed?',
          placeholder: 'Privacy, terms, delivery, returns, booking, cancellation, warranty',
          multiline: true,
        },
      ],
    },
    {
      id: 'social',
      title: 'Social Media',
      summary: 'Plan a content system that supports discovery, trust, and sales.',
      icon: 'megaphone',
      questions: [
        {
          id: 'current-handles',
          label: 'What social accounts exist today?',
          placeholder: 'Instagram, Facebook, TikTok, LinkedIn, X, Google Business Profile',
          multiline: true,
        },
        {
          id: 'platforms',
          label: 'Which platforms should be prioritized?',
          placeholder: 'Primary platform, secondary platform, and any platform to avoid',
        },
        {
          id: 'content-style',
          label: 'What content should the business post?',
          placeholder: 'Work samples, offers, educational tips, testimonials, behind the scenes, reels',
          multiline: true,
        },
        {
          id: 'approval-reporting',
          label: 'How should approvals, posting frequency, ads, and reporting work?',
          placeholder: 'Who approves, cadence, monthly ad budget, metrics the owner cares about',
          multiline: true,
        },
      ],
    },
    {
      id: 'operations',
      title: 'Operations',
      summary: 'Identify who owns updates, access, notifications, and future changes.',
      icon: 'file-text',
      questions: [
        {
          id: 'content-owner',
          label: 'Who will update content, prices, products, or availability?',
          placeholder: 'Owner, manager, sales team, Highbee, or another staff member',
        },
        {
          id: 'admin-users',
          label: 'Who needs website admin access?',
          placeholder: 'Names/roles and what they should be allowed to manage',
          multiline: true,
        },
        {
          id: 'notifications',
          label: 'Where should website notifications go?',
          placeholder: 'Email addresses, WhatsApp numbers, CRM, spreadsheet, dashboard',
          multiline: true,
        },
        {
          id: 'integrations',
          label: 'What tools should the website connect with?',
          placeholder: 'WhatsApp, payment gateway, Google Analytics, Meta Pixel, email, CRM',
          multiline: true,
        },
      ],
    },
    {
      id: 'timeline',
      title: 'Timeline',
      summary: 'Set a realistic first launch and understand approval needs.',
      icon: 'calendar',
      questions: [
        {
          id: 'launch-date',
          label: 'Is there a target launch date or event deadline?',
          placeholder: 'Date, campaign, season, opening, promo, or reason for urgency',
        },
        {
          id: 'must-haves',
          label: 'What must be included in version 1?',
          placeholder: 'The smallest set of features needed to launch usefully',
          multiline: true,
        },
        {
          id: 'later-features',
          label: 'What can wait until after launch?',
          placeholder: 'Nice-to-have ideas, advanced automation, ecommerce, dashboard, ads',
          multiline: true,
        },
        {
          id: 'decision-makers',
          label: 'Who reviews and approves the project?',
          placeholder: 'Names, roles, approval process, and how feedback should be shared',
          multiline: true,
        },
      ],
    },
  ],
  handoffTitle: 'Send these answers back to Highbee when ready.',
  handoffDescription:
    'Once we have this context, we can recommend the simplest useful website and marketing plan for the business.',
  preparedFor: 'Highbee',
  downloadFileName: 'local-business-discovery-answers.txt',
}

export const discoveryBriefs = {
  [printServicesBrief.slug]: printServicesBrief,
  [localBusinessBrief.slug]: localBusinessBrief,
} satisfies Record<string, DiscoveryBrief>

export function getDiscoveryBrief(slug: string) {
  return discoveryBriefs[slug]
}

export function getDiscoveryBriefSlugs() {
  return Object.keys(discoveryBriefs)
}
