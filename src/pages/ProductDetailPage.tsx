import {
  ArrowLeft,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { StatusBadge } from '../components/StatusBadge'
import { getClassGroupLabel } from '../lib/classGroups'
import { formatDate, formatPrice } from '../lib/user'
import { useProductStore } from '../store/useProductStore'

export const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const getProduct = useProductStore((state) => state.getProduct)
  const likedProductIds = useProductStore((state) => state.likedProductIds)
  const toggleLike = useProductStore((state) => state.toggleLike)
  const product = getProduct(id)

  if (!product) {
    return (
      <>
        <Header title="대소마켓" />
        <div className="px-5 py-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-700"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={20} />
          </button>
          <EmptyState
            title="상품을 찾을 수 없어요"
            description="이미 삭제되었거나 등록되지 않은 상품입니다"
            action={
              <Link to="/">
                <Button>홈으로 이동</Button>
              </Link>
            }
          />
        </div>
      </>
    )
  }

  const isLiked = likedProductIds.includes(product.id)
  const representativeImage = product.images?.[0] ?? product.image

  return (
    <>
      <Header title="대소마켓" />
      <article className="bg-white">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-8 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(360px,560px)_minmax(0,1fr)] lg:items-start">
          <div className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
            {representativeImage ? (
              <img
                src={representativeImage}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlaceholder className="h-full w-full" />
            )}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-sm"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <section className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-bold text-gray-400">
                홈 &gt; {product.category}
              </p>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <StatusBadge label={product.status} />
                <StatusBadge label={product.condition} tone="gray" />
                <StatusBadge label={product.category} tone="green" />
                {product.category === '무료나눔' && product.classGroup ? (
                  <StatusBadge
                    label={`${getClassGroupLabel(product.classGroup)} 점수`}
                    tone="blue"
                  />
                ) : null}
              </div>
              <h1 className="text-3xl font-black leading-tight tracking-normal text-gray-950">
                {product.title}
              </h1>
              <p className="mt-5 text-4xl font-black tracking-normal text-gray-950">
                {formatPrice(product.price)}
              </p>
              <p className="mt-5 text-sm font-semibold text-gray-500">
                {formatDate(product.createdAt)} 등록 · 찜 {product.likes} · 채팅{' '}
                {product.chats}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                <span className="text-sm font-black text-gray-950">
                  교내 직거래
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <MapPin size={18} />
                    거래 장소
                  </span>
                  <span className="text-right text-sm font-black text-gray-950">
                    {product.location}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    <Clock3 size={18} />
                    가능 시간
                  </span>
                  <span className="text-right text-sm font-black text-gray-950">
                    {product.availableTime || '채팅으로 조율'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-y border-gray-100 py-4">
              <dl className="flex items-center gap-8">
                <dt className="text-sm font-bold text-gray-500">상품 상태</dt>
                <dd className="text-sm font-black text-gray-950">
                  {product.condition}
                </dd>
              </dl>
            </div>

            <div className="grid grid-cols-[64px_1fr_1fr] gap-3">
              <button
                type="button"
                onClick={() => toggleLike(product.id)}
                aria-label="찜하기"
                className="flex h-14 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
              >
                <Heart
                  size={28}
                  className={isLiked ? 'fill-red-500 text-red-500' : ''}
                />
              </button>
              <Link to={`/chat/${product.id}`}>
                <Button
                  fullWidth
                  variant="secondary"
                  className="h-14 border-gray-300 bg-white text-gray-950 hover:bg-gray-50"
                >
                  <MessageCircle size={20} />
                  채팅하기
                </Button>
              </Link>
              <Link to={`/chat/${product.id}`}>
                <Button fullWidth className="h-14 bg-gray-950 hover:bg-gray-800">
                  거래하기
                </Button>
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-14 border-t border-gray-100 pt-10">
          <section>
            <h2 className="text-2xl font-black tracking-normal text-gray-950">
              상품 정보
            </h2>
            <div className="mt-8 rounded-xl bg-gray-50 px-4 py-3 text-sm font-bold text-gray-600">
              개인정보나 외부 연락처를 주고받기 전, 교내 밝은 장소에서 직접
              확인하세요.
            </div>
            <p className="mt-8 whitespace-pre-wrap text-base font-medium leading-8 text-gray-800">
              {product.description}
            </p>
          </section>
        </div>
        </div>
      </article>
    </>
  )
}
