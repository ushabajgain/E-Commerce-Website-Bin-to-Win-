"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [sortBy, setSortBy] = useState("expiry");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Format category name for display
  const categoryName = params.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Mock products
  const products = [
    {
      id: "1",
      name: "Organic Pasta",
      description: "Premium Italian pasta",
      price: 2.99,
      originalPrice: 7.99,
      expiryDate: "2025-03-20",
      discountPercentage: 63,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Organic Delights",
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
      brand: "Sweet Treats",
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
      brand: "Nutty Farms",
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
      brand: "Fitness Fuel",
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
      brand: "Dairy Delight",
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
      brand: "Bakery Bliss",
    },
    {
      id: "7",
      name: "Organic Eggs",
      description: "Free-range organic eggs",
      price: 2.49,
      originalPrice: 5.99,
      expiryDate: "2025-03-19",
      discountPercentage: 58,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Farm Fresh",
    },
    {
      id: "8",
      name: "Granola",
      description: "Crunchy granola with nuts and dried fruits",
      price: 3.49,
      originalPrice: 7.99,
      expiryDate: "2025-03-23",
      discountPercentage: 56,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Healthy Harvest",
    },
    {
      id: "9",
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 2.29,
      originalPrice: 4.99,
      expiryDate: "2025-03-18",
      discountPercentage: 54,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Citrus Squeeze",
    },
    {
      id: "10",
      name: "Hummus",
      description: "Creamy chickpea hummus",
      price: 1.79,
      originalPrice: 3.99,
      expiryDate: "2025-03-19",
      discountPercentage: 55,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Mediterranean Delights",
    },
    {
      id: "11",
      name: "Salsa",
      description: "Spicy tomato salsa",
      price: 1.99,
      originalPrice: 4.49,
      expiryDate: "2025-03-20",
      discountPercentage: 56,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Spice Haven",
    },
    {
      id: "12",
      name: "Tortilla Chips",
      description: "Crunchy corn tortilla chips",
      price: 1.49,
      originalPrice: 3.49,
      expiryDate: "2025-03-25",
      discountPercentage: 57,
      imageSrc: "/placeholder.svg?height=300&width=300",
      brand: "Crunch Time",
    },
  ];

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="mb-6">
            <Link
              href="/categories"
              className="inline-flex items-center text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="text-muted-foreground">
                {products.length} products with discounts up to 70% off
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Narrow down products by brand, price range, and more.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      defaultValue="brand"
                    >
                      <AccordionItem value="brand">
                        <AccordionTrigger>Brand</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {Array.from(
                              new Set(products.map((product) => product.brand))
                            ).map((brand) => (
                              <div
                                key={brand}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox id={`brand-${brand}`} />
                                <Label htmlFor={`brand-${brand}`}>
                                  {brand}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
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
                    <SelectItem value="expiry">Expiring Soon</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="discount">Biggest Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block">
              <div className="sticky top-20 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Filters</h3>
                  <Button variant="outline" size="sm" className="mb-4">
                    Reset All
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Brand</h4>
                  <div className="space-y-2">
                    {Array.from(
                      new Set(products.map((product) => product.brand))
                    ).map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={`desktop-brand-${brand}`} />
                        <Label htmlFor={`desktop-brand-${brand}`}>
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-price-under-2" />
                      <Label htmlFor="desktop-price-under-2">Under $2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-price-2-5" />
                      <Label htmlFor="desktop-price-2-5">$2 - $5</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-price-over-5" />
                      <Label htmlFor="desktop-price-over-5">Over $5</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Discount</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-discount-50" />
                      <Label htmlFor="desktop-discount-50">50% or more</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-discount-60" />
                      <Label htmlFor="desktop-discount-60">60% or more</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-discount-70" />
                      <Label htmlFor="desktop-discount-70">70% or more</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Expiry Date</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-expiry-today" />
                      <Label htmlFor="desktop-expiry-today">Today</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-expiry-tomorrow" />
                      <Label htmlFor="desktop-expiry-tomorrow">Tomorrow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="desktop-expiry-week" />
                      <Label htmlFor="desktop-expiry-week">This week</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
