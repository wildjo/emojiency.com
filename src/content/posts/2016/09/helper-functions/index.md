---
title: "Helper function(s)"
slug: "helper-functions"
kind: "article"
date: "2016-09-15"
modified: "2022-11-23"
summary: "Writing the Slackbot, which communicates via text messages so there are plenty of places where there are numerals being referred to in text form, which means there are often cases where a word is either singular or plural, depending on…"
categories: ["javascript"]
tags: ["bot", "code", "slack"]
wordpressId: 2142
legacyUrl: "/helper-functions/"
format: "html"
draft: false
---

Writing the Slackbot, which communicates via text messages so there are plenty of places where there are numerals being referred to in text form, which means there are often cases where a word is either singular or plural, depending on whether it's referring to one of something or more than one of something.



So, I wrote a quick helper function called add_s().
<pre>// utility function to add an s to a word if the number it refers to is plural
// takes the integer number
// returns a string that is either "" (empty) or "s"

function add_s(num) {
 var ret_str = "s";
 if (num == 1) {
 ret_str = "";
 }
 return(ret_str);
 }</pre>
An example usage would be like this:
<pre>return_string = return_string + result.toString() + " month" + add_s(result);</pre>
So, the output in Slack looks like this:

<img class="alignnone size-medium wp-image-2152" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/09/Screen-Shot-2016-09-15-at-10.37.25-AM-300x44.png" alt="screen-shot-2016-09-15-at-10-37-25-am" width="300" height="44" />

or possibly:

<img class="alignnone size-medium wp-image-2162" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/09/Screen-Shot-2016-09-15-at-10.38.37-AM-300x42.png" alt="screen-shot-2016-09-15-at-10-38-37-am" width="300" height="42" />

That's pretty cool.

Currently, the bot just assumes a month is 30 days. That's why it says "about". The algorithm for computing the actual number of months from one month to another is a little bit complicated, but I'm working on a solution that is more precise.

Iterate till it pops.
