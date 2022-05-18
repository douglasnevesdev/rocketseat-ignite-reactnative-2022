declare module '*.svg'{
  import React from 'react'
  import { SVGProps } from 'react-native-svg-transformer';
  const content: React.FC<SVGProps>;
  export default content;
}