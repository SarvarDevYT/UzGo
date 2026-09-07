'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, Navigation, Car, Utensils, ShoppingBag, Package, 
  Truck, ArrowRight, Clock, Star, Phone, MessageSquare, ShieldCheck, 
  CheckCircle2, X, Wallet, CreditCard, Banknote, Sparkles, ChevronUp, 
  ChevronDown, Flame, Award, HeartHandshake, AlertTriangle, RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Dynamic Import for Leaflet Map Engine
const YandexMap = dynamic(() => import('../components/YandexMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[100dvh] bg-[#F6F7F9] dark:bg-[#121214] flex flex-col items-center justify-center text-[#121214] dark:text-white gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black text-2xl shadow-lg animate-bounce">
        Go
      </div>
      <span className="font-extrabold text-sm tracking-wide">UzGo Termiz xaritasi yuklanmoqda...</span>
    </div>
  ),
});

// Popular Termiz, Surxondaryo POIs
const POPULAR_DESTINATIONS = [
  { id: '1', name: 'Al-Hakim at-Termiziy majmuasi', address: 'Termiz tumani, Amudaryo yoqasi', coords: { lat: 37.2850, lng: 67.2400 }, icon: '🏛️' },
  { id: '2', name: 'TerDU Campus (Termiz Davlat Univ)', address: 'Barkamol avlod ko\'chasi, 43', coords: { lat: 37.2210, lng: 67.2710 }, icon: '🎓' },
  { id: '3', name: 'Termiz Xalqaro Aeroporti (TMJ)', address: 'Shimoliy zona, Aeroport yo\'li', coords: { lat: 37.2800, lng: 67.3100 }, icon: '✈️' },
  { id: '4', name: 'San\'at Saroyi va Teatr tumani', address: 'At-Termiziy shoh ko\'chasi', coords: { lat: 37.2300, lng: 67.2850 }, icon: '🎭' },
  { id: '5', name: 'Surxon Sohil (Amudaryo bo\'yi)', address: 'Chegara MFY, Janubiy sohil', coords: { lat: 37.2180, lng: 67.2820 }, icon: '🌊' },
  { id: '6', name: 'Termiz Avtovokzal (Shimoliy)', address: 'Manguzar posti tomon', coords: { lat: 37.2450, lng: 67.2650 }, icon: '🚌' },
];

