import React from "react";
import { RotatingLines } from "react-loader-spinner";
interface LoaderProps {
  loading: boolean; // Prop to control loading state
  children?: React.ReactNode; // Optional children prop
}
const styles = {
  loaderContainer: {
    display: 'flex',  justifyContent: 'center', alignItems: 'center', // Center vertically
    height: '100vh', // Full viewport height
    width: '100%', // Full width
  },
};
export default function Loader({ loading, children }: LoaderProps) {
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <RotatingLines
          strokeColor="red"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  return <>{children}</>; // Render children when not loading
}

