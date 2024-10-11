"use client"
import { Button, Input } from "@medusajs/ui"
import axios from "axios"
import { useState } from "react"

export default function NewsletterForm() {
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
        alert("Subscribed successfully!")
        setEmail("")
      })
      .catch((e) => {
        console.error(e)
        alert("An error occurred")
      })
  }

  return (
    <form onSubmit={subscribe}>
      <h2>Sign Up for our newsletter</h2>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
