import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { ArrowRight, RotateCw, X, CheckCircle2 } from 'lucide-react';

export interface DestinationMarker {
  id: string;
  name: string;
  fullName: string;
  subtitle: string;
  services: string;
  visaRate: string;
  workPermit: string;
  image: string;
  Flag: React.ComponentType;
  lat: number;
  lon: number;
  offset?: { x: number; y: number };
  fallbackClassName?: string;
}

interface Globe3DProps {
  destinations?: DestinationMarker[];
  onSelectDestination?: (id: string, name: string) => void;
  className?: string;
}

// Crisp circular vector flag components matching the aesthetic
const FlagUSA: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs" aria-hidden="true">
    <clipPath id="globe-usa-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#globe-usa-clip)">
      <rect width="32" height="32" fill="#B22234" />
      <path d="M0 2.46h32M0 7.38h32M0 12.3h32M0 17.23h32M0 22.15h32M0 27.07h32" stroke="#FFFFFF" strokeWidth="2.46" />
      <rect width="14" height="17.23" fill="#3C3B6E" />
      <circle cx="3.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="7" cy="4" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="5.25" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="8.75" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="3.5" cy="13" r="0.9" fill="#FFF" />
      <circle cx="7" cy="13" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="13" r="0.9" fill="#FFF" />
    </g>
  </svg>
);

const FlagUK: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs" aria-hidden="true">
    <clipPath id="globe-uk-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#globe-uk-clip)">
      <rect width="32" height="32" fill="#012169" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5.5" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
      <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="8" />
      <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.8" />
    </g>
  </svg>
);

const FlagCanada: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs" aria-hidden="true">
    <clipPath id="globe-can-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#globe-can-clip)">
      <rect width="32" height="32" fill="#FF0000" />
      <rect x="8" width="16" height="32" fill="#FFFFFF" />
      <path d="M16 8l1.5 3.5 2.5-.8-1.2 3.2 2.8 1.4-2.8 1.4.6 3.5-3.4-1.8V23h-1v-4.6L11.6 20.2l.6-3.5-2.8-1.4 2.8-1.4-1.2-3.2 2.5.8z" fill="#FF0000" />
    </g>
  </svg>
);

const FlagAustralia: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs" aria-hidden="true">
    <clipPath id="globe-aus-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#globe-aus-clip)">
      <rect width="32" height="32" fill="#00008B" />
      <g transform="scale(0.5)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
        <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="7" />
        <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.5" />
      </g>
      <circle cx="8" cy="22" r="2.5" fill="#FFF" />
      <circle cx="24" cy="9" r="1" fill="#FFF" />
      <circle cx="21" cy="14" r="1" fill="#FFF" />
      <circle cx="26" cy="17" r="1" fill="#FFF" />
      <circle cx="23" cy="24" r="1" fill="#FFF" />
      <circle cx="27" cy="21" r="0.7" fill="#FFF" />
    </g>
  </svg>
);

const FlagNewZealand: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 shadow-xs" aria-hidden="true">
    <clipPath id="globe-nz-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#globe-nz-clip)">
      <rect width="32" height="32" fill="#00247D" />
      <g transform="scale(0.5)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
        <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="7" />
        <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.5" />
      </g>
      <circle cx="24" cy="10" r="1.3" fill="#CC142B" stroke="#FFF" strokeWidth="0.5" />
      <circle cx="21" cy="16" r="1.3" fill="#CC142B" stroke="#FFF" strokeWidth="0.5" />
      <circle cx="27" cy="19" r="1.1" fill="#CC142B" stroke="#FFF" strokeWidth="0.5" />
      <circle cx="24" cy="25" r="1.5" fill="#CC142B" stroke="#FFF" strokeWidth="0.5" />
    </g>
  </svg>
);

