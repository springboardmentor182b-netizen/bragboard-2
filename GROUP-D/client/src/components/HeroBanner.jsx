export default function HeroBanner() {
  return (
    <div className="bg-[var(--header-pink)] rounded-xl p-5 mb-6 card-border flex items-center justify-between overflow-hidden">
      <div>
        <h2 className="text-2xl font-bold text-[var(--accent-dark)]">Hi, User</h2>
        <p className="text-sm text-[var(--accent-dark)]/85 mt-1"></p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-40 h-24 avatar-blob rounded-2xl flex items-center justify-center px-3">
          <img src="/logo3.avif" alt="avatar" className="object-cover w-28 h-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
