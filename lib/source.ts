import { docs } from 'fumadocs-mdx:collections/server';
import { openapiPlugin, openapiSource } from 'fumadocs-openapi/server';
import { type InferPageType, loader, multiple } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { openapi } from '@/lib/openapi';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader(
    multiple({
    docs: docs.toFumadocsSource(),
    openapi: await openapiSource(openapi, {
      baseDir: 'openapi',
    }),
  }),
  {
  baseUrl: '/docs',
  // source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin(), openapiPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
}
