'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/services/api'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type Pokemon = {
  id: number
  name: string
  height: number
  weight: number
  description: string
  imageUrl: string
  baseHp: number
  baseAttack: number
  baseDefense: number
  baseSpeed: number
  PokemonType: {
    id: number
  }[]
}

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  const getPokemons = async () => {
    const response = await api.get<{
      data: Pokemon[]
    }>('/pokemon')

    if (response.status === 200) {
      setPokemons(response.data.data)
      setLoading(false)
    }
  }

  const deletePokemon = async (id: number) => {
    try {
      const response = await api.delete(`pokemon/${id}`)
      if (response.status === 200) {
        getPokemons()

        return
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
        return
      }

      return alert('Ocorreu um erro ao deletar o pokemon')
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

  if (loading) {
    return (
      <main className='w-full min-h-dvh flex flex-col gap-4 items-center justify-center bg-gray-900'>
        <h1 className='text-white font-bold text-4xl animate-pulse'>
          Loading...
        </h1>
      </main>
    )
  }

  return (
    <main className='w-full pt-8 min-h-screen flex flex-col gap-4 bg-gray-900 px-[5%]'>
      <h1 className='text-white font-bold text-2xl'>Pokemons</h1>
      <ul className='flex gap-[2%] flex-wrap'>
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.name}
            className='w-[21%]  flex flex-col gap-1  bg-white p-4 rounded-2xl mb-4'
          >
            <h3 className='font-bold'>{pokemon.name}</h3>

            <p className='w-full truncate'>{pokemon.description}</p>

            <Link
              className='h-10 p-2 transition-colors bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center justify-center rounded-md'
              href={`/atualizar/${pokemon.id}`}
            >
              Atualizar pokemon
            </Link>

            <Button
              onClick={(e) => deletePokemon(pokemon.id)}
              className='h-10 transition-colors bg-red-500 hover:bg-red-600 text-white cursor-pointer'
            >
              Deletar
            </Button>
          </li>
        ))}
      </ul>
    </main>
  )
}
