import { Raycaster } from "three";

export default function setRaycaster({ eventObject, camera, scene, onClick }) {
  const raycaster = new Raycaster();
  const mouse = { x: 0, y: 0 };
  let isDragging = false; // 드레그 화면 true

  eventObject.addEventListener("mousedown", () => (isDragging = false));
  eventObject.addEventListener("mousedmove", () => (isDragging = true));

  eventObject.addEventListener("click", (e) => {
    if (isDragging) return;

    if (eventObject === window) {
      mouse.x = (e.clientX / eventObject.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / eventObject.innerHeight) * 2 + 1;
    } else {
      mouse.x = (e.clientX / eventObject.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / eventObject.clientHeight) * 2 + 1;
    }

    raycaster.setFromCamera(mouse, camera); // 마우스좌표 정보와 카메라를 이용해서 설정

    // ray(광선)에 맞은 메쉬들을 체크
    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      if (item.object.isMesh) {
        if (onClick) onClick(item.object);
        break;
      }
    }
  });
}
