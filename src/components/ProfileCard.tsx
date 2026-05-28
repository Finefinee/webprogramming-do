import { ShieldCheck, Star } from 'lucide-react'

export const ProfileCard = () => (
  <section className="rounded-3xl bg-blue-950 p-5 text-white shadow-lg shadow-blue-950/20">
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-white/10 p-4">
        <div className="flex items-center gap-2 text-blue-100">
          <Star size={17} />
          <span className="text-xs font-bold">거래 매너</span>
        </div>
        <p className="mt-2 text-2xl font-black">97점</p>
      </div>
      <div className="rounded-2xl bg-white/10 p-4">
        <div className="flex items-center gap-2 text-blue-100">
          <ShieldCheck size={17} />
          <span className="text-xs font-bold">학교 인증</span>
        </div>
        <p className="mt-2 text-2xl font-black">완료</p>
      </div>
    </div>
  </section>
)
