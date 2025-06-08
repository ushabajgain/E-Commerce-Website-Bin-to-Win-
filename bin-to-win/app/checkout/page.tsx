"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock cart items
  const cartItems = [
    {
      id: "1",
      name: "Organic Pasta",
      price: 2.99,
      originalPrice: 7.99,
      quantity: 2,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Chocolate Cookies",
      price: 1.49,
      originalPrice: 4.99,
      quantity: 1,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Almond Milk",
      price: 1.99,
      originalPrice: 3.99,
      quantity: 3,
      imageSrc: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const shipping = subtotal >= 35 ? 0 : 4.99
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to confirmation page
    router.push("/checkout/confirmation")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="mb-6">
            <Link href="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Accordion type="single" collapsible defaultValue="shipping" className="w-full">
                  <AccordionItem value="shipping" className="border rounded-lg shadow-sm mb-6">
                    <AccordionTrigger className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold">Shipping Information</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone number</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postal-code">Postal code</Label>
                            <Input id="postal-code" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select defaultValue="us">
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="delivery-instructions">Delivery instructions (optional)</Label>
                          <Textarea id="delivery-instructions" placeholder="Special instructions for delivery" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="save-address" />
                          <label
                            htmlFor="save-address"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save this address for future orders
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment" className="border rounded-lg shadow-sm mb-6">
                    <AccordionTrigger className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold">Payment Method</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <RadioGroup defaultValue="card" className="grid gap-4">
                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-5 w-5" />
                              <span>Credit / Debit Card</span>
                            </div>
                          </Label>
                        </div>

                        <div className="grid gap-4 pl-6">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry date</Label>
                              <Input id="expiry" placeholder="MM/YY" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on card</Label>
                            <Input id="name-on-card" required />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-paypal"
                              >
                                <path d="M7 11.5l1.5-9H13c2.2 0 3.8 1.3 4.2 3.8.5 2.7-.7 4.8-3.2 5.2h-4L9 18.5" />
                                <path d="M10 11.5l1.5-9H16c2.2 0 3.8 1.3 4.2 3.8.5 2.7-.7 4.8-3.2 5.2h-4L12 18.5" />
                              </svg>
                              <span>PayPal</span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border p-4">
                          <RadioGroupItem value="apple-pay" id="apple-pay" />
                          <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-apple"
                              >
                                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                                <path d="M10 2c1 .5 2 2 2 5" />
                              </svg>
                              <span>Apple Pay</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="review" className="border rounded-lg shadow-sm">
                    <AccordionTrigger className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold">Review Order</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Items in your order</h3>
                          <div className="space-y-3">
                            {cartItems.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.imageSrc || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                  <p className="text-sm text-muted-foreground line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                              terms of service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                              privacy policy
                            </Link>
                          </label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </form>
            </div>

            <div>
              <div className="rounded-lg border shadow-sm sticky top-20">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>You save</span>
                      <span>${savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Secure payment processing with end-to-end encryption</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Fast delivery with tracking available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

