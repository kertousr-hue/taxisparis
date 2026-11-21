import { useState, useEffect, useRef } from 'react';
import { CheckCircle, MapPin } from 'lucide-react';
import {
  fetchGeoapifyAutocomplete,
  type GeoapifyAutocompleteSuggestion,
} from '../utils/geoapify/autocomplete';

interface AutocompleteInputProps {
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  apiKey: string;
  onAddressSelect: (address: string, lat: number, lng: number, placeId: string) => void;
  onInputChange: (value: string) => void;
  isValidated: boolean;
  hasError?: boolean;
}

export default function AutocompleteInput({
  label,
  value,
  placeholder,
  required = false,
  onAddressSelect,
  onInputChange,
  isValidated,
  hasError = false,
}: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<GeoapifyAutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedValueRef = useRef<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isValidated) {
      selectedValueRef.current = value;
      setSuggestions([]);
      setIsLoading(false);
      setSearchMessage('');
      return;
    }

    if (value === selectedValueRef.current) return;
    const query = value.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      setSearchMessage('');
      return;
    }

    const controller = new AbortController();
    setSuggestions([]);
    setIsLoading(true);
    setSearchMessage('');
    const debounceId = window.setTimeout(async () => {
      try {
        const results = await fetchGeoapifyAutocomplete(query, controller.signal);
        if (controller.signal.aborted) return;
        setSuggestions(results);
        setSearchMessage(results.length ? '' : 'Aucune suggestion dans la zone desservie. Précisez la ville ou le code postal.');
      } catch (error) {
        if (controller.signal.aborted) return;
        setSuggestions([]);
        setSearchMessage(error instanceof Error && error.message.startsWith('Recherche trop longue')
          ? error.message
          : 'Recherche momentanément indisponible. Réessayez.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }, 300);

    // A later keystroke cancels both the timer and the network request.
    return () => {
      window.clearTimeout(debounceId);
      controller.abort();
    };
  }, [value, isValidated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    selectedValueRef.current = null;
    onInputChange(newValue);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: GeoapifyAutocompleteSuggestion) => {
    selectedValueRef.current = suggestion.address.label;
    setShowSuggestions(false);
    setSearchMessage('');
    setIsLoading(false);

    // Geoapify fournit l'adresse et les coordonnées GPS.
    // HERE n'est jamais utilisé pour la recherche ou le géocodage des adresses.
    onAddressSelect(
      suggestion.address.label,
      suggestion.position.lat,
      suggestion.position.lng,
      suggestion.placeId
    );
    setSuggestions([]);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const inputId = `autocomplete-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={inputId} className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
        <MapPin size={12} aria-hidden="true" className="text-gray-400" />
        {label} {required && '*'}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={inputId}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        required={required}
        aria-required={required ? 'true' : 'false'}
        aria-autocomplete="list"
        aria-controls={`${inputId}-suggestions`}
        aria-expanded={showSuggestions && suggestions.length > 0}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isValidated
            ? 'border-green-400 bg-green-50 text-gray-800'
            : hasError
            ? 'border-red-400 bg-red-50'
            : 'border-gray-200 bg-gray-50 focus:bg-white'
        }`}
      />
      {isValidated && (
        <div role="status" aria-live="polite" className="mt-1.5 text-xs text-green-600 flex items-center gap-1 font-medium">
          <CheckCircle size={12} aria-hidden="true" /> Adresse valide
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          id={`${inputId}-suggestions`}
          role="listbox"
          className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 max-h-56 overflow-y-auto"
          style={{ top: '100%' }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={false}
              tabIndex={0}
              onClick={() => handleSuggestionClick(suggestion)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSuggestionClick(suggestion);
                }
              }}
              className="flex items-start gap-2.5 px-4 py-3 hover:bg-blue-50 active:bg-blue-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors focus:bg-blue-50 focus:outline-none"
            >
              <MapPin size={13} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="font-semibold text-gray-900 text-sm leading-tight">{suggestion.title}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{suggestion.address.label}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && isLoading && suggestions.length === 0 && value.length >= 3 && (
        <div role="status" aria-live="polite" className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <div className="w-3.5 h-3.5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Recherche en cours…
        </div>
      )}
      {showSuggestions && !isLoading && suggestions.length === 0 && value.length >= 3 && searchMessage && (
        <div role="status" aria-live="polite" className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-1.5 p-4 text-center text-sm text-gray-500">
          {searchMessage}
        </div>
      )}
    </div>
  );
}
