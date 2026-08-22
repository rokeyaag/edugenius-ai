import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

/**
 * SleekCustomDropdown
 * Ultra-sleek, compact, mobile-first custom dropdown that overrides
 * ugly OS native select dialogs with a professional in-app popover.
 */
export default function SleekCustomDropdown({
  label,
  icon,
  options = [], // [{ id/value, title/label, icon, group, badge }] or string[]
  value,
  onChange,
  placeholder = 'নির্বাচন করুন...',
  searchable = true,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Normalize options
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return {
      value: opt.id !== undefined ? opt.id : opt.value,
      label: opt.nameBn || opt.title || opt.label || opt.nameEn || opt.value,
      icon: opt.icon,
      group: opt.group,
      badge: opt.badge
    };
  });

  // Find selected item
  const selectedItem = normalizedOptions.find((o) => o.value === value) || normalizedOptions[0];

  // Filter options by search query
  const filteredOptions = normalizedOptions.filter((opt) => {
    if (!searchQuery.trim()) return true;
    return (opt.label || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Group filtered options if group property exists
  const grouped = filteredOptions.reduce((acc, opt) => {
    const grp = opt.group || '';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(opt);
    return acc;
  }, {});

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery('');
        }}
        className="w-full bg-white hover:bg-amber-50/50 border border-amber-300 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-1.5 text-left text-slate-800 shadow-xs focus:outline-none focus:ring-1 focus:ring-red-400 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-1.5 truncate pr-1">
          {icon && <span className="shrink-0">{icon}</span>}
          {selectedItem?.icon && <span className="text-xs shrink-0">{selectedItem.icon}</span>}
          <span className="text-[11px] font-bold text-slate-900 truncate">
            {selectedItem?.label || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-amber-700 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-red-600' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#fffdf5] border border-amber-300/90 rounded-2xl shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          
          {/* Quick Search inside Dropdown */}
          {searchable && normalizedOptions.length > 5 && (
            <div className="p-1.5 border-b border-amber-200/80 bg-amber-50/60">
              <div className="relative flex items-center">
                <Search className="w-3 h-3 text-amber-600 absolute left-2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খুঁজুন..."
                  autoFocus
                  className="w-full bg-white border border-amber-200 rounded-lg pl-6 pr-6 py-1 text-[10px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-1.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto no-scrollbar py-1">
            {Object.keys(grouped).length === 0 ? (
              <div className="p-2.5 text-center text-[10px] font-bold text-slate-400">
                কোনো তথ্য পাওয়া যায়নি
              </div>
            ) : (
              Object.entries(grouped).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-0.5">
                  {groupName && (
                    <div className="px-2.5 py-1 text-[9px] font-black uppercase text-amber-900 bg-amber-100/70 border-y border-amber-200/60">
                      • {groupName} ({groupItems.length}টি)
                    </div>
                  )}

                  {groupItems.map((opt) => {
                    const isSelected = opt.value === value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onChange(opt.value, opt);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full px-2.5 py-1.5 flex items-center justify-between text-left transition-colors ${
                          isSelected
                            ? 'bg-red-50 text-red-700 font-black border-l-2 border-red-600'
                            : 'text-slate-700 hover:bg-amber-100/60 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate mr-1">
                          {opt.icon && <span className="text-xs shrink-0">{opt.icon}</span>}
                          <span className={`text-[10.5px] truncate ${isSelected ? 'font-black text-red-950' : 'text-slate-800'}`}>
                            {opt.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {opt.badge && (
                            <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-amber-100/80 text-amber-800 border border-amber-200">
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && <Check className="w-3 h-3 text-red-600 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
