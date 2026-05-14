import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="beat-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loader-text">Finding your next favorite book...</p>
    </div>
  );
}
