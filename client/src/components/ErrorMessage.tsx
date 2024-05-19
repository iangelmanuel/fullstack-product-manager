import type { PropsWithChildren } from 'react'

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
      {children}
    </div>
  )
}
