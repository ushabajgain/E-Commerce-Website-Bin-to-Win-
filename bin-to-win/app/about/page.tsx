import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Recycle, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Bin to Win</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our mission is to reduce waste, save money, and create a more sustainable future.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="About Bin to Win"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  Bin to Win was founded in 2023 with a simple yet powerful idea: to create a marketplace that connects
                  consumers with retailers to save near-expiry products from going to waste.
                </p>
                <p className="text-muted-foreground">
                  Our founder, Jane Smith, was shocked to learn that approximately one-third of all food produced
                  globally is wasted. This realization sparked the idea for a platform that could help reduce this waste
                  while providing consumers with quality products at discounted prices.
                </p>
                <p className="text-muted-foreground">
                  Since our launch, we've partnered with hundreds of retailers across the country and have saved
                  thousands of products from ending up in landfills. Our community of conscious consumers continues to
                  grow, and together, we're making a significant impact on reducing waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Mission & Values</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                We're driven by a commitment to sustainability, community, and accessibility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reduce Waste</h3>
                <p className="text-muted-foreground">
                  We're committed to preventing perfectly good products from ending up in landfills, reducing
                  environmental impact and resource waste.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  We ensure all products on our platform are safe and of high quality, despite being near their
                  expiration date.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We promote sustainable consumption habits and help build a circular economy where resources are used
                  efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Impact</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Together with our community, we're making a real difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">5,000+</h3>
                <p className="text-xl font-medium">Tons of Food Saved</p>
                <p className="text-muted-foreground">Equivalent to feeding over 10,000 families for a month</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">$2M+</h3>
                <p className="text-xl font-medium">Customer Savings</p>
                <p className="text-muted-foreground">Our customers save an average of 60% on their purchases</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-primary">500+</h3>
                <p className="text-xl font-medium">Partner Retailers</p>
                <p className="text-muted-foreground">Local and national retailers working together to reduce waste</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Join Our Mission</h2>
              <p className="max-w-[700px] md:text-xl">Be part of the solution to reduce waste and save money.</p>
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

