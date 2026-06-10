import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  startAlpha: number;
  life: number;
  rotation: number;
  rotationSpeed: number;
  depth: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  startTime: number;
  duration: number;
  systemId: number;
}

export interface ParticleCanvasHandle {
  addParticleSystem: (cardElement: HTMLDivElement, duration: number, onComplete: () => void) => void;
  clearParticleEffects: () => void;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<ParticleData[]>([]);
  const noise2D = useRef((x: number, y: number) => {
    const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (value - Math.floor(value)) * 2 - 1;
  });
  const systemIdCounterRef = useRef(0);
  const completionCallbacksRef = useRef<Map<number, () => void>>(new Map());

  useImperativeHandle(ref, () => ({
    addParticleSystem: (cardElement: HTMLDivElement, duration: number, onComplete: () => void) => {
      const systemId = systemIdCounterRef.current++;
      completionCallbacksRef.current.set(systemId, onComplete);
      createParticles(cardElement, duration, systemId);
    },
    clearParticleEffects: () => {
      particlesRef.current = [];
      completionCallbacksRef.current.clear();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d', { alpha: true });
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
  }));

  const createParticles = (cardElement: HTMLDivElement, duration: number, systemId: number) => {
    const rect = cardElement.getBoundingClientRect();

    // Create temporary canvas to render the card
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d', { alpha: true, willReadFrequently: true });
    if (!tempCtx) return;

    const scale = 2;
    tempCanvas.width = rect.width * scale;
    tempCanvas.height = rect.height * scale;
    tempCtx.scale(scale, scale);

    // Get computed styles
    const computedStyle = window.getComputedStyle(cardElement);
    const bgColor = computedStyle.backgroundColor;
    const borderRadius = computedStyle.borderRadius;
    const borderColor = computedStyle.borderColor;
    const borderWidth = computedStyle.borderWidth;

    // Draw card background with rounded corners
    const radius = parseFloat(borderRadius) || 12;
    
    tempCtx.beginPath();
    tempCtx.moveTo(radius, 0);
    tempCtx.lineTo(rect.width - radius, 0);
    tempCtx.quadraticCurveTo(rect.width, 0, rect.width, radius);
    tempCtx.lineTo(rect.width, rect.height - radius);
    tempCtx.quadraticCurveTo(rect.width, rect.height, rect.width - radius, rect.height);
    tempCtx.lineTo(radius, rect.height);
    tempCtx.quadraticCurveTo(0, rect.height, 0, rect.height - radius);
    tempCtx.lineTo(0, radius);
    tempCtx.quadraticCurveTo(0, 0, radius, 0);
    tempCtx.closePath();
    tempCtx.fillStyle = bgColor;
    tempCtx.fill();

    // Draw border
    if (borderWidth && parseFloat(borderWidth) > 0) {
      tempCtx.strokeStyle = borderColor;
      tempCtx.lineWidth = parseFloat(borderWidth);
      tempCtx.stroke();
    }

    // Draw text
    const h3Element = cardElement.querySelector('h3');
    if (h3Element) {
      const textStyle = window.getComputedStyle(h3Element);
      tempCtx.fillStyle = textStyle.color;
      tempCtx.font = `${textStyle.fontWeight} ${textStyle.fontSize} ${textStyle.fontFamily}`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(h3Element.textContent || '', rect.width / 2, rect.height / 2);
    }

    // Sample pixels from the card
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const newParticles: ParticleData[] = [];
    const samplingRate = 3;
    const startTime = Date.now();

    for (let y = 0; y < tempCanvas.height; y += samplingRate) {
      for (let x = 0; x < tempCanvas.width; x += samplingRate) {
        const index = (y * tempCanvas.width + x) * 4;
        const alpha = imageData.data[index + 3];

        if (alpha > 30) {
          const r = imageData.data[index];
          const g = imageData.data[index + 1];
          const b = imageData.data[index + 2];
          const a = alpha / 255;

          const particleX = (x / scale) + rect.left;
          const particleY = (y / scale) + rect.top;

          // Left-to-right dissolve
          const normalizedX = x / tempCanvas.width;
          const dissolveFactor = normalizedX;

          // Random scatter direction with upward bias
          const angle = (Math.random() - 0.5) * Math.PI * 1.2;
          const speed = 0.3 + Math.random() * 1.8;
          const depth = 0.4 + Math.random() * 0.6;

          newParticles.push({
            x: particleX,
            y: particleY,
            vx: Math.cos(angle) * speed * depth * 0.5,
            vy: Math.sin(angle) * speed * depth * 0.5 - 0.8,
            color: `rgb(${r}, ${g}, ${b})`,
            size: (2 + Math.random() * 3) * depth, // Increased from 1 + Math.random() * 1.5
            alpha: a,
            startAlpha: a,
            life: dissolveFactor * 0.35,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            depth,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
            startTime,
            duration,
            systemId,
          });
        }
      }
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const currentTime = Date.now();
      const completedSystems = new Set<number>();

      particlesRef.current = particlesRef.current.filter((particle) => {
        const elapsed = currentTime - particle.startTime;
        const progress = Math.min(elapsed / particle.duration, 1);
        const particleProgress = Math.max(0, Math.min(1, (progress - particle.life) / (1 - particle.life)));
        
        if (particleProgress <= 0) return true;
        if (particleProgress >= 1) {
          if (progress >= 1) {
            completedSystems.add(particle.systemId);
          }
          return false;
        }

        // Simplex noise for organic turbulence
        const time = elapsed * 0.0008;
        const noiseScale = 0.003;
        const noiseX = noise2D.current(
          particle.x * noiseScale + particle.noiseOffsetX,
          time
        );
        const noiseY = noise2D.current(
          particle.y * noiseScale + particle.noiseOffsetY,
          time
        );

        // Update velocity with turbulence
        particle.vx += noiseX * 0.3;
        particle.vy += noiseY * 0.3;
        
        // Upward drift acceleration
        particle.vy -= 0.015 * particle.depth;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rotation
        particle.rotation += particle.rotationSpeed;

        // Smooth easing
        const eased = particleProgress < 0.5
          ? 4 * particleProgress * particleProgress * particleProgress
          : 1 - Math.pow(-2 * particleProgress + 2, 3) / 2;

        // Fade and shrink
        particle.alpha = particle.startAlpha * (1 - eased);
        const scale = 1 - eased * 0.6;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = particle.alpha;
        
        ctx.shadowBlur = 1.5 * particle.size;
        ctx.shadowColor = particle.color;
        
        ctx.fillStyle = particle.color;
        const size = particle.size * scale;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        
        ctx.restore();

        return true;
      });

      // Call completion callbacks
      completedSystems.forEach((systemId) => {
        const callback = completionCallbacksRef.current.get(systemId);
        if (callback) {
          callback();
          completionCallbacksRef.current.delete(systemId);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';