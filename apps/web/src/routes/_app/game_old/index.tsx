import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/game_old/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/game_old/"!</div>
}
