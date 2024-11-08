# 과제 테스트 (윤회)

[과제 테스트 안내서(노션) 링크](https://kimlian.notion.site/12fe426c5afa8010b7d9e7d6031295cf)

[배포 링크](https://yune-test.2duckchun.com/)

<img width="1499" alt="image" src="https://github.com/user-attachments/assets/dfd6d4e1-b5c5-4e33-a97a-dbafe6676f39">

## 요구사항 (구현 완료)

- [x] 1. **화면의 왼쪽에는 레이어 패널이, 오른쪽에는 뷰포트가 보여져야 합니다.**

- [x] 2. **레이어 패널의 상단에는 두 개의 버튼 컨테이너가 존재합니다.**

  1. element 생성 버튼 (div 추가, span 추가, p 추가 - 총 3개의 버튼을 만들어주시면 됩니다.
  1. elements 정렬 버튼 (전체 수직 정렬, 전체 수평 정렬, 그룹 수직 정렬, 그룹 수평 정렬 - 총 4개의 버튼을 만들어주시면 됩니다.)

- [x] 3. **2-a 버튼 클릭 시 생성된 element가 뷰포트에 보여지고, 레이어 패널에도 해당 element의 레이어가 생성되어야 합니다.**

  1. element의 모양이나 크기는 자유롭게 만들어주시되, 구분이 쉽게 가능하도록 각기 다른 background-color를 적용해주세요.

- [x] 4. **뷰포트의 element, 레이어 패널의 레이어 모두 마우스 클릭으로 선택이 가능해야 합니다. element 선택 시 레이어 패널에 매칭되는 레이어도 함께 선택되며, 레이어 선택 시에도 동일하게 매칭되는 element가 함께 선택되어야 합니다.**

- [x] 5. **선택된 element에는 border 2px를 적용해주세요.**

- [x] 6. **기존에 선택된 element가 있을 때 다른 element를 클릭한 경우, 기본적으로는 기존 element는 선택이 해제되고 새로 클릭한 element 하나만 선택되지만, Shift 버튼을 누른 채로 다른 element를 클릭한 경우 다중 선택이 가능해야 합니다.**

- [x] 7. **Drag&Drop으로 레이어 및 element의 순서를 변경할 수 있어야 합니다. 4번과 마찬가지로 매칭되는 element와 레이어는 함께 변경되어야 합니다.**

- [x] 8. **2개 이상의 elements를 선택하고 `Ctrl+G`를 누르면 group이 형성되고, group을 선택하고 `Ctrl+Shift+G`를 누르면 ungroup 되어야 합니다.**

- [x] 9. **2-b 버튼의 기능들을 CSS flex를 이용하여 구현해주세요.**

- [x] 10. **뷰포트에 생성된 요소들을 하나의 이미지로 다운로드할 수 있는 버튼을 만들어주세요.**

## 개발환경 및 라이브러리

### 개발환경

이번 과제에 필수인 TypeScript와 React를 사용했고, 번들러는 빠른 번들 속도 및 간편한 셋팅이 장점인 Vite를 사용했습니다.
pretter 및 ESLint도 새로 셋팅했습니다. 최근 ESLint가 업데이트되며 사용 방법이 바뀌었는데 이번 기회를 통해 린트를 다시금 공부해볼 수 있었습니다.

- `Typescript` + `React` + `Vite`
- `prettier` + `ESLint`

### 라이브러리

- `Tailwind CSS` : 빠른 개발이 필요하다고 판단되어 가장 숙련도가 높은 CSS 프레임워크인 Tailwind를 도입했습니다.
- `react-dnd` : Drag&Drop 기능을 구현하기 위해 도입한 라이브러리입니다.
- `html-to-image` : element를 이미지로 다운로드하기 위해 도입한 라이브러리입니다.
- `uuid` : 각 element 및 group에 추가할 id로 uuid를 채택했습니다.

## 설계

### 기본 설계

<img width="595" alt="image" src="https://github.com/user-attachments/assets/3d13e739-782c-4c66-9b30-f020799f20f0" />

- Drag&Drop, 키보드 인지에 따른 동작 등 세세한 구현이 많을 것이라 판단되어 로직을 최대한 한 곳에 응집하여 사이드이펙트를 줄이고, 유지보수성을 높이고자 하였습니다.
- 따라서 context 환경에 element를 다룰 수 있는 모든 기능을 응집했습니다. 화면단을 구성하는 컴포넌트들은 필요한 데이터를 props drilling 없이 context에서 바로 받아서 화면단 표현에 집중할 수 있도록 구성했습니다.
- 즉, 로직을 수정하기 위해서는 context hook만 확인하면 되고, 화면단을 수정하기 위해서는 컴포넌트만 확인하면 될 수 있게 구성했습니다.

### 컴포넌트 의존성 흐름

<img width="450" alt="image" src="https://github.com/user-attachments/assets/a33d8a94-6658-44e9-8810-c5cd8d713df5" />

- 의존성 방향이 한 방향으로 향할 수 있도록, 위와 같이 컴포넌트 설계를 그린 후 작업을 진행했습니다.

### 타입 설계

```ts
export type CustomElementBaseTag = 'div' | 'p' | 'span'
export type Align = 'horizontal' | 'vertical'
export type GroupAlign = Align
export type GlobalAlign = Align

export interface CustomElementBase {
  id: string
  isGroup: false
  tag: CustomElementBaseTag
  width: number
  height: number
  color: string
  isSelected: boolean
}

export interface CustomDivElement extends CustomElementBase {
  tag: 'div'
}

export interface CustomParagraphElement extends CustomElementBase {
  tag: 'p'
  text?: string
}

export interface CustomSpanElement extends CustomElementBase {
  tag: 'span'
}

export type CustomElement =
  | CustomDivElement
  | CustomParagraphElement
  | CustomSpanElement

export type CustomElementGroup = {
  id: string
  isGroup: true
  isSelected: boolean
  groupAlign: GroupAlign
  childElementList: CustomElement[]
}

export type DraggableCustomElement =
  | (CustomElement & { index: number })
  | (CustomElementGroup & { index: number })

export type SelectedElement = { id: string; isGrouped: boolean }
```

- 타입스크립트의 객체지향적 장점을 살리고자 `interface`와 `extends` 문법을 사용하여 최대한 변하지 않을 타입들을 기준 인터페이스로 삼고, 이러한 인터페이스를 기반으로 세부 타입들을 확장시켜 사용했습니다.
- 이를 통해 다른 태그(ex: aside, section 등)가 추가되더라도 기존에 만들어진 `interface` 및 `type`을 기반으로 확장되기 쉬운 형태로 타입을 설계했습니다.

## 주요 개발 기능

### useElementStateManagingHook

- 기능 구현에 필요한 전체적인 기능을 모두 응집한 hook입니다.
- 기능을 최대한 함수 단위로 묶었고, 키보드 감지 기능들은 별도의 hook으로 빼서 코드를 따로 관리할 수 있게 구성했습니다.

```ts
export const useElementStateManagingHook = () => {
  // 키 감지를 위한 훅
  const { keyPressed } = useKeyboardObserver()

  // 나열된 element를 관리하는 주요 state
  const [elementList, setElementList] = useState<
    (CustomElement | CustomElementGroup)[]
  >([])

  // 전역 정렬 state
  const [globalAlign, setGlobalAlign] = useState<GlobalAlign>('horizontal')

  // 선택된 element를 관리하는 state
  const [selectedElementList, setSelectedElementList] = useState<
    SelectedElement[]
  >([])

  // Shift + G를 눌렀을 때 element들을 그룹핑 해주는 훅
  useElementGrouping({
    elementList,
    keyPressed,
    selectedElementList,
    setElementList,
    setSelectedElementList
  })

  // Ctrl + Shift + G를 눌렀을 때 그룹들을 언그룹핑 해주는 훅
  useElementUngrouping({
    elementList,
    keyPressed,
    selectedElementList,
    setElementList,
    setSelectedElementList
  })

  // 나열된 element를 이동시키는 함수 (Drag & Drop과 연관있음)
  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    // ...
  }, [])

  // 선택된 그룹의 정렬을 바꿔주는 함수
  const modifyGroupElementAlign = (direction: GroupAlign) => {
    // ...
  }

  // 새로운 element를 추가하는 함수
  const addNewElement = (tag: CustomElementBaseTag) => {
    // ...
  }

  // element를 선택하는 함수
  const setSelectElement = ({
    id,
    isGrouped
  }: {
    id: string
    isGrouped: boolean
  }) => {
    // ...
  }

  // 전역 정렬을 설정하는 함수
  const setGlobalAlignHander = (direction: GlobalAlign) => {
    // ...
  }

  return {
    elementList,
    globalAlign,
    selectedElementList,
    setElementList,
    setGlobalAlignHander,
    addNewElement,
    moveElement,
    setSelectElement,
    modifyGroupElementAlign
  }
}
```

### useKeyboardObserver

- 어떤 키보드가 눌리고 있는지 관찰하는 hook입니다.
- 키보드의 중복 입력을 막고, 관리를 편하게 하고자 `Set 자료구조`를 활용했습니다.

```ts
import { useEffect, useState } from 'react'

export const useKeyboardObserver = () => {
  const [keyPressed, setKeyPressed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeyPressed((prevKeys) => new Set(prevKeys.add(event.key)))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeyPressed((prevKeys) => {
        const newKeys = new Set(prevKeys)
        newKeys.delete(event.key)
        return newKeys
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return {
    keyPressed
  }
}
```

## 회고
- 프론트엔드 개발자로써 굉장히 의미있는 과제를 수행할 수 있었다는 생각이 듭니다. 너무나도 재미있게 작업한 것 같습니다.
- 리스트를 다루는 작업이므로, 시간복잡도를 최대한 log(N)으로 맞출 수 없을까 고민했고, Set 자료구조를 사용하여 가능한 선형 복잡도를 유지했습니다.
- 호버가 일어나면 엘리먼트 위치가 바뀌는 만큼 자잘한 렌더링이 많았습니다. 그러나 useMemo나 useCallback을 과도하게 사용한다면 알 수 없는 사이드이펙트 또한 증가할 것 같았습니다. 개인적으로 렌더링이 일어나는 것은 자연스러운 현상이라 생각해 일단 두었으나, 성능상 이슈가 생기는 것이 확실시된다면 그때 추후 조치를 취할 것 같습니다.
- Drag&Drop 기능을 빠르게 구현하기 위해 react-dnd 라이브러리를 채택하여 사용했습니다. 라이브러리를 더 잘 이해하게 된다면 앞으로도 다양한 기능을 즐겁게 구현할 수 있을 것 같습니다.
