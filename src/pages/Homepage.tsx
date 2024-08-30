import {
  useEffect,
  useState,
} from 'react';

import Personalization from '@contentstack/personalization-sdk-js';

import Banner from '../components/Banner/Banner';
import Header, { NavLink } from '../components/Header/Header';
import {
  getHeaderEntry,
  getVariantEntry,
} from '../helpers';

interface BannerEntry {
  title: string;
  description: string;
  call_to_action: {
    title: string;
    href: string;
  };
  banner_image: {
    url: string;
  };
}

interface HeaderEntry {
  title: string;
  section: {
    menu: {
      link: NavLink[];
    };
  };
}

export default function Homepage() {
  const [bannerEntry, setBannerEntry] = useState<BannerEntry | undefined>();
  const [headerEntry, setHeaderEntry] = useState<HeaderEntry | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL) {
      Personalization.setApiUrl(process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL);
    }
    if (process.env.REACT_APP_PERSONALIZATION_EDGE_URL) {
      Personalization.setEdgeApiUrl(process.env.REACT_APP_PERSONALIZATION_EDGE_URL);
    }

    await Personalization.init(process.env.REACT_APP_PERSONALIZATION_PROJECT_ID as string, { edgeMode: true });

    const cmsVariants = Personalization.getVariants();

    const params = Object.entries(cmsVariants)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');

    const variantData = await getVariantEntry(params);
    const headerData = await getHeaderEntry();

    setBannerEntry(variantData);
    setHeaderEntry(headerData);
  }

  return (
    <div>
      {headerEntry && <Header menu={headerEntry.section.menu} />}
      {bannerEntry && (
        <Banner
          title={bannerEntry.title}
          description={bannerEntry.description}
          buttonText={bannerEntry.call_to_action.title}
          buttonLink={bannerEntry.call_to_action.href}
          image={bannerEntry.banner_image.url}
        />
      )}
    </div>
  );
}
