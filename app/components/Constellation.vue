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

  // Create flowing particles with smooth trailing
  vec3 createParticles(vec2 uv, vec2 mousePos, vec2 targetPos, float time) {
    vec3 color = vec3(0.0);
    
    // Create multiple particle streams with different lag amounts
    for(int i = 0; i < 8; i++) {
      float fi = float(i);
      
      // Each particle has unique properties and different following behavior
      float speed = 0.4 + hash(vec2(fi)) * 0.8;
      float lagFactor = 0.3 + fi * 0.1; // Different lag for each particle
      float angle = fi * 0.785 + time * speed; // 45 degrees apart
      float radius = 0.12 + sin(time * 0.6 + fi) * 0.06;
      
      // Interpolate between current mouse and target mouse based on lag
      vec2 laggedMouse = mix(targetPos, mousePos, lagFactor);
      
      // Particle position orbiting around lagged mouse
      vec2 particlePos = laggedMouse + vec2(
        cos(angle) * radius,
        sin(angle) * radius
      );
      
      // Create smooth trails by sampling positions along the orbital path
      for(int j = 0; j < 6; j++) {
        float fj = float(j);
        float trailOffset = fj * 0.08; // Trail spacing
        
        // Calculate trail position with time offset
        float trailAngle = angle - trailOffset * speed;
        vec2 trailPos = laggedMouse + vec2(
          cos(trailAngle) * radius,
          sin(trailAngle) * radius
        );
        
        float dist = length(uv - trailPos);
        float intensity = (1.0 - smoothstep(0.0, 0.05, dist)) * (1.0 - fj * 0.12);
        
        // Add smooth pulsing to trails
        intensity *= (sin(time * 1.8 + fi + fj * 0.3) * 0.2 + 0.8);
        
        // Different colors for different particles
        vec3 particleColor;
        if(i < 2) {
          particleColor = vec3(0.4, 0.8, 1.0); // Cyan
        } else if(i < 4) {
          particleColor = vec3(1.0, 0.5, 0.8); // Pink
        } else if(i < 6) {
          particleColor = vec3(0.8, 1.0, 0.4); // Green
        } else {
          particleColor = vec3(1.0, 0.8, 0.3); // Gold
        }
        
        color += particleColor * intensity;
      }
    }
    
    return color;
  }

  // Create geometric shapes that pulse
  float createShape(vec2 p, float size, int shapeType) {
    if(shapeType == 0) {
      return 1.0 - smoothstep(size - 0.01, size + 0.01, length(p));
    } else if(shapeType == 1) {
      p = abs(p);
      return 1.0 - smoothstep(size - 0.01, size + 0.01, (p.x + p.y));
    } else if(shapeType == 2) {
      vec2 d = abs(p) - size;
      return 1.0 - smoothstep(-0.01, 0.01, max(d.x, d.y));
    } else {
      p.y += size * 0.3;
      return 1.0 - smoothstep(size - 0.01, size + 0.01, 
        max(abs(p.x) * 0.866 + p.y * 0.5, -p.y));
    }
  }

  void main() {
    vec2 uv = v_uv;
    
    // Create particles with smooth trailing
    vec3 particles = createParticles(uv, u_mouse, u_targetMouse, u_time);
    
    // Add geometric shapes near mouse with lag
    vec2 shapeCenter = mix(u_targetMouse, u_mouse, 0.7); // Slightly lagged
    float mouseDist = distance(uv, shapeCenter);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.25, mouseDist);
    
    if(mouseInfluence > 0.1) {
      for(int i = 0; i < 4; i++) {
        float fi = float(i);
        float angle = fi * 1.57 + u_time * 0.4;
        float radius = 0.08 + sin(u_time * 1.5 + fi) * 0.03;
        
        vec2 shapePos = shapeCenter + vec2(cos(angle), sin(angle)) * radius;
        float shapeSize = 0.015 + sin(u_time * 2.5 + fi) * 0.008;
        
        float shape = createShape(uv - shapePos, shapeSize, i);
        
        vec3 shapeColor;
        if(i == 0) shapeColor = vec3(1.0, 0.6, 0.6);
        else if(i == 1) shapeColor = vec3(0.6, 1.0, 0.6);
        else if(i == 2) shapeColor = vec3(0.6, 0.6, 1.0);
        else shapeColor = vec3(1.0, 1.0, 0.6);
        
        particles += shapeColor * shape * mouseInfluence;
      }
    }
    
    // Add soft glow around current mouse
    float currentGlow = (1.0 - smoothstep(0.0, 0.15, distance(uv, u_mouse))) * 0.2;
    particles += vec3(0.9, 0.9, 1.0) * currentGlow;
    
    // Add trailing glow
    float trailGlow = (1.0 - smoothstep(0.0, 0.2, distance(uv, u_targetMouse))) * 0.1;
    particles += vec3(0.7, 0.8, 1.0) * trailGlow;
    
    // Add some drifting sparkles
    float sparkle = 0.0;
    for(int i = 0; i < 5; i++) {
      vec2 sparklePos = vec2(
        sin(u_time * 0.6 + float(i) * 1.8) * 0.7,
        cos(u_time * 0.8 + float(i) * 1.3) * 0.5
      );
      sparklePos = sparklePos * 0.5 + 0.5;
      
      float sparkleDist = length(uv - sparklePos);
      sparkle += (1.0 - smoothstep(0.0, 0.015, sparkleDist)) * 
                 (sin(u_time * 3.0 + float(i)) * 0.5 + 0.5);
    }
    particles += vec3(1.0, 1.0, 0.9) * sparkle * 0.15;
    
    gl_FragColor = vec4(particles, 1.0);
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

    // Smooth mouse interpolation - slower for more trailing
    const lerpSpeed = 0.06; // Even slower for more dramatic trailing
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
