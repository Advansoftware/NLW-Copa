import { PrismaClient }  from '@prisma/client'
const prisma  = new PrismaClient();

async function  main() {
  const user = await prisma.user.create({
    data: {
      name : 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl : 'https://github.com/Advansoftware.png',
    }
  })
  const pool = await prisma.pool.create({
    data: {
      title: 'Exemple Poll',
      code: 'BOLL123',
      ownerId: user.id,
      participants:{
        create: {
          userId: user.id
        }
      }
    }
  })
  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.107Z',
      fistTeamCoutryCode: 'DE',
      secoundTeamCoutryCode: 'BR',
    }
  })
  await prisma.game.create({
    data:{
      date: '2022-11-04T13:00:00.107Z',
      fistTeamCoutryCode: 'BR',
      secoundTeamCoutryCode: 'AR',
      guesses: {
        create: {
          fistTeamPoits: 2,
          secoundTeamPoits: 1,
          participant:{
            connect:{
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}
main();