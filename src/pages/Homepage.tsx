import {
  useEffect,
  useState,
  useRef
} from 'react';

import Personalization from '@contentstack/personalization-sdk-js';

import Banner from '../components/Banner/Banner';
import Header, { NavLink } from '../components/Header/Header';
import {
  getBannerEntry,
  getEntry,
  getHeaderEntry,
  getVariantEntry
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
      cta:{
        'title':'',
        'href':''
      };
    };
  };
  
}

interface cmsVarient {
  0: string;
  1: string;
  };



export default function Homepage() {
  const [bannerEntry, setBannerEntry] = useState<BannerEntry | undefined>();
  const [headerEntry, setHeaderEntry] = useState<HeaderEntry | undefined>();
  const [abCmsVariant, setABCmsVariant] = useState(String);
  const isFirstRun = useRef(true);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const headerData = await getHeaderEntry();
    
    if (process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL) {
      Personalization.setApiUrl(process.env.REACT_APP_PERSONALIZATION_DELIVERY_URL);
    }
    if (process.env.REACT_APP_PERSONALIZATION_EDGE_URL) {
      Personalization.setEdgeApiUrl(process.env.REACT_APP_PERSONALIZATION_EDGE_URL);
    }

    await Personalization.init(process.env.REACT_APP_PERSONALIZATION_PROJECT_ID as string, { edgeMode: true });
    
    const cmsVariants = Personalization.getVariants();
    setABCmsVariant(cmsVariants[1])
    console.log(cmsVariants)
    Personalization.triggerImpression('1')
    headerData['section']['menu']['ab']=cmsVariants[1]
    console.log(headerData)
    setHeaderEntry(headerData);
    const params = Object.entries(cmsVariants)
      .map(([key, value]) => `${key}=${value}`)
      .join(',');
      console.log('in FetchData Method',headerData['section']['menu']['ab'],cmsVariants[1])
    const variantData = await getVariantEntry(params);
   
    setBannerEntry(variantData);
    
  //  }else{
  //   const bannerData = await getBannerEntry();
  //   setBannerEntry(bannerData);
  //  }
    
  }

  return (
    <div>
      {headerEntry && <Header menu={headerEntry.section.menu} ab= {abCmsVariant} />}
      {bannerEntry && (
        <Banner
          title={bannerEntry.title}
          description={bannerEntry.description}
          buttonText={bannerEntry.call_to_action.title}
          buttonLink={bannerEntry.call_to_action.href}
          image={bannerEntry.banner_image.url}
          ab= {abCmsVariant}
        />
      )}
    </div>
  );
}
