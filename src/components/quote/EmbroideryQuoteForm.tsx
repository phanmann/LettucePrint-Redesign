'use client'

import { useRef, useState, type FormEvent } from 'react'
import type { Garment, Placement } from '@/lib/embroidery-intake'

const input = 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-lp-green focus:outline-none focus:ring-2 focus:ring-lp-green/20'
const label = 'block text-sm font-semibold text-gray-700 mb-2'
const initialGarment = (): Garment => ({ supply:'help', type:'', brand:'', color:'', quantity:1, sizes:'', condition:'unsure' })
const initialPlacement = (): Placement => ({ location:'', artwork:'help', width:'', height:'', recommendSize:true, method:'help', garments:[0], personalization:'' })
const choices = (items: [string,string][]) => items.map(([value,text]) => <option key={value} value={value}>{text}</option>)

export default function EmbroideryQuoteForm() {
  const [garments,setGarments] = useState<Garment[]>([initialGarment()])
  const [placements,setPlacements] = useState<Placement[]>([initialPlacement()])
  const [fulfillment,setFulfillment] = useState('unsure')
  const [repeatJob,setRepeatJob] = useState(false)
  const [files,setFiles] = useState<File[]>([])
  const [busy,setBusy] = useState(false)
  const [done,setDone] = useState(false)
  const [error,setError] = useState('')
  const pending = useRef(false)
  const garment = (index:number, patch:Partial<Garment>) => setGarments(rows => rows.map((g,i) => i===index ? {...g,...patch}:g))
  const placement = (index:number, patch:Partial<Placement>) => setPlacements(rows => rows.map((p,i) => i===index ? {...p,...patch}:p))
  const removeGarment = (index:number) => {
    setGarments(rows => rows.filter((_,i) => i!==index))
    setPlacements(rows => rows.map(p => ({...p, garments:p.garments.filter(n => n!==index).map(n => n>index ? n-1:n)})))
  }
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending.current) return
    const form = new FormData(e.currentTarget)
    const get = (key:string) => String(form.get(key) ?? '').trim()
    if (placements.some(p => !p.garments.length)) { setError('Choose at least one garment for each placement.'); return }
    if (files.length > 3 || files.some(f => f.size > 5*1024*1024 || !['image/jpeg','image/png','image/webp','application/pdf'].includes(f.type))) { setError('Attach up to 3 JPG, PNG, WebP, or PDF files, 5 MB each.'); return }
    const payload = { contact:{name:get('name'),email:get('email'),company:get('company'),phone:get('phone')}, dueDate:get('dueDate'), flexible:form.has('flexible'), firmDeadline:form.has('firmDeadline'), fulfillment, zip:get('zip'), garments, placements, repeatJob, orderReference:get('orderReference'), machineFile:get('machineFile'), threadRequirements:get('threadRequirements'), notes:get('notes') }
    const body = new FormData()
    body.set('details',JSON.stringify(payload))
    files.forEach(file => body.append('photos',file))
    pending.current=true; setBusy(true); setError('')
    try {
      const response = await fetch('/api/embroidery-quote',{method:'POST',body})
      if (!response.ok) { const result = await response.json().catch(() => ({})); throw new Error(result.error || 'Submission failed.') }
      setDone(true)
    } catch (err) { setError(err instanceof Error ? err.message : 'Submission failed. Please email info@lettuceprint.com.') }
    finally { pending.current=false; setBusy(false) }
  }
  if (done) return <div role="status" className="rounded-xl border border-lp-green/30 bg-lp-green/5 p-8"><h2 className="text-2xl font-semibold">Request received</h2><p className="mt-3 text-gray-600">Our team will review your garments, placements, artwork, and timing and follow up with a quote. This is not an order.</p></div>
  return <form onSubmit={submit} aria-label="Embroidery quote request" aria-busy={busy} className="space-y-10">
    <p className="text-sm text-gray-600">Only name, email, a garment, and a placement are needed to start. Unsure about a spec? Choose “Help me choose.” This is a quote request, not an order.</p>
    <fieldset disabled={busy} className="grid gap-5 sm:grid-cols-2"><legend className="text-2xl font-semibold mb-5">Contact & timing</legend>
      <div><label className={label} htmlFor="emb-name">Name *</label><input className={input} id="emb-name" name="name" required maxLength={300} autoComplete="name" /></div>
      <div><label className={label} htmlFor="emb-email">Email *</label><input className={input} id="emb-email" name="email" type="email" required maxLength={300} autoComplete="email" /></div>
      <div><label className={label} htmlFor="emb-company">Company (optional)</label><input className={input} id="emb-company" name="company" maxLength={300} autoComplete="organization" /></div>
      <div><label className={label} htmlFor="emb-phone">Phone (optional)</label><input className={input} id="emb-phone" name="phone" type="tel" maxLength={300} autoComplete="tel" /></div>
      <div><label className={label} htmlFor="emb-date">Needed by (if known)</label><input className={input} id="emb-date" name="dueDate" type="date" /></div>
      <div className="flex flex-col justify-center gap-3"><label><input type="checkbox" name="flexible" className="mr-2" />Date is flexible</label><label><input type="checkbox" name="firmDeadline" className="mr-2" />This is a firm deadline</label></div>
      <div><label className={label} htmlFor="emb-fulfillment">Receiving your order</label><select className={input} id="emb-fulfillment" value={fulfillment} onChange={e=>setFulfillment(e.target.value)}>{choices([['unsure','Help me decide'],['pickup','Brooklyn pickup'],['shipping','Shipping']])}</select></div>
      {fulfillment==='shipping' && <div><label className={label} htmlFor="emb-zip">Shipping ZIP *</label><input className={input} id="emb-zip" name="zip" inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" required maxLength={10} /></div>}
    </fieldset>
    <fieldset disabled={busy} className="space-y-5"><legend className="text-2xl font-semibold mb-5">Garments</legend>
      {garments.map((g,i)=><div key={i} className="rounded-xl border border-gray-200 p-5 space-y-4"><div className="flex justify-between items-center"><h3 className="font-semibold">Garment {i+1}</h3>{garments.length>1 && <button type="button" onClick={()=>removeGarment(i)} className="text-sm text-red-700 underline">Remove</button>}</div><div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor={`g-supply-${i}`}>Who supplies it?</label><select className={input} id={`g-supply-${i}`} value={g.supply} onChange={e=>garment(i,{supply:e.target.value})}>{choices([['help','Help me choose'],['lettuce-print','Lettuce Print'],['customer','I supply it']])}</select></div>
        <div><label className={label} htmlFor={`g-type-${i}`}>Garment type *</label><input className={input} id={`g-type-${i}`} value={g.type} onChange={e=>garment(i,{type:e.target.value})} required maxLength={300} placeholder="Hat, polo, hoodie…" /></div>
        <div><label className={label} htmlFor={`g-brand-${i}`}>Brand, style, or product link (optional)</label><input className={input} id={`g-brand-${i}`} value={g.brand} onChange={e=>garment(i,{brand:e.target.value})} maxLength={500} /></div>
        <div><label className={label} htmlFor={`g-color-${i}`}>Garment color (optional)</label><input className={input} id={`g-color-${i}`} value={g.color} onChange={e=>garment(i,{color:e.target.value})} maxLength={300} /></div>
        <div><label className={label} htmlFor={`g-qty-${i}`}>Quantity *</label><input className={input} id={`g-qty-${i}`} type="number" min={1} max={100000} value={g.quantity} onChange={e=>garment(i,{quantity:Number(e.target.value)})} required /></div>
        <div><label className={label} htmlFor={`g-sizes-${i}`}>Size breakdown (optional)</label><input className={input} id={`g-sizes-${i}`} value={g.sizes} onChange={e=>garment(i,{sizes:e.target.value})} maxLength={500} placeholder="S: 5, M: 10…" /></div>
        {g.supply==='customer' && <div><label className={label} htmlFor={`g-condition-${i}`}>Your garments are</label><select className={input} id={`g-condition-${i}`} value={g.condition} onChange={e=>garment(i,{condition:e.target.value})}>{choices([['unsure','Unsure'],['new','New'],['worn','Previously worn']])}</select></div>}
      </div></div>)}
      {garments.length<12 && <button type="button" onClick={()=>setGarments([...garments,initialGarment()])} className="font-semibold text-lp-green underline">+ Add another garment</button>}
    </fieldset>
    <fieldset disabled={busy} className="space-y-5"><legend className="text-2xl font-semibold mb-5">Embroidery placements</legend>
      {placements.map((p,i)=><div key={i} className="rounded-xl border border-gray-200 p-5 space-y-4"><div className="flex justify-between items-center"><h3 className="font-semibold">Placement {i+1}</h3>{placements.length>1 && <button type="button" onClick={()=>setPlacements(placements.filter((_,n)=>n!==i))} className="text-sm text-red-700 underline">Remove</button>}</div><div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor={`p-location-${i}`}>Location *</label><input className={input} id={`p-location-${i}`} value={p.location} onChange={e=>placement(i,{location:e.target.value})} required maxLength={300} placeholder="Left chest, hat front…" /></div>
        <div><label className={label} htmlFor={`p-art-${i}`}>Do you have artwork?</label><select className={input} id={`p-art-${i}`} value={p.artwork} onChange={e=>placement(i,{artwork:e.target.value})}>{choices([['help','Need help / unsure'],['yes','Yes'],['no','No']])}</select></div>
        <div><label className={label} htmlFor={`p-method-${i}`}>Embroidery type</label><select className={input} id={`p-method-${i}`} value={p.method} onChange={e=>placement(i,{method:e.target.value})}>{choices([['help','Help me choose'],['flat','Flat'],['puff','Puff'],['patch','Patch']])}</select></div>
        <div><label className="flex items-center gap-2 mt-8"><input type="checkbox" checked={p.recommendSize} onChange={e=>placement(i,{recommendSize:e.target.checked})} />Recommend a size</label></div>
        {!p.recommendSize && <><div><label className={label} htmlFor={`p-width-${i}`}>Width (inches) *</label><input className={input} id={`p-width-${i}`} type="number" min="0.01" max="100" step="0.01" required value={p.width} onChange={e=>placement(i,{width:e.target.value})} maxLength={20} inputMode="decimal" /></div><div><label className={label} htmlFor={`p-height-${i}`}>Height (inches) *</label><input className={input} id={`p-height-${i}`} type="number" min="0.01" max="100" step="0.01" required value={p.height} onChange={e=>placement(i,{height:e.target.value})} maxLength={20} inputMode="decimal" /></div></>}
        <div className="sm:col-span-2"><span className={label}>Apply to garments *</span><div className="flex flex-wrap gap-4">{garments.map((g,n)=><label key={n}><input type="checkbox" checked={p.garments.includes(n)} onChange={e=>placement(i,{garments:e.target.checked ? [...p.garments,n].sort((a,b)=>a-b) : p.garments.filter(v=>v!==n)})} className="mr-2" />#{n+1} {g.type || 'Garment'}</label>)}</div></div>
        <div className="sm:col-span-2"><label className={label} htmlFor={`p-personal-${i}`}>Personalization (optional)</label><input className={input} id={`p-personal-${i}`} value={p.personalization} onChange={e=>placement(i,{personalization:e.target.value})} maxLength={1000} placeholder="Names, numbers, individual variations…" /></div>
      </div></div>)}
      {placements.length<12 && <button type="button" onClick={()=>setPlacements([...placements,initialPlacement()])} className="font-semibold text-lp-green underline">+ Add another placement</button>}
    </fieldset>
    <fieldset disabled={busy} className="space-y-5"><legend className="text-2xl font-semibold mb-5">Setup & references</legend>
      <label className="block"><input type="checkbox" checked={repeatJob} onChange={e=>setRepeatJob(e.target.checked)} className="mr-2" />This is a repeat job</label>
      {repeatJob && <div><label className={label} htmlFor="emb-ref">Previous order reference (optional)</label><input className={input} id="emb-ref" name="orderReference" maxLength={300} /></div>}
      <div><label className={label} htmlFor="emb-file">Machine-ready embroidery file?</label><select className={input} id="emb-file" name="machineFile" defaultValue="unsure">{choices([['unsure','Unsure'],['yes','Yes'],['no','No']])}</select><p className="text-xs text-gray-500 mt-1">We’ll review your artwork and discuss any setup or digitizing needs before pricing.</p></div>
      <div><label className={label} htmlFor="emb-thread">Thread colors or matching requirements (optional)</label><textarea className={input} id="emb-thread" name="threadRequirements" rows={2} maxLength={1000} /></div>
      <div><label className={label} htmlFor="emb-notes">Anything else? (optional)</label><textarea className={input} id="emb-notes" name="notes" rows={3} maxLength={4000} /></div>
      <div><label className={label} htmlFor="emb-photos">Reference photos or artwork (optional)</label><input className={input} id="emb-photos" type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={e=>setFiles(Array.from(e.target.files ?? []))} /><p className="text-xs text-gray-500 mt-1">Up to 3 files, 5 MB each. JPG, PNG, WebP, or PDF. Sent only to our quote team.</p></div>
    </fieldset>
    {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
    <button type="submit" disabled={busy} className="rounded-lg bg-lp-green px-8 py-4 font-semibold text-white disabled:opacity-60">{busy ? 'Sending request…' : 'Request embroidery quote'}</button>
  </form>
}
