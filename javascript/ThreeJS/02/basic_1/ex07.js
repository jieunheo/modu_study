import * as THREE from "three";
import gsap from "gsap";

// 라이브러리를 이용한 애니메이션

// Randerer
const canves = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canves,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
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

// Light
const ambientLite = new THREE.AmbientLight("white"); // AmbientLight: 톤만 조정
// scene.add(ambientLite);

const spotLight = new THREE.SpotLight("white", 100); // SpotLight: 톤만 조정
spotLight.position.set(1, 3, 3);
scene.add(ambientLite, spotLight);

// Mash
const geometry = new THREE.BoxGeometry(1, 1, 1); // 직육면체
const material = new THREE.MeshLambertMaterial({
  color: "dodgerblue",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Render

//gsap
gsap.from(mesh.position, {
  duration: 1,
  x: 3,
  ease: "elastic",
});

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
}

// camera.lookAt(mesh.position); // 처음 1회만 가운데로 바라봄
renderer.setAnimationLoop(animate); // requestAnimationFrame 대신 사용 가능
animate();

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
