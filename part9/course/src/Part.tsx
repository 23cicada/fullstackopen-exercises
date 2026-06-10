import type { CoursePart } from "./types";

interface PartProps {
  part: CoursePart;
}
const Part = ({ part }: PartProps) => {

  const renderExtra = () => {
    const { kind } = part
    switch (kind) {
      case "basic":
        return <div><i>{part.description}</i></div>;
      case "group":
        return <div>project exercises{part.groupProjectCount}</div>;
      case "background":
        return (
          <>
            <div><i>{part.description}</i></div>
            <div>submit to {part.backgroundMaterial}</div>
          </>
        )
      case "special":
        return (
          <>
            <div><i>{part.description}</i></div>
            <div>required skills: {part.requirements.join(", ")}</div>
          </>
        )
      default: {
        const _exhaustiveCheck: never = kind;
        return _exhaustiveCheck;
      }
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <b>{part.name} {part.exerciseCount}</b>
      {renderExtra()}
    </div>
  )
}

export default Part;
