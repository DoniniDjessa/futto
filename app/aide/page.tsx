import { BackHeader } from '@/components/ui-kit'

export default function AidePage() {
  return (
    <div className="pb-8">
      <BackHeader title="Centre d'aide" backHref="/parametres" />
      <div className="space-y-4 px-5 pt-2 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Réserver un terrain.</span> Choisis le lieu, la
          date, l’heure et la durée, puis paie (Wave, Orange Money ou MTN). Tu reçois la confirmation tout
          de suite.
        </p>
        <p>
          <span className="font-semibold text-foreground">Créer ou rejoindre un match.</span> Amical, public
          ou privé. S’il manque des joueurs, invite ceux qui sont à proximité en un tap.
        </p>
        <p>
          <span className="font-semibold text-foreground">Tournois.</span> Inscris ton équipe, paie les
          frais, suis le calendrier et les scores.
        </p>
        <p>
          Cette version est une démo : aucun paiement réel n’est débité.
        </p>
      </div>
    </div>
  )
}
