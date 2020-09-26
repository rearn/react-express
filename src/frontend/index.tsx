import './main.styl';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const getapi = async () => {
  const res = await fetch('/api2005');
  const json = await res.json();
  console.log(json);
  return json;
};

export const Index = () => {
  const [data, setData] = useState([{ L: 0, H: 0 }]);
  const [sum, setSum] = useState({ L: 0, H: 0 });
  useEffect(() => {
    (async () => {
      const d = await getapi();
      setData(d);
    })();
  }, []);
  useEffect(() => {
    const r = { L: 0, H: 0 };
    data.forEach((v) => {
      r.L += v.L;
      r.H += v.H;
    });
    setSum(r);
  }, [data]);
  return (
    <>
      <h1>2005年日本シリーズ</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>千葉ロッテマリーンズ</th>
            <th>阪神タイガース</th>
          </tr>
          {data.map((item, i) =>
            <tr key={i}>
              <td>第{i+1}試合</td>
              <td>{item.L}</td>
              <td>{item.H}</td>
            </tr>
          )}
          <tr className='sum'>
            <td></td>
            <td>{sum.L}</td>
            <td>{sum.H}</td>
          </tr>

        </tbody>
      </table>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById('index'));
