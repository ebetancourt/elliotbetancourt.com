---
title: Elements of Javascript Style
date: 2008-04-29T08:04:54+00:00
format: aside
---
Javascript is a very forgiving language to program in. As such, everyone has their own way to program it.

My personal Javascript style is continuously evolving thanks to everything I learn from watching YUI&#8217;s Crockford videos.

At the moment, I try to approximate most of Yahoo!&#8217;s design choices when creating a custom library for a site.

I begin by creating a namespace I will use for all scripts within the site. for example, if it was a script for this site I might go with Ebetan (I am a lazy typist), for the Widget Company, I might go with Widget or Widgetco. the idea is to have a Unique name for a global (Singleton) javascript object where all the scripts and objects you create can reside to avoid any naming collisions with other libraries / scripts you might use (or hack together on the fly). Javascript operates in global scope by default, which can easily create problems for programmers that are new to the environment.

```javascript
var Foo = {};
```

right above that, I like to create a $ function that is simply a wrapper for YAHOO.util.Dom.get. This makes syntax much cleaner than the typical document.getElementById. Its a convention that I copied from ProtypeJS.

```javascript
var $ = function( elementId ){
    return YAHOO.util.Dom.get( elementId );
};
```

just below the declaration of the base class, I like to have commented out prototype methods for built-in classes. It makes it very easy for add a prototype method to a class just by commenting out the required lines, but at the same time I don&#8217;t weigh my code down with a bunch of prototypes I&#8217;m not actually using, and since I usually minify my javascript before closing out a project, I don&#8217;t have to worry about slowing down the download of the files(comments will just get removed). Here are most of the prototypes that I use (for the sake of appearance, I removed all of the ones that were more than one line, and a few of the longer ones

```javascript
// Array.prototype.forEach = function(f){var i=this.length,j,l=this.length;for(i=0;i<l;i++){if((j=this[i])){f(j);}}};
// Array.prototype.contains = function(element){for(var i=0;i<this.length;i++){if(this[i]==element){return true;}}return false;};
// Array.prototype.clear = function(){this.length=0;};
// Array.prototype.shift = function(){for(var i=1;i<this.length;i++){this[i-1]=this[i];}this.length=this.length-1;};
// Array.prototype.unshift = function(item){this[this.length]=null;for(var i=1;i<this.length;i++){this[i]=this[i-1];}this[0]=item;};
// Array.prototype.sort = function(){var tmp;for(var i=0;i<this.length;i++){for(var j=0;j<this.length;j++){if(this[i]<this[j]){tmp=this[i];this[i]=this[j];this[j]=tmp;}}}};
//
// String.prototype.scan = function(pattern,iterator){this.gsub(pattern, iterator);return this;};
// String.prototype.strip = function() {return this.replace(/^s+/, &#8221;).replace(/s+$/, &#8221;);};
// String.prototype.stripTags = function(){return this.replace(/]+>/gi, &#8221;);};
// String.prototype.escapeHTML = function(){var div=document.createElement(&#8216;div&#8217;);var text=document.createTextNode(this);div.appendChild(text);return div.innerHTML;};
// String.prototype.unescapeHTML = function(){var div=document.createElement(&#8216;div&#8217;);div.innerHTML=this.stripTags();return div.childNodes[0] ? div.childNodes[0].nodeValue : &#8221;;};
// String.prototype.toArray = function() {return this.split(&#8221;);};
// String.prototype.toDom = function(){var div=document.createElement(&#8216;div&#8217;);div.innerHTML=this;return div.firstChild;};
// String.prototype.trim = function(){return this.replace(/^s+|s+$/g,&#8221;);};
// String.prototype.reverse = function(){return this.split(&#8221;).reverse().join(&#8221;);};
```

at the bottom of the file, I like to cover myself for browsers that have not implemented console.log

```javascript
try{console.log(&#8221;);}catch(e){var console={log:function(){}};}
```

If my project will be using Ajax (most of them have at least a little) I like to occasionally use a modal loading window when something sensitive is changing on the screen. Luckily, YUI has some sample code on how to use their libraries for just this purpose, I of course integrate this code into my class.

