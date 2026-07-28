import { useState, useCallback, useEffect, useRef } from "react";
import {
  STORAGE_KEY,
  DEFAULT_FORM,
  TEMPLATES,
} from "../components/resume-builder/constants";
import { generateAIContent } from "../components/resume-builder/generateAIContent";

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      selectedTpl: parsed.selectedTpl ?? "ats-pro",
      favourites: new Set(Array.isArray(parsed.favourites) ? parsed.favourites : []),
      form: { ...DEFAULT_FORM, ...(parsed.form ?? {}) },
      editorTab: parsed.editorTab ?? "personal",
      aiCompany: parsed.aiCompany ?? "Google",
      aiPanelOpen: parsed.aiPanelOpen ?? true,
    };
  } catch {
    return null;
  }
}

export function useResumeBuilder() {
  const persisted = useRef(loadPersistedState()).current;

  const [selectedTpl, setSelectedTpl] = useState(persisted?.selectedTpl ?? "ats-pro");
  const [favourites, setFavourites] = useState(persisted?.favourites ?? new Set());
  const [form, setForm] = useState(persisted?.form ?? DEFAULT_FORM);
  const [editorTab, setEditorTab] = useState(persisted?.editorTab ?? "personal");

  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiCompany, setAiCompany] = useState(persisted?.aiCompany ?? "Google");
  const [aiPanelOpen, setAiPanelOpen] = useState(persisted?.aiPanelOpen ?? true);
  const [activeFeature, setActiveFeature] = useState(null);

  const aiTimerRef = useRef(null);

  const template =
    TEMPLATES.find((t) => t.id === selectedTpl) ?? TEMPLATES[0];

  /* Persist draft to localStorage (debounced) */
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedTpl,
          favourites: [...favourites],
          form,
          editorTab,
          aiCompany,
          aiPanelOpen,
        }),
      );
    }, 400);
    return () => clearTimeout(id);
  }, [selectedTpl, favourites, form, editorTab, aiCompany, aiPanelOpen]);

  useEffect(
    () => () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    },
    [],
  );

  const setField = useCallback((key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
  }, []);

  const applyToForm = useCallback(
    (text, section) => {
      if (section && form[section] !== undefined) {
        setField(section, text);
      }
    },
    [form, setField],
  );

  const runAI = useCallback(
    (featureId, section) => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

      setActiveFeature(featureId);
      setAiLoading(true);
      setAiSuggestions([]);

      aiTimerRef.current = setTimeout(() => {
        const content = generateAIContent(featureId, form, aiCompany);
        const lines = content.split("\n").filter(Boolean);
        setAiSuggestions(lines.map((text) => ({ text, section })));
        setAiLoading(false);
      }, 900);
    },
    [form, aiCompany],
  );

  const clearSuggestions = useCallback(() => setAiSuggestions([]), []);

  const toggleFavourite = useCallback((id) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return {
    template,
    selectedTpl,
    setSelectedTpl,
    favourites,
    toggleFavourite,
    form,
    setField,
    editorTab,
    setEditorTab,
    aiLoading,
    aiSuggestions,
    aiCompany,
    setAiCompany,
    aiPanelOpen,
    setAiPanelOpen,
    activeFeature,
    applyToForm,
    runAI,
    clearSuggestions,
  };
}
