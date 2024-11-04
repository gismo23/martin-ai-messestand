import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const MessestandViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    console.log('Initializing 3D scene...'); // Debug log

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(12, 8, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    if (mountRef.current) {
      console.log('Mounting renderer...'); // Debug log
      mountRef.current.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.1, 12),
      new THREE.MeshPhongMaterial({ color: 0xd4b995 })
    );
    floor.position.y = -0.05;
    scene.add(floor);

    // Back Wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(12, 4, 0.2),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    backWall.position.set(0, 2, -6);
    scene.add(backWall);

    // Logo
    const logo = new THREE.Mesh(
      new THREE.BoxGeometry(4, 1, 0.2),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    logo.position.set(0, 3, -5.8);
    scene.add(logo);

    // AC Units
    const acGeometry = new THREE.BoxGeometry(1, 2, 0.5);
    const acMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    
    [-4, 0, 4].forEach(x => {
      const ac = new THREE.Mesh(acGeometry, acMaterial);
      ac.position.set(x, 1, -5.7);
      scene.add(ac);
    });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 2, 0);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    console.log('Starting animation loop...'); // Debug log
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      console.log('Cleaning up...'); // Debug log
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#f0f0f0'
      }} 
    />
  );
};

export default MessestandViewer;
