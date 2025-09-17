import { useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Alert,
  Chip,
} from '@mui/material';
import {
  MenuBook,
  Favorite,
  CalendarMonth,
  Search as SearchIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import "./app.css";

// Components
import SearchBar from "./components/search-bar";
import PoetryCard from "./components/poetry-card";
import PoetryModal from "./components/poetry-modal";
import LoadingSpinner from "./components/loading-spinner";
import StoreDebugger from "./components/store-debugger";

// Store
import { useAppStore } from "./store/app-store";
import { poetryActions } from "./store/poetry-actions";

function App() {
  // Zustand store state - using individual selectors to avoid reference issues
  const currentView = useAppStore((state) => state.currentView);
  const selectedPoetry = useAppStore((state) => state.selectedPoetry);
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const openPoetryModal = useAppStore((state) => state.openPoetryModal);
  const closePoetryModal = useAppStore((state) => state.closePoetryModal);

  const poetry = useAppStore((state) => state.poetry);
  const poetryLoading = useAppStore((state) => state.isLoading);
  const poetryError = useAppStore((state) => state.error);

  const searchResults = useAppStore((state) => state.searchResults);
  const searchLoading = useAppStore((state) => state.isSearchLoading);
  const hasSearched = useAppStore((state) => state.hasSearched);

  const dailyPoetry = useAppStore((state) => state.dailyPoetry);
  const dailyLoading = useAppStore((state) => state.isDailyLoading);

  // Load initial data on mount
  useEffect(() => {
    console.log("App useEffect - loading initial data");
    const loadData = async () => {
      try {
        await Promise.all([
          poetryActions.loadPoetry(8),
          poetryActions.loadDailyPoetry(),
        ]);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };

    loadData();
  }, []);

  const handleSearch = useCallback((query: string) => {
    console.log("App handleSearch called with query:", query);
    poetryActions.searchPoetry({ query });
  }, []);

  const handlePoetryClick = useCallback(
    (poetry: any) => {
      openPoetryModal(poetry);
    },
    [openPoetryModal]
  );

  const showDailyPoetry = useCallback(() => {
    poetryActions.navigateToDaily();
  }, []);

  const showHome = useCallback(() => {
    poetryActions.navigateToHome();
  }, []);

  const showSearch = useCallback(() => {
    poetryActions.navigateToSearch();
  }, []);

  const getCategoryFromChapter = (
    chapter: string | undefined
  ): "風" | "雅" | "頌" => {
    if (!chapter) return "風"; // Default category if chapter is undefined
    if (chapter.includes("風")) return "風";
    if (chapter.includes("雅")) return "雅";
    if (chapter.includes("頌")) return "頌";
    return "風";
  };

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="button"
            onClick={showHome}
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              textAlign: "left",
            }}
          >
            诗经雅集
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={showHome}
              color={currentView === "home" ? "primary" : "inherit"}
              startIcon={<HomeIcon />}
            >
              首页
            </Button>
            <Button
              onClick={showSearch}
              color={currentView === "search" ? "primary" : "inherit"}
              startIcon={<SearchIcon />}
            >
              搜索
            </Button>
            <Button
              onClick={showDailyPoetry}
              color={currentView === "daily" ? "primary" : "inherit"}
              startIcon={<CalendarMonth />}
            >
              每日一诗
            </Button>
            <Button
              color="inherit"
              startIcon={<Favorite />}
            >
              收藏
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              诗经雅集
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              探索中华古典诗词之美，品味千年文化底蕴
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
              <SearchBar onSearch={handleSearch} loading={searchLoading} />
            </Box>

            {/* Quick Actions */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                onClick={showHome} 
                variant="outlined" 
                startIcon={<MenuBook />}
                size="large"
              >
                浏览全部
              </Button>
              <Button 
                onClick={showDailyPoetry} 
                variant="contained" 
                startIcon={<CalendarMonth />}
                size="large"
              >
                每日一诗
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Favorite />}
                size="large"
              >
                我的收藏
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Home View */}
          {currentView === "home" && (
            <Box>
              <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
                精选诗词
              </Typography>

              {poetryLoading ? (
                <LoadingSpinner message="载入诗词中..." />
              ) : poetryError ? (
                <Box textAlign="center" sx={{ py: 8 }}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    载入失败: {poetryError}
                  </Alert>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="contained"
                  >
                    重新载入
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {poetry.map((poem) => (
                    <Grid item xs={12} sm={6} md={6} key={poem.id}>
                      <PoetryCard
                        id={poem.id}
                        title={poem.title}
                        content={poem.content}
                        chapter={poem.chapter}
                        section={poem.section}
                        category={getCategoryFromChapter(poem.chapter)}
                        onClick={() => handlePoetryClick(poem)}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}

          {/* Search Results */}
          {currentView === "search" && (
            <>
              <h2 className="title-medium chinese-text text-center mb-lg">
                搜索结果
              </h2>

              {searchLoading ? (
                <LoadingSpinner message="搜索中..." />
              ) : hasSearched ? (
                searchResults.length > 0 ? (
                  <div className="grid grid-2">
                    {searchResults.map((poem: any) => (
                      <PoetryCard
                        key={poem.id}
                        id={poem.id}
                        title={poem.title}
                        content={poem.content}
                        chapter={poem.chapter}
                        section={poem.section}
                        category={getCategoryFromChapter(poem.chapter)}
                        onClick={() => handlePoetryClick(poem)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted chinese-text">未找到相关诗词</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted chinese-text">
                    请输入关键词搜索诗词
                  </p>
                </div>
              )}
            </>
          )}

          {/* Daily Poetry */}
          {currentView === "daily" && (
            <>
              <h2 className="title-medium chinese-text text-center mb-lg">
                每日一诗
              </h2>

              {dailyLoading ? (
                <LoadingSpinner message="载入每日诗词..." />
              ) : dailyPoetry ? (
                <div className="container-narrow">
                  <PoetryCard
                    id={dailyPoetry.id}
                    title={dailyPoetry.title}
                    content={dailyPoetry.content}
                    chapter={dailyPoetry.chapter}
                    section={dailyPoetry.section}
                    category={getCategoryFromChapter(dailyPoetry.chapter)}
                    onClick={() => handlePoetryClick(dailyPoetry)}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted chinese-text">暂无每日诗词</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="stats py-lg">
        <div className="container">
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="stat-number title-medium text-accent">305</div>
              <div className="stat-label chinese-text">诗经篇章</div>
            </div>
            <div className="card text-center">
              <div className="stat-number title-medium text-accent">15</div>
              <div className="stat-label chinese-text">国风地区</div>
            </div>
            <div className="card text-center">
              <div className="stat-number title-medium text-accent">3000+</div>
              <div className="stat-label chinese-text">年历史</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-lg">
        <div className="container text-center">
          <div className="chinese-text text-muted">
            © 2024 诗经雅集 · 传承中华文化，品味古典诗词之美
          </div>
        </div>
      </footer>

      {/* Poetry Modal */}
      <PoetryModal
        poetry={selectedPoetry}
        isOpen={isModalOpen}
        onClose={closePoetryModal}
      />

      {/* Store Debugger (development only) */}
      <StoreDebugger show={true} />
    </div>
  );
}

export default App;
