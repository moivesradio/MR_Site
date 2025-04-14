'use client';

import dynamic from 'next/dynamic';

// Dynamically import ModelViewer (with R3F), client-side only
const ModelViewer = dynamic(() => import('./modelviewer'), { ssr: false });

export default function ClientModelWrapper() {
  return <ModelViewer />;
}
