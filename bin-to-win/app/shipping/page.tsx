import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, Clock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ShippingPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Shipping Policy</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Information about our shipping methods, timeframes, and policies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Fast+Delivery"
                  alt="Fast delivery"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Fast & Reliable Delivery</h2>
                <p className="text-muted-foreground mb-4">
                  At Bin to Win, we understand the importance of timely delivery, especially for near-expiry products.
                  We've partnered with reliable shipping carriers to ensure your products arrive quickly and in perfect
                  condition.
                </p>
                <p className="text-muted-foreground">
                  Our shipping partners are trained to handle perishable items with care, maintaining appropriate
                  temperatures during transit to preserve product quality.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Shipping Methods</h2>
                <p className="text-muted-foreground mb-6">We offer several shipping options to meet your needs:</p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipping Method</TableHead>
                      <TableHead>Estimated Delivery Time</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Standard Shipping</TableCell>
                      <TableCell>2-3 business days</TableCell>
                      <TableCell>$4.99 (Free on orders over $35)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Express Shipping</TableCell>
                      <TableCell>Next business day</TableCell>
                      <TableCell>$9.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Same-Day Delivery</TableCell>
                      <TableCell>Same day (order by 11am)</TableCell>
                      <TableCell>$14.99 (Available in select areas)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">In-Store Pickup</TableCell>
                      <TableCell>1-2 hours</TableCell>
                      <TableCell>Free</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-4 text-sm text-muted-foreground">
                  <p>* Delivery times are estimates and may vary based on your location and product availability.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Shipping Restrictions</h2>
                <p className="text-muted-foreground mb-4">
                  Due to the nature of near-expiry products, we currently only ship within the United States. We're
                  unable to ship to PO boxes, APO/FPO addresses, or internationally at this time.
                </p>
                <p className="text-muted-foreground">
                  Certain products with very short shelf life may have limited shipping options or may only be available
                  for in-store pickup.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Order Processing</h2>
                <p className="text-muted-foreground mb-4">
                  Orders are typically processed within 24 hours of being placed. Orders placed after 2pm local time may
                  be processed the following business day.
                </p>
                <p className="text-muted-foreground">
                  During peak periods or promotional events, processing times may be slightly longer. We'll notify you
                  of any significant delays.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Tracking Your Order</h2>
                <p className="text-muted-foreground mb-4">
                  Once your order ships, you'll receive a shipping confirmation email with tracking information. You can
                  also track your order by logging into your account and viewing your order history.
                </p>
                <p className="text-muted-foreground">
                  If you have any questions about your shipment, please contact our customer service team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Shipping Delays</h2>
                <p className="text-muted-foreground mb-4">
                  While we strive to deliver all orders on time, occasionally delays may occur due to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">
                  <li>Severe weather conditions</li>
                  <li>Carrier delays</li>
                  <li>High volume periods (holidays, special promotions)</li>
                  <li>Incorrect or incomplete shipping information</li>
                </ul>
                <p className="text-muted-foreground">
                  We'll make every effort to notify you of any significant delays and provide updated delivery
                  estimates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Shipping to Multiple Addresses</h2>
                <p className="text-muted-foreground">
                  Currently, we can only ship to one address per order. If you need to ship to multiple addresses,
                  please place separate orders for each shipping destination.
                </p>
              </section>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Multiple shipping options to meet your needs, including same-day delivery in select areas.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Track your order in real-time from our warehouse to your doorstep.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Packaging</h3>
                <p className="text-muted-foreground">
                  Products are carefully packaged to maintain freshness and prevent damage during transit.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Have questions about shipping?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help with any shipping-related questions.
              </p>
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

