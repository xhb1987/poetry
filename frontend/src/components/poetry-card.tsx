interface PoetryCardProps {
  id: number;
  title: string;
  content: string | undefined;
  chapter: string | undefined;
  section: string | undefined;
  category: "風" | "雅" | "頌";
  onClick?: () => void;
}

const PoetryCard: React.FC<PoetryCardProps> = ({
  title,
  content,
  chapter,
  section,
  category,
  onClick,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "風":
        return "text-accent";
      case "雅":
        return "text-red";
      case "頌":
        return "text-bamboo";
      default:
        return "text-accent";
    }
  };

  return (
    <div className="card card-poetry" onClick={onClick}>
      <div className="poetry-meta mb-sm">
        <span className={`chinese-text ${getCategoryColor(category)}`}>
          {category}
        </span>
        <span className="text-muted"> · </span>
        <span className="text-muted chinese-text">{title}</span>
      </div>
      <div className="poetry-content chinese-text">
        {content ? (
          <>
            {content.split("\n").slice(0, 2).join("\n")}
            {content.split("\n").length > 2 && "..."}
          </>
        ) : (
          "內容暫缺"
        )}
      </div>
      <div className="poetry-footer text-muted text-sm">
        詩經 · {chapter || "未知章節"} · {section || "未知篇目"}
      </div>
    </div>
  );
};

export default PoetryCard;
