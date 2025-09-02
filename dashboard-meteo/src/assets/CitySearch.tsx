import { useRef } from "react";
import { useCitySuggest } from "./useCitySuggest";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void; // lance la recherche météo
}

export default function CitySearch({ value, onChange, onSubmit }: Props) {
  const { query, setQuery, items, open, setOpen, highlight, onKeyDown } = useCitySuggest();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Synchronise l’input avec l’état parent
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
    <div className="relative" ref={wrapperRef}>
      <input
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => onKeyDown(e, selectCity)}
        onBlur={() => setTimeout(() => setOpen(false), 120)} // laisse le temps au click
        placeholder="Entrez une ville"
        className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
      />
      <button
        onClick={onSubmit}
        className="ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Rechercher
      </button>

      {open && items.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full max-w-[280px] bg-[#131722] text-white border border-[#2B3040] rounded-lg shadow overflow-hidden">
          {items.map((it, idx) => (
            <li
              key={it.label + idx}
              onMouseDown={(e) => { e.preventDefault(); selectCity(it.value); }}
              className={`px-3 py-2 cursor-pointer ${
                idx === highlight ? "bg-[#2B3040]" : "hover:bg-[#1c2230]"
              }`}
            >
              {it.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
