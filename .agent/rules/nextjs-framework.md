---
trigger: always_on
---

# Next.js Framework Rules (Antigravity Style)

`shopping-mall-dashboard` 프로젝트에서 Next.js App Router를 효과적으로 활용하기 위한 개발 원칙입니다.

## 1. 렌더링 전략: Server Component 우선 (Prefer Server Components)

Next.js 13+ App Router의 가장 큰 장점인 서버 컴포넌트를 기본으로 사용합니다.

- **규칙**: 기본적으로 모든 컴포넌트는 **Server Component**로 작성합니다.
- **예외**: 다음과 같은 경우에만 파일 최상단에 `'use client'`를 선언하여 **Client Component**로 전환합니다.
    - `useState`, `useEffect` 등 React Hook을 사용해야 할 때.
    - `onClick`, `onChange` 등 이벤트 리스너가 필요할 때.
    - 브라우저 전용 API(`window`, `localStorage`)를 사용해야 할 때.
- **팁**: 클라이언트 컴포넌트는 가능한 트리의 말단(Leaf)으로 미뤄서, 서버 컴포넌트의 이점(번들 사이즈 감소, 보안)을 최대한 유지합니다.

## 2. 코드 품질: 간결함과 명확성 (Clarity & Conciseness)

코드는 작성하는 시간보다 읽히는 시간이 훨씬 깁니다. "돌아가는 코드"보다 "읽기 쉬운 코드"를 지향합니다.

- **변수/함수명**: 의도를 명확히 드러내는 이름을 사용합니다. (`d`, `tmp` 지양, `userData`, `handleLoginSubmit` 권장)
- **Early Return**: 불필요한 `else` 블록을 줄이고, 조건이 맞지 않으면 빠르게 반환하여 들여쓰기 깊이를 줄입니다.
- **단순한 로직**: 복잡한 비즈니스 로직은 컴포넌트 내부가 아닌 `domain`이나 `application/use-cases` 계층으로 위임합니다.

## 3. 모듈화: 파일 분리 (Split Large Files)

하나의 파일이 너무 많은 책임을 지거나 길어지면 유지보수가 어려워집니다.

- **기준**: 파일이 **250~300줄**을 넘어가면 분리를 고려합니다.
- **실천 방법**:
    1.  **UI 분리**: 반복되는 UI 패턴은 별도 컴포넌트로 추출합니다.
    2.  **로직 분리**: 복잡한 계산이나 상태 관리는 Custom Hook(`useViewModel` 등)으로 추출합니다.
    3.  **상수/타입 분리**: 긴 설정값이나 타입 정의는 별도 파일(`constants.ts`, `types.ts`)로 이동합니다.

## 4. 데이터 페칭 (Data Fetching)

- **Server Side Fetching**: 데이터는 가능한 서버 컴포넌트에서 `async/await`으로 직접 가져옵니다. 불필요한 API 라우트 생성을 줄입니다.
- **Parallel Fetching**: 서로 의존성이 없는 데이터는 `Promise.all` 등을 사용하여 병렬로 요청해 응답 시간을 단축합니다.
- **Streaming**: 데이터 로딩이 오래 걸리는 부분은 `<Suspense>`로 감싸서 페이지의 다른 부분이 먼저 렌더링되게 합니다. (`loading.tsx` 활용)

## 5. 성능 최적화 (Optimization)

- **이미지**: `<img>` 태그 대신 `next/image`를 사용하여 자동 리사이징 및 포맷 최적화를 수행합니다.
- **폰트**: `next/font`를 사용하여 Layout Shift(CLS)를 방지합니다.
- **스크립트**: 외부 스크립트는 `next/script`를 사용하고 로딩 전략(`strategy`)을 적절히 설정합니다.

## 6. 에러 처리 (Error Handling)

- **Global Error**: `error.tsx` 파일을 통해 세분화된 에러 UI를 제공합니다.
- **Not Found**: `not-found.tsx`를 통해 404 페이지를 커스텀합니다.
- **API Error**: API 호출 실패 시 적절한 에러 메시지를 사용자에게 노출하고, 필요시 로깅 시스템에 기록합니다.

---
이 규칙들은 프로젝트의 일관성과 품질을 유지하기 위한 약속입니다. 코드 리뷰 시 이 기준을 참고해 주세요.