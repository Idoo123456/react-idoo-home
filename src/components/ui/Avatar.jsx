import React from 'react';

const Avatar = ({ 
  name, 
  image, 
  size = 'md',
  variant = 'circle',
  status = null,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (str) => {
    return str
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const colors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-pink-500 to-rose-600',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-gradient-to-br from-amber-500 to-orange-600',
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div className="relative inline-block">
      {image ? (
        <img
          src={image}
          alt={name}
          className={`${sizes[size]} rounded-${variant === 'circle' ? 'full' : 'lg'} object-cover ${className}`}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-${
            variant === 'circle' ? 'full' : 'lg'
          } ${colors[colorIndex]} flex items-center justify-center font-semibold text-white shadow-md ${className}`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            status === 'online'
              ? 'bg-emerald-500'
              : status === 'away'
                ? 'bg-amber-500'
                : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;
