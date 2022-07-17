import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUMBER_OF_USERS = 4;
const MAX_NUMBER_OF_TODO = 10500;
const MAX_NUMBER_OF_POST = 20;
const MAX_NUMBER_OF_CATEGORY = 2;

const data = Array.from({ length: NUMBER_OF_USERS }).map(() => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password(),
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
  post: Array.from({
    length: faker.datatype.number({
      min: 0,
      max: MAX_NUMBER_OF_POST,
    }),
  }).map(() => ({
    title: faker.name.jobTitle(),
    content: faker.lorem.words(75),
    uuid: faker.datatype.uuid(),
  })),
}));

async function main() {
  await prisma.category.create({
    data: {
      name: 'Databases',
    },
  });

  await prisma.category.create({
    data: {
      name: 'Tutorials',
    },
  });

  for (const entry of data) {
    try {
      await prisma.user.create({
        data: {
          name: entry.name,
          email: entry.email,
          password: entry.password,
          todo: {
            create: entry.todo,
          },
          post: {
            create: entry.post,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
