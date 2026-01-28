<template>
    <canvas ref="canvas" class="w-full h-full absolute inset-0 pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx = null;
let animationId = null;
let particles = [];
const mouse = { x: null, y: null };

// Calm Design Palette
const colors = [
    'rgba(102, 184, 217, 1)', // mindqlab-calm-accent
    'rgba(103, 147, 196, 1)', // mindqlab-calm-accent-secondary
    'rgba(168, 198, 159, 1)', // subtle calm green
    'rgba(214, 211, 209, 1)', // stone-300
];

class Particle {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;

        // Constant base movement for autonomous floating
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;

        this.ax = 0;
        this.ay = 0;
        this.size = Math.random() * 1.5 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        // Edge Wrapping
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Cursor attraction/interaction
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 250;

            if (dist < radius) {
                // Subtle push-pull effect based on distance
                const force = (1 - dist / radius) * 0.02;
                this.ax += dx * force;
                this.ay += dy * force;
            }
        }

        // Update velocity with very low damping to sustain autonomous movement
        this.vx += this.ax;
        this.vy += this.ay;

        const damping = 0.98;
        this.vx *= damping;
        this.vy *= damping;

        // Ensure a minimum velocity so it never stays static
        const minVel = 0.15;
        const currentVel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentVel < minVel) {
            const angle = Math.atan2(this.vy, this.vx) || Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * minVel;
            this.vy = Math.sin(angle) * minVel;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Reset acceleration
        this.ax = 0;
        this.ay = 0;
    }
}

const init = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    particles = [];
    // More particles for a richer field
    const count = Math.floor((w * h) / 12000) + 60;
    for (let i = 0; i < count; i++) particles.push(new Particle(w, h));
};

const animate = () => {
    if (!canvas.value) return;
    const w = canvas.value.width;
    const h = canvas.value.height;
    ctx.clearRect(0, 0, w, h);

    const connectionRadius = 180;

    particles.forEach(p => {
        p.update(w, h);

        // Draw node
        let size = p.size;
        if (mouse.x !== null && mouse.y !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) size += (1 - dist / 200) * 1.5;
        }

        ctx.fillStyle = p.color.replace('1)', '0.7)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionRadius) {
                let alpha = (1 - dist / connectionRadius) * 0.5;

                // Fade connections based on cursor proximity for depth
                if (mouse.x !== null && mouse.y !== null) {
                    const midX = (particles[i].x + particles[j].x) / 2;
                    const midY = (particles[i].y + particles[j].y) / 2;
                    const mdx = midX - mouse.x;
                    const mdy = midY - mouse.y;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mDist > 300) {
                        alpha *= 0.25; // increased base
                    } else {
                        alpha *= (1 - mDist / 300 + 0.3);
                    }
                } else {
                    alpha *= 0.35; // naturally more visible when no mouse
                }

                ctx.strokeStyle = particles[i].color.replace('1)', `${alpha})`);
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    animationId = requestAnimationFrame(animate);
};

const handleMouseMove = (e) => {
    const rect = canvas.value.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
};

const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

const handleResize = () => {
    if (!canvas.value) return;
    const parent = canvas.value.parentElement;
    canvas.value.width = parent.clientWidth;
    canvas.value.height = parent.clientHeight;
    init();
};

onMounted(() => {
    if (!canvas.value) return;
    ctx = canvas.value.getContext('2d');
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.value.parentElement.addEventListener('mouseleave', handleMouseLeave);
    animate();
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationId);
});
</script>
