export default function Button({ children, className, ...props }: any) {
  return (
    <button
      className={` bg-green hover:bg-opacity-20 text-[#fff] p-2 px-3 rounded-lg w-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
