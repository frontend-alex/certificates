"use strict";

// // coded by: Ayhanexe with <3
// // I do not care about money
// // This code is fully free
// // use it as you want ;)
export class SplitText {
  private options = {
    charClass: "aki__char",
    wordClass: "aki__word",
    lineClass: "aki__line",
    globalClass: "aki_wrapper",
    emptySpaceName: "__AKI__EMPTY__SPACE__",
  };

  private rawChars: (HTMLElement | string)[] = [];
  public chars: HTMLElement[] = [];
  private rawWords: (HTMLElement | string)[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  private target!: HTMLElement;
  private textContent!: string;

  constructor(elementOrSelector: HTMLElement | string) {
    this.init(elementOrSelector);
  }

  private isElement(obj: any): obj is HTMLElement {
    return obj instanceof HTMLElement;
  }

  private createElement(
    tagname: string,
    content: string = "",
    htmlAttributes: Record<string, string> = {},
    ...cssClass: string[]
  ): HTMLElement {
    const element = document.createElement(tagname);
    element.classList.add(...cssClass);
    element.innerHTML = content;

    for (const [key, value] of Object.entries(htmlAttributes)) {
      element.setAttribute(key, value);
    }

    return element;
  }

  private splitChars(): void {
    const textChars = this.textContent.split("");

    textChars.forEach((char) => {
      const charElement = this.createElement(
        "div",
        char,
        { style: "position:relative; display:inline-block;" },
        this.options.globalClass,
        this.options.charClass
      );

      this.rawChars.push(char === " " ? " " : charElement);
      this.chars.push(charElement);
    });
    this.rawChars.push(" ");
  }

  private splitWords(): void {
    let startIndex = 0;
    this.rawChars.forEach((rawChar, index) => {
      if (rawChar === " ") {
        const wordArray = this.rawChars
          .slice(startIndex, index)
          .filter((word) => word !== " ");

        const wordDiv = this.createElement(
          "div",
          "",
          { style: "position:relative; display:inline-block;" },
          this.options.globalClass,
          this.options.wordClass
        );

        wordArray.forEach((word) => {
          if (word instanceof HTMLElement) {
            wordDiv.append(word);
          }
        });

        this.words.push(wordDiv);
        this.rawWords.push(wordDiv, " ");
        startIndex = index;
      }
    });
  }

  private splitLines(): void {
    let startIndex = 0;
    let lineArrays: HTMLElement[][] = [];

    const appendToLineArray = (): void => {
      lineArrays.forEach((lineArray) => {
        const lineDiv = this.createElement(
          "div",
          "",
          { style: "position:relative; display:inline-block" },
          this.options.globalClass,
          this.options.lineClass
        );

        lineArray.forEach((lineWord) => {
          lineDiv.append(lineWord);
          lineDiv.append(" ");
        });

        this.lines.push(lineDiv);
        this.target.append(lineDiv);
      });
    };

    this.words.reduce((oldOffsetTop: number | null, word, index) => {
      const currentOffsetTop = word.offsetTop;

      if (
        (oldOffsetTop !== currentOffsetTop && oldOffsetTop !== null) ||
        index === this.words.length - 1
      ) {
        const computedIndex = index === this.words.length - 1 ? index + 1 : index;
        const lineArray = this.words.slice(startIndex, computedIndex);
        lineArrays.push(lineArray);
        startIndex = index;
      }

      return currentOffsetTop;
    }, null);

    appendToLineArray();
  }

  private combineAll(): void {
    this.words.forEach((word) => {
      this.target.append(word);
      this.target.append(" ");
    });
    this.splitLines();
  }

  private splitStart(): void {
    this.splitChars();
    this.splitWords();
    this.combineAll();
  }

  private getTextContent(): void {
    this.textContent = this.target.textContent || "";
  }

  private clearContent(element: HTMLElement): void {
    element.innerHTML = "";
  }

  private logAndThrowError(message: string): never {
    console.error(message);
    throw new Error("SplitTextException!");
  }

  public init(elementOrSelector: HTMLElement | string): void {
    if (this.isElement(elementOrSelector)) {
      this.target = elementOrSelector;
      this.getTextContent();
    } else {
      if (elementOrSelector !== "") {
        const element = document.querySelector(elementOrSelector);
        if (element instanceof HTMLElement) {
          this.target = element;
          this.getTextContent();
        } else {
          this.logAndThrowError(`Can't find ${elementOrSelector} in DOM!`);
        }
      } else {
        this.logAndThrowError("Selector is empty! Please provide a valid selector.");
      }
    }

    this.clearContent(this.target);
    this.splitStart();
  }
}