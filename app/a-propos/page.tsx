import Image from 'next/image'
import { ScreenHeader } from '@/components/ui-kit'

export default function AProposPage() {
  return (
    <div>
      <ScreenHeader title="À propos" />
      <div className="flex flex-col items-center px-6 pb-10 text-center">
        <Image
          src="/futto-logo.jpg"
          alt="Logo FUTTO"
          width={88}
          height={88}
          className="rounded-2xl"
        />
        <h2 className="mt-3 font-display text-4xl font-bold">FUTTO</h2>
        <p className="mt-2 text-sm text-accent">Le foot nous unit</p>
        <p className="mt-2 text-sm text-muted-foreground">Joue. Réserve. Partage. Progresse.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          100 % ivoirien. 100 % foot. Démo 2026.
        </p>
      </div>
    </div>
  )
}
