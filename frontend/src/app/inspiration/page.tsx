'use client';
import Navbar from '@/components/navbar';
import Image from 'next/image';
import { Lightbulb, Palette, Home, Star, X, Check, ArrowRight, ChevronDown, ChevronUp, Zap, Shield, Award, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Color Guide Modal Component
function ColorGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendedColors, setRecommendedColors] = useState<Array<{color: string; name: string; hex: string; description: string}>>([]);

  const roomTypes = [
    { value: 'small', label: 'Small Room', icon: '📏' },
    { value: 'large', label: 'Large Room', icon: '🏠' },
    { value: 'bedroom', label: 'Bedroom', icon: '🛏️' },
    { value: 'living', label: 'Living Room', icon: '🛋️' },
    { value: 'office', label: 'Home Office', icon: '💼' },
  ];

  const moods = [
    { value: 'calm', label: 'Calm & Peaceful', icon: '😌' },
    { value: 'energetic', label: 'Energetic & Vibrant', icon: '⚡' },
    { value: 'professional', label: 'Professional & Clean', icon: '💼' },
    { value: 'cozy', label: 'Cozy & Warm', icon: '🔥' },
    { value: 'modern', label: 'Modern & Sleek', icon: '✨' },
  ];

  const colorDatabase: Record<string, Record<string, Array<{color: string; name: string; hex: string; description: string}>>> = {
    small: {
      calm: [
        { color: 'bg-white', name: 'Pure White', hex: '#FFFFFF', description: 'Makes small spaces feel larger and brighter' },
        { color: 'bg-gray-100', name: 'Soft Gray', hex: '#F3F4F6', description: 'Light neutral that opens up the room' },
        { color: 'bg-blue-50', name: 'Sky Blue', hex: '#EFF6FF', description: 'Calming hue that creates airiness' },
      ],
      energetic: [
        { color: 'bg-yellow-50', name: 'Warm Yellow', hex: '#FEFCE8', description: 'Bright and uplifting without overwhelming' },
        { color: 'bg-orange-50', name: 'Light Orange', hex: '#FFF7ED', description: 'Energizing yet space-enhancing' },
        { color: 'bg-white', name: 'Crisp White', hex: '#FFFFFF', description: 'Clean canvas for vibrant accents' },
      ],
      professional: [
        { color: 'bg-gray-50', name: 'Light Gray', hex: '#F9FAFB', description: 'Clean, focused, distraction-free' },
        { color: 'bg-white', name: 'White', hex: '#FFFFFF', description: 'Professional and spacious' },
        { color: 'bg-slate-100', name: 'Steel Gray', hex: '#F1F5F9', description: 'Modern and efficient' },
      ],
      cozy: [
        { color: 'bg-amber-50', name: 'Warm Cream', hex: '#FFFBEB', description: 'Adds warmth while keeping space open' },
        { color: 'bg-orange-50', name: 'Peach', hex: '#FFF7ED', description: 'Cozy yet light' },
        { color: 'bg-white', name: 'Ivory White', hex: '#FFFFFF', description: 'Warm and inviting' },
      ],
      modern: [
        { color: 'bg-white', name: 'Bright White', hex: '#FFFFFF', description: 'Minimalist and spacious' },
        { color: 'bg-gray-100', name: 'Light Silver', hex: '#F3F4F6', description: 'Sleek and contemporary' },
        { color: 'bg-zinc-100', name: 'Cool Gray', hex: '#F4F4F5', description: 'Modern and refined' },
      ],
    },
    large: {
      calm: [
        { color: 'bg-blue-100', name: 'Serene Blue', hex: '#DBEAFE', description: 'Creates a tranquil atmosphere' },
        { color: 'bg-green-50', name: 'Sage Green', hex: '#F0FDF4', description: 'Natural and peaceful' },
        { color: 'bg-gray-100', name: 'Soft Gray', hex: '#F3F4F6', description: 'Balanced and calming' },
      ],
      energetic: [
        { color: 'bg-orange-100', name: 'Coral', hex: '#FFEDD5', description: 'Vibrant and welcoming' },
        { color: 'bg-yellow-100', name: 'Sunshine', hex: '#FEF9C3', description: 'Cheerful and bold' },
        { color: 'bg-red-50', name: 'Warm Red', hex: '#FEF2F2', description: 'Dynamic accent color' },
      ],
      professional: [
        { color: 'bg-gray-200', name: 'Charcoal', hex: '#E5E7EB', description: 'Executive and sophisticated' },
        { color: 'bg-slate-100', name: 'Slate', hex: '#F1F5F9', description: 'Business-like and elegant' },
        { color: 'bg-white', name: 'White', hex: '#FFFFFF', description: 'Classic and professional' },
      ],
      cozy: [
        { color: 'bg-amber-100', name: 'Honey', hex: '#FEF3C7', description: 'Rich and warm' },
        { color: 'bg-orange-100', name: 'Terracotta', hex: '#FFEDD5', description: 'Earthy and inviting' },
        { color: 'bg-yellow-50', name: 'Cream', hex: '#FEFCE8', description: 'Soft and comfortable' },
      ],
      modern: [
        { color: 'bg-gray-300', name: 'Medium Gray', hex: '#D1D5DB', description: 'Contemporary statement' },
        { color: 'bg-zinc-200', name: 'Pewter', hex: '#E4E4E7', description: 'Industrial chic' },
        { color: 'bg-black', name: 'Matte Black', hex: '#000000', description: 'Bold and dramatic' },
      ],
    },
    bedroom: {
      calm: [
        { color: 'bg-blue-100', name: 'Lavender Blue', hex: '#DBEAFE', description: 'Promotes relaxation and sleep' },
        { color: 'bg-purple-50', name: 'Soft Lavender', hex: '#FAF5FF', description: 'Soothing and peaceful' },
        { color: 'bg-gray-50', name: 'Cloud Gray', hex: '#F9FAFB', description: 'Serene and restful' },
      ],
      energetic: [
        { color: 'bg-pink-50', name: 'Blush Pink', hex: '#FDF2F8', description: 'Uplifting morning energy' },
        { color: 'bg-yellow-50', name: 'Morning Light', hex: '#FEFCE8', description: 'Bright start to the day' },
        { color: 'bg-white', name: 'Fresh White', hex: '#FFFFFF', description: 'Clean and revitalizing' },
      ],
      professional: [
        { color: 'bg-gray-100', name: 'Dove Gray', hex: '#F3F4F6', description: 'Organized and tranquil' },
        { color: 'bg-white', name: 'Hotel White', hex: '#FFFFFF', description: 'Crisp and refined' },
        { color: 'bg-slate-100', name: 'Steel Blue', hex: '#F1F5F9', description: 'Cool and composed' },
      ],
      cozy: [
        { color: 'bg-amber-100', name: 'Warm Sand', hex: '#FEF3C7', description: 'Comforting and snug' },
        { color: 'bg-orange-50', name: 'Peach Cream', hex: '#FFF7ED', description: 'Gentle warmth' },
        { color: 'bg-yellow-50', name: 'Buttercup', hex: '#FEFCE8', description: 'Soft and nurturing' },
      ],
      modern: [
        { color: 'bg-gray-200', name: 'Graphite', hex: '#E5E7EB', description: 'Sleek sleeping space' },
        { color: 'bg-white', name: 'Pure White', hex: '#FFFFFF', description: 'Minimalist retreat' },
        { color: 'bg-zinc-200', name: 'Silver', hex: '#E4E4E7', description: 'Contemporary elegance' },
      ],
    },
    living: {
      calm: [
        { color: 'bg-green-50', name: 'Sage', hex: '#F0FDF4', description: 'Relaxing gathering space' },
        { color: 'bg-blue-50', name: 'Powder Blue', hex: '#EFF6FF', description: 'Peaceful socializing' },
        { color: 'bg-gray-50', name: 'Warm Gray', hex: '#F9FAFB', description: 'Balanced hospitality' },
      ],
      energetic: [
        { color: 'bg-orange-100', name: 'Tangerine', hex: '#FFEDD5', description: 'Lively conversations' },
        { color: 'bg-red-50', name: 'Crimson', hex: '#FEF2F2', description: 'Passionate gathering' },
        { color: 'bg-yellow-50', name: 'Golden', hex: '#FEFCE8', description: 'Vibrant hosting' },
      ],
      professional: [
        { color: 'bg-gray-100', name: 'Executive Gray', hex: '#F3F4F6', description: 'Refined entertaining' },
        { color: 'bg-white', name: 'Gallery White', hex: '#FFFFFF', description: 'Sophisticated display' },
        { color: 'bg-slate-100', name: 'Metropolitan', hex: '#F1F5F9', description: 'Urban elegance' },
      ],
      cozy: [
        { color: 'bg-amber-100', name: 'Honey Gold', hex: '#FEF3C7', description: 'Warm hospitality' },
        { color: 'bg-orange-100', name: 'Burnt Orange', hex: '#FFEDD5', description: 'Welcoming warmth' },
        { color: 'bg-yellow-100', name: 'Warm Beige', hex: '#FEF9C3', description: 'Comfortable living' },
      ],
      modern: [
        { color: 'bg-gray-200', name: 'Concrete', hex: '#E5E7EB', description: 'Industrial modern' },
        { color: 'bg-black', name: 'Ebony', hex: '#000000', description: 'Dramatic statement' },
        { color: 'bg-zinc-100', name: 'Platinum', hex: '#F4F4F5', description: 'Sleek design' },
      ],
    },
    office: {
      calm: [
        { color: 'bg-blue-50', name: 'Focus Blue', hex: '#EFF6FF', description: 'Clear thinking and concentration' },
        { color: 'bg-green-50', name: 'Balance Green', hex: '#F0FDF4', description: 'Reduced eye strain' },
        { color: 'bg-gray-50', name: 'Neutral Gray', hex: '#F9FAFB', description: 'Distraction-free zone' },
      ],
      energetic: [
        { color: 'bg-yellow-50', name: 'Creative Yellow', hex: '#FEFCE8', description: 'Innovation and ideas' },
        { color: 'bg-orange-50', name: 'Motivation', hex: '#FFF7ED', description: 'Productivity boost' },
        { color: 'bg-white', name: 'Bright White', hex: '#FFFFFF', description: 'Alert and focused' },
      ],
      professional: [
        { color: 'bg-gray-200', name: 'Corporate Gray', hex: '#E5E7EB', description: 'Business formal' },
        { color: 'bg-slate-100', name: 'Executive', hex: '#F1F5F9', description: 'Leadership presence' },
        { color: 'bg-white', name: 'Boardroom White', hex: '#FFFFFF', description: 'Professional standard' },
      ],
      cozy: [
        { color: 'bg-amber-50', name: 'Study Brown', hex: '#FFFBEB', description: 'Comfortable focus' },
        { color: 'bg-orange-50', name: 'Warm Walnut', hex: '#FFF7ED', description: 'Home office comfort' },
        { color: 'bg-yellow-50', name: 'Desk Cream', hex: '#FEFCE8', description: 'Gentle productivity' },
      ],
      modern: [
        { color: 'bg-gray-100', name: 'Tech Gray', hex: '#F3F4F6', description: 'Startup vibe' },
        { color: 'bg-white', name: 'Minimalist White', hex: '#FFFFFF', description: 'Clean workspace' },
        { color: 'bg-zinc-200', name: 'Industrial', hex: '#E4E4E7', description: 'Loft office style' },
      ],
    },
  };

  const getRecommendations = () => {
    if (selectedRoomType && selectedMood) {
      const colors = colorDatabase[selectedRoomType]?.[selectedMood] || [];
      setRecommendedColors(colors);
    }
  };

  const resetSelection = () => {
    setSelectedRoomType('');
    setSelectedMood('');
    setRecommendedColors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose the Right Color</h2>
              <p className="text-sm opacity-90">Get personalized color recommendations for your space</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Room Type */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
              What type of room is this?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {roomTypes.map((room) => (
                <button
                  key={room.value}
                  onClick={() => {
                    setSelectedRoomType(room.value);
                    if (selectedMood) {
                      const colors = colorDatabase[room.value]?.[selectedMood] || [];
                      setRecommendedColors(colors);
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedRoomType === room.value
                      ? 'border-[#ea580c] bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-2xl mb-2">{room.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{room.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Mood */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
              What mood do you want to create?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => {
                    setSelectedMood(mood.value);
                    if (selectedRoomType) getRecommendations();
                  }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedMood === mood.value
                      ? 'border-[#ea580c] bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="text-2xl mb-2">{mood.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendedColors.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">3</span>
                  Your Recommended Colors
                </h3>
                <button
                  onClick={resetSelection}
                  className="text-sm text-[#ea580c] hover:text-[#c2410c] font-medium"
                >
                  Start Over
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedColors.map((color, index) => (
                  <div 
                    key={index}
                    className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={`h-32 ${color.color} flex items-center justify-center`}>
                      <Check className="w-12 h-12 text-gray-700 opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-1">{color.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-6 h-6 rounded border border-gray-300" 
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="text-xs text-gray-500 font-mono">{color.hex}</span>
                      </div>
                      <p className="text-sm text-gray-600">{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Initial prompt */}
          {(!selectedRoomType || !selectedMood) && (
            <div className="text-center py-8">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {!selectedRoomType 
                  ? 'Select a room type to get started'
                  : 'Now select the mood you want to create'}
              </p>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#ea580c]" />
              Pro Tips for Color Selection
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>60-30-10 Rule:</strong> Use 60% dominant color, 30% secondary color, and 10% accent color</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Test First:</strong> Always test color samples in your actual space with natural and artificial lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Consider Flow:</strong> Think about how colors transition between adjacent rooms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Steel Furniture:</strong> Neutral colors (white, gray, black) work best with steel furniture&apos;s modern aesthetic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Lighting Matters:</strong> Colors appear different in various lighting - test at different times of day</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout Planner Modal Component
function LayoutPlannerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedRoomShape, setSelectedRoomShape] = useState<string>('');
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]);
  const [roomDimensions, setRoomDimensions] = useState({ length: '', width: '' });
  const [showLayout, setShowLayout] = useState(false);

  const roomShapes = [
    { value: 'square', label: 'Square Room', icon: '⬜' },
    { value: 'rectangle', label: 'Rectangle Room', icon: '▭' },
    { value: 'l-shape', label: 'L-Shaped Room', icon: '📐' },
    { value: 'small', label: 'Compact Space', icon: '📦' },
    { value: 'large', label: 'Open Space', icon: '🏛️' },
  ];

  const furnitureOptions = [
    { value: 'cupboard-2door', label: '2-Door Cupboard', icon: '🚪', size: 'large' },
    { value: 'cupboard-3door', label: '3-Door Cupboard', icon: '🚪🚪', size: 'large' },
    { value: 'divider', label: 'Room Divider', icon: '🔲', size: 'medium' },
    { value: 'bedside', label: 'Bedside Table', icon: '🛏️', size: 'small' },
    { value: 'cabinet', label: 'Storage Cabinet', icon: '🗄️', size: 'medium' },
    { value: 'bookshelf', label: 'Bookshelf', icon: '📚', size: 'medium' },
  ];

  const layoutTemplates: Record<string, Array<{name: string; description: string; items: string[]; tips: string[]}>> = {
    square: [
      {
        name: 'Symmetrical Layout',
        description: 'Balanced arrangement for square rooms',
        items: ['3-Door Cupboard on main wall', 'Bedside tables on both sides', 'Center focal point'],
        tips: ['Place tall furniture against the longest wall', 'Keep center area open for movement']
      },
      {
        name: 'Corner Focus',
        description: 'Maximize corner space',
        items: ['Corner cupboard', 'L-shaped arrangement', 'Open center area'],
        tips: ['Use corner units for dead space', 'Create clear walkways']
      }
    ],
    rectangle: [
      {
        name: 'Linear Layout',
        description: 'Follow the room\'s natural flow',
        items: ['Furniture along long walls', 'Storage at ends', 'Clear pathway in middle'],
        tips: ['Place tall pieces against shorter walls', 'Use long walls for horizontal storage']
      },
      {
        name: 'Zoned Layout',
        description: 'Create separate functional zones',
        items: ['Storage zone at one end', 'Display area in middle', 'Seating area at other end'],
        tips: ['Use dividers to create zones', 'Keep 3ft walkways minimum']
      }
    ],
    'l-shape': [
      {
        name: 'L-Shape Optimization',
        description: 'Make the most of unusual angles',
        items: ['Custom corner unit', 'Storage along main wall', 'Accent piece in nook'],
        tips: ['Use corner for custom storage', 'Keep nook areas bright and accessible']
      }
    ],
    small: [
      {
        name: 'Space-Saver Layout',
        description: 'Maximize every inch',
        items: ['Tall narrow cupboard', 'Multi-functional pieces', 'Vertical storage'],
        tips: ['Go vertical to save floor space', 'Use door-back of cupboards wisely']
      }
    ],
    large: [
      {
        name: 'Statement Layout',
        description: 'Create impact in open spaces',
        items: ['Statement cupboard as focal point', 'Multiple storage zones', 'Display areas'],
        tips: ['Anchor large spaces with bold pieces', 'Create conversation areas around storage']
      }
    ]
  };

  const toggleFurniture = (value: string) => {
    setSelectedFurniture(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const generateLayout = () => {
    if (selectedRoomShape && selectedFurniture.length > 0) {
      setShowLayout(true);
    }
  };

  const resetLayout = () => {
    setSelectedRoomShape('');
    setSelectedFurniture([]);
    setRoomDimensions({ length: '', width: '' });
    setShowLayout(false);
  };

  if (!isOpen) return null;

  const currentLayouts = layoutTemplates[selectedRoomShape] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Plan Your Layout</h2>
              <p className="text-sm opacity-90">Design the perfect furniture arrangement for your space</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showLayout ? (
            <>
              {/* Step 1: Room Shape */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                  What&apos;s your room shape?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {roomShapes.map((shape) => (
                    <button
                      key={shape.value}
                      onClick={() => setSelectedRoomShape(shape.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedRoomShape === shape.value
                          ? 'border-[#ea580c] bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-2xl mb-2">{shape.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{shape.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Room Dimensions (Optional) */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                  Room dimensions (optional, in feet)
                </h3>
                <div className="flex gap-4 max-w-md">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-2">Length</label>
                    <input
                      type="number"
                      value={roomDimensions.length}
                      onChange={(e) => setRoomDimensions({...roomDimensions, length: e.target.value})}
                      placeholder="e.g., 12"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-2">Width</label>
                    <input
                      type="number"
                      value={roomDimensions.width}
                      onChange={(e) => setRoomDimensions({...roomDimensions, width: e.target.value})}
                      placeholder="e.g., 10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Furniture Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-[#ea580c] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">3</span>
                  What furniture pieces do you need?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {furnitureOptions.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => toggleFurniture(item.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedFurniture.includes(item.value)
                          ? 'border-[#ea580c] bg-orange-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium text-gray-900 mb-1">{item.label}</div>
                      <div className="text-xs text-gray-500 capitalize">{item.size} piece</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              {selectedRoomShape && selectedFurniture.length > 0 && (
                <div className="mb-6 text-center">
                  <button
                    onClick={generateLayout}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                  >
                    Generate Layout Plans →
                  </button>
                </div>
              )}

              {/* Initial prompt */}
              {(!selectedRoomShape || selectedFurniture.length === 0) && (
                <div className="text-center py-8">
                  <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {!selectedRoomShape 
                      ? 'Select a room shape to get started'
                      : `Now select furniture pieces (${selectedFurniture.length} selected)`}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Layout Results */
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Layout Plans</h3>
                <button
                  onClick={resetLayout}
                  className="text-sm text-[#ea580c] hover:text-[#c2410c] font-medium"
                >
                  Start Over
                </button>
              </div>

              {/* Room Info */}
              {roomDimensions.length && roomDimensions.width && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Room Size:</strong> {roomDimensions.length}ft × {roomDimensions.width}ft = {parseInt(roomDimensions.length) * parseInt(roomDimensions.width)} sq ft
                  </p>
                </div>
              )}

              {/* Layout Templates */}
              <div className="space-y-6">
                {currentLayouts.map((layout, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{layout.name}</h4>
                      <p className="text-gray-600 mb-4">{layout.description}</p>
                      
                      {/* Furniture Placement */}
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Furniture Placement:</h5>
                        <ul className="space-y-2">
                          {layout.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-[#ea580c] mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pro Tips */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-[#ea580c]" />
                          Layout Tips:
                        </h5>
                        <ul className="space-y-2">
                          {layout.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-[#ea580c] mt-0.5">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Furniture Summary */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Your Selected Furniture:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFurniture.map((item) => {
                    const furnitureItem = furnitureOptions.find(f => f.value === item);
                    return furnitureItem ? (
                      <span key={item} className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200">
                        {furnitureItem.icon} {furnitureItem.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#ea580c]" />
              Layout Planning Best Practices
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Measure First:</strong> Always measure your space before buying furniture, including doorways and hallways for delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Walkway Space:</strong> Allow at least 3 feet (36 inches) for comfortable walkways between furniture pieces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Door Clearance:</strong> Ensure cupboard doors can open fully - check swing direction and clearance space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Weight Distribution:</strong> Place heavier items against load-bearing walls and distribute weight evenly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Vertical Space:</strong> Use tall cupboards to maximize storage without taking up floor space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ea580c] mt-0.5">•</span>
                <span><strong>Balance:</strong> Distribute visual weight evenly - avoid clustering all tall pieces on one side</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small Spaces Optimizer Modal Component
function SmallSpacesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const spaceTypes = [
    { value: 'bedroom', label: 'Small Bedroom', icon: '🛏️', size: '80-120 sq ft' },
    { value: 'living', label: 'Compact Living', icon: '🛋️', size: '100-150 sq ft' },
    { value: 'kitchen', label: 'Tiny Kitchen', icon: '🍳', size: '50-80 sq ft' },
    { value: 'office', label: 'Home Office', icon: '💼', size: '60-100 sq ft' },
    { value: 'studio', label: 'Studio Apartment', icon: '🏢', size: '200-400 sq ft' },
  ];

  const spaceSolutions = [
    { value: 'vertical', label: 'Vertical Storage', icon: '📊', savings: 'Save 40% floor space' },
    { value: 'multi', label: 'Multi-Functional', icon: '🔄', savings: '2-in-1 furniture' },
    { value: 'hidden', label: 'Hidden Storage', icon: '🎁', savings: 'Declutter instantly' },
    { value: 'foldable', label: 'Foldable Pieces', icon: '📦', savings: 'Use when needed' },
    { value: 'mirrored', label: 'Mirrored Surfaces', icon: '🪞', savings: '2x visual space' },
    { value: 'modular', label: 'Modular Units', icon: '🧩', savings: 'Custom fit' },
  ];

  const solutionDetails: Record<string, {title: string; description: string; tips: Array<{title: string; detail: string}>; products: string[]}> = {
    vertical: {
      title: 'Vertical Storage Solutions',
      description: 'Maximize wall space to free up valuable floor area',
      tips: [
        { title: 'Floor-to-Ceiling Cupboards', detail: 'Use tall steel cupboards that reach the ceiling. A 7-foot cupboard provides 40% more storage than a 5-foot unit while occupying the same floor space. Install adjustable shelves to customize interior organization.' },
        { title: 'Wall-Mounted Shelving', detail: 'Install floating shelves above desks, beds, or seating areas. Place them 12-14 inches apart for optimal storage. Steel shelves can hold 30-50 lbs per shelf.' },
        { title: 'Over-Door Storage', detail: 'Use the back of doors for hanging organizers or over-door cupboards. This unused space can store shoes, accessories, or cleaning supplies.' },
        { title: 'Corner Units', detail: 'Install corner cupboards or rotating lazy susans to utilize awkward corner spaces that typically go wasted.' },
      ],
      products: ['Tall Steel Cupboard (7ft)', 'Wall-Mounted Steel Shelves', 'Corner Storage Unit']
    },
    multi: {
      title: 'Multi-Functional Furniture',
      description: 'Pieces that serve multiple purposes to reduce furniture count',
      tips: [
        { title: 'Storage Ottomans', detail: 'Use as seating, footrest, coffee table, and hidden storage. Perfect for storing blankets, magazines, or seasonal items while serving as functional furniture.' },
        { title: 'Cupboard with Built-in Desk', detail: 'Combine wardrobe and workspace. Fold-down desk surfaces can be tucked away when not in use, saving 6-8 sq ft of floor space.' },
        { title: 'Bedside Table with Cabinet', detail: 'Choose bedside tables that double as mini-storage cabinets with drawers and shelves for books, electronics, and personal items.' },
        { title: 'Room Divider with Storage', detail: 'Use steel storage units as room dividers to create separate zones while adding storage. Open shelving on both sides maximizes utility.' },
      ],
      products: ['Storage Ottoman Bench', 'Cupboard-Desk Combo', 'Storage Room Divider']
    },
    hidden: {
      title: 'Hidden Storage Solutions',
      description: 'Clever concealed storage to maintain clean, uncluttered aesthetics',
      tips: [
        { title: 'Under-Bed Storage', detail: 'Use bed risers to create 6-8 inches of clearance for storage bins. A twin bed can hide 10-15 storage boxes, equivalent to a small closet.' },
        { title: 'Hollow Furniture', detail: 'Choose steel cupboards with false bottoms or hidden compartments. Perfect for storing valuable items or seasonal decorations out of sight.' },
        { title: 'Built-in Alcoves', detail: 'Create storage in wall recesses or between studs. Custom steel inserts can turn dead wall space into functional shelving.' },
        { title: 'Staircase Storage', detail: 'If you have stairs, utilize the space underneath with custom steel cabinets or pull-out drawers for shoes, coats, or cleaning supplies.' },
      ],
      products: ['Under-Bed Storage Boxes', 'Hidden Compartment Cabinet', 'Custom Built-in Units']
    },
    foldable: {
      title: 'Foldable & Collapsible Pieces',
      description: 'Furniture that disappears when not in use',
      tips: [
        { title: 'Wall-Mounted Drop-Leaf Table', detail: 'Folds flat against the wall when not in use, saving 8-12 sq ft. Extends to seat 4-6 people for meals or work.' },
        { title: 'Folding Chairs', detail: 'Steel folding chairs stack to 3 inches thick. Store 4-6 chairs in a 1 sq ft closet space for instant extra seating.' },
        { title: 'Murphy Bed Systems', detail: 'Folds vertically into a cabinet, freeing 30-40 sq ft during the day. Modern systems include built-in desks or sofas.' },
        { title: 'Collible Drying Racks', detail: 'Wall-mounted or over-door drying racks fold away when not in use, perfect for small apartments without laundry space.' },
      ],
      products: ['Wall-Mounted Drop Table', 'Stackable Folding Chairs', 'Murphy Bed Cabinet']
    },
    mirrored: {
      title: 'Mirrored & Reflective Surfaces',
      description: 'Visual tricks that make spaces feel twice as large',
      tips: [
        { title: 'Mirrored Cupboard Doors', detail: 'Install mirror panels on cupboard doors. This doubles the visual depth of the room while providing a full-length mirror for dressing.' },
        { title: 'Strategic Mirror Placement', detail: 'Place mirrors opposite windows to reflect natural light. A well-placed mirror can make a room feel 30% larger and significantly brighter.' },
        { title: 'Glossy Finishes', detail: 'Choose high-gloss steel finishes that reflect light. Glossy surfaces bounce light around the room, creating an airy, open feeling.' },
        { title: 'Glass-Front Cabinets', detail: 'Use glass panels on upper cabinet doors to create visual depth. The see-through quality makes walls appear further away than they are.' },
      ],
      products: ['Mirrored Door Cupboard', 'High-Gloss Steel Finish', 'Glass-Front Cabinet']
    },
    modular: {
      title: 'Modular & Customizable Units',
      description: 'Flexible systems that adapt to your exact space',
      tips: [
        { title: 'Stackable Cube Units', detail: 'Configure steel cube storage vertically or horizontally. Start with 4 cubes and add more as needed. Each cube is 13x13x13 inches.' },
        { title: 'Adjustable Shelving Systems', detail: 'Install steel shelving with adjustable heights. Change shelf positions as storage needs evolve without buying new furniture.' },
        { title: 'Modular Wardrobe Systems', detail: 'Combine individual wardrobe modules to create custom configurations. Add or remove sections as your space or needs change.' },
        { title: 'Rolling Storage Carts', detail: 'Steel carts on wheels can be moved wherever needed. Use as a kitchen island, office supply station, or bathroom storage.' },
      ],
      products: ['Stackable Cube Storage', 'Adjustable Steel Shelving', 'Modular Wardrobe System']
    }
  };

  const spaceSpecificTips: Record<string, Array<{title: string; tip: string}>> = {
    bedroom: [
      { title: 'Float Nightstands', tip: 'Wall-mounted bedside tables free floor space and create a floating effect that makes the room feel larger.' },
      { title: 'Under-Bed Drawers', tip: 'Install pull-out drawers under the bed frame for clothing storage, utilizing dead space effectively.' },
      { title: 'Tall Headboard Storage', tip: 'Choose a headboard with built-in shelving or cupboards to maximize vertical space behind the bed.' },
    ],
    living: [
      { title: 'Nesting Tables', tip: 'Use nesting side tables that tuck under each other. Pull out extra surfaces only when guests arrive.' },
      { title: 'Corner TV Unit', tip: 'Install corner-mounted TV units with storage to utilize often-wasted corner space.' },
      { title: 'Slim Profile Furniture', tip: 'Choose furniture with narrow depths (12-14 inches) to maintain walkway space while providing storage.' },
    ],
    kitchen: [
      { title: 'Magnetic Knife Strip', tip: 'Mount steel magnetic strips on walls for knife storage, freeing drawer space for other utensils.' },
      { title: 'Pegboard Organization', tip: 'Install steel pegboards on walls for pots, pans, and utensils. Keeps counters clear and items accessible.' },
      { title: 'Over-Sink Cutting Board', tip: 'Use the sink area as extra counter space with custom-fit cutting boards that slide over the basin.' },
    ],
    office: [
      { title: 'Monitor Risers', tip: 'Raise monitors on steel stands to create storage underneath for keyboards, notebooks, or supplies.' },
      { title: 'Cable Management', tip: 'Use steel cable organizers mounted under desks to eliminate visual clutter and free up workspace.' },
      { title: 'Vertical File Storage', tip: 'Install wall-mounted file holders instead of floor-standing filing cabinets to save 4-6 sq ft.' },
    ],
    studio: [
      { title: 'Room Dividers', tip: 'Use tall steel shelving units as room dividers to create separate living and sleeping zones.' },
      { title: 'Zone Lighting', tip: 'Define different areas with distinct lighting rather than one overhead light. Floor lamps create cozy zones.' },
      { title: 'Multi-Zone Furniture', tip: 'Place a sofa with back facing the bed to create a visual living room boundary without walls.' },
    ]
  };

  const toggleSolution = (value: string) => {
    setSelectedSolutions(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const generateSolutions = () => {
    if (selectedSpace && selectedSolutions.length > 0) {
      setShowResults(true);
    }
  };

  const resetSolutions = () => {
    setSelectedSpace('');
    setSelectedSolutions([]);
    setShowResults(false);
    setExpandedTip(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Maximize Small Spaces</h2>
              </div>
              <p className="text-sm opacity-90">Transform compact areas into organized, spacious-feeling rooms</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showResults ? (
            <>
              {/* Step 1: Space Type */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">1</span>
                  What type of small space do you have?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {spaceTypes.map((space) => (
                    <button
                      key={space.value}
                      onClick={() => setSelectedSpace(space.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        selectedSpace === space.value
                          ? 'border-green-600 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-3xl mb-2">{space.icon}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{space.label}</div>
                      <div className="text-xs text-gray-500">{space.size}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Solutions */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">2</span>
                  Which space-saving solutions interest you?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {spaceSolutions.map((solution) => (
                    <button
                      key={solution.value}
                      onClick={() => toggleSolution(solution.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedSolutions.includes(solution.value)
                          ? 'border-green-600 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-2xl mb-2">{solution.icon}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{solution.label}</div>
                      <div className="text-xs text-green-600 font-medium">{solution.savings}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              {selectedSpace && selectedSolutions.length > 0 && (
                <div className="mb-6 text-center">
                  <button
                    onClick={generateSolutions}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    Get Space Optimization Plan <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Initial prompt */}
              {(!selectedSpace || selectedSolutions.length === 0) && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📐</div>
                  <p className="text-gray-500">
                    {!selectedSpace 
                      ? 'Select your space type to get started'
                      : `Now select space-saving solutions (${selectedSolutions.length} selected)`}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Results */
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Space Optimization Plan</h3>
                <button
                  onClick={resetSolutions}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Start Over
                </button>
              </div>

              {/* Space Badge */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Optimizing:</strong> {spaceTypes.find(s => s.value === selectedSpace)?.icon} {spaceTypes.find(s => s.value === selectedSpace)?.label}
                </p>
              </div>

              {/* Selected Solutions Detail */}
              <div className="space-y-6 mb-8">
                {selectedSolutions.map((sol, index) => {
                  const solution = solutionDetails[sol];
                  if (!solution) return null;
                  return (
                    <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-tl from-green-50 to-emerald-50 p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <span className="text-2xl">{spaceSolutions.find(s => s.value === sol)?.icon}</span>
                          {solution.title}
                        </h4>
                        <p className="text-gray-600 mb-4">{solution.description}</p>
                        
                        {/* Expandable Tips */}
                        <div className="space-y-3">
                          {solution.tips.map((tip, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => setExpandedTip(expandedTip === idx ? null : idx)}
                                className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                              >
                                <span className="font-semibold text-gray-900 text-left">{tip.title}</span>
                                {expandedTip === idx ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                              </button>
                              {expandedTip === idx && (
                                <div className="px-4 py-3 bg-gray-50 text-sm text-gray-700 leading-relaxed">
                                  {tip.detail}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Recommended Products */}
                        <div className="mt-4 bg-white rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">Recommended Products:</h5>
                          <div className="flex flex-wrap gap-2">
                            {solution.products.map((product, idx) => (
                              <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Space-Specific Tips */}
              {spaceSpecificTips[selectedSpace] && (
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                    Bonus: {spaceTypes.find(s => s.value === selectedSpace)?.label}-Specific Tips
                  </h4>
                  <div className="space-y-3">
                    {spaceSpecificTips[selectedSpace].map((tip, idx) => (
                      <div key={idx} className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">{tip.title}</h5>
                        <p className="text-sm text-gray-700">{tip.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* General Tips Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              Golden Rules for Small Spaces
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Go Vertical:</strong> When floor space is limited, build upward. Tall cupboards and wall shelves maximize storage without sacrificing precious square footage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Multi-Task Everything:</strong> Every piece of furniture should serve at least 2 purposes. Storage ottomans, desk-bed combos, and nesting tables are your best friends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Light & Bright:</strong> Use light colors, mirrors, and good lighting to create the illusion of space. Dark corners make rooms feel smaller</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Declutter Ruthlessly:</strong> Small spaces overwhelm quickly. Adopt the one-in-one-out rule: for every new item, remove an old one</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Float When Possible:</strong> Wall-mounted desks, shelves, and nightstands create visible floor space, making rooms feel 20-30% larger</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Edit Regularly:</strong> Every 3 months, reassess your space. Remove items you haven&apos;t used and reorganize for your current needs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quality Guide Modal Component
function QualityGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'materials' | 'checklist' | 'comparison' | 'investment'>('materials');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const materialQuality = [
    {
      name: 'Steel Furniture',
      icon: '🏗️',
      rating: 5,
      pros: ['Lasts 20-30+ years', 'Termite-proof', 'Water-resistant', 'No warping', 'Recyclable'],
      cons: ['Heavier to move', 'Can dent if impacted'],
      durability: '20-30 years',
      maintenance: 'Low - Wipe clean',
      costOverTime: '$2-3/year'
    },
    {
      name: 'Wood Furniture',
      icon: '🪵',
      rating: 3,
      pros: ['Classic look', 'Repairable', 'Various finishes'],
      cons: ['Termites', 'Warps over time', 'Water damage', 'Needs polishing'],
      durability: '8-15 years',
      maintenance: 'Medium - Polish yearly',
      costOverTime: '$5-8/year'
    },
    {
      name: 'Particle Board',
      icon: '📦',
      rating: 2,
      pros: ['Cheap upfront', 'Lightweight'],
      cons: ['Lasts 3-5 years', 'Water damage', 'Sags over time', 'Not repairable'],
      durability: '3-5 years',
      maintenance: 'High - Replace often',
      costOverTime: '$15-20/year'
    },
  ];

  const qualityChecklist = [
    {
      category: 'Material Quality',
      items: [
        'Steel thickness: Look for 0.7mm+ gauge (thicker = more durable)',
        'Welded joints: Should be smooth, even, and without gaps',
        'Powder coating: Provides rust resistance and lasts longer than paint',
        'Weight test: Quality steel furniture feels substantial, not flimsy',
        'No sharp edges: All edges should be smooth and finished',
      ]
    },
    {
      category: 'Construction Quality',
      items: [
        'Reinforced corners: Look for additional metal brackets at stress points',
        'Smooth drawer movement: Drawers should glide, not scrape',
        'Sturdy handles: Should be riveted or bolted, not just glued',
        'Level stability: Furniture should sit flat without wobbling',
        'Door alignment: Doors should close evenly without gaps',
      ]
    },
    {
      category: 'Finish & Details',
      items: [
        'Even coating: No drips, bubbles, or bare spots in the finish',
        'Color consistency: Same shade across all surfaces',
        'Edge sealing: All cut edges should be covered or folded',
        'Hardware quality: Hinges and locks should be metal, not plastic',
        'Warranty: Quality brands offer 5-10 year warranties',
      ]
    },
    {
      category: 'Long-Term Value',
      items: [
        'Cost per use: Divide price by years of use to get real cost',
        'Resale value: Quality steel furniture retains 40-60% value',
        'Replacement parts: Check if hinges/shelves can be replaced',
        'Refinishable: Can be repainted or refinished when needed',
        'Recyclable: Steel is 100% recyclable at end of life',
      ]
    }
  ];

  const comparisonData = [
    { feature: 'Lifespan', steel: '20-30 years', wood: '8-15 years', particle: '3-5 years' },
    { feature: 'Water Resistant', steel: '✓ Excellent', wood: '✗ Poor', particle: '✗ Very Poor' },
    { feature: 'Termite Proof', steel: '✓ Yes', wood: '✗ No', particle: '✗ No' },
    { feature: 'Maintenance', steel: 'Low', wood: 'Medium', particle: 'High' },
    { feature: 'Weight Capacity', steel: '100-200 lbs', wood: '60-100 lbs', particle: '30-50 lbs' },
    { feature: 'Eco-Friendly', steel: '✓ 100% Recyclable', wood: '△ Depends', particle: '✗ No' },
    { feature: '5-Year Cost', steel: '$10-15/year', wood: '$20-30/year', particle: '$40-60/year' },
    { feature: 'Warranty', steel: '5-10 years', wood: '1-3 years', particle: '6 months' },
  ];

  const investmentTips = [
    {
      title: 'Calculate Real Cost',
      icon: TrendingUp,
      description: 'Don\'t just look at the price tag. Divide the cost by years of use.',
      example: 'A $500 steel cupboard lasting 25 years costs $20/year. A $200 particle board unit lasting 4 years costs $50/year. Quality saves $30/year!'
    },
    {
      title: 'Check Warranty Length',
      icon: Shield,
      description: 'Warranty length indicates manufacturer confidence in their product.',
      example: '10-year warranty = built to last decades. 6-month warranty = expect replacements soon.'
    },
    {
      title: 'Read Reviews Carefully',
      icon: Award,
      description: 'Look for reviews from 2+ years ago to see long-term performance.',
      example: '"Still perfect after 3 years" is worth more than 50 "Looks great" reviews.'
    },
    {
      title: 'Inspect Build Quality',
      icon: Zap,
      description: 'Check joints, hinges, and finish before purchasing.',
      example: 'Smooth welds, thick steel, and quality hardware indicate superior construction.'
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-2xl sticky top-0">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Quality Over Quantity</h2>
              </div>
              <p className="text-sm opacity-90">Invest in pieces that last decades, not seasons</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-[88px] bg-white border-b border-gray-200 z-10">
          <div className="grid grid-cols-4 gap-2 p-4">
            {[
              { key: 'materials', label: 'Materials', icon: '🏗️' },
              { key: 'checklist', label: 'Checklist', icon: '✓' },
              { key: 'comparison', label: 'Compare', icon: '⚖️' },
              { key: 'investment', label: 'Investment', icon: '💰' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'materials' | 'checklist' | 'comparison' | 'investment')}
                className={`p-3 rounded-lg transition-all duration-300 text-center ${
                  activeTab === tab.key
                    ? 'bg-purple-100 border-2 border-purple-600 text-purple-900'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-xl mb-1">{tab.icon}</div>
                <div className="text-xs font-semibold">{tab.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Material Quality Comparison</h3>
              
              {materialQuality.map((material, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-tl from-purple-50 to-indigo-50 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{material.icon}</span>
                          <h4 className="text-2xl font-bold text-gray-900">{material.name}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < material.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Lasts</div>
                        <div className="text-lg font-bold text-purple-600">{material.durability}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-green-600 mb-2">✓ Advantages</h5>
                        <ul className="space-y-1">
                          {material.pros.map((pro, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold text-red-600 mb-2">✗ Considerations</h5>
                        <ul className="space-y-1">
                          {material.cons.map((con, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div className="bg-white px-4 py-2 rounded-lg flex-1">
                        <span className="text-gray-600">Maintenance:</span>
                        <span className="font-semibold ml-2">{material.maintenance}</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg flex-1">
                        <span className="text-gray-600">Cost/Year:</span>
                        <span className="font-semibold ml-2 text-purple-600">{material.costOverTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Inspection Checklist</h3>
              <p className="text-gray-600 mb-6">Use this checklist when shopping to ensure you&apos;re getting quality furniture</p>
              
              {qualityChecklist.map((section, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.category ? null : section.category)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-tl from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-colors"
                  >
                    <span className="font-bold text-gray-900 text-left">{section.category}</span>
                    {expandedSection === section.category ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                  </button>
                  {expandedSection === section.category && (
                    <div className="p-6 bg-white">
                      <div className="space-y-3">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 rounded border-2 border-purple-600 flex-shrink-0 mt-0.5"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Head-to-Head Comparison</h3>
              <p className="text-gray-600 mb-6">See how different materials stack up against each other</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-tl from-purple-50 to-indigo-50">
                      <th className="border-2 border-gray-200 px-4 py-3 text-left text-sm font-bold text-gray-900">Feature</th>
                      <th className="border-2 border-gray-200 px-4 py-3 text-center text-sm font-bold text-green-600">🏗️ Steel</th>
                      <th className="border-2 border-gray-200 px-4 py-3 text-center text-sm font-bold text-amber-600">🪵 Wood</th>
                      <th className="border-2 border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-600">📦 Particle Board</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">{row.feature}</td>
                        <td className="border-2 border-gray-200 px-4 py-3 text-sm text-center text-green-700 font-medium">{row.steel}</td>
                        <td className="border-2 border-gray-200 px-4 py-3 text-sm text-center text-amber-700">{row.wood}</td>
                        <td className="border-2 border-gray-200 px-4 py-3 text-sm text-center text-gray-600">{row.particle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 rounded-lg p-6 mt-6">
                <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Winner: Steel Furniture
                </h4>
                <p className="text-sm text-green-800 leading-relaxed">
                  Steel furniture outperforms in durability, maintenance, eco-friendliness, and long-term cost. While the upfront cost may be higher, 
                  the cost per year is significantly lower, and you&apos;ll avoid the hassle of replacements for decades.
                </p>
              </div>
            </div>
          )}

          {/* Investment Tab */}
          {activeTab === 'investment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Investment Guide</h3>
              <p className="text-gray-600 mb-6">Learn how to evaluate furniture quality and make purchases that pay off</p>
              
              <div className="space-y-4">
                {investmentTips.map((tip, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-tl from-purple-50 to-indigo-50 p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <tip.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h4>
                          <p className="text-sm text-gray-700">{tip.description}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-l-4 border-purple-600">
                        <p className="text-sm text-gray-700">
                          <strong className="text-purple-600">Example:</strong> {tip.example}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ROI Calculator */}
              <div className="bg-gradient-to-tl from-purple-600 to-indigo-600 text-white rounded-lg p-6 mt-6">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Quality Investment ROI
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">$500</div>
                    <div className="text-sm opacity-90">Quality Steel Cupboard</div>
                    <div className="text-xs mt-2 opacity-75">Lasts 25+ years</div>
                    <div className="text-lg font-bold mt-2">$20/year</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">$200</div>
                    <div className="text-sm opacity-90">Particle Board Unit</div>
                    <div className="text-xs mt-2 opacity-75">Lasts 4 years</div>
                    <div className="text-lg font-bold mt-2">$50/year</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-2">$750</div>
                    <div className="text-sm opacity-90">You Save in 25 Years</div>
                    <div className="text-xs mt-2 opacity-75">Plus 5 replacements avoided</div>
                    <div className="text-lg font-bold mt-2">60% Savings</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Tips */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Quality Buying Principles
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Buy Once, Buy Right:</strong> Investing in quality furniture upfront saves money, stress, and waste from frequent replacements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Check the Details:</strong> Smooth welds, thick steel, quality hardware, and even finishes indicate superior construction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Warranty Matters:</strong> A 10-year warranty shows manufacturer confidence. Short warranties signal expected failures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Steel is Superior:</strong> For longevity, durability, and eco-friendliness, steel furniture outperforms wood and particle board</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Think Long-Term:</strong> Calculate cost per year, not just purchase price. Quality furniture often costs less annually</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">★</span>
                <span><strong>Test Before Buying:</strong> Open drawers, check doors, examine welds. Quality reveals itself in the details</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InspirationPage() {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [isSmallSpacesModalOpen, setIsSmallSpacesModalOpen] = useState(false);
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);

  const tips = [
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: 'Maximize Small Spaces',
      content: 'Use vertical storage solutions like tall cupboards to make the most of limited floor space. Mirrored finishes can also make rooms appear larger.'
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: 'Choose the Right Color',
      content: 'Light colors make rooms feel more spacious, while dark colors add sophistication. Consider your room\'s existing color palette when selecting furniture.'
    },
    {
      icon: <Home className="w-8 h-8 text-white" />,
      title: 'Plan Your Layout',
      content: 'Measure your space before purchasing. Leave enough room for doors to open fully and ensure proper ventilation around furniture.'
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: 'Quality Over Quantity',
      content: 'Invest in durable, well-made pieces that will last for years. Steel furniture offers excellent longevity and requires minimal maintenance.'
    },
  ];

  const roomIdeas = [
    {
      title: 'Bedroom Essentials',
      description: 'Create a serene sleeping environment with the right storage solutions.',
      items: ['3-door cupboard for ample storage', 'Matching bedside organizers', 'Built-in mirror options'],
      image: '/images/cupboard 1.png'
    },
    {
      title: 'Living Room Style',
      description: 'Combine functionality with aesthetics for your gathering space.',
      items: ['Decorative dividers', 'Storage cabinets for media', 'Display units for decor'],
      image: '/images/cupboard 2.png'
    },
    {
      title: 'Home Office Setup',
      description: 'Stay organized and productive with smart storage solutions.',
      items: ['Filing cabinets', 'Bookshelf units', 'Compact storage solutions'],
      image: '/images/cupboard 3.png'
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Inspiration</h1>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Transform Your Space</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Discover creative ideas and expert tips to make the most of your furniture. 
              From space-saving solutions to style inspiration, we&apos;re here to help you 
              create the perfect home.
            </p>
          </div>
        </div>

        {/* Design Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Design Tips & Ideas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 ${
                  tip.title === 'Choose the Right Color' || tip.title === 'Plan Your Layout' || tip.title === 'Maximize Small Spaces' || tip.title === 'Quality Over Quantity'
                    ? 'cursor-pointer hover:shadow-xl transition-shadow duration-300' 
                    : ''
                }`}
                onClick={() => {
                  if (tip.title === 'Choose the Right Color') {
                    setIsColorModalOpen(true);
                  } else if (tip.title === 'Plan Your Layout') {
                    setIsLayoutModalOpen(true);
                  } else if (tip.title === 'Maximize Small Spaces') {
                    setIsSmallSpacesModalOpen(true);
                  } else if (tip.title === 'Quality Over Quantity') {
                    setIsQualityModalOpen(true);
                  }
                }}
              >
                <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.content}</p>
                {(tip.title === 'Choose the Right Color' || tip.title === 'Plan Your Layout' || tip.title === 'Maximize Small Spaces' || tip.title === 'Quality Over Quantity') && (
                  <div className="mt-3 text-[#ea580c] text-sm font-medium flex items-center gap-1">
                    Click to explore →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Room Ideas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Room-by-Room Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomIdeas.map((room, index) => (
              <div key={index} className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-48 bg-white flex items-center justify-center">
                  <Image 
                    src={room.image} 
                    alt={room.title} 
                    width={200} 
                    height={200}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{room.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{room.description}</p>
                  <ul className="space-y-2">
                    {room.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-[#ea580c] rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Guide */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Color Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-gray-200 mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">White</h3>
              <p className="text-gray-600 text-sm">Clean, modern, makes spaces feel larger</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 border-4 border-gray-600 mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Black</h3>
              <p className="text-gray-600 text-sm">Sophisticated, bold, timeless elegance</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-amber-800 border-4 mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Brown</h3>
              <p className="text-gray-600 text-sm">Warm, natural, classic appeal</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 border-4 border-gray-400 mb-4"></div>
              <h3 className="font-bold text-gray-900 mb-2">Gray</h3>
              <p className="text-gray-600 text-sm">Neutral, versatile, contemporary</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Personalized Advice?</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Our design experts are here to help you choose the perfect furniture for your space. 
            Get personalized recommendations based on your room size, style preferences, and budget.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </main>

      {/* Color Guide Modal */}
      <ColorGuideModal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} />

      {/* Layout Planner Modal */}
      <LayoutPlannerModal isOpen={isLayoutModalOpen} onClose={() => setIsLayoutModalOpen(false)} />

      {/* Small Spaces Modal */}
      <SmallSpacesModal isOpen={isSmallSpacesModalOpen} onClose={() => setIsSmallSpacesModalOpen(false)} />

      {/* Quality Guide Modal */}
      <QualityGuideModal isOpen={isQualityModalOpen} onClose={() => setIsQualityModalOpen(false)} />
    </div>
  );
}
