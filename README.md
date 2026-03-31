# 다움인테리어 견적 플랫폼 (Stage 1 MVP)

## 1) 최소 안정 구성
- Vite + React + TypeScript + Tailwind
- 데이터 저장: localStorage (Stage 1)
- 향후 Supabase 전환 포인트 분리 (`src/services/supabase.ts`)

## 2) 실행 방법
```bash
npm install
npm run dev
npm run build
npm run preview
```

테스트 로그인:
- email: `admin@dauminterior.com`
- password: `daum1234!`

## 3) 환경변수
`.env.local`
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## 4) 403 발생 가능 원인
현재 환경에서 `npm install` 시 403이 발생하면 보통 아래 원인 중 하나입니다.
- 사내/CI 보안 프록시가 npmjs.org 접근 또는 특정 패키지 다운로드를 차단
- 허용된 private registry만 사용하도록 정책이 강제됨
- 조직의 dependency allowlist에 패키지가 미등록
- 프록시 인증/권한 누락으로 외부 registry fetch 거부

본 프로젝트 의존성은 public npm 패키지만 사용하도록 정리했습니다.
