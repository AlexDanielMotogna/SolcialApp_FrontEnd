import React from 'react';

interface LoaderProps {
  loading: boolean;
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ loading, size = 50, color = '#1E1E20' }) => {
  if (!loading) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="border-4 border-t-4 border-transparent rounded-full animate-spin"
        style={{
          borderColor: color,
          borderTopColor: 'transparent',
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default Loader;
