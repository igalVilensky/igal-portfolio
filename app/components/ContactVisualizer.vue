<template>
    <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg">
        <canvas ref="canvasRef" class="w-full h-full opacity-60 dark:opacity-30"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useMouse, useWindowSize } from '@vueuse/core';
import { useColorMode } from '#imports';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();
const colorMode = useColorMode();

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;

class Ripple {
    x: number;
    y: number;
    r: number;
    maxR: number;
    opacity: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.maxR = Math.random() * 200 + 100;
        this.opacity = 1;
    }

    update() {
        this.r += 2;
        this.opacity = 1 - (this.r / this.maxR);
    }
}

let ripples: Ripple[] = [];
let lastX = 0;
let lastY = 0;

const initCanvas = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    canvas.width = width.value * window.devicePixelRatio;
    canvas.height = height.value * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
};

const animate = () => {
    if (!ctx || !canvasRef.value) return;

    ctx.clearRect(0, 0, width.value, height.value);

    // Add ripple on mouse move
    const dist = Math.sqrt(Math.pow(mouseX.value - lastX, 2) + Math.pow(mouseY.value - lastY, 2));
    if (dist > 50) {
        ripples.push(new Ripple(mouseX.value, mouseY.value));
        lastX = mouseX.value;
        lastY = mouseY.value;
    }

    const isDark = colorMode.value === 'dark';
    const rippleColor = isDark ? 'rgba(59, 130, 246,' : 'rgba(37, 99, 235,';

    ripples = ripples.filter(r => r.opacity > 0);
    ripples.forEach(r => {
        r.update();
        if (ctx) {
            ctx.strokeStyle = `${rippleColor}${r.opacity * 0.5})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
            ctx.stroke();
        }
    });

    // Static ambient ripples
    if (Math.random() < 0.02) {
        ripples.push(new Ripple(Math.random() * width.value, Math.random() * height.value));
    }

    animationId = requestAnimationFrame(animate);
};

onMounted(() => {
    initCanvas();
    animate();
});

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
});

watch([width, height], initCanvas);
</script>
