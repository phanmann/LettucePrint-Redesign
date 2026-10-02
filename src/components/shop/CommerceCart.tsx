'use client'
import {useEffect,useState} from 'react'
import {useCart} from '@/context/CartContext'
import {commerceBackend} from '@/lib/medusa'
import MedusaCart from './MedusaCart'
import CartPage from '@/app/cart/CartPage'
export default function CommerceCart(){
 const {count}=useCart(),[legacyView,setLegacyView]=useState(false),[savedPilot,setSavedPilot]=useState(false)
 useEffect(()=>{queueMicrotask(()=>setSavedPilot(Boolean(localStorage.getItem('lp_medusa_cart'))))},[])
 if(commerceBackend==='legacy')return <>{savedPilot&&<p role="status" className="max-w-4xl mx-auto p-4">A separate sticker-pilot cart is saved on this device. It is not included below and has not been deleted. Contact us before reordering any job with a pending payment.</p>}<CartPage/></>
 return <>{count>0&&<aside className="max-w-3xl mx-auto p-4 border rounded" role="status"><p>You have {count} saved item(s) in a separate cart. Items cannot be combined with this sticker cart. Both carts are preserved.</p><button className="underline" onClick={()=>setLegacyView(!legacyView)}>{legacyView?'View sticker cart':'Review saved items'}</button></aside>}{legacyView?<CartPage/>:<MedusaCart/>}</>
}
