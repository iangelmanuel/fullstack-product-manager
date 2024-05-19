import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="bg-gray-800">
        <section className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Product Manager
          </h1>
        </section>
      </header>

      <main className="mx-auto mt-10 max-w-6xl bg-white p-10 shadow-lg">
        <Outlet />
      </main>
    </>
  )
}
