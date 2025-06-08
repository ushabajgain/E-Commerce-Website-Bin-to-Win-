import Link from "next/link"
import { ArrowRight, Lock, Shield, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              How we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground">Last Updated: March 15, 2025</p>
          </div>

          <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <section>
              <h2>Introduction</h2>
              <p>
                At Bin to Win ("we," "our," or "us"), we respect your privacy and are committed to protecting your
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website, use our mobile application, or interact with our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you
                have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not
                agree, please do not access or use our services.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <p>We may collect the following types of information:</p>

              <h3>Personal Information</h3>
              <ul>
                <li>Contact information (name, email address, phone number, shipping address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Profile information (preferences, shopping history)</li>
                <li>Communications with us (customer service inquiries, feedback)</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent on site, clicks)</li>
                <li>Location data (general location based on IP address)</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Create and manage your account</li>
                <li>Provide customer support</li>
                <li>Improve our products and services</li>
                <li>Send transactional emails (order confirmations, shipping updates)</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Personalize your shopping experience</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2>Sharing Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Service providers (payment processors, shipping companies, marketing partners)</li>
                <li>Retail partners (to fulfill orders and process returns)</li>
                <li>Legal authorities (when required by law or to protect our rights)</li>
                <li>Business partners (with your consent)</li>
              </ul>
              <p>
                We do not sell your personal information to third parties for their marketing purposes without your
                explicit consent.
              </p>
            </section>

            <section>
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities.
                These technologies help us analyze website traffic, customize content, and improve your experience.
              </p>
              <p>
                You can control cookies through your browser settings. However, disabling cookies may limit your ability
                to use certain features of our services.
              </p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Restrict or object to certain processing activities</li>
                <li>Request the transfer of your information to another service</li>
                <li>Withdraw consent for optional processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>
            </section>

            <section>
              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                updated Privacy Policy on our website and updating the "Last Updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting
                your information.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
                please contact us at:
              </p>
              <p>
                Email: privacy@bintowin.com
                <br />
                Phone: +1 (800) 123-4567
                <br />
                Address: 123 Sustainability Street, Green City, GC 10001, United States
              </p>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Data</h3>
              <p className="text-muted-foreground">
                We use industry-standard encryption to protect your personal information.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Privacy Controls</h3>
              <p className="text-muted-foreground">
                Manage your privacy preferences and control how your data is used.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                We're committed to being clear about how we collect and use your information.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Have questions about our privacy practices?</h2>
            <p className="text-muted-foreground mb-6">
              Our privacy team is here to help with any questions or concerns.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

