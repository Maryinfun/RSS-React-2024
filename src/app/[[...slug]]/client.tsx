'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../main/index'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
