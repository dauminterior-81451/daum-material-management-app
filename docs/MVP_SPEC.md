# 다움인테리어 견적 플랫폼 - 1단계 MVP 명세

## 1. 폴더 구조

```txt
src/
  contexts/
    AuthContext.tsx
    AppContext.tsx
  data/
    mockData.ts
  layout/
    AppShell.tsx
  lib/
    format.ts
  pages/
    LoginPage.tsx
    SiteListPage.tsx
    SiteDetailPage.tsx
    EstimateEditorPage.tsx
    ClientEstimatePage.tsx
  services/
    repository.ts
    emailService.ts
    supabase.ts
  types.ts
  App.tsx
  main.tsx
```

## 2. DB 스키마 제안 (Supabase)

- admins(id, email, name, role, created_at)
- sites(id, name, customer_name, customer_phone, customer_email, customer_address, consultation_memo, created_at, updated_at)
- estimate_revisions(id, site_id, version_label, vat_included, notes, created_by, created_at, updated_at)
- estimate_sections(id, estimate_id, name, display_order)
- estimate_items(id, section_id, name, description, unit_price, quantity, unit)
- email_logs(id, estimate_id, to_email, subject, body, status, sent_at)
- estimate_view_tracking(estimate_id, link_visited, first_viewed_at, last_viewed_at, view_count, pdf_downloaded)

## 3. 라우팅

- /login
- /sites
- /sites/:siteId
- /sites/:siteId/estimates/new
- /sites/:siteId/estimates/:estimateId
- /client/estimate/:estimateId

## 4. 더미 데이터

- site 1개, estimate 1개(철거/설비 섹션) 포함
- 첫 진입 시 localStorage seed

## 5. 확장 방향

### 2단계
- Supabase Auth + Row Level Security
- 실제 이메일 provider(Resend/SMTP) 연동
- PDF 서버 렌더링 추가

### 3단계
- 협력업체 발주/정산
- 변경공사 승인 워크플로우
- 이익률 분석 대시보드 + 알림
