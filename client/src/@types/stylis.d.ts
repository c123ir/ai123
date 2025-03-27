// فایل تعریف تایپ برای کتابخانه stylis

declare module "stylis" {
  export function prefixer(element: string, key: string, value: string): string;
  export function serialize(element: string, children: string): string;
  export function compile(element: string): string;
  export function middleware(element: string): string;
  export function parse(element: string): string;
  export interface Element {
    type: string;
    props: any;
    children: string | Element[];
  }
  export type Plugin = (element: Element) => Element | void;
} 