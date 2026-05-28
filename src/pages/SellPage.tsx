import { Camera, Check, ChevronDown, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { useProductsContext } from '../hooks/useProductsContext'
import { currentUser } from '../lib/user'
import {
  CONDITIONS,
  LOCATIONS,
  PRODUCT_CATEGORIES,
  type Product,
  type ProductFormValues,
} from '../types/product'

const initialFormValues: ProductFormValues = {
  title: '',
  price: '',
  category: '',
  condition: '거의 새 것',
  location: '',
  customLocation: '',
  availableTime: '',
  description: '',
  images: [],
}

const MAX_PRODUCT_IMAGES = 10

const readImageAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const SellPage = () => {
  const navigate = useNavigate()
  const { addProduct } = useProductsContext()
  const [formValues, setFormValues] =
    useState<ProductFormValues>(initialFormValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedLocation = useMemo(() => {
    if (formValues.location === '기타 직접 입력') {
      return formValues.customLocation.trim()
    }

    return formValues.location
  }, [formValues.customLocation, formValues.location])

  const updateField = <T extends keyof ProductFormValues>(
    field: T,
    value: ProductFormValues[T],
  ) => {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }))
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (files.length === 0) {
      return
    }

    const remainingCount = MAX_PRODUCT_IMAGES - formValues.images.length
    const selectedFiles = files.slice(0, remainingCount)
    const images = await Promise.all(selectedFiles.map(readImageAsDataUrl))

    updateField('images', [...formValues.images, ...images])
    event.target.value = ''
  }

  const handleRemoveImage = (imageIndex: number) => {
    updateField(
      'images',
      formValues.images.filter((_, index) => index !== imageIndex),
    )
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!formValues.title.trim()) {
      nextErrors.title = '상품명을 입력해주세요'
    }

    if (!formValues.price.trim()) {
      nextErrors.price = '가격을 입력해주세요'
    } else if (Number.isNaN(Number(formValues.price)) || Number(formValues.price) < 0) {
      nextErrors.price = '가격은 0 이상의 숫자로 입력해주세요'
    }

    if (!formValues.category) {
      nextErrors.category = '카테고리를 선택해주세요'
    }

    if (!formValues.location || !selectedLocation) {
      nextErrors.location = '거래 장소를 선택해주세요'
    }

    if (!formValues.description.trim()) {
      nextErrors.description = '상품 설명을 입력해주세요'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate() || !formValues.category || !formValues.condition) {
      return
    }

    const product: Product = {
      id: crypto.randomUUID(),
      title: formValues.title.trim(),
      price: Number(formValues.price),
      category: formValues.category,
      status: '판매중',
      condition: formValues.condition,
      location: selectedLocation,
      availableTime: formValues.availableTime.trim(),
      seller: currentUser,
      description: formValues.description.trim(),
      image: formValues.images[0] ?? '',
      images: formValues.images,
      createdAt: new Date().toISOString(),
      likes: 0,
      chats: 0,
    }

    addProduct(product)
    navigate('/')
  }

  return (
    <>
      <Header title="판매 등록" />

      <form onSubmit={handleSubmit} className="space-y-6 px-5 py-5">
        <section>
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-950">
                  상품 이미지
                </span>
                <span className="text-xs font-bold text-gray-400">
                  {formValues.images.length}/{MAX_PRODUCT_IMAGES}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-400">
                최대 {MAX_PRODUCT_IMAGES}장
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {formValues.images.map((image, index) => (
                <div
                  key={`${image.slice(0, 24)}-${index}`}
                  className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                >
                  <img
                    src={image}
                    alt={`상품 미리보기 ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {index === 0 ? (
                    <span className="absolute left-2 top-2 rounded-full bg-blue-900 px-2 py-1 text-[10px] font-black text-white">
                      대표
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`상품 이미지 ${index + 1} 삭제`}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              {formValues.images.length < MAX_PRODUCT_IMAGES ? (
                <label className="flex h-[120px] w-[120px] shrink-0 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <Camera size={32} strokeWidth={2.1} />
                  <span className="mt-2 text-xs font-black">사진 추가</span>
                  <span className="mt-1 text-xs font-bold text-gray-400">
                    {formValues.images.length}/{MAX_PRODUCT_IMAGES}
                  </span>
                </label>
              ) : null}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <Field label="상품명" error={errors.title}>
            <input
              value={formValues.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="예: 정보처리기능사 필기 교재"
              className="form-input"
            />
          </Field>

          <Field label="가격" error={errors.price}>
            <input
              value={formValues.price}
              onChange={(event) =>
                updateField('price', event.target.value.replace(/\D/g, ''))
              }
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              className="form-input"
            />
          </Field>

          <Field label="카테고리" error={errors.category}>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <ChoiceButton
                  key={category}
                  selected={formValues.category === category}
                  onClick={() => updateField('category', category)}
                >
                  {category}
                </ChoiceButton>
              ))}
            </div>
          </Field>

          <Field label="상품 상태">
            <div className="grid grid-cols-3 gap-2">
              {CONDITIONS.map((condition) => (
                <ChoiceButton
                  key={condition}
                  selected={formValues.condition === condition}
                  onClick={() => updateField('condition', condition)}
                  compact
                >
                  {condition}
                </ChoiceButton>
              ))}
            </div>
          </Field>

          <Field label="거래 장소" error={errors.location}>
            <div className="relative">
              <select
                value={formValues.location}
                onChange={(event) => updateField('location', event.target.value)}
                className="form-input appearance-none pr-11"
              >
                <option value="">거래 장소 선택</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {formValues.location === '기타 직접 입력' ? (
              <input
                value={formValues.customLocation}
                onChange={(event) =>
                  updateField('customLocation', event.target.value)
                }
                placeholder="직접 장소를 입력해주세요"
                className="form-input mt-2"
              />
            ) : null}
          </Field>

          <Field label="거래 가능 시간">
            <input
              value={formValues.availableTime}
              onChange={(event) =>
                updateField('availableTime', event.target.value)
              }
              placeholder="예: 평일 저녁 7시 이후"
              className="form-input"
            />
          </Field>

          <Field label="상품 설명" error={errors.description}>
            <textarea
              value={formValues.description}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
              placeholder="상품 상태, 구성품, 거래 시 확인할 내용을 적어주세요"
              rows={6}
              className="form-input form-textarea"
            />
          </Field>
        </section>

        <div className="sticky bottom-20 z-20 rounded-2xl bg-white/90 py-3 backdrop-blur">
          <Button type="submit" fullWidth>
            <Check size={18} />
            등록하기
          </Button>
        </div>
      </form>
    </>
  )
}

interface FieldProps {
  label: string
  error?: string
  children: ReactNode
}

const Field = ({ label, error, children }: FieldProps) => (
  <div className="block">
    <span className="mb-2 block text-sm font-black text-gray-950">{label}</span>
    {children}
    {error ? (
      <span className="mt-2 block text-xs font-bold text-red-500">{error}</span>
    ) : null}
  </div>
)

interface ChoiceButtonProps {
  selected: boolean
  onClick: () => void
  children: ReactNode
  compact?: boolean
}

const ChoiceButton = ({
  selected,
  onClick,
  children,
  compact = false,
}: ChoiceButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex items-center justify-center rounded-xl border font-bold transition',
      compact ? 'h-11 px-2 text-xs' : 'h-12 px-3 text-sm',
      selected
        ? 'border-blue-900 bg-blue-900 text-white'
        : 'border-gray-100 bg-white text-gray-600 hover:bg-blue-50',
    ].join(' ')}
  >
    {children}
  </button>
)
