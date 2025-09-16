<!-- components/Orb.vue -->
<template>
  <div
    ref="container"
    class="orb-container fixed inset-0 pointer-events-none z-10 mt-8 sm:mt-16 flex items-start justify-start overflow-hidden opacity-20"
  >
    <!-- Main Orb System -->
    <div ref="orbSystem" class="relative">
      <!-- Orbital Rings -->
      <div
        v-for="(ring, ringIndex) in currentConfig.rings"
        :key="`ring-${ringIndex}`"
        ref="ringElements"
        class="absolute rounded-full border-2 pointer-events-none opacity-30"
        :style="getRingStyle(ring)"
        :data-ring-index="ringIndex"
      >
        <!-- Orbiting Nodes -->
        <div
          v-for="(node, nodeIndex) in ring.nodes"
          :key="`node-${ringIndex}-${nodeIndex}`"
          ref="nodeElements"
          class="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2"
          :style="getNodeStyle(node)"
          :data-ring="ringIndex"
          :data-node="nodeIndex"
        />
      </div>

      <!-- Energy Trails -->
      <svg
        ref="trailsSvg"
        class="absolute pointer-events-none opacity-80"
        :width="containerSize"
        :height="containerSize"
        style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
        viewBox="0 0 400 400"
      >
        <defs>
          <radialGradient id="trailGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              :stop-color="currentConfig.primaryColor"
              stop-opacity="0.8"
            />
            <stop
              offset="100%"
              :stop-color="currentConfig.primaryColor"
              stop-opacity="0"
            />
          </radialGradient>
        </defs>

        <path
          v-for="(trail, index) in energyTrails"
          :key="`trail-${index}`"
          ref="trailElements"
          :d="trail.path"
          stroke="url(#trailGradient)"
          :stroke-width="trail.width"
          fill="none"
          stroke-linecap="round"
          class="energy-trail"
          :data-trail="index"
        />
      </svg>

      <!-- Connection Lines -->
      <svg
        ref="connectionsSvg"
        class="absolute pointer-events-none opacity-40"
        :width="containerSize"
        :height="containerSize"
        style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
        viewBox="0 0 400 400"
      >
        <line
          v-for="(connection, index) in connections"
          :key="`connection-${index}`"
          ref="connectionElements"
          :x1="connection.x1"
          :y1="connection.y1"
          :x2="connection.x2"
          :y2="connection.y2"
          :stroke="currentConfig.primaryColor"
          stroke-width="1"
          class="connection-line"
          :data-connection="index"
        />
      </svg>
    </div>

    <!-- Stage Label -->
    <div
      v-if="showLabel"
      ref="stageLabel"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-mono tracking-wider transition-all duration-500"
      :style="{ color: currentConfig.primaryColor, opacity: 0.7 }"
    >
      {{ stage.toUpperCase() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
import { gsap } from "gsap";

interface NodeConfig {
  color: string;
  size: number;
  initialAngle: number;
}

interface RingConfig {
  radius: number;
  speed: number;
  nodes: NodeConfig[];
  borderColor: string;
}

interface OrbConfig {
  size: number;
  primaryColor: string;
  secondaryColor: string;
  glowIntensity: number;
  icon?: string;
  rings: RingConfig[];
  particleCount: number;
  energy: number;
}

const props = defineProps<{
  stage:
    | "home"
    | "about"
    | "skills"
    | "projects"
    | "education"
    | "experience"
    | "contact";
  showLabel?: boolean;
}>();

// Refs
const container = ref<HTMLElement>();
const orbSystem = ref<HTMLElement>();
const coreOrb = ref<HTMLElement>();
const ringElements = ref<HTMLElement[]>([]);
const nodeElements = ref<HTMLElement[]>([]);
const particleElements = ref<HTMLElement[]>([]);
const trailElements = ref<SVGPathElement[]>([]);
const connectionElements = ref<SVGLineElement[]>([]);

// State
const containerSize = ref(400);
const particles = ref<Array<{ x: number; y: number; speed: number }>>([]);
const energyTrails = ref<Array<{ path: string; width: number }>>([]);
const connections = ref<
  Array<{ x1: number; y1: number; x2: number; y2: number }>
>([]);
const animationFrameId = ref<number>();
const startTime = ref<number>(0);

// Responsive sizing
const isMobile = ref(false);
const prefersReducedMotion = ref(false);

onMounted(() => {
  if (typeof window !== "undefined") {
    prefersReducedMotion.value = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    updateSizing();
    window.addEventListener("resize", updateSizing);
    startTime.value = Date.now();
    if (!prefersReducedMotion.value) {
      startAnimation();
    }
  }
});

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  window.removeEventListener("resize", updateSizing);
});

const updateSizing = () => {
  if (!container.value) return;
  isMobile.value = window.innerWidth < 768;
  containerSize.value = isMobile.value ? 300 : 400;
};

