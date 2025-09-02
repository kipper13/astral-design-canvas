import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveBackgroundProps {
  particleCount?: number;
  mouseInfluence?: number;
  animationSpeed?: number;
  colors?: string[];
}

export const InteractiveBackground = ({
  particleCount = 100,
  mouseInfluence = 0.1,
  animationSpeed = 0.005,
  colors = ['#5e72e4', '#ff7e5f', '#feb47b']
}: InteractiveBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const particlesRef = useRef<THREE.Points>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Store original positions
      originalPositions[i] = positions[i];
      originalPositions[i + 1] = positions[i + 1];
      originalPositions[i + 2] = positions[i + 2];

      // Velocities
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));

    // Particle material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        color1: { value: new THREE.Color(colors[0]) },
        color2: { value: new THREE.Color(colors[1]) },
        color3: { value: new THREE.Color(colors[2]) }
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mouse;
        attribute vec3 velocity;
        attribute vec3 originalPosition;
        varying vec3 vPosition;
        varying float vDistance;

        void main() {
          vec3 pos = originalPosition;
          
          // Wave animation
          pos.x += sin(time + originalPosition.y * 0.1) * 0.5;
          pos.y += cos(time + originalPosition.x * 0.1) * 0.5;
          pos.z += sin(time * 0.5 + originalPosition.x * 0.05) * 0.3;
          
          // Mouse interaction
          vec2 mouseInfluence = (mouse - vec2(pos.x, pos.y)) * 0.1;
          float mouseDistance = length(mouseInfluence);
          if (mouseDistance < 2.0) {
            pos.xy += mouseInfluence * (2.0 - mouseDistance) * 0.5;
          }
          
          vPosition = pos;
          vDistance = length(pos);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (10.0 / -mvPosition.z) * (1.0 + sin(time + originalPosition.x) * 0.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float time;
        varying vec3 vPosition;
        varying float vDistance;

        void main() {
          vec2 uv = gl_PointCoord;
          float distanceFromCenter = length(uv - 0.5);
          
          if (distanceFromCenter > 0.5) discard;
          
          // Color mixing based on position and time
          float mixFactor1 = sin(time + vPosition.x * 0.1) * 0.5 + 0.5;
          float mixFactor2 = cos(time + vPosition.y * 0.1) * 0.5 + 0.5;
          
          vec3 color = mix(color1, color2, mixFactor1);
          color = mix(color, color3, mixFactor2);
          
          // Fade based on distance from center
          float alpha = (1.0 - distanceFromCenter * 2.0) * (0.3 + sin(time + vDistance) * 0.2);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    camera.position.z = 5;

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      if (material.uniforms?.mouse) {
        material.uniforms.mouse.value.set(
          mouseRef.current.x * 10,
          mouseRef.current.y * 10
        );
      }
    };

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      if (material.uniforms?.resolution) {
        material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (material.uniforms?.time) {
        material.uniforms.time.value += animationSpeed;
      }

      // Rotate particles slightly
      if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [particleCount, mouseInfluence, animationSpeed, colors]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.05) 100%)'
      }}
    />
  );
};

// Simplified 2D interactive background for better performance on lower-end devices
export const SimpleInteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    hue: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize particles with vibrant colors for light mode
    const initParticles = () => {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        // More vibrant color range for light mode
        const vibrantHues = [229, 280, 11]; // Blue, purple, orange
        const selectedHue = vibrantHues[Math.floor(Math.random() * vibrantHues.length)];
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2, // Increased opacity for more visibility
          hue: selectedHue + (Math.random() * 20 - 10) // Add slight variation
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle with vibrant colors
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 85%, 65%, ${particle.opacity})`; // Increased saturation and lightness
        ctx.fill();
        
        // Add glow effect for more vibrancy
        ctx.shadowColor = `hsla(${particle.hue}, 85%, 65%, 0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw connections
        particlesRef.current.forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${particle.hue}, 85%, 65%, ${0.2 * (1 - distance2 / 80)})`; // More vibrant connections
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  );
};