<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);

let gl: WebGLRenderingContext;
let program: WebGLProgram;
let animationFrame: number;
let mouse = { x: 0.5, y: 0.5 };
let targetMouse = { x: 0.5, y: 0.5 };

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0, 1);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Noise function for organic movement
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Smooth noise
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal noise
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 6; i++) {
      value += amplitude * smoothNoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Create swirling vortex effect
  vec2 vortex(vec2 uv, vec2 center, float strength, float time) {
    vec2 delta = uv - center;
    float dist = length(delta);
    float angle = atan(delta.y, delta.x);
    
    // Create spiral motion
    angle += strength * (1.0 / (dist + 0.1)) * sin(time * 0.5 + dist * 8.0);
    
    // Add pulsing effect
    float pulse = sin(time * 2.0 + dist * 10.0) * 0.1;
    dist += pulse;
    
    return center + dist * vec2(cos(angle), sin(angle));
  }

  // Enhanced color palette with deep cosmic colors
  vec3 getColor(float t, float intensity) {
    vec3 color1 = vec3(0.1, 0.0, 0.3);    // Deep purple
    vec3 color2 = vec3(0.0, 0.2, 0.8);    // Deep blue  
    vec3 color3 = vec3(0.0, 0.8, 1.0);    // Cyan
    vec3 color4 = vec3(1.0, 0.4, 0.8);    // Pink
    vec3 color5 = vec3(1.0, 0.8, 0.0);    // Gold
    
    t = mod(t, 1.0);
    vec3 col;
    
    if(t < 0.25) {
      col = mix(color1, color2, t * 4.0);
    } else if(t < 0.5) {
      col = mix(color2, color3, (t - 0.25) * 4.0);
    } else if(t < 0.75) {
      col = mix(color3, color4, (t - 0.5) * 4.0);
    } else {
      col = mix(color4, color5, (t - 0.75) * 4.0);
    }
    
    return col * intensity;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 originalUV = uv;
    
    // Normalize coordinates
    uv = (uv - 0.5) * 2.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    vec2 mousePos = (u_mouse - 0.5) * 2.0;
    mousePos.x *= u_resolution.x / u_resolution.y;
    
    // Create multiple vortex layers
    float time = u_time * 0.3;
    
    // Primary vortex following mouse
    vec2 warpedUV1 = vortex(uv, mousePos, 2.5, time);
    
    // Secondary vortex for complexity
    vec2 secondCenter = vec2(sin(time * 0.7) * 0.5, cos(time * 0.5) * 0.3);
    vec2 warpedUV2 = vortex(warpedUV1, secondCenter, 1.2, time + 1.0);
    
    // Distance from mouse for intensity
    float mouseDist = distance(originalUV, u_mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.8, mouseDist);
    
    // Create flowing energy patterns
    float flow1 = fbm(warpedUV2 * 3.0 + time * 0.5);
    float flow2 = fbm(warpedUV2 * 2.0 - time * 0.3 + vec2(100.0));
    float flow3 = fbm(warpedUV1 * 4.0 + time * 0.7 + vec2(200.0));
    
    // Combine flows for complex patterns
    float pattern = (flow1 + flow2 * 0.7 + flow3 * 0.5) / 2.2;
    
    // Add breathing/pulsing effect
    float pulse = sin(time * 1.5) * 0.5 + 0.5;
    pattern += pulse * 0.3;
    
    // Create energy tendrils near mouse
    float tendrils = 0.0;
    for(int i = 0; i < 5; i++) {
      float angle = float(i) * 1.256 + time * 0.5;
      vec2 tendrilPos = mousePos + vec2(cos(angle), sin(angle)) * 0.3;
      float tendrilDist = distance(uv, tendrilPos);
      tendrils += 1.0 / (tendrilDist * 20.0 + 1.0);
    }
    
    // Combine all effects
    float intensity = pattern + tendrils * mouseInfluence * 2.0;
    intensity += mouseInfluence * 0.5;
    
    // Create color cycling
    float colorTime = time * 0.2 + pattern * 2.0;
    vec3 color = getColor(colorTime, intensity);
    
    // Add sparkle effect
    float sparkle = smoothNoise(originalUV * 200.0 + time * 2.0);
    sparkle = pow(sparkle, 8.0) * intensity;
    color += vec3(sparkle * 2.0);
    
    // Add atmospheric glow
    float glow = 1.0 - smoothstep(0.0, 0.6, mouseDist);
    color += vec3(0.1, 0.2, 0.4) * glow * pulse;
    
    // Final intensity modulation
    color *= smoothstep(0.0, 0.3, intensity);
    
    // Add subtle vignette
    float vignette = 1.0 - smoothstep(0.5, 1.4, length(originalUV - 0.5));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
) {
  const vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
  }
  return prog;
}

onMounted(() => {
  const c = canvas.value!;
  gl = c.getContext("webgl")!;

  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
  gl.useProgram(program);

  // Setup buffer
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const a_position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(a_position);
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

  const u_time = gl.getUniformLocation(program, "u_time");
  const u_mouse = gl.getUniformLocation(program, "u_mouse");
  const u_resolution = gl.getUniformLocation(program, "u_resolution");

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2); // Limit for performance on mobile
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;
    gl.viewport(0, 0, c.width, c.height);
    gl.uniform2f(u_resolution, c.width, c.height);
  }
  resize();
  window.addEventListener("resize", resize);

  // Smooth mouse following for better mobile experience
  function updateMouse(e: MouseEvent | Touch) {
    const rect = c.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
  }

  // Mouse events
  window.addEventListener("mousemove", updateMouse);

  // Touch events for mobile
  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        updateMouse(e.touches[0]);
      }
    },
    { passive: false }
  );

  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      updateMouse(e.touches[0]);
    }
  });

  function render(time: number) {
    // Smooth mouse interpolation
    const lerpSpeed = 0.05;
    mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
    mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(u_time, time * 0.001);
    gl.uniform2f(u_mouse, mouse.x, mouse.y);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrame = requestAnimationFrame(render);
  }
  render(0);

  // Cleanup function
  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", updateMouse);
  });
});
</script>

<style scoped>
canvas {
  display: block;
  touch-action: none; /* Prevent scrolling on mobile when interacting */
}
</style>
