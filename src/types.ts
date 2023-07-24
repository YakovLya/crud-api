export type User = {
  id?: string,
  username: string,
  age: number,
  hobbies: Array<string>
}

type Database = {
  data: Array<User>;
}

export const db:  Array<User> = [
                                  {
                                    id: 'cedfb487-030e-4b92-92b8-2356aac0e809',
                                    username: 'tester',
                                    age: 42,
                                    hobbies: ['nothing'],
                                  }
                                ]

export const writeToDb = () => {
  db.push({
                                    id: '67fad743-74e4-4715-9fec-faddd89f5c3a',
                                    username: 'num 2',
                                    age: 2,
                                    hobbies: ['   '],
                                  });
}