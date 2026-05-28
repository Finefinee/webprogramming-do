import { ArrowLeft, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Header } from '../components/Header'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { useProductsContext } from '../hooks/useProductsContext'
import { formatPrice } from '../lib/user'

interface Message {
  id: string
  text: string
  mine: boolean
}

export const ChatDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProduct } = useProductsContext()
  const product = getProduct(id)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'guide',
      text: '안녕하세요. 학교 안 밝은 장소에서 거래 시간을 조율해보세요.',
      mine: false,
    },
  ])
  const [messageText, setMessageText] = useState('')
  const sellerNickname = product?.seller.nickname.replace(/^DSM\b/, 'DGSW')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedText = messageText.trim()
    if (!trimmedText) {
      return
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), text: trimmedText, mine: true },
    ])
    setMessageText('')
  }

  if (!product) {
    return (
      <>
        <Header title="대소마켓" />
        <div className="px-5 py-5">
          <EmptyState
            title="채팅 상품을 찾을 수 없어요"
            description="등록된 상품 상세 화면에서 채팅을 시작해주세요"
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

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header title="대소마켓" />
      <header className="flex items-center gap-3 border-b border-gray-100 bg-white/95 px-5 py-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-700"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-black tracking-normal text-gray-950">
            {sellerNickname}
          </h1>
        </div>
      </header>

      <section className="border-b border-gray-100 px-5 py-4">
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3"
        >
          <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlaceholder className="h-full w-full" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-950">
              {product.title}
            </p>
            <p className="mt-1 text-base font-black text-gray-950">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-gray-500">
              {product.location} · {product.availableTime || '시간 조율'}
            </p>
          </div>
        </Link>
      </section>

      <div className="flex-1 space-y-3 px-5 py-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={[
              'flex',
              message.mine ? 'justify-end' : 'justify-start',
            ].join(' ')}
          >
            <p
              className={[
                'max-w-[78%] rounded-2xl px-4 py-3 text-sm font-medium leading-6',
                message.mine
                  ? 'rounded-br-md bg-blue-900 text-white'
                  : 'rounded-bl-md bg-gray-100 text-gray-800',
              ].join(' ')}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="safe-bottom sticky bottom-0 z-20 flex gap-2 border-t border-gray-100 bg-white/95 px-5 py-3 backdrop-blur"
      >
        <input
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="메시지를 입력하세요"
          className="h-12 min-w-0 flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
        <button
          type="submit"
          aria-label="메시지 보내기"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 text-white hover:bg-blue-800"
        >
          <Send size={19} />
        </button>
      </form>
    </div>
  )
}
