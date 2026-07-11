---
title: "MadLib Writer’s Prompt"
slug: "madlib-writers-prompt"
kind: "article"
date: "2019-06-03"
modified: "2022-12-10"
summary: "Let's write some Javascript to generate a writer's prompt from a list of nouns, verbs, adjectives, and adverbs, etc. First, we'll add some loading code. This code gets invoked two ways: first, we run it when the window is finished…"
categories: ["words"]
tags: []
wordpressId: 8451
legacyUrl: "/madlib-writers-prompt/"
format: "html"
draft: false
---

<!-- wp:paragraph -->
<p>Let's write some Javascript to generate a writer's prompt from a list of nouns, verbs, adjectives, and adverbs, etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>First, we'll add some loading code. This code gets invoked two ways: first, we run it when the window is finished loading, so we get can update the DOM and give the user something to look at. We'll also add a button to generate a new MadLib on demand.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>window.onload = generate_prompt();</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This is our workhorse right here, but it's pretty simple. We have a bunch of arrays and we're going to pick from them a random element and add it to the string.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>function generate_prompt() {
	
     prompt_string = adjective1&#91;random_0_to(adjective1.length)] + " " + 
          media&#91;random_0_to(media.length)] + " " + 
          adjective2&#91;random_0_to(adjective2.length)] + " " + 
          noun&#91;random_0_to(noun.length)] + " " +
          action&#91;random_0_to(action.length)] + " " +
          venue&#91;random_0_to(venue.length)] + " ";
	
	if (random_0_to(10) == 0)
		prompt_string += ", in Latin."
		else  
		prompt_string += "."

	display_prompt(prompt_string);		
	}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Here are some sample arrays to get you going. You can add as many elements as you'd like to the arrays, just make sure they're all separated by a comma.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>var prompt_string = ""

var adjective1 = &#91;
	"A gripping",
	"a frivolous"
]

var media = &#91;
	"novel starring",
	"short story about"
]

var adjective2 = &#91;
	"an anxious",
	"a pretentious"
]
var noun = &#91;
	"duck",
	"bunny"
]

var action = &#91;
	"dancing",
	"flying"
]

var venue = &#91;
	"on the moon",
	"in my imagination"
]</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We're going to need a function to generate those random numbers.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>function random_0_to(n) {
	return Math.floor(Math.random() * n);
	}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And lastly, a function to update the DOM.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>function display_prompt(s) {
	document.getElementById("prompt").innerHTML = s;
	}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Cool, all done with the .js file.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is from the HTML file that I use here at <a href="http://www.floatingpoint.pub/">www.floatingpoint.pub</a>. It defines the area in the DOM where the prompt gets updated by the display_prompt(s) function and contains a little self-contained javascript to update the prompt when someone clicks the (new) link.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>		&lt;p class=prompt&gt;&lt;strong&gt;PROMPT:&lt;/strong&gt;
		&lt;a id="prompt"&gt;&lt;/a&gt;
		&lt;a href="javascript:generate_prompt()" style="text-decoration:none !important;"&gt;(new)&lt;/a&gt;
		&lt;/p&gt;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>That's it! Have fun with it and be sure to <a href="mailto:jonnie@emojiency.com">email me</a> to show off how you've used it to do something really cool on your own.</p>
<!-- /wp:paragraph -->
