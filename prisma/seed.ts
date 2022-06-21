import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUMBER_OF_USERS = 4;
const MAX_NUMBER_OF_TODO = 5;

const data = Array.from({ length: NUMBER_OF_USERS }).map(() => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  uuid: faker.datatype.uuid(),
  todo: Array.from({
    length: faker.datatype.number({
      min: 0,
      max: MAX_NUMBER_OF_TODO,
    }),
  }).map(() => ({
    title: faker.name.jobTitle(),
    description: faker.lorem.words(50),
    uuid: faker.datatype.uuid(),
  })),
}));

async function main() {
  for (const entry of data) {
    await prisma.user.create({
      data: {
        name: entry.name,
        email: entry.email,
        todo: {
          create: entry.todo,
        },
      },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});