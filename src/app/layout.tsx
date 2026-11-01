import type { Metadata } from "next";
import "./globals.css";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://elena-voss-portfolio-template-v3.21st.app"),
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteContent.metadata.og.title,
    description: siteContent.metadata.og.description,
    images: [
      {
        url: siteContent.metadata.og.image,
        width: siteContent.metadata.og.imageWidth,
        height: siteContent.metadata.og.imageHeight,
        alt: siteContent.metadata.og.imageAlt,
      },
    ],
  },
  twitter: {
    card: siteContent.metadata.twitter.card,
    title: siteContent.metadata.twitter.title,
    description: siteContent.metadata.twitter.description,
    images: [siteContent.metadata.twitter.image],
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import { GetInTouchModalProvider } from "@/components/GetInTouchModal";
import { PagePullTransitionProvider } from "@/components/PagePullTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <GetInTouchModalProvider>
            <PagePullTransitionProvider>
              <div className="elenavoss-body">{children}</div>
            </PagePullTransitionProvider>
          </GetInTouchModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

