import metadata from 'reablocks/stories/docs.json';

export const PropsTable = ({ name }) => {
  const data: any = metadata.find(m => m.displayName === name);
  const keys = Object.keys(data?.props ?? {});

  return (
    <table style={{ width: '100%', fontSize: 14, marginTop: 20 }}>
      <thead>
        <tr>
          <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)', width: '25%' }}>Prop</th>
          <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)', width: '50%' }}>Description</th>
          <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)', width: '25%' }}>Default</th>
        </tr>
      </thead>
      <tbody>
        {keys.map(prop => (
          <tr key={prop} >
            <td style={{ padding: '5px 0', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>
              <strong>
                <code>{prop}</code>
              </strong>
              {data.props[prop].required && <i> *</i>}
            </td>
            <td style={{ padding: '5px 0', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>
              {data.props[prop].description}
              {data.props[prop].tsType && (
                <>
                  <br />
                  <code className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10 rb-code">
                    {data.props[prop].tsType.raw ?? data.props[prop].tsType.name}
                  </code>
                </>
              )}
            </td>
            <td style={{ padding: '5px 0', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>
              <code>
                {data.props[prop].defaultValue && data.props[prop].defaultValue.value}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
