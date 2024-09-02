import Supermouse from './Supermouse';
import { useState, useEffect } from 'react';

function useSupermouse(options = {}) {
  const [supermouse, setSupermouse] = useState(null);

  useEffect(() => {
    const instance = new Supermouse(options);
    setSupermouse(instance);

    return () => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
    };
  }, []);

  return supermouse;
}

export default useSupermouse;
