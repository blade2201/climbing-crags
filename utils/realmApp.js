import * as Realm from 'realm-web';

export async function connectToRealm() {
  const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  const client = app.currentUser.mongoClient('mongodb-atlas');
  return { client, user };
}

export async function gradesObj() {
  const { client } = await connectToRealm();
  const gradesDb = client.db('Climbing-crags').collection('grades');
  const grades = await gradesDb.find({});
  const gradesObj = {};

  grades.forEach((grade) => {
    gradesObj[grade.id] = [grade.fra_routes, grade.usa_routes];
  });

  return gradesObj;
}

// const client = app.currentUser.mongoClient('mongodb-atlas');
// const gradesDb = client.db('Climbing-crags').collection('grades');
// const grade = await gradesDb.find();
