'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Locate, Navigation, Layers, Shield, Sparkles } from 'lucide-react';

// Default Center: Termiz, Surxondaryo
const TERMIZ_CENTER = [37.2242, 67.2783];

// SVG Top-Down Yandex Taxi Icon
const createTaxiSvg = (color = '#FCE000', rotation = 0) => `
  <div style="transform: rotate(${rotation}deg); transition: transform 0.4s ease; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="6" width="24" height="36" rx="8" fill="#181A20" stroke="#FFFFFF" stroke-width="2"/>
      <rect x="14" y="10" width="20" height="28" rx="6" fill="${color}"/>
      <path d="M16 14C16 12.8954 16.8954 12 18 12H30C31.1046 12 32 12.8954 32 14V19H16V14Z" fill="#181A20"/>
      <path d="M16 30H32V34C32 35.1046 31.1046 36 30 36H18C16.8954 36 16 35.1046 16 34V30Z" fill="#181A20"/>
      <circle cx="16" cy="10" r="2.5" fill="#FFE500"/>
      <circle cx="32" cy="10" r="2.5" fill="#FFE500"/>
      <circle cx="16" cy="38" r="2.5" fill="#FC3F1D"/>
      <circle cx="32" cy="38" r="2.5" fill="#FC3F1D"/>
      <rect x="20" y="22" width="8" height="4" rx="1.5" fill="#181A20"/>
      <text x="24" y="25.5" fill="#FFE500" font-size="3.5" font-weight="900" font-family="sans-serif" text-anchor="middle">TAXI</text>
    </svg>
  </div>
`;

// SVG User Pin with Pulse
const createUserPinSvg = () => `
  <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
    <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(37, 99, 235, 0.35); animation: radar-pulse 2s infinite;"></div>
    <div style="width: 18px; height: 18px; border-radius: 50%; background: #2563EB; border: 3px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
  </div>
`;

// SVG Destination Pin (Point B)
const createDestPinSvg = () => `
  <div style="position: relative; width: 32px; height: 38px; display: flex; align-items: center; justify-content: center;">
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26 16 38 16 38C16 38 32 26 32 16C32 7.16344 24.8366 0 16 0Z" fill="#FC3F1D"/>
      <circle cx="16" cy="15" r="7" fill="#FFFFFF"/>
      <text x="16" y="19" fill="#FC3F1D" font-size="10" font-weight="900" font-family="sans-serif" text-anchor="middle">B</text>
    </svg>
  </div>
`;

