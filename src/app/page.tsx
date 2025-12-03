import Registro from '@/components/Forms/Registro'

export default function Home() {
  return (
    <main className='w-full min-h-dvh flex items-center justify-center bg-gray-900'>
      <Registro
        title='Registro'
        defalutValues={{
          name: '',
          height: '',
          weight: '',
          description: '',
          baseHp: '',
          baseAttack: '',
          baseDefense: '',
          baseSpeed: '',
          primaryTypeId: '',
        }}
        btnText='Cadastrar'
      />
    </main>
  )
}