// Orb configurations
const orbConfigs = computed<Record<string, OrbConfig>>(() => {
  const baseSize = isMobile.value ? 60 : 80;

  return {
    home: {
      size: baseSize,
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      glowIntensity: 20,
      rings: [],
      particleCount: 6,
      energy: 1,
    },

    about: {
      size: baseSize * 1.1,
      primaryColor: "#06b6d4",
      secondaryColor: "#0ea5e9",
      glowIntensity: 25,
      icon: "👤",
      rings: [
        {
          radius: baseSize * 1.8,
          speed: 0.3,
          borderColor: "#06b6d4",
          nodes: [
            { color: "#06b6d4", size: 6, initialAngle: 0 },
            { color: "#0ea5e9", size: 6, initialAngle: 120 },
            { color: "#0284c7", size: 6, initialAngle: 240 },
          ],
        },
      ],
      particleCount: 10,
      energy: 2,
    },

    skills: {
      size: baseSize * 1.2,
      primaryColor: "#10b981",
      secondaryColor: "#059669",
      glowIntensity: 30,
      icon: "⚡",
      rings: [
        {
          radius: baseSize * 1.6,
          speed: 0.5,
          borderColor: "#10b981",
          nodes: [
            { color: "#f59e0b", size: 8, initialAngle: 0 },
            { color: "#ef4444", size: 8, initialAngle: 60 },
            { color: "#8b5cf6", size: 8, initialAngle: 120 },
            { color: "#06b6d4", size: 8, initialAngle: 180 },
            { color: "#10b981", size: 8, initialAngle: 240 },
            { color: "#f97316", size: 8, initialAngle: 300 },
          ],
        },
        {
          radius: baseSize * 2.4,
          speed: -0.2,
          borderColor: "#059669",
          nodes: [
            { color: "#10b981", size: 5, initialAngle: 0 },
            { color: "#059669", size: 5, initialAngle: 90 },
            { color: "#047857", size: 5, initialAngle: 180 },
            { color: "#065f46", size: 5, initialAngle: 270 },
          ],
        },
      ],
      particleCount: 15,
      energy: 3,
    },

    projects: {
      size: baseSize * 1.3,
      primaryColor: "#f59e0b",
      secondaryColor: "#d97706",
      glowIntensity: 35,
      icon: "🚀",
      rings: [
        {
          radius: baseSize * 2,
          speed: 0.4,
          borderColor: "#f59e0b",
          nodes: [
            { color: "#f59e0b", size: 10, initialAngle: 0 },
            { color: "#ef4444", size: 8, initialAngle: 72 },
            { color: "#8b5cf6", size: 8, initialAngle: 144 },
            { color: "#06b6d4", size: 8, initialAngle: 216 },
            { color: "#10b981", size: 10, initialAngle: 288 },
          ],
        },
      ],
      particleCount: 12,
      energy: 3,
    },

    education: {
      size: baseSize * 1.15,
      primaryColor: "#8b5cf6",
      secondaryColor: "#7c3aed",
      glowIntensity: 28,
      icon: "📚",
      rings: [
        {
          radius: baseSize * 2.2,
          speed: 0.25,
          borderColor: "#8b5cf6",
          nodes: [
            { color: "#8b5cf6", size: 6, initialAngle: 0 },
            { color: "#a855f7", size: 7, initialAngle: 72 },
            { color: "#9333ea", size: 8, initialAngle: 144 },
            { color: "#7c3aed", size: 7, initialAngle: 216 },
            { color: "#6d28d9", size: 6, initialAngle: 288 },
          ],
        },
      ],
      particleCount: 8,
      energy: 2,
    },

    experience: {
      size: baseSize * 1.4,
      primaryColor: "#ef4444",
      secondaryColor: "#dc2626",
      glowIntensity: 40,
      icon: "💼",
      rings: [
        {
          radius: baseSize * 1.8,
          speed: 0.6,
          borderColor: "#ef4444",
          nodes: [
            { color: "#ef4444", size: 9, initialAngle: 0 },
            { color: "#f97316", size: 8, initialAngle: 45 },
            { color: "#f59e0b", size: 8, initialAngle: 90 },
            { color: "#10b981", size: 8, initialAngle: 135 },
            { color: "#06b6d4", size: 8, initialAngle: 180 },
            { color: "#8b5cf6", size: 8, initialAngle: 225 },
            { color: "#ec4899", size: 8, initialAngle: 270 },
            { color: "#ef4444", size: 9, initialAngle: 315 },
          ],
        },
        {
          radius: baseSize * 2.8,
          speed: -0.3,
          borderColor: "#dc2626",
          nodes: [
            { color: "#ef4444", size: 6, initialAngle: 0 },
            { color: "#f59e0b", size: 6, initialAngle: 120 },
            { color: "#8b5cf6", size: 6, initialAngle: 240 },
          ],
        },
      ],
      particleCount: 18,
      energy: 4,
    },

    contact: {
      size: baseSize * 1.5,
      primaryColor: "#ec4899",
      secondaryColor: "#db2777",
      glowIntensity: 50,
      icon: "🌟",
      rings: [
        {
          radius: baseSize * 1.9,
          speed: 0.8,
          borderColor: "#ec4899",
          nodes: [
            { color: "#ec4899", size: 12, initialAngle: 0 },
            { color: "#f59e0b", size: 10, initialAngle: 51.4 },
            { color: "#10b981", size: 10, initialAngle: 102.8 },
            { color: "#06b6d4", size: 10, initialAngle: 154.3 },
            { color: "#8b5cf6", size: 10, initialAngle: 205.7 },
            { color: "#ef4444", size: 10, initialAngle: 257.1 },
            { color: "#f97316", size: 12, initialAngle: 308.6 },
          ],
        },
        {
          radius: baseSize * 2.7,
          speed: -0.4,
          borderColor: "#db2777",
          nodes: [
            { color: "#ec4899", size: 7, initialAngle: 0 },
            { color: "#8b5cf6", size: 7, initialAngle: 72 },
            { color: "#06b6d4", size: 7, initialAngle: 144 },
            { color: "#10b981", size: 7, initialAngle: 216 },
            { color: "#f59e0b", size: 7, initialAngle: 288 },
          ],
        },
      ],
      particleCount: 20,
      energy: 5,
    },
  };
});

