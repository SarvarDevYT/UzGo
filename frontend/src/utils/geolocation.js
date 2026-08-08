// Geolocation Helper Utility using HTML5 Geolocation and OpenStreetMap Nominatim API

export const getCurrentAddress = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation brauzerda qo\'llab-quvvatlanmaydi'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // OpenStreetMap Reverse Geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          const address = data.display_name 
            ? `${data.address?.road || data.address?.suburb || 'Toshkent'}, ${data.address?.city || data.address?.town || ''}`.trim()
            : `Toshkent (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;

          resolve({
            address: address.replace(/^, /, ''),
            lat: latitude,
            lng: longitude,
          });
        } catch (err) {
          resolve({
            address: `Toshkent, Koordinata (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            lat: latitude,
            lng: longitude,
          });
        }
      },
      (error) => {
        let errorMsg = 'GPS manzilni aniqlab bo\'lmadi';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'GPS ruxsati berilmadi. Iltimos joylashuv ruxsatini yoqing.';
        }
        reject(new Error(errorMsg));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
};
