import React, { useState } from "react";

interface IDialogContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  contextData: any;
  setContextData: React.Dispatch<React.SetStateAction<any>>;
  component: JSX.Element;
  setComponent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  onCloseFn: Function;
  setOnCloseFn: React.Dispatch<React.SetStateAction<() => void>>;
}

interface IDialogProviderProps {
  children: React.ReactNode;
}

const initialValues: IDialogContext = {
  isOpen: false,
  setIsOpen: () => {},
  title: "",
  setTitle: () => {},
  contextData: {},
  setContextData: () => {},
  component: <></>,
  setComponent: () => {},
  onCloseFn: (data: any) => {},
  setOnCloseFn: () => (data: any) => {},
};

export const DialogContext = React.createContext<IDialogContext>({
  ...initialValues,
});

const DialogProvider = ({ children }: IDialogProviderProps) => {
  const [contextData, setContextData] = useState<any>(
    initialValues.contextData
  );
  const [isOpen, setIsOpen] = useState<boolean>(initialValues.isOpen);
  const [onCloseFn, setOnCloseFn] = useState<Function>(initialValues.onCloseFn);
  const [component, setComponent] = useState<JSX.Element>(
    initialValues.component
  );
  const [title, setTitle] = useState<string>(initialValues.title);
  return (
    <DialogContext.Provider
      value={{
        title,
        setTitle,
        isOpen,
        setIsOpen,
        contextData,
        setContextData,
        component,
        setComponent,
        onCloseFn,
        setOnCloseFn,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
