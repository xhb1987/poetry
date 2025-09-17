import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Box,
} from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";

export interface PoetryCategory {
  value: string;
  label: string;
  description: string;
}

interface CategorySelectorProps {
  categories: PoetryCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  showAllOption?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  loading = false,
  variant = "outlined",
  size = "medium",
  showAllOption = true,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCategoryChange(event.target.value);
  };

  const getCategoryDisplayName = (categoryValue: string) => {
    if (categoryValue === "all") return "全部分类";

    const categoryMap: Record<string, string> = {
      shijing: "诗经",
      song_ci: "宋词",
    };

    return categoryMap[categoryValue] || categoryValue;
  };

  const getCategoryIcon = (categoryValue: string) => {
    const iconMap: Record<string, string> = {
      shijing: "📜",
      song_ci: "🎵",
      all: "📚",
    };

    return iconMap[categoryValue] || "📖";
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant={variant} size={size} fullWidth disabled={loading}>
        <InputLabel id="category-selector-label">
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CategoryIcon fontSize="small" />
            诗词分类
          </Box>
        </InputLabel>
        <Select
          labelId="category-selector-label"
          value={selectedCategory}
          onChange={handleChange}
          label="诗词分类"
        >
          {showAllOption && (
            <MenuItem value="all">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{getCategoryIcon("all")}</span>
                <span>全部分类</span>
                <Chip label="全部" size="small" variant="outlined" />
              </Box>
            </MenuItem>
          )}
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>{getCategoryIcon(category.value)}</span>
                <span>{getCategoryDisplayName(category.value)}</span>
                <Chip
                  label={category.label}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelector;
