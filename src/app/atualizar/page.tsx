import Registro from '@/components/Forms/Registro'

export default function AtualizarPokemon() {
  return (
    <main className='w-full min-h-dvh flex items-center justify-center bg-gray-900'>
      <Registro
        title='Atualizar'
        btnText='Atualizar'
        defalutValues={{
          name: 'Pikachu',
          height: '10',
          weight: '10',
          description: 'Elétrico',
          baseHp: '100',
          baseAttack: '100',
          baseDefense: '100',
          baseSpeed: '100',
          primaryTypeId: '10',
        }}
      />
    </main>
  )
}
