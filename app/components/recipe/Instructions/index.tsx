import { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { Heading } from '~/components';

export const Instructions = ({ instructions }: { instructions: string[] }) => {
  const [completed, setCompleted] = useState<number[]>([]);

  const handleSelection = (index: number) => {
    if (completed.includes(index))
      setCompleted((prevCompleted) =>
        prevCompleted.filter((item) => item !== index),
      );
    else setCompleted((prevCompleted) => [...prevCompleted, index]);
  };

  return (
    <div>
      <Heading
        content={'Instructions'}
        type={'section'}
        className="!mt-0 mb-6"
      />
      <div className="flex cursor-pointer flex-col justify-center gap-4">
        {instructions.map((instruction: string, index: number) => {
          if (!instruction) return;
          const selected = completed.includes(index);
          return (
            <div
              className="flex gap-3"
              onClick={() => handleSelection(index)}
            >
              {
                <div
                  className={`flex-center h-7 min-w-7 select-none self-start rounded-full transition-colors ${selected ? 'bg-[#228B22]' : 'bg-primary-800'} text-sm font-medium text-white`}
                >
                  {selected ? <IoIosCheckmark fontSize={28} /> : index + 1}
                </div>
              }
              <div
                className={`flex-center text-lg font-medium leading-8 transition-all sm:text-base ${selected ? 'line-through opacity-40' : 'opacity-100'}`}
              >
                {instruction}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
