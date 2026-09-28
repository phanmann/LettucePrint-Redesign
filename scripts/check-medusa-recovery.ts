import test from 'node:test'
import assert from 'node:assert/strict'
import {recoverCheckout,retrieveOrCreateCart,cartSeparation,attachUploadedArtwork} from '../src/lib/medusa-recovery'
test('paid intent retries order completion without another confirmation',async()=>{
 let completions=0
 const complete=async()=>{completions++;if(completions===1)throw Error('network');return {type:'order',order:{id:'order_existing'}}}
 await assert.rejects(recoverCheckout(async()=>({status:'succeeded'}),complete))
 assert.deepEqual(await recoverCheckout(async()=>({status:'succeeded'}),complete),{kind:'complete',orderId:'order_existing'})
 assert.equal(completions,2)
})
test('decline, authentication, processing, canceled and unknown statuses never complete orders',async()=>{
 for(const [status,kind] of [['requires_payment_method','retry'],['requires_action','action'],['requires_confirmation','action'],['processing','pending'],['requires_capture','pending'],['canceled','blocked'],['unknown','blocked']]){
  assert.deepEqual(await recoverCheckout(async()=>({status}),async()=>{throw Error('must not complete')}),{kind})
 }
})
test('status outage or incomplete order never permits a fresh payment',async()=>{
 await assert.rejects(recoverCheckout(async()=>{throw Error('timeout')},async()=>({type:'order'})))
 await assert.rejects(recoverCheckout(async()=>({status:'succeeded'}),async()=>({type:'cart'})))
})
test('saved cart errors never create replacement carts',async()=>{
 let creations=0
 for(const error of ['404','offline','unauthorized'])await assert.rejects(retrieveOrCreateCart('cart_saved',async()=>{throw Error(error)},async()=>{creations++;return {id:'new'}}))
 assert.equal(creations,0)
 assert.deepEqual(await retrieveOrCreateCart(null,async()=>{throw Error('not expected')},async()=>({id:'new'})),{id:'new'})
})
test('both cart counts retained and mixed state explicit',()=>{assert.deepEqual(cartSeparation(2,3),{count:5,mixed:true});assert.deepEqual(cartSeparation(2,0),{count:2,mixed:false})})
test('UploadThing callback attaches returned file to selected job',async()=>{
 let body:unknown
 assert.equal(await attachUploadedArtwork({ufsUrl:'https://utfs.io/f/local-fixture.pdf',name:'fixture.pdf'},async data=>{body=data}),'fixture.pdf')
 assert.deepEqual(body,{url:'https://utfs.io/f/local-fixture.pdf',filename:'fixture.pdf'})
})
test('failed attachment preserves error for retry; missing or insecure file cannot attach',async()=>{
 await assert.rejects(attachUploadedArtwork({ufsUrl:'https://utfs.io/f/local.pdf',name:'local.pdf'},async()=>{throw Error('offline')}))
 for(const file of [undefined,{ufsUrl:'http://evil.example/file',name:'file'}])await assert.rejects(attachUploadedArtwork(file,async()=>{throw Error('must not attach')}))
})
