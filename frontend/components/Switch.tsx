import { Label } from "@/components/ui/label/label"
import { Switch } from "@/components/ui/ switch/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
       


    </div>
  )
}
