/* eslint-disable */
import { useState } from "react";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import Code from "./Code";
import Callout from './Callout';
import MdxWarningAside from './MdxWarningAside';

export const COMPONENTS = {
  Callout,
  MdxWarningAside,
  Image
};

export default function MDX({ children }) {
  // https://mdxjs.com/advanced/components#mdxprovider
  const [components, setComponents] = useState({
    code: Code,
    inlineCode: (props) => <span className="inline-code" {...props} />,
  });

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
