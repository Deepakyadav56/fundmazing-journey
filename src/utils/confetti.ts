
// A simple confetti effect implementation
export default function confetti() {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Confetti particles
  const particles: Particle[] = [];
  const colors = ['#22c55e', '#4ade80', '#86efac', '#16a34a', '#15803d'];
  const particleCount = 150;
  
  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
    angle: number;
    spin: number;
    opacity: number;
  }
  
  // Create initial particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      angle: Math.random() * Math.PI * 2,
      spin: Math.random() * 0.2 - 0.1,
      opacity: 1
    });
  }
  
  // Animation loop
  let animationFrame: number;
  let startTime = Date.now();
  
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check if animation should end (after 3 seconds)
    const elapsed = Date.now() - startTime;
    if (elapsed > 3000) {
      window.cancelAnimationFrame(animationFrame);
      document.body.removeChild(canvas);
      return;
    }
    
    // Update and draw particles
    for (const particle of particles) {
      // Update position
      particle.y += particle.speed;
      particle.x += Math.sin(particle.angle) * 2;
      particle.angle += particle.spin;
      
      // Fade out particles near the end
      if (elapsed > 2000) {
        particle.opacity = 1 - (elapsed - 2000) / 1000;
      }
      
      // Draw particle
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
      
      // Reset particles that fall out of view
      if (particle.y > canvas.height) {
        particle.y = -particle.size;
        particle.x = Math.random() * canvas.width;
      }
    }
    
    // Continue animation
    animationFrame = window.requestAnimationFrame(animate);
  };
  
  // Start animation
  animate();
}
