'use client'
import {useState} from 'react'
import {useUploadThing} from '@/lib/uploadthingClient'
import {medusa} from '@/lib/medusa'
import {attachUploadedArtwork} from '@/lib/medusa-recovery'
export default function MedusaArtwork({cartId,lineId,filename,onBusy,onSaved}:{cartId:string;lineId:string;filename?:string;onBusy:(busy:boolean)=>void;onSaved:()=>Promise<void>}){
 const [error,setError]=useState(''),[uploaded,setUploaded]=useState<{ufsUrl:string;name:string}|undefined>(),[saving,setSaving]=useState(false)
 const enabled=process.env.NEXT_PUBLIC_MEDUSA_ARTWORK_UPLOAD==='enabled'
 async function attach(file:{ufsUrl:string;name:string}|undefined){setSaving(true);onBusy(true);try{await attachUploadedArtwork(file,body=>medusa.client.fetch(`/store/carts/${cartId}/line-items/${lineId}/artwork`,{method:'POST',body}));setUploaded(undefined);setError('');await onSaved()}catch{setUploaded(file);setError('File was uploaded but could not be attached. Retry attachment before payment; do not upload again.')}finally{setSaving(false);onBusy(false)}}
 const {startUpload,isUploading}=useUploadThing('artworkUploader',{
  headers:{'x-session-id':`medusa:${cartId}:${lineId}`},
  onClientUploadComplete:files=>{void attach(files?.[0])},
  onUploadError:()=>{setError('Upload failed. Your cart is unchanged.');onBusy(false)},
 })
 return <div className="mt-3"><p>{filename?`Artwork attached: ${filename}`:'No artwork attached. Production requires artwork and proof approval.'}</p>{!enabled?<p>Artwork uploads are unavailable in this local preview.</p>:<label className="block">{filename?'Replace artwork':'Upload artwork'}<input type="file" disabled={isUploading||saving} accept=".pdf,.png,.jpg,.jpeg,.svg,.ai,.eps" onChange={e=>{const file=e.target.files?.[0];if(file){onBusy(true);setError('');void startUpload([file]).catch(()=>{setError('Upload failed. Please try again.');onBusy(false)})}}}/></label>}{error&&<p role="alert">{error}</p>}{uploaded&&<button disabled={saving} onClick={()=>void attach(uploaded)}>Retry attaching uploaded file</button>}</div>
}
