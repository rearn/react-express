import './main.styl';

import React, { useState, useEffect } from 'react';
import { Table } from '^/components/Table';

const getapi = async () => {
  const res = await fetch('/api2005');
  const json = await res.json();
  // eslint-disable-next-line no-console
  console.log(json);
  return json;
};

export const App = () => {
  const [data, setData] = useState([{ L: 0, H: 0 }]);
  useEffect(() => {
    (async () => {
      const d = await getapi();
      setData(d);
    })();
  }, []);
  return (
    <>
      <h1>2005年日本シリーズ</h1>
      <Table data={data} />
    </>
  );
};
