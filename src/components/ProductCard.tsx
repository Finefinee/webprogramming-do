import { Heart, MapPin, MessageCircle } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate, formatPrice } from '../lib/user'
import type { Product } from '../types/product'
import { ImagePlaceholder } from './ImagePlaceholder'
import { StatusBadge } from './StatusBadge'

interface ProductCardProps {
  product: Product
  isLiked?: boolean
}

export const ProductCard = ({ product, isLiked = false }: ProductCardProps) => (
  <Link
    to={`/products/${product.id}`}
    className="group flex gap-4 border-b border-gray-100 py-4 last:border-b-0"
  >
    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      ) : (
        <ImagePlaceholder className="h-full w-full" />
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold tracking-normal text-gray-950">
            {product.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-500">
            <MapPin size={13} />
            <span className="truncate">
              {product.location} · {formatDate(product.createdAt)}
            </span>
          </p>
        </div>
        <StatusBadge label={product.status} tone="blue" />
      </div>
      <p className="mt-2 text-lg font-black tracking-normal text-gray-950">
        {formatPrice(product.price)}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold text-gray-500">
        <span className="rounded-full bg-gray-50 px-2.5 py-1 text-gray-600">
          {product.category}
        </span>
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Heart
              size={14}
              className={isLiked ? 'fill-red-500 text-red-500' : ''}
            />
            {product.likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle size={14} />
            {product.chats}
          </span>
        </span>
      </div>
    </div>
  </Link>
)
