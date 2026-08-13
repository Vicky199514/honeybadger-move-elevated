import logoAsset from "@/assets/logo-runner.png.asset.json";
import { cn } from "@/lib/utils";

/** Brand mark: the blue/orange running figure, on the ink canvas. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt=""
      aria-hidden="true"
      width={96}
      height={96}
      loading="eager"
      decoding="async"
      className={cn("size-8 object-contain", className)}
    />
  );
}
