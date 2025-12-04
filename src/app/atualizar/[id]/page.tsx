'use client'

import type { Pokemon } from '@/app/pokemons/page'
import Registro from '@/components/Forms/Registro'
import { api } from '@/services/api'
import { use, useEffect, useState } from 'react'

export default function AtualizarPokemon({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)

  const getPokemon = async () => {
    const res = await api.get<{
      data: Pokemon
    }>(`/pokemon/${id}`)

    setPokemon(res.data.data)
  }

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <main className='w-full min-h-dvh flex items-center justify-center bg-gray-900'>
      <Registro
        title='Atualizar'
        btnText='Atualizar'
        option='atualizar'
        defalutValues={{
          ...pokemon,
        }}
      />
    </main>
  )
}
