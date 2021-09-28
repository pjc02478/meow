import React, { useState } from 'react';

interface TaskProps {
  isBusy: boolean;
  runTask: (task: () => any) => void;
};

export const withTask = <T extends object>(Component: React.FC<T & TaskProps>) => (props: any) => {
  const [isBusy, setIsBusy] = useState(false);

  const runTask = async (task: () => any) => {
    try {
      setIsBusy(true);
      await task();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Component
      {...props}
      isBusy={isBusy}
      runTask={runTask}
    />
  );
};
