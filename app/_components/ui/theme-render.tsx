import { Button, Card, JsonTree } from 'reablocks';
import { FC } from "react";

interface ThemeRenderProps {
  theme: any;
}

const ThemeRender: FC<ThemeRenderProps> = ({ theme }) => {
  return (
    <Card className="mt-6 p-2 text-sm">
      <JsonTree expandDepth={Infinity} data={theme} />
      <Button
        size="small"
        color="primary"
        variant="outline"
        className="absolute right-0 bottom-0 text-xs border-0 !bg-black !text-white"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
            console.log('Content copied to clipboard');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
        }}>
          Copy Code
        </Button>
    </Card>
  );
};

export default ThemeRender;
