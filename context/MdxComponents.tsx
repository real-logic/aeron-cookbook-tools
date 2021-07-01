import {
  createContext,
  useContext,
  useState,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

import Code from '../components/Code'

type ContextProps = {
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;
  directions: string[];
  setDirections: Dispatch<SetStateAction<string[]>>;
  tips: string[];
  setTips: Dispatch<SetStateAction<string[]>>;
};

type Props = {
  children: ReactNode;
};

const MdxComponentsContext = createContext({} as ContextProps);

export function MdxComponentsProvider({ children }: Props): ReactElement {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const state = {
    code: Code,
  }

  return (
    <MdxComponentsContext.Provider
      value={{
        ingredients,
        setIngredients,
        directions,
        setDirections,
        tips,
        setTips,
      }}
    >
      {children}
    </MdxComponentsContext.Provider>
  );
}

export function useMdxComponentsContext(): ContextProps {
  return useContext(MdxComponentsContext);
}
