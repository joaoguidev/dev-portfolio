import { OrbitControls, Preload, useAnimations, useFBX, useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"

const CharacterModel = ({ isMobile }) => {
   const group = useRef()
   const character = useFBX("/models/character-b/Model/characterMedium.fbx")
   const texture = useTexture("/models/character-b/Skins/skaterMaleA.png")
   const { animations } = useFBX("/models/character-b/Animations/idle.fbx")
   const { ref, actions, names } = useAnimations(animations, group)
   useEffect(() => {
      actions[names[0]].reset().play()
   }, [])
   // useFrame(() => (actions["Root|Idle"].time = actions["Root|Idle"].getClip().duration * scroll.offset))
   useEffect(() => {
      // Apply the texture to the desired material in your model
      if (character) {
         character.traverse((child) => {
            if (child.isMesh) {
               child.material.map = texture
            }
         })
      }
   }, [])

   useFrame((state, delta) => {
      ref.current.rotation.y -= delta / 2
   })
   return (
      <group ref={group} dispose={null}>
         <mesh ref={ref} dispose={null}>
            <hemisphereLight intensity={1.5} />
            <spotLight position={[500, 0, 0]} angle={0} penumbra={1} intensity={5} />

            {/* <pointLight intensity={1} /> */}
            <primitive
               object={character}
               scale={isMobile ? 1 : 1}
               position={isMobile ? [0, -190, 0] : [0, -190, 0]}
               // rotation={[-0.01, -0.2, -0.1]}
            />
         </mesh>
      </group>
   )
}

const CharacterModelCanvas = () => {
   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      // Add a listener for changes to the screen size
      const mediaQuery = window.matchMedia("(max-width: 500px)")

      // Set the initial value of the `isMobile` state variable
      setIsMobile(mediaQuery.matches)

      // Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
         setIsMobile(event.matches)
      }

      // Add the callback function as a listener for changes to the media query
      mediaQuery.addEventListener("change", handleMediaQueryChange)

      // Remove the listener when the component is unmounted
      return () => {
         mediaQuery.removeEventListener("change", handleMediaQueryChange)
      }
   }, [])

   return (
      <div className="size-full">
         <Canvas frameloop="always" dpr={[1, 2]} camera={{ position: [0, 0, 420], fov: 50 }} gl={{ preserveDrawingBuffer: true }}>
            <Suspense fallback={null}>
               <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
               <CharacterModel isMobile={isMobile} />
            </Suspense>
            <Preload all />
         </Canvas>
      </div>
   )
}

export default CharacterModelCanvas
