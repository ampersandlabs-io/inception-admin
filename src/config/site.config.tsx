import { Metadata } from 'next';
import logoImg from '@public/ampersand-logo.svg';
import logoIconImg from '@public/ampersand-logo-icon.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Ampersand Admin - Dashboard to administer the Ampersand platform',
  description: `Streamline your admin dashboard.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  // layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Ampersand Admin` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Ampersand Admin` : title,
      description,
      url: 'https://inception-admin.vercel.app',
      siteName: 'Ampersand', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: '',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
