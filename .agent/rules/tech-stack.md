---
trigger: always_on
---

# Tech Stack & Rules (Antigravity Style)

이 문서는 `shopping-mall-dashboard` 프로젝트의 기술 스택과 관련된 핵심 규칙을 정의합니다. 특히 Next.js와 Supabase를 Clean Architecture 내에서 올바르게 사용하기 위한 가이드입니다.

## 1. Core Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+ (Strict Mode)
- **Database & Auth**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS & Shadcn UI
- **Package Manager**: npm

## 2. Supabase Usage Rules (중요)

Supabase는 강력하지만 잘못 사용하면 아키텍처를 망가뜨릴 수 있습니다. 다음 규칙을 엄수하세요.

### 2.1 위치 제한 (Location Constraint)
- **원칙**: `createClient`를 호출하거나 Supabase 라이브러리를 직접 사용하는 코드는 오직 **`src/infrastructure`** 계층에만 존재해야 합니다.
- **금지**: UI 컴포넌트(`presentation`)나 비즈니스 로직(`domain`, `application`)에서 직접 `supabase.from('table').select()`를 호출하지 마세요.
- **예외**: `middleware.ts` (Next.js 미들웨어)에서는 세션 관리를 위해 직접 호출이 허용됩니다.

### 2.2 클라이언트 관리 (Client Management)
- **Server Client (`createServerClient`)**:
    - **용도**: Server Component, Server Action, Route Handler에서 사용.
    - **특징**: 쿠키를 자동으로 처리하며, 보안 컨텍스트를 유지합니다.
- **Browser Client (`createBrowserClient`)**:
    - **용도**: Client Component, Custom Hook(`useEffect`)에서 사용.
    - **주의**: 가능한 사용을 자제하고 Server Action을 통해 데이터를 가져오는 것을 권장합니다. (보안 및 성능 이점)

### 2.3 타입 안전성 (Type Safety)
- **Database Types**: `npx supabase gen types` 명령어로 생성된 타입을 `src/infrastructure/types/supabase.ts`에 저장하여 사용합니다.
- **Mapping**: DB에서 반환된 데이터(snake_case)는 반드시 Domain Entity(camelCase)로 변환(매핑)하여 Application 계층으로 전달합니다.
    - **Why?**: DB 스키마 변경이 도메인 로직에 영향을 주지 않도록 격리하기 위함입니다.

### 2.4 보안 (Security - RLS)
- **RLS 필수**: 모든 테이블에는 Row Level Security(RLS) 정책이 활성화되어야 합니다.
- **Service Role 금지**: 클라이언트 사이드 코드에 절대 `SERVICE_ROLE_KEY`를 노출하지 마세요.

### 2.5 마이그레이션 (Migrations)
- supabase/migrations 폴더에 위치
- 마이그레이션을 수정하거나 삭제하거나 새로 생성할 때는 항상 사용자의 허가를 받으세요.

## 3. TypeScript Rules

### 3.1 Strict Mode
- `tsconfig.json`에서 `strict: true`는 기본입니다.
- `any` 타입 사용을 지양하고, 부득이한 경우 `unknown`을 사용하거나 정확한 타입을 정의하세요.

### 3.2 Interfaces vs Types
- **Interface**: 확장 가능성이 있는 객체 정의(Entity, Repository Interface)에 사용합니다.
- **Type**: Union, Intersection, Primitive type alias 등 복합 타입 정의에 사용합니다.

## 4. Styling Rules (Tailwind CSS)

### 4.1 Utility-First & Consistency
- **표준 클래스**: 가능한 Tailwind 기본 유틸리티 클래스를 사용합니다.
- **색상 시스템**: 하드코딩된 색상(`text-red-500`) 대신 CSS 변수 기반의 시맨틱 컬러(`text-destructive`)를 사용합니다 (`globals.css` 참조).
- **반응형 디자인**: Mobile-first 원칙을 따릅니다. (`base` 스타일 -> `sm:` -> `md:` -> `lg:`)

### 4.2 Component Abstraction
- 반복되는 스타일 패턴은 `@apply` 대신 React 컴포넌트(`src/presentation/components/ui`)로 추상화하여 재사용합니다.
- 복잡한 조건부 스타일링은 `clsx` 또는 `tailwind-merge` (`cn` 유틸리티)를 사용합니다.

---
이 규칙들은 프로젝트의 안정성과 유지보수성을 위한 최소한의 약속입니다.