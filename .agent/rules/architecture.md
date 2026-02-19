---
trigger: always_on
---

# 쇼핑몰 대시보드 클린 아키텍처 가이드 (Shopping Mall Dashboard Clean Architecture Guide)

이 문서는 `shopping-mall-dashboard` 프로젝트에 클린 아키텍처(Clean Architecture)를 도입하기 위한 구체적인 가이드라인과 폴더 구조를 설명합니다.

## 1. 도입 배경 및 목적

현재 프로젝트는 기능 중심으로 빠르게 개발할 수 있는 구조이지만, 프로젝트 규모가 커짐에 따라 다음과 같은 문제에 대비해야 합니다:
- **유지보수성**: 비즈니스 로직과 UI 코드가 섞여 있어 수정이 어려움.
- **테스트 용이성**: DB나 프레임워크에 의존적이라 단위 테스트 작성이 어려움.
- **확장성**: 새로운 기술이나 라이브러리 도입 시 전체 코드 수정이 필요할 수 있음.

클린 아키텍처는 이러한 문제를 해결하기 위해 **"관심사의 분리(Separation of Concerns)"**와 **"의존성 규칙(Dependency Rule)"**을 적용합니다.

## 2. 핵심 원칙: 의존성 규칙

> **"소스 코드 의존성은 반드시 안쪽으로(고수준 정책을 향해) 향해야 한다."**

가장 중요한 규칙은 **바깥쪽 원(UI, DB, Framework)이 안쪽 원(Domain, Use Case)을 알지만, 안쪽 원은 바깥쪽 원을 전혀 모른다는 것**입니다.

## 3. 추천 폴더 구조 (src 도입)

Next.js App Router 환경에 맞춰 `src` 디렉토리를 도입하고, 계층별로 폴더를 나눕니다.

```
src/
├── app/                    # [Presentation Layer] Next.js App Router (프레임워크)
│   ├── (auth)/             # 로그인, 회원가입 등
│   ├── dashboard/          # 대시보드 기능
│   ├── api/                # API Route Handlers
│   └── layout.tsx, page.tsx
│
├── presentation/           # [Presentation Layer] UI 컴포넌트 & 상태 관리
│   ├── components/         # 리액트 컴포넌트
│   │   ├── ui/             # 공통 UI (shadcn/ui 등)
│   │   └── domain/         # 도메인 특화 컴포넌트
│   ├── hooks/              # 커스텀 훅 (ViewModel 역할)
│   └── stores/             # 클라이언트 상태 관리 (Zustand, Context)
│
├── application/            # [Application Layer] 유스케이스 (비즈니스 시나리오)
│   ├── use-cases/          # 실제 비즈니스 로직 (예: 상품 등록, 주문 취소)
│   │   ├── product/
│   │   └── order/
│   ├── dtos/               # 계층 간 데이터 전송 객체 (Input/Output 모델)
│   └── interfaces/         # Port 정의 (Repository, Service 인터페이스)
│
├── domain/                 # [Domain Layer] 핵심 비즈니스 로직 (순수 TS)
│   ├── entities/           # 핵심 데이터 모델 및 규칙 (Product, User)
│   ├── repositories/       # 리포지토리 인터페이스 정의 (IProductRepository)
│   ├── value-objects/      # 값 객체 (Money, Email 등)
│   └── errors/             # 도메인 에러
│
├── infrastructure/         # [Infrastructure Layer] 외부 구현체
│   ├── repositories/       # 실제 데이터 접근 구현 (Supabase, Prisma 등)
│   ├── services/           # 외부 서비스 구현 (EmailService, PaymentService)
│   └── config/             # 환경 변수 및 설정
│
└── shared/                 # [Shared] 공통 유틸리티
    ├── utils/              # 날짜, 문자열 포맷팅 등
    ├── types/              # 전역 타입
    └── constants/          # 상수
```

## 4. 계층별 상세 설명

