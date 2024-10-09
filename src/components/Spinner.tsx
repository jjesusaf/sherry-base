// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
