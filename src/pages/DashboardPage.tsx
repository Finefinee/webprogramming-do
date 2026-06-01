import { Gift, Medal, Trophy } from 'lucide-react'
import { Header } from '../components/Header'
import { useProductsContext } from '../hooks/useProductsContext'
import { getFreeSharingRankings } from '../lib/classGroups'

export const DashboardPage = () => {
  const { products } = useProductsContext()
  const rankings = getFreeSharingRankings(products)
  const totalFreeSharings = rankings.reduce(
    (total, ranking) => total + ranking.count,
    0,
  )
  const topRanking = rankings[0]
  const maxCount = Math.max(1, topRanking?.count ?? 0)
  const topRankingLabel =
    totalFreeSharings > 0 && topRanking ? topRanking.label : '아직 없음'

  return (
    <>
      <Header title="대소마켓" />

      <div className="space-y-6 px-5 py-5">
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
              <Gift size={20} />
            </div>
            <p className="text-sm font-bold text-gray-500">전체 무료나눔</p>
            <p className="mt-1 text-3xl font-black text-gray-950">
              {totalFreeSharings}개
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Trophy size={20} />
            </div>
            <p className="text-sm font-bold text-gray-500">현재 1위</p>
            <p className="mt-1 text-3xl font-black text-gray-950">
              {topRankingLabel}
            </p>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black tracking-normal text-gray-950">
                반별 무료나눔 순위
              </h2>
              <p className="text-xs font-medium text-gray-500">
                무료나눔 상품 1개 등록 시 선택한 반에 1점이 추가됩니다
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold text-blue-900">
              12개 반
            </span>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
            {rankings.map((ranking, index) => {
              const ratio = (ranking.count / maxCount) * 100

              return (
                <div
                  key={`${ranking.classGroup.grade}-${ranking.classGroup.classNumber}`}
                  className="border-b border-gray-100 px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black',
                        index < 3
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-100 text-gray-600',
                      ].join(' ')}
                    >
                      {index < 3 ? <Medal size={18} /> : index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-black text-gray-950">
                          {ranking.label}
                        </p>
                        <p className="shrink-0 text-sm font-black text-blue-900">
                          {ranking.count}점
                        </p>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
