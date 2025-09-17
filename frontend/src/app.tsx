import { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import {
  MenuBook,
  Favorite,
  CalendarMonth,
  Search as SearchIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import "./app.css";

// Components
import SearchBar from "./components/search-bar";
import PoetryModal from "./components/poetry-modal";
import StoreDebugger from "./components/store-debugger";

// Pages
import HomePage from "./pages/home-page";
import DailyPage from "./pages/daily-page";
import FavoritePage from "./pages/favorite-page";
import SearchResultsPage from "./pages/search-results-page";

// Store
import { useAppStore } from "./store/app-store";
import { poetryActions } from "./store/poetry-actions";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Zustand store state
  const selectedPoetry = useAppStore((state) => state.selectedPoetry);
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const openPoetryModal = useAppStore((state) => state.openPoetryModal);
  const closePoetryModal = useAppStore((state) => state.closePoetryModal);
  const searchLoading = useAppStore((state) => state.isSearchLoading);

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

  const handleSearch = useCallback(
    (query: string) => {
      console.log("App handleSearch called with query:", query);
      poetryActions.searchPoetry({ query });
      navigate("/search");
    },
    [navigate]
  );

  const handlePoetryClick = useCallback(
    (poetry: any) => {
      openPoetryModal(poetry);
    },
    [openPoetryModal]
  );

  const navigateToHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const navigateToDaily = useCallback(() => {
    navigate("/daily");
  }, [navigate]);

  const navigateToFavorite = useCallback(() => {
    navigate("/favorite");
  }, [navigate]);

  const navigateToSearch = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  // Get current path for navigation highlighting
  const currentPath = location.pathname;

  return (
    <Box>
      {/* Navigation */}
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="button"
            onClick={navigateToHome}
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
              onClick={navigateToHome}
              color={
                currentPath === "/home" || currentPath === "/"
                  ? "primary"
                  : "inherit"
              }
              startIcon={<HomeIcon />}
            >
              首页
            </Button>
            <Button
              onClick={navigateToSearch}
              color={currentPath === "/search" ? "primary" : "inherit"}
              startIcon={<SearchIcon />}
            >
              搜索
            </Button>
            <Button
              onClick={navigateToDaily}
              color={currentPath === "/daily" ? "primary" : "inherit"}
              startIcon={<CalendarMonth />}
            >
              每日一诗
            </Button>
            <Button
              onClick={navigateToFavorite}
              color={currentPath === "/favorite" ? "primary" : "inherit"}
              startIcon={<Favorite />}
            >
              收藏
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
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
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={navigateToHome}
                variant={
                  currentPath === "/home" || currentPath === "/"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<MenuBook />}
                size="large"
              >
                浏览全部
              </Button>
              <Button
                onClick={navigateToDaily}
                variant={currentPath === "/daily" ? "contained" : "outlined"}
                startIcon={<CalendarMonth />}
                size="large"
              >
                每日一诗
              </Button>
              <Button
                onClick={navigateToFavorite}
                variant={currentPath === "/favorite" ? "contained" : "outlined"}
                startIcon={<Favorite />}
                size="large"
              >
                我的收藏
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content - Router Pages */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onPoetryClick={handlePoetryClick} />}
          />
          <Route
            path="/home"
            element={<HomePage onPoetryClick={handlePoetryClick} />}
          />
          <Route
            path="/daily"
            element={<DailyPage onPoetryClick={handlePoetryClick} />}
          />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route
            path="/search"
            element={<SearchResultsPage onPoetryClick={handlePoetryClick} />}
          />
        </Routes>
      </Container>

      {/* Statistics */}
      <Box sx={{ py: 6, backgroundColor: "background.paper" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 4,
              textAlign: "center",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                305
              </Typography>
              <Typography color="text.secondary">诗经篇章</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                15
              </Typography>
              <Typography color="text.secondary">国风地区</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                3000+
              </Typography>
              <Typography color="text.secondary">年历史</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ py: 4, backgroundColor: "primary.main", color: "white" }}
      >
        <Container maxWidth="lg">
          <Typography textAlign="center" color="inherit">
            © 2024 诗经雅集 · 传承中华文化，品味古典诗词之美
          </Typography>
        </Container>
      </Box>

      {/* Poetry Modal */}
      <PoetryModal
        poetry={selectedPoetry}
        isOpen={isModalOpen}
        onClose={closePoetryModal}
      />

      {/* Store Debugger (development only) */}
      <StoreDebugger show={true} />
    </Box>
  );
}

export default App;
