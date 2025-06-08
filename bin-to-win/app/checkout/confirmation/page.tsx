import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function OrderConfirmationPage() {
  // Mock order details
  const orderNumber = "ORD-12345678"
  const orderDate = new Date().toLocaleDateString()
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="font-medium">{estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">Credit Card</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/account/orders">
                  <Package className="mr-2 h-5 w-5" />
                  Track Order
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/categories">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold mb-2">What happens next?</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Order Processing</h3>
                  <p className="text-sm text-muted-foreground">We're preparing your items for shipment.</p>
                </div>
                <div className="p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-1">Order Shipped</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive a shipping confirmation email with tracking details.
                  </p>
                </div>
                <div className="p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Order Delivered</h3>
                  <p className="text-sm text-muted-foreground">Enjoy your near-expiry products and the savings!</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-muted-foreground mb-2">Have questions about your order?</p>
              <Link href="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

