import Document, { Head, Main, NextScript } from "next/document";

class KmmbDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="description" content="KMMB Backend." />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script src="/__/firebase/7.17.1/firebase-app.js"></script>
          <script src="/__/firebase/7.17.1/firebase-analytics.js"></script>
          <script src="/__/firebase/init.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default KmmbDocument;
