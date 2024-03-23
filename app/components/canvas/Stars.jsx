import { PointMaterial, Points, Preload } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import * as random from "maath/random/dist/maath-random.cjs"
import { Suspense, useRef, useState } from "react"

const Stars = (props) => {
   const ref = useRef()
   const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }))

   useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 20
      ref.current.rotation.y -= delta / 25
   })

   return (
      <group rotation={[0, 0, Math.PI / 4]}>
         <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
            <PointMaterial transparent color="#f263c7" size={0.002} sizeAttenuation={true} depthWrite={false} />
         </Points>
      </group>
   )
}

const StarsCanvas = () => {
   return (
      <div className="absolute inset-0 z-[-1] h-auto w-full">
         <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
               <Stars />
            </Suspense>
            <Preload all />
         </Canvas>
      </div>
   )
}

export default StarsCanvas
