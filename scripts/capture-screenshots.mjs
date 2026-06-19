import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../src/assets/projects');

const sites = [
  { slug: 'recetas-del-patron', url: 'https://recetasdelpatron.netlify.app/' },
  { slug: 'dmd-reciclados', url: 'https://dmdreciclados.com/' },
  { slug: 'pesadas-dmd', url: 'https://lucasfelice10.github.io/AnotadorDMD/' },
  { slug: 'gym-utn', url: 'https://dev-lfgym.pantheonsite.io/' },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const site of sites) {
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: path.join(outDir, `${site.slug}.png`),
      fullPage: false,
      type: 'png',
    });
    console.log(`OK: ${site.slug}`);
  } catch (err) {
    console.error(`FAIL: ${site.slug}`, err.message);
  }
}

await browser.close();
