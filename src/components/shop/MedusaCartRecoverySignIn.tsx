'use client'
import {useState} from 'react'
import {medusa} from '@/lib/medusa'
/** Available before cart data loads, so an expired session never traps a private cart behind its own gate. */
export default function MedusaCartRecoverySignIn({onSignedIn}:{onSignedIn:()=>Promise<void>}){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('')
 if(process.env.NEXT_PUBLIC_MEDUSA_PRIVATE_ARTWORK!=='dev-private')return null
 return <form className="space-y-2 border rounded p-4" onSubmit={async e=>{e.preventDefault();setBusy(true);setError('');try{const result=await medusa.auth.login('customer','emailpass',{email,password});if(typeof result!=='string')throw Error('Additional authentication required');await onSignedIn()}catch{setError('Unable to sign in. Check your customer account details and try again.')}finally{setPassword('');setBusy(false)}}}>
 <p>Sign in to the customer account that owns this private cart.</p>
 <label className="block">Customer email<input className="border rounded block p-2 w-full" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label>
 <label className="block">Customer password<input className="border rounded block p-2 w-full" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label>
 <button type="submit" disabled={busy}>{busy?'Signing in…':'Sign in and recover cart'}</button>{error&&<p role="alert">{error}</p>}
 </form>
}
