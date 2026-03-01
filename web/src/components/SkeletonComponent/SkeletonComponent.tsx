import { Box, Card, Skeleton, Stack } from "@mui/material";

// interface interna do componente
type SkeletonComponentProps = {
  show?: boolean;
  as?: "list" | "feed-list" | "cards" | "item";
  times?: number;
};

//Props padrões para o componente de esqueleto, com valores default para cada propriedade
export default function SkeletonComponent({
  show = false,
  as = "list",
  times = 1,
}: SkeletonComponentProps) {
  if (!show) return null;

  const skeletonList = () =>
    Array.from({ length: times }).map((_, i) => (
      <Card key={i} sx={{ p: 2, mb: 2 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width={400} height={40} />
            <Stack width="100%">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="65%" />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width={200} height={40} />
            <Stack width="100%">
              <Skeleton variant="text" />
              <Skeleton variant="text" width="90%" />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack>
              <Skeleton variant="rectangular" width={200} height={40} />
              <Skeleton
                variant="rectangular"
                width={800}
                height={20}
                sx={{ mt: 2 }}
              />
            </Stack>
            <Stack width="100%">
              <Skeleton variant="text" width="55%" />
              <Skeleton variant="text" />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    ));

  const skeletonFeedList = () =>
    Array.from({ length: times }).map((_, i) => (
      <Box key={i} sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack width="100%">
            <Skeleton variant="text" width={600} />
            <Skeleton variant="text" width={800} />
          </Stack>
        </Stack>
      </Box>
    ));

  const skeletonCards = () =>
    Array.from({ length: times }).map((_, i) => (
      <Box key={i} sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rectangular" width={480} height={130} />
          <Skeleton variant="rectangular" width={480} height={130} />
        </Stack>
      </Box>
    ));

  const skeletonItem = () => (
    <Skeleton variant="rectangular" width={130} height={30} />
  );

  // Renderização dos componentes internos de forma condicional
  switch (as) {
    case "feed-list":
      return <>{skeletonFeedList()}</>;

    case "list":
      return <>{skeletonList()}</>;

    case "cards":
      return <>{skeletonCards()}</>;

    case "item":
      return skeletonItem();

    case "list":
    default:
      return <>{skeletonList()}</>;
  }
}
