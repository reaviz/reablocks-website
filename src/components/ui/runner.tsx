import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-runner'
import * as Reablocks from 'reablocks';
import * as React from 'react';

export const Runner = (props) => (
  <div className="flex w-full border rounded-sm border-gray-800 light:border-gray-200 mt-5">
    <LiveProvider
      {...props}
      scope={{
        import: {
          'reablocks': Reablocks,
          'react': React,
        }
      }}
    >
      <LiveEditor className="flex-1 font-mono text-sm !bg-gray-800" />
      <LivePreview className="flex-1 p-5 self-center justify-center flex" />
      <LiveError />
    </LiveProvider>
  </div>
);