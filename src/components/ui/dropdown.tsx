'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils' 
import React from 'react'

type DropdownProps = {
    trigger: React.ReactNode
    items: {
      label: string
      onClick?: () => void
      icon?: React.ReactNode
      className?: string
    }[]
    align?: 'start' | 'center' | 'end'
    side?: 'top' | 'right' | 'bottom' | 'left'
  }
  
  export function Dropdown({
    trigger,
    items,
    align = 'end',
    side = 'bottom',
  }: DropdownProps) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
  
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={side}
            align={align}
            className={cn(
              'z-50 min-w-[150px] rounded-md bg-white shadow-md border border-gray-100 p-1',
              'animate-in fade-in-80 slide-in-from-top-2'
            )}
          >
            {items.map((item, i) => (
              <DropdownMenu.Item
                key={i}
                onClick={item.onClick}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm text-gray-700 cursor-pointer rounded-md focus:outline-none hover:bg-gray-100',
                  item.className
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span>{item.label}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }