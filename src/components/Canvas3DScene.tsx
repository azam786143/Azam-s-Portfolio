import React, { useEffect, useRef, useState } from 'react';

export default function Canvas3DScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelType, setModelType] = useState<'icosahedron' | 'torusKnot'>('icosahedron');
  const mouseRef = useRef({ x: 0, y: 0, hover: false });

  // Generate Icosahedron vertices & edges
  const getIcosahedron = () => {
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;

    const vertices: [number, number, number][] = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];

    // Normalize vertices to unit sphere
    const scaledVertices = vertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      const factor = 120; // Radius size
      return [(x / len) * factor, (y / len) * factor, (z / len) * factor] as [number, number, number];
    });

    const edges: [number, number][] = [];
    const threshold = 1.95; // Golden ratio threshold for adjacency
    for (let i = 0; i < scaledVertices.length; i++) {
      for (let j = i + 1; j < scaledVertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          edges.push([i, j]);
        }
      }
    }

    return { vertices: scaledVertices, edges };
  };

  // Generate Torus Knot vertices & edges
  const getTorusKnot = () => {
    const vertices: [number, number, number][] = [];
    const edges: [number, number][] = [];
    
    // Parameters for p & q
    const p = 3;
    const q = 7;
    const samples = 120;
    const tubeRadius = 25;
    const knotRadius = 75;

    for (let i = 0; i < samples; i++) {
      const phi = (i / samples) * Math.PI * 2;
      const r = knotRadius + tubeRadius * Math.cos(q * phi);
      const x = r * Math.cos(p * phi);
      const y = r * Math.sin(p * phi);
      const z = tubeRadius * Math.sin(q * phi);
      vertices.push([x, y, z]);
    }

    for (let i = 0; i < samples; i++) {
      edges.push([i, (i + 1) % samples]);
      // Connect cross grid strings too for wireframe fidelity
      edges.push([i, (i + Math.floor(samples / p)) % samples]);
    }

    return { vertices, edges };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    // Initial rotations
    let angleX = 0;
    let angleY = 0;
    let speedX = 0.007;
    let speedY = 0.005;

    const ico = getIcosahedron();
    const knot = getTorusKnot();

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Model coordinates
      const currentMesh = modelType === 'icosahedron' ? ico : knot;

      // Adjust angles on mouse hover
      if (mouseRef.current.hover) {
        speedX += (mouseRef.current.y * 0.0001 - speedX) * 0.1;
        speedY += (mouseRef.current.x * 0.0001 - speedY) * 0.1;
      } else {
        // Return to lazy floating speeds
        speedX += (0.007 - speedX) * 0.05;
        speedY += (0.005 - speedY) * 0.05;
      }

      angleX += speedX;
      angleY += speedY;

      // Compute trig values
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project vertices to 2D
      const projected = currentMesh.vertices.map(([vx, vy, vz]) => {
        // Rotate in Y axis
        let x = vx * cosY - vz * sinY;
        let z = vx * sinY + vz * cosY;

        // Rotate in X axis
        let y = vy * cosX - z * sinX;
        z = vy * sinX + z * cosX;

        // 3D perspective projection factor
        const distance = 350;
        const scale = distance / (distance + z);
        
        const px = x * scale + width / 2;
        const py = y * scale + height / 2;

        return { x: px, y: py, depth: z };
      });

      // Ambient background wireframe glow
      ctx.save();
      ctx.fillStyle = 'rgba(254, 231, 21, 0.005)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Edges
      currentMesh.edges.forEach(([u, v]) => {
        const pt1 = projected[u];
        const pt2 = projected[v];

        // Draw line with opacity based on average deep/depth coords
        const avgDepth = (pt1.depth + pt2.depth) / 2;
        const opacity = Math.max(0.12, Math.min(0.9, 0.5 - avgDepth / 250));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        
        ctx.strokeStyle = `rgba(254, 231, 21, ${opacity})`;
        ctx.lineWidth = modelType === 'icosahedron' ? 1.5 : 1.0;
        
        if (avgDepth < 0) {
          // Glow highlights for foreground edges
          ctx.strokeStyle = `rgba(254, 231, 21, ${opacity * 1.5})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FEE715';
        }
        
        ctx.stroke();
        ctx.restore();
      });

      // Draw Nodes / Vertices
      if (modelType === 'icosahedron') {
        projected.forEach((pt) => {
          const radial = Math.max(1.5, Math.min(4, 3 - pt.depth / 150));
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radial, 0, Math.PI * 2);
          ctx.fillStyle = '#FEE715';
          if (pt.depth < 0) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FEE715';
          }
          ctx.fill();
          ctx.restore();
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [modelType]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseRef.current.x = e.clientX - cx;
    mouseRef.current.y = e.clientY - cy;
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full p-4 group select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { mouseRef.current.hover = true; }}
      onMouseLeave={() => { mouseRef.current.hover = false; }}
    >
      <canvas ref={canvasRef} className="w-full max-h-[380px] drop-shadow-[0_0_20px_rgba(254,231,21,0.15)] pointer-events-none" />

      {/* Model togglers */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-midnight/80 backdrop-blur border border-lemon/20 px-1.5 py-1 rounded-full z-10">
        <button
          onClick={() => setModelType('icosahedron')}
          className={`px-3 py-1 text-[11px] font-mono font-medium rounded-full transition-all duration-300 pointer-events-auto ${
            modelType === 'icosahedron'
              ? 'bg-lemon text-midnight font-bold shadow-[0_0_12px_rgba(254,231,21,0.4)]'
              : 'text-white/60 hover:text-lemon'
          }`}
        >
          Icosahedron
        </button>
        <button
          onClick={() => setModelType('torusKnot')}
          className={`px-3 py-1 text-[11px] font-mono font-medium rounded-full transition-all duration-300 pointer-events-auto ${
            modelType === 'torusKnot'
              ? 'bg-lemon text-midnight font-bold shadow-[0_0_12px_rgba(254,231,21,0.4)]'
              : 'text-white/60 hover:text-lemon'
          }`}
        >
          Torus Knot
        </button>
      </div>

      <div className="absolute top-2 right-4 text-[10px] font-mono text-lemon/40 select-none animate-pulse">
        3D UNIT RENDERER
      </div>
    </div>
  );
}
