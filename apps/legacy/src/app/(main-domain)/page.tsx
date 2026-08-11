import type { Metadata } from 'next'
import { HomePage } from '@/modules/main-domain'

export const metadata: Metadata = {
  title: 'Dadad CRM — Close More Deals, Grow Revenue Faster',
  description:
    'The enterprise CRM platform built for serious sales teams. Streamline your pipeline, automate follow-ups, and turn every customer interaction into revenue growth.',
  keywords: [
    'Dadad CRM',
    'enterprise CRM',
    'sales pipeline',
    'customer relationship management',
    'sales automation',
    'revenue growth',
    'deal management',
    'sales platform',
  ],
  openGraph: {
    title: 'Dadad CRM — Close More Deals, Grow Revenue Faster',
    description:
      'The enterprise CRM built for serious sales teams. Streamline your pipeline, automate follow-ups, and turn every customer interaction into revenue.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Dadad CRM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dadad CRM — Close More Deals, Grow Revenue Faster',
    description:
      'Dadad CRM is built for serious sales teams. Streamline your pipeline and grow revenue faster.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomePage />
}