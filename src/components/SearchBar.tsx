import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = '상품명, 카테고리, 장소 검색',
}: SearchBarProps) => (
  <label className="flex h-12 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 text-gray-500 focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
    <Search size={19} />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
    />
  </label>
)
