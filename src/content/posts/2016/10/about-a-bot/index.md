---
title: "About A Bot"
slug: "about-a-bot"
kind: "article"
date: "2016-10-27"
modified: "2022-11-23"
summary: "The Timebot is finished. I make use of three different and important bits of code that are written by other people. First off, of course, is Botkit by Howdy.ai . Then, because I make a habit never to do work I don't have to, there are…"
categories: ["javascript"]
tags: ["bot", "code", "javascript", "lessthanperfect", "slack"]
wordpressId: 2712
legacyUrl: "/about-a-bot/"
format: "html"
draft: false
---

<img class="alignnone size-large wp-image-2732" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/Screen-Shot-2016-10-25-at-12.31.49-PM-1024x247.png" alt="screen-shot-2016-10-25-at-12-31-49-pm" width="474" height="114" />

The <a href="https://api.slack.com/bot-users">Timebot</a> is finished.


I make use of three different and important bits of code that are written by other people. First off, of course, is <a href="https://howdy.ai/botkit/">Botkit</a> by <a href="https://howdy.ai">Howdy.ai</a>.

Then, because I make a habit never to do work I don't have to, there are two different APIs that take dates and return differences between them. <a href="http://slingfive.com/pages/code/jsDate/jsDate.html">Rob Eberhardt's jsDate</a> is an attempt to emulate VBScript's date and time functions. Also along those lines is<a href="https://gist.github.com/adamphillips/612587"> Adam Phillips' dateDiff</a> but it returns the timespan as a set of years, months, and days.

I did have to make one change to jsDate. In the DateDiff method, he uses ParseInt() to get integer values from floating point values. I'm not sure why this was done, but this leads to some incorrect values. Using  Math.round() however, works better for these purposes because ParseInt will truncate digits after a decimal point, acting as a Math.floor(). We don't want Math.floor.
<pre> var nMilliseconds = iDiffMS;
 var nSeconds = Math.round(iDiffMS / 1000);
 var nMinutes = Math.round(nSeconds / 60);
 var nHours = Math.round(nMinutes / 60);
 var nDays = Math.round(nHours / 24);
 var nWeeks = Math.round(nDays / 7);</pre>
I'm not sure what the methodology is for rounding the values after division at each step. This may even add a small amount of error into the equation at each step, leading to larger errors further down. I didn't spend a lot of time on it, since I didn't discover errors after I switched from ParseInt() to Math.round().

How did I check for errors? I entered test dates and checked the return values with <a href="http://www.wolframalpha.com/input/?i=How+long+since+April+1,+2013">Wolfram Alpha</a>. I figure if Wolfram is wrong, there is no beauty or truth in the universe.

This works. It's not perfect. The engineering changed a couple of times during the process. I saw an appropriate quote by way of Daring Fireball yesterday. It's a quote from <a href="http://scripting.com/davenet/1995/09/03/wemakeshittysoftware.html">Dave Winer</a>.
<blockquote><em>An old software slogan at Living Videotext: “We Make Shitty Software… With Bugs!” It makes me laugh! We never ran this slogan in an ad. People wouldn’t understand. But it’s the truth. We make shitty software. And so do you!</em>

<em>Software is a process, it’s never finished, it’s always evolving. That’s its nature. We know our software sucks. But it’s shipping! Next time we’ll do better, but even then it will be shitty. The only software that’s perfect is one you’re dreaming about. Real software crashes, loses data, is hard to learn and hard to use. But it’s a process. We’ll make it less shitty. Just watch!</em></blockquote>
This is true for all work, really. Every project is an unfinished work. There is always something that could be better. However, at some point we have to release, that's why we make deadlines. Even today with eternal beta-quality software is an admission that projects are always incomplete. What's important is that we release this snapshot, meet our goals for today, and set our sights higher for tomorrow. Never give up, and never go back.

<img class="alignnone size-large wp-image-2832" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/IMG_1554-576x1024.png" alt="img_1554" width="474" height="843" />

Here is the code, it works "as is".

<a href="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/time_bot_jie_1.js"><img class="alignnone size-full wp-image-2802" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/coda_js_icon.png" alt="coda_js_icon" width="24" height="32" />   time_bot_jie_1.js</a>

&nbsp;
