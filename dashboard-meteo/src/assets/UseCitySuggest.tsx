import { useEffect, useRef, useState } from "react";
import { geoSuggest } from "./geocoding";

export function useCitySuggest() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Array<{label:string; value:string}>>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    // debounce 300ms
    timer.current = window.setTimeout(async () => {
      if (!query.trim()) {
        setItems([]); setOpen(false); return;
      }
      try {
        const results = await geoSuggest(query);
        const mapped = results.map(r => ({
          label: `${r.name}${r.state ? ", " + r.state : ""} (${r.country})`,
          value: r.name
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

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, onSelect:(val:string)=>void) {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault(); setHighlight(h => Math.min(h + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (highlight >= 0) {
        e.preventDefault(); onSelect(items[highlight].value); setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return { query, setQuery, items, open, setOpen, highlight, onKeyDown };
}
