export default function ipDetection(req: Request): string {
  const cf = (req as any).cf;
  return cf?.country || "XX";
}
