import { NextRequest, NextResponse } from 'next/server'

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY!
const CLICKUP_LIST_ID = '212512555' // Client Projects — Printing Services space

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service, projectDetails, timeline, contact } = body

    // Build task description
    const description = buildDescription({ service, projectDetails, timeline, contact })

    // Build task name
    const taskName = `[New Quote] ${contact.company ? contact.company + ' — ' : ''}${service} — ${contact.name}`

    const task = {
      name: taskName,
      description,
      status: 'new print',
      priority: timeline === 'asap' ? 1 : timeline === '1-2weeks' ? 2 : 3,
      tags: ['website-quote', service.toLowerCase().replace(/\s+/g, '-')],
      custom_fields: [],
    }

    const res = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('ClickUp error:', err)
      return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
    }

    const created = await res.json()
    return NextResponse.json({ success: true, taskId: created.id, taskUrl: created.url })

  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

function buildDescription({ service, projectDetails, timeline, contact }: {
  service: string
  projectDetails: Record<string, string>
  timeline: string
  contact: { name: string; company?: string; email: string; phone?: string }
}) {
  const timelineLabel: Record<string, string> = {
    'asap':      'ASAP',
    '1-2weeks':  '1–2 weeks',
    '2-4weeks':  '2–4 weeks',
    '1-2months': '1–2 months',
    'flexible':  'Flexible',
  }

  const lines = [
    `## Quote Request — ${service}`,
    '',
    '### Contact',
    `- **Name:** ${contact.name}`,
    contact.company ? `- **Company:** ${contact.company}` : null,
    `- **Email:** ${contact.email}`,
    contact.phone ? `- **Phone:** ${contact.phone}` : null,
    '',
    '### Project Details',
    ...Object.entries(projectDetails)
      .filter(([, v]) => v)
      .map(([k, v]) => `- **${formatKey(k)}:** ${v}`),
    '',
    '### Timeline',
    `- **Deadline:** ${timelineLabel[timeline] ?? timeline}`,
    '',
    '---',
    `*Submitted via lettuceprint.com/get-quote*`,
  ].filter(l => l !== null) as string[]

  return lines.join('\n')
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim()
}
