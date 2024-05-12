'use client';

import React, { useRef, useEffect, useState } from 'react';

type DataSource = { id: string; width: number; height: number };

type Position = DataSource & {
  offsetX: number;
  offsetY: number;
};

type VirtualProps = {
  gap: number;
  col: number;
  dataSource: DataSource[];
  onChange?: () => void;
  children: React.ReactNode;
};

const Virtual: React.FC<VirtualProps> = ({
  gap,
  col,
  dataSource,
  onChange,
  children
}) => {
  const [positions, setPositions] = useState<Position[]>([]);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerWidth = container.current?.clientWidth;
    const noteWidth = containerWidth
      ? (containerWidth - gap * (col - 1)) / 3
      : 0;

    setPositions(positions1(noteWidth));
  }, []);

  const minColumn = (columns: number[]) => {
    let height = Infinity;
    let index = -1;

    columns.forEach((cur, i) => {
      if (cur < height) {
        height = cur;
        index = i;
      }
    });

    return [height, index];
  };

  const positions1 = (width: number) => {
    const result: Position[] = [];
    const columns = Array(col).fill(0);

    for (let i = 0; i < dataSource.length; i++) {
      const curData = dataSource[i];
      const [minColHeight, minColIndex] = minColumn(columns);
      const height = (width * curData.height) / curData.width;

      result.push({
        id: i.toString(),
        width,
        height,
        offsetX: (minColIndex % col) * (width + gap),
        offsetY: minColHeight
      });

      columns[minColIndex % col] += height + gap;
    }

    return result;
  };

  return (
    <div
      className='relative w-full'
      style={{ height: '2000px' }}
      ref={container}
    >
      {dataSource.map((data, index) => (
        <section
          key={data.id}
          className='absolute left-0 top-0'
          style={{
            width: positions[index]?.width,
            height: positions[index]?.height,
            transform: `translate3d(${positions[index]?.offsetX}px, ${positions[index]?.offsetY}px, 0px)`
          }}
        >
          {/* {children} */}
          <div className='h-full w-full bg-red-400'>{index}</div>
        </section>
      ))}
    </div>
  );
};

export default Virtual;
