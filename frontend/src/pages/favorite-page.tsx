import { Box, Container, Typography, Button } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

const FavoritePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        我的收藏
      </Typography>
      
      <Box textAlign="center" sx={{ py: 8 }}>
        <FavoriteIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          暂无收藏的诗词
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          收藏你喜欢的诗词，方便随时回顾
        </Typography>
        <Button variant="contained" size="large">
          开始浏览
        </Button>
      </Box>
    </Container>
  );
};

export default FavoritePage;