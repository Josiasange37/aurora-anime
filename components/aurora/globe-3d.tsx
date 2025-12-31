"use client"

import type React from "react"

import { useRef, Suspense, useState, useCallback, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"

const animeScenes = [
  {
    id: 1,
    title: "Demon Slayer",
    episode: "Episode 19",
    scene: "/demon-slayer-tanjiro-breathing-fire-anime-scene.jpg",
    cover: "/demon-slayer-epic-battle-scene-anime.jpg",
    description: "Tanjiro unleashes Hinokami Kagura against Rui in an epic battle.",
    rating: "9.8",
    year: "2019",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    episode: "Episode 20",
    scene: "/jujutsu-kaisen-gojo-domain-expansion-anime-scene.jpg",
    cover: "/jujutsu-kaisen-gojo-satoru-anime-scene.jpg",
    description: "Gojo reveals his Infinite Void domain expansion.",
    rating: "9.5",
    year: "2020",
  },
  {
    id: 3,
    title: "Attack on Titan",
    episode: "Episode 76",
    scene: "/attack-on-titan-eren-founding-titan-anime-scene.jpg",
    cover: "/attack-on-titan-rumbling-epic-anime-scene.jpg",
    description: "Eren activates the Rumbling with the Founding Titan.",
    rating: "9.9",
    year: "2022",
  },
  {
    id: 4,
    title: "My Hero Academia",
    episode: "Episode 49",
    scene: "/my-hero-academia-all-might-united-states-smash-ani.jpg",
    cover: "/my-hero-academia-all-might-vs-all-for-one-anime.jpg",
    description: "All Might's final battle against All For One.",
    rating: "9.6",
    year: "2018",
  },
  {
    id: 5,
    title: "Spy x Family",
    episode: "Episode 5",
    scene: "/spy-x-family-anya-shocked-face-anime-scene.jpg",
    cover: "/spy-x-family-forger-family-anime-scene.jpg",
    description: "Anya's iconic shocked face during the interview.",
    rating: "9.2",
    year: "2022",
  },
  {
    id: 6,
    title: "One Piece",
    episode: "Episode 1015",
    scene: "/one-piece-luffy-gear-5-anime-scene.jpg",
    cover: "/one-piece-luffy-gear-5-sun-god-nika-anime.jpg",
    description: "Luffy awakens Gear 5 against Kaido.",
    rating: "9.9",
    year: "2023",
  },
]

function getSpherePosition(index: number, total: number, radius: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2
  const y = (index / (total - 1) - 0.5) * 0.8
  const radiusAtY = Math.sqrt(1 - y * y) * radius

  return [Math.cos(angle) * radiusAtY, y * radius * 0.5, Math.sin(angle) * radiusAtY]
}

function GlowingSphere({ rotation }: { rotation: React.MutableRefObject<number> }) {
  const sphereRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = rotation.current
    }
  })

  return (
    <group ref={sphereRef}>
      <mesh>
        <sphereGeometry args={[2.8, 48, 48]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.75, 32, 32]} />
        <meshBasicMaterial color="#0a1020" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.82, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.04} />
      </mesh>
    </group>
  )
}

function GlobeRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.15
      ring1Ref.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.1
      ring2Ref.current.rotation.z = Math.cos(t * 0.15) * 0.1
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.12
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.018, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.9} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.8, Math.PI / 5, 0]}>
        <torusGeometry args={[3.4, 0.014, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 3.5, -Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </mesh>
    </>
  )
}

