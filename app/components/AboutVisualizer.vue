<template>
    <div
        class="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg">
        <canvas ref="canvasRef" class="w-full h-full opacity-40 dark:opacity-20 blur-3xl"></canvas>
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

class Blob {
    x: number;
    y: number;
    radius: number;
    color: string;
    targetX: number;
    targetY: number;
    speed: number;

    constructor(w: number, h: number, color: string) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * 200 + 200;
        this.color = color;
        this.targetX = this.x;
        this.targetY = this.y;
        this.speed = Math.random() * 0.02 + 0.01;
    }

    update(mx: number, my: number) {
        this.targetX = mx + (Math.random() - 0.5) * 100;
        this.targetY = my + (Math.random() - 0.5) * 100;

        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
    }
}

let blobs: Blob[] = [];

const initBlobs = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    canvas.width = width.value * window.devicePixelRatio;
    canvas.height = height.value * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const isDark = colorMode.value === 'dark';
    blobs = [
        new Blob(width.value, height.value, isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'),
        new Blob(width.value, height.value, isDark ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.2)'),
        new Blob(width.value, height.value, isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.2)')
    ];
};

const animate = () => {
    if (!ctx || !canvasRef.value) return;

    ctx.clearRect(0, 0, width.value, height.value);

    blobs.forEach(b => {
        b.update(mouseX.value, mouseY.value);
        if (ctx) {
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    animationId = requestAnimationFrame(animate);
};

onMounted(() => {
    initBlobs();
    animate();
});

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
});

watch([width, height], initBlobs);
watch(colorMode, initBlobs);
</script>
