import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  ArrowRight,
  Clock,
  Leaf,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container px-4 md:px-6 py-10 md:py-14 lg:py-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Save Money, Save Food,{" "}
                    <span className="text-primary">Win Big!</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover amazing deals on near-expiry products. Shop smart,
                    reduce waste, and save up to 70% on everyday items.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="font-bold">
                    <Link href="/categories">
                      Browse Deals
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Shopping cart with discounted products"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                  <div className="absolute -right-4 -top-4 bg-urgent text-urgent-foreground font-bold px-4 py-2 rounded-full text-lg">
                    Up to 70% OFF
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Save Money</h3>
                <p className="text-muted-foreground">
                  Get incredible discounts on quality products nearing their
                  expiration date.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Reduce Waste</h3>
                <p className="text-muted-foreground">
                  Help prevent perfectly good products from ending up in
                  landfills.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Act Fast</h3>
                <p className="text-muted-foreground">
                  Limited-time offers that update daily. Don't miss out on great
                  deals!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Shop by Category
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse our wide selection of discounted products across various
                categories.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              <CategoryCard
                name="Food"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/food"
              />
              <CategoryCard
                name="Beverages"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/beverages"
              />
              <CategoryCard
                name="Household"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/household"
              />
              <CategoryCard
                name="Personal Care"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/personal-care"
              />
              <CategoryCard
                name="Baby Products"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/baby-products"
              />
              <CategoryCard
                name="Pet Supplies"
                icon={<ShoppingBag className="h-8 w-8" />}
                href="/categories/pet-supplies"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Today's Hot Deals
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                These items are selling fast! Grab them before they're gone.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              <ProductCard
                product={{
                  id: "1",
                  name: "Organic Pasta",
                  description: "Premium Italian pasta",
                  price: 2.99,
                  originalPrice: 7.99,
                  expiryDate: "2025-03-20",
                  discountPercentage: 63,
                  imageSrc: "/placeholder.svg?height=300&width=300",
                }}
              />
              <ProductCard
                product={{
                  id: "2",
                  name: "Chocolate Cookies",
                  description: "Crunchy chocolate chip cookies",
                  price: 1.49,
                  originalPrice: 4.99,
                  expiryDate: "2025-03-19",
                  discountPercentage: 70,
                  imageSrc: "/placeholder.svg?height=300&width=300",
                }}
              />
              <ProductCard
                product={{
                  id: "3",
                  name: "Almond Milk",
                  description: "Unsweetened almond milk",
                  price: 1.99,
                  originalPrice: 3.99,
                  expiryDate: "2025-03-21",
                  discountPercentage: 50,
                  imageSrc: "/placeholder.svg?height=300&width=300",
                }}
              />
              <ProductCard
                product={{
                  id: "4",
                  name: "Protein Bars",
                  description: "High protein snack bars",
                  price: 4.99,
                  originalPrice: 12.99,
                  expiryDate: "2025-03-22",
                  discountPercentage: 62,
                  imageSrc: "/placeholder.svg?height=300&width=300",
                }}
              />
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/deals">
                  View All Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    alt="Environmental impact"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Our Impact
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Together with our community, we've made a significant
                    difference:
                  </p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded-full mt-1">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">5,000+ tons of food saved</p>
                      <p className="text-muted-foreground">
                        That's equivalent to feeding over 10,000 families for a
                        month.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded-full mt-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">$2 million saved by customers</p>
                      <p className="text-muted-foreground">
                        Our customers save an average of 60% on their purchases.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 p-1 rounded-full mt-1">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">500+ partner retailers</p>
                      <p className="text-muted-foreground">
                        Local and national retailers working together to reduce
                        waste.
                      </p>
                    </div>
                  </li>
                </ul>
                <div>
                  <Button asChild variant="outline">
                    <Link href="/about">Learn More About Our Mission</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Saving?
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Join thousands of smart shoppers who are saving money and
                reducing waste.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="font-bold"
                >
                  <Link href="/register">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
                >
                  <Link href="/deals">Browse Deals</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
