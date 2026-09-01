import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

/**
 * SleekCustomDropdown
 * Ultra-sleek, prominent, mobile-first custom dropdown component.
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
        className={`w-full bg-white hover:bg-slate-50 border rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2 text-left text-slate-800 shadow-sm focus:outline-none transition-all cursor-pointer ${
          isOpen ? 'border-red-500 ring-2 ring-red-200 shadow-md' : 'border-slate-300 hover:border-red-300'
        }`}
      >
        <div className="flex items-center gap-2 truncate pr-1">
          {icon && <span className="shrink-0">{icon}</span>}
          {selectedItem?.icon && <span className="text-sm shrink-0">{selectedItem.icon}</span>}
          <span className="text-xs font-bold text-slate-900 truncate">
            {selectedItem?.label || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {selectedItem?.badge && (
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
              {selectedItem.badge}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-red-600' : ''
            }`}
          />
        </div>
      </button>

      {/* Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-[100] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
          
          {/* Quick Search inside Dropdown */}
          {searchable && normalizedOptions.length > 5 && (
            <div className="p-2 border-b border-slate-100 bg-slate-50/80">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="খুঁজুন বা সার্চ করুন..."
                  autoFocus
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
            {Object.keys(grouped).length === 0 ? (
              <div className="p-3 text-center text-xs font-bold text-slate-400">
                কোনো অপশন পাওয়া যায়নি
              </div>
            ) : (
              Object.entries(grouped).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-0.5">
                  {groupName && (
                    <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-500 bg-slate-100/90 border-y border-slate-200/60 flex items-center justify-between">
                      <span>• {groupName}</span>
                      <span className="text-[9px] text-slate-400 font-normal">{groupItems.length}টি অপশন</span>
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
                        className={`w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-red-50 text-red-700 font-black border-l-4 border-red-600'
                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate mr-1">
                          {opt.icon && <span className="text-sm shrink-0">{opt.icon}</span>}
                          <span className={`text-xs truncate ${isSelected ? 'font-black text-red-950' : 'text-slate-800'}`}>
                            {opt.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {opt.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {opt.badge}
                            </span>
                          )}
                          {isSelected && <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />}
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
