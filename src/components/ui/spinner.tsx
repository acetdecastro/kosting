import { LoaderCircle, type LucideProps } from "lucide-react";
import { cn } from "@src/lib/utils";

function Spinner({ className, ...props }: LucideProps) {
  return <LoaderCircle className={cn("animate-spin", className)} {...props} />;
}

export { Spinner };
