"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RetailerLayout } from "@/components/retailer-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Convert FileList to array and create URLs
    const fileArray = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...fileArray])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to products page
    router.push("/retailer/products")
  }

  return (
    <RetailerLayout>
      <div className="mb-6">
        <Link href="/retailer/products" className="inline-flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>Enter the basic details about your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="e.g. Organic Pasta" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your product..." className="min-h-[100px]" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="household">Household</SelectItem>
                      <SelectItem value="personal-care">Personal Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" placeholder="e.g. Organic Delights" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients (optional)</Label>
                <Textarea id="ingredients" placeholder="List the ingredients..." className="min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage">Storage Instructions (optional)</Label>
                <Input id="storage" placeholder="e.g. Store in a cool, dry place" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens (optional)</Label>
                <Input id="allergens" placeholder="e.g. Contains wheat, milk" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>Set the pricing and inventory details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="original-price">Original Price ($)</Label>
                    <Input id="original-price" type="number" step="0.01" min="0" placeholder="e.g. 7.99" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discounted-price">Discounted Price ($)</Label>
                    <Input id="discounted-price" type="number" step="0.01" min="0" placeholder="e.g. 2.99" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" min="1" placeholder="e.g. 20" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (optional)</Label>
                    <Input id="sku" placeholder="e.g. ORG-PST-001" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight/Size (optional)</Label>
                    <Input id="weight" placeholder="e.g. 500g" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload images of your product. The first image will be used as the main image.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}

                  <Label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed cursor-pointer hover:bg-muted/50"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload Image</span>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add Product"}
          </Button>
        </div>
      </form>
    </RetailerLayout>
  )
}

