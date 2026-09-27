import React from 'react';
import { createRoot } from 'react-dom/client';
import DitherVeil from './DitherVeil';

const mount = document.getElementById('hero-dither-root');
const visual = mount?.closest('.hero-visual');

// The image already in the markup remains available if WebGL is unavailable.
if (mount && visual && document.createElement('canvas').getContext('webgl2')) {
  createRoot(mount).render(
    <DitherVeil
      src="assets/dither-hero.jpg"
      fit="contain"
      pattern="floyd"
      pixelSize={2}
      inkColor="#111115"
      paperColor="#e7e5df"
      revealRadius={165}
      softness={0.7}
      linger={1.1}
      rimColor="#b9a0ff"
      rim={0.12}
      onReady={() => visual.classList.add('is-ready')}
    />
  );
}
