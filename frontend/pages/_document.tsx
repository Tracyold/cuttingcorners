import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('ccg-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
          })();
        `}} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
