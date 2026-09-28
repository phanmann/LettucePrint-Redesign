'use client'
import {useEffect,useState} from 'react'
import {medusa} from '@/lib/medusa'
import {createCartId} from '@/lib/cart-id'
type Receipt={receiptId:string;filename:string}
export default function MedusaArtwork({cartId,lineId,filename,receiptId,onBusy,onSaved}:{cartId:string;lineId:string;filename?:string;receiptId?:string;onBusy:(busy:boolean)=>void;onSaved:()=>Promise<void>}){
 const [error,setError]=useState(''),[busy,setBusy]=useState(false),[receipt,setReceipt]=useState<Receipt>(),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[signedIn,setSignedIn]=useState(false)
 const enabled=process.env.NEXT_PUBLIC_MEDUSA_PRIVATE_ARTWORK==='dev-private',base=`/store/carts/${cartId}/line-items/${lineId}/artwork`,storage=`lp-private-artwork:${cartId}:${lineId}`
 useEffect(()=>{const timer=setTimeout(()=>{try{const saved=sessionStorage.getItem(storage+':receipt');if(saved)setReceipt(JSON.parse(saved) as Receipt)}catch{}},0);return ()=>clearTimeout(timer)},[storage])
 async function attach(value:Receipt){await medusa.client.fetch(base,{method:'POST',body:{receiptId:value.receiptId}});await onSaved();sessionStorage.removeItem(storage+':receipt');sessionStorage.removeItem(storage+':request');setReceipt(undefined)}
 async function run(action:()=>Promise<void>){setBusy(true);onBusy(true);setError('');try{await action()}catch{setError('Unable to finish. Sign in as this cart’s owner and retry the same file or saved attachment. Do not start another upload after an uncertain result.')}finally{setBusy(false);onBusy(false)}}
 async function upload(file:File){
 if(file.size>2*1024*1024||! /\.(png|pdf)$/i.test(file.name))throw Error('Only PNG/PDF up to 2 MB')
 const saved=sessionStorage.getItem(storage+':receipt');if(saved){const value=JSON.parse(saved) as Receipt;setReceipt(value);await attach(value);return}
 const fingerprint=`${file.name}:${file.size}:${file.lastModified}`,key=storage+':request';let attempt:{fingerprint:string;requestId:string}|null=null
 try{attempt=JSON.parse(sessionStorage.getItem(key)||'null')}catch{}
 if(attempt&&attempt.fingerprint!==fingerprint)throw Error('Previous attempt must be reconciled first')
 if(!attempt){attempt={fingerprint,requestId:createCartId()};sessionStorage.setItem(key,JSON.stringify(attempt))}
 const contentBase64=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=reject;reader.readAsDataURL(file)})
 const value=await medusa.client.fetch<Receipt>(base+'/uploads',{method:'POST',body:{requestId:attempt.requestId,filename:file.name,contentBase64}})
 sessionStorage.setItem(storage+':receipt',JSON.stringify(value));setReceipt(value);await attach(value);sessionStorage.removeItem(key)
 }
 async function download(){if(!receiptId)return;const result=await medusa.client.fetch<{url:string}>(`/store/print-artwork/${receiptId}/download`);const a=document.createElement('a');a.href=result.url;a.target='_blank';a.rel='noopener noreferrer';a.referrerPolicy='no-referrer';a.click()}
 return <div className="mt-3 space-y-2"><p>{filename?`Artwork attached: ${filename}`:'No artwork attached. Production requires artwork and proof approval.'}</p>{!enabled?<p>Private artwork uploads are unavailable in this preview.</p>:<>
 {!signedIn&&<div className="space-y-2"><p>Sign in to your customer account to privately link artwork to this cart.</p><label>Email<input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="block border p-2"/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="block border p-2"/></label><button type="button" disabled={busy||!email||!password} onClick={()=>void run(async()=>{const result=await medusa.auth.login('customer','emailpass',{email,password});setPassword('');if(typeof result!=='string')throw Error('Additional authentication required');await medusa.store.cart.transferCart(cartId);setSignedIn(true)})}>Sign in and link this cart</button></div>}
 <label className="block">Upload private PNG or PDF (up to 2 MB)<input type="file" disabled={busy||!signedIn||!!receipt} accept=".png,.pdf" onChange={e=>{const file=e.target.files?.[0];if(file)void run(()=>upload(file))}}/></label>
 {receipt&&<button type="button" disabled={busy} onClick={()=>void run(()=>attach(receipt))}>Retry saved attachment</button>}
 {receiptId&&<button type="button" disabled={busy} onClick={()=>void run(download)}>Download private artwork</button>}
 </>}{error&&<p role="alert">{error}</p>}</div>
}
