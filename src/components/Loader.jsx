import "./Loader.css";

function Loader({ label = "loading" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__prompt">$ {label}</span>
      <span className="cursor loader__cursor" />
    </div>
  );
}

export default Loader;
