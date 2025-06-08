"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  expiryDate: string;
  discountPercentage?: number;
  imageSrc?: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // If product is undefined, return null to prevent rendering
  if (!product) {
    return null;
  }

  const router = useRouter();
  const { addToCart, isLoading, isAuthenticated } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const {
    id,
    name,
    description,
    price,
    originalPrice,
    expiryDate,
    discountPercentage = Math.round(
      ((originalPrice - price) / originalPrice) * 100
    ),
    imageSrc = "/placeholder.svg",
  } = product;

  // Calculate days until expiry
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil(
    (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

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

    // Ensure we have a valid product ID
    if (!id) {
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
      const productId = typeof id === "string" ? parseInt(id, 10) : id;

      // Ensure ID is a valid number after conversion
      if (isNaN(productId) || productId <= 0) {
        throw new Error("Invalid product ID");
      }

      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
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
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={name}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="expiry-badge">{daysUntilExpiry} days left</span>
          <span className="discount-badge">{discountPercentage}% OFF</span>
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
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/product/${id}`} className="block">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Expires soon</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expires on {new Date(expiryDate).toLocaleDateString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          <span className="text-muted-foreground line-through text-sm">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={addingToCart || isLoading}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {addingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
