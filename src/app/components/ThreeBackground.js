"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load("/blur.webp");
    texture1.wrapS = texture1.wrapT = THREE.RepeatWrapping;
    
    const texture2 = textureLoader.load("/grain.webp");
    texture2.wrapS = texture2.wrapT = THREE.RepeatWrapping;

    // Materials and geometry
    const materials = new THREE.ShaderMaterial({
      uniforms: {
        texture1: { type: "t", value: texture1 },
        texture2: { type: "t", value: texture2 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;
        void main() {
          vec4 color1 = texture2D(texture1, vUv);
          vec4 color2 = texture2D(texture2, vUv);
          gl_FragColor = mix(color1, color2, 0.5);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(5, 3, 1);

    const mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);

    camera.position.z = 5;

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      texture1.offset.y += 0.001;
      texture2.offset.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeBackground;
