/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Fetcher(...args: any[]) : Promise<any> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await fetch(...args);
  return res.json();
}
