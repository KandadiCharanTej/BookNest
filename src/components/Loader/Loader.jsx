export default function Loader() {
  return (
    <div className="loader-container" id="loader">
      <div className="loader-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="loader-text">Loading books...</p>
    </div>
  );
}
