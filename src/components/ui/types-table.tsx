import metadata from 'reablocks/typedoc.json';
import { Fragment } from 'react';
import { Card } from 'reablocks';

export const ParametersTable = ({ type, name }) => {
  const data: any = metadata?.[type]?.find(m => m.name === name);

  return (
    <Card className="mt-5 p-3">
      <table style={{ width: '100%', fontSize: 14 }}>
        <thead>
          <tr className="opacity-60">
            <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid rgba(241,245,249,0.1)', width: '25%' }}>
              Parameter
            </th>
            <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid rgba(241,245,249,0.1)', width: '25%' }}>
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {data.signatures.map((prop, index) => (
            <Fragment key={index}>
              {prop.parameters?.map(p => (
                <tr key={p.name}>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid rgba(241,245,249,0.1)' }}>
                    <code>{p.name}</code>
                  </td>
                  <td style={{ padding: '5px 0', borderBottom: '1px solid rgba(241,245,249,0.1)' }}>
                    <code className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10 rb-code">
                      {p.type.code}
                    </code>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <a href={data.source} className="nx-text-sm opacity-50 mt-3">
        Source: {data.source}
      </a>
    </Card>
  );
};
