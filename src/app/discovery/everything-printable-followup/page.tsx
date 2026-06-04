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

const brief: DiscoveryBrief = {
  slug: 'everything-printable-followup',
  title: 'Everything Printable Nigeria Online Store Setup',
  metadataTitle: 'Everything Printable Nigeria Online Store Setup',
  metadataDescription:
    'A Highbee follow-up discovery page for collecting launch-ready online print store details.',
  intro:
    'We have already reviewed your first answers. This page collects the remaining launch details for your online print store, product catalog, ordering flow, delivery rules, and social media plan. Paste Google Drive links for files, photos, price lists, and sample documents where needed.',
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
        'Answer the simple questions and paste Drive links for brand files, prices, photos, and product samples.',
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
        },
        {
          id: 'epn-quick-notes',
          label: 'Any quick notes before we begin?',
          placeholder: 'Anything you want us to know before reviewing the answers. Optional.',
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
          placeholder: 'EVERYTHING Printable Nigeria, or the exact name to show on the website',
        },
        {
          id: 'epn-public-address',
          label: 'Main location or address',
          placeholder: 'Office/shop address customers can visit or recognize',
        },
        {
          id: 'epn-service-area',
          label: 'Service area',
          placeholder: 'Example: Nationwide delivery across Nigeria, with Lagos and Ota as key service areas',
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
          multiline: true,
        },
        {
          id: 'epn-public-proof',
          label: 'Client names/logos we can show publicly',
          placeholder: 'Example: Covenant University Ota, The Covenant Nation, 6:33 Pizza, ACBTV',
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
          placeholder:
            'Example: Flyers, stickers, business cards, mugs, branded T-shirts, tote bags, banners, roll-up banners, paper bags, product packaging, journals, jotters, magazines/storybooks',
          multiline: true,
        },
        {
          id: 'epn-top-10-products',
          label: 'Which 10 products are most important for launch?',
          placeholder: 'List the most important launch products in order',
          multiline: true,
        },
        {
          id: 'epn-fixed-price-products',
          label: 'Products that should have direct checkout prices',
          placeholder: 'Products customers can choose, upload artwork, add to cart, and pay for',
          multiline: true,
        },
        {
          id: 'epn-quote-products',
          label: 'Products that should be quote-based',
          placeholder: 'Products that need custom review before price is confirmed',
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
          multiline: true,
        },
        {
          id: 'epn-large-format-samples',
          label: 'Large Format sample',
          placeholder: 'Example: Roll-up banner - size, stand type, material, quantity, price, turnaround, artwork rule',
          multiline: true,
        },
        {
          id: 'epn-merchandise-samples',
          label: 'Branded Merchandise sample',
          placeholder: 'Example: Mug or T-shirt - color, size options, print area, quantity, price, turnaround',
          multiline: true,
        },
        {
          id: 'epn-packaging-samples',
          label: 'Packaging sample',
          placeholder: 'Example: Paper bag or product packaging - size, material, handle type, finish, quantity, quote or fixed price',
          multiline: true,
        },
        {
          id: 'epn-books-stationery-samples',
          label: 'Books & Stationery sample',
          placeholder: 'Example: Journal or jotter - size, pages, cover type, binding, quantity, price or quote rule',
          multiline: true,
        },
        {
          id: 'epn-sample-files-link',
          label: 'Product photos, price sheets, or sample documents link',
          placeholder: 'Paste Drive links for product photos, price tables, brochures, or sample files',
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
          placeholder: 'Example: VAT added at checkout, VAT included in displayed prices, or not sure yet',
        },
        {
          id: 'epn-vat-percentage',
          label: 'VAT percentage',
          placeholder: 'Example: 7.5%',
        },
        {
          id: 'epn-primary-payment',
          label: 'Primary payment method',
          placeholder: 'Example: Paystack, Flutterwave, bank transfer, or not sure yet',
        },
        {
          id: 'epn-other-payment-methods',
          label: 'Other payment methods to support',
          placeholder: 'Example: Flutterwave, bank transfer, card payment, manual invoice, other',
          multiline: true,
        },
        {
          id: 'epn-bank-transfer-rule',
          label: 'Should bank transfer appear at checkout?',
          placeholder: 'Yes, no, backup only, or handled by customer care',
          multiline: true,
        },
        {
          id: 'epn-payment-cancellation-refund',
          label: 'Payment, cancellation, and refund rules',
          placeholder:
            'Example: Customers pay full amount upfront. Cancellation allowed within 20 minutes if production has not started. Approved refunds processed within 5 working days.',
          multiline: true,
        },
        {
          id: 'epn-design-fees',
          label: 'Paid design-help fee or price note',
          placeholder: 'List design fees per product if known, or say quote design help for now',
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
          placeholder: 'Example: PDF, CorelDRAW, PNG, JPEG',
        },
        {
          id: 'epn-preferred-file-type',
          label: 'Preferred file type',
          placeholder: 'Example: PDF',
        },
        {
          id: 'epn-upload-timing',
          label: 'When should customers upload artwork?',
          placeholder: 'Before payment, after payment, either, or not sure yet',
        },
        {
          id: 'epn-proof-rule',
          label: 'Should customers receive proof before printing?',
          placeholder: 'For all orders, only design-help orders, only poor artwork, or not sure yet',
        },
        {
          id: 'epn-bad-artwork-rule',
          label: 'What happens if artwork is poor quality?',
          placeholder: 'Example: Customer care contacts the customer before production starts',
          multiline: true,
        },
        {
          id: 'epn-paid-design-products',
          label: 'Products where paid design help should be available',
          placeholder: 'Example: Flyers, business cards, stickers, banners, T-shirts, mugs, packaging',
          multiline: true,
        },
        {
          id: 'epn-design-revisions-production',
          label: 'Design revisions and production start rule',
          placeholder: 'Example: 1-2 revisions. Production starts after payment and final artwork/design approval.',
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
          placeholder: 'Example: Nationwide delivery across Nigeria',
        },
        {
          id: 'epn-pickup-rule',
          label: 'Is pickup available?',
          placeholder: 'Yes, no, or not sure yet',
        },
        {
          id: 'epn-pickup-address',
          label: 'Pickup address, if available',
          placeholder: 'Address customers can use for pickup',
        },
        {
          id: 'epn-delivery-fee-method',
          label: 'How should delivery fees be handled?',
          placeholder: 'Example: Fixed by state/zone, calculated after order, quote-based for bulky items',
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
          placeholder:
            'Example: Order Received -> Artwork Review -> Design/Prepress -> Printing -> Out for Delivery/Ready for Pickup -> Completed',
          multiline: true,
        },
        {
          id: 'epn-order-alerts-owner',
          label: 'Who receives alerts and updates order status?',
          placeholder: 'Names or roles for order alerts, quote requests, and status updates',
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
          placeholder: 'Example: Instagram, Facebook, TikTok, X',
          multiline: true,
        },
        {
          id: 'epn-posting-frequency',
          label: 'Posting frequency',
          placeholder: 'Example: Weekly, with more posts during launch',
        },
        {
          id: 'epn-content-mix',
          label: 'Main content type',
          placeholder: 'Example: Product showcase, print tips, how to order, customer work, behind the scenes, launch offers',
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
          placeholder: 'Yes, no, not sure yet, or describe the offer',
        },
      ],
    },
  ],
  handoffTitle: 'Export these setup answers when ready.',
  handoffDescription:
    'Once these details are exported, we can use them to prepare the website structure, product catalog, ordering flow, WooCommerce setup, policies, and social media launch plan.',
  preparedFor: 'Everything Printable Nigeria',
  downloadFileName: 'everything-printable-online-store-setup-handoff.md',
}

export default function EverythingPrintableFollowupPage() {
  return <DiscoveryBriefClient brief={brief} />
}
