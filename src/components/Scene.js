import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Scene = () => {

    const sceneRef = useRef();

    useEffect(() => {
        const currentMount = sceneRef.current;

        //Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 8;
        scene.add(camera);

        //Renderer
        const renderer = new THREE.WebGLRenderer({ pixelRatio: currentMount.devicePixelRatio, alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        //Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(0, 0, 0);
        controls.enableDamping = true;

        //Cube
        const cube = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff0000, transparent: true, opacity: 0.3 }),
        );
        scene.add(cube);

        //Sphere
        const textureLoader = new THREE.TextureLoader();
        const sphereTexture = textureLoader.load('./textures/purple.png');

        const geometry = new THREE.SphereGeometry(0.8, 32, 16);
        const material = new THREE.MeshMatcapMaterial({ matcap: sphereTexture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphere.position.set(2, -0.5, 0);

        //Torus
        const geometry1 = new THREE.TorusKnotGeometry(0.5, 0.18, 100, 16);
        const material1 = new THREE.MeshNormalMaterial({
            flatShading: true,
        });
        const torusKnot = new THREE.Mesh(geometry1, material1);
        torusKnot.position.set(-2, 0, 0);
        scene.add(torusKnot);

        //Render the scene
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        //Clean up scene
        return () => {
            currentMount.removeChild(renderer.domElement);
        }
    });
    return (
        <div className="container" style={{ width: '100%', height: '100vh' }} ref={sceneRef}>
        </div>
    )
}

export default Scene