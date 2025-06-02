"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Create multiple particle systems with different colors
    const particlesMaterial1 = new THREE.PointsMaterial({
      size: 0.005,
      color: new THREE.Color("#00BFFF"), // Electric blue
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.005,
      color: new THREE.Color("#FFFFFF"), // White
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh1 = new THREE.Points(particlesGeometry.clone(), particlesMaterial1)
    const particlesMesh2 = new THREE.Points(particlesGeometry.clone(), particlesMaterial2)

    // Create a globe
    const globeRadius = 1
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64)
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)

    // Create globe wireframe for the map lines
    const wireframeGeometry = new THREE.EdgesGeometry(globeGeometry)
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x00bfff,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)

    // Create latitude and longitude lines
    const latitudeCount = 10
    const longitudeCount = 20
    const latitudeGroup = new THREE.Group()
    const longitudeGroup = new THREE.Group()

    // Create latitude lines
    for (let i = 0; i < latitudeCount; i++) {
      const y = Math.cos((i / latitudeCount) * Math.PI) * globeRadius
      const radius = Math.sin((i / latitudeCount) * Math.PI) * globeRadius

      const points = []
      for (let j = 0; j <= 100; j++) {
        const angle = (j / 100) * Math.PI * 2
        points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x00bfff, transparent: true, opacity: 0.2 }),
      )
      latitudeGroup.add(line)
    }

    // Create longitude lines
    for (let i = 0; i < longitudeCount; i++) {
      const angle = (i / longitudeCount) * Math.PI * 2
      const x = Math.cos(angle) * globeRadius
      const z = Math.sin(angle) * globeRadius

      const points = []
      for (let j = 0; j <= 100; j++) {
        const y = Math.cos((j / 100) * Math.PI) * globeRadius
        const radius = Math.sin((j / 100) * Math.PI) * globeRadius
        points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius))
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x00bfff, transparent: true, opacity: 0.2 }),
      )
      longitudeGroup.add(line)
    }

    // Create connection points (representing network nodes)
    const connectionPoints = new THREE.Group()
    const connectionCount = 20

    for (let i = 0; i < connectionCount; i++) {
      // Random position on the globe
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI

      const x = globeRadius * Math.sin(theta) * Math.cos(phi)
      const y = globeRadius * Math.sin(theta) * Math.sin(phi)
      const z = globeRadius * Math.cos(theta)

      // Create a small sphere for the connection point
      const pointGeometry = new THREE.SphereGeometry(0.01, 8, 8)
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00bfff : 0xffffff,
      })
      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      point.position.set(x, y, z)

      // Add some random animation data
      point.userData = {
        pulsateSpeed: 0.5 + Math.random() * 2,
        originalScale: point.scale.x,
        randomOffset: Math.random() * Math.PI * 2,
      }

      connectionPoints.add(point)
    }

    // Create connections between some points (network lines)
    const connections = new THREE.Group()

    for (let i = 0; i < connectionCount / 2; i++) {
      const startPoint = connectionPoints.children[Math.floor(Math.random() * connectionCount)]
      const endPoint = connectionPoints.children[Math.floor(Math.random() * connectionCount)]

      if (startPoint !== endPoint) {
        const points = []
        points.push(startPoint.position.clone())
        points.push(endPoint.position.clone())

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00bfff,
          transparent: true,
          opacity: 0.3,
        })
        const line = new THREE.Line(lineGeometry, lineMaterial)

        // Add animation data
        line.userData = {
          startPoint,
          endPoint,
          pulseSpeed: 0.5 + Math.random() * 1.5,
        }

        connections.add(line)
      }
    }

    // Add all elements to the scene
    scene.add(particlesMesh1)
    scene.add(particlesMesh2)
    scene.add(globe)
    scene.add(wireframe)
    scene.add(latitudeGroup)
    scene.add(longitudeGroup)
    scene.add(connectionPoints)
    scene.add(connections)

    // Position the globe
    globe.position.set(1.5, 0, 0)
    wireframe.position.set(1.5, 0, 0)
    latitudeGroup.position.set(1.5, 0, 0)
    longitudeGroup.position.set(1.5, 0, 0)
    connectionPoints.position.set(1.5, 0, 0)
    connections.position.set(1.5, 0, 0)

    // Camera position
    camera.position.z = 2

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Rotate the globe slowly
      globe.rotation.y = elapsedTime * 0.1
      wireframe.rotation.y = elapsedTime * 0.1
      latitudeGroup.rotation.y = elapsedTime * 0.1
      longitudeGroup.rotation.y = elapsedTime * 0.1
      connectionPoints.rotation.y = elapsedTime * 0.1
      connections.rotation.y = elapsedTime * 0.1

      // Animate connection points (pulsating)
      connectionPoints.children.forEach((point) => {
        const { pulsateSpeed, originalScale, randomOffset } = point.userData
        const scale = 1 + 0.3 * Math.sin(elapsedTime * pulsateSpeed + randomOffset)
        point.scale.set(scale, scale, scale)
      })

      // Particle animation
      particlesMesh1.rotation.y += 0.001
      particlesMesh1.rotation.x += 0.0005

      particlesMesh2.rotation.y -= 0.0008
      particlesMesh2.rotation.x -= 0.0003

      // Follow mouse with slight delay
      particlesMesh1.rotation.y += (mouseX * 0.1 - particlesMesh1.rotation.y) * 0.05
      particlesMesh1.rotation.x += (mouseY * 0.1 - particlesMesh1.rotation.x) * 0.05

      particlesMesh2.rotation.y += (mouseX * 0.08 - particlesMesh2.rotation.y) * 0.04
      particlesMesh2.rotation.x += (mouseY * 0.08 - particlesMesh2.rotation.x) * 0.04

      // Subtle globe movement based on mouse
      const globeGroup = new THREE.Group()
      globeGroup.add(globe, wireframe, latitudeGroup, longitudeGroup, connectionPoints, connections)
      globeGroup.rotation.y += (mouseX * 0.05 - globeGroup.rotation.y) * 0.01
      globeGroup.rotation.x += (mouseY * 0.05 - globeGroup.rotation.x) * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      // Dispose resources
      particlesGeometry.dispose()
      particlesMaterial1.dispose()
      particlesMaterial2.dispose()
      globeGeometry.dispose()
      globeMaterial.dispose()
      wireframeGeometry.dispose()
      wireframeMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-800/60 to-gray-700/90" />

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-24 pb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto md:mx-0"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-100">
              <span className="text-[#3F51B5]">YUVA</span> - Empowering Tomorrow's Leaders
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Creating a dynamic platform where young visionaries collaborate to drive innovation, leadership, and
              meaningful social change across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Button className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#374151] text-lg px-8 py-6 glow-effect">
                Join The Movement
              </Button>

              <Button
                variant="outline"
                className="border-[#3F51B5]/20 hover:bg-[#3F51B5]/10 text-[#3F51B5] text-lg px-8 py-6 glow-effect"
              >
                Discover Our Impact <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
