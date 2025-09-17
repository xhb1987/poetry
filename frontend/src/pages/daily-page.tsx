import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";
import { poetryActions } from "../store/poetry-actions";
import { getDisplayCategory } from "../types/poetry";

interface DailyPageProps {
  onPoetryClick: (poetry: any) => void;
}

const DailyPage = ({ onPoetryClick }: DailyPageProps) => {
  const dailyPoetry = useAppStore((state) => state.dailyPoetry);
  const dailyLoading = useAppStore((state) => state.isDailyLoading);
  const dailyError = useAppStore((state) => state.dailyError);
  const hasLoadedDaily = useAppStore((state) => state.hasLoadedDaily);

  // Debug logging
  console.log("DailyPage render:", {
    dailyPoetry,
    dailyLoading,
    dailyError,
    hasLoadedDaily,
  });

  // Load daily poetry when component mounts - only if we haven't loaded before
  useEffect(() => {
    console.log("DailyPage useEffect - checking daily poetry", {
      hasLoadedDaily,
      dailyLoading,
    });

    if (!hasLoadedDaily && !dailyLoading) {
      console.log("DailyPage - loading daily poetry for the first time");
      poetryActions.loadDailyPoetry();
    }
  }, [hasLoadedDaily, dailyLoading]);

  const getCategoryFromPoetry = useCallback((poetry: any) => {
    return getDisplayCategory(poetry);
  }, []);

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
            id={parseInt(dailyPoetry.id)}
            title={dailyPoetry.title || ""}
            content={dailyPoetry.content}
            chapter={dailyPoetry.chapter || undefined}
            section={dailyPoetry.section || undefined}
            category={getCategoryFromPoetry(dailyPoetry)}
            poetryCategory={dailyPoetry.category || undefined}
            rhythmic={dailyPoetry.rhythmic || undefined}
            onClick={() => onPoetryClick(dailyPoetry)}
          />
        </Box>
      ) : hasLoadedDaily ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">暂无每日诗词</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default DailyPage;
