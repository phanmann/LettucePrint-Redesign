import localFont from 'next/font/local'

export const sharpGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/SharpGroteskBook-20.woff',
      weight: '100 500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SharpGroteskBookItl-20.woff',
      weight: '100 500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/SharpGroteskSmBold-20.woff',
      weight: '600 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SharpGroteskSmBoldItl-20.woff',
      weight: '600 900',
      style: 'italic',
    },
  ],
  variable: '--font-sharp-grotesk',
  display: 'swap',
})
