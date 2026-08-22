import { scoreTier } from "../utils/score.js";
import "./ScoreGauge.css";

const CELL_COUNT = 28;
const RADIUS = 78;
const CENTER = 90;
const CELL_SIZE = 10;

// The signature visual: instead of a plain circular progress bar, the ring
// is built from little squares — the same unit GitHub uses for its
// contribution graph — so the gauge itself speaks the subject's language.
function ScoreGauge({ score }) {
  const tier = scoreTier(score);
  const filledCount = Math.round((score / 100) * CELL_COUNT);

  const cells = Array.from({ length: CELL_COUNT }, (_, i) => {
    const angle = (i / CELL_COUNT) * 2 * Math.PI - Math.PI / 2;
    const x = CENTER + RADIUS * Math.cos(angle);
    const y = CENTER + RADIUS * Math.sin(angle);
    const filled = i < filledCount;
    return { x, y, filled, key: i, angle };
  });

  return (
    <div className="score-gauge">
      <svg
        viewBox="0 0 180 180"
        className="score-gauge__svg"
        role="img"
        aria-label={`Hire score ${score} out of 100, rated ${tier.label}`}
      >
        {cells.map((cell) => (
          <rect
            key={cell.key}
            x={cell.x - CELL_SIZE / 2}
            y={cell.y - CELL_SIZE / 2}
            width={CELL_SIZE}
            height={CELL_SIZE}
            rx="2"
            transform={`rotate(${(cell.angle * 180) / Math.PI + 90} ${cell.x} ${cell.y})`}
            className={cell.filled ? "score-gauge__cell score-gauge__cell--filled" : "score-gauge__cell"}
            style={cell.filled ? { animationDelay: `${cell.key * 18}ms` } : undefined}
          />
        ))}
        <text x="90" y="86" textAnchor="middle" className="score-gauge__number">
          {score}
        </text>
        <text x="90" y="106" textAnchor="middle" className="score-gauge__max">
          / 100
        </text>
      </svg>
      <p className="score-gauge__tier" style={{ color: tier.color }}>
        {tier.label}
      </p>
    </div>
  );
}

export default ScoreGauge;
