import Link from "next/link"
import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  icon: ReactNode
  href: string
}

export function CategoryCard({ name, icon, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden h-full transition-colors hover:border-primary">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-primary">{icon}</div>
          <h3 className="font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

