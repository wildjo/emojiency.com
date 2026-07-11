---
title: "Bot Engineering"
slug: "bot-engineering"
kind: "article"
date: "2016-09-06"
modified: "2022-11-23"
summary: "Howdy makes a cool botkit that lets people write their own bots for Slack . Also Facebook, but meh. In JavaScript, of all things, using node.js which makes the whole thing pretty accessible. Node.js lets you write JavaScripts that you…"
categories: ["javascript"]
tags: ["bot", "engineering", "slack"]
wordpressId: 1922
legacyUrl: "/bot-engineering/"
format: "html"
draft: false
---

<a href="https://howdy.ai/">Howdy</a> makes a cool <a href="https://howdy.ai/botkit/">botkit</a> that lets people write their own bots for <a href="https://slack.com/">Slack</a>. Also Facebook, but meh.

In JavaScript, of all things, using node.js which makes the whole thing pretty accessible. Node.js lets you write JavaScripts that you can execute from a command line or a text file. You can then do things like create a web server or build <a href="https://en.wikipedia.org/wiki/Skynet_(Terminator)">Skynet</a>.



I've set up node.js on my iMac and have run the sample code and edited it to make the bot react to a message with the poop emoji ( &#x1f4a9; ) whenever it sees the word "poo". Because I'm twelve years old on the inside. It also says, "Ew, poop."

I'm thinking of calling it Hanky.ai.

But let's make something that can do work for us instead of preventing us from engaging in important stress-relieving exercises.

This is the engineering portion of our program. The actual coding will happen on subsequent days.
<pre>&gt; Datebot: I don't have a date saved for you.
&gt; Datebot: Save a date in the format MM/DD/YYYY.

&gt; Me: @datebot Set 03/14/1992.

&gt; Datebot: Should I save March 14, 1992 for you.

&gt; Me: Yes.

&gt;Datebot: March 14, 1992 saved for you. It has been 24 years, 5 months, and 23 days since then.

&gt; Me: @datebot How long is that in weeks?

&gt; Datebot: It has been approximately 1,277 weeks since March 14, 1992.

&gt; Me: @datebot How long has it been in days?

&gt; Datebot: It has been 8942 days since March 14, 1992.</pre>
So, this is the sort of conversation I want to take place. It will only be in the context of a direct message from a user to the bot, so I won't have to worry about stray mentions in #general being picked up.

We're going to have to save a date for each user on a Slack team: no problem with botkit. We'll have to parse the conversation for certain key words. <em>Set</em> or <em>Save</em> or a date in the correct format will cause the bot to ask if the date should be saved. If it hears the word, "Yes" in response, it will save the date, otherwise it won't.

Once a date has been saved, set or save or another date will cause the bot to repeat the already saved date and ask if that date should be overwritten. If so, overwrite the date, but if not, leave the saved date alone.

Then when the bot receives the following commands, it will reply with different ways of representing the amount of time that has passed.
<pre>&gt; day: It has been X day(s) since MM/DD/YYYY.
&gt; month: It has been X month(s) since MM/DD/YYYY.
&gt; month: It has been approximately X month(s) since MM/DD/YYYY.
&gt; year: It has been X year(s) since MM/DD/YYYY.
&gt; year: It has been approximately X year(s) since MM/DD/YYYY.
&gt; hours: It has been X hours since MM/DD/YYYY.
&gt; total: It has been X year(s), X month(s), and X day(s) since MM/DD/YYYY.</pre>
The (s) part will be generated on the fly, when X is greater than 1, "s" will be added to the time unit, otherwise the singular time unit will be used.

When a time unit leaves a remainder, the word "approximately" will be added to the description.
