import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wishlist')({
  component: () => <div>Hello /wishlist!</div>
})