"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Paper,
  IconButton,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null); // null means use default CSS positioning
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        setHasDragged(true);
        // Sınırları kontrol et
        const newX = Math.min(
          Math.max(0, e.clientX - dragOffset.x),
          window.innerWidth - 60,
        );
        const newY = Math.min(
          Math.max(0, e.clientY - dragOffset.y),
          window.innerHeight - 60,
        );
        setPos({ x: newX, y: newY });
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, dragOffset]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setHasDragged(false);
    if (!pos) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    } else {
      setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    }
  };

  const handleIconClick = () => {
    // Sürükleme yapıldıysa (tıklama değilse) açma
    if (!hasDragged) {
      setOpen(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { text: `⚠️ ${data.error}`, sender: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Üzgünüm, sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <Tooltip title="Canlı Destek" placement="left">
        <Box
          onMouseDown={handleMouseDown}
          onClick={handleIconClick}
          sx={{
            position: "fixed",
            left: pos ? pos.x : "auto",
            top: pos ? pos.y : "auto",
            right: pos ? "auto" : { xs: 16, md: 24 },
            bottom: pos ? "auto" : { xs: 92, md: 104 }, // WhatsApp'ın üzerinde
            width: { xs: 52, md: 56 },
            height: { xs: 52, md: 56 },
            bgcolor: "primary.main",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: dragging ? "grabbing" : "pointer",
            boxShadow: "0 4px 12px rgba(124, 158, 135, 0.4)",
            zIndex: 1200,
            "&:hover": {
              bgcolor: "primary.dark",
              transform: dragging ? "none" : "scale(1.05)",
            },
            transition: dragging
              ? "none"
              : "transform 0.3s, background-color 0.3s",
            color: "white",
          }}
        >
          <ChatIcon sx={{ fontSize: { xs: 26, md: 28 } }} />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        width: { xs: "calc(100vw - 32px)", sm: 380 }, // Mobilde tam genişlik, masaüstünde 380px
        height: { xs: "calc(100vh - 32px)", sm: 600 }, // Mobilde tam yükseklik
        maxHeight: "85vh", // Hiçbir zaman ekranı tamamen kaplamasın
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 3, sm: 4 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SmartToyIcon />
          <Box
            sx={{ fontWeight: 600, fontFamily: '"Playfair Display", serif' }}
          >
            Asistan
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{ flex: 1, p: 2, overflow: "auto", bgcolor: "background.default" }}
      >
        {messages.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 4,
              fontSize: "0.9rem",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Merhaba! Ben asistan. Size nasıl yardımcı olabilirim?
          </Box>
        )}
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              mb: 1.5,
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                borderTopRightRadius: msg.sender === "user" ? 0 : 3,
                borderTopLeftRadius: msg.sender === "bot" ? 0 : 3,
                bgcolor: msg.sender === "user" ? "primary.main" : "white",
                color: msg.sender === "user" ? "white" : "text.primary",
                maxWidth: "85%",
                boxShadow: "0 2px 8px rgba(124, 158, 135, 0.08)",
                fontSize: "0.95rem",
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1.5,
                "& p": { margin: 0 },
                "& a": {
                  color: msg.sender === "user" ? "white" : "primary.main",
                  textDecoration: "underline",
                  fontWeight: 600,
                },
              }}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1.5 }}>
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 3,
                borderTopLeftRadius: 0,
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(124, 158, 135, 0.08)",
              }}
            >
              <CircularProgress size={16} sx={{ color: "primary.main" }} />
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Mesajınızı yazın..."
            variant="outlined"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "background.default",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "primary.light" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "50%",
              width: 40,
              height: 40,
              "&:hover": { bgcolor: "primary.dark" },
              "&.Mui-disabled": {
                bgcolor: "rgba(124, 158, 135, 0.3)",
                color: "white",
              },
            }}
          >
            <SendIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
