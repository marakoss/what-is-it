import React from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, THREE } from "expo-three";

export default function App() {
  //const glViewRef = useRef(null);

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <StatusBar style="auto" />
      <GLView
        style={{ width: "100%", height: "100%" }}
        onContextCreate={(gl: ExpoWebGLRenderingContext) => {
          const width = gl.drawingBufferWidth;
          const height = gl.drawingBufferHeight;
          console.log(width, height);

          const renderer = new Renderer({
            gl: gl,
            width: width,
            height: height,
            pixelRatio: width / height,
            clearColor: new THREE.Color(0x000000),
          });

          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xff0000);

          const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
          );

          camera.position.z = 1;

          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
          });

          const cube = new THREE.Mesh(geometry, material);
          cube.position.z = -0.4;
          scene.add(cube);

          const animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          animate();
        }}
      ></GLView>
    </View>
  );
}
