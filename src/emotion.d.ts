import { Theme } from "@emotion/react/macro";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      white: string;
      black: string;
    };
  }
}
