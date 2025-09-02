import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center space-y-8">
        <Skeleton className="h-12 w-48" />
        <div className="space-y-4 text-center">
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-80" />
            <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}