import * as React from "react"

import { cn } from "../../../utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-20 w-full rounded-md border border-wise-forest-green/20 bg-white px-3 py-2 text-sm shadow-none placeholder:text-wise-forest-green/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wise-bright-green disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
