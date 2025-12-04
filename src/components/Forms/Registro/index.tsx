'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const pokemonSchema = z.object({
  name: z.string().min(3, {
    error: 'Nome maior que 3 letras',
  }),
  height: z.string().min(1, {
    error: 'minimo de peso é 1',
  }),
  weight: z.string().min(1, {
    error: 'minimo de peso é 1',
  }),
  description: z.string().optional(),
  baseHp: z.string().min(1, {
    error: 'Minimo de 100',
  }),
  baseAttack: z.string().min(1, {
    error: 'Minimo de 100',
  }),
  baseDefense: z.string().min(1, {
    error: 'Minimo de 100',
  }),
  baseSpeed: z.string().min(1, {
    error: 'Minimo de 100',
  }),
  primaryTypeId: z.string().min(1, {
    error: 'Minimo de 1',
  }),
})

type Pokemon = z.infer<typeof pokemonSchema>

interface Props {
  title: string
  btnText: string
  option?: 'cadastrar' | 'atualizar'
  defalutValues: {
    name: string
    height: string
    weight: string
    description: string
    baseHp: string
    baseAttack: string
    baseDefense: string
    baseSpeed: string
    primaryTypeId?: string
  }
  funcao?: (data: Pokemon) => void
}

type PokemonType = {
  id: number
  pokemonId: number
  typeId: number
  createdAt: string
}

export default function Registro({
  defalutValues,
  title,
  btnText,
  option = 'cadastrar',
  funcao,
}: Props) {
  const form = useForm<Pokemon>({
    resolver: zodResolver(pokemonSchema),
    defaultValues: defalutValues,
  })
  const router = useRouter()
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([])

  function extractObjects(data: any) {
    return Object.keys(data)
      .filter((key) => !isNaN(Number(key))) // mantém apenas chaves numéricas
      .map((key) => data[key])
  }

  const getPokemonTypes = async () => {
    const res = await api.get('/pokemon-types')

    if (res.status === 200) {
      setPokemonTypes(
        extractObjects(res.data).sort((a, b) => a.typeId - b.typeId)
      )
    }
  }

  const handleResgitPokemon = async (data: Pokemon) => {
    const dados = {
      name: data.name,
      height: Number.parseInt(data.height),
      weight: Number.parseInt(data.weight),
      description: data.description,
      baseHp: Number.parseInt(data.baseHp),
      baseAttack: Number.parseInt(data.baseAttack),
      baseDefense: Number.parseInt(data.baseDefense),
      baseSpeed: Number.parseInt(data.baseSpeed),
      primaryTypeId: data.primaryTypeId,
    }

    const response = await api.post('/pokemon', dados)

    if (response.status === 201) {
      alert('Pokemon criado com sucesso!')
      router.replace('/pokemons')
    }
  }

  const handleUpdatePokemon = async (data: Pokemon) => {
    console.log(data)
  }

  useEffect(() => {
    getPokemonTypes()
  }, [])

  return (
    <Card className='w-[85%]'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              option === 'cadastrar' ? handleResgitPokemon : handleUpdatePokemon
            )}
            className=' flex flex-row justify-between flex-wrap gap-4 '
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Wight</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='1' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='baseHp'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Base HP</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='baseAttack'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Base Attack</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='baseDefense'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Base Defense</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='baseSpeed'
              render={({ field }) => (
                <FormItem className='w-[45%]'>
                  <FormLabel>Base Speed</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='100' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {option === 'cadastrar' ? (
              <FormField
                control={form.control}
                name='primaryTypeId'
                render={({ field }) => (
                  <FormItem className='w-[45%]'>
                    <FormLabel>Primary Type ID</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Type IDS' />
                        </SelectTrigger>
                        <SelectContent>
                          {pokemonTypes.map((item) => (
                            <SelectItem key={item.id} value={`${item.typeId}`}>
                              {item.typeId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            <div className='w-full flex items-center justify-center'>
              <Button className='w-[35%] cursor-pointer' type='submit'>
                {btnText}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
