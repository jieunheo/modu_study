import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ----- Light 기본

// Renderer
const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// 5. 그림자 설정 기능 on
renderer.shadowMap.enabled = true;
// 7. 그림자 퀄리티 설정
// renderer.shadowMap.type = THREE.PCFShadowMap; // 퀄리티 기본값
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 부드러움, 제일 많이 씀
// renderer.shadowMap.type = THREE.BasicShadowMap; // 찌글거림

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 6;
camera.position.z = 6;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 2);
// directionalLight.position.x = 1;
// directionalLight.position.z = 2;
// 6. 그림자 사용 추가
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048; // 기본값 512
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1; // 가까이 제한
directionalLight.shadow.camera.far = 10; // 멀리 제한
directionalLight.position.set(-1, 5, 2);
scene.add(directionalLight);

// 4. 조명 헬퍼 추가
const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(helper);

const controls = new OrbitControls(camera, renderer.domElement);

// Mesh
// 1. 바닥 만들기
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: "pink",
  })
);
floor.receiveShadow = true; // 7. 그림자 사용 추가
floor.rotation.x = -Math.PI / 2;

// 2. 메쉬 두개 만들기
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: "seagreen",
});
const box1 = new THREE.Mesh(geometry, material);
box1.position.set(-2, 1, -0.5);
// 6. 그림자 사용 추가
box1.castShadow = true;

const material2 = new THREE.MeshToonMaterial({
  color: "orange",
});
const box2 = new THREE.Mesh(geometry, material2);
box2.position.set(2, 1.2, 0.5);
// 6. 그림자 사용 추가
box2.castShadow = true;

// 3. 매달기
scene.add(floor, box1, box2);

window.addEventListener("resize", setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
