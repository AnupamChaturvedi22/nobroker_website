import Brand from '../../components/Brand';
import { ArrowRight } from '../../components/PropertyIcons';
import { propertyOptions } from './propertyOptions';

const NAVY = '#0F1B2D';
const GOLD = '#C9A24B';

export default function PropertyChoicePage({ user, onChoice, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#top" aria-label="NoBroker home">
            <Brand />
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-600 sm:inline">
              Welcome, <span className="font-semibold" style={{ color: NAVY }}>{user.fullName || user.email}</span>
            </span>
            <button
              onClick={onLogout}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
          Your property journey
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: NAVY }}>
          How can we help today?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Choose an option to continue with verified homes and direct owner connections.
        </p>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {propertyOptions.map((option) => (
            <button
              key={option.title}
              onClick={() => onChoice(option.action)}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="block h-40 w-full overflow-hidden bg-gray-100">
                <img
                  src={option.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>

              <span className="block p-6">
                <span
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${NAVY}0D`, color: NAVY }}
                >
                  {option.icon}
                </span>
                <h2 className="text-lg font-semibold" style={{ color: NAVY }}>
                  {option.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{option.text}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color: GOLD }}
                >
                  Get started <ArrowRight />
                </span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}