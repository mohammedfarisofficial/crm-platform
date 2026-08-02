import React from 'react';

const SampleComponent = () => {
  return (
    <div style={{ padding: '20px', border: '2px dashed blue', margin: '20px' }}>
      <h2 style={{ color: 'blue' }}>I am a Federated Component from Legacy App</h2>
      <p>This component is loaded over the network at runtime!</p>
    </div>
  );
};

export default SampleComponent;
