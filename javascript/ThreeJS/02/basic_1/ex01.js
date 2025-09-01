import * as THREE from "three";

// 기본 장면
// console.log(THREE);

// Randerer
// 1. 캔버스 동적으로 생성하기
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "three-canvas";
document.body.append(renderer.domElement);

// 2. HTML에 있는 캔버스 이용하기
// const canves = document.getElementById("three-canvas");
// const renderer = new THREE.WebGLRenderer({
//   canvas: canves,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera( // 원근 적용 카메라
  75, // 시야각(fov: field of view)
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // 가까이(near)
  1000 // 멀리(far)
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera); // 무대에 카메라 조립

// Mash
const geometry = new THREE.BoxGeometry(1, 1, 1); // 직육면체
const material = new THREE.MeshBasicMaterial({
  color: "dodgerblue",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render
renderer.render(scene, camera);
