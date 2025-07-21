'use client'

import metadata from 'reablocks/stories/docs.json';
import { Card, theme } from 'reablocks';

export const PropsTable = ({ name }: { name: string }) => {
  const data: any = metadata.find((m) => m.displayName === name);
  const keys = Object.keys(data?.props ?? {});

  return (
    <Card className="mt-5 p-3" theme={theme.components.card}>
      <table className="w-full text-base">
        <thead className="border-b-[1px] border-[rgba(241,245,249,0.2)]">
          <tr className="opacity-60">
            <th className="w-1/4 py-[5px] text-left">Prop</th>
            <th className="w-2/4 py-[5px] text-left">Description</th>
            <th className="w-1/4 py-[5px] text-left">Default</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((prop) => (
            <tr
              key={prop}
              className="border-[rgba(241,245,249,0.1)] [&:not(:last-child)]:border-b-[1px]"
            >
              <td className="p-[5px]">
                <strong>
                  <code>{prop}</code>
                </strong>
                {data.props[prop].required && <i> *</i>}
              </td>
              <td className="p-[5px]">
                {data.props[prop].description}
                {data.props[prop].type && (
                  <>
                    <br />
                    <code className="border-black border-opacity-[0.04] bg-opacity-[0.03] bg-black break-words rounded-md border py-0.5 px-[.25em] text-[.9em] dark:border-white/10 dark:bg-white/10 nextra-code">
                      {data.props[prop].type.name}
                    </code>
                  </>
                )}
              </td>
              <td className="p-[5px]">
                {data.props[prop].defaultValue && (
                  <code className="border-gray-200 border-opacity-[0.04] bg-opacity-[0.03] bg-gray-100 break-words rounded-md border py-0.5 px-[.25em] text-[.9em] dark:border-white/10 dark:bg-white/10">
                    {data.props[prop].defaultValue.value}
                  </code>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
