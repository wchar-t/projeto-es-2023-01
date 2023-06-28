import {
  Html, Head, Main, NextScript,
} from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/css/fa.css" rel="stylesheet" type="text/css" />
        <Script src="https://content.jwplatform.com/libraries/KB5zFt7A.js" strategy="beforeInteractive" />
        <style dangerouslySetInnerHTML={{
          __html: `
          .jw-flag-aspect-mode {
            height: 100% !important;
            max-height: 100% !important;
          }
        `,
        }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
