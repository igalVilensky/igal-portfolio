<template>
    <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg">
        <canvas ref="canvasRef" class="w-full h-full opacity-60 dark:opacity-40"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useMouse, useWindowSize, useScroll } from '@vueuse/core';
import { useColorMode } from '#imports';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();
const { y: scrollY } = useScroll(window);
const colorMode = useColorMode();

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

// Multi-layered architecture objects
interface Beam {
    x: number;
    width: number;
    speed: number;
    opacity: number;
}

interface Circuit {
    x: number;
    y: number;
    segments: Array<{ x: number, y: number }>;
    life: number;
    maxLife: number;
}

let beams: Beam[] = [];
let circuits: Circuit[] = [];

const initBlueprint = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    canvas.width = width.value * window.devicePixelRatio;
    canvas.height = height.value * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    beams = Array.from({ length: 5 }, () => ({
        x: Math.random() * width.value,
        width: Math.random() * 100 + 50,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.1 + 0.05
    }));
};

const createCircuit = (x: number, y: number) => {
    const segments = [{ x, y }];
    let curX = x;
    let curY = y;
    for (let i = 0; i < 4; i++) {
        const horizontal = Math.random() > 0.5;
        if (horizontal) {
            curX += (Math.random() > 0.5 ? 50 : -50);
        } else {
            curY += (Math.random() > 0.5 ? 50 : -50);
        }
        segments.push({ x: curX, y: curY });
    }
    return { x, y, segments, life: 0, maxLife: 100 + Math.random() * 100 };
};

const animate = () => {
    if (!ctx || !canvasRef.value) return;

    ctx.clearRect(0, 0, width.value, height.value);

    const isDark = colorMode.value === 'dark';
    const strokeColor = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)';
    const secondaryStroke = isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)';
    const labelColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

    const scrollOffset = scrollY.value * 0.15;

    // 1. Vertical Scanning Beams
    beams.forEach(b => {
        b.x = (b.x + b.speed) % width.value;
        ctx!.fillStyle = isDark ? `rgba(59, 130, 246, ${b.opacity})` : `rgba(37, 99, 235, ${b.opacity * 0.5})`;
        ctx!.fillRect(b.x, 0, b.width, height.value);
    });

    // 2. Structural Grid with Distortion
    ctx.beginPath();
    ctx.strokeStyle = secondaryStroke;
    ctx.lineWidth = 0.5;
    const step = 80;
    for (let x = 0; x < width.value + step; x += step) {
        const xPos = x - (scrollOffset % step);
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height.value);
    }
    for (let y = 0; y < height.value + step; y += step) {
        const yPos = y - (scrollOffset % step);
        ctx.moveTo(0, yPos);
        ctx.lineTo(width.value, yPos);
    }
    ctx.stroke();

    // 3. User-Interactive Circuitry
    if (Math.random() < 0.05 && circuits.length < 10) {
        circuits.push(createCircuit(mouseX.value + (Math.random() - 0.5) * 200, mouseY.value + (Math.random() - 0.5) * 200));
    }

    circuits = circuits.filter(c => c.life < c.maxLife);
    circuits.forEach(c => {
        c.life++;
        const progress = Math.min(1, c.life / (c.maxLife * 0.3));
        ctx!.beginPath();
        ctx!.strokeStyle = strokeColor;
        ctx!.lineWidth = 1;
        ctx!.moveTo(c.segments[0].x, c.segments[0].y);

        for (let i = 1; i < c.segments.length; i++) {
            const segProgress = Math.max(0, Math.min(1, (progress * c.segments.length) - i + 1));
            const prevSeg = c.segments[i - 1];
            const curSeg = c.segments[i];
            ctx!.lineTo(
                prevSeg.x + (curSeg.x - prevSeg.x) * segProgress,
                prevSeg.y + (curSeg.y - prevSeg.y) * segProgress
            );
        }
        ctx!.stroke();

        // Tiny node at start
        ctx!.fillStyle = strokeColor;
        ctx!.beginPath();
        ctx!.arc(c.segments[0].x, c.segments[0].y, 2, 0, Math.PI * 2);
        ctx!.fill();
    });

    animationId = requestAnimationFrame(animate);
};

onMounted(() => {
    initBlueprint();
    animate();
});

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
});

watch([width, height], initBlueprint);
</script>
