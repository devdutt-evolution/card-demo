import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  { className, ...props }: any,
  ref
) {
  // console.log(props);
  return (
    <input
      ref={ref}
      className={` ${className} bg-divider outline-none focus:outline-green w-full px-4 py-2 text-[#fff] rounded-lg`}
      {...props}
    />
  );
});

