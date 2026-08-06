import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
// Mock import, adjust based on actual store setup
// import { addItem } from '../../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate dispatch
    // dispatch(addItem(product));
    console.log('Added to cart:', product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-md hover:shadow-primary-900/10 transition-shadow">
      <div className="relative h-40 w-full overflow-hidden bg-dark-bg">
        <img 
          src={product.image || 'https://via.placeholder.com/150'} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-dark-bg/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star size={12} className="text-accent fill-accent" />
          <span className="text-xs font-bold text-dark-text">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-dark-text font-medium text-sm line-clamp-2 h-10 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="text-accent font-bold text-sm">
            {formattedPrice} so'm
          </div>
          <button 
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all ${
              isAdding 
                ? 'bg-green-500 text-white scale-110' 
                : 'bg-primary-900 text-white hover:bg-primary-800 active:scale-95'
            }`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
