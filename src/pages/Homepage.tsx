import {
  useEffect,
  useState,
} from 'react';

import Banner from '../components/Banner/Banner';
import Header, { NavLink } from '../components/Header/Header';
import {
  getEntry,
  getHeaderEntry,
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
    }
  };
}

export default function Homepage() {
  const [bannerEntry, setBannerEntry] = useState<BannerEntry | undefined>();
  const [headerEntry, setHeaderEntry] = useState<HeaderEntry | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const bannerData = await getEntry();
    const headerData = await getHeaderEntry();

    setBannerEntry(bannerData);
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
