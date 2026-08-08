'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

const TERMIZ_CENTER = [37.2242, 67.2783]; // Termiz, Surxondaryo

export default function YandexMap({ fromAddress, toAddress, onSelectLocation, drivers = [] }) {
  const mapContainerRef = useRef(null);
  const ymapsRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeRef = useRef(null);
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    // Load Yandex Maps API v2.1 dynamically
    const scriptId = 'yandex-maps-script';
    let script = document.getElementById(scriptId);

    const initMap = () => {
      if (!window.ymaps || !mapContainerRef.current) return;
      window.ymaps.ready(() => {
        if (mapInstanceRef.current) return;

        const map = new window.ymaps.Map(
          mapContainerRef.current,
          {
            center: TERMIZ_CENTER,
            zoom: 14,
            controls: ['zoomControl', 'geolocationControl', 'typeSelector'],
          },
          {
            suppressMapOpenBlock: true,
          }
        );

        mapInstanceRef.current = map;
        ymapsRef.current = window.ymaps;
        setLoadingMap(false);

        // Add Termiz Drivers Placemarks (Cars)
        const mockCars = [
          { coords: [37.2255, 67.2795], name: "Otabek Tursunov (Cobalt)" },
          { coords: [37.2210, 67.2710], name: "Sirojiddin (Monza)" },
          { coords: [37.2300, 67.2850], name: "Bahriddin (BYD)" },
        ];

        mockCars.forEach((car) => {
          const placemark = new window.ymaps.Placemark(
            car.coords,
            { hintContent: car.name, balloonContent: car.name },
            {
              preset: 'islands#redAutoIcon',
              iconColor: '#FF5B4C'
            }
          );
          map.geoObjects.add(placemark);
        });

        // Click to select destination
        map.events.add('click', (e) => {
          const coords = e.get('coords');
          window.ymaps.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const address = firstGeoObject ? firstGeoObject.getAddressLine() : `Termiz (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`;
            if (onSelectLocation) {
              onSelectLocation(address, coords);
            }
          });
        });
      });
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '';
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKey ? `&apikey=${apiKey}` : ''}`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      if (window.ymaps) {
        initMap();
      } else {
        script.addEventListener('load', initMap);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Route when fromAddress & toAddress change
  useEffect(() => {
    if (!ymapsRef.current || !mapInstanceRef.current || !fromAddress || !toAddress) return;

    const ymaps = ymapsRef.current;
    const map = mapInstanceRef.current;

    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current);
      routeRef.current = null;
    }

    ymaps.route([fromAddress, toAddress], {
      mapStateAutoApply: true,
    }).then(
      (route) => {
        route.getPaths().options.set({
          strokeColor: '#FF5B4C',
          strokeWidth: 5,
          opacity: 0.8,
        });
        map.geoObjects.add(route);
        routeRef.current = route;
      },
      (error) => {
        console.log('Yandex Maps Route error:', error);
      }
    );
  }, [fromAddress, toAddress]);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#0F1015]">
      {loadingMap && (
        <div className="absolute inset-0 z-20 bg-[#0F1015] flex items-center justify-center text-xs font-bold text-[#16C2B2] gap-2">
          <Loader2 className="animate-spin" size={20} />
          Yandex Maps (Termiz) yuklanmoqda...
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full rounded-3xl overflow-hidden" />
    </div>
  );
}
