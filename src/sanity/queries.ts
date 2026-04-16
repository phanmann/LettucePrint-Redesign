import { groq } from 'next-sanity'

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(order asc)[0...4] {
    _id,
    title,
    slug,
    client,
    service,
    coverImage,
    tags,
  }
`

export const allPortfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    service,
    coverImage,
    description,
    tags,
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc)[0...3] {
    _id,
    name,
    company,
    quote,
    photo,
    rating,
  }
`

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    company,
    quote,
    photo,
    rating,
  }
`

export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    client,
    service,
    coverImage,
    images,
    description,
    tags,
  }
`
