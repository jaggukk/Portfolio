import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh, Vector3 } from "three";

import pagodaModel from "@/assets/models/pagoda-portfolio.glb.asset.json";

const positions = [
  new Vector3(39, 22, 48),
  new Vector3(34, 18, 43),
  new Vector3(27, 27, 39),
  new Vector3(39, 14, 47),
];
const targets = [
  new Vector3(-3.5, 14, 0),
  new Vector3(-2.5, 14, 0),
  new Vector3(-1, 19, 0),
  new Vector3(-2, 11, 0),
];

function Pagoda() {
  const { scene } = useGLTF(pagodaModel.url);
  const group = useRef<Group>(null);
  const reducedMotion = useRef(false);
  const cameraPosition = useRef(new Vector3());
  const point = useRef(new Vector3());
  const lookAt = useRef(new Vector3());
  const inkScene = useMemo(() => {
    const clone = scene.clone(true);
    const inkMaterial = new LineBasicMaterial({
      color: "#39261c",
      transparent: true,
      opacity: 0.56,
      depthTest: false,
    });
    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => {
            const toned = material.clone();
            if ("color" in toned) toned.color.set("#d9c49f");
            if ("roughness" in toned) toned.roughness = 0.96;
            return toned;
          })
        : (() => {
            const toned = object.material.clone();
            if ("color" in toned) toned.color.set("#d9c49f");
            if ("roughness" in toned) toned.roughness = 0.96;
            return toned;
          })();
      const ink = new LineSegments(new EdgesGeometry(object.geometry, 18), inkMaterial);
      ink.scale.multiplyScalar(1.001);
      ink.renderOrder = 2;
      object.add(ink);
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotion.current = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useFrame(({ camera, size }, delta) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    const scaled = progress * (positions.length - 1);
    const index = Math.min(positions.length - 2, Math.floor(scaled));
    const startPosition = positions[index];
    const endPosition = positions[index + 1];
    const startTarget = targets[index];
    const endTarget = targets[index + 1];
    if (!startPosition || !endPosition || !startTarget || !endTarget) return;
    const blend = scaled - index;
    point.current.lerpVectors(startPosition, endPosition, blend);
    lookAt.current.lerpVectors(startTarget, endTarget, blend);

    const mobile = size.width < 700;
    cameraPosition.current.set(
      point.current.x + (mobile ? 2 : 0),
      point.current.y,
      point.current.z + (mobile ? 13 : 0),
    );
    camera.position.lerp(
      cameraPosition.current,
      reducedMotion.current ? 1 : 1 - Math.exp(-2.3 * delta),
    );
    camera.lookAt(lookAt.current);
    if (group.current) {
      group.current.rotation.y = reducedMotion.current
        ? 0
        : Math.sin(progress * Math.PI * 2) * 0.055;
    }
  });

  return (
    <group ref={group} scale={0.72} position={[0, 0, 0]}>
      <primitive object={inkScene} />
    </group>
  );
}

function ReadySignal() {
  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>(".portfolio-scene");
    if (wrapper) wrapper.dataset["sceneReady"] = "true";
    return () => {
      if (wrapper) wrapper.dataset["sceneReady"] = "false";
    };
  }, []);
  return null;
}

export default function PagodaScene() {
  return (
    <Canvas
      camera={{ position: [39, 22, 48], fov: 38, near: 0.1, far: 120 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-label="Three-dimensional pagoda that moves through the portfolio as you scroll"
    >
      <ambientLight intensity={1.65} />
      <directionalLight position={[18, 30, 22]} intensity={2.1} />
      <directionalLight position={[-18, 10, -16]} intensity={0.75} />
      <Pagoda />
      <ReadySignal />
    </Canvas>
  );
}

useGLTF.preload(pagodaModel.url);