function AnimeScene({
  anime,
  position,
  rotation,
  onSelect,
  isMobile,
}: {
  anime: (typeof animeScenes)[0]
  position: [number, number, number]
  rotation: React.MutableRefObject<number>
  onSelect: (anime: (typeof animeScenes)[0], rect: DOMRect | null) => void
  isMobile: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const htmlRef = useRef<HTMLDivElement>(null)
  const { camera } = useThree()
  const [isFrontFacing, setIsFrontFacing] = useState(false)
  const scaleRef = useRef(1)

  useFrame(() => {
    if (groupRef.current) {
      const cos = Math.cos(rotation.current)
      const sin = Math.sin(rotation.current)
      const x = position[0] * cos - position[2] * sin
      const z = position[0] * sin + position[2] * cos

      groupRef.current.position.set(x, position[1], z)
      groupRef.current.lookAt(0, 0, 0)
      groupRef.current.rotateY(Math.PI)

      // Calculate if facing camera (front of globe)
      const worldPos = new THREE.Vector3()
      groupRef.current.getWorldPosition(worldPos)
      const cameraDir = camera.position.clone().normalize()
      const cardDir = worldPos.clone().normalize()
      const dot = cameraDir.dot(cardDir)

      // If dot product > 0.3, card is facing the camera
      const facing = dot > 0.3
      setIsFrontFacing(facing)

      // Smooth scale animation
      const targetScale = facing ? 1.25 : 1
      scaleRef.current += (targetScale - scaleRef.current) * 0.1
    }
  })

  const handleClick = () => {
    const rect = htmlRef.current?.getBoundingClientRect() || null
    onSelect(anime, rect)
  }

  const baseCardWidth = isMobile ? 95 : 130
  const baseCardHeight = isMobile ? 58 : 78

  return (
    <group ref={groupRef}>
      <Html
        transform
        distanceFactor={isMobile ? 4.5 : 4}
        style={{ transition: "all 0.3s ease-out" }}
        zIndexRange={[isFrontFacing ? 50 : 10, 0]}
      >
        <div ref={htmlRef} onClick={handleClick} className="cursor-pointer group">
          <div
            className="rounded-lg overflow-hidden relative transition-all duration-500"
            style={{
              width: `${baseCardWidth * scaleRef.current}px`,
              height: `${baseCardHeight * scaleRef.current}px`,
              background: "linear-gradient(135deg, rgba(10, 16, 32, 0.95), rgba(20, 30, 50, 0.9))",
              border: isFrontFacing ? "2px solid rgba(0, 212, 255, 0.7)" : "1.5px solid rgba(0, 212, 255, 0.3)",
              boxShadow: isFrontFacing
                ? `0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(0, 212, 255, 0.1)`
                : `0 0 15px rgba(0, 212, 255, 0.2), 0 0 30px rgba(168, 85, 247, 0.1)`,
              transform: `scale(${scaleRef.current})`,
              opacity: isFrontFacing ? 1 : 0.75,
            }}
          >
            <img src={anime.scene || "/placeholder.svg"} alt={anime.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Play icon - more visible when front facing */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: isFrontFacing ? 0.9 : 0 }}
            >
              <div
                className="rounded-full bg-cyan-500/90 flex items-center justify-center backdrop-blur-sm animate-pulse"
                style={{ width: isMobile ? 32 : 42, height: isMobile ? 32 : 42 }}
              >
                <svg
                  className="text-white ml-0.5"
                  style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20 }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Hover play icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="rounded-full bg-cyan-500/80 flex items-center justify-center backdrop-blur-sm"
                style={{ width: isMobile ? 32 : 42, height: isMobile ? 32 : 42 }}
              >
                <svg
                  className="text-white ml-0.5"
                  style={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20 }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Title bar */}
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/60 backdrop-blur-sm">
              <p
                className="text-cyan-400 font-semibold truncate"
                style={{ fontSize: isFrontFacing ? (isMobile ? "9px" : "10px") : isMobile ? "7px" : "8px" }}
              >
                {anime.title}
              </p>
              <p
                className="text-gray-400"
                style={{ fontSize: isFrontFacing ? (isMobile ? "7px" : "8px") : isMobile ? "5px" : "6px" }}
              >
                {anime.episode}
              </p>
            </div>

            {/* Glow border effect on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                border: "2px solid rgba(0, 212, 255, 0.9)",
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.6), inset 0 0 30px rgba(0, 212, 255, 0.15)",
              }}
            />
          </div>
        </div>
      </Html>
    </group>
  )
}

function Scene({
  onSelectAnime,
  isMobile,
}: {
  onSelectAnime: (anime: (typeof animeScenes)[0]) => void
  isMobile: boolean
}) {
  const rotationRef = useRef(0)

  useFrame((_, delta) => {
    rotationRef.current += delta * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#ec4899" />

      <GlowingSphere rotation={rotationRef} />
      <GlobeRings />

      {animeScenes.map((anime, index) => {
        const pos = getSpherePosition(index, animeScenes.length, 2.95)
        return (
          <AnimeScene
            key={anime.id}
            anime={anime}
            position={pos}
            rotation={rotationRef}
            onSelect={onSelectAnime}
            isMobile={isMobile}
          />
        )
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
        rotateSpeed={0.5}
      />
    </>
  )
}

function AnimeDetailModal({
  anime,
  onClose,
}: {
  anime: (typeof animeScenes)[0] | null
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Prevent body scroll when modal is open
    if (anime) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [anime])

  if (!anime || !mounted) return null

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6"
        style={{ zIndex: 999999 }}
        onClick={onClose}
      >
        {/* Full black backdrop */}
        <div className="absolute inset-0 bg-black" />

        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl sm:rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(10, 16, 32, 1), rgba(20, 30, 50, 0.98))",
            border: "2px solid rgba(0, 212, 255, 0.4)",
            boxShadow: `
              0 0 60px rgba(0, 212, 255, 0.4),
              0 0 120px rgba(168, 85, 247, 0.25),
              0 25px 50px -12px rgba(0, 0, 0, 0.8)
            `,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 flex items-center justify-center text-white/70 hover:text-white hover:bg-black transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cover image */}
          <div className="relative h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-t-xl sm:rounded-t-2xl">
            <motion.img
              src={anime.cover}
              alt={anime.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020] via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 md:p-6 lg:p-8 -mt-10 sm:-mt-14 md:-mt-16 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{anime.title}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                  <span className="text-cyan-400 font-medium">{anime.episode}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{anime.year}</span>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-white font-semibold">{anime.rating}</span>
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                {anime.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-white text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                    boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)",
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-cyan-400 border-2 border-cyan-500/50 hover:border-cyan-400 transition-colors text-sm sm:text-base"
                  style={{ background: "rgba(0, 212, 255, 0.1)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to List
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-lg border-2 border-gray-600 hover:border-gray-500 transition-colors"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="sm:hidden text-gray-400 text-sm">Share</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export function Globe3D() {
  const [selectedAnime, setSelectedAnime] = useState<(typeof animeScenes)[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSelectAnime = useCallback((anime: (typeof animeScenes)[0]) => {
    setSelectedAnime(anime)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedAnime(null)
  }, [])

  return (
    <div className="w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[700px] relative">
      <Canvas
        camera={{
          position: [0, 1, isMobile ? 9.5 : 7.5],
          fov: isMobile ? 50 : 48,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene onSelectAnime={handleSelectAnime} isMobile={isMobile} />
        </Suspense>
      </Canvas>

      {selectedAnime && <AnimeDetailModal anime={selectedAnime} onClose={handleClose} />}

      {/* Hint text */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-gray-500 text-[10px] sm:text-sm animate-pulse">Click on any scene to explore</p>
      </div>
    </div>
  )
}
