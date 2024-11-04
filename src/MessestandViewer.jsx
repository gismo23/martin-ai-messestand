// 1. src/MessestandViewer.jsx
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es "src/MessestandViewer.jsx")
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const MessestandViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Floor (hellbraun)
    const floorGeometry = new THREE.BoxGeometry(12, 0.1, 12);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xd4b995 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.05;
    scene.add(floor);

    // Walls (weiß)
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    
    // Back wall
    const backWallGeometry = new THREE.BoxGeometry(12, 4, 0.2);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 2, -6);
    scene.add(backWall);

    // Side wall
    const sideWallGeometry = new THREE.BoxGeometry(0.2, 4, 12);
    const sideWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    sideWall.position.set(-6, 2, 0);
    scene.add(sideWall);

    // Logo "Martin AI" (rot)
    const textGeometry = new THREE.BoxGeometry(4, 1, 0.1);
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const logo = new THREE.Mesh(textGeometry, textMaterial);
    logo.position.set(0, 3, -5.9);
    scene.add(logo);

    // STULZ Klimageräte
    const acUnitGeometry = new THREE.BoxGeometry(1, 2, 0.5);
    const acUnitMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });

    // Drei Klimageräte
    const positions = [
      [-5, 1, -5.8],
      [0, 1, -5.8],
      [5, 1, -5.8]
    ];

    positions.forEach(pos => {
      const acUnit = new THREE.Mesh(acUnitGeometry, acUnitMaterial);
      acUnit.position.set(...pos);
      scene.add(acUnit);
    });

    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 30;
    controls.minDistance = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MessestandViewer;

// 2. src/main.jsx
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es "src/main.jsx")
import React from 'react'
import ReactDOM from 'react-dom/client'
import MessestandViewer from './MessestandViewer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MessestandViewer />
  </React.StrictMode>
)

// 3. index.html
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es "index.html")
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Martin AI Messestand</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

// 4. package.json
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es "package.json")
{
  "name": "martin-ai-messestand",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.157.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    "gh-pages": "^6.0.0"
  }
}

// 5. vite.config.js
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es "vite.config.js")
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/martin-ai-messestand/',
  server: {
    host: '0.0.0.0'
  }
})

// 6. .github/workflows/deploy.yml
// (Klicken Sie auf "Add file" > "Create new file", nennen Sie es ".github/workflows/deploy.yml")
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
