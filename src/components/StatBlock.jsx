import "./StatBlock.css";

function StatBlock({ label, value }) {
  return (
    <div className="stat-block">
      <span className="stat-block__value">{value}</span>
      <span className="stat-block__label">{label}</span>
    </div>
  );
}

export default StatBlock;
