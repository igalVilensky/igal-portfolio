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

interface Node {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { x: mouseX, y: mouseY } = useMouse();
const { width, height } = useWindowSize();
const { y: scrollY } = useScroll(window);
const colorMode = useColorMode();

let ctx: CanvasRenderingContext2D | null = null;
let nodes: Node[] = [];
let animationId: number | null = null;

const GRID_SPACING = 50;
const MOUSE_RADIUS = 200;
const MOUSE_STRENGTH = 40;

const initGrid = () => {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    canvas.width = width.value * window.devicePixelRatio;
    canvas.height = height.value * window.devicePixelRatio;
    ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    nodes = [];
    const cols = Math.ceil(width.value / GRID_SPACING) + 1;
    const rows = Math.ceil(height.value / GRID_SPACING) + 1;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * GRID_SPACING;
            const y = j * GRID_SPACING;
            nodes.push({ x, y, baseX: x, baseY: y });
        }
    }
};

const animate = () => {
    if (!ctx || !canvasRef.value) return;

    ctx.clearRect(0, 0, width.value, height.value);

    // Colors based on theme
    const isDark = colorMode.value === 'dark';
    const lineColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.25)';
    const nodeColor = isDark ? 'rgba(74, 157, 252, 0.4)' : 'rgba(74, 157, 252, 0.6)';

    // Update nodes based on mouse and scroll
    const scrollOffset = scrollY.value * 0.1;

    nodes.forEach(node => {
        // Scroll effect (vertical shift or perspective feel)
        const currentBaseY = node.baseY - (scrollOffset % GRID_SPACING);

        // Mouse distortion
        const dx = mouseX.value - node.x;
        const dy = mouseY.value - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            const distortion = force * MOUSE_STRENGTH;
            const angle = Math.atan2(dy, dx);
            node.x = node.baseX - Math.cos(angle) * distortion;
            node.y = currentBaseY - Math.sin(angle) * distortion;
        } else {
            // Smooth return to base
            node.x += (node.baseX - node.x) * 0.1;
            node.y += (currentBaseY - node.y) * 0.1;
        }
    });

    // Draw lines
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    const cols = Math.ceil(width.value / GRID_SPACING) + 1;
    const rows = Math.ceil(height.value / GRID_SPACING) + 1;

    // Horizontal lines
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols - 1; i++) {
            const n1 = nodes[i * rows + j];
            const n2 = nodes[(i + 1) * rows + j];
            if (n1 && n2) {
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
            }
        }
    }

    // Vertical lines
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 1; j++) {
            const n1 = nodes[i * rows + j];
            const n2 = nodes[i * rows + j + 1];
            if (n1 && n2) {
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
            }
        }
    }
    ctx.stroke();

    // Draw nodes (dots)
    nodes.forEach(node => {
        ctx!.fillStyle = nodeColor;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
    });

    animationId = requestAnimationFrame(animate);
};

onMounted(() => {
    initGrid();
    animate();
});

onUnmounted(() => {
    if (animationId) cancelAnimationFrame(animationId);
});

watch([width, height], initGrid);
</script>

<style scoped>
canvas {
    display: block;
}
</style>
