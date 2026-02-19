"use client";

/**
 * ForestBackground - An immersive nature-inspired animated background.
 * Uses pure CSS transitions and keyframe animations to evoke a feeling
 * of a serene forest: dappled sunlight, floating particles, and gentle
 * color gradients that shift like light through leaves.
 */
export function ForestBackground() {
  return (
    <div className="forest-background" aria-hidden>
      {/* Deep forest gradient base - emulates canopy layers */}
      <div className="forest-gradient" />

      {/* Dappled sunlight spots - moving light through foliage */}
      <div className="sunbeam sunbeam-1" />
      <div className="sunbeam sunbeam-2" />
      <div className="sunbeam sunbeam-3" />
      <div className="sunbeam sunbeam-4" />
      <div className="sunbeam sunbeam-5" />

      {/* Floating particles - leaves/debris drifting gently */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`leaf leaf-${(i % 4) + 1}`}
          style={{
            "--leaf-delay": `${i * 0.7}s`,
            "--leaf-duration": `${8 + (i % 4)}s`,
            "--leaf-start": `${(i * 7) % 100}%`,
          } as React.CSSProperties}
        />
      ))}

      {/* Subtle fog/mist layer - depth and atmosphere */}
      <div className="mist-layer mist-1" />
      <div className="mist-layer mist-2" />
    </div>
  );
}
