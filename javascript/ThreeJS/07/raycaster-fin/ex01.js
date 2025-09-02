import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ----- 특정 방향의 광선(Ray)에 맞은 Mesh 판별하기

// Renderer
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.5;
camera.position.z = 4;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "seagreen",
});
const box = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshStandardMaterial({
  color: "orange",
});
const ball = new THREE.Mesh(geometry2, material2);
ball.position.z = -2;

box.name = "box";
ball.name = "ball";
scene.add(box, ball);

// 선 만들기
const lineMaterial = new THREE.LineBasicMaterial({ color: "yellow" });
// 점 배열 만들기
const points = [];
points.push(new THREE.Vector3(0, 0, 100));
points.push(new THREE.Vector3(0, 0, -100));
// 선 만들기
const lineGeomatry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeomatry, lineMaterial);
scene.add(line);

const clock = new THREE.Clock();
// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = { x: 0, y: 0 };

window.addEventListener("resize", setSize);
window.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
});
renderer.setAnimationLoop(animate);

function animate() {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  ball.position.y = Math.sin(time * 2);
  box.position.y = Math.cos(time * 4);

  // 광선 쏘기
  const origin = points[0];
  const direction = points[1];
  direction.normalize(); // 정수화
  raycaster.set(origin, direction); // ray 세팅

  scene.children.forEach((item) => {
    // console.log(item);
    if (item.isMesh) {
      // item.material.color.set("hotpink");
    }
  });

  // ray(광선)에 맞은 메쉬 체크
  const intersets = raycaster.intersectObjects(scene.children);
  intersets.forEach((item) => {
    if (item.object.isMesh) {
      // console.log(item.object.name);
      // item.object.material.color.set("blue");
    }
  });

  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
