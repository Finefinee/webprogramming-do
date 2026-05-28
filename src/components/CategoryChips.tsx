import { CATEGORIES, type Category } from '../types/product'

interface CategoryChipsProps {
  selectedCategory: Category
  onSelectCategory: (category: Category) => void
}

export const CategoryChips = ({
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) => (
  <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="flex min-w-max gap-2">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={[
              'h-9 rounded-full border px-4 text-sm font-semibold transition',
              isSelected
                ? 'border-blue-900 bg-blue-900 text-white'
                : 'border-gray-100 bg-white text-gray-600 hover:border-blue-100 hover:bg-blue-50',
            ].join(' ')}
          >
            {category}
          </button>
        )
      })}
    </div>
  </div>
)
