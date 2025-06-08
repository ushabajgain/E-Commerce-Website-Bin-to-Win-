"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DealsPage() {
  const [sortBy, setSortBy] = useState("discount");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock deals data
  const todayDeals = [
    {
      id: "1",
      name: "Organic Pasta",
      description: "Premium Italian pasta",
      price: 2.99,
      originalPrice: 7.99,
      expiryDate: "2025-03-20",
      discountPercentage: 63,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "2",
      name: "Chocolate Cookies",
      description: "Crunchy chocolate chip cookies",
      price: 1.49,
      originalPrice: 4.99,
      expiryDate: "2025-03-19",
      discountPercentage: 70,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "3",
      name: "Almond Milk",
      description: "Unsweetened almond milk",
      price: 1.99,
      originalPrice: 3.99,
      expiryDate: "2025-03-21",
      discountPercentage: 50,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Beverages",
    },
    {
      id: "4",
      name: "Protein Bars",
      description: "High protein snack bars",
      price: 4.99,
      originalPrice: 12.99,
      expiryDate: "2025-03-22",
      discountPercentage: 62,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "5",
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt",
      price: 0.99,
      originalPrice: 2.99,
      expiryDate: "2025-03-18",
      discountPercentage: 67,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Dairy",
    },
    {
      id: "6",
      name: "Fresh Bread",
      description: "Artisan sourdough bread",
      price: 1.99,
      originalPrice: 4.99,
      expiryDate: "2025-03-17",
      discountPercentage: 60,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Bakery",
    },
  ];

  const weeklyDeals = [
    {
      id: "7",
      name: "Organic Eggs",
      description: "Free-range organic eggs",
      price: 2.49,
      originalPrice: 5.99,
      expiryDate: "2025-03-25",
      discountPercentage: 58,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Dairy",
    },
    {
      id: "8",
      name: "Granola",
      description: "Crunchy granola with nuts and dried fruits",
      price: 3.49,
      originalPrice: 7.99,
      expiryDate: "2025-03-26",
      discountPercentage: 56,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "9",
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 2.29,
      originalPrice: 4.99,
      expiryDate: "2025-03-24",
      discountPercentage: 54,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Beverages",
    },
    {
      id: "10",
      name: "Hummus",
      description: "Creamy chickpea hummus",
      price: 1.79,
      originalPrice: 3.99,
      expiryDate: "2025-03-27",
      discountPercentage: 55,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
  ];

  const flashDeals = [
    {
      id: "11",
      name: "Salsa",
      description: "Spicy tomato salsa",
      price: 1.99,
      originalPrice: 4.49,
      expiryDate: "2025-03-18",
      discountPercentage: 56,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "12",
      name: "Tortilla Chips",
      description: "Crunchy corn tortilla chips",
      price: 1.49,
      originalPrice: 3.49,
      expiryDate: "2025-03-19",
      discountPercentage: 57,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Food",
    },
    {
      id: "13",
      name: "Avocados",
      description: "Ripe Hass avocados",
      price: 0.99,
      originalPrice: 2.49,
      expiryDate: "2025-03-18",
      discountPercentage: 60,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Produce",
    },
    {
      id: "14",
      name: "Blueberries",
      description: "Fresh organic blueberries",
      price: 2.99,
      originalPrice: 6.99,
      expiryDate: "2025-03-19",
      discountPercentage: 57,
      imageSrc: "/placeholder.svg?height=300&width=300",
      category: "Produce",
    },
  ];

  // Sort products based on selected option
  const sortProducts = (products: any[]) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "expiry":
          return (
            new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "discount":
          return b.discountPercentage - a.discountPercentage;
        default:
          return 0;
      }
    });
  };

  const sortedTodayDeals = sortProducts(todayDeals);
  const sortedWeeklyDeals = sortProducts(weeklyDeals);
  const sortedFlashDeals = sortProducts(flashDeals);

  // Get all unique categories
  const allDeals = [...todayDeals, ...weeklyDeals, ...flashDeals];
  const categories = Array.from(new Set(allDeals.map((deal) => deal.category)));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center justify-center bg-primary-foreground/10 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-2">
                <Clock className="mr-1 h-4 w-4" />
                Limited Time Offers
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Today's Hot Deals
              </h1>
              <p className="max-w-[700px] md:text-xl">
                Save up to 70% on near-expiry products. New deals added daily!
              </p>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <p className="text-muted-foreground">
                Showing {allDeals.length} deals with discounts up to 70% off
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filter Deals</SheetTitle>
                    <SheetDescription>
                      Narrow down deals by category, discount, and more.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="category"
                    >
                      <AccordionItem value="category">
                        <AccordionTrigger>Category</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <div
                                key={category}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox id={`category-${category}`} />
                                <Label htmlFor={`category-${category}`}>
                                  {category}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="discount">
                        <AccordionTrigger>Discount</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="discount-50" />
                              <Label htmlFor="discount-50">50% or more</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="discount-60" />
                              <Label htmlFor="discount-60">60% or more</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="discount-70" />
                              <Label htmlFor="discount-70">70% or more</Label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-under-2" />
                              <Label htmlFor="price-under-2">Under $2</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-2-5" />
                              <Label htmlFor="price-2-5">$2 - $5</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="price-over-5" />
                              <Label htmlFor="price-over-5">Over $5</Label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="expiry">
                        <AccordionTrigger>Expiry Date</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="expiry-today" />
                              <Label htmlFor="expiry-today">Today</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="expiry-tomorrow" />
                              <Label htmlFor="expiry-tomorrow">Tomorrow</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="expiry-week" />
                              <Label htmlFor="expiry-week">This week</Label>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      Reset
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Biggest Discount</SelectItem>
                    <SelectItem value="expiry">Expiring Soon</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <Tabs defaultValue="today" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
                <TabsTrigger
                  value="today"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Today's Deals
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Weekly Deals
                </TabsTrigger>
                <TabsTrigger
                  value="flash"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Flash Deals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedTodayDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="weekly">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedWeeklyDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="flash">
                <div className="bg-urgent/10 border border-urgent rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-urgent" />
                    <p className="font-medium text-urgent">
                      Flash deals end in 5 hours! Limited quantities available.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedFlashDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Deal Categories */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Shop Deals by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${category.toLowerCase()}`}
                    className="group relative overflow-hidden rounded-lg h-40"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt={category}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <h3 className="text-white font-bold text-xl">
                        {category}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Newsletter */}
            <section className="bg-muted rounded-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    Get Notified About New Deals
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter and be the first to know about
                    exclusive deals and discounts.
                  </p>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full md:w-64"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
