import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/game/lobby/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/lobby/"!</div>
}
