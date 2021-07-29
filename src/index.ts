import { createRef, RefObject, useRef, useCallback, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

type ScrollToElementRefs = {
  [key: string]: RefObject<HTMLElement>;
};

/**
 * Removes all special characters and spaces except alphanumeric characters
 * @param str
 * @returns string
 */
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

const defaultScrollIntoViewOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
};

export const useScrollToElement = (
  elementNames: string[],
  scrollIntoViewOptions: ScrollIntoViewOptions = defaultScrollIntoViewOptions,
) => {
  const scrollToElementRefs = useRef<ScrollToElementRefs>({});
  const [trigger, setTrigger] = useState(0);

  useDeepCompareEffect(() => {
    scrollToElementRefs.current = elementNames.reduce((acc, elementName, index) => {
      acc[removeSpecialCharacters(elementName) || index] = createRef<HTMLElement>();
      return acc;
    }, {} as ScrollToElementRefs);
    //set trigger to force update to below handlers
    setTrigger(prevState => prevState + 1);
  }, [elementNames]);

  const scrollToElementClickHandler = useCallback(
    (elementName: string, index: number = 0) => {
      // scroll to element ref if it exists
      scrollToElementRefs?.current[
        removeSpecialCharacters(elementName) || index
      ].current?.scrollIntoView(scrollIntoViewOptions);
    },
    [trigger, scrollIntoViewOptions],
  );

  const getScrollToElementRef = useCallback(
    (elementName: string, index: number = 0) => {
      return scrollToElementRefs?.current[
        removeSpecialCharacters(elementName) || index
      ];
    },
    [trigger],
  );

  return { getScrollToElementRef, scrollToElementClickHandler };
};
