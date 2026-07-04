import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        behavior?: string;
        direction?: string;
        scrollamount?: string;
        loop?: string;
      };
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        behavior?: string;
        direction?: string;
        scrollamount?: string;
        loop?: string;
      };
    }
  }
}
