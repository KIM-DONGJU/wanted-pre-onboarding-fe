interface CommonLoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function CommonLoadingSpinner({
  size = 40,
  color = '#00E3F1',
}: CommonLoadingSpinnerProps) {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg className="animate-spin" height={size} style={{ transformOrigin: 'center' }} width={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        fill="none"
        r={radius}
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.3}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
