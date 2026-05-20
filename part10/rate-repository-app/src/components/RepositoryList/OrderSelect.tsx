import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Option,
} from "@/components/ui/select"
import type { TriggerRef } from "@rn-primitives/select"
import { useMemo, useRef } from "react"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RepositoriesQueryVariables } from "@/types"

const orderOptions = [
  { label: "Latest repositories", value: "latest" },
  { label: "Highest rated repositories", value: "highest" },
  { label: "Lowest rated repositories", value: "lowest" },
]

function OrderSelect({
  order,
  onOrderChange,
}: {
  order?: RepositoriesQueryVariables
  onOrderChange?: (order: RepositoriesQueryVariables) => void
}) {
  const ref = useRef<TriggerRef>(null)
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 0,
    right: 0,
  }

  const value = useMemo(() => {
    const findOption = (value: string) =>
      orderOptions.find((option) => option.value === value)

    if (order?.orderBy === "CREATED_AT") {
      return findOption("latest")
    } else if (order?.orderBy === "RATING_AVERAGE") {
      if (order.orderDirection === "ASC") {
        return findOption("lowest")
      } else {
        return findOption("highest")
      }
    }
  }, [order])

  const handleValueChange = (option: Option) => {
    switch (option?.value) {
      case "latest":
        onOrderChange?.({ orderBy: "CREATED_AT", orderDirection: "DESC" })
        break
      case "highest":
        onOrderChange?.({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" })
        break
      case "lowest":
        onOrderChange?.({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" })
        break
    }
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger ref={ref} className="h-14 w-full bg-transparent px-0">
        <SelectValue placeholder="Select an item..." className="text-base" />
      </SelectTrigger>
      <SelectContent
        insets={contentInsets}
        className="w-full rounded-none border-b border-none"
      >
        <SelectGroup>
          <SelectLabel>Select an item...</SelectLabel>
          {orderOptions.map(({ label, value }) => (
            <SelectItem key={value} label={label} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default OrderSelect
