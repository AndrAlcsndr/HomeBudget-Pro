import { Box, Card, Skeleton, Stack } from '@mui/material'

type SkeletonComponentProps = {
  show?: boolean
  as?: 'list' | 'file-list' | 'feed-list' | 'cards' | 'item'
  times?: number
}

export default function SkeletonComponent({
  show = false,
  as = 'list',
  times = 1
}: SkeletonComponentProps) {
  if (!show) return null

 

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