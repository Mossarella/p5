"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeTextScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Font loader
    const loader = new FontLoader();
    loader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
      const geometry = new TextGeometry("WARP", {
        font: font,
        size: 60,
        height: 20,
        curveSegments: 12,
        bevelEnabled: false,
        // bevelThickness: 2,
        // bevelSize: 1.5,
        // bevelOffset: 0,
        // bevelSegments: 3,
      });

      geometry.center();

      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      camera.position.z = 200;

      const animate = () => {
        requestAnimationFrame(animate);
        // mesh.rotation.y += 0.01;
        // mesh.rotation.x += 0.005;
        controls.update(); //
        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full fixed top-0 left-0"
    />
  );
}
