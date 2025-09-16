import React from "react";
import { X } from "lucide-react";

interface PoetryModalProps {
  poetry: {
    id: number;
    title: string;
    content: string | undefined;
    chapter: string | undefined;
    section: string | undefined;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const PoetryModal: React.FC<PoetryModalProps> = ({
  poetry,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !poetry) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "var(--color-paper)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-xl)",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          position: "relative",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "var(--spacing-md)",
            right: "var(--spacing-md)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-gray-medium)",
            padding: "var(--spacing-xs)",
          }}
        >
          <X size={24} />
        </button>

        <div className="poetry-modal-header mb-lg">
          <h2 className="title-medium chinese-text mb-sm">{poetry.title}</h2>
          <div className="text-muted chinese-text">
            詩經 · {poetry.chapter || "未知章節"} ·{" "}
            {poetry.section || "未知篇目"}
          </div>
        </div>

        <div className="poetry-modal-content">
          <div
            className="poetry-content chinese-text"
            style={{
              fontSize: "1.3rem",
              lineHeight: "2.5",
              textAlign: "center",
              whiteSpace: "pre-line",
              margin: "var(--spacing-lg) 0",
            }}
          >
            {poetry.content || "內容暫缺"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetryModal;