export const DEFAULT_DESTINATIONS: DestinationMarker[] = [
  {
    id: 'uk',
    name: 'UK',
    fullName: 'United Kingdom',
    subtitle: 'World-Class Education',
    services: '1-Year Master\'s • 2-Year PSW • Tier-4 Student Visa',
    visaRate: '98%',
    workPermit: '2 Years Graduate Route (PSW)',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80',
    Flag: FlagUK,
    lat: 53.0,
    lon: -1.5,
    offset: { x: 44, y: -20 },
    fallbackClassName: 'top-[18%] right-[10%] sm:right-[16%]',
  },
  {
    id: 'usa',
    name: 'USA',
    fullName: 'United States',
    subtitle: 'Top Universities & STEM',
    services: 'STEM OPT • F-1 Visa • Ivy League Admissions',
    visaRate: '96%',
    workPermit: 'Up to 3 Years OPT for STEM',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    Flag: FlagUSA,
    lat: 38.5,
    lon: -97.0,
    offset: { x: -58, y: 20 },
    fallbackClassName: 'top-[16%] left-[10%] sm:left-[15%]',
  },
  {
    id: 'canada',
    name: 'Canada',
    fullName: 'Canada',
    subtitle: 'Bright Opportunities & PR',
    services: 'PGWP • Study Permit • Express Entry PR',
    visaRate: '94%',
    workPermit: 'Up to 3 Years PGWP',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80',
    Flag: FlagCanada,
    lat: 56.0,
    lon: -106.0,
    offset: { x: 50, y: -22 },
    fallbackClassName: 'top-[42%] right-[8%] sm:right-[12%]',
  },
  {
    id: 'australia',
    name: 'Australia',
    fullName: 'Australia',
    subtitle: 'Global Careers & Quality Living',
    services: 'Subclass 500 • Post-Study Work • PR Pathways',
    visaRate: '95%',
    workPermit: '2 - 4 Years Post-Study Work',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
    Flag: FlagAustralia,
    lat: -25.0,
    lon: 134.0,
    offset: { x: -46, y: 16 },
    fallbackClassName: 'top-[66%] right-[14%] sm:right-[20%]',
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    fullName: 'New Zealand',
    subtitle: 'Quality Living & Work',
    services: '3-Year Open Work Visa • Fee-Paying Student Visa',
    visaRate: '96%',
    workPermit: '3 Years Open Work Visa',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    Flag: FlagNewZealand,
    lat: -41.0,
    lon: 174.0,
    offset: { x: 48, y: 18 },
    fallbackClassName: 'top-[78%] right-[10%] sm:right-[16%]',
  },
];

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Convert geographic latitude and longitude (degrees) to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export const Globe3D: React.FC<Globe3DProps> = ({
  destinations: propsDestinations,
  onSelectDestination,
  className = '',
}) => {
  const destinations = useMemo(
    () => (propsDestinations && propsDestinations.length > 0 ? propsDestinations : DEFAULT_DESTINATIONS),
    [propsDestinations]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [activeCountryId, setActiveCountryId] = useState<string | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);

  // References for continuous 60fps animation without React state re-render latency
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const isPausedRef = useRef(false);
  const targetRotationYRef = useRef<number | null>(null);
  const targetRotationXRef = useRef<number | null>(null);
  const currentSpeedRef = useRef<number>(0.0020);

  useEffect(() => {
    setHasWebGL(checkWebGL());
  }, []);

  useEffect(() => {
    if (!hasWebGL || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth || 420;
    let height = container.clientHeight || 420;

    // Respect reduced-motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rotationSpeed = prefersReducedMotion ? 0.0006 : 0.0020;
    currentSpeedRef.current = rotationSpeed;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.35);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 2. Realistic Sunlight Lighting (Matching the top-left morning sun in the panoramic scene)
    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    sunLight.position.set(-3.5, 2.8, 3.2);
    scene.add(sunLight);

    // Soft sky fill light for natural ambient contrast without pitch-black shadows
    const fillLight = new THREE.DirectionalLight(0x95beec, 0.65);
    fillLight.position.set(3.2, -1.0, 1.8);
    scene.add(fillLight);

    // Ambient light so Earth's oceans and continents remain radiant and legible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.82);
    scene.add(ambientLight);

    // 3. Earth Group & Sphere Geometry
    const earthGroup = new THREE.Group();
    // Natural axial tilt (approx 7.5 deg Z, 5.5 deg X)
    earthGroup.rotation.z = THREE.MathUtils.degToRad(-7.5);
    earthGroup.rotation.x = THREE.MathUtils.degToRad(5.5);
    // Initial orientation showing the Americas & Atlantic prominently
    earthGroup.rotation.y = THREE.MathUtils.degToRad(20);
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;

    const R = 1.0;
    const earthGeometry = new THREE.SphereGeometry(R, 64, 64);

    const textureLoader = new THREE.TextureLoader();

    // 1. Earth Base Color Map (Equirectangular 4K NASA Blue Marble)
    const earthTexture = textureLoader.load('/earth-blue-marble.jpg');
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
    earthTexture.magFilter = THREE.LinearFilter;

    // 2. Earth Specular Water Mask (Linear non-color data: Oceans = 255 reflective, Land = 0 matte)
    const specularTexture = textureLoader.load('/earth-specular.jpg');
    specularTexture.colorSpace = THREE.NoColorSpace;
    specularTexture.minFilter = THREE.LinearMipmapLinearFilter;
    specularTexture.magFilter = THREE.LinearFilter;

    // 3. Earth Elevation/Topology Relief Map (Linear bump map for mountain relief depth)
    const bumpTexture = textureLoader.load('/earth-topology.png');
    bumpTexture.colorSpace = THREE.NoColorSpace;
    bumpTexture.minFilter = THREE.LinearMipmapLinearFilter;
    bumpTexture.magFilter = THREE.LinearFilter;

    // Earth Sphere Material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specularMap: specularTexture,
      specular: new THREE.Color(0x284a6c),
      shininess: 24,
      bumpMap: bumpTexture,
      bumpScale: 0.012,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // 4. Cloud Sphere Layer (NASA RGBA texture with soft alpha transparency)
    const cloudsGeometry = new THREE.SphereGeometry(R * 1.008, 64, 64);
    const cloudsTexture = textureLoader.load('/earth-clouds.png');
    cloudsTexture.colorSpace = THREE.SRGBColorSpace;
    cloudsTexture.minFilter = THREE.LinearMipmapLinearFilter;
    cloudsTexture.magFilter = THREE.LinearFilter;

    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 5. Atmospheric Rim Glow (Subtle, photorealistic Fresnel limb glow on FrontSide)
    const atmosphereGeometry = new THREE.SphereGeometry(R * 1.022, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = 1.0 - max(0.0, dot(vNormal, viewDir));
          float rim = pow(fresnel, 4.0) * 0.6;
          gl_FragColor = vec4(0.35, 0.70, 1.0, rim);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Precalculate local 3D vectors on the Earth sphere for each destination
    const destinationVectors = destinations.map((dest) => ({
      ...dest,
      localPos: latLonToVector3(dest.lat, dest.lon, R),
    }));

    // 6. Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 420;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Animation Loop (60 FPS)
    let animationFrameId: number;
    const cloudRotationSpeed = prefersReducedMotion ? 0.0008 : 0.0026;
    const globeCenter = new THREE.Vector3(0, 0, 0);
    const defaultTiltX = THREE.MathUtils.degToRad(5.5);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth deceleration and ease-out rotation to target country
      if (earthGroupRef.current) {
        if (targetRotationYRef.current !== null) {
          const diffY = targetRotationYRef.current - earthGroupRef.current.rotation.y;
          if (Math.abs(diffY) > 0.001) {
            // Natural ease-out deceleration into target without jumping or snapping
            earthGroupRef.current.rotation.y += diffY * 0.055;
          } else {
            earthGroupRef.current.rotation.y = targetRotationYRef.current;
            targetRotationYRef.current = null;
          }
        } else if (!isPausedRef.current && !isDraggingRef.current) {
          // Continuous Mode 1 rotation
          if (currentSpeedRef.current < rotationSpeed) {
            currentSpeedRef.current += (rotationSpeed - currentSpeedRef.current) * 0.04;
          }
          earthGroupRef.current.rotation.y += currentSpeedRef.current;
        }

        if (targetRotationXRef.current !== null) {
          const diffX = targetRotationXRef.current - earthGroupRef.current.rotation.x;
          if (Math.abs(diffX) > 0.001) {
            earthGroupRef.current.rotation.x += diffX * 0.055;
          } else {
            earthGroupRef.current.rotation.x = targetRotationXRef.current;
            targetRotationXRef.current = null;
          }
        } else if (!isPausedRef.current && !isDraggingRef.current) {
          // Return gently to default axial tilt
          earthGroupRef.current.rotation.x += (defaultTiltX - earthGroupRef.current.rotation.x) * 0.02;
        }
      }

      // Clouds rotate slightly faster for realistic depth
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += cloudRotationSpeed - rotationSpeed;
      }

      // Render Three.js scene
      renderer.render(scene, camera);

      // Synchronize 3D destination positions with 2D HTML/CSS overlay markers
      if (destinationVectors.length > 0) {
        earthMesh.updateWorldMatrix(true, false);
        const cameraPos = camera.position;

        for (let i = 0; i < destinationVectors.length; i++) {
          const dest = destinationVectors[i];
          const el = markerRefs.current[dest.id];
          if (!el) continue;

          // Transform local coordinates by the rotating globe's world matrix
          const worldPos = dest.localPos.clone().applyMatrix4(earthMesh.matrixWorld);

          // Calculate surface normal and camera vector to determine front/back visibility
          const normal = worldPos.clone().sub(globeCenter).normalize();
          const toCam = cameraPos.clone().sub(worldPos).normalize();
          const dot = normal.dot(toCam);

          // Markers are visible on front-facing hemisphere with comfortable margin
          // Fade starts at dot = 0.15, full opacity at dot >= 0.35
          const fadeStart = 0.15;
          const fadeEnd = 0.35;

          if (dot > fadeStart) {
            const opacity = Math.min(1, Math.max(0, (dot - fadeStart) / (fadeEnd - fadeStart)));
            const screen = worldPos.clone().project(camera);
            const x = (screen.x * 0.5 + 0.5) * width;
            const y = (-screen.y * 0.5 + 0.5) * height;

            el.style.opacity = opacity.toFixed(3);
            el.style.visibility = 'visible';
            el.style.pointerEvents = opacity > 0.35 ? 'auto' : 'none';
            el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
            el.style.zIndex = activeCountryId === dest.id ? '50' : `${Math.round(dot * 100)}`;
          } else {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.pointerEvents = 'none';
          }
        }
      }
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      specularTexture.dispose();
      bumpTexture.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      cloudsTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
      earthGroupRef.current = null;
      cloudsMeshRef.current = null;
    };
  }, [hasWebGL, destinations, activeCountryId]);

  // Pointer/Drag Interactions (Allow user to freely drag and spin the 3D globe)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    targetRotationYRef.current = null;
    targetRotationXRef.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !earthGroupRef.current) return;
    const deltaX = e.clientX - prevPointerRef.current.x;
    const deltaY = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };

    earthGroupRef.current.rotation.y += deltaX * 0.005;
    earthGroupRef.current.rotation.x = THREE.MathUtils.clamp(
      earthGroupRef.current.rotation.x + deltaY * 0.005,
      -0.35,
      0.35
    );
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // If no country is currently selected, resume rotation smoothly
    if (!activeCountryId) {
      isPausedRef.current = false;
      currentSpeedRef.current = 0.0006;
    }
  };

  // Mode 2: Country Selection Handler (Gradually decelerates, rotates shortest path to front-center, stops)
  const handleCountryClick = useCallback(
    (dest: DestinationMarker, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();

      // If already selected, keep current selection stable
      if (activeCountryId === dest.id) {
        return;
      }

      setActiveCountryId(dest.id);
      isPausedRef.current = true;
      currentSpeedRef.current = 0; // Pause auto-rotation

      // Smoothly rotate globe shortest path so selected country faces camera
      if (earthGroupRef.current) {
        const radLon = (dest.lon * Math.PI) / 180;
        const currentRotY = earthGroupRef.current.rotation.y;
        const targetBase = -radLon - Math.PI / 2;

        // Calculate shortest angular rotation to target in range [-PI, +PI]
        let diff = (targetBase - currentRotY) % (Math.PI * 2);
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        targetRotationYRef.current = currentRotY + diff;

        // Slight latitude centering so country tilts into comfortable view
        const radLat = (dest.lat * Math.PI) / 180;
        targetRotationXRef.current = THREE.MathUtils.clamp(-radLat * 0.45, -0.25, 0.25);
      }
    },
    [activeCountryId]
  );

  // Resume Mode 1 Continuous Auto-Rotation
  const handleResumeRotation = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveCountryId(null);
    setHoveredCountryId(null);
    targetRotationYRef.current = null;
    targetRotationXRef.current = THREE.MathUtils.degToRad(5.5);
    isPausedRef.current = false;
    currentSpeedRef.current = 0.0004; // Smoothly ramp back up
  }, []);

  // Fallback if WebGL is unavailable on legacy device
  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <img
          src="/earth-isolated.png"
          alt="Planet Earth"
          className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
        />
        {destinations.map((dest) => {
          const FlagComponent = dest.Flag;
          const isSelected = activeCountryId === dest.id;
          return (
            <button
              key={dest.id}
              onClick={(e) => handleCountryClick(dest, e)}
              className={`absolute z-20 flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#10243F] shadow-lg shadow-[#10243F]/12 border border-slate-200/90 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#D99A35] active:scale-95 group text-left cursor-pointer ${
                isSelected ? 'ring-2 ring-[#D99A35]' : ''
              } ${dest.fallbackClassName || ''}`}
            >
              <FlagComponent />
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors">
                  {dest.name}
                </span>
                <span className="text-[10px] text-[#64748B] mt-0.5 font-medium">
                  {dest.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative select-none touch-none ${className}`}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      aria-label="Interactive 3D Earth Globe with 5 Country Destinations"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto"
      />

      {/* Synchronized 3D Geographically Anchored Destination Badges & Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
        {destinations.map((dest) => {
          const FlagComponent = dest.Flag;
          const isSelected = activeCountryId === dest.id;
          const isHovered = hoveredCountryId === dest.id;
          const showDetails = isSelected || isHovered;

          const offsetX = dest.offset?.x || 0;
          const offsetY = dest.offset?.y || 0;

          return (
            <div
              key={dest.id}
              ref={(el) => {
                markerRefs.current[dest.id] = el;
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                willChange: 'transform, opacity',
                transition: 'opacity 0.25s ease-out',
                opacity: 0,
                visibility: 'hidden',
              }}
              className="pointer-events-auto select-none"
            >
              {/* Concentric beacon indicator at (0, 0) directly on the Earth surface */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'translate(-50%, -50%)',
                }}
                className="w-3 h-3 rounded-full bg-[#D99A35] border-2 border-white shadow-lg z-10 pointer-events-none"
              >
                <div
                  className={`absolute -inset-1.5 rounded-full border border-[#D99A35] ${
                    isSelected ? 'animate-ping opacity-90 scale-125' : 'animate-ping opacity-60'
                  }`}
                />
              </div>

              {/* Connecting leader line from anchor (0, 0) to card (offsetX, offsetY) */}
              {(offsetX !== 0 || offsetY !== 0) && (
                <svg
                  className="absolute overflow-visible pointer-events-none z-0"
                  style={{ left: 0, top: 0, width: 1, height: 1 }}
                >
                  <line
                    x1={0}
                    y1={0}
                    x2={offsetX}
                    y2={offsetY}
                    stroke={isSelected ? '#D99A35' : 'rgba(217, 154, 53, 0.75)'}
                    strokeWidth={isSelected ? '2' : '1.5'}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
                  />
                </svg>
              )}

              {/* Destination Pill Badge / Button */}
              <button
                onClick={(e) => handleCountryClick(dest, e)}
                onMouseEnter={() => setHoveredCountryId(dest.id)}
                onMouseLeave={() => setHoveredCountryId(null)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: `translate3d(${offsetX}px, ${offsetY}px, 0) translate(-50%, -50%)`,
                }}
                className={`flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-[#10243F] shadow-lg border transition-all duration-200 active:scale-95 text-left cursor-pointer whitespace-nowrap z-20 scale-[0.85] sm:scale-100 origin-center ${
                  isSelected
                    ? 'border-[#D99A35] ring-2 ring-[#D99A35]/40 shadow-xl shadow-[#D99A35]/25 scale-[0.92] sm:scale-105'
                    : isHovered
                    ? 'border-[#D99A35] ring-2 ring-[#D99A35]/30 shadow-md scale-[0.88] sm:scale-105'
                    : 'border-slate-200/90 hover:border-[#D99A35]'
                }`}
                aria-label={`Select ${dest.fullName || dest.name}`}
              >
                <div className="relative rounded-full shadow-xs shrink-0 flex items-center justify-center">
                  <FlagComponent />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-[#10243F]">
                    {dest.name}
                  </span>
                  <span className="text-[9px] text-[#64748B] mt-0.5 font-medium">
                    {dest.subtitle}
                  </span>
                </div>
              </button>

              {/* Floating Visa Services Information Card (Revealed on Hover or when Country is Selected) */}
              {showDetails && (
                <div
                  onMouseEnter={() => setHoveredCountryId(dest.id)}
                  onMouseLeave={() => setHoveredCountryId(null)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `translate3d(${offsetX > 0 ? offsetX + 16 : offsetX - 230}px, ${offsetY + 28}px, 0)`,
                  }}
                  className="w-[230px] sm:w-[245px] bg-white/98 rounded-2xl shadow-2xl border border-slate-200/90 backdrop-blur-md overflow-hidden z-40 transition-all duration-200 animate-fadeIn text-left"
                >
                  {/* Photo Header */}
                  <div className="relative h-18 sm:h-20 w-full overflow-hidden bg-slate-900">
                    <img
                      src={dest.image}
                      alt={dest.fullName || dest.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5">
                        <FlagComponent />
                        <span className="text-xs font-bold drop-shadow-sm truncate">
                          {dest.fullName || dest.name}
                        </span>
                      </div>
                      {isSelected && (
                        <button
                          onClick={handleResumeRotation}
                          className="w-5 h-5 rounded-full bg-white/30 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                          title="Resume auto-rotation"
                          aria-label="Resume auto-rotation"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-2.5 sm:p-3 space-y-2">
                    {/* Visa Services */}
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#D99A35]">
                        Available Visa Services
                      </div>
                      <div className="text-[11px] text-slate-700 font-medium leading-tight mt-0.5">
                        {dest.services}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px]">
                      <div className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{dest.visaRate} Visa Rate</span>
                      </div>
                      <div className="text-slate-500 font-medium truncate">
                        {dest.workPermit}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination?.(dest.id, dest.name);
                      }}
                      className="w-full mt-1.5 py-1.5 px-3 bg-gradient-to-r from-[#D99A35] to-[#E28330] hover:opacity-95 text-white text-[11px] font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                    >
                      <span>Explore {dest.name} Opportunities</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mode Status & Quick Country Focus Dock (Accessible across all viewports) */}
      <div className="absolute -bottom-10 sm:-bottom-12 inset-x-0 flex items-center justify-center gap-1 sm:gap-1.5 z-30 pointer-events-auto">
        <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/90 text-xs font-medium">
          {destinations.map((dest) => {
            const FlagComponent = dest.Flag;
            const isSelected = activeCountryId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={(e) => handleCountryClick(dest, e)}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#10243F] text-white shadow-sm scale-105'
                    : 'text-[#10243F] hover:bg-slate-100'
                }`}
                title={`Focus ${dest.fullName}`}
              >
                <div className="scale-75 origin-center">
                  <FlagComponent />
                </div>
                <span>{dest.name}</span>
              </button>
            );
          })}

          {activeCountryId && (
            <button
              onClick={handleResumeRotation}
              className="ml-1 flex items-center gap-1 px-2 py-1 bg-amber-50 hover:bg-amber-100 text-[#D99A35] border border-[#D99A35]/30 rounded-full text-[10px] font-bold transition-all cursor-pointer"
              title="Resume continuous Earth rotation"
            >
              <RotateCw className="w-3 h-3 animate-spin" />
              <span>Resume</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