export default function YandexMap({
  center = TERMIZ_CENTER,
  zoom = 14,
  pickupCoords = null,
  destCoords = null,
  onSelectLocation = null,
  assignedDriver = null,
  showHeatmap = false,
  activeTariff = 'start'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const LRef = useRef(null);
  const markersGroupRef = useRef(null);
  const routeLayerRef = useRef(null);
  const heatmapLayerRef = useRef(null);

  const [mapReady, setMapReady] = useState(false);
  
  // Real Termiz live fleet cars
  const [liveCars, setLiveCars] = useState([
    { id: 1, lat: 37.2255, lng: 67.2795, angle: 45, color: '#FCE000', name: 'Cobalt (75 A 777 AA)' },
    { id: 2, lat: 37.2210, lng: 67.2710, angle: 120, color: '#FCE000', name: 'Gentra (75 B 888 BB)' },
    { id: 3, lat: 37.2300, lng: 67.2850, angle: 220, color: '#FCE000', name: 'Onix (75 C 999 CC)' },
    { id: 4, lat: 37.2180, lng: 67.2820, angle: 310, color: '#FCE000', name: 'BYD (75 D 001 DD)' },
    { id: 5, lat: 37.2270, lng: 67.2730, angle: 90, color: '#FCE000', name: 'Monza (75 E 123 EE)' },
  ]);

  // Live cars move slightly on Termiz streets
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCars((prevCars) =>
        prevCars.map((car) => {
          const deltaLat = (Math.random() - 0.5) * 0.0004;
          const deltaLng = (Math.random() - 0.5) * 0.0004;
          const newAngle = (car.angle + (Math.random() - 0.5) * 30) % 360;
          return {
            ...car,
            lat: car.lat + deltaLat,
            lng: car.lng + deltaLng,
            angle: newAngle,
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      LRef.current = L;

      // Fix default marker icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: center || TERMIZ_CENTER,
          zoom: zoom,
          zoomControl: false,
          attributionControl: false,
        });

        // Clean, ultra-sharp vector map tiles (No dark invert filters!)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
        }).addTo(map);

        markersGroupRef.current = L.layerGroup().addTo(map);
        routeLayerRef.current = L.layerGroup().addTo(map);
        heatmapLayerRef.current = L.layerGroup().addTo(map);

        map.on('click', (e) => {
          if (onSelectLocation) {
            onSelectLocation({
              lat: e.latlng.lat,
              lng: e.latlng.lng,
              name: `Termiz (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`
            });
          }
        });

        mapInstanceRef.current = map;
        setMapReady(true);
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render Surge Heatmap for Termiz
  useEffect(() => {
    if (!mapReady || !LRef.current || !heatmapLayerRef.current || !mapInstanceRef.current) return;
    const L = LRef.current;
    heatmapLayerRef.current.clearLayers();

    if (showHeatmap) {
      const surgeZones = [
        { center: [37.2242, 67.2783], radius: 600, rate: '1.8x', color: '#FC3F1D' },
        { center: [37.2210, 67.2710], radius: 500, rate: '1.5x', color: '#F59E0B' },
        { center: [37.2300, 67.2850], radius: 700, rate: '1.3x', color: '#10B981' },
      ];

      surgeZones.forEach((zone) => {
        const circle = L.circle(zone.center, {
          radius: zone.radius,
          fillColor: zone.color,
          fillOpacity: 0.2,
          color: zone.color,
          weight: 1.5,
          dashArray: '4, 4',
        });

        const badge = L.marker(zone.center, {
          icon: L.divIcon({
            className: 'surge-badge',
            html: `<div style="background: ${zone.color}; color: white; font-weight: 900; font-size: 11px; padding: 2px 7px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transform: translate(-50%, -50%); border: 1.5px solid white;">${zone.rate}</div>`,
            iconSize: [0, 0],
          }),
        });

        heatmapLayerRef.current.addLayer(circle);
        heatmapLayerRef.current.addLayer(badge);
      });
    }
  }, [showHeatmap, mapReady]);

  // Update Live Moving Cars on Map
  useEffect(() => {
    if (!mapReady || !LRef.current || !markersGroupRef.current) return;
    const L = LRef.current;
    markersGroupRef.current.clearLayers();

    // Render pickup user pin
    if (pickupCoords) {
      const userMarker = L.marker([pickupCoords.lat, pickupCoords.lng], {
        icon: L.divIcon({
          className: 'user-pin-icon',
          html: createUserPinSvg(),
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      });
      markersGroupRef.current.addLayer(userMarker);
    }

    // Render destination pin
    if (destCoords) {
      const destMarker = L.marker([destCoords.lat, destCoords.lng], {
        icon: L.divIcon({
          className: 'dest-pin-icon',
          html: createDestPinSvg(),
          iconSize: [32, 38],
          iconAnchor: [16, 38],
        }),
      });
      markersGroupRef.current.addLayer(destMarker);
    }

    // Render nearby fleet cars
    if (!assignedDriver) {
      liveCars.forEach((car) => {
        const carMarker = L.marker([car.lat, car.lng], {
          icon: L.divIcon({
            className: 'taxi-car-marker',
            html: createTaxiSvg(car.color, car.angle),
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
        });
        markersGroupRef.current.addLayer(carMarker);
      });
    }
  }, [liveCars, pickupCoords, destCoords, assignedDriver, mapReady]);

  // Draw Route Polyline when pickupCoords & destCoords change
  useEffect(() => {
    if (!mapReady || !LRef.current || !routeLayerRef.current || !mapInstanceRef.current) return;
    const L = LRef.current;
    routeLayerRef.current.clearLayers();

    if (pickupCoords && destCoords) {
      const latlngs = [
        [pickupCoords.lat, pickupCoords.lng],
        [(pickupCoords.lat + destCoords.lat) / 2 + 0.002, (pickupCoords.lng + destCoords.lng) / 2 - 0.001],
        [destCoords.lat, destCoords.lng],
      ];

      const routeBorder = L.polyline(latlngs, {
        color: '#000000',
        weight: 7,
        opacity: 0.25,
        lineCap: 'round',
        lineJoin: 'round',
      });

      const routeLine = L.polyline(latlngs, {
        color: '#FCE000',
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      });

      routeLayerRef.current.addLayer(routeBorder);
      routeLayerRef.current.addLayer(routeLine);

      const bounds = L.latLngBounds(latlngs);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [pickupCoords, destCoords, mapReady]);

  // Center on Termiz
  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(TERMIZ_CENTER, 15, { duration: 1 });
    if (onSelectLocation) {
      onSelectLocation({
        lat: TERMIZ_CENTER[0],
        lng: TERMIZ_CENTER[1],
        name: 'Termiz Markaz (Al-Hakim at-Termiziy)',
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[100dvh] bg-[#E8ECEF] overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[100dvh] z-0" />

      {/* Floating Control Buttons */}
      <div className="absolute right-4 top-24 z-20 flex flex-col gap-2.5">
        <button
          onClick={handleLocateMe}
          title="Termiz Markaziga qaytish"
          className="w-11 h-11 bg-white dark:bg-[#1C1C1E] text-[#121214] dark:text-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-gray-200/80 dark:border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          <Locate size={20} className="text-[#2563EB]" />
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomIn();
            }
          }}
          className="w-11 h-11 bg-white dark:bg-[#1C1C1E] text-[#121214] dark:text-white font-extrabold text-lg rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-gray-200/80 dark:border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          +
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.zoomOut();
            }
          }}
          className="w-11 h-11 bg-white dark:bg-[#1C1C1E] text-[#121214] dark:text-white font-extrabold text-lg rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] border border-gray-200/80 dark:border-gray-800 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        >
          -
        </button>
      </div>
    </div>
  );
}
