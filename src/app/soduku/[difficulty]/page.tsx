import SodukuProvider from '@/context/soduku/Soduku'
import type {SodukuDifficulties} from '@/types/soduku'
import SodukuComp from '../../../components/soduku/Soduku'


async function Page({params}: PageProps<'/soduku/[difficulty]'>) {
  const {difficulty} = (await params) as {difficulty: SodukuDifficulties}
  return (
    <SodukuProvider difficulty={difficulty}>
      <SodukuComp />
    </SodukuProvider>
  )
}

export default Page
