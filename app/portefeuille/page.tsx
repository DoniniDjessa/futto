'use client'

import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Plus, Check, X } from 'lucide-react'
import { ScreenHeader, Card } from '@/components/ui-kit'
import {
  wallet,
  paymentMethods,
  formatFCFA,
  type Transaction,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const amounts = [2000, 5000, 10000, 20000]

export default function PortefeuillePage() {
  const [balance, setBalance] = useState(wallet.balance)
  const [txns, setTxns] = useState<Transaction[]>(wallet.transactions)
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(5000)
  const [method, setMethod] = useState(paymentMethods[0].id)

  const recharge = () => {
    const pm = paymentMethods.find((m) => m.id === method)!
    setBalance((b) => b + amount)
    setTxns((prev) => [
      {
        id: `w${Date.now()}`,
        label: `Recharge ${pm.name}`,
        method: pm.name,
        amount,
        date: "Aujourd'hui",
        kind: 'credit',
      },
      ...prev,
    ])
    setOpen(false)
  }

  return (
    <>
      <ScreenHeader title="Portefeuille" subtitle="Ton solde FUTTO en FCFA" />

      <div className="space-y-5 px-5 pb-6">
        {/* Balance card */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 via-card to-card p-5">
          <p className="text-sm text-muted-foreground">Solde disponible</p>
          <p className="mt-1 font-display text-4xl font-bold text-balance">
            {formatFCFA(balance)}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" /> Recharger
            </button>
            <button className="rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-semibold">
              Envoyer
            </button>
          </div>
        </div>

        {/* Payment methods */}
        <div>
          <h3 className="mb-2 font-display text-lg font-bold">Moyens de paiement</h3>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-border bg-card p-3 text-center"
              >
                <span
                  className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: m.color }}
                >
                  {m.name[0]}
                </span>
                <p className="text-[11px] font-semibold leading-tight">{m.name}</p>
                <p className="text-[10px] text-muted-foreground">{m.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="mb-2 font-display text-lg font-bold">Historique</h3>
          <div className="space-y-2">
            {txns.map((t) => {
              const credit = t.kind === 'credit'
              return (
                <Card key={t.id} className="flex items-center gap-3 p-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      credit ? 'bg-primary/15 text-primary' : 'bg-accent/15 text-accent',
                    )}
                  >
                    {credit ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-tight">{t.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.method} · {t.date}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'font-display text-sm font-bold',
                      credit ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {credit ? '+' : '-'}
                    {formatFCFA(t.amount)}
                  </span>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recharge sheet */}
      {open && (
        <div className="absolute inset-0 z-40 flex items-end bg-black/60 md:rounded-[2rem]">
          <div className="w-full rounded-t-3xl border-t border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Recharger</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-2 text-sm text-muted-foreground">Montant</p>
            <div className="mb-4 grid grid-cols-4 gap-2">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={cn(
                    'rounded-xl border py-2 text-sm font-semibold transition-colors',
                    amount === a
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background',
                  )}
                >
                  {(a / 1000).toLocaleString('fr-FR')}k
                </button>
              ))}
            </div>

            <p className="mb-2 text-sm text-muted-foreground">Payer avec</p>
            <div className="mb-5 space-y-2">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border p-3 transition-colors',
                    method === m.id ? 'border-primary' : 'border-border',
                  )}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.name[0]}
                  </span>
                  <span className="flex-1 text-left text-sm font-semibold">
                    {m.name}
                  </span>
                  {method === m.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>

            <button
              onClick={recharge}
              className="w-full rounded-xl bg-primary py-3 font-display text-base font-bold text-primary-foreground"
            >
              Recharger {formatFCFA(amount)}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
