import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Truck, CreditCard, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Bin to Win Works</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover how our platform connects retailers with consumers to reduce waste and save money.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="How Bin to Win Works"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Approach</h2>
                <p className="text-muted-foreground">
                  Bin to Win is a marketplace that connects consumers with retailers to save near-expiry products from
                  going to waste. We provide a platform where retailers can list products approaching their expiration
                  date at discounted prices, and consumers can purchase these products at significant savings.
                </p>
                <p className="text-muted-foreground">
                  Our platform is designed to be simple and efficient, making it easy for both retailers and consumers
                  to participate in reducing waste while benefiting financially. By extending the lifecycle of products
                  that would otherwise be discarded, we're creating a more sustainable future.
                </p>
                <Button asChild>
                  <Link href="/register">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">For Consumers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Save money on quality products while helping reduce waste.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4 relative">
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Browse Products</h3>
                <p className="text-muted-foreground">
                  Explore our wide selection of discounted near-expiry products across various categories.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4 relative">
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Add to Cart</h3>
                <p className="text-muted-foreground">
                  Select the products you want and add them to your cart. Check expiry dates and discounts.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4 relative">
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Checkout</h3>
                <p className="text-muted-foreground">
                  Complete your purchase securely. Enjoy savings of up to 70% off regular prices.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4 relative">
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Receive Products</h3>
                <p className="text-muted-foreground">
                  Get your products delivered or pick them up from the retailer. Enjoy your savings!
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link href="/categories">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">For Retailers</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Reduce waste, recover costs, and connect with conscious consumers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">List Products</h3>
                <p className="text-muted-foreground">
                  Easily list your near-expiry products on our platform. Set discounted prices and manage inventory.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Recover Costs</h3>
                <p className="text-muted-foreground">
                  Recoup costs on products that would otherwise be discarded. Increase revenue and reduce waste.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Make an Impact</h3>
                <p className="text-muted-foreground">
                  Contribute to sustainability efforts and build a positive brand image as an environmentally conscious
                  business.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link href="/register">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
              <p className="max-w-[700px] md:text-xl">
                Join our community of conscious consumers and retailers making a difference.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Button asChild size="lg" variant="secondary" className="font-bold">
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
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

