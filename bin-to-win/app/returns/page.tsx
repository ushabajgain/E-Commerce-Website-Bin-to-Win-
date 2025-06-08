import Link from "next/link"
import Image from "next/image"
import { ArrowRight, RefreshCcw, Clock, AlertCircle, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Returns & Refunds Policy</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Information about our returns process and refund policies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Returns+%26+Refunds"
                  alt="Returns and refunds"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">Our Return Policy</h2>
                <p className="text-muted-foreground mb-4">
                  At Bin to Win, we're committed to your satisfaction. However, due to the nature of near-expiry
                  products, we have a modified return policy compared to traditional retailers.
                </p>
                <p className="text-muted-foreground">
                  We carefully inspect all products before shipping to ensure they meet our quality standards, but we
                  understand that issues can occasionally arise.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Return Eligibility</h2>
                <p className="text-muted-foreground mb-4">You may be eligible for a return or refund if:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
                  <li>You received damaged products</li>
                  <li>You received incorrect items</li>
                  <li>The product quality is significantly below reasonable expectations</li>
                  <li>The product was already expired upon delivery</li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Important Note</h3>
                      <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                        Due to the nature of near-expiry products, we cannot accept returns for:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-yellow-700 dark:text-yellow-400 text-sm">
                        <li>Products that have passed their expiration date after delivery</li>
                        <li>Products that have been opened, partially consumed, or damaged after delivery</li>
                        <li>Products that were properly described and accurately represented on our website</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Return Process</h2>
                <p className="text-muted-foreground mb-4">To initiate a return:</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">
                  <li>Contact our customer service team within 24 hours of receiving your order</li>
                  <li>Provide your order number, the items you wish to return, and the reason for the return</li>
                  <li>Our team will review your request and provide instructions for the next steps</li>
                  <li>If approved, you'll receive a return authorization and shipping instructions</li>
                  <li>Return the items in their original packaging if possible</li>
                </ol>
                <p className="text-muted-foreground">
                  For perishable items, we may ask for photos to verify the condition or arrange for a pickup instead of
                  having you ship the items back.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Refund Options</h2>
                <p className="text-muted-foreground mb-4">
                  When your return is approved, you can choose from the following refund options:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
                  <li>Full refund to your original payment method</li>
                  <li>Store credit (with an additional 10% bonus)</li>
                  <li>Product replacement (subject to availability)</li>
                </ul>
                <p className="text-muted-foreground">
                  Refunds are typically processed within 3-5 business days after we receive and inspect the returned
                  items. Your bank may take additional time to post the refund to your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Do I have to pay for return shipping?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        If the return is due to our error (damaged, incorrect, or expired items), we'll cover the return
                        shipping costs. If the return is for other reasons, you may be responsible for the return
                        shipping costs.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What if only part of my order is damaged?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        You can return just the damaged items. We'll issue a partial refund for those specific items
                        while you keep the rest of your order.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How long do I have to report issues with my order?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Due to the nature of near-expiry products, we ask that you inspect your items immediately upon
                        delivery and report any issues within 24 hours. This allows us to resolve the issue quickly
                        while the products are still within their shelf life.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I return an item if I simply changed my mind?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Unfortunately, due to the short shelf life of our products, we cannot accept returns for change
                        of mind. We encourage you to carefully review your order before completing your purchase.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What if I'm not home to receive my delivery?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        If you're not home to receive your delivery and the products are damaged due to being left
                        outside, we'll assess each case individually. We recommend selecting a delivery time when you'll
                        be available or choosing the in-store pickup option.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Quick Response</h3>
                <p className="text-muted-foreground">
                  We process return requests within 24 hours to ensure timely resolution.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <RefreshCcw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Flexible Options</h3>
                <p className="text-muted-foreground">
                  Choose from refunds, store credit, or product replacements based on your preference.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  We stand behind the quality of our products despite their near-expiry status.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Need to initiate a return?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is ready to assist you with the return process.
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

