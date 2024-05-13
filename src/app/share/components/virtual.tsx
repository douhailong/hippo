'use client';

import React, { useRef, useEffect, useState } from 'react';

type Data = { id: string; width: number; height: number; url: string };

type Position = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

type VirtualProps = {
  gap: number;
  col: number;
  dataSource: Data[];
  onChange?: () => void;
  children: React.ReactElement;
};

export type VirtualNoteProps = {} & Data;

const Virtual: React.FC<VirtualProps> = ({
  gap,
  col,
  dataSource,
  onChange,
  children
}) => {
  const [elementPostions, setElementPositions] = useState<Position[]>([]);

  const container = useRef<HTMLDivElement>(null);
  const containerHeight = useRef(0);

  useEffect(() => {
    const containerWidth = container.current?.clientWidth;
    const noteWidth = containerWidth
      ? (containerWidth - gap * (col - 1)) / col
      : 0;

    const [positions, columns] = buildPositionsData(noteWidth);
    containerHeight.current = Math.max(...columns) - gap;

    setElementPositions(positions);

    // const observer = new ResizeObserver((e, obs) => {
    //   console.log(e[0].target.clientWidth, '////');
    // });

    // if (container.current) {
    //   observer.observe(container.current);
    // }
  }, [col, gap]);

  console.log('xxxxxxxxxxxxxxx');

  const onBottomOut = () => onChange?.();

  const buildMinColumn = (columns: number[]) => {
    const min = Math.min(...columns);
    const index = columns.findIndex(cur => cur === min);

    return [min, index];
  };

  const buildPositionsData = (width: number): [Position[], number[]] => {
    const positions: Position[] = [];
    const columns: number[] = Array(col).fill(0);

    for (let i = 0; i < dataSource.length; i++) {
      const curData = dataSource[i];
      const [colHeight, colIndex] = buildMinColumn(columns);
      const height = (width * curData.height) / curData.width;

      positions.push({
        width,
        height,
        offsetX: (colIndex % col) * (width + gap),
        offsetY: colHeight
      });
      columns[colIndex % col] += height + gap;
    }

    return [positions, columns];
  };

  return (
    <div
      className='relative w-full'
      style={{ height: containerHeight.current }}
      ref={container}
    >
      {dataSource.map((data, index) => {
        const { width, height, offsetX, offsetY } =
          elementPostions[index] ?? {};
        return (
          <section
            key={data.id}
            className='absolute left-0 top-0'
            style={{
              width: width,
              height: height,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`
            }}
          >
            {React.cloneElement(children, { data })}
          </section>
        );
      })}
    </div>
  );
};

export default Virtual;
