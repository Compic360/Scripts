// ==UserScript==
// @name         Trump Tweets in Comic Sans
// @namespace    https://twitter.com
// @version      2.0
// @description  Render Trump's tweets in Comic Sans on Twitter/X
// @author       ChatGPT
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const targetHandles = ['@realDonaldTrump', '@realdonaldtrump'];

    function applyComicSans() {
        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            // Get all spans inside the article
            const spans = article.querySelectorAll('span');

            // Look for a handle that matches Trump
            const handle = Array.from(spans).find(span =>
                targetHandles.includes(span.textContent.trim())
            );

            if (handle) {
                // Found a Trump tweet — apply Comic Sans to visible tweet text
                const tweetTextBlocks = article.querySelectorAll('[data-testid="tweetText"]');

                tweetTextBlocks.forEach(block => {
                    block.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
                });
            }
        });
    }

    // Observe for changes in the feed (infinite scroll, etc.)
    const observer = new MutationObserver(() => {
        applyComicSans();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call
    applyComicSans();
})();
