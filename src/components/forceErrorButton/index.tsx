import React from 'react';
import { useState } from 'react';

export default function ForceError() {
  const [isFailed, setIsFailed] = useState(false);
  if (isFailed) {
    throw new Error("It's just a prank. Don't worry! Everything is fine!");
  }
  return (
    <button
      onClick={() => {
        setIsFailed(true);
      }}
      className="error-button"
    >
      Make ERROR
    </button>
  );
}
