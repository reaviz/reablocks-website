import metadata from 'reablocks/stories/docs.json';
import { Card } from 'reablocks';

export const PropsTable = ({ name }) => {
  const data: any = metadata.find((m) => m.displayName === name);
  const keys = Object.keys(data?.props ?? {});

  return (
    <Card className="mt-5 p-3">
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
                {data.props[prop].tsType && (
                  <>
                    <br />
                    <code className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10 rb-code">
                      {data.props[prop].tsType.raw ??
                        data.props[prop].tsType.name}
                    </code>
                  </>
                )}
              </td>
              <td className="p-[5px]">
                {data.props[prop].defaultValue && (
                  <code className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10">
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
