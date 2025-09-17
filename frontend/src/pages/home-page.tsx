import { Box, Typography, Alert, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";
import { poetryActions } from "../store/poetry-actions";
import { getDisplayCategory } from "../types/poetry";

interface HomePageProps {
  onPoetryClick: (poetry: any) => void;
}

const HomePage = ({ onPoetryClick }: HomePageProps) => {
  const poetry = useAppStore((state) => state.poetry);
  const poetryLoading = useAppStore((state) => state.isLoading);
  const poetryError = useAppStore((state) => state.error);
  const hasLoadedPoetry = useAppStore((state) => state.hasLoadedPoetry);
  const selectedCategory = useAppStore((state) => state.selectedCategory);

  // Load poetry when component mounts or category changes
  useEffect(() => {
    console.log("HomePage useEffect - checking poetry data", {
      hasLoadedPoetry,
      poetryLoading,
      poetryLength: poetry.length,
      selectedCategory,
    });

    // Only load if we haven't loaded poetry before AND we're not currently loading
    if (!hasLoadedPoetry && !poetryLoading) {
      console.log("HomePage - loading poetry for category:", selectedCategory);
      poetryActions.loadPoetry(8);
    }
  }, [hasLoadedPoetry, poetryLoading, selectedCategory]);

  const getCategoryFromPoetry = useCallback((poetry: any) => {
    return getDisplayCategory(poetry);
  }, []);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "shijing":
        return "诗经";
      case "song_ci":
        return "宋词";
      case "all":
      case "":
        return "全部";
      default:
        return category;
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        精选诗词
        {selectedCategory &&
          selectedCategory !== "all" &&
          ` · ${getCategoryLabel(selectedCategory)}`}
      </Typography>

      {poetryLoading ? (
        <LoadingSpinner message="载入诗词中..." />
      ) : poetryError ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            载入失败: {poetryError}
          </Alert>
          <Button onClick={() => window.location.reload()} variant="contained">
            重新载入
          </Button>
        </Box>
      ) : poetry.length === 0 && hasLoadedPoetry ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            当前分类暂无诗词
          </Typography>
          <Typography color="text.secondary">
            请尝试选择其他分类或查看全部诗词
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: 3,
          }}
        >
          {poetry.map((poem) => (
            <PoetryCard
              key={poem.id}
              id={parseInt(poem.id)}
              title={poem.title || ""}
              content={poem.content}
              chapter={poem.chapter || undefined}
              section={poem.section || undefined}
              category={getCategoryFromPoetry(poem)}
              poetryCategory={poem.category || undefined}
              rhythmic={poem.rhythmic || undefined}
              onClick={() => onPoetryClick(poem)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
