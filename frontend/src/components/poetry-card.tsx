import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { DisplayCategory } from "../types/poetry";

interface PoetryCardProps {
  id: number;
  title: string;
  content: string | undefined;
  chapter: string | undefined;
  section: string | undefined;
  category: DisplayCategory;
  poetryCategory?: string; // Main category from database
  rhythmic?: string; // For Song Ci
  onClick?: () => void;
}

const PoetryCard: React.FC<PoetryCardProps> = ({
  title,
  content,
  chapter,
  section,
  category,
  poetryCategory,
  rhythmic,
  onClick,
}) => {
  const getCategoryColor = (cat: string): "primary" | "secondary" | "error" => {
    switch (cat) {
      case "风":
        return "primary";
      case "雅":
        return "secondary";
      case "颂":
        return "error";
      default:
        return "primary";
    }
  };

  const formatContent = (text: string | undefined) => {
    if (!text) return "内容暂缺";
    const lines = text.split("\n");
    const preview = lines.slice(0, 2).join("\n");
    return lines.length > 2 ? `${preview}...` : preview;
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Category and Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Chip
            label={category}
            color={getCategoryColor(category)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Typography variant="body2" color="text.secondary">
            ·
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Box>

        {/* Poetry Content */}
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            lineHeight: 2,
            fontSize: "1.1rem",
            textAlign: "center",
            whiteSpace: "pre-line",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {formatContent(content)}
        </Typography>

        {/* Footer */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            textAlign: "center",
            borderTop: 1,
            borderColor: "divider",
            pt: 1,
            mt: 2,
          }}
        >
          {poetryCategory === "shijing"
            ? `诗经 · ${chapter || "未知章节"} · ${section || "未知篇目"}`
            : poetryCategory === "song_ci"
            ? `宋词 · ${rhythmic || "未知词牌"}`
            : `古典诗词 · ${chapter || "未知来源"}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PoetryCard;
