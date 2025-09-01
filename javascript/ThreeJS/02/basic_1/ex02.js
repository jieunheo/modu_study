import * as THREE from "three";

// 창사이즈에 맞게 크기 조정

// Randerer
// 1. 캔버스 동적으로 생성하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.domElement.id = "three-canvas";
// document.body.append(renderer.domElement);

// 2. HTML에 있는 캔버스 이용하기
const canves = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canves,
  antialias: true, // 부드럽게
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(2); // 고해상도
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 디바이스따라서

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

// Event
window.addEventListener("resize", setSize);
function setSize() {
  // 카메라 업데이트
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비
  camera.updateProjectionMatrix(); // 카메라 투영에 관한 값이 변화가 있는 경우 실행

  // renderer 사이즈 업데이트
  renderer.setSize(window.innerWidth, window.innerHeight);

  // render
  renderer.render(scene, camera);
}
