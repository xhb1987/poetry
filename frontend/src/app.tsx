import { useEffect, useCallback } from "react";
import { BookOpen, Heart, Calendar } from "lucide-react";
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
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <button
              onClick={showHome}
              className="logo chinese-text"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              詩經雅集
            </button>
            <ul className="nav-links">
              <li>
                <button
                  onClick={showHome}
                  className={`nav-link ${
                    currentView === "home" ? "text-accent" : ""
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  首頁
                </button>
              </li>
              <li>
                <button
                  onClick={showSearch}
                  className={`nav-link ${
                    currentView === "search" ? "text-accent" : ""
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  搜索
                </button>
              </li>
              <li>
                <button
                  onClick={showDailyPoetry}
                  className={`nav-link ${
                    currentView === "daily" ? "text-accent" : ""
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  每日一詩
                </button>
              </li>
              <li>
                <a href="#" className="nav-link">
                  收藏
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero py-xl">
        <div className="container-narrow text-center">
          <h1 className="title-large chinese-text mb-md">詩經雅集</h1>
          <p className="text-muted mb-lg chinese-text">
            探索中華古典詩詞之美，品味千年文化底蘊
          </p>

          {/* Search Bar */}
          <div className="mb-lg">
            <SearchBar onSearch={handleSearch} loading={searchLoading} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button onClick={showHome} className="btn btn-secondary">
              <BookOpen size={18} />
              瀏覽全部
            </button>
            <button onClick={showDailyPoetry} className="btn btn-accent">
              <Calendar size={18} />
              每日一詩
            </button>
            <button className="btn btn-secondary">
              <Heart size={18} />
              我的收藏
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content py-lg">
        <div className="container">
          {/* Home View */}
          {currentView === "home" && (
            <>
              <h2 className="title-medium chinese-text text-center mb-lg">
                精選詩詞
              </h2>

              {poetryLoading ? (
                <LoadingSpinner message="載入詩詞中..." />
              ) : poetryError ? (
                <div className="text-center py-8">
                  <p className="text-red chinese-text mb-4">
                    載入失敗: {poetryError}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                  >
                    重新載入
                  </button>
                </div>
              ) : (
                <div className="grid grid-2">
                  {poetry.map((poem) => (
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
              )}
            </>
          )}

          {/* Search Results */}
          {currentView === "search" && (
            <>
              <h2 className="title-medium chinese-text text-center mb-lg">
                搜索結果
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
                    <p className="text-muted chinese-text">未找到相關詩詞</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted chinese-text">
                    請輸入關鍵詞搜索詩詞
                  </p>
                </div>
              )}
            </>
          )}

          {/* Daily Poetry */}
          {currentView === "daily" && (
            <>
              <h2 className="title-medium chinese-text text-center mb-lg">
                每日一詩
              </h2>

              {dailyLoading ? (
                <LoadingSpinner message="載入每日詩詞..." />
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
                  <p className="text-muted chinese-text">暫無每日詩詞</p>
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
              <div className="stat-label chinese-text">詩經篇章</div>
            </div>
            <div className="card text-center">
              <div className="stat-number title-medium text-accent">15</div>
              <div className="stat-label chinese-text">國風地區</div>
            </div>
            <div className="card text-center">
              <div className="stat-number title-medium text-accent">3000+</div>
              <div className="stat-label chinese-text">年歷史</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-lg">
        <div className="container text-center">
          <div className="chinese-text text-muted">
            © 2024 詩經雅集 · 傳承中華文化，品味古典詩詞之美
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
