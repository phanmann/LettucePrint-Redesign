import { defineType, defineField } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    // ── Identifiers ────────────────────────────────────────────────
    defineField({
      name: 'stripeSessionId',
      title: 'Stripe Session ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      readOnly: true,
    }),

    // ── Customer ───────────────────────────────────────────────────
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),

    // ── Product details ────────────────────────────────────────────
    defineField({
      name: 'productName',
      title: 'Product',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
    }),
    defineField({
      name: 'finish',
      title: 'Finish',
      type: 'string',
    }),
    defineField({
      name: 'rush',
      title: 'Production Speed',
      type: 'string',
    }),
    defineField({
      name: 'amountPaidCents',
      title: 'Amount Paid (cents)',
      type: 'number',
      readOnly: true,
    }),

    // ── Artwork ────────────────────────────────────────────────────
    defineField({
      name: 'artworkUrl',
      title: 'Artwork File URL',
      type: 'url',
      description: 'Uploaded by customer after checkout',
    }),
    defineField({
      name: 'artworkFilename',
      title: 'Artwork Filename',
      type: 'string',
    }),
    defineField({
      name: 'artworkUploadedAt',
      title: 'Artwork Uploaded At',
      type: 'datetime',
    }),

    // ── Proof ──────────────────────────────────────────────────────
    defineField({
      name: 'proofUrl',
      title: 'Proof File URL',
      type: 'url',
      description: 'Upload the proof PDF/image here, then save to trigger customer email',
    }),
    defineField({
      name: 'proofFilename',
      title: 'Proof Filename',
      type: 'string',
    }),
    defineField({
      name: 'proofToken',
      title: 'Proof Approval Token',
      type: 'string',
      description: 'Auto-generated. Used in the customer approval URL.',
      readOnly: true,
    }),
    defineField({
      name: 'proofSentAt',
      title: 'Proof Sent At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'proofStatus',
      title: 'Proof Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Changes Requested', value: 'changes_requested' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'proofFeedback',
      title: 'Customer Feedback',
      type: 'text',
      description: 'Populated when customer requests changes',
      rows: 3,
    }),
    defineField({
      name: 'proofRespondedAt',
      title: 'Proof Responded At',
      type: 'datetime',
      readOnly: true,
    }),

    // ── Status ─────────────────────────────────────────────────────
    defineField({
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: '💳 Paid', value: 'paid' },
          { title: '📁 Artwork Received', value: 'artwork_received' },
          { title: '🎨 Proof Sent', value: 'proof_sent' },
          { title: '✅ Proof Approved', value: 'proof_approved' },
          { title: '📧 Final Proof Sent', value: 'final_proof_sent' },
          { title: '🖨️ In Production', value: 'in_production' },
          { title: '📦 Shipped', value: 'shipped' },
        ],
        layout: 'radio',
      },
      initialValue: 'paid',
    }),

    // ── Notes ──────────────────────────────────────────────────────
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 4,
      description: 'Only visible in Studio — not shared with customer',
    }),

    // ── Timestamps ─────────────────────────────────────────────────
    defineField({
      name: 'paidAt',
      title: 'Paid At',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'customerEmail',
      subtitle: 'orderStatus',
      media: 'productName',
    },
    prepare({ title, subtitle }) {
      const statusEmoji: Record<string, string> = {
        paid: '💳',
        artwork_received: '📁',
        proof_sent: '🎨',
        proof_approved: '✅',
        final_proof_sent: '📧',
        in_production: '🖨️',
        shipped: '📦',
      }
      return {
        title: title ?? 'Unknown customer',
        subtitle: statusEmoji[subtitle] ? `${statusEmoji[subtitle]} ${subtitle?.replace(/_/g, ' ')}` : subtitle,
      }
    },
  },

  orderings: [
    {
      title: 'Newest first',
      name: 'paidAtDesc',
      by: [{ field: 'paidAt', direction: 'desc' }],
    },
  ],
})
