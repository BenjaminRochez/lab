import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { damp3 } from "maath/easing";
import { Vector3 } from "three";

function RayPlane(props) {
  return (
    <mesh {...props} onPointerDown={props.handleClick}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial />
    </mesh>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial />
    </mesh>
  );
}

function Box(props) {
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));

  api.position.set(props.nextPosition[0], -1.5, props.nextPosition[2]);
  const startPosition = new Vector3(...props.position);
  const endPosition = new Vector3(...props.nextPosition);
  const tweenTime = 3; // seconds
  const direction = new Vector3();

  const totalLength = startPosition.distanceTo(endPosition);
  var speed = totalLength / tweenTime;

  console.log(speed);
  //   var direction = new Vector3();
  //   endPosition.vsub(startPosition, direction);
  //   var totalLength = direction.length();
  //   console.log(totalLength);
  //   direction.normalize();
  // api.velocity.set(direction.x, velocity.current[1], direction.z);
  // useFrame((state, delta) => {
  //   damp3(props.position, clicked ? 1 : 1.25, 0.25, delta)
  // })

  console.log(props);
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
}

function App() {
  const [pos, setPos] = useState([1, 1, 1]);
  const handleClick = (e) => {
    setPos([e.point.x, e.point.y, e.point.z]);
  };

  return (
    <Canvas camera={{ position: [2, 2, 2], near: 0.01, far: 110, fov: 90 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Physics>
        <Box position={[2, 3, 1]} nextPosition={pos} rotation={[0.4, 10, 5]} />

        <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
      </Physics>
      <RayPlane
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        handleClick={handleClick}
      />
    </Canvas>
  );
}

export default App;
