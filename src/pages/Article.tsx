import {
  useEffect,
  useState,
} from 'react';

import { useNavigate, useParams } from "react-router-dom";
import Header, { NavLink } from '../components/Header/Header';
import {
  getArticle,

  getHeaderEntry,
} from '../helpers';



interface HeaderEntry {
  title: string;
  section: {
    menu: {
      link: NavLink[];
    }
  };
}

interface ArticleEntry {
  title: string;
  url: string;
  cover_image: any;
  summery: string;
  content: null;
}

export default function Article() {
  const [headerEntry, setHeaderEntry] = useState<HeaderEntry | undefined>();
  const [articleEntry, setArticleEntry] = useState<ArticleEntry | undefined>();
  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();

  // Fetch slug from route parameters
  const { slug } = useParams();
  console.log(slug)

  async function fetchData() {
    const headerData = await getHeaderEntry();
    const articleData = await getArticle(slug);
    console.log(articleData)
    setHeaderEntry(headerData);
    setArticleEntry(articleData);
  }

  return (
    <div>
      {headerEntry && <Header menu={headerEntry.section.menu} />}
      <div >
      <div className='container mx-auto' id='article-cover'>
          {articleEntry && <h1 data-id='h1-text' >{articleEntry.title}</h1>}
        </div>
        <div className={'relative overflow-hidden mt-6'}>
  
                {articleEntry?.cover_image && <img src={articleEntry.cover_image.url}
                    className={' object-cover aspect-[2] md:aspect-[5/2] object-center bg-white/5 shadow-2xl ring-1 ring-white/10 dark:text-white'}
                />}
            </div>
        <div className='container mx-auto' id='article-cover'>
          {articleEntry && <h3 data-id='h3-text' >{articleEntry.summery}</h3>}
        </div>
        <div className='container mx-auto' id='article-cover'>
          {articleEntry && <p data-id='p-text' >{articleEntry.content}</p>}
        </div>
      </div>
    </div>
  );
}
