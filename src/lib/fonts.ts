import localFont from 'next/font/local'

export const sharpGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/SharpGrotesk-Book20.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SharpGrotesk-SemiBold20.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-sharp-grotesk',
  display: 'swap',
})
