# Portfolio image folders

Each portfolio project has its own folder named after the project slug.

## How to add images

1. Add new image files to the matching folder, for example:

```txt
public/images/portfolio/rolling-green-cannabis/detail-01.jpg
public/images/portfolio/rolling-green-cannabis/detail-02.jpg
```

2. Reference those files in `src/lib/portfolioProjects.ts` inside that project's `galleryImages` array:

```ts
galleryImages: [
  {
    src: '/images/portfolio/rolling-green-cannabis/hero.jpg',
    alt: 'Bergdorf Goodman retail print installation detail',
    caption: 'Retail print system produced for premium in-store presentation.',
  },
  {
    src: '/images/portfolio/rolling-green-cannabis/detail-01.jpg',
    alt: 'Bergdorf Goodman print detail',
    caption: 'Close-up production detail.',
  },
]
```

## Current folders

```txt
rolling-green-cannabis/
county-road-cannabis/
claudine-farms-labels/
seagate-lightbox-display/
sticker-label-kit/
mylar-packaging-system/
farmers-brand-system/
```
