"use client"
import { Button, Input, useToast } from "@medusajs/ui"
import axios from "axios"
import { useState } from "react"

export default function NewsletterForm() {
  const {toast}=useToast()
  const [email, setEmail] = useState("")

  function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) {
      return
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/mailchimp/subscribe`,
        {
          email,
        }
      )
      .then((e) => {
        toast({
          title: "Success",
          description: "Subscribed successfully!",
          disableDismiss: true,
          variant:"success"

        })
        
        setEmail("")
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: "Error",
          description: "An error occurred",
          disableDismiss: true,
          variant:"error"
        })
      })
  }

  return (
    <form onSubmit={subscribe}>
      <h2>Sign Up for our newsletter</h2>
      <div className="flex items-center gap-2">
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  )
}
