import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Chandigarh University - Canteen </CardTitle>
      </CardHeader>
      <CardContent>

<img className="h-auto max-w-full" src="https://i.guim.co.uk/img/media/d543b9f0fb5a827b3908c72d4091bc9e1d5e2841/0_303_8214_4928/master/8214.jpg?width=1200&quality=85&auto=format&fit=max&s=e082f028060b9b9a0d4e5af258a09541" alt="image description" />

<CardDescription>The Chandigarh University Canteen website offers a convenient platform for students and staff to explore diverse, delicious, and healthy meal options on campus. Enjoy quick ordering, daily specials, and real-time updates on food availability right at your fingertips.</CardDescription>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Shop Now</Button>
      </CardFooter>
    </Card>
  )
}
