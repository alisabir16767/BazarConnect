import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewShopPage() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-2xl shadow-xl p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Create New Shop</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shopOwner">Shop Owner Id</Label>
              <Input type="text" id="shopOwner" placeholder="Enter Shop Owner Id" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input type="text" id="shopName" placeholder="Enter Shop Name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopDescription">Shop Description</Label>
              <Textarea id="shopDescription" placeholder="Type your shop description here..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" placeholder="Enter City" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input type="text" id="state" placeholder="Enter State" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input type="text" id="country" placeholder="Enter Country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input type="text" id="zipcode" placeholder="Enter Zip Code" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adress">Address</Label>
              <Input type="text" id="adress" placeholder="Enter Address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" placeholder="Select Category" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Images</Label>
              <Input type="file" id="image" />
            </div>

            <Button type="submit" className="w-full">
              Create Shop
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
