import Head from 'next/head';

export async function getStaticProps() {
  // {
  //   "data": {
  //     "repository": {
  //       "issue": {
  //         "reactionGroups": [
  //           { "content": "THUMBS_UP", "users": { "totalCount": 0 } },
  //           { "content": "THUMBS_DOWN", "users": { "totalCount": 0 } },
  //           { "content": "LAUGH", "users": { "totalCount": 0 } },
  //           { "content": "HOORAY", "users": { "totalCount": 0 } },
  //           { "content": "CONFUSED", "users": { "totalCount": 0 } },
  //           { "content": "HEART", "users": { "totalCount": 0 } },
  //           { "content": "ROCKET", "users": { "totalCount": 0 } },
  //           { "content": "EYES", "users": { "totalCount": 0 } }
  //         ]
  //       }
  //     }
  //   }
  // }
  const res = await fetch('https://api.github.com/users/bharathvaj-ganesan/repos');

  const repos = await res.json();

  if (res.status !== 200) {
    console.error(json);
    throw new Error('Failed to fetch API');
  }

  return {
    props: {
      repos: repos.map((r) => r.name),
    },
    revalidate: 1,
  };
}

export default function Home({ repos }) {
  return (
    <div className="container">
      <Head>
        <title>Static repos Demo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Static Reactions Demo" />
        <meta property="og:description" content="Using Next.js Incremental Static Regeneration" />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Incremental%20Static%20Regeneration%20Demo%20using%20**GitHub%20Reactions**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg"
        />
      </Head>

      <main>
        <h2>Static repos Demo</h2>
        <h3>Repos by bharathvaj-ganesan:</h3>
        {repos.map((r) => (
          <div key={r}>{r}</div>
        ))}
        <br />
        <div>
          <strong>Explanation:</strong> This page is statically generated with <a href="https://nextjs.org/">Next.js</a> by fetching data from GitHub. It's deployed to{' '}
          <a href="https://vercel.com/docs/v2/edge-network/overview">Vercel's Edge Network</a> (CDN). Importantly, this page is being re-generated using{' '}
          <a href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration">Incremental Static Regeneration</a> (released in{' '}
          <a href="https://nextjs.org/blog/next-9-5">Next.js 9.5</a>). Here's how it works:
        </div>
        <ol>
          <li>Each Next.js page can define the timeout. For this page, it's set at 1 second.</li>
          <li>When a new request comes in, the statically generated page is served.</li>
          <li>
            Later, when another request comes in <strong>after the defined timeout is exceeded</strong>: (1) The statically generated page is served, and (2){' '}
            <strong>Next.js generates a new version of the page in the background and updates the static page for *future* requests</strong>.
          </li>
          <li>
            Later, when another request comes in <strong>after the regeneration is done</strong>: The updated static page is served.
          </li>
          <li>
            This allows Incremental Static Regeneration on a per-page basis without rebuilding the full app. It'll always be fast because users will always get a static response.{' '}
            <a href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration">Learn more here</a>.
          </li>
          <li>
            <b>Update 2022:</b> Next.js 12.1 now allows you to also revalidate on-demand. <a href="https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta">Learn more here</a>
            .
          </li>
        </ol>
        <div>
          <strong>Source:</strong> <a href="https://github.com/vercel/reactions/blob/master/pages/index.js">pages/index.js</a> - `getStaticProps()` fetches the data during static generation, and
          `revalidate` specifies the timeout.
        </div>
      </main>
    </div>
  );
}