// Yandex Go Termiz Tariffs
const TARIFFS = [
  {
    id: 'start',
    name: 'Start',
    subtitle: 'Cobalt, Nexia 3',
    price: 8000,
    multiplier: 1.0,
    eta: '2 daq',
    icon: '🚕',
    color: '#FCE000',
    tag: 'Eng arzon',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    subtitle: 'Gentra, Cobalt New',
    price: 12000,
    multiplier: 1.25,
    eta: '3 daq',
    icon: '🚖',
    color: '#10B981',
    tag: 'Mashhur',
  },
  {
    id: 'comfort_plus',
    name: 'Comfort+',
    subtitle: 'Chevrolet Onix, Tracker 2',
    price: 18000,
    multiplier: 1.6,
    eta: '4 daq',
    icon: '⚡',
    color: '#6366F1',
    tag: 'Keng salon',
  },
  {
    id: 'business',
    name: 'Business',
    subtitle: 'BYD Song Plus, Monza',
    price: 28000,
    multiplier: 2.2,
    eta: '5 daq',
    icon: '👑',
    color: '#181A20',
    tag: 'Premium',
  },
  {
    id: 'delivery',
    name: 'Yetkazib berish',
    subtitle: 'Termiz bo\'ylab posilka',
    price: 9000,
    multiplier: 1.1,
    eta: '4 daq',
    icon: '📦',
    color: '#F59E0B',
    tag: 'Tezkor',
  },
  {
    id: 'cargo',
    name: 'Yuk tashish',
    subtitle: 'Labo, Damas, Porter',
    price: 40000,
    multiplier: 3.0,
    eta: '8 daq',
    icon: '🚛',
    color: '#EC4899',
    tag: 'Yuklar',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Ride State Machine: 'idle' | 'choosing_tariff' | 'searching' | 'assigned' | 'in_trip' | 'completed'
  const [rideState, setRideState] = useState('idle');
  
  // Location States for Termiz
  const [pickupLocation, setPickupLocation] = useState({
    name: 'Termiz Markaz (Al-Hakim at-Termiziy)',
    coords: { lat: 37.2242, lng: 67.2783 },
  });
  const [destLocation, setDestLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Tariff & Options
  const [selectedTariff, setSelectedTariff] = useState(TARIFFS[0]);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [wishes, setWishes] = useState({
    childSeat: false,
    airConditioner: true,
    quietDriver: false,
  });

  // Assigned Driver details (Termiz 75 plate)
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [tripProgress, setTripProgress] = useState(0);
  const [userRating, setUserRating] = useState(5);
  const [selectedTip, setSelectedTip] = useState(0);

  // Active Service Tabs
  const [activeService, setActiveService] = useState('taxi');

  // Handle Destination Select
  const handleSelectDestination = (dest) => {
    setDestLocation(dest);
    setShowSearchModal(false);
    setRideState('choosing_tariff');
  };

  // Start Order Flow
  const handleStartOrder = () => {
    setRideState('searching');

    setTimeout(() => {
      setAssignedDriver({
        name: 'Otabek Tursunov',
        rating: 4.97,
        tripsCount: 1840,
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        carModel: 'Oq Chevrolet Cobalt',
        licensePlate: '75 A 777 AA',
        etaMinutes: 2,
        phone: '+998 91 123 45 67',
      });
      setRideState('assigned');
    }, 2800);
  };

  // Simulate Trip Start
  const handleStartTripSimulation = () => {
    setRideState('in_trip');
    setTripProgress(0);
  };

  // Progress Tracker in Trip
  useEffect(() => {
    let interval;
    if (rideState === 'in_trip') {
      interval = setInterval(() => {
        setTripProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setRideState('completed');
            return 100;
          }
          return prev + 12;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [rideState]);

  // Reset Order
  const handleResetOrder = () => {
    setRideState('idle');
    setDestLocation(null);
    setAssignedDriver(null);
    setTripProgress(0);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#F6F7F9] dark:bg-[#121214] font-sans">
      
      {/* 1. Full-Screen Interactive Map Engine for Termiz */}
      <div className="absolute inset-0 z-0">
        <YandexMap
          center={[pickupLocation.coords.lat, pickupLocation.coords.lng]}
          pickupCoords={pickupLocation.coords}
          destCoords={destLocation?.coords}
          showHeatmap={showHeatmap}
          assignedDriver={assignedDriver}
          activeTariff={selectedTariff.id}
          onSelectLocation={(loc) => {
            if (!destLocation) {
              setDestLocation(loc);
              setRideState('choosing_tariff');
            }
          }}
        />
      </div>

      {/* 2. Top Floating Navigation & Capsules */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Current Location Pill (Termiz) */}
        <div className="pointer-events-auto bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 rounded-2xl px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center gap-2 max-w-[240px] sm:max-w-xs transition-all">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></div>
          <span className="text-xs font-black text-[#121214] dark:text-white truncate">
            {pickupLocation.name}
          </span>
        </div>

        {/* Action Pills */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Surge Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border transition-all ${
              showHeatmap 
                ? 'bg-[#FC3F1D] text-white border-[#FC3F1D]' 
                : 'bg-white/95 dark:bg-[#1C1C1E]/95 text-[#121214] dark:text-white border-gray-200/90 dark:border-gray-800'
            }`}
            title="Termiz talab zonalari"
          >
            <Flame size={15} className={showHeatmap ? 'text-white fill-white' : 'text-[#FC3F1D] fill-[#FC3F1D]'} />
            <span className="hidden sm:inline">Talab zonalari</span>
          </button>
        </div>

      </div>

      {/* 3. Top Services Horizontal Bar */}
      <div className="absolute top-16 left-3 right-3 z-20 overflow-x-auto hide-scrollbar pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 py-1">
          
          <button
            onClick={() => { setActiveService('taxi'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black shadow-[0_8px_20px_rgba(0,0,0,0.1)] border transition-all ${
              activeService === 'taxi'
                ? 'bg-[#FCE000] text-[#121214] border-black/10 scale-105'
                : 'bg-white/95 dark:bg-[#1C1C1E]/95 text-gray-700 dark:text-gray-200 border-gray-200/80 dark:border-gray-800'
            }`}
          >
            <Car size={16} /> Taksi
          </button>

          <button
            onClick={() => router.push('/delivery')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-white/95 dark:bg-[#1C1C1E]/95 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:border-[#FCE000] transition-all"
          >
            <Utensils size={16} className="text-[#10B981]" /> Taomlar (Eats)
          </button>

          <button
            onClick={() => router.push('/market')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-white/95 dark:bg-[#1C1C1E]/95 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:border-[#FCE000] transition-all"
          >
            <ShoppingBag size={16} className="text-[#6366F1]" /> Lavka (15 min)
          </button>

          <button
            onClick={() => {
              setActiveService('delivery');
              setSelectedTariff(TARIFFS[4]);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-white/95 dark:bg-[#1C1C1E]/95 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:border-[#FCE000] transition-all"
          >
            <Package size={16} className="text-[#F59E0B]" /> Kuryer
          </button>

          <button
            onClick={() => {
              setActiveService('cargo');
              setSelectedTariff(TARIFFS[5]);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-white/95 dark:bg-[#1C1C1E]/95 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-gray-800 shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:border-[#FCE000] transition-all"
          >
            <Truck size={16} className="text-[#EC4899]" /> Yuk (Cargo)
          </button>

        </div>
      </div>

      {/* 4. Sliding Interactive Yandex Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-30 max-w-xl mx-auto px-3 pb-20 md:pb-6 pointer-events-none">
        <div className="pointer-events-auto bg-white dark:bg-[#1C1C1E] border border-gray-200/90 dark:border-gray-800 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all">

          {/* Drag Handle Bar */}
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-3.5"></div>

          {/* STATE 1: IDLE / Search Where to go */}
          {rideState === 'idle' && (
            <div className="space-y-4">
              
              {/* Big Search Input Trigger */}
              <div 
                onClick={() => setShowSearchModal(true)}
                className="bg-gray-100 dark:bg-[#26262A] hover:bg-gray-200/70 dark:hover:bg-[#303036] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all apple-card-press group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FCE000] text-[#121214] flex items-center justify-center font-black">
                  <Search size={18} />
                </div>
                <div className="flex-1">
                  <span className="text-gray-400 dark:text-gray-300 font-extrabold text-base block">
                    Qayerga borasiz?
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    At-Termiziy, TerDU, Aeroport, San'at saroyi...
                  </span>
                </div>
                <div className="bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm">
                  Borish <ArrowRight size={13} />
                </div>
              </div>

              {/* Popular Destinations Quick Chips */}
              <div>
                <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-2 px-1">
                  Termiz bo'ylab tezkor manzillar
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => handleSelectDestination(dest)}
                      className="bg-gray-50 dark:bg-[#26262A] hover:bg-gray-100 dark:hover:bg-[#303036] border border-gray-200/70 dark:border-gray-700/80 rounded-2xl p-2.5 text-left transition-all apple-card-press flex items-center gap-2"
                    >
                      <span className="text-lg">{dest.icon}</span>
                      <div className="truncate">
                        <span className="text-xs font-black text-[#121214] dark:text-white block truncate">
                          {dest.name}
                        </span>
                        <span className="text-[10px] text-gray-500 truncate block">
                          {dest.address}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STATE 2: CHOOSING TARIFF & ROUTE OVERVIEW */}
          {rideState === 'choosing_tariff' && destLocation && (
            <div className="space-y-4">
              
              {/* Route Summary Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FC3F1D] text-white flex items-center justify-center font-black text-xs shadow-sm">
                    B
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#121214] dark:text-white">
                      {destLocation.name}
                    </h4>
                    <span className="text-[11px] text-gray-500 font-semibold">
                      Termiz bo'ylab: ~3.8 km • ~8 daqiqa
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleResetOrder}
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Horizontal Scrollable Tariffs */}
              <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
                {TARIFFS.map((tariff) => {
                  const isSelected = selectedTariff.id === tariff.id;
                  return (
                    <div
                      key={tariff.id}
                      onClick={() => setSelectedTariff(tariff)}
                      className={`min-w-[130px] p-3 rounded-2xl border cursor-pointer transition-all apple-card-press flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FCE000] border-black/20 text-[#121214] shadow-md scale-105'
                          : 'bg-gray-50 dark:bg-[#26262A] border-gray-200/80 dark:border-gray-700/80 text-[#121214] dark:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-2xl">{tariff.icon}</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-black text-[#FCE000]' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {tariff.eta}
                        </span>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-black text-xs">{tariff.name}</h5>
                        <span className="text-xs font-black block mt-0.5">
                          {tariff.price.toLocaleString()} so'm
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Payment Method & Wishes Selector */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                
                <div 
                  onClick={() => {
                    const methods = ['wallet', 'cash', 'card'];
                    const nextIdx = (methods.indexOf(paymentMethod) + 1) % methods.length;
                    setPaymentMethod(methods[nextIdx]);
                  }}
                  className="bg-gray-100 dark:bg-[#26262A] border border-gray-200 dark:border-gray-700 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer apple-card-press"
                >
                  <div className="flex items-center gap-2">
                    {paymentMethod === 'wallet' && <Wallet size={16} className="text-[#FCE000] fill-[#FCE000]" />}
                    {paymentMethod === 'cash' && <Banknote size={16} className="text-[#10B981]" />}
                    {paymentMethod === 'card' && <CreditCard size={16} className="text-[#6366F1]" />}
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold block">To'lov turi</span>
                      <span className="text-xs font-black text-[#121214] dark:text-white">
                        {paymentMethod === 'wallet' ? 'UzGo Pay (+3% keshbek)' : paymentMethod === 'cash' ? 'Naqd pul' : 'Uzcard / Humo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setWishes({ ...wishes, quietDriver: !wishes.quietDriver })}
                  className="bg-gray-100 dark:bg-[#26262A] border border-gray-200 dark:border-gray-700 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer apple-card-press"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#F59E0B]" />
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold block">Istaklar</span>
                      <span className="text-xs font-black text-[#121214] dark:text-white">
                        {wishes.quietDriver ? '🤫 Jimjit haydovchi' : '❄️ Konditsioner'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Big Yellow Order Button */}
              <button
                onClick={handleStartOrder}
                className="w-full bg-[#FCE000] hover:bg-[#E5CB00] active:scale-[0.98] text-[#121214] py-4 rounded-2xl font-black text-base shadow-[0_10px_25px_rgba(252,224,0,0.35)] flex items-center justify-center gap-2 transition-all border border-black/10"
              >
                <span>{selectedTariff.name} chaqirish (Termiz)</span>
                <span className="bg-[#121214] text-[#FCE000] px-2 py-0.5 rounded-lg text-xs font-black ml-1">
                  {selectedTariff.price.toLocaleString()} so'm
                </span>
              </button>

            </div>
          )}

          {/* STATE 3: SEARCHING FOR DRIVER (RADAR ANIMATION) */}
          {rideState === 'searching' && (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#FCE000]/30 animate-ping"></div>
                <div className="w-16 h-16 rounded-full bg-[#FCE000] text-[#121214] flex items-center justify-center text-3xl shadow-lg font-black">
                  🚕
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#121214] dark:text-white">
                  Termizda haydovchi izlanmoqda...
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Yaqin atrofdagi {selectedTariff.name} haydovchilariga buyurtma yuborildi
                </p>
              </div>
              <button
                onClick={handleResetOrder}
                className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-6 py-2.5 rounded-2xl text-xs font-extrabold hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Qidiruvni bekor qilish
              </button>
            </div>
          )}

          {/* STATE 4: DRIVER ASSIGNED & DRIVING TO USER */}
          {rideState === 'assigned' && assignedDriver && (
            <div className="space-y-4">
              
              <div className="bg-[#FCE000] text-[#121214] p-3 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-black text-sm">
                    Haydovchi ~{assignedDriver.etaMinutes} daqiqada yetib keladi
                  </span>
                </div>
                <span className="bg-black text-[#FCE000] text-[10px] font-black px-2 py-0.5 rounded-md">
                  Surxondaryo
                </span>
              </div>

              {/* Driver & Car Details (75 plate) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={assignedDriver.photo}
                    alt={assignedDriver.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-[#FCE000] shadow-sm"
                  />
                  <div>
                    <h4 className="font-black text-sm text-[#121214] dark:text-white flex items-center gap-1.5">
                      {assignedDriver.name}
                      <span className="text-[11px] font-bold text-amber-500 flex items-center">
                        <Star size={12} className="fill-amber-500 mr-0.5" /> {assignedDriver.rating}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-500 font-medium block mt-0.5">
                      {assignedDriver.carModel}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#26262A] border-2 border-[#121214] dark:border-white/80 rounded-xl px-2.5 py-1 text-center shadow-sm">
                  <span className="font-black text-xs text-[#121214] dark:text-white tracking-wider">
                    {assignedDriver.licensePlate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${assignedDriver.phone}`}
                  className="bg-gray-100 dark:bg-[#26262A] hover:bg-gray-200 dark:hover:bg-[#303036] text-[#121214] dark:text-white p-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 apple-card-press"
                >
                  <Phone size={15} className="text-[#10B981]" /> Qo'ng'iroq
                </a>
                <button
                  onClick={() => alert(`Haydovchi bilan xabar: ${assignedDriver.phone}`)}
                  className="bg-gray-100 dark:bg-[#26262A] hover:bg-gray-200 dark:hover:bg-[#303036] text-[#121214] dark:text-white p-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 apple-card-press"
                >
                  <MessageSquare size={15} className="text-[#2563EB]" /> Xabar
                </button>
                <button
                  onClick={handleStartTripSimulation}
                  className="bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] p-3 rounded-2xl text-xs font-black flex items-center justify-center gap-1 apple-card-press"
                >
                  Safar boshlash <ArrowRight size={13} />
                </button>
              </div>

            </div>
          )}

          {/* STATE 5: IN TRIP SIMULATION */}
          {rideState === 'in_trip' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider block">
                    Safardasiz • Tezlik 45 km/soat
                  </span>
                  <h4 className="font-black text-base text-[#121214] dark:text-white mt-0.5">
                    {destLocation?.name} tomon ketilmoqda
                  </h4>
                </div>
                <div className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-3 py-1 rounded-xl text-xs font-black">
                  {tripProgress}%
                </div>
              </div>

              <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FCE000] transition-all duration-500 rounded-full"
                  style={{ width: `${tripProgress}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                <span>Qolgan vaqt: ~{Math.max(1, Math.round(8 * (1 - tripProgress / 100)))} daqiqa</span>
                <button
                  onClick={() => setRideState('completed')}
                  className="text-xs text-[#FC3F1D] font-extrabold hover:underline"
                >
                  Safarni darhol yakunlash
                </button>
              </div>
            </div>
          )}

          {/* STATE 6: TRIP COMPLETED & RATING MODAL */}
          {rideState === 'completed' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#121214] dark:text-white">
                  Safaringiz uchun rahmat!
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Jami to'lov: <strong className="text-[#121214] dark:text-white font-black">{selectedTariff.price.toLocaleString()} so'm</strong> • 
                  Keshbek: <strong className="text-[#10B981] font-black">+{Math.round(selectedTariff.price * 0.03)} so'm</strong>
                </p>
              </div>

              {/* 5-Star Rating */}
              <div className="flex justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125"
                  >
                    <Star
                      size={28}
                      className={star <= userRating ? 'text-[#FCE000] fill-[#FCE000]' : 'text-gray-300 dark:text-gray-700'}
                    />
                  </button>
                ))}
              </div>

              {/* Tips Selector */}
              <div className="flex justify-center gap-2">
                {[0, 2000, 5000, 10000].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setSelectedTip(tip)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                      selectedTip === tip
                        ? 'bg-[#FCE000] text-[#121214] border-black/10'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent'
                    }`}
                  >
                    {tip === 0 ? "Choychaqasiz" : `+${tip.toLocaleString()} so'm`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleResetOrder}
                className="w-full bg-[#121214] dark:bg-white text-[#FCE000] dark:text-[#121214] py-3.5 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 apple-card-press"
              >
                <RotateCcw size={16} /> Yangi buyurtma (Termiz)
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 5. Destination Search Modal (Termiz Autocomplete) */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-black text-base text-[#121214] dark:text-white flex items-center gap-2">
                <Search size={18} className="text-[#FCE000]" /> Termiz bo'ylab manzilni tanlang
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Termiz ko'chasi yoki joy nomi..."
                autoFocus
                className="w-full bg-gray-100 dark:bg-[#26262A] text-[#121214] dark:text-white px-4 py-3.5 rounded-2xl text-sm font-bold border border-transparent focus:border-[#FCE000] outline-none"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block px-1">
                Termiz mashhur joylari
              </span>

              {POPULAR_DESTINATIONS
                .filter(d => !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.address.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectDestination(dest)}
                    className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-[#26262A] cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">
                      {dest.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-[#121214] dark:text-white truncate">
                        {dest.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {dest.address}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-500 block">
                        8,000 so'mdan
                      </span>
                      <span className="text-[10px] text-gray-400">~6 daq</span>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
