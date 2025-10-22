"use client"

import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { theme } from "@/lib/theme"

interface TermsAgreementProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  id?: string
  className?: string
}

export function TermsAgreement({ checked, onCheckedChange, id = "terms", className = "" }: TermsAgreementProps) {
  return (
    <div className={`flex items-start space-x-3 ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        className="mt-0.5 h-6 w-6 rounded-sm data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white border-2 border-gray-300 flex-shrink-0"
      />
      <Label htmlFor={id} className="text-base leading-6 text-slate-800 font-normal flex flex-wrap items-center gap-1">{/* eslint-disable-next-line react/no-unescaped-entities */}
{/* eslint-disable-next-line react/no-unescaped-entities */}
        <span>I agree to Ampersand&apos;s</span>      
        <Link href="/terms" className="hover:underline font-medium" style={{ color: theme.colors.primary.lightBlue }}>
          Terms of Service
        </Link>
        <span>&</span>
        <Link href="/privacy" className="hover:underline font-medium" style={{ color: theme.colors.primary.lightBlue }}>
          Privacy Policy
        </Link>
      </Label>
    </div>
  )
}
