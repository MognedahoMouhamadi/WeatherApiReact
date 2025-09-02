import { useEffect, useRef, useState } from "react";
import axios from "axios";

type Item = { label: string; value: string };

export function useCitySuggest() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      if (!query.trim() || query.length < 3) {
        setItems([]); setOpen(false); return;
      }
      try {
        const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
          params: { q: query, limit: 5, appid: import.meta.env.VITE_API_KEY }
        });
        const mapped: Item[] = (res.data ?? []).map((r: any) => ({
          label: `${r.name}${r.state ? ", " + r.state : ""} (${r.country})`,
          value: r.name,
        }));
        setItems(mapped);
        setOpen(mapped.length > 0);
        setHighlight(-1);
      } catch {
        setItems([]); setOpen(false);
      }
    }, 300);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [query]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, onSelect:(v:string)=>void) {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlight(h => Math.min(h + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
    else if (e.key === "Enter" && highlight >= 0) { e.preventDefault(); onSelect(items[highlight].value); setOpen(false); }
    else if (e.key === "Escape") { setOpen(false); }
  }

  return { setQuery, items, open, setOpen, highlight, onKeyDown };
}
