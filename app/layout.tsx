import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { NavigationWrapper } from '@/components/navigation-wrapper'
import { NeuralBackground } from '@/components/neural-background'
import { cn } from '@/lib/utils'
import { CursorGlow } from '@/components/cursor-glow'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Ashwin Ram | Data Scientist & AI Engineer',
  description: 'Chicago-based data scientist obsessed with turning messy data into market-moving insight. I build scalable ML & GenAI solutions that ship.',
  keywords: ['data scientist', 'AI engineer', 'machine learning', 'Chicago', 'UChicago', 'portfolio'],
  authors: [{ name: 'Ashwin Ram' }],
  creator: 'Ashwin Ram',
  metadataBase: new URL('https://ashwinram.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ashwinram.dev',
    title: 'Ashwin Ram | Data Scientist & AI Engineer',
    description: 'Chicago-based data scientist obsessed with turning messy data into market-moving insight.',
    siteName: 'Ashwin Ram Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashwin Ram | Data Scientist & AI Engineer',
    description: 'Chicago-based data scientist obsessed with turning messy data into market-moving insight.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background color layer */}
          <div className="fixed inset-0 bg-background z-[-3]"></div>
          {/* Neural background */}
          <NeuralBackground />
          
          <CursorGlow />
          
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 