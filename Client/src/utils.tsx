import { useState } from 'react';

const useInput = (
  initialValue: string,
  placeholder: string,
  type: string,
  className: string
): [JSX.Element, string, React.Dispatch<React.SetStateAction<string>>] => {
  const [search, setSearch] = useState<string>(initialValue);

  const input = (
    <input
      type={type}
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={className}
    />
  );

  return [input, search, setSearch];
};

export default useInput;
