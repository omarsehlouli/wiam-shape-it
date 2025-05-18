import { cn } from "@/lib/utils"

export const Button = ({ children, className, variant = "default", size = "default", ...props }) => {
  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  }

  const variantClasses = {
    default: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100",
    primary: "text-white bg-[#C4A24C] hover:bg-[#B39241]",
  }

  return (
    <button className={cn(sizeClasses[size], variantClasses[variant], className)} {...props}>
      {children}
    </button>
  )
}

