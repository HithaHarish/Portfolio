import { useEffect } from 'react'; //A React hook that lets you run side effects after the component renders
import fluidCursor from '../hooks/use-FluidCursor'; //animation, event listener and drawings
import '../styles/FluidCursor.css'; // <- Import the styling

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return <canvas id="fluid" />;
};

export default FluidCursor;
