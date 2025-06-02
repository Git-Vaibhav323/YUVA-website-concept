"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Create stars
    const starCount = 1000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    const starColors = new Float32Array(starCount * 3)

    // Create constellation points (larger stars)
    const constellationPoints = []
    const constellationCount = 20

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3

      // Random position in sphere
      const radius = Math.random() * 50 + 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[i3 + 2] = radius * Math.cos(phi)

      // Random size
      starSizes[i] = Math.random() * 1.5 + 0.5

      // Color (blue/white theme)
      const colorChoice = Math.random()
      if (colorChoice > 0.8) {
        // Blue stars
        starColors[i3] = 0.5 + Math.random() * 0.2 // R
        starColors[i3 + 1] = 0.7 + Math.random() * 0.3 // G
        starColors[i3 + 2] = 1.0 // B
      } else {
        // White stars
        const brightness = 0.8 + Math.random() * 0.2
        starColors[i3] = brightness
        starColors[i3 + 1] = brightness
        starColors[i3 + 2] = brightness
      }

      // Select some stars as constellation points
      if (i < constellationCount) {
        constellationPoints.push(new THREE.Vector3(starPositions[i3], starPositions[i3 + 1], starPositions[i3 + 2]))
      }
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3))

    // Star material
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        uniform float time;
        uniform float pixelRatio;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Pulsating effect
          float pulse = 0.5 + 0.5 * sin(time + position.x * 100.0);
          
          gl_PointSize = size * pixelRatio * (1.0 + 0.3 * pulse);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular points
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          // Apply glow effect
          vec3 glow = vColor * strength;
          
          gl_FragColor = vec4(glow, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create constellation lines
    const constellationLines = new THREE.Group()

    // Connect constellation points
    for (let i = 0; i < constellationCount; i++) {
      // Connect to 1-3 nearest points
      const connectCount = Math.floor(Math.random() * 3) + 1
      const point = constellationPoints[i]

      // Find nearest points
      const distances = constellationPoints
        .map((p, idx) => ({ distance: point.distanceTo(p), index: idx }))
        .filter((item) => item.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, connectCount)

      // Create lines
      distances.forEach(({ index }) => {
        if (index > i) {
          // Avoid duplicate lines
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([point, constellationPoints[index]])

          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00bfff,
            transparent: true,
            opacity: 0.2 + Math.random() * 0.2,
          })

          const line = new THREE.Line(lineGeometry, lineMaterial)
          constellationLines.add(line)
        }
      })
    }

    scene.add(constellationLines)

    // Camera position
    camera.position.z = 50

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update uniforms
      starMaterial.uniforms.time.value = elapsedTime * 0.5

      // Smooth camera movement following mouse
      targetX = mouseX * 0.1
      targetY = mouseY * 0.1
      camera.rotation.x += 0.05 * (targetY - camera.rotation.x)
      camera.rotation.y += 0.05 * (targetX - camera.rotation.y)

      // Slow rotation of the entire scene
      stars.rotation.y = elapsedTime * 0.03
      constellationLines.rotation.y = elapsedTime * 0.03

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      starMaterial.uniforms.pixelRatio.value = renderer.getPixelRatio()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      // Dispose resources
      starGeometry.dispose()
      starMaterial.dispose()
      constellationLines.children.forEach((line) => {
        if (line instanceof THREE.Line) {
          line.geometry.dispose()
          if (line.material instanceof THREE.Material) {
            line.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-900 to-gray-800"
    />
  )
}
