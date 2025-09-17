import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";
import { poetryActions } from "../store/poetry-actions";

interface DailyPageProps {
  onPoetryClick: (poetry: any) => void;
}

const DailyPage = ({ onPoetryClick }: DailyPageProps) => {
  const dailyPoetry = useAppStore((state) => state.dailyPoetry);
  const dailyLoading = useAppStore((state) => state.isDailyLoading);
  const dailyError = useAppStore((state) => state.dailyError);

  // Debug logging
  console.log("DailyPage render:", { dailyPoetry, dailyLoading, dailyError });

  // Load daily poetry when component mounts
  useEffect(() => {
    console.log("DailyPage useEffect - loading daily poetry");
    if (!dailyPoetry && !dailyLoading) {
      poetryActions.loadDailyPoetry();
    }
  }, [dailyPoetry, dailyLoading]);

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
        每日一诗
      </Typography>

      {dailyLoading ? (
        <LoadingSpinner message="载入每日诗词..." />
      ) : dailyError ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography color="error" sx={{ mb: 2 }}>
            载入失败: {dailyError}
          </Typography>
          <Typography color="text.secondary">请刷新页面重试</Typography>
        </Box>
      ) : dailyPoetry ? (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
          <PoetryCard
            id={dailyPoetry.id}
            title={dailyPoetry.title}
            content={dailyPoetry.content}
            chapter={dailyPoetry.chapter}
            section={dailyPoetry.section}
            category={getCategoryFromChapter(dailyPoetry.chapter)}
            onClick={() => onPoetryClick(dailyPoetry)}
          />
        </Box>
      ) : (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">暂无每日诗词</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DailyPage;
