import { useRef } from "react";
import { useCitySuggest } from "./UseCitySuggest";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
};

export default function CitySearch({ value, onChange, onSubmit }: Props) {
  const { setQuery, items, open, setOpen, highlight, onKeyDown } = useCitySuggest();
  const wrapRef = useRef<HTMLDivElement>(null);

  function handleInput(v: string) {
    onChange(v);
    setQuery(v);
    setOpen(true);
  }

  function selectCity(v: string) {
    onChange(v);
    setQuery(v);
    setOpen(false);
    onSubmit();
  }

  return (
    <div className="relative flex gap-2" ref={wrapRef}>
      <input
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => onKeyDown(e, selectCity)}
        onFocus={() => setOpen(items.length > 0)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="Entrez une ville"
        className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 focus:border-[#596A95] border-[#2B3040]"
      />
      <button
        type="button"
        onClick={onSubmit}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Rechercher
      </button>

      {open && items.length > 0 && (
        <ul className="absolute left-0 top-full mt-1 w-[280px] max-h-56 overflow-auto
                       bg-[#131722] text-white border border-[#2B3040] rounded-lg shadow z-50">
          {items.map((it, idx) => (
            <li
              key={it.label + idx}
              onMouseDown={(e) => { e.preventDefault(); selectCity(it.value); }}
              className={`px-3 py-2 cursor-pointer ${idx === highlight ? "bg-[#2B3040]" : "hover:bg-[#1c2230]"}`}
            >
              {it.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
