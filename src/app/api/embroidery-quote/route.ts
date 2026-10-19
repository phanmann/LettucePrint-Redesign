import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { validateEmbroidery } from '@/lib/embroidery-intake'

export const runtime = 'nodejs'
const esc = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]!)

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0)
    if (contentLength > 16 * 1024 * 1024) return NextResponse.json({ error: 'Attachments are too large.' }, { status: 413 })
    const data = await req.formData()
    const raw = data.get('details')
    if (typeof raw !== 'string' || raw.length > 30000) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    let details: unknown
    try { details = JSON.parse(raw) } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
    if (!validateEmbroidery(details)) return NextResponse.json({ error: 'Please check your contact and embroidery details.' }, { status: 400 })
    const x = details
    const files = data.getAll('photos')
    if (files.length > 3 || files.some(f => !(f instanceof File) || f.size > 5 * 1024 * 1024 || !['image/jpeg','image/png','image/webp','application/pdf'].includes(f.type))) {
      return NextResponse.json({ error: 'Attach up to 3 JPG, PNG, WebP, or PDF files, 5 MB each.' }, { status: 400 })
    }
    const attachments = await Promise.all(files.map(async (file, i) => {
      const f = file as File
      const bytes = Buffer.from(await f.arrayBuffer())
      const valid = f.type === 'application/pdf' ? bytes.subarray(0,5).toString() === '%PDF-'
        : f.type === 'image/png' ? bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
        : f.type === 'image/jpeg' ? bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        : f.type === 'image/webp' ? bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP' : false
      if (!valid) throw new Error('Invalid attachment content')
      const ext = ({'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','application/pdf':'.pdf'} as Record<string,string>)[f.type]
      return { filename: `embroidery-reference-${i + 1}${ext}`, content: bytes }
    }))
    const row = (label: string, value: unknown) => `<tr><th style="text-align:left;vertical-align:top;padding:6px 12px 6px 0;color:#555">${esc(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${esc(value)}</td></tr>`
    const garmentRows = x.garments.map((g,i) => `<h3>Garment ${i+1}</h3><table>${[
      row('Supply',g.supply),row('Type',g.type),row('Brand / style / link',g.brand),row('Color',g.color),row('Quantity',g.quantity),row('Sizes',g.sizes),row('Customer garment condition',g.condition)
    ].join('')}</table>`).join('')
    const placementRows = x.placements.map((p,i) => `<h3>Placement ${i+1}</h3><table>${[
      row('Location',p.location),row('Artwork',p.artwork),row('Size',p.recommendSize ? 'Recommend a size' : `${p.width || '—'} × ${p.height || '—'} inches`),row('Method',p.method),row('Apply to garments',p.garments.map(n => `#${n+1}`).join(', ')),row('Personalization',p.personalization)
    ].join('')}</table>`).join('')
    const html = `<div style="font-family:Arial,sans-serif;max-width:720px"><h1>Embroidery quote request</h1><h2>Contact & delivery</h2><table>${[
      row('Name',x.contact.name),row('Email',x.contact.email),row('Company',x.contact.company),row('Phone',x.contact.phone),row('Needed by',x.dueDate || 'Not specified'),row('Date flexible',x.flexible ? 'Yes':'No'),row('Firm deadline',x.firmDeadline ? 'Yes':'No'),row('Fulfillment',x.fulfillment),row('Shipping ZIP',x.zip)
    ].join('')}</table><h2>Garments</h2>${garmentRows}<h2>Placements</h2>${placementRows}<h2>Setup & notes</h2><table>${[
      row('Repeat job',x.repeatJob ? 'Yes':'No'),row('Prior order reference',x.orderReference),row('Machine-ready embroidery file',x.machineFile),row('Thread requirements',x.threadRequirements),row('Notes',x.notes),row('Reference attachments',attachments.map(a => a.filename).join(', ') || 'None')
    ].join('')}</table><p>Submitted via /services/apparel/embroidery</p></div>`
    const sent = await getResend().emails.send({
      from: 'Lettuce Print Website <onboarding@resend.dev>', to: 'info@lettuceprint.com',
      subject: `Embroidery quote request — ${x.contact.name.slice(0,80)}`, html, attachments,
    })
    if (sent.error) return NextResponse.json({ error: 'Unable to deliver request.' }, { status: 502 })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid attachment content') return NextResponse.json({ error: 'One attachment does not match its file type.' }, { status: 400 })
    console.error('Embroidery quote submission error:', error)
    return NextResponse.json({ error: 'Submission failed.' }, { status: 500 })
  }
}
