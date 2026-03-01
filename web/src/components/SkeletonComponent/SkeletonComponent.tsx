
// interface interna do componente
type SkeletonComponentProps = {
  show?: boolean
  as?: 'list' | 'file-list' | 'feed-list' | 'cards' | 'item'
  times?: number
}

//Props padrões para o componente de esqueleto, com valores default para cada propriedade
export default function SkeletonComponent({
  show = false,
  as = 'list',
  times = 1
}: SkeletonComponentProps) {
  if (!show) return null

 

  // Renderização dos componentes internos de forma condicional
  switch (as) {
    case 'feed-list':
      return <>{skeletonList()}</>

    case 'cards':
      return <>{skeletonCards()}</>

    case 'item':
      return skeletonItem()

    case 'file-list':
    case 'list':
    default:
      return <>{skeletonList()}</>
  }
}