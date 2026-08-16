export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Loading FluxStation">
      <div className="relative"><svg width="82" height="94" viewBox="0 0 100 115.47" className="animate-spin [animation-duration:1.4s]"><polygon points="50,0 93.3,28.87 93.3,86.6 50,115.47 6.7,86.6 6.7,28.87" fill="none" stroke="#6C5CE7" strokeWidth="5" strokeDasharray="70 250" strokeLinecap="round" /></svg><span className="absolute inset-0 grid place-items-center font-black text-flux-purple">F</span></div>
    </div>
  );
}
