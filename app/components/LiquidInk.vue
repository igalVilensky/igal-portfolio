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
  uniform vec2 u_targetMouse;
  uniform float u_time;

  // Simple hash function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Smooth noise function
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Create liquid ink trails
  vec3 createLiquidTrails(vec2 uv, vec2 mousePos, vec2 targetPos, float time) {
    vec3 color = vec3(0.0);
    
    // Create multiple ink streams with different lag
    for(int i = 0; i < 6; i++) {
      float fi = float(i);
      float lagAmount = 0.2 + fi * 0.15; // Different lag for each stream
      
      // Interpolate between target and current mouse for trailing effect
      vec2 laggedMouse = mix(mousePos, targetPos, lagAmount);
      
      // Create flowing ink effect
      for(int j = 0; j < 25; j++) {
        float fj = float(j);
        float trailProgress = fj / 24.0;
        
        // Position along the trail with organic flow
        vec2 trailPos = mix(laggedMouse, targetPos, trailProgress * 0.8);
        
        // Add organic flowing motion
        float flowTime = time * 1.5 + fi * 0.8 + trailProgress * 3.0;
        trailPos += vec2(
          sin(flowTime + fi) * 0.08 * (1.0 - trailProgress),
          cos(flowTime * 1.2 + fi) * 0.06 * (1.0 - trailProgress)
        );
        
        // Add noise for organic ink-like dispersion
        vec2 noiseOffset = vec2(
          noise(trailPos * 8.0 + time * 0.5) - 0.5,
          noise(trailPos * 8.0 + time * 0.5 + vec2(100.0)) - 0.5
        ) * 0.04 * (1.0 - trailProgress * 0.7);
        
        trailPos += noiseOffset;
        
        float dist = length(uv - trailPos);
        float trailSize = 0.06 * (1.0 - trailProgress * 0.8) * (0.7 + fi * 0.05);
        
        // Soft falloff for liquid effect
        float intensity = 1.0 - smoothstep(0.0, trailSize, dist);
        intensity = pow(intensity, 0.8); // Softer edges
        
        // Fade the trail
        intensity *= (1.0 - trailProgress * 0.9);
        
        // Pulsing effect
        intensity *= sin(time * 2.0 + fi + trailProgress * 2.0) * 0.3 + 0.7;
        
        // Color shifts based on position and time
        vec3 inkColor;
        float colorPhase = fi * 0.4 + time * 0.3 + trailProgress * 0.5;
        
        if(mod(colorPhase, 1.0) < 0.25) {
          inkColor = vec3(0.2, 0.4, 0.9); // Deep blue
        } else if(mod(colorPhase, 1.0) < 0.5) {
          inkColor = vec3(0.7, 0.2, 0.8); // Purple
        } else if(mod(colorPhase, 1.0) < 0.75) {
          inkColor = vec3(0.9, 0.5, 0.2); // Orange
        } else {
          inkColor = vec3(0.2, 0.8, 0.5); // Teal
        }
        
        color += inkColor * intensity;
      }
    }
    
    return color;
  }

  // Create ripple effects around mouse
  vec3 createRipples(vec2 uv, vec2 mousePos, float time) {
    vec3 color = vec3(0.0);
    
    float mouseDist = distance(uv, mousePos);
    
    // Multiple ripple waves
    for(int i = 0; i < 4; i++) {
      float fi = float(i);
      float rippleTime = time * 2.0 + fi * 1.5;
      float rippleRadius = mod(rippleTime * 0.3, 0.8);
      
      float rippleDist = abs(mouseDist - rippleRadius);
      float rippleIntensity = (1.0 - smoothstep(0.0, 0.02, rippleDist));
      
      // Fade out ripples over time
      float rippleFade = 1.0 - smoothstep(0.0, 0.8, rippleRadius);
      rippleIntensity *= rippleFade;
      
      vec3 rippleColor = vec3(0.8, 0.9, 1.0);
      color += rippleColor * rippleIntensity * 0.3;
    }
    
    return color;
  }

  // Create flowing waves in background
  vec3 createFlowingWaves(vec2 uv, vec2 mousePos, float time) {
    vec3 color = vec3(0.0);
    
    // Distance field from mouse
    float mouseDist = distance(uv, mousePos);
    float mouseInfluence = 1.0 / (mouseDist * 2.0 + 1.0);
    
    // Flowing wave patterns
    float wave1 = sin(uv.x * 8.0 + time * 1.2 + mouseInfluence * 2.0);
    float wave2 = cos(uv.y * 6.0 + time * 1.5 + mouseInfluence * 1.5);
    float wave3 = sin((uv.x + uv.y) * 4.0 + time * 0.8);
    
    float wavePattern = (wave1 + wave2 + wave3) / 3.0;
    wavePattern = smoothstep(-0.3, 0.3, wavePattern);
    
    // Color based on wave and mouse influence
    vec3 waveColor = vec3(
      0.1 + mouseInfluence * 0.4,
      0.15 + mouseInfluence * 0.3,
      0.3 + mouseInfluence * 0.5
    );
    
    color += waveColor * wavePattern * mouseInfluence * 0.2;
    
    return color;
  }

  // Create swirling vortex at mouse position
  vec3 createVortex(vec2 uv, vec2 mousePos, float time) {
    vec3 color = vec3(0.0);
    
    vec2 toMouse = uv - mousePos;
    float dist = length(toMouse);
    float angle = atan(toMouse.y, toMouse.x);
    
    // Create spiral motion
    angle += sin(time * 3.0) * 2.0 / (dist * 3.0 + 1.0);
    
    // Spiral intensity
    float spiralIntensity = sin(dist * 12.0 - time * 4.0) * 0.5 + 0.5;
    spiralIntensity *= 1.0 / (dist * 4.0 + 1.0);
    
    vec3 spiralColor = vec3(
      sin(angle + time) * 0.5 + 0.5,
      cos(angle + time * 1.3) * 0.5 + 0.5,
      sin(angle * 2.0 + time * 0.7) * 0.5 + 0.5
    ) * 0.8;
    
    color += spiralColor * spiralIntensity * 0.4;
    
    return color;
  }

  void main() {
    vec2 uv = v_uv;
    vec3 finalColor = vec3(0.0);
    
    // Layer all effects
    finalColor += createLiquidTrails(uv, u_mouse, u_targetMouse, u_time) * 0.8;
    finalColor += createRipples(uv, u_mouse, u_time) * 0.6;
    finalColor += createFlowingWaves(uv, u_mouse, u_time) * 0.5;
    finalColor += createVortex(uv, u_mouse, u_time) * 0.7;
    
    // Add bright mouse cursor glow
    float mouseDist = distance(uv, u_mouse);
    float mouseGlow = (1.0 - smoothstep(0.0, 0.15, mouseDist)) * 0.6;
    finalColor += vec3(1.0, 0.9, 0.8) * mouseGlow;
    
    // Subtle breathing effect
    finalColor *= 0.9 + sin(u_time * 1.5) * 0.1;
    
    // Soft vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.4;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
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
  const u_targetMouse = gl.getUniformLocation(program, "u_targetMouse");

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

    // Very smooth mouse interpolation for dramatic trailing
    const lerpSpeed = 0.04; // Even slower for longer trails
    mouse.x += (targetMouse.x - mouse.x) * lerpSpeed;
    mouse.y += (targetMouse.y - mouse.y) * lerpSpeed;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(u_time, time * 0.001);
    gl.uniform2f(u_mouse, mouse.x, mouse.y);
    gl.uniform2f(u_targetMouse, targetMouse.x, targetMouse.y);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animationFrame = requestAnimationFrame(render);
  }
  render(0);

  onBeforeUnmount(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", updateMouse);
  });
});
</script>

<style scoped>
canvas {
  display: block;
  touch-action: none;
}
</style>
