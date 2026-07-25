import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('federatedApp/Button'), { ssr: false });

const SampleComponent = () => {
  return (
    <div style={{ padding: '20px', border: '2px dashed blue', margin: '20px' }}>
      <h2 style={{ color: 'blue' }}>I am a Federated Component from Legacy App</h2>
      <p>This component is loaded over the network at runtime!</p>
      <div style={{ marginTop: '20px' }}>
        <Suspense fallback={<div>Loading UI App Button...</div>}>
          <Button variant="secondary">Button from UI App</Button>
        </Suspense>
      </div>
    </div>
  );
};

export default SampleComponent;
