import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import PoetryCard from "../components/poetry-card";
import LoadingSpinner from "../components/loading-spinner";
import { useAppStore } from "../store/app-store";
import { getDisplayCategory } from "../types/poetry";

interface SearchResultsPageProps {
  onPoetryClick: (poetry: any) => void;
}

const SearchResultsPage = ({ onPoetryClick }: SearchResultsPageProps) => {
  const searchResults = useAppStore((state) => state.searchResults);
  const searchLoading = useAppStore((state) => state.isSearchLoading);
  const hasSearched = useAppStore((state) => state.hasSearched);
  const selectedCategory = useAppStore((state) => state.selectedCategory);

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
        搜索结果
        {selectedCategory &&
          selectedCategory !== "all" &&
          ` · ${getCategoryLabel(selectedCategory)}`}
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
        ) : (
          <Box textAlign="center" sx={{ py: 8 }}>
            <Typography color="text.secondary">未找到相关诗词</Typography>
          </Box>
        )
      ) : (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">请输入关键词搜索诗词</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchResultsPage;
