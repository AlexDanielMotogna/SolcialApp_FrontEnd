import React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
  type: 'spinningBubbles' | 'bars' | 'bubbles' | 'circular' | 'ellipsis'; 
  color: string;
}

const Loader: React.FC<LoadingProps> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);

export default Loader;
