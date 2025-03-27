import 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    calendar(calendar: string): Dayjs;
  }
}

declare module 'jalaliday' {
  const jalaliday: any;
  export default jalaliday;
} 