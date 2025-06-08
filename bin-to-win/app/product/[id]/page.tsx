"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isLoading: cartLoading, isAuthenticated } = useCart();
  const { toast } = useToast();
  const [addingToCart, setAddingToCart] = useState(false);
  const router = useRouter();

  // Mock product data
  const product = {
    id: params.id,
    name: "Organic Pasta",
    description:
      "Premium Italian pasta made with organic ingredients. Perfect for a quick and delicious meal.",
    longDescription:
      "Our premium organic pasta is sourced directly from small Italian farms that use traditional methods passed down through generations. Made with 100% organic durum wheat semolina, this pasta offers an authentic taste and perfect texture every time. The pasta holds sauce exceptionally well and cooks to al dente perfection in just 8-10 minutes. Each package contains 500g of pasta, enough for 4-5 servings.",
    price: 2.99,
    originalPrice: 7.99,
    expiryDate: "2025-03-20",
    discountPercentage: 63,
    stock: 15,
    brand: "Organic Delights",
    category: "Food",
    subcategory: "Pasta & Noodles",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    nutritionalInfo: {
      servingSize: "100g",
      calories: 350,
      protein: "12g",
      carbs: "70g",
      fat: "1.5g",
      fiber: "3g",
    },
    ingredients: "Organic durum wheat semolina, water",
    storageInstructions:
      "Store in a cool, dry place. Once opened, store in an airtight container.",
    allergens: "Contains wheat. May contain traces of eggs.",
  };

  // Calculate days until expiry
  const today = new Date();
  const expiry = new Date(product.expiryDate);
  const daysUntilExpiry = Math.ceil(
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Mock related products
  const relatedProducts = [
    {
      id: "101",
      name: "Tomato Pasta Sauce",
      description: "Authentic Italian tomato sauce",
      price: 1.99,
      originalPrice: 4.99,
      expiryDate: "2025-03-22",
      discountPercentage: 60,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "102",
      name: "Parmesan Cheese",
      description: "Aged Italian hard cheese",
      price: 3.49,
      originalPrice: 8.99,
      expiryDate: "2025-03-25",
      discountPercentage: 61,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "103",
      name: "Extra Virgin Olive Oil",
      description: "Cold-pressed olive oil",
      price: 5.99,
      originalPrice: 12.99,
      expiryDate: "2025-04-15",
      discountPercentage: 54,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "104",
      name: "Garlic Bread",
      description: "Ready to bake garlic bread",
      price: 1.49,
      originalPrice: 3.99,
      expiryDate: "2025-03-18",
      discountPercentage: 63,
      imageSrc: "/placeholder.svg?height=300&width=300",
    },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });

      router.push("/login");
      return;
    }

    // Validate product ID
    if (!product.id) {
      toast({
        title: "Error",
        description: "Invalid product. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAddingToCart(true);
      // Convert ID to number if it's a string
      const productId =
        typeof product.id === "string" ? parseInt(product.id, 10) : product.id;

      // Ensure ID is a valid number after conversion
      if (isNaN(productId) || productId <= 0) {
        throw new Error("Invalid product ID");
      }

      await addToCart(productId, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-6 md:py-10">
          <div className="mb-6">
            <Link
              href="/categories/food"
              className="inline-flex items-center text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Food
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.images[currentImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="expiry-badge">
                    {daysUntilExpiry} days left
                  </span>
                  <span className="discount-badge">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-destructive text-destructive" : ""
                    }`}
                  />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 overflow-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-20 rounded-md border overflow-hidden flex-shrink-0 ${
                      currentImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Link
                    href={`/brands/${product.brand
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="hover:text-primary"
                  >
                    {product.brand}
                  </Link>
                  <span>•</span>
                  <Link
                    href={`/categories/${product.category.toLowerCase()}`}
                    className="hover:text-primary"
                  >
                    {product.category}
                  </Link>
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-muted-foreground mt-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-muted-foreground line-through text-lg">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm font-bold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    Expires in {daysUntilExpiry} days (
                    {new Date(product.expiryDate).toLocaleDateString()})
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <div className="h-8 px-4 flex items-center justify-center border-y">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} available
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={addingToCart || cartLoading}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {addingToCart ? "Adding..." : "Add to Cart"}
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Heart
                      className={`mr-2 h-5 w-5 ${
                        isWishlisted ? "fill-destructive text-destructive" : ""
                      }`}
                    />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free delivery on orders over $35</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>
                    Quality guaranteed despite approaching expiry date
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger
                  value="nutrition"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Nutrition & Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="storage"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Storage & Allergens
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="prose max-w-none">
                  <p>{product.longDescription}</p>
                  <ul className="mt-4 space-y-2">
                    <li>
                      <strong>Brand:</strong> {product.brand}
                    </li>
                    <li>
                      <strong>Category:</strong> {product.category} /{" "}
                      {product.subcategory}
                    </li>
                    <li>
                      <strong>Best Before:</strong>{" "}
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </li>
                    <li>
                      <strong>Package Size:</strong> 500g
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Nutritional Information
                    </h3>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Serving Size</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.servingSize}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Calories</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.calories}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Protein</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.protein}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Carbohydrates</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.carbs}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Fat</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.fat}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2">Fiber</td>
                          <td className="py-2 text-right">
                            {product.nutritionalInfo.fiber}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                    <p>{product.ingredients}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="storage" className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Storage Instructions
                    </h3>
                    <p>{product.storageInstructions}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Allergen Information
                    </h3>
                    <p>{product.allergens}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
