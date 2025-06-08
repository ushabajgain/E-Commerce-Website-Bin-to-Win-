import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CategoriesPage() {
  // Mock categories
  const categories = [
    {
      name: "Food",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/food",
      description: "Fresh produce, pantry staples, and prepared meals",
      itemCount: 120,
    },
    {
      name: "Beverages",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/beverages",
      description: "Juices, sodas, coffee, tea, and more",
      itemCount: 85,
    },
    {
      name: "Dairy & Eggs",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/dairy-eggs",
      description: "Milk, cheese, yogurt, and eggs",
      itemCount: 45,
    },
    {
      name: "Bakery",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/bakery",
      description: "Bread, pastries, cakes, and desserts",
      itemCount: 60,
    },
    {
      name: "Snacks",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/snacks",
      description: "Chips, crackers, nuts, and dried fruits",
      itemCount: 95,
    },
    {
      name: "Household",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/household",
      description: "Cleaning supplies, paper products, and more",
      itemCount: 70,
    },
    {
      name: "Personal Care",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/personal-care",
      description: "Skincare, haircare, and hygiene products",
      itemCount: 55,
    },
    {
      name: "Baby Products",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/baby-products",
      description: "Baby food, diapers, and baby care items",
      itemCount: 30,
    },
    {
      name: "Pet Supplies",
      icon: <ShoppingBag className="h-8 w-8" />,
      href: "/categories/pet-supplies",
      description: "Pet food, treats, and pet care products",
      itemCount: 40,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Categories</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore our wide selection of discounted products across various categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="block">
                <div className="rounded-lg border shadow-sm h-full transition-colors hover:border-primary overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-primary">{category.icon}</div>
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                    </div>
                    <p className="text-muted-foreground mb-3">{category.description}</p>
                    <div className="mt-auto">
                      <span className="text-sm font-medium text-primary">{category.itemCount} products</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