const currentConfig = computed(
  () => orbConfigs.value[props.stage] || orbConfigs.value.home
);

// Computed styles
const coreOrbStyle = computed(() => {
  const config = currentConfig.value;
  return {
    width: `${config.size}px`,
    height: `${config.size}px`,
    background: `radial-gradient(circle at 30% 30%, ${config.secondaryColor}, ${config.primaryColor})`,
    boxShadow: `
      0 0 ${config.glowIntensity}px ${config.primaryColor}60,
      0 0 ${config.glowIntensity * 2}px ${config.primaryColor}30,
      inset 0 0 ${config.glowIntensity / 2}px ${config.secondaryColor}40
    `,
  };
});

const innerEnergyStyle = computed(() => {
  const config = currentConfig.value;
  return {
    background: `conic-gradient(from 0deg, ${config.primaryColor}00, ${config.secondaryColor}90, ${config.primaryColor}00, ${config.primaryColor}60, ${config.primaryColor}00)`,
  };
});

const pulsingCoreStyle = computed(() => {
  const config = currentConfig.value;
  return {
    background: `radial-gradient(circle, ${config.secondaryColor}80, transparent)`,
  };
});

// Style functions
const getRingStyle = (ring: RingConfig) => {
  const diameter = ring.radius * 2;
  return {
    width: `${diameter}px`,
    height: `${diameter}px`,
    borderColor: `${ring.borderColor}40`,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
};

const getNodeStyle = (node: NodeConfig) => ({
  width: `${node.size}px`,
  height: `${node.size}px`,
  backgroundColor: node.color,
  boxShadow: `0 0 ${node.size * 1.5}px ${node.color}80, 0 0 ${
    node.size * 3
  }px ${node.color}40`,
});

const getParticleStyle = (index: number) => {
  const particle = particles.value[index];
  if (!particle) return {};

  return {
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    backgroundColor: currentConfig.value.secondaryColor,
    boxShadow: `0 0 4px ${currentConfig.value.secondaryColor}80`,
  };
};

// Generate particles
const generateParticles = () => {
  const config = currentConfig.value;
  particles.value = Array.from({ length: config.particleCount }, () => ({
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    speed: 0.5 + Math.random() * 1,
  }));
};

// Generate energy trails
const generateEnergyTrails = () => {
  const config = currentConfig.value;
  energyTrails.value = Array.from(
    { length: Math.min(5, config.energy) },
    (_, i) => {
      const angle1 = i * 72 * (Math.PI / 180);
      const angle2 = (i * 72 + 140) * (Math.PI / 180);
      const radius = 60 + i * 15;

      const x1 = 200 + Math.cos(angle1) * radius;
      const y1 = 200 + Math.sin(angle1) * radius;
      const x2 = 200 + Math.cos(angle2) * radius;
      const y2 = 200 + Math.sin(angle2) * radius;

      return {
        path: `M 200 200 Q ${x1} ${y1} ${x2} ${y2}`,
        width: 2 + i,
      };
    }
  );
};

// Generate connections
const generateConnections = () => {
  const config = currentConfig.value;
  connections.value = [];

  if (config.rings.length > 0) {
    const centerX = 200;
    const centerY = 200;

    config.rings.forEach((ring) => {
      ring.nodes.forEach((node) => {
        const angle = node.initialAngle * (Math.PI / 180);
        const x = centerX + Math.cos(angle) * ring.radius;
        const y = centerY + Math.sin(angle) * ring.radius;

        connections.value.push({
          x1: centerX,
          y1: centerY,
          x2: x,
          y2: y,
        });
      });
    });
  }
};

// Animation loop
const animate = () => {
  if (prefersReducedMotion.value) return;

  const currentTime = Date.now();
  const elapsed = (currentTime - startTime.value) / 1000;

  // Animate ring rotations and node positions
  currentConfig.value.rings.forEach((ring, ringIndex) => {
    const ringElement = ringElements.value?.find(
      (el) => el?.dataset?.ringIndex === ringIndex.toString()
    );
    if (ringElement && !prefersReducedMotion.value) {
      const rotation = elapsed * ring.speed * 20;
      ringElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    // Update node positions
    ring.nodes.forEach((node, nodeIndex) => {
      const nodeElement = nodeElements.value?.find(
        (el) =>
          el?.dataset?.ring === ringIndex.toString() &&
          el?.dataset?.node === nodeIndex.toString()
      );

      if (nodeElement) {
        const totalRotation = elapsed * ring.speed * 20 + node.initialAngle;
        const angle = totalRotation * (Math.PI / 180);
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);

        nodeElement.style.left = `${x}%`;
        nodeElement.style.top = `${y}%`;
      }
    });
  });

  // Animate particles
  particles.value.forEach((particle, index) => {
    const element = particleElements.value?.[index];
    if (element) {
      particle.x += Math.sin(elapsed + index) * particle.speed * 0.5;
      particle.y += Math.cos(elapsed + index) * particle.speed * 0.3;

      // Keep particles within bounds
      if (particle.x < 10 || particle.x > 90)
        particle.x = 20 + Math.random() * 60;
      if (particle.y < 10 || particle.y > 90)
        particle.y = 20 + Math.random() * 60;

      element.style.left = `${particle.x}%`;
      element.style.top = `${particle.y}%`;
    }
  });

  // Animate energy trails
  energyTrails.value.forEach((trail, index) => {
    const element = trailElements.value?.[index];
    if (element) {
      const opacity = 0.3 + 0.4 * Math.sin(elapsed * 2 + index);
      element.style.opacity = opacity.toString();
    }
  });

  animationFrameId.value = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  animate();
};

// Stage transition animation
const animateStageTransition = async () => {
  generateParticles();
  generateEnergyTrails();
  generateConnections();

  await nextTick();

  if (prefersReducedMotion.value) return;

  // Animate core orb entrance
  gsap.fromTo(
    coreOrb.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
  );

  // Animate rings
  ringElements.value?.forEach((ring, index) => {
    if (ring) {
      gsap.fromTo(
        ring,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.6,
          duration: 0.8,
          delay: 0.3 + index * 0.2,
          ease: "power2.out",
        }
      );
    }
  });

  // Animate particles
  particleElements.value?.forEach((particle, index) => {
    if (particle) {
      gsap.fromTo(
        particle,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 0.6,
          delay: 0.5 + index * 0.1,
          ease: "power2.out",
        }
      );
    }
  });

  // Animate trails
  trailElements.value?.forEach((trail, index) => {
    if (trail) {
      gsap.fromTo(
        trail,
        { opacity: 0, strokeDasharray: "0,1000" },
        {
          opacity: 0.6,
          strokeDasharray: "1000,0",
          duration: 1.5,
          delay: 0.8,
          ease: "power2.inOut",
        }
      );
    }
  });

  // Animate connections
  connectionElements.value?.forEach((connection, index) => {
    if (connection) {
      gsap.fromTo(
        connection,
        { opacity: 0, strokeDasharray: "0,1000" },
        {
          opacity: 0.4,
          strokeDasharray: "5,5",
          duration: 1,
          delay: 1 + index * 0.1,
          ease: "power2.out",
        }
      );
    }
  });
};

// Watch for stage changes
watch(
  () => props.stage,
  () => {
    animateStageTransition();
  },
  { immediate: true }
);

onMounted(() => {
  animateStageTransition();
});
</script>

<style scoped>
.orb-container {
  will-change: transform, opacity;
}

.core-orb {
  will-change: transform, scale, opacity;
  position: relative;
  overflow: visible;
}

.stage-icon {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.energy-trail {
  will-change: opacity, stroke-dasharray;
}

.connection-line {
  will-change: opacity, stroke-dasharray;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .orb-container {
    transform: scale(0.85);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-spin-slow,
  .animate-pulse {
    animation: none !important;
  }

  .energy-trail,
  .connection-line {
    opacity: 0.3 !important;
  }
}
</style>
