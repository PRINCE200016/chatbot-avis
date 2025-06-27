import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  pointer-events: none;
  opacity: 0.6;
  mix-blend-mode: screen;
`;

const ParticleEffect = ({ color = '#00FFFF', particleCount = 100, isActive = true }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize canvas size
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const createParticles = () => {
      const particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      for (let i = 0; i < particleCount; i++) {
        // Create particles in a sphere-like distribution around the center
        const theta = Math.random() * 2 * Math.PI; // Random angle
        const phi = Math.random() * Math.PI; // Random angle for 3D effect
        
        // Convert spherical to cartesian coordinates
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi); // Z-depth for 3D effect
        
        particles.push({
          x,
          y,
          z,
          radius: Math.random() * 2 + 0.5,
          color,
          alpha: Math.random() * 0.8 + 0.2,
          velocity: {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.3
          },
          lastUpdate: Date.now()
        });
      }
      
      return particles;
    };
    
    particlesRef.current = createParticles();
    
    // Animation loop
    let animationId;
    const animate = () => {
      if (!isActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.45;
      const now = Date.now();
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position based on time delta
        const delta = (now - particle.lastUpdate) / 16; // Normalize to ~60fps
        particle.x += particle.velocity.x * delta;
        particle.y += particle.velocity.y * delta;
        particle.z += particle.velocity.z * delta;
        particle.lastUpdate = now;
        
        // Calculate distance from center
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If particle goes too far, reset it
        if (distance > maxRadius || particle.z > maxRadius || particle.z < -maxRadius) {
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.random() * Math.PI;
          
          particle.x = centerX + maxRadius * 0.8 * Math.sin(phi) * Math.cos(theta);
          particle.y = centerY + maxRadius * 0.8 * Math.sin(phi) * Math.sin(theta);
          particle.z = maxRadius * 0.8 * Math.cos(phi);
          
          particle.velocity = {
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.3
          };
        }
        
        // Scale size based on z-position (depth)
        const scale = (particle.z + maxRadius) / (maxRadius * 2);
        const size = particle.radius * scale;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${particle.alpha * scale})`;
        ctx.fill();
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 3
        );
        gradient.addColorStop(0, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${particle.alpha * scale * 0.5})`);
        gradient.addColorStop(1, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [color, particleCount, isActive]);
  
  return <ParticleCanvas ref={canvasRef} />;
};

export default ParticleEffect; 