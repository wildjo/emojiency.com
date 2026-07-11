---
title: "Botkit and Regular Expressions"
slug: "botkit-and-regular-expressions"
kind: "article"
date: "2016-09-08"
modified: "2022-11-23"
summary: "Regex has never been my favorite part of writing code. I get that some people geek out on it and bless their hearts. For me, it's an annoyance that is best left abstracted out of my daily coding experience. Thankfully, I am not alone.…"
categories: ["javascript"]
tags: ["bot", "code", "engineering", "regex", "slack"]
wordpressId: 1982
legacyUrl: "/botkit-and-regular-expressions/"
format: "html"
draft: false
---

Regex has never been my favorite part of writing code. I get that some people geek out on it and bless their hearts. For me, it's an annoyance that is best left abstracted out of my daily coding experience. Thankfully, I am not alone. There are plenty of sites and programs that generate regular expression sequences for all your pattern matching needs.



Today, I used <a href="http://www.regular-expressions.info">regular-expressions.info</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions">Mozilla's JavaScript Regular Expressions Guide</a> to write some code that helps a SlackBot take a date from a user and save it.

<a href="https://howdy.ai/botkit/">Botkit</a>'s <strong>controller.hears</strong> method takes a regex as a parameter and returns an array containing the matches. The first element of the array is the full input string from the user.

So, this regular expression will search for a date in the format MM/DD/YYYY and return four elements in an array: the full string, the month, the day, and the year. The parenthesis tell the interpreter to capture the matches.
<pre>'(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]([1-2][0-9][0-9][0-9])'</pre>
<img class="wp-image-1992 size-thumbnail aligncenter" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/09/Screen-Shot-2016-09-08-at-12.42.08-PM-150x150.png" alt="screen-shot-2016-09-08-at-12-42-08-pm" width="150" height="150" />

That's pretty cool. I've added a bit at the front that matches the word "Set" followed by any number of characters and then continues on capturing the date.
<pre>^[S|s]et.*</pre>
The caret makes sure it's at the very beginning of the input. [S|s] lets the user omit capitalization. and dot-asterisk is the wildcard for any number of characters. The whole thing together gives us this output:

<img class="aligncenter wp-image-2012 size-medium" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/09/Screen-Shot-2016-09-08-at-1.16.20-PM-184x300.png" alt="screen-shot-2016-09-08-at-1-16-20-pm" width="184" height="300" />

That's pretty cool, but let's get even more literal.
<pre>[S|s]et.*date.*</pre>
That lets us say things like, "Set the date to 09-09-2012" but not "Set the pickles to 09-09-2012" which is what people would expect from a Very Smart Slackbot. It also lets there be some leeway in a user's input, so "Set date 09-09-2012" works as well as "Hey, Rememberbot, can you set a date for me? Don't let me forget 09-09-2012, thanks."

<img class="wp-image-2022 size-medium aligncenter" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/09/Screen-Shot-2016-09-08-at-1.28.04-PM-300x213.png" alt="screen-shot-2016-09-08-at-1-28-04-pm" width="300" height="213" />

These examples remind me why people who write code are the worst testers of that code. When testing code to make sure it's executing correctly, I use the quickest way to enter data, which often means repeating the same test data. That leads to errors that slip through to (hopefully) testers and possibly to end users as shipping bugs.
