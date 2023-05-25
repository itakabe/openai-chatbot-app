import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server';
import { Card, CardContent, CardHeader } from "@mui/material";
import { dataProvider } from './dataProvider';
//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export const Dashboard = () => (
  <Card>
    <CardHeader title="管理画面" />
    <CardContent>現在鋭意製作中です。表示データはサンプルとなります。</CardContent>
  </Card>
);

const App = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="history" list={ListGuesser} />
  </Admin>
);

export default App;