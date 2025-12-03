'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<[]>([])

  const getPokemons = async () => {
    const res = await api.get('/pokemon')
    console.log(res.data)

    setPokemons(res.data.data)
  }

  const deletePokemon = async (id: number) => {
    await api.delete(`pokemon/${id}`)

    await getPokemons()
  }

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <main className='w-full min-h-dvh flex flex-col gap-4 items-center justify-center bg-gray-900'>
      <h1 className='text-white'>Pokemons</h1>
      {[
        { id: 1, name: 'Pikachu' },
        { id: 2, name: 'Pikachu 2' },
        { id: 3, name: 'Pikachu 3' },
      ].map((pokemon) => (
        <div
          key={pokemon.id}
          className='flex flex-col bg-white p-10 rounded-2xl gap-2'
        >
          <p>{pokemon.name}</p>
          <Link href={'/atualizar'}>Atualizar pokemon</Link>
          <Button
            onClick={(e) => deletePokemon(pokemon.id)}
            className='bg-red-500 hover:bg-red-600 text-white cursor-pointer'
          >
            Deletar
          </Button>
        </div>
      ))}
    </main>
  )
}
