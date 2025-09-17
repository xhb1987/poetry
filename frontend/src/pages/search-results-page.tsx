import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";

interface SearchResultsPageProps {
  onPoetryClick: (poetry: any) => void;
}

const SearchResultsPage = ({ onPoetryClick }: SearchResultsPageProps) => {
  const searchResults = useAppStore((state) => state.searchResults);
  const searchLoading = useAppStore((state) => state.isSearchLoading);
  const hasSearched = useAppStore((state) => state.hasSearched);

  const getCategoryFromChapter = useCallback((
    chapter: string | undefined
  ): "风" | "雅" | "颂" => {
    if (!chapter) return "风";
    if (chapter.includes("風") || chapter.includes("风")) return "风";
    if (chapter.includes("雅")) return "雅";
    if (chapter.includes("頌") || chapter.includes("颂")) return "颂";
    return "风";
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
        搜索结果
      </Typography>

      {searchLoading ? (
        <LoadingSpinner message="搜索中..." />
      ) : hasSearched ? (
        searchResults.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 3,
            }}
          >
            {searchResults.map((poem: any) => (
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
        ) : (
          <Box textAlign="center" sx={{ py: 8 }}>
            <Typography color="text.secondary">未找到相关诗词</Typography>
          </Box>
        )
      ) : (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">
            请输入关键词搜索诗词
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchResultsPage;