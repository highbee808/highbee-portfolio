import type { Metadata } from 'next'
import { DiscoveryBriefClient } from '@/components/discovery/discovery-brief-client'
import type { DiscoveryBrief } from '@/lib/discovery-briefs'

export const metadata: Metadata = {
  title: 'Everything Printable Nigeria Online Store Setup | Highbee',
  description: 'A Highbee follow-up discovery page for collecting launch-ready online print store details.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

const brief = {
  slug: 'everything-printable-followup',
  title: 'Everything Printable Nigeria Online Store Setup',
  metadataTitle: 'Everything Printable Nigeria Online Store Setup',
  metadataDescription:
    'A Highbee follow-up discovery page for collecting launch-ready online print store details.',
  intro:
    'We have already reviewed your first answers. This page collects the remaining launch details for your online print store, product catalog, ordering flow, delivery rules, and social media plan. Use the suggested answers where they fit, edit anything you want, and paste Google Drive links for files, photos, price lists, and sample documents.',
  brandLabel: 'Highbee',
  brandSubtext: 'Online print store setup',
  benchmarkTitle: 'Keep the launch simple, clear, and workable',
  benchmarkDescription:
    'The goal is to make online ordering easy for customers and easy for your team to manage. We only need enough detail now to launch confidently, then the product catalog can grow later.',
  benchmarkIcon: 'printer',
  benchmarkItems: [
    'A focused launch catalog with the most important products first',
    'Clear fixed-price, configurable, and quote-based product paths',
    'Easy artwork upload instructions with paid design help where needed',
    'Payment, VAT, delivery, cancellation, and refund rules customers can understand',
    'Social media content that shows real products and teaches customers how to order',
  ],
  phaseCards: [
    {
      title: 'Confirm Details',
      description:
        'Use suggested answers, choose simple options, and paste Drive links for brand files, prices, photos, and product samples.',
    },
    {
      title: 'Shape The Store',
      description:
        'We will turn the answers into product categories, checkout rules, quote forms, uploads, delivery, and admin workflow.',
    },
    {
      title: 'Prepare Launch',
      description:
        'The final answers will guide the website build, WooCommerce setup, policies, and social media launch content.',
    },
  ],
  questionGroups: [
    {
      id: 'setup',
      title: 'Start Here',
      summary: 'Share the main folder and any quick notes before the details.',
      icon: 'file-text',
      questions: [
        {
          id: 'epn-main-drive-folder',
          label: 'Main Google Drive folder link',
          placeholder: 'Paste the folder link for logos, photos, price lists, and sample files',
          helper:
            'Please upload files to Google Drive first, then paste the folder link here. This is easier and safer than uploading everything inside this form.',
        },
        {
          id: 'epn-quick-notes',
          label: 'Any quick notes before we begin?',
          placeholder: 'Anything you want us to know before reviewing the answers',
          helper: 'Optional. You can leave this blank.',
          multiline: true,
        },
      ],
    },
    {
      id: 'brand-contact',
      title: 'Brand & Contact',
      summary: 'Confirm the public business details customers should see.',
      icon: 'shield',
      questions: [
        {
          id: 'epn-business-name',
          label: 'Business name',
          placeholder: 'Business name as it should appear on the website',
          suggestedAnswer: 'EVERYTHING Printable Nigeria',
        },
        {
          id: 'epn-public-address',
          label: 'Main location or address',
          placeholder: 'Office/shop address customers can visit or recognize',
          helper: 'If pickup is available, use the pickup address too.',
        },
        {
          id: 'epn-service-area',
          label: 'Service area',
          placeholder: 'Where you serve or deliver',
          suggestedAnswer: 'Nationwide delivery across Nigeria, with Lagos and Ota as key service areas.',
          multiline: true,
        },
        {
          id: 'epn-whatsapp-email',
          label: 'WhatsApp number and support email',
          placeholder: 'WhatsApp number, support email, and office hours if any',
          multiline: true,
        },
        {
          id: 'epn-social-links',
          label: 'Social media links',
          placeholder: 'Facebook, Instagram, TikTok, and X links or handles',
          multiline: true,
        },
        {
          id: 'epn-brand-assets',
          label: 'Logo, colors, and brand assets link',
          placeholder: 'Paste a Drive link for logo files, colors, brand guide, photos, or designs',
          helper: 'PNG, SVG, AI, PDF, sample designs, or photos are all useful.',
          multiline: true,
        },
        {
          id: 'epn-public-proof',
          label: 'Client names/logos we can show publicly',
          placeholder: 'List client names, logos, or testimonials we are allowed to use',
          suggestedAnswer: 'Covenant University Ota, The Covenant Nation, 6:33 Pizza, ACBTV',
          multiline: true,
        },
      ],
    },
    {
      id: 'launch-products',
      title: 'Launch Products',
      summary: 'Choose the first products for the online store launch.',
      icon: 'package',
      questions: [
        {
          id: 'epn-launch-product-checkboxes',
          label: 'Products to include or consider for launch',
          placeholder: 'Choose from the options or type any extra products',
          helper: 'Pick the products customers order often and products with clear prices.',
          options: [
            'Flyers',
            'Stickers',
            'Business cards',
            'Mugs',
            'Branded T-shirts',
            'Tote bags',
            'Banners',
            'Roll-up banners',
            'Paper bags',
            'Product packaging',
            'Journals',
            'Jotters',
            'Magazines/storybooks',
            'Other',
          ],
          choiceMode: 'multiple',
          multiline: true,
        },
        {
          id: 'epn-top-10-products',
          label: 'Which 10 products are most important for launch?',
          placeholder: 'List the most important launch products in order',
          suggestedAnswer:
            'Flyers, stickers, business cards, mugs, branded T-shirts, tote bags, banners, roll-up banners, paper bags, product packaging.',
          multiline: true,
        },
        {
          id: 'epn-fixed-price-products',
          label: 'Products that should have direct checkout prices',
          placeholder: 'Products customers can choose, upload artwork, add to cart, and pay for',
          suggestedAnswer:
            'Flyers, stickers, business cards, mugs, branded T-shirts, tote bags, banners, and roll-up banners.',
          multiline: true,
        },
        {
          id: 'epn-quote-products',
          label: 'Products that should be quote-based',
          placeholder: 'Products that need custom review before price is confirmed',
          suggestedAnswer:
            'Product packaging, paper bags, journals, jotters, magazines, storybooks, and large custom bulk jobs.',
          multiline: true,
        },
      ],
    },
    {
      id: 'product-samples',
      title: 'Product Samples',
      summary: 'Give us one or two sample products per category so we can design the catalog properly.',
      icon: 'printer',
      questions: [
        {
          id: 'epn-marketing-print-samples',
          label: 'Marketing Prints sample',
          placeholder:
            'Example: Flyers - minimum 50pcs, A5/A4, matte or gloss paper, single or double-sided, fixed price, upload required, 24 hours or 3 working days',
          helper: 'Good samples: flyers, business cards, stickers.',
          multiline: true,
        },
        {
          id: 'epn-large-format-samples',
          label: 'Large Format sample',
          placeholder:
            'Example: Roll-up banner - size, stand type, material, quantity, price, turnaround, artwork rule',
          helper: 'Good samples: banners and roll-up banners.',
          multiline: true,
        },
        {
          id: 'epn-merchandise-samples',
          label: 'Branded Merchandise sample',
          placeholder:
            'Example: Mug or T-shirt - color, size options, print area, quantity, price, turnaround',
          helper: 'Good samples: mugs, T-shirts, tote bags.',
          multiline: true,
        },
        {
          id: 'epn-packaging-samples',
          label: 'Packaging sample',
          placeholder:
            'Example: Paper bag or product packaging - size, material, handle type, finish, quantity, quote or fixed price',
          helper: 'Packaging can be quote-based if exact pricing depends on size/material.',
          multiline: true,
        },
        {
          id: 'epn-books-stationery-samples',
          label: 'Books & Stationery sample',
          placeholder:
            'Example: Journal or jotter - size, pages, cover type, binding, quantity, price or quote rule',
          helper: 'Good samples: journals, jotters, magazines, storybooks.',
          multiline: true,
        },
        {
          id: 'epn-sample-files-link',
          label: 'Product photos, price sheets, or sample documents link',
          placeholder: 'Paste Drive links for product photos, price tables, brochures, or sample files',
          helper:
            'If you already pasted one main folder link above, you can leave this blank or add category-specific links.',
          multiline: true,
        },
      ],
    },
    {
      id: 'pricing-payment',
      title: 'Pricing & Payment',
      summary: 'Confirm how prices, VAT, payment, cancellations, refunds, and design fees should work.',
      icon: 'credit-card',
      questions: [
        {
          id: 'epn-vat-display',
          label: 'Should prices show VAT included or VAT added at checkout?',
          placeholder: 'Choose one option or type a note',
          options: ['VAT added at checkout', 'VAT included in displayed prices', 'Not sure yet'],
          choiceMode: 'single',
          suggestedAnswer: 'VAT added at checkout',
        },
        {
          id: 'epn-vat-percentage',
          label: 'VAT percentage',
          placeholder: 'Example: 7.5%',
        },
        {
          id: 'epn-primary-payment',
          label: 'Primary payment method',
          placeholder: 'Choose one option or type a note',
          options: ['Paystack', 'Flutterwave', 'Bank transfer', 'Not sure yet'],
          choiceMode: 'single',
          suggestedAnswer: 'Paystack',
        },
        {
          id: 'epn-other-payment-methods',
          label: 'Other payment methods to support',
          placeholder: 'Choose options or type any extra payment method',
          options: ['Flutterwave', 'Bank transfer', 'Card payment', 'Manual invoice', 'Other'],
          choiceMode: 'multiple',
          multiline: true,
        },
        {
          id: 'epn-bank-transfer-rule',
          label: 'Should bank transfer appear at checkout?',
          placeholder: 'Yes, no, or backup only',
          suggestedAnswer: 'Use bank transfer as a backup option handled by customer care.',
          multiline: true,
        },
        {
          id: 'epn-payment-cancellation-refund',
          label: 'Payment, cancellation, and refund rules',
          placeholder: 'Confirm payment upfront, cancellation window, refund timeline, and any exception',
          suggestedAnswer:
            'Customers pay the full amount upfront. Cancellation is allowed within 20 minutes if production has not started. Approved refunds are processed within 5 working days.',
          multiline: true,
        },
        {
          id: 'epn-design-fees',
          label: 'Paid design-help fee or price note',
          placeholder: 'List design fees per product if known, or say quote design help for now',
          helper: 'Example: flyer design fee, banner design fee, packaging design quoted separately.',
          multiline: true,
        },
      ],
    },
    {
      id: 'artwork-design',
      title: 'Artwork & Design Help',
      summary: 'Confirm file formats, upload rules, proofing, and paid design assistance.',
      icon: 'file-text',
      questions: [
        {
          id: 'epn-accepted-file-types',
          label: 'Accepted file types',
          placeholder: 'List the file types customers can upload',
          suggestedAnswer: 'PDF, CorelDRAW, PNG, JPEG',
        },
        {
          id: 'epn-preferred-file-type',
          label: 'Preferred file type',
          placeholder: 'Best file type for printing',
          suggestedAnswer: 'PDF',
        },
        {
          id: 'epn-upload-timing',
          label: 'When should customers upload artwork?',
          placeholder: 'Before payment, after payment, or either',
          options: ['Before payment', 'After payment', 'Either', 'Not sure yet'],
          choiceMode: 'single',
          suggestedAnswer: 'Before payment',
        },
        {
          id: 'epn-proof-rule',
          label: 'Should customers receive proof before printing?',
          placeholder: 'Choose one option or type a note',
          options: [
            'Yes, for all orders',
            'Only for design-help orders',
            'Only when artwork needs correction',
            'Not sure yet',
          ],
          choiceMode: 'single',
        },
        {
          id: 'epn-bad-artwork-rule',
          label: 'What happens if artwork is poor quality?',
          placeholder: 'How should the team respond before production starts?',
          suggestedAnswer:
            'Customer care contacts the customer on WhatsApp or email before production starts.',
          multiline: true,
        },
        {
          id: 'epn-paid-design-products',
          label: 'Products where paid design help should be available',
          placeholder: 'Choose products or type extra products',
          options: [
            'Flyers',
            'Business cards',
            'Stickers',
            'Banners',
            'Roll-up banners',
            'T-shirts',
            'Mugs',
            'Tote bags',
            'Paper bags',
            'Product packaging',
          ],
          choiceMode: 'multiple',
          multiline: true,
        },
        {
          id: 'epn-design-revisions-production',
          label: 'Design revisions and production start rule',
          placeholder: 'How many revisions are included, and when should production start?',
          suggestedAnswer:
            'Paid design help includes 1-2 revisions. Production starts after payment and final artwork/design approval.',
          multiline: true,
        },
      ],
    },
    {
      id: 'delivery-orders',
      title: 'Delivery & Orders',
      summary: 'Confirm nationwide delivery, pickup, delivery fees, status updates, and order ownership.',
      icon: 'truck',
      questions: [
        {
          id: 'epn-delivery-coverage',
          label: 'Delivery coverage',
          placeholder: 'Where do you deliver?',
          suggestedAnswer: 'Nationwide delivery across Nigeria.',
        },
        {
          id: 'epn-pickup-rule',
          label: 'Is pickup available?',
          placeholder: 'Choose one option or type a note',
          options: ['Yes', 'No', 'Not sure yet'],
          choiceMode: 'single',
        },
        {
          id: 'epn-pickup-address',
          label: 'Pickup address, if available',
          placeholder: 'Address customers can use for pickup',
        },
        {
          id: 'epn-delivery-fee-method',
          label: 'How should delivery fees be handled?',
          placeholder: 'Choose options or type a note',
          options: [
            'Fixed by state/zone',
            'Calculated after order',
            'Quote-based for bulky items',
            'Not sure yet',
          ],
          choiceMode: 'multiple',
          suggestedAnswer: 'Fixed by state/zone\nQuote-based for bulky items',
          multiline: true,
        },
        {
          id: 'epn-special-delivery-products',
          label: 'Products that need special delivery handling',
          placeholder: 'Example: banners, roll-up banners, packaging, bulk orders',
          multiline: true,
        },
        {
          id: 'epn-order-status-flow',
          label: 'Order status flow',
          placeholder: 'List the customer-facing order statuses',
          suggestedAnswer:
            'Order Received -> Artwork Review -> Design/Prepress -> Printing -> Out for Delivery/Ready for Pickup -> Completed',
          multiline: true,
        },
        {
          id: 'epn-order-alerts-owner',
          label: 'Who receives alerts and updates order status?',
          placeholder: 'Names or roles for order alerts, quote requests, and status updates',
          suggestedAnswer:
            'Customer care manager and owner receive order alerts. Customer care manager or admin manager updates order status.',
          multiline: true,
        },
      ],
    },
    {
      id: 'social-approval',
      title: 'Social Media & Approval',
      summary: 'Collect the launch content direction and approval workflow.',
      icon: 'megaphone',
      questions: [
        {
          id: 'epn-social-priority-platforms',
          label: 'Platforms to prioritize',
          placeholder: 'Choose platforms or type a note',
          options: ['Instagram', 'Facebook', 'TikTok', 'X'],
          choiceMode: 'multiple',
          suggestedAnswer: 'Instagram\nFacebook\nTikTok\nX',
          multiline: true,
        },
        {
          id: 'epn-posting-frequency',
          label: 'Posting frequency',
          placeholder: 'Choose one option or type a note',
          options: ['Weekly', 'More posts during launch', 'Not sure yet'],
          choiceMode: 'single',
          suggestedAnswer: 'Weekly, with more posts during launch.',
        },
        {
          id: 'epn-content-mix',
          label: 'Main content type',
          placeholder: 'What should the brand post?',
          suggestedAnswer:
            'Product showcase, print tips, how to order, customer work, behind the scenes, and launch offers if approved.',
          multiline: true,
        },
        {
          id: 'epn-social-assets-link',
          label: 'Product photos/videos Drive link',
          placeholder: 'Paste Drive links for photos, videos, reels, customer work, or behind-the-scenes clips',
          multiline: true,
        },
        {
          id: 'epn-social-approver',
          label: 'Who approves social media posts before publishing?',
          placeholder: 'Name and role of the approver',
        },
        {
          id: 'epn-private-jobs',
          label: 'Are there customers or jobs we should not post publicly?',
          placeholder: 'List any private customers, sensitive jobs, or approval restrictions',
          multiline: true,
        },
        {
          id: 'epn-launch-offers',
          label: 'Do you want launch offers or bundles?',
          placeholder: 'Choose one option or describe the offer',
          options: ['Yes', 'No', 'Not sure yet'],
          choiceMode: 'single',
        },
      ],
    },
  ],
  handoffTitle: 'Export these setup answers when ready.',
  handoffDescription:
    'Once these details are exported, we can use them to prepare the website structure, product catalog, ordering flow, WooCommerce setup, policies, and social media launch plan.',
  preparedFor: 'Everything Printable Nigeria',
  downloadFileName: 'everything-printable-online-store-setup-handoff.md',
} as DiscoveryBrief

export default function EverythingPrintableFollowupPage() {
  return <DiscoveryBriefClient brief={brief} />
}
