import localFont from 'next/font/local'

export const sharpGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/SharpGrotesk-Book20.otf',
      weight: '100 500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SharpGrotesk-SemiBold20.ttf',
      weight: '600 900',
      style: 'normal',
    },
  ],
  variable: '--font-sharp-grotesk',
  display: 'swap',
})
