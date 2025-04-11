import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-wise-bright-green focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-wise-forest-green text-wise-bright-green",
        secondary:
          "border-transparent bg-wise-bright-green text-wise-forest-green",
        destructive:
          "border-transparent bg-wise-dark-maroon text-white",
        outline: "text-wise-forest-green border-wise-forest-green",
        happy: "border-transparent bg-wise-bright-green text-wise-forest-green",
        sad: "border-transparent bg-wise-bright-orange text-wise-forest-green",
        anxious: "border-transparent bg-wise-bright-yellow text-wise-forest-green",
        angry: "border-transparent bg-wise-dark-maroon text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
