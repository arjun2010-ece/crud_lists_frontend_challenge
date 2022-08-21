import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: { userId: 4690962, title: 'String', body: 'String' } },
    two: { data: { userId: 3172858, title: 'String', body: 'String' } },
  },
})

export type StandardScenario = typeof standard
