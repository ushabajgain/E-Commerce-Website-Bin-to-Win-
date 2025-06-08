import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Find answers to common questions about Bin to Win.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Bin to Win?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Bin to Win is a marketplace that connects consumers with retailers to save near-expiry products from
                    going to waste. We provide a platform where retailers can list products approaching their expiration
                    date at discounted prices, and consumers can purchase these products at significant savings.
                  </p>
                  <p>
                    Our mission is to reduce food waste while helping consumers save money and retailers recover costs
                    on products that would otherwise be discarded.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Are near-expiry products safe to consume?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Yes, near-expiry products are completely safe to consume before their expiration date. The "best
                    before" or "sell by" dates on products are typically conservative estimates set by manufacturers to
                    ensure optimal quality.
                  </p>
                  <p className="mb-2">
                    Products approaching these dates are still perfectly safe and maintain their quality when stored
                    properly. We ensure all products on our platform are handled and stored according to food safety
                    guidelines.
                  </p>
                  <p>
                    We recommend consuming products before their expiration date or freezing certain items to extend
                    their shelf life.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How much can I save on Bin to Win?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Customers typically save between 30-70% off regular retail prices on Bin to Win. The exact discount
                    depends on the product category and how close the item is to its expiration date.
                  </p>
                  <p>
                    Products with shorter remaining shelf life often have higher discounts, allowing you to maximize
                    your savings while helping reduce waste.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How does delivery work?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We offer several delivery options:</p>
                  <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Standard delivery (2-3 business days)</li>
                    <li>Express delivery (next day)</li>
                    <li>Same-day delivery in select areas</li>
                    <li>In-store pickup at participating retailers</li>
                  </ul>
                  <p>
                    Delivery fees vary based on your location and order size. Orders over $35 qualify for free standard
                    delivery. You can view all available delivery options during checkout.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I return products if I'm not satisfied?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Due to the nature of near-expiry products, we have a modified return policy. If you receive damaged
                    or incorrect items, we offer full refunds or replacements within 24 hours of delivery.
                  </p>
                  <p className="mb-2">
                    For quality issues, we assess each case individually. We cannot accept returns for products that
                    have passed their expiration date after delivery.
                  </p>
                  <p>
                    Please see our{" "}
                    <Link href="/returns" className="text-primary hover:underline">
                      Returns & Refunds Policy
                    </Link>{" "}
                    for complete details.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I become a retail partner?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Retailers interested in joining Bin to Win can apply through our partner application process. We
                    welcome grocery stores, supermarkets, specialty food shops, and other retailers with perishable
                    inventory.
                  </p>
                  <p className="mb-2">Benefits of becoming a partner include:</p>
                  <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Recovering costs on products that would otherwise be discarded</li>
                    <li>Reducing waste and improving sustainability metrics</li>
                    <li>Reaching environmentally conscious consumers</li>
                    <li>Access to our easy-to-use inventory management system</li>
                  </ul>
                  <p>
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact us
                    </Link>{" "}
                    to learn more about our partnership opportunities.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">We accept a variety of payment methods:</p>
                  <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Credit/debit cards (Visa, Mastercard, American Express, Discover)</li>
                    <li>PayPal</li>
                    <li>Apple Pay</li>
                    <li>Google Pay</li>
                    <li>Shop Pay</li>
                  </ul>
                  <p>All payments are processed securely through our encrypted payment system.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Once your order is confirmed, you'll receive a confirmation email with your order details. When your
                    order ships, you'll receive a shipping confirmation email with tracking information.
                  </p>
                  <p className="mb-2">You can also track your order by:</p>
                  <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Logging into your account and viewing your order history</li>
                    <li>Using the tracking number in your shipping confirmation email</li>
                    <li>Contacting our customer service team</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Currently, we only ship within the United States. Due to the nature of near-expiry products and
                    international shipping times, we cannot guarantee product quality for international shipments. We're
                    working on expanding our service to select international locations in the future.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>How can I contact customer service?</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Our customer service team is available to help you:</p>
                  <ul className="list-disc pl-6 mb-2 space-y-1">
                    <li>Email: support@bintowin.com</li>
                    <li>Phone: +1 (800) 123-4567 (Monday - Friday, 9am - 5pm EST)</li>
                    <li>Live chat: Available on our website during business hours</li>
                    <li>
                      Contact form: Available on our{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        Contact page
                      </Link>
                    </li>
                  </ul>
                  <p>We typically respond to all inquiries within 24 hours.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help you with any other questions you may have.
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