### 🟢 Domain Layer (가장 안쪽)
- **성격**: 비즈니스의 핵심. 프레임워크나 라이브러리에 의존하지 않는 순수 TypeScript/JavaScript 영역.
- **구성요소**:
    - **Entities**: 비즈니스 개념을 코드로 표현한 객체. (예: `Category`는 반드시 이름을 가져야 한다.)
    - **Value Objects**: 식별자가 없고 속성 값으로만 구분되는 객체. (예: `Price` - 금액과 통화 단위)
    - **Repository Interfaces**: 데이터를 어떻게 저장/조회할지 추상화한 인터페이스. (예: `save(user: User): Promise<void>`)

### 🟡 Application Layer (중간)
- **성격**: 사용자가 시스템을 통해 수행하려는 동작(Use Case). 도메인 객체를 제어하여 목적을 달성.
- **구성요소**:
    - **Use Cases**: "상품 목록 조회", "로그인 시도" 등 하나의 기능 단위.
    - **DTOs**: UI에서 Use Case로, Use Case에서 UI로 데이터를 전달하는 객체.
    - **Service Interfaces**: 메일 발송 등 외부 시스템 사용을 위한 인터페이스.

### 🔴 Infrastructure Layer (바깥쪽)
- **성격**: 실제 기술적인 구현이 있는 곳. DB 연결, API 호출 등을 담당.
- **구성요소**:
    - **Repositories Implementations**: `SupabaseProductRepository`처럼 실제 DB 기술을 써서 인터페이스 구현.
    - **External Services**: `ResendEmailService` 등 실제 라이브러리 연동 코드.

### 🔵 Presentation Layer (가장 바깥쪽, `app` & `presentation`)
- **성격**: 사용자와의 인터페이스. 화면을 그리고 입력을 받음.
- **구성요소**:
    - **Components**: 화면을 구성하는 UI 요소.
    - **Hooks / ViewModels**: Use Case를 호출하고, UI 상태를 관리.
    - **Next.js Pages**: URL 라우팅 진입점.

---

## 5. 데이터 흐름 예시: "상품 목록 조회"

사용자가 대시보드에서 상품 목록 페이지에 접속했을 때의 흐름입니다.

1.  **UI (Page/Component)**: `ProductListPage` 컴포넌트 렌더링. `useProductList` 훅 호출.
2.  **Presentation (Hook)**: `GetProductListUseCase`를 의존성 주입(DI) 받아 `execute()` 메서드 호출.
3.  **Application (Use Case)**:
    - `GetProductListUseCase`는 `IProductRepository` 인터페이스를 가지고 있음.
    - `productRepository.findAll()` 호출.
4.  **Infrastructure (Repository Impl)**:
    - `SupabaseProductRepository` (구현체)가 실행됨.
    - Supabase 클라이언트를 사용해 DB에서 데이터 조회 (`supabase.from('products').select(...)`).
    - DB에서 받은 raw 데이터를 도메인 `Product` 엔티티로 변환하여 반환 (Mapper 패턴).
5.  **Application**: 반환받은 `Product` 엔티티 목록을 `ProductDto`로 변환하여 Presentation 계층으로 반환.
6.  **Presentation**: 화면에 상품 목록 표시.

## 6. 단계별 적용 전략

한 번에 모든 코드를 바꾸는 것은 위험하므로, 점진적인 적용을 추천합니다.

1.  **Step 1: 폴더 구조 잡기**: 루트에 `src` 폴더를 만들고 제안된 폴더들을 생성합니다.
2.  **Step 2: Shared & Utils 이동**: 공통으로 쓰이는 유틸리티 함수들을 `shared`로 이동합니다.
3.  **Step 3: 도메인 정의**: 새 기능을 개발하거나 리팩토링할 때, 먼저 `domain/entities`에 타입을 정의합니다.
4.  **Step 4: Use Case 도입**: 복잡한 로직이 있는 컴포넌트(예: 데이터 페칭 + 가공 + 상태 변경이 섞인 곳)부터 로직을 `application` 계층으로 추출합니다.
5.  **Step 5: Repository 분리**: `useEffect` 안에서 직접 `supabase`를 부르는 코드를 `infrastructure`의 리포지토리로 옮기고, 인터페이스를 통해 호출하도록 바꿉니다.

---
이 가이드를 참고하여, 현재 프로젝트의 복잡도를 낮추고 장기적인 유지보수성을 확보하시기 바랍니다.