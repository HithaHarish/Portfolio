import { useEffect } from 'react';
import fluidCursor from '../hooks/use-FluidCursor';
import '../styles/FluidCursor.css'; // <- Import the styling

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return <canvas id="fluid" />;
};

export default FluidCursor;
