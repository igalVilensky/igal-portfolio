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
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_mouse;
  uniform float u_time;

  // Simple hash function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = v_uv;
    vec3 color = vec3(0.0);
    
    // Create flowing streams toward mouse
    for(int i = 0; i < 8; i++) {
      float fi = float(i);
      float angle = fi * 0.785 + u_time * 0.2; // 45 degrees apart
      
      // Stream starting points
      vec2 startPos = vec2(cos(angle), sin(angle)) * 0.6 + vec2(0.5);
      
      // Create flowing particles
      for(int j = 0; j < 12; j++) {
        float fj = float(j);
        float progress = fj / 11.0;
        
        vec2 pos = mix(startPos, u_mouse, progress);
        
        // Add wave motion
        vec2 perpendicular = vec2(-(u_mouse.y - startPos.y), u_mouse.x - startPos.x);
        perpendicular = normalize(perpendicular);
        pos += perpendicular * sin(u_time * 2.0 + progress * 6.0 + fi) * 0.03;
        
        float dist = length(uv - pos);
        float intensity = (1.0 - smoothstep(0.0, 0.02, dist));
        intensity *= (1.0 - progress * 0.7);
        intensity *= sin(u_time * 3.0 + fi + fj * 0.2) * 0.4 + 0.6;
        
        // Color gradient
        vec3 streamColor = mix(vec3(0.2, 0.6, 1.0), vec3(1.0, 0.4, 0.8), progress);
        color += streamColor * intensity;
      }
    }
    
    // Add floating orbs
    for(int i = 0; i < 10; i++) {
      float fi = float(i);
      
      vec2 orbPos = vec2(
        sin(u_time * 0.6 + fi * 2.3) * 0.3 + 0.5,
        cos(u_time * 0.8 + fi * 1.7) * 0.2 + 0.5
      );
      
      float dist = length(uv - orbPos);
      float orbSize = 0.015 + sin(u_time * 1.5 + fi) * 0.005;
      float intensity = (1.0 - smoothstep(0.0, orbSize * 2.0, dist));
      
      vec3 orbColor = vec3(1.0, 0.7, 0.3);
      if(fi > 3.0 && fi < 7.0) orbColor = vec3(0.4, 1.0, 0.6);
      if(fi >= 7.0) orbColor = vec3(0.6, 0.4, 1.0);
      
      color += orbColor * intensity * 0.8;
    }
    
    // Mouse glow
    float mouseDist = distance(uv, u_mouse);
    float glow = (1.0 - smoothstep(0.0, 0.2, mouseDist)) * 0.3;
    color += vec3(0.8, 0.9, 1.0) * glow;
    
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
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    return null;
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

  if (!vs || !fs) {
    console.error("Failed to compile shaders");
    return null;
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(prog));
    return null;
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
  if (!program) {
    console.error("Failed to create shader program");
    return;
  }

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

  function resize() {
    c.width = c.clientWidth * window.devicePixelRatio;
    c.height = c.clientHeight * window.devicePixelRatio;
    gl.viewport(0, 0, c.width, c.height);
  }
  resize();
  window.addEventListener("resize", resize);

  function updateMouse(e: MouseEvent | Touch) {
    const rect = c.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
  }

  window.addEventListener("mousemove", updateMouse);

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
    if (!gl || !program) return;

    // Smooth mouse interpolation
    const lerpSpeed = 0.06;
    mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
    mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(u_time, time * 0.001);
    gl.uniform2f(u_mouse, mouse.x, mouse.y);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrame = requestAnimationFrame(render);
  }
  render(0);

  onBeforeUnmount(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    window.removeEventListener("resize", resize);
    window.removeEventListener("mouse", updateMouse);
  });
});
</script>

<style scoped>
canvas {
  display: block;
  touch-action: none;
}
</style>
