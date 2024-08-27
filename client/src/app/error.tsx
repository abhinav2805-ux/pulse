
'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 import { Button } from '@/components/ui/button'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='min-h-screen justify-center items-center flex flex-col space-y-8'>
      <h2 className='font-semibold text-3xl text-center ' >Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }

        variant={'destructive'}
      >
        Try again
      </Button>
    </div>
  )
}