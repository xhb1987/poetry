import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Poetry } from "../services/api";

interface PoetryModalProps {
  poetry: Poetry | null;
  isOpen: boolean;
  onClose: () => void;
}

const PoetryModal: React.FC<PoetryModalProps> = ({
  poetry,
  isOpen,
  onClose,
}) => {
  if (!poetry) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: 400,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {poetry.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          诗经 · {poetry.chapter || "未知章节"} · {poetry.section || "未知篇目"}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.4rem",
              lineHeight: 2.5,
              whiteSpace: "pre-line",
              fontWeight: 400,
              letterSpacing: "0.05em",
              color: "text.primary",
            }}
          >
            {poetry.content || "内容暂缺"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PoetryModal;
