import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/incidents/$date/$incidentId/import')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/incidents/$date/$incidentId/import"!</div>
}
