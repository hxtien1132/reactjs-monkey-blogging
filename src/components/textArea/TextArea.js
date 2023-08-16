import React from 'react';
import { useController } from 'react-hook-form';

const TextArea = ({
  name = "",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
    return <textarea className='w-full h-[200px] p-5 border rounded-lg resize-none' {...field} {...props}>{children}</textarea>;
};

export default TextArea;