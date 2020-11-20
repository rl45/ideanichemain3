const puppeteer = require('puppeteer');

const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/${reddit}/`;

const self = {
    browser: null,
    page: null,

    initialize: async (reddit) => {
        self.browser = await puppeteer.launch({
            headless: true
        });
        self.page = await self.browser.newPage();

        /* Go to subreddit */
        await self.page.goto(SUBREDDIT_URL(reddit), { waitUntil: 'domcontentloaded' });


    },

    getResults: async (nr) => {

        let results = [];

        do {

            let new_results = await self.parseResults();

            //results = { ...results, ...new_results };

            results.push.apply(results, new_results);

            console.log(Object.keys(results).length)

            if (Object.keys(results).length < nr) {
                let nextPageButton = await self.page.$('span[class="next-button"] > a[rel="nofollow next"]');
                if (nextPageButton) {
                    await nextPageButton.click();
                    await self.page.waitForNavigation({ waitUntil: 'networkidle0' })
                } else {
                    break;
                }
            }

        } while (Object.keys(results).length < nr);
        return results


    },

    parseResults: async () => {

        let elements = await self.page.$$('#siteTable > div[class*="thing"]');
        let results = [];

        for (let element of elements) {
            let title = await element.$eval(('p[class="title"]'), node => node.innerText.trim());
            //let rank = await element.$eval(('span[class="rank"]'), node => node.innerText.trim());
            let score = await element.$eval(('div[class="score likes"]'), node => node.innerText.trim());
            let comments = await element.$eval(('a[data-event-action="comments"]'), node => node.innerText.trim());
            let url = await element.$eval(('p[class="title"]> a[class*=title]'), node => node.getAttribute('href'));

            results.push({
                title,
                score,
                comments,
                url,
            })

        }

        return results;

    },

}

module.exports = self;