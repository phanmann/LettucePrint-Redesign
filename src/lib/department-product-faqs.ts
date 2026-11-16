import type { Faq } from '@/lib/sticker-catalog'

type Detail = { label: string; value: string }
type Options = { label: string; options: { label: string }[] }

// Answers use the same product data as the visible specifications/configurator.
// Deliberately omit turnaround, minimums, compliance and marketing superlatives.
export function departmentProductFaqs({ path, name, specs, artworkRequirements, optionGroups = [], priced = false }: {
  path: string; name: string; specs: Detail[]; artworkRequirements: Detail[]; optionGroups?: Options[]; priced?: boolean
}): Faq[] {
  if (!/^\/shop\/(marketing-materials|signage|packaging)\//.test(path)) return []
  const detail = (labels: string[]) => specs.filter(s => labels.includes(s.label)).map(s => `${s.label}: ${s.value}`).join('; ')
  const options = (labels: string[]) => optionGroups.filter(g => labels.includes(g.label)).map(g => `${g.label}: ${g.options.map(o => o.label).join(', ')}`).join('; ')
  let first: Faq
  if (path.includes('/backdrops/')) {
    first = { q: 'Does this backdrop include a frame or just the graphic?', a: `Choose the package that matches your setup: ${options(['Package'])}. A replacement graphic does not include a frame; confirm the display system and size before ordering a replacement.` }
  } else if (/retractable|x-stand/.test(path)) {
    first = { q: 'Can I order a complete stand or a replacement print?', a: `${options(['Package'])}. Choose the full kit for a new display, or the appropriate print-only or hardware-only package for an existing setup. Check the size and stand type before ordering replacement parts.` }
  } else if (path.includes('/banners/vinyl')) {
    first = { q: 'How is the vinyl banner finished for hanging?', a: 'Hemmed edges and grommets every 24 inches are included. Keep important text and logos within the artwork safe zone so hems and grommets do not cover them.' }
  } else if (path.includes('/banners/mesh')) {
    first = { q: 'Why choose a mesh banner for an outdoor display?', a: 'The perforated mesh allows wind to pass through the print. Share your installation size and mounting plan when requesting a quote so the banner can be specified for your location.' }
  } else if (path.includes('/banners/fabric')) {
    first = { q: 'What makes the fabric banner different from vinyl?', a: 'This banner uses soft, lightweight, wrinkle-resistant fabric with dye-sublimation printing. It suits displays where you want a fabric look rather than a vinyl surface.' }
  } else if (path.includes('/mylar-bags/standard')) {
    first = { q: 'Which mylar bag size has online pricing?', a: 'The standard bag is the 4 × 5 inch eighth-size pouch. Other sizes, metallic effects, holographic effects and specialty constructions are quoted separately; they are not included in the standard online price.' }
  } else if (path.includes('/mylar-bags/die-cut')) {
    first = { q: 'How do I specify a custom-shaped mylar bag?', a: 'Provide your dieline or describe the shape you want. Include the intended product and dimensions so the shape, usable space and seal can be reviewed together before production.' }
  } else if (path.includes('/boxes/')) {
    const structures: Record<string, string> = {
      'box-sleeve': 'A printed sleeve wraps around an existing box. Send the dimensions of that box so the sleeve can be sized to fit.',
      'mailer-box': 'Mailer boxes are intended for e-commerce, subscription packaging and brand gifting. Share the product dimensions and any inserts needed when requesting a size.',
      'rsc-box': 'An RSC box is a regular slotted carton. Share the packed product dimensions and intended use so the box size and material can be confirmed.',
      'folding-carton': 'A folding carton is a folded retail packaging structure. Share the product dimensions and how it will be packed so the dieline can be planned.',
      'magnetic-closure-box': 'This box uses a magnetic closure for a presentation-style package. Share product dimensions and any insert requirements when requesting a quote.',
      'lid-base-box': 'This is a two-piece box with a separate lid and base. Share product dimensions and the fit you want so both pieces can be specified together.',
    }
    first = { q: `How should I size my ${name.toLowerCase()}?`, a: structures[path.split('/').pop()!] }
  } else if (path.includes('/booklets/')) {
    first = { q: 'How do binding and page count affect my booklet quote?', a: `${detail(['Binding', 'Cover', 'Interior'])}. Select your page count or request a custom count. The page count and binding combination are reviewed with the quote before production.` }
  } else if (path.includes('/brochures/')) {
    first = { q: 'How should I plan artwork around the brochure folds?', a: 'Plan the reading order across the cover, inside panels and back. Keep important text away from folds and trim edges, and confirm the panel layout before final artwork. Where the size is marked as flat, it describes the sheet before folding.' }
  } else if (path.includes('/flyers/')) {
    first = { q: 'Are half-page and full-page flyers ordered the same way?', a: 'Half-page flyers are quoted individually. The larger sheet sizes have online pricing with Standard or Premium stock. Changing the size can change the available paper options and pricing flow.' }
  } else {
    first = { q: `How do I prepare a design for ${name.toLowerCase()}?`, a: 'Build the design at your chosen print size and keep essential text inside the safe zone. Use the paper and finish options below to choose the look you want, and review the proof before production.' }
  }
  const sizeMaterial = options(['Size', 'Paper', 'Stock']) || detail(['Size', 'Sizes', 'Flat sizes', 'Material', 'Stock', 'Graphic', 'Hardware'])
  const finish = options(['Finish', 'Print', 'Seal', 'Cover', 'Interior', 'Laminate', 'Hardware', 'Material']) || detail(['Finish', 'Included', 'Cover', 'Graphic', 'Hardware'])
  return [first,
    { q: `What sizes or materials are available for ${name.toLowerCase()}?`, a: `${sizeMaterial || detail(['Material', 'Cut', 'Cover', 'Interior'])}. For a different size or construction, request a custom quote before preparing final artwork.` },
    { q: 'Which print, finish or display options can I choose?', a: `${finish || 'Use the options shown in the configurator for this product'}. Options depend on the product and package selected; review your configuration before adding it to the cart.` },
    { q: `What artwork should I supply for ${name.toLowerCase()}?`, a: artworkRequirements.map(r => `${r.label}: ${r.value}`).join('; ') + (path.includes('/signage/') || path.includes('/packaging/') ? '. For a replacement graphic or shaped package, confirm the matching template before laying out the design.' : '. Keep text clear of trim edges and any folds, and check the layout on your proof.') },
    { q: 'How is my configuration priced and reviewed?', a: priced ? 'The configurator shows pricing for the available selections. Review the selected size, options and quantity before adding to cart. Custom requests need a separate quote; production timing is confirmed for your order, not a guaranteed delivery date.' : 'This product is priced by quote. Choose the available options and provide your dimensions, quantity and artwork needs so pricing and production timing can be confirmed before production.' },
  ]
}

export const businessCardFaqs = (premium: boolean): Faq[] => [
  { q: `What distinguishes ${premium ? 'premium' : 'standard'} business cards?`, a: premium ? 'Premium cards offer Soft Touch, Raised Spot Gloss, Raised Foil and Extra Thick choices. Choose the treatment in the calculator to see the stock and pricing available for that option.' : 'Standard cards offer Matte, Gloss and Uncoated finishes on 14 pt or 16 pt stock. Choose the paper and finish in the calculator before selecting your quantity.' },
  { q: 'What is the business card size?', a: 'The standard size is 3.5 × 2 inches. Lay out the design at that finished size, with 0.125 inch bleed on every side and important text at least 0.125 inch inside the edges.' },
  { q: 'What if I need a different size or corner treatment?', a: 'The calculator is for the standard card format shown. Request a custom quote for a different size or corner treatment so availability and pricing can be confirmed before ordering.' },
  { q: 'What files should I provide?', a: 'AI, PDF and EPS are preferred. PSD, PNG and JPG are accepted at 300 DPI minimum; CMYK is preferred. For specialty effects, ask how to prepare the effect artwork before finalizing the file.' },
  { q: 'Will I review a proof before the cards are printed?', a: 'A digital proof is included before production. Check names, contact details, text placement and any specialty-effect areas carefully before approving.' },
]

export const postcardFaqs: Faq[] = [
  { q: 'How do I choose a postcard size?', a: 'Choose 4 × 6, 5 × 7 or 6 × 9 inches in the calculator before selecting stock and quantity. If the card is intended for mailing, confirm the mailing layout and address area before final artwork.' },
  { q: 'Where should text and artwork sit on a postcard?', a: 'Extend the background through the 0.125 inch bleed on all sides. Keep essential text at least 0.125 inch inside the trim edge so it is not too close to the cut.' },
  { q: 'What files work best for postcard printing?', a: 'AI, PDF and EPS are preferred. PSD, PNG and JPG are accepted at 300 DPI minimum. Supply artwork sized for the postcard you select and use CMYK where possible.' },
  { q: 'How do I compare postcard options and prices?', a: 'Standard stock is 100 lb. gloss cover; Premium is 16 pt C2S cover. Use the size, stock and quantity controls to compare the displayed order total. Review the configuration before adding it to the cart; shipping is calculated separately at checkout.' },
  { q: 'Can I check the postcard before production?', a: 'A digital proof is included before production. Check both the content and placement of the design, including any address or mailing area, before approving it.' },
]

export const biFoldFaqs: Faq[] = [
  { q: 'How many panels does a bi-fold brochure have?', a: 'A bi-fold brochure folds once to create four panels. Plan the front, inside spread and back as a connected reading sequence.' },
  { q: 'Which specifications should I choose for a quote?', a: 'Select the size, paper stock, finish and lamination in the form, then enter your quantity. These selections are carried into your quote request.' },
  { q: 'How should I lay out the fold?', a: 'Keep important text clear of the center fold and trim edges. Confirm the flat dimensions and panel layout before preparing the final artwork.' },
  { q: 'Can I include artwork with my request?', a: 'Use the artwork option on the quote card if you already have a file. If you need layout help, describe the content and design work needed in your request.' },
  { q: 'Does requesting a quote place an order?', a: 'No. The selected options go to the quote request flow. Pricing and production timing are confirmed before you order.' },
]

export const customPackagingFaqs: Faq[] = [
  { q: 'What should I share to start a custom packaging project?', a: 'Share the product dimensions, desired packaging structure, quantity and finish ideas. Include how the product will fit inside and any inserts or assembly needs.' },
  { q: 'Do I need a finished dieline?', a: 'You can start with your own dieline or describe the structure you need. The consultation helps establish the dimensions and structure before final print artwork.' },
  { q: 'Can I discuss finishes before choosing a box?', a: 'Yes. Include the finish ideas you are considering, such as soft-touch laminate, spot UV, foil or embossing. The appropriate material and finish combination is confirmed for the project.' },
  { q: 'Can I upload references for the consultation?', a: 'The consultation form accepts project details and reference files. Include drawings, artwork or packaging examples that explain the direction you want.' },
  { q: 'Is the consultation a checkout or confirmed order?', a: 'No. It starts a project discussion. Structure, materials, quantity, pricing and timing need to be confirmed for your packaging before production.' },
]

export const tentFaqs = (size: '10x10' | '20x10'): Faq[] => [
  { q: `What is included with the ${size === '10x10' ? '10 × 10' : '20 × 10'} canopy tent?`, a: 'The full kit includes a printed canopy and frame. Select the full kit, replacement printed fabric top or replacement frame in the configurator; the replacement packages do not include the other part.' },
  { q: 'Which walls can I add to a full tent kit?', a: 'Choose no backwall, a single-sided backwall or a double-sided backwall. Side walls are sold as a pair, with half-wall or full-wall options and single- or double-sided printing.' },
  { q: 'Are flag holders and a wheel bag included?', a: 'They are optional full-kit accessories. Choose zero, one or two flag holders and whether to add the premium wheel bag. Review the configured total for your selections.' },
  { q: 'Can I add accessories to a replacement top or frame?', a: 'Replacement packages are offered without the full-kit accessories and use standard production. Choose the matching tent size and confirm compatibility before ordering replacement parts.' },
  { q: 'Does a production option mean delivery on that day?', a: 'No. Production timing and shipping transit are separate. Printed orders require proof approval, and fulfillment timing for frame-only orders is confirmed after ordering. Shipping is quoted to your address.' },
]
