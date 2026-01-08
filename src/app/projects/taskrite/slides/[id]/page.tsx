import { redirect } from 'next/navigation'

export default function SlidePage({ params }: { params: { id: string } }) {
  // Redirect to the slides preview page
  redirect('/projects/taskrite/slides')
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ]
}
