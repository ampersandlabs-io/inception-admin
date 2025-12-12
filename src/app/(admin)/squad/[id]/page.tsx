"use client";

import { useParams } from "next/navigation"

export default function SquadDetailsPage() {

    const params = useParams()
    const id = params.id as string
  
    return (
      <div className="max-w-8xl mx-auto">
        {id}
      </div>
    )
  }
  