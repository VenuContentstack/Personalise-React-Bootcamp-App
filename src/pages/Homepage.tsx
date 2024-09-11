import { useEffect,useState,} from 'react';
import Personalization from '@contentstack/personalization-sdk-js';
import Banner from '../components/Banner/Banner';
import Header, { NavLink } from '../components/Header/Header';
import { getHeaderEntry,getVariantEntry} from '../helpers';

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
      cta: {
        'title': '',
        'href': ''
      };
    };
  };
}

export default function Homepage() {
  const [bannerEntry, setBannerEntry] = useState<BannerEntry | undefined>();
  const [headerEntry, setHeaderEntry] = useState<HeaderEntry | undefined>();
  const [abCmsVariant, setABCmsVariant] = useState(String);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    // get Header Entry 
    const headerData = await getHeaderEntry();
    // check if Environment variables available
    if (process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL) {
      Personalization.setApiUrl(process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL);
    }
    if (process.env.REACT_APP_PERSONALIZATION_EDGE_URL) {
      Personalization.setEdgeApiUrl(process.env.REACT_APP_PERSONALIZATION_EDGE_URL);
    }
    // initilaise Personalization
    await Personalization.init(process.env.REACT_APP_PERSONALIZATION_PROJECT_ID as string, { edgeMode: true });
    // get Varient Menifest
    const cmsVariants = Personalization.getVariants();
    // set A/B Varient
    setABCmsVariant(cmsVariants[1])
    // trigger Impression for page view
    Personalization.triggerImpression('1')
    headerData['section']['menu']['ab'] = cmsVariants[1]
    setHeaderEntry(headerData);
    // deserialise varient 
    const params = Object.entries(cmsVariants)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');
    // get Varient Entry
      const variantData = await getVariantEntry(params);
    // set Banner Entry
    setBannerEntry(variantData);
  }

  return (
    <div>
      {headerEntry && <Header menu={headerEntry.section.menu} ab={abCmsVariant} />}
      {bannerEntry && (
        <Banner
          title={bannerEntry.title}
          description={bannerEntry.description}
          buttonText={bannerEntry.call_to_action.title}
          buttonLink={bannerEntry.call_to_action.href}
          image={bannerEntry.banner_image.url}
          ab={abCmsVariant}
        />
      )}
    </div>
  );
}
