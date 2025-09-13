<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);

let gl: WebGLRenderingContext | null = null;
let program: WebGLProgram | null = null;
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

  vec2 getNode(int i) {
    if(i == 0) return vec2(0.2, 0.8);
    if(i == 1) return vec2(0.7, 0.7);
    if(i == 2) return vec2(0.3, 0.5);
    if(i == 3) return vec2(0.8, 0.4);
    if(i == 4) return vec2(0.15, 0.3);
    if(i == 5) return vec2(0.6, 0.2);
    if(i == 6) return vec2(0.4, 0.9);
    return vec2(0.9, 0.6); // i == 7
  }

  void main() {
    vec2 uv = v_uv;
    vec3 color = vec3(0.02, 0.02, 0.05); // dark background

    // Connections
    for(int i = 0; i < 8; i++) {
      vec2 nodeA = getNode(i);

      for(int j = i + 1; j < 8; j++) {
        vec2 nodeB = getNode(j);
        float nodeDist = distance(nodeA, nodeB);

        if(nodeDist < 0.4) {
          vec2 lineDir = normalize(nodeB - nodeA);
          vec2 perpDir = vec2(-lineDir.y, lineDir.x);
          vec2 toPoint = uv - nodeA;
          float alongLine = dot(toPoint, lineDir);
          float perpDist = abs(dot(toPoint, perpDir));

          if(alongLine > 0.0 && alongLine < nodeDist) {
            float lineIntensity = (1.0 - smoothstep(0.0, 0.003, perpDist));
            vec2 linePoint = nodeA + lineDir * alongLine;
            float mouseInfluence = 1.0 - smoothstep(0.05, 0.25, distance(u_mouse, linePoint));
            float flow = sin(u_time * 3.0 + alongLine * 15.0) * 0.5 + 0.5;
            color += vec3(0.3, 0.6, 0.9) * lineIntensity * (0.2 + mouseInfluence * 0.8) * flow;
          }
        }
      }

      // Draw node
      float nodeDist = length(uv - nodeA);
      float nodeSize = (i == 0 || i == 1 || i == 3) ? 0.015 : 0.01;
      vec3 nodeColor = (i == 0 || i == 1 || i == 3) ? vec3(1.0, 0.8, 0.3) : vec3(0.7, 0.8, 1.0);
      float nodeIntensity = (1.0 - smoothstep(0.0, nodeSize, nodeDist));
      float pulse = sin(u_time * 2.0 + float(i)) * 0.3 + 0.7;
      color += nodeColor * nodeIntensity * pulse;
    }

    // Mouse glow
    float mouseDist = distance(uv, u_mouse);
    float mouseGlow = (1.0 - smoothstep(0.0, 0.15, mouseDist)) * 0.4;
    color += vec3(0.6, 0.8, 1.0) * mouseGlow;

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
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
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
  if (!vs || !fs) return null;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

onMounted(() => {
  const c = canvas.value!;
  gl = c.getContext("webgl");
  if (!gl) return;

  program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
  if (!program) return;
  gl.useProgram(program);

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
    gl!.viewport(0, 0, c.width, c.height);
  }
  resize();
  window.addEventListener("resize", resize);

  function updateMouse(e: MouseEvent | Touch) {
    const rect = c.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / rect.width;
    targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
  }
  window.addEventListener("mousemove", updateMouse);

  function render(time: number) {
    if (!gl || !program) return;

    mouse.x += (targetMouse.x - mouse.x) * 0.08;
    mouse.y += (targetMouse.y - mouse.y) * 0.08;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u_time, time * 0.001);
    gl.uniform2f(u_mouse, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationFrame = requestAnimationFrame(render);
  }
  render(0);

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
  touch-action: none;
}
</style>
