'use client'
import {useCallback,useEffect,useRef,useState} from 'react'
import {Elements,PaymentElement,useElements,useStripe} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import type {HttpTypes} from '@medusajs/types'
import {clearPrintCart,getPrintCart,medusa,publishPrintCart,retrievePrintCart} from '@/lib/medusa'
import {recoverCheckout} from '@/lib/medusa-recovery'
import MedusaCartRecoverySignIn from './MedusaCartRecoverySignIn'
import MedusaArtwork from './MedusaArtwork'
const stripePromise=process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY):null
const attemptKey='lp_medusa_payment_attempt'
function Pay({cart,secret,onComplete}:{cart:HttpTypes.StoreCart;secret:string;onComplete:(id:string)=>void}){
 const stripe=useStripe(),elements=useElements(),lock=useRef(false)
 const [error,setError]=useState(''),[busy,setBusy]=useState(false),[checking,setChecking]=useState(true)
 const check=useCallback(async()=>{
  if(!stripe)return
  setChecking(true)
  const result=await recoverCheckout(async()=>{const result=await stripe.retrievePaymentIntent(secret);if(result.error||!result.paymentIntent)throw Error('Unable to verify payment. Check again before paying.');return result.paymentIntent},()=>medusa.store.cart.complete(cart.id))
  if(result.kind==='complete'){clearPrintCart();onComplete(result.orderId);return}
  if(result.kind==='retry'||result.kind==='action'){localStorage.removeItem(attemptKey);setChecking(false);setError(result.kind==='action'?'Complete the authentication for this payment.':'');return}
  setError(result.kind==='pending'?'Payment is processing. Check status again; do not pay again.':'Payment needs support. Your cart is preserved; do not start another payment.')
 },[stripe,secret,cart.id,onComplete])
 useEffect(()=>{if(stripe)void check().catch(e=>setError(e instanceof Error?e.message:'Unable to check payment'))},[stripe,check])
 async function pay(){
  if(!stripe||!elements||lock.current||checking)return
  lock.current=true;setBusy(true);setError('')
  try{
   // Persist before network I/O: an ambiguous timeout must recover, not reconfirm.
   localStorage.setItem(attemptKey,cart.id);setChecking(true)
   const result=await stripe.confirmPayment({elements,confirmParams:{return_url:window.location.origin+'/cart'},redirect:'if_required'})
   await check()
   if(result.error)setError(result.error.message||'Payment could not be confirmed.')
  }catch(e){setError(e instanceof Error?e.message:'Unable to verify payment. Check status before trying again.')}
  finally{lock.current=false;setBusy(false)}
 }
 return <div className="space-y-4"><PaymentElement/>{error&&<p role="alert">{error}</p>}{checking?<button disabled={busy||!stripe} onClick={()=>{setBusy(true);void check().catch(e=>setError(e instanceof Error?e.message:'Unable to verify payment')).finally(()=>setBusy(false))}}>Check payment / finish order</button>:<button disabled={busy||!stripe} onClick={()=>void pay()} className="bg-black text-white rounded p-3">{busy?'Processing…':'Pay and place order'}</button>}</div>
}
export default function MedusaCart(){
 const [cart,setCart]=useState<HttpTypes.StoreCart|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false),[clientSecret,setClientSecret]=useState(''),[order,setOrder]=useState(''),[uploads,setUploads]=useState<Record<string,boolean>>({})
 const [address,setAddress]=useState({email:'',first_name:'',last_name:'',address_1:'',city:'',province:'',postal_code:''})
 const finishOrder=useCallback((id:string)=>{setOrder(id);window.scrollTo(0,0)},[])
 const uploadBusy=Object.values(uploads).some(Boolean),locked=Boolean(cart?.payment_collection?.id)
 const accept=useCallback((updated:HttpTypes.StoreCart)=>{
  setCart(updated);publishPrintCart(updated)
  const session=updated.payment_collection?.payment_sessions?.find(s=>s.provider_id==='pp_stripe_stripe')
  const secret=session?.data?.client_secret
  if(typeof secret==='string')setClientSecret(secret)
 },[])
 const load=useCallback(async()=>{
  try{setError('');const updated=await getPrintCart()
   if(updated.completed_at){const result=await medusa.store.cart.complete(updated.id);if(result.type==='order'){clearPrintCart();finishOrder(result.order.id);return}throw Error('Completed cart requires order recovery')}
   accept(updated)
  }catch{setError('Unable to load your saved cart. It has not been deleted. Retry when the connection is available.')}
 },[accept,finishOrder])
 useEffect(()=>{void load()},[load])
 async function refresh(){if(cart)accept(await retrievePrintCart(cart.id))}
 async function checkout(){
  if(!cart||uploadBusy||busy)return;setBusy(true);setError('')
  try{
   if(!stripePromise)throw Error('Payment is unavailable in this preview.')
   if(localStorage.getItem(attemptKey)===cart.id)throw Error('A payment may already be in progress. Reload your saved cart to check status before paying.')
   const {email,...shipping}=address
   let updated=cart
   if(!locked){
    updated=(await medusa.store.cart.update(cart.id,{email,shipping_address:{...shipping,country_code:'us'},billing_address:{...shipping,country_code:'us'}})).cart
    const {shipping_options}=await medusa.store.fulfillment.listCartOptions({cart_id:cart.id});const option=shipping_options.find(o=>o.name?.startsWith('Standard'));if(!option)throw Error('Shipping unavailable')
    updated=(await medusa.store.cart.addShippingMethod(cart.id,{option_id:option.id})).cart
    updated=(await medusa.client.fetch<{cart:typeof updated}>(`/store/carts/${cart.id}/taxes`,{method:'POST',body:{}})).cart
   }
   const {payment_collection}=await medusa.store.payment.initiatePaymentSession(updated,{provider_id:'pp_stripe_stripe'})
   const secret=payment_collection.payment_sessions?.find(s=>s.provider_id==='pp_stripe_stripe')?.data?.client_secret
   if(typeof secret!=='string')throw Error('Payment unavailable')
   accept({...updated,payment_collection});setClientSecret(secret)
  }catch(e){setError(e instanceof Error?e.message:'Unable to prepare checkout. Your cart is preserved.');await refresh().catch(()=>{})}
  finally{setBusy(false)}
 }
 async function remove(id:string){if(!cart||locked||busy||uploadBusy)return;setBusy(true);try{await medusa.store.cart.deleteLineItem(cart.id,id);await refresh()}catch{setError('Unable to remove item. Your saved cart is preserved.')}finally{setBusy(false)}}
 if(order)return <section className="max-w-3xl mx-auto p-8"><h1 className="text-2xl">Thank you — order received</h1><p>Order {order}</p><p>Your print configuration is saved. Artwork and proof approval are required before production.</p></section>
 return <section className="max-w-3xl mx-auto p-8 space-y-5"><h1 className="text-2xl font-semibold">Your sticker cart</h1>{error&&<p role="alert">{error}</p>}{!cart?<><p>{error?'Saved cart unavailable.':'Loading…'}</p><button onClick={()=>void load()}>Reload saved cart</button>{error&&<MedusaCartRecoverySignIn onSignedIn={load}/>}</>:<>
 {cart.items?.map(item=><article key={item.id} className="border rounded p-4"><h2>{item.title}</h2><p>{String((item.metadata?.display as {summary?:string})?.summary||'Configured print job')}</p><p>${Number(item.unit_price).toFixed(2)}</p>{!locked&&!clientSecret&&<><button disabled={busy||uploadBusy} onClick={()=>void remove(item.id)}>Remove</button><MedusaArtwork cartId={cart.id} lineId={item.id} filename={(item.metadata?.artwork as {filename?:string}|null)?.filename} receiptId={(item.metadata?.artwork as {receiptId?:string}|null)?.receiptId} onBusy={value=>setUploads(prev=>({...prev,[item.id]:value}))} onSaved={refresh}/></>}</article>)}
 <p>Items: ${Number(cart.subtotal).toFixed(2)} · Shipping: ${Number(cart.shipping_total).toFixed(2)} · Tax: ${Number(cart.tax_total).toFixed(2)}</p>
 <p>Total: ${Number(cart.total).toFixed(2)}</p>
 {!cart.items?.length?<a href="/shop/stickers">Configure stickers</a>:clientSecret&&stripePromise?<Elements stripe={stripePromise} options={{clientSecret}}><Pay cart={cart} secret={clientSecret} onComplete={finishOrder}/></Elements>:locked?<><p>Checkout has already been prepared. Items and artwork are locked to preserve the payment amount.</p><button disabled={busy} onClick={()=>void load()}>Reload payment status</button>{!cart.payment_collection?.payment_sessions?.length&&<button disabled={busy} onClick={()=>void checkout()}>Resume prepared checkout</button>}</>:<form className="space-y-3" onSubmit={e=>{e.preventDefault();void checkout()}}><h2>Delivery address</h2>{Object.keys(address).map(key=><label key={key} className="block capitalize">{key.replaceAll('_',' ')}<input className="border rounded block p-2 w-full" required type={key==='email'?'email':'text'} value={address[key as keyof typeof address]} onChange={e=>setAddress({...address,[key]:e.target.value})}/></label>)}<p>Shipping and destination tax are calculated when you continue. Review the total on the payment screen. Review artwork before continuing; items lock when payment is prepared.</p><button disabled={busy||uploadBusy||!stripePromise} className="bg-black text-white rounded p-3">{busy?'Preparing…':'Continue to payment'}</button>{!stripePromise&&<p>Payments are unavailable in this preview.</p>}</form>}
 </>}</section>
}