```javascript
{
  loading_window:{},
  loading:function(){
    Foo.loading_window.show();
  },
  end_loading:function(){
    Foo.loading_window.hide();
  },
  init:function(){
    var modal = true;
    Foo.loading_window = new YAHOO.widget.Panel(&#8220;wait&#8221;, {
    width:"240px",
    fixedcenter:true,
    close:false,
    draggable:false,
    zindex:50,
    modal: modal,
    visible:false,
    shim:true
  }
}

Foo.loading_window.setHeader(&#8220;Loading, please wait&#8230;&#8221;);
Foo.loading\_window.setBody(&#8216;<img src=&#8221;http://us.i1.yimg.com/us.yimg.com/i/us/per/gr/gp/rel\_interstitial_loading.gif&#8221; />&#8217;);
Foo.loading_window.render(document.body);
```

you should notice I have also created an `init` method, the idea behind this is to execute this method once the page is done loading (when the DOM becomes available). to do that I make this the last line of the javascript file

```javascript
YAHOO.util.Event.onDOMReady( Foo.init, null, Foo );
```

Now that I have this nifty little loader, I want to have an easy way to show it and hide it whenever i make an Ajax call. To do that, I have an minor abstraction of Yahoo!&#8217;s Ajax implementation. I add these two methods to my javascript file.

```javascript
makeAjaxCall: function( url, params, parser, method, args ){
params = params || &#8221;;
parser = parser || function(o){void(null);};
method = method || &#8216;GET&#8217;;
args = args || {};
args._ajax_call_url = url;

Foo.loading();

var callback =
{
  success:function(o){
  parser(o);
  Foo.end_loading();
},

failure:function(o){
  Foo.log(&#8216;There was an Ajax Communication Error calling : &#8216;+o.argument.\_ajax\_call_url);
  Foo.log(&#8216;The Status was: &#8216;+o.status+&#8217; &#8216;+o.statusText);
  Foo.end_loading();
},

argument:args

};

YAHOO.util.Connect.asyncRequest( method, url, callback, params );

},

sendFormByAjax: function( form_id, url, parser, method, args ){

parser = parser || function(o){void(null);};

method = method || &#8216;GET&#8217;;

args = args || {};

args.\_ajax\_call_url = url;

Foo.loading();

var callback =

{

success:function(o){

parser(o);

Foo.end_loading();

},

failure:function(o){

Foo.log(&#8216;There was an Ajax Communication Error calling : &#8216;+o.argument.\_ajax\_call_url);

Foo.log(&#8216;The Status was: &#8216;+o.status+&#8217; &#8216;+o.statusText);

Foo.end_loading();

},

argument:args

};

YAHOO.util.Connect.setForm( form_id );

YAHOO.util.Connect.asyncRequest( method, url, callback );

}

```

Now that we have this very useful base class, we want a way to easily hang second level classes from it (namely, now that I have Foo, I want to create Foo.Bar under it, and have methods like Foo.Bar.drink_beer(&#8216;corona&#8217;). The ideal solution is to wrap up the logic for testing for existence of parent classes and creating the ones that don&#8217;t exist in a simple clean method. So we add a namespace method to Foo.

```javascript

namespace: function() {

var a=arguments, o=null, i, j, d;

for (i=0; i<a .length; i=i+1) {

d=a[i].split(&#8220;.&#8221;);

o=window;

for (j=0; j<d.length; j=j+1) {

o[d[j]]=o[d[j]] || {};

o=o[d[j]];

}

}

return o;

}

```

Now, even though I have made sure console.log is declared for browsers that don&#8217;t support it, sending code to production that uses console.log actively is not a good idea (certainly a better one that &#8220;alert();&#8221;, however. What I like to do is implement a log method, in this case Foo.log(), that simply wraps console.log. What the heck is the advantage of that? Simple, I also create a class property called &#8220;debug\_on&#8221;. Foo.log will test if the value of Foo.debug\_on is &#8220;truthy&#8221; if so, then log, if not do nothing. Now when I publish my code, I can just set debug\_on to false. If I need to debug in production, a bookmarklet, firebug command, or greasemonkey script can override my personal client instance of the &#8220;debug\_on&#8221; setting without disrupting the experience of other users. (I&#8217;ll show you how to do this in a later post).

```javascript

debug_on:true,

log:function(msg){if(Foo.debug_on){console.log(msg);}}

```

In the first level of the javascript class, I typically also have alot of convenience classes. For example, I have a standardized set of feedback divs and styles that I use, and I like to be able to easily use them from Javascript for Ajax and other interactions. I have a few class members for browser detection, and a few other utilities for form manipulation, dynamically determining the relative path of the script for other resources (css and images for example). Each of these items will also be covered in later posts

If you were playing along with the walkthrough, you probably pasted everything above in your text editor. If you are getting errors, check the commas between methods and properties, OR you could just download the sample file I created above from here. (see! laziness does pay off! At least once in a while!)
