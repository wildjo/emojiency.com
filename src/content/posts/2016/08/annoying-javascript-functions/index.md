---
title: "Annoying JavaScript Functions"
slug: "annoying-javascript-functions"
kind: "article"
date: "2016-08-01"
modified: "2022-11-23"
summary: "A quick little JavaScript to cycle through an array of hex colors. Installs an interval function to change the background color every second. // Variables // install an interval function update_colors() and run it every 1000…"
categories: ["javascript"]
tags: []
wordpressId: 212
legacyUrl: "/annoying-javascript-functions/"
format: "html"
draft: false
---

A quick little JavaScript to cycle through an array of hex colors. Installs an interval function to change the background color every second.
<pre>// Variables

// install an interval function update_colors() and run it every 1000 milliseconds (once a second)

var closeInterval = window.setInterval(update_colors, 1000);

// global variable to control where we are in the array of colors

var step = 0;

// this is our array of colors

var ColorCycle = [
 "#838a85",
 "#bbaa99",
 "#c6ceb6",
 "#9fb1a2",
 "#748f8b"
];</pre>
Everything's set up. There is no need for a window.onload() function because we've installed this as an interval function. That takes care of making sure we aren't executing on null document objects.
<pre>function update_colors() {
 
 // Call a utility function that changes the background color
 
 swap_colors(step);
 
 // step is where we hold the value of the current item in the array
 
 step++;
 
 // Let's not go outside the bounds of the array, please
 
 if (step &gt; ColorCycle.length) {
 step = 0;
 }

}</pre>
There we go. All that's left is a little utility function to do the actual swapping.
<pre>function swap_colors(new_color) {
 
 // Change the page background
 
 document.body.style.background = ColorCycle[new_color];
 
 // This necessary for the first time through, but it seems to be unnecessary
 // for subsequent passes. I'm a little bit confused by this, but okay.
 // Changing the background color of the Section object inside &lt;body&gt;
 
var section_style = document.querySelector("section");
 section_style.style.background = ColorCycle[new_color]; 
 
 }</pre>
So, as I mention in the comment, changing the "section" object background seems to be necessary since I've given it its own background definition in the style sheet. I suppose I could have just not given the section object a style, which would eliminate the need to change the background, but that's okay, because now I know how to change an object's background when it's different than the body background.

Next, I will work on making the transitions between colors less jarring by writing a nice function that will blend colors.
