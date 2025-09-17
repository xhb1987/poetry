import { Box, Typography, Alert, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";
import { poetryActions } from "../store/poetry-actions";

interface HomePageProps {
  onPoetryClick: (poetry: any) => void;
}

const HomePage = ({ onPoetryClick }: HomePageProps) => {
  const poetry = useAppStore((state) => state.poetry);
  const poetryLoading = useAppStore((state) => state.isLoading);
  const poetryError = useAppStore((state) => state.error);

  // Load poetry when component mounts
  useEffect(() => {
    console.log("HomePage useEffect - checking poetry data");
    if (poetry.length === 0 && !poetryLoading) {
      console.log("HomePage - loading poetry");
      poetryActions.loadPoetry(8);
    }
  }, [poetry.length, poetryLoading]);

  const getCategoryFromChapter = useCallback(
    (chapter: string | undefined): "风" | "雅" | "颂" => {
      if (!chapter) return "风";
      if (chapter.includes("風") || chapter.includes("风")) return "风";
      if (chapter.includes("雅")) return "雅";
      if (chapter.includes("頌") || chapter.includes("颂")) return "颂";
      return "风";
    },
    []
  );

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
              id={poem.id}
              title={poem.title}
              content={poem.content}
              chapter={poem.chapter}
              section={poem.section}
              category={getCategoryFromChapter(poem.chapter)}
              onClick={() => onPoetryClick(poem)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
