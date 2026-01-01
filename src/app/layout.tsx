import { Inter } from "next/font/google";

import CommonLayout from "@/components/commonLayout/commonLayout";
import IFaviconsData from "@/types/IFaviconsData";
import IHeadProps from "@/types/IHeadProps";
import RequestUtils from "@/utils/requestUtils";

import "@/app/globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const getData = async () => {
  const headData = await RequestUtils.request<IHeadProps>(
    "home",
    {
      metadata: "shareImage"
    }
  );

  const data = headData?.metadata;

  const icons = await RequestUtils.request<IFaviconsData>(
    "favicon",
    {
      favicons: true
    }
  );

  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keywords,
    icons: icons?.favicons?.map((icon) => ({
      type: icon.mime,
      url: icon.url,
      sizes: icon.width && icon.height ? `${icon.width}x${icon.height}` : "",
      rel: icon.caption,
    })),
    openGraph: {
      siteName: "Store Jump",
      title: data?.title,
      description: data?.description,
      images: [
        {
          url: data?.shareImage?.url,
          height: 600,
          width: 1200,
        },
      ],
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <CommonLayout>
          {children}
        </CommonLayout>
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const data = await getData();

  if (data) {
    return data;
  }
}