import { renderHook } from '@testing-library/react-hooks';

import { useScrollToElement } from './';

describe('useScrollToElement custom hook', () => {
  const ELEMENT_NAMES = [
    'Question 1',
    'Question 2',
    'Question 3',
    'Question 4',
    'Question 5',
    'Question 6',
    'Question 7',
  ];

  test('should return refs based on category input', () => {
    const { result } = renderHook(() => useScrollToElement(ELEMENT_NAMES));

    expect(result.current.getScrollToElementRef(ELEMENT_NAMES[0], 0)).not.toBe(null);
    expect(result.current.getScrollToElementRef(ELEMENT_NAMES[5], 5)).not.toBe(null);
  });

  test('should return same elementRef if re-rendered with same list of elementNames', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useScrollToElement(initialValue),
      {
        initialProps: {
          initialValue: ELEMENT_NAMES,
        },
      },
    );

    const function1A = result.current.getScrollToElementRef;
    const function2A = result.current.scrollToElementClickHandler;

    rerender({
      initialValue: ELEMENT_NAMES,
    });

    const function1B = result.current.getScrollToElementRef;
    const function2B = result.current.scrollToElementClickHandler;

    expect(function1A).toBe(function1B);
    expect(function2A).toBe(function2B);
  });

  test('should return same scrollToElementClickHandler if re-rendered with same list of elementNames and scrollIntoViewOptions', () => {
    const scrollOptions = {
      behavior: 'auto',
    } as ScrollIntoViewOptions;

    const { result, rerender } = renderHook(
      ({ initialValue, initialScrollIntoViewOptions }) =>
        useScrollToElement(initialValue, initialScrollIntoViewOptions),
      {
        initialProps: {
          initialValue: ELEMENT_NAMES,
          initialScrollIntoViewOptions: scrollOptions,
        },
      },
    );

    const function1A = result.current.getScrollToElementRef;
    const function2A = result.current.scrollToElementClickHandler;

    rerender({
      initialValue: ELEMENT_NAMES,
      initialScrollIntoViewOptions: scrollOptions,
    });

    const function1B = result.current.getScrollToElementRef;
    const function2B = result.current.scrollToElementClickHandler;

    expect(function1A).toBe(function1B);
    expect(function2A).toBe(function2B);
  });

  test('should return different elementRef if re-rendered with different list of elementNames', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useScrollToElement(initialValue),
      {
        initialProps: {
          initialValue: ELEMENT_NAMES,
        },
      },
    );

    const function1A = result.current.getScrollToElementRef;
    const function2A = result.current.scrollToElementClickHandler;

    rerender({
      initialValue: ELEMENT_NAMES.slice().splice(1),
    });

    const function1B = result.current.getScrollToElementRef;
    const function2B = result.current.scrollToElementClickHandler;

    expect(function1A).not.toBe(function1B);
    expect(function2A).not.toBe(function2B);
  });

  test('should return different scrollToElementClickHandler if re-rendered with different scrollIntoViewOptions', () => {
    const { result, rerender } = renderHook(
      ({ initialValue, initialScrollIntoViewOptions }) =>
        useScrollToElement(initialValue, initialScrollIntoViewOptions),
      {
        initialProps: {
          initialValue: ELEMENT_NAMES,
          initialScrollIntoViewOptions: {
            behavior: 'smooth',
          } as ScrollIntoViewOptions,
        },
      },
    );

    const function2A = result.current.scrollToElementClickHandler;

    rerender({
      initialValue: ELEMENT_NAMES,
      initialScrollIntoViewOptions: {
        behavior: 'auto',
      } as ScrollIntoViewOptions,
    });
    const function2B = result.current.scrollToElementClickHandler;

    expect(function2A).not.toBe(function2B);
  });
});
