/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

export const Table = ({ data }: { data: {L: number; H: number; }[] }) => {
  const [sum, setSum] = useState({ L: 0, H: 0 });
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
      <table>
        <tbody>
          <tr>
            <th> </th>
            <th>千葉ロッテマリーンズ</th>
            <th>阪神タイガース</th>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>
                第
                {i + 1}
                試合
              </td>
              <td>{item.L}</td>
              <td>{item.H}</td>
            </tr>
          ))}
          <tr className="sum">
            <td> </td>
            <td>{sum.L}</td>
            <td>{sum.H}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
