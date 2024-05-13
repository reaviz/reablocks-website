import { Unstyled } from '@storybook/blocks';
import metadata from 'reablocks/stories/docs.json';

export const PropsTable = ({ name }) => {
  const data: any = metadata.find(m => m.displayName === name);
  const keys = Object.keys(data.props);

  return (
    <Unstyled>
      <table style={{ width: '100%', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>Prop</th>
            <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>Description</th>
            <th style={{ padding: '5px 0', textAlign: 'left', borderBottom: '1px solid hsla(203, 50%, 30%, 0.15)' }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(prop => (
            <tr key={prop} >
              <td style={{ padding: '5px 0' }}>
                <code>{prop}</code>
                {data.props[prop].required && <i> *</i>}
              </td>
              <td style={{ padding: '5px 0' }}>
                {data.props[prop].description}
                {data.props[prop].tsType && (
                  <>
                    <br />
                    <code>
                      {data.props[prop].tsType.raw ?? data.props[prop].tsType.name}
                    </code>
                  </>
                )}
              </td>
              <td style={{ padding: '5px 0' }}>
                <code>
                  {data.props[prop].defaultValue && data.props[prop].defaultValue.value}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Unstyled>
  );
};