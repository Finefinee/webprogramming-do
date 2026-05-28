# 대소마켓

대구소프트웨어마이스터고 학생을 위한 교내 전용 오프라인 중고거래 프론트엔드 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

## 기술 스택

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react

## 구현 범위

- 상품 목록, 상품 상세, 판매 등록, 채팅 UI, 마이페이지
- 상품 데이터는 `localStorage`에 저장
- 초기 상품 목록은 빈 상태로 시작
- 백엔드 API 호출 없음
- 이미지 업로드는 브라우저 미리보기와 localStorage 저장만 지원

## 라우팅

- `/`
- `/products/:id`
- `/chat`
- `/chat/:id`
- `/sell`
- `/mypage`
