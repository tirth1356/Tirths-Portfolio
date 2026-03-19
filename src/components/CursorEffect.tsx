import useCanvasCursor from '@/hooks/use-canvasCursor';

export function CursorEffect() {
  useCanvasCursor();
  return <canvas className="pointer-events-none fixed inset-0 z-[9999]" id="canvas" />;
}
