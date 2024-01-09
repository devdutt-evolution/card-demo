import React, { Ref, ReactNode, LegacyRef, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
/* eslint-disable */
export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: LegacyRef<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={`${className} cursor-pointer roune rounded-lg px-3 py-1 ${
        active ? "bg-green" : "bg-card"
      }`}
      // className={cx(
      //   className,
      //   css`
      //     cursor: pointer;
      //     color: ${reversed
      //       ? active
      //         ? 'white'
      //         : '#aaa'
      //       : active
      //       ? 'black'
      //       : '#ccc'};
      //   `
      // )}
    />
  )
);

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className="text-white"
      // className={cx(
      //   'material-icons',
      //   className,
      //   css`
      //     font-size: 18px;
      //     vertical-align: text-bottom;
      //   `
      // )}
    />
  )
);
export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className="flex flex-wrap gap-2"
      // className={cx(
      //   className,
      //   css`
      //     & > * {
      //       display: inline-block;
      //     }

      //     & > * + * {
      //       margin-left: 15px;
      //     }
      //   `
      // )}
    />
  )
);

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref as Ref<HTMLDivElement>}
      // className={cx(
      //   className,
      //   css`
      //     position: relative;
      //     padding: 1px 18px 17px;
      //     margin: 0 -20px;
      //     border-bottom: 2px solid #eee;
      //     margin-bottom: 20px;
      //   `
      // )}
    />
  )
);
