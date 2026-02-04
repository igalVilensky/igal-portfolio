<template>
    <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg">
        <canvas ref="canvasRef" class="w-full h-full opacity-70 dark:opacity-50"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useMouse, useWindowSize, useColorMode } from '@vueuse/core';
import { useColorMode as useNuxtColorMode } from '#imports';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();
const colorMode = useNuxtColorMode();

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

class LabParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    history: Array<{ x: number, y: number }>;
    maxHistory: number;

    constructor(w: number, h: number, isDark: boolean) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = isDark ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.4)';
        this.history = [];
        this.maxHistory = 5 + Math.floor(Math.random() * 10);
    }

    update(w: number, h: number, mx: number, my: number) {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) this.history.shift();

        // Field-like movement
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300) {
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * 0.15;
            this.vy += Math.sin(angle) * 0.15;
        }

        // Turbulence / Noise simulation
        this.vx += (Math.random() - 0.5) * 0.2;
        this.vy += (Math.random() - 0.5) * 0.2;

        // Dampen
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();

        // Trail
        if (this.history.length > 1) {
            context.beginPath();
            context.strokeStyle = this.color.replace('0.6', '0.2').replace('0.4', '0.1');
            context.lineWidth = this.size * 0.5;
            context.moveTo(this.history[0].x, this.history[0].y);
            for (let i = 1; i < this.history.length; i++) {
                context.lineTo(this.history[i].x, this.history[i].y);
            }
            context.stroke();
        }
    }
}

let particles: LabParticle[] = [];

const initLab = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    canvas.width = width.value * window.devicePixelRatio;
    canvas.height = height.value * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const isDark = colorMode.value === 'dark';
    particles = Array.from({ length: 120 }, () => new LabParticle(width.value, height.value, isDark));
};

const animate = () => {
    if (!ctx || !canvasRef.value) return;

    ctx.clearRect(0, 0, width.value, height.value);

    const isDark = colorMode.value === 'dark';
    const connectionColor = isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.05)';

    particles.forEach((p, i) => {
        p.update(width.value, height.value, mouseX.value, mouseY.value);
        p.draw(ctx!);

        // Proximity connections (fewer for performance, focus on mouse)
        for (let j = i + 1; j < particles.length; j += 4) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx!.beginPath();
                ctx!.strokeStyle = connectionColor;
                ctx!.lineWidth = 1 - dist / 100;
                ctx!.moveTo(p.x, p.y);
                ctx!.lineTo(p2.x, p2.y);
                ctx!.stroke();
            }
        }
    });

    // Mouse repulsion/vortex effect visualizer
    ctx.beginPath();
    ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(37, 99, 235, 0.03)';
    ctx.arc(mouseX.value, mouseY.value, 300, 0, Math.PI * 2);
    ctx.stroke();

    animationId = requestAnimationFrame(animate);
};

onMounted(() => {
    initLab();
    animate();
});

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
});

watch([width, height], initLab);
watch(colorMode, initLab);
</script>
