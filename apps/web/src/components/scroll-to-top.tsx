'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return null;
}
