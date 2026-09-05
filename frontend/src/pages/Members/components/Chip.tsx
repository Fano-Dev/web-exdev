import "./Chip.css";

interface ChipProps {
  text: string;
}

const Chip = ({ text }: ChipProps) => {
  return (
    <span className="chip">
      {text}
    </span>
  );
};

export default Chip;