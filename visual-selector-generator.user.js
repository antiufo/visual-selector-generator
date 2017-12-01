// ==UserScript==
// @name Visual selector generator
// @namespace Shaman
// @match *://*/*
// @grant none
// @grant GM_xmlhttpRequest
// @noframes
// ==/UserScript==


/*
function setHighlighted(el, enabled){
  if(enabled){
    
  }else{
    
  }
}

document.body.parentElement.addEventListener('mousemove', function(event) {
   var el = event.target;
   if(!el) return;
  
  
});
*/
/*
var pickerRoot = document.createElement('iframe');
pickerRoot.id = 'thepicker';

document.body.appendChild(pickerRoot);
*/


var blogHost = window.location.hostname.replace(/\./g, '_');
var hostQuery = 'host=eq.' + encodeURIComponent(blogHost);



var blogInfo = null;
function setvalues(modify){
    if(blogInfo) modify();
    else {
        var z = {host: blogHost, example_url: window.location.href};
        xhr('POST', '/shaman_bloginfo', z,
        result => { blogInfo = z; modify(); },
        err => {
          xhr('GET', '/shaman_bloginfo?' + hostQuery, null, r => {
            blogInfo = JSON.parse(r)[0];
            if(!blogInfo) alert('Error blog not found in db.');
            else modify(); 
          }, f => alert('Error: ' + f))
        });
    }
}

function findElements(sel){
  return [...document.querySelectorAll(sel)];
}


function onPickerLoaded(){
  
  
  xhr('GET', '/shaman_bloginfo?' + hostQuery, null, response => {
    blogInfo = JSON.parse(response)[0];
    if(!blogInfo) return;

    if(blogInfo.article_selector){
      var article = findElements(blogInfo.article_selector)[0];
      if(article)
        hideAllExcept(article);
    }
    
    if(blogInfo.to_delete){
      var sels = blogInfo.to_delete.split("\n");
      sels.forEach(x => {
        var items = findElements(sels);
        items.forEach(y => hide(y));
      });

    }

  }, err => {});

}

function xhr(method, url, data, onsuccess, onfail){

  console.log('xhr: ' + method + ' ' + url + ' ' + (data ? JSON.stringify(data) : ''));
  var handler = response => {
    if(response.status.toString().startsWith('2')) onsuccess(response.responseText);
    else onfail(response.responseText);
  };
  GM_xmlhttpRequest({
    url: 'http://localhost:3000' + url,
    method: method,
    data: data ? JSON.stringify(data) : undefined,
    headers: data ? { 'Content-Type': 'application/json' } : undefined,
    onload: function(response){
      handler(response);
    },
    onerror: function(response){
      if(!onfail) alert('Error: ' + (response.status || response.readyState));
      else handler(response);
    }
  });  

}

var epickerHtml = "<head>\r\n<meta charset=\"utf-8\">\r\n<style>\r\n:focus {\r\n    outline: none;\r\n}\r\nhtml, body {\r\n    background: transparent !important;\r\n    color: black;\r\n    font: 12px sans-serif;\r\n    height: 100%;\r\n    margin: 0;\r\n    overflow: hidden;\r\n    width: 100%;\r\n}\r\nul, li, div {\r\n    display: block;\r\n}\r\nul {\r\n    margin: 0.25em 0 0 0;\r\n}\r\nbutton {\r\n    background-color: #ccc;\r\n    border: 1px solid #aaa;\r\n    border-radius: 3px;\r\n    box-sizing: border-box;\r\n    box-shadow: none;\r\n    color: #000;\r\n    cursor: pointer;\r\n    margin: 0 0 0 2px;\r\n    opacity: 0.7;\r\n    padding: 4px 6px;\r\n}\r\nbutton:first-of-type {\r\n    margin-left: 0;\r\n}\r\nbutton:disabled {\r\n    color: #999;\r\n    background-color: #ccc;\r\n}\r\nbutton:not(:disabled):hover {\r\n    opacity: 1;\r\n}\r\n#create:not(:disabled) {\r\n    background-color: hsl(36, 100%, 83%);\r\n    border-color: hsl(36, 50%, 60%);\r\n}\r\n#preview {\r\n    float: left;\r\n}\r\nbody.preview #preview {\r\n    background-color: hsl(204, 100%, 83%);\r\n    border-color: hsl(204, 50%, 60%);\r\n}\r\nsection {\r\n    border: 0;\r\n    box-sizing: border-box;\r\n    display: inline-block;\r\n    width: 100%;\r\n}\r\nsection > div:first-child {\r\n    border: 1px solid #aaa;\r\n    margin: 0;\r\n    position: relative;\r\n}\r\nsection.invalidFilter > div:first-child {\r\n    border-color: red;\r\n}\r\nsection > div:first-child > textarea {\r\n    background-color: #fff;\r\n    border: none;\r\n    box-sizing: border-box;\r\n    font: 11px monospace;\r\n    height: 8em;\r\n    margin: 0;\r\n    overflow: hidden;\r\n    overflow-y: auto;\r\n    padding: 2px;\r\n    resize: none;\r\n    width: 100%;\r\n}\r\n#resultsetCount {\r\n    background-color: #aaa;\r\n    bottom: 0;\r\n    color: white;\r\n    padding: 2px 4px;\r\n    position: absolute;\r\n    right: 0;\r\n}\r\nsection.invalidFilter #resultsetCount {\r\n    background-color: red;\r\n}\r\nsection > div:first-child + div {\r\n    direction: ltr;\r\n    margin: 2px 0;\r\n    text-align: right;\r\n}\r\nul {\r\n    padding: 0;\r\n    list-style-type: none;\r\n    text-align: left;\r\n    overflow: hidden;\r\n}\r\naside > ul {\r\n    max-height: 16em;\r\n    overflow-y: auto;\r\n}\r\naside > ul > li:first-of-type {\r\n    margin-bottom: 0.5em;\r\n}\r\nul > li > span:nth-of-type(1) {\r\n    font-weight: bold;\r\n}\r\nul > li > span:nth-of-type(2) {\r\n    font-size: smaller;\r\n    color: gray;\r\n}\r\nul > li > ul {\r\n    list-style-type: none;\r\n    margin: 0 0 0 1em;\r\n    overflow: hidden;\r\n    text-align: left;\r\n}\r\nul > li > ul > li {\r\n    font: 11px monospace;\r\n    white-space: nowrap;\r\n    cursor: pointer;\r\n    direction: ltr;\r\n}\r\nul > li > ul > li:hover {\r\n    background-color: white;\r\n}\r\nsvg {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    cursor: crosshair;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.paused > svg {\r\n    cursor: not-allowed;\r\n}\r\nsvg > path:first-child {\r\n    fill: rgba(0,0,0,0.5);\r\n    fill-rule: evenodd;\r\n}\r\nsvg > path + path {\r\n    stroke: #F00;\r\n    stroke-width: 0.5px;\r\n    fill: rgba(255,63,63,0.20);\r\n}\r\nbody.zap svg > path + path {\r\n    stroke: #FF0;\r\n    stroke-width: 0.5px;\r\n    fill: rgba(255,255,63,0.20);\r\n}\r\nbody.preview svg > path {\r\n    fill: rgba(0,0,0,0.10);\r\n}\r\nbody.preview svg > path + path {\r\n    stroke: none;\r\n}\r\naside {\r\n    background-color: #eee;\r\n    border: 1px solid #aaa;\r\n    bottom: 4px;\r\n    box-sizing: border-box;\r\n    min-width: 24em;\r\n    padding: 4px;\r\n    position: fixed;\r\n    right: 4px;\r\n    visibility: hidden;\r\n    width: calc(40% - 4px);\r\n}\r\nbody.paused > aside {\r\n    opacity: 0.1;\r\n    visibility: visible;\r\n    z-index: 100;\r\n}\r\nbody.paused > aside:hover {\r\n    opacity: 1;\r\n}\r\nbody.paused > aside.show {\r\n    opacity: 1;\r\n}\r\nbody.paused > aside.hide {\r\n    opacity: 0.1;\r\n}\r\n</style>\r\n</head>\r\n\r\n<body direction=\"{{bidi_dir}}\">\r\n<svg><path></path><path></path></svg>\r\n<aside>\r\n<section>\r\n    <div>\r\n        <textarea lang=\"en\" dir=\"ltr\" spellcheck=\"false\"></textarea>\r\n        <div id=\"resultsetCount\"></div>\r\n    </div>\r\n    <div><!--\r\n    --><button id=\"preview\" type=\"button\">{{preview}}</button><!--\r\n    --><button id=\"create\" type=\"button\" disabled>{{create}}</button><!--\r\n    --><button id=\"pick\" type=\"button\">{{pick}}</button><!--\r\n    --><button id=\"quit\" type=\"button\">{{quit}}</button><!--\r\n    --></div>\r\n</section>\r\n<ul>\r\n    <li id=\"netFilters\">\r\n        <span>{{netFilters}}</span><ul lang=\"en\" class=\"changeFilter\"></ul>\r\n    </li>\r\n    <li id=\"cosmeticFilters\">\r\n        <span>{{cosmeticFilters}}</span> <span>{{cosmeticFiltersHint}}</span>\r\n        <ul lang=\"en\" class=\"changeFilter\"></ul>\r\n    </li>\r\n</ul>\r\n</aside>\r\n</body>\r\n";


window.µb = {
    mouseEventRegister: {x: -1, y: -1}
}

window.vAPI = {
  sessionId: 'thepicker',
  messaging: {
    send: (name, obj, callback)=>{
        if(obj.what == 'elementPickerArguments'){
        
            var reStrings = /\{\{(\w+)\}\}/g;
            var replacer = function(a0, string) {
                return string;
            };
        
            var pickerRoot = document.getElementById(vAPI.sessionId);
        
            callback({
                frameContent: epickerHtml.replace(reStrings, replacer), //pickerRoot.contentWindow.document.body.parentElement.outerHTML.replace(reStrings, replacer),
                target: µb.epickerTarget,
                clientX: µb.mouseEventRegister.x,
                clientY: µb.mouseEventRegister.y,
                zap: µb.epickerZap,
                eprom: µb.epickerEprom
            });
            return;
        }
        console.log('messaging.send: ' + name);
    },
  },
  setTimeout: (func, ms) => window.setTimeout(func, ms),
  userStylesheet: {
    _map: {},
    add: x => {
        var s = document.createElement('style');
        s.textContent = x;
        document.head.appendChild(s);
        vAPI.userStylesheet._map[x] = s;
    },
    remove: x => {
        var s = vAPI.userStylesheet._map[x];
        if(s){
            s.remove(true);
            delete vAPI.userStylesheet._map[x];
        }
    },
    apply: () => {}//{console.log('userStylesheet.apply')}
  },
  shutdown: {
    add: x => {console.log('shutdown.add: ' + x)},
    remove: x => {console.log('shutdown.remove: ' + x)}
  }
};





vAPI.DOMFilterer = function() {
    //this.commitTimer = new vAPI.SafeAnimationFrame(this.commitNow.bind(this));
    this.domIsReady = document.readyState !== 'loading';
    this.disabled = false;
    this.listeners = [];
    this.filterset = new Set();
    this.excludedNodeSet = new WeakSet();
    this.addedCSSRules = new Set();

    if ( this.domIsReady !== true ) {
        document.addEventListener('DOMContentLoaded', () => {
            this.domIsReady = true;
            this.commit();
        });
    }
};











///////////////////////////////////////////////////////
// INCLUSION: platform\webext\vapi-usercss.js
///////////////////////////////////////////////////////





vAPI.DOMFilterer.prototype = {
    reOnlySelectors: /\n\{[^\n]+/g,

    // Here we will deal with:
    // - Injecting low priority user styles;
    // - Notifying listeners about changed filterset.
    commitNow: function() {
        this.commitTimer.clear();
        var userStylesheet = vAPI.userStylesheet;
        for ( var entry of this.addedCSSRules ) {
            if (
                this.disabled === false &&
                entry.lazy &&
                entry.injected === false
            ) {
                userStylesheet.add(
                    entry.selectors + '\n{' + entry.declarations + '}'
                );
            }
        }
        this.addedCSSRules.clear();
        userStylesheet.apply();
    },

    commit: function(commitNow) {
        if ( commitNow ) {
            this.commitTimer.clear();
            this.commitNow();
        } else {
            this.commitTimer.start();
        }
    },

    addCSSRule: function(selectors, declarations, details) {
        if ( selectors === undefined ) { return; }
        var selectorsStr = Array.isArray(selectors)
                ? selectors.join(',\n')
                : selectors;
        if ( selectorsStr.length === 0 ) { return; }
        if ( details === undefined ) { details = {}; }
        var entry = {
            selectors: selectorsStr,
            declarations,
            lazy: details.lazy === true,
            injected: details.injected === true
        };
        this.addedCSSRules.add(entry);
        this.filterset.add(entry);
        if (
            this.disabled === false &&
            entry.lazy !== true &&
            entry.injected !== true
        ) {
            vAPI.userStylesheet.add(selectorsStr + '\n{' + declarations + '}');
        }
        this.commit();
        if ( this.hasListeners() ) {
            this.triggerListeners({
                declarative: [ [ selectorsStr, declarations ] ]
            });
        }
    },

    addListener: function(listener) {
        if ( this.listeners.indexOf(listener) !== -1 ) { return; }
        this.listeners.push(listener);
    },

    removeListener: function(listener) {
        var pos = this.listeners.indexOf(listener);
        if ( pos === -1 ) { return; }
        this.listeners.splice(pos, 1);
    },

    hasListeners: function() {
        return this.listeners.length !== 0;
    },

    triggerListeners: function(changes) {
        var i = this.listeners.length;
        while ( i-- ) {
            this.listeners[i].onFiltersetChanged(changes);
        }
    },

    excludeNode: function(node) {
        this.excludedNodeSet.add(node);
        this.unhideNode(node);
    },

    unexcludeNode: function(node) {
        this.excludedNodeSet.delete(node);
    },

    hideNode: function(node) {
        if ( this.excludedNodeSet.has(node) ) { return; }
        if ( this.hideNodeAttr === undefined ) { return; }
        node.setAttribute(this.hideNodeAttr, '');
        if ( this.hideNodeStyleSheetInjected === false ) {
            this.hideNodeStyleSheetInjected = true;
            this.addCSSRule(
                '[' + this.hideNodeAttr + ']',
                'display:none!important;'
            );
        }
    },

    unhideNode: function(node) {
        if ( this.hideNodeAttr === undefined ) { return; }
        node.removeAttribute(this.hideNodeAttr);
    },

    toggle: function(state, callback) {
        if ( state === undefined ) { state = this.disabled; }
        if ( state !== this.disabled ) { return; }
        this.disabled = !state;
        var userStylesheet = vAPI.userStylesheet;
        for ( var entry of this.filterset ) {
            var rule = entry.selectors + '\n{' + entry.declarations + '}';
            if ( this.disabled ) {
                userStylesheet.remove(rule);
            } else {
                userStylesheet.add(rule);
            }
        }
        userStylesheet.apply(callback);
    },

    getAllSelectors_: function(all) {
        var out = {
            declarative: []
        };
        for ( var entry of this.filterset ) {
            if ( all === false && entry.internal ) { continue; }
            out.declarative.push([ entry.selectors, entry.declarations ]);
        }
        return out;
    },

    getFilteredElementCount: function() {
        let details = this.getAllSelectors_(true);
        if ( Array.isArray(details.declarative) === false ) { return 0; }
        let selectors = details.declarative.reduce(function(acc, entry) {
            acc.push(entry[0]);
            return acc;
        }, []);
        if ( selectors.length === 0 ) { return 0; }
        return document.querySelectorAll(selectors.join(',\n')).length;
    },

    getAllSelectors: function() {
        return this.getAllSelectors_(false);
    }
};


















///////////////////////////////////////////////////////
// INCLUSION: src\js\contentscript.js
///////////////////////////////////////////////////////






vAPI.DOMFilterer = (function() {

    // 'P' stands for 'Procedural'

    var PSelectorHasTask = function(task) {
        this.selector = task[1];
    };
    PSelectorHasTask.prototype.exec = function(input) {
        var output = [];
        for ( var node of input ) {
            if ( node.querySelector(this.selector) !== null ) {
                output.push(node);
            }
        }
        return output;
    };

    var PSelectorHasTextTask = function(task) {
        this.needle = new RegExp(task[1]);
    };
    PSelectorHasTextTask.prototype.exec = function(input) {
        var output = [];
        for ( var node of input ) {
            if ( this.needle.test(node.textContent) ) {
                output.push(node);
            }
        }
        return output;
    };

    var PSelectorIfTask = function(task) {
        this.pselector = new PSelector(task[1]);
    };
    PSelectorIfTask.prototype.target = true;
    PSelectorIfTask.prototype.exec = function(input) {
        var output = [];
        for ( var node of input ) {
            if ( this.pselector.test(node) === this.target ) {
                output.push(node);
            }
        }
        return output;
    };

    var PSelectorIfNotTask = function(task) {
        PSelectorIfTask.call(this, task);
        this.target = false;
    };
    PSelectorIfNotTask.prototype = Object.create(PSelectorIfTask.prototype);
    PSelectorIfNotTask.prototype.constructor = PSelectorIfNotTask;

    var PSelectorMatchesCSSTask = function(task) {
        this.name = task[1].name;
        this.value = new RegExp(task[1].value);
    };
    PSelectorMatchesCSSTask.prototype.pseudo = null;
    PSelectorMatchesCSSTask.prototype.exec = function(input) {
        var output = [], style;
        for ( var node of input ) {
            style = window.getComputedStyle(node, this.pseudo);
            if ( style === null ) { return null; } /* FF */
            if ( this.value.test(style[this.name]) ) {
                output.push(node);
            }
        }
        return output;
    };

    var PSelectorMatchesCSSAfterTask = function(task) {
        PSelectorMatchesCSSTask.call(this, task);
        this.pseudo = ':after';
    };
    PSelectorMatchesCSSAfterTask.prototype = Object.create(PSelectorMatchesCSSTask.prototype);
    PSelectorMatchesCSSAfterTask.prototype.constructor = PSelectorMatchesCSSAfterTask;

    var PSelectorMatchesCSSBeforeTask = function(task) {
        PSelectorMatchesCSSTask.call(this, task);
        this.pseudo = ':before';
    };
    PSelectorMatchesCSSBeforeTask.prototype = Object.create(PSelectorMatchesCSSTask.prototype);
    PSelectorMatchesCSSBeforeTask.prototype.constructor = PSelectorMatchesCSSBeforeTask;

    var PSelectorXpathTask = function(task) {
        this.xpe = document.createExpression(task[1], null);
        this.xpr = null;
    };
    PSelectorXpathTask.prototype.exec = function(input) {
        var output = [], j;
        for ( var node of input ) {
            this.xpr = this.xpe.evaluate(
                node,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                this.xpr
            );
            j = this.xpr.snapshotLength;
            while ( j-- ) {
                node = this.xpr.snapshotItem(j);
                if ( node.nodeType === 1 ) {
                    output.push(node);
                }
            }
        }
        return output;
    };

    var PSelector = function(o) {
        if ( PSelector.prototype.operatorToTaskMap === undefined ) {
            PSelector.prototype.operatorToTaskMap = new Map([
                [ ':has', PSelectorHasTask ],
                [ ':has-text', PSelectorHasTextTask ],
                [ ':if', PSelectorIfTask ],
                [ ':if-not', PSelectorIfNotTask ],
                [ ':matches-css', PSelectorMatchesCSSTask ],
                [ ':matches-css-after', PSelectorMatchesCSSAfterTask ],
                [ ':matches-css-before', PSelectorMatchesCSSBeforeTask ],
                [ ':xpath', PSelectorXpathTask ]
            ]);
        }
        this.budget = 250; // I arbitrary picked a 1/4 second
        this.raw = o.raw;
        this.cost = 0;
        this.selector = o.selector;
        this.tasks = [];
        var tasks = o.tasks;
        if ( !tasks ) { return; }
        for ( var task of tasks ) {
            this.tasks.push(new (this.operatorToTaskMap.get(task[0]))(task));
        }
    };
    PSelector.prototype.operatorToTaskMap = undefined;
    PSelector.prototype.prime = function(input) {
        var root = input || document;
        if ( this.selector !== '' ) {
            return root.querySelectorAll(this.selector);
        }
        return [ root ];
    };
    PSelector.prototype.exec = function(input) {
        var nodes = this.prime(input);
        for ( var task of this.tasks ) {
            if ( nodes.length === 0 ) { break; }
            nodes = task.exec(nodes);
        }
        return nodes;
    };
    PSelector.prototype.test = function(input) {
        var nodes = this.prime(input), AA = [ null ], aa;
        for ( var node of nodes ) {
            AA[0] = node; aa = AA;
            for ( var task of this.tasks ) {
                aa = task.exec(aa);
                if ( aa.length === 0 ) { break; }
            }
            if ( aa.length !== 0 ) { return true; }
        }
        return false;
    };

    var DOMProceduralFilterer = function(domFilterer) {
        this.domFilterer = domFilterer;
        this.domIsReady = false;
        this.domIsWatched = false;
        this.addedSelectors = new Map();
        this.addedNodes = false;
        this.removedNodes = false;
        this.addedNodesHandlerMissCount = 0;
        this.currentResultset = new Set();
        this.selectors = new Map();
    };

    DOMProceduralFilterer.prototype = {

        addProceduralSelectors: function(aa) {
            var raw, o, pselector,
                mustCommit = this.domIsWatched;
            for ( var i = 0, n = aa.length; i < n; i++ ) {
                raw = aa[i];
                o = JSON.parse(raw);
                if ( o.style ) {
                    this.domFilterer.addCSSRule(o.style[0], o.style[1]);
                    mustCommit = true;
                    continue;
                }
                if ( o.pseudoclass ) {
                    this.domFilterer.addCSSRule(
                        o.raw,
                        'display:none!important;'
                    );
                    mustCommit = true;
                    continue;
                }
                if ( o.tasks ) {
                    if ( this.selectors.has(raw) === false ) {
                        pselector = new PSelector(o);
                        this.selectors.set(raw, pselector);
                        this.addedSelectors.set(raw, pselector);
                        mustCommit = true;
                    }
                    continue;
                }
            }
            if ( mustCommit === false ) { return; }
            this.domFilterer.commit();
            if ( this.domFilterer.hasListeners() ) {
                this.domFilterer.triggerListeners({
                    procedural: Array.from(this.addedSelectors.values())
                });
            }
        },

        commitNow: function() {
            if ( this.selectors.size === 0 || this.domIsReady === false ) {
                return;
            }

            if ( this.addedNodes || this.removedNodes ) {
                this.addedSelectors.clear();
            }

            var currentResultset = this.currentResultset,
                entry, nodes, i, node;

            if ( this.addedSelectors.size !== 0 ) {
                //console.time('procedural selectors/filterset changed');
                for ( entry of this.addedSelectors ) {
                    nodes = entry[1].exec();
                    i = nodes.length;
                    while ( i-- ) {
                        node = nodes[i];
                        this.domFilterer.hideNode(node);
                        currentResultset.add(node);
                    }
                }
                this.addedSelectors.clear();
                //console.timeEnd('procedural selectors/filterset changed');
                return;
            }

            //console.time('procedural selectors/dom layout changed');

            this.addedNodes = this.removedNodes = false;

            var afterResultset = new Set(),
                t0 = Date.now(), t1, cost, pselector;

            for ( entry of this.selectors ) {
                pselector = entry[1];
                if ( pselector.budget <= 0 ) { continue; }
                nodes = pselector.exec();
                i = nodes.length;
                while ( i-- ) {
                    node = nodes[i];
                    this.domFilterer.hideNode(node);
                    afterResultset.add(node);
                }
                t1 = Date.now();
                cost = t1 - t0;
                t0 = t1;
                if ( cost <= 8 ) { continue; }
                pselector.budget -= cost;
                if ( pselector.budget <= 0 ) {
                    console.log('disabling %s', pselector.raw);
                }
            }
            if ( afterResultset.size !== currentResultset.size ) {
                this.addedNodesHandlerMissCount = 0;
            } else {
                this.addedNodesHandlerMissCount += 1;
            }
            for ( node of currentResultset ) {
                if ( afterResultset.has(node) === false ) {
                    this.domFilterer.unhideNode(node);
                }
            }

            this.currentResultset = afterResultset;

            //console.timeEnd('procedural selectors/dom layout changed');
        },

        createProceduralFilter: function(o) {
            return new PSelector(o);
        },

        onDOMCreated: function() {
            this.domIsReady = true;
            this.domFilterer.commitNow();
        },

        onDOMChanged: function(addedNodes, removedNodes) {
            if ( this.selectors.size === 0 ) { return; }
            this.addedNodes = this.addedNodes || addedNodes.length !== 0;
            this.removedNodes = this.removedNodes || removedNodes;
            this.domFilterer.commit();
        }
    };

    var DOMFiltererBase = vAPI.DOMFilterer;

    var domFilterer = function() {
        DOMFiltererBase.call(this);
        this.exceptions = [];
        this.proceduralFilterer = new DOMProceduralFilterer(this);
        this.hideNodeAttr = undefined;
        this.hideNodeStyleSheetInjected = false;

        // May or may not exist: cache locally since this may be called often.
        this.baseOnDOMChanged = DOMFiltererBase.prototype.onDOMChanged;

        if ( vAPI.domWatcher instanceof Object ) {
            vAPI.domWatcher.addListener(this);
        }
    };
    domFilterer.prototype = Object.create(DOMFiltererBase.prototype);
    domFilterer.prototype.constructor = domFilterer;

    domFilterer.prototype.commitNow = function() {
        DOMFiltererBase.prototype.commitNow.call(this);
        this.proceduralFilterer.commitNow();
    };

    domFilterer.prototype.addProceduralSelectors = function(aa) {
        this.proceduralFilterer.addProceduralSelectors(aa);
    };

    domFilterer.prototype.createProceduralFilter = function(o) {
        return this.proceduralFilterer.createProceduralFilter(o);
    };

    domFilterer.prototype.getAllSelectors = function() {
        var out = DOMFiltererBase.prototype.getAllSelectors.call(this);
        out.procedural = Array.from(this.proceduralFilterer.selectors.values());
        return out;
    };

    domFilterer.prototype.getAllExceptionSelectors = function() {
        return this.exceptions.join(',\n');
    };

    domFilterer.prototype.onDOMCreated = function() {
        if ( DOMFiltererBase.prototype.onDOMCreated !== undefined ) {
            DOMFiltererBase.prototype.onDOMCreated.call(this);
        }
        this.proceduralFilterer.onDOMCreated();
    };

    domFilterer.prototype.onDOMChanged = function() {
        if ( this.baseOnDOMChanged !== undefined ) {
            this.baseOnDOMChanged.apply(this, arguments);
        }
        this.proceduralFilterer.onDOMChanged.apply(
            this.proceduralFilterer,
            arguments
        );
    };

    return domFilterer;
})();

vAPI.domFilterer = new vAPI.DOMFilterer();
























///////////////////////////////////////////////////////
// INCLUSION: src\js\scriptlets\element-picker.js
///////////////////////////////////////////////////////
















/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2014-2017 Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

/* global CSS */

'use strict';

/******************************************************************************/
/******************************************************************************/

/*! http://mths.be/cssescape v0.2.1 by @mathias | MIT license */
;(function(root) {

    if (!root.CSS) {
        root.CSS = {};
    }

    var CSS = root.CSS;

    var InvalidCharacterError = function(message) {
        this.message = message;
    };
    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    if (!CSS.escape) {
        // http://dev.w3.org/csswg/cssom/#serialize-an-identifier
        CSS.escape = function(value) {
            var string = String(value);
            var length = string.length;
            var index = -1;
            var codeUnit;
            var result = '';
            var firstCodeUnit = string.charCodeAt(0);
            while (++index < length) {
                codeUnit = string.charCodeAt(index);
                // Note: there’s no need to special-case astral symbols, surrogate
                // pairs, or lone surrogates.

                // If the character is NULL (U+0000), then throw an
                // `InvalidCharacterError` exception and terminate these steps.
                if (codeUnit === 0x0000) {
                    throw new InvalidCharacterError(
                        'Invalid character: the input contains U+0000.'
                    );
                }

                if (
                    // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
                    // U+007F, […]
                    (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit === 0x007F ||
                    // If the character is the first character and is in the range [0-9]
                    // (U+0030 to U+0039), […]
                    (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
                    // If the character is the second character and is in the range [0-9]
                    // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
                    (
                        index === 1 &&
                        codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
                        firstCodeUnit === 0x002D
                    )
                ) {
                    // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
                    result += '\\' + codeUnit.toString(16) + ' ';
                    continue;
                }

                // If the character is not handled by one of the above rules and is
                // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
                // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
                // U+005A), or [a-z] (U+0061 to U+007A), […]
                if (
                    codeUnit >= 0x0080 ||
                    codeUnit === 0x002D ||
                    codeUnit === 0x005F ||
                    codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
                    codeUnit >= 0x0041 && codeUnit <= 0x005A ||
                    codeUnit >= 0x0061 && codeUnit <= 0x007A
                ) {
                    // the character itself
                    result += string.charAt(index);
                    continue;
                }

                // Otherwise, the escaped character.
                // http://dev.w3.org/csswg/cssom/#escape-a-character
                result += '\\' + string.charAt(index);

            }
            return result;
        };
    }

}(self));

/******************************************************************************/
/******************************************************************************/

(function() {

/******************************************************************************/

if (
    window.top !== window ||
    typeof vAPI !== 'object' ||
    vAPI.domFilterer instanceof Object === false
) {
    return;
}

var pickerRoot = document.getElementById(vAPI.sessionId);
if ( pickerRoot ) {
    return;
}

var pickerBody = null;
var svgOcean = null;
var svgIslands = null;
var svgRoot = null;
var dialog = null;
var taCandidate = null;

var netFilterCandidates = [];
var cosmeticFilterCandidates = [];

var targetElements = [];
var candidateElements = [];
var bestCandidateFilter = null;

var lastNetFilterSession = window.location.host + window.location.pathname;
var lastNetFilterHostname = '';
var lastNetFilterUnion = '';

/******************************************************************************/

// For browsers not supporting `:scope`, it's not the end of the world: the
// suggested CSS selectors may just end up being more verbose.

var cssScope = ':scope > ';

try {
    document.querySelector(':scope *');
} catch (e) {
    cssScope = '';
}

/******************************************************************************/

var safeQuerySelectorAll = function(node, selector) {
    if ( node !== null ) {
        try {
            return node.querySelectorAll(selector);
        } catch (e) {
        }
    }
    return [];
};

/******************************************************************************/

var rawFilterFromTextarea = function() {
    var s = taCandidate.value,
        pos = s.indexOf('\n');
    return pos === -1 ? s.trim() : s.slice(0, pos).trim();
};

/******************************************************************************/

var getElementBoundingClientRect = function(elem) {
    var rect = typeof elem.getBoundingClientRect === 'function' ?
        elem.getBoundingClientRect() :
        { height: 0, left: 0, top: 0, width: 0 };

    // https://github.com/gorhill/uBlock/issues/1024
    // Try not returning an empty bounding rect.
    if ( rect.width !== 0 && rect.height !== 0 ) {
        return rect;
    }

    var left = rect.left,
        right = rect.right,
        top = rect.top,
        bottom = rect.bottom;

    var children = elem.children,
        i = children.length;

    while ( i-- ) {
        rect = getElementBoundingClientRect(children[i]);
        if ( rect.width === 0 || rect.height === 0 ) {
            continue;
        }
        if ( rect.left < left ) { left = rect.left; }
        if ( rect.right > right ) { right = rect.right; }
        if ( rect.top < top ) { top = rect.top; }
        if ( rect.bottom > bottom ) { bottom = rect.bottom; }
    }

    return {
        height: bottom - top,
        left: left,
        top: top,
        width: right - left
    };
};

/******************************************************************************/

var originalTargetElement = null;

var highlightElements = function(elems, force) {
    // To make mouse move handler more efficient
    if ( !force && elems.length === targetElements.length ) {
        if ( elems.length === 0 || elems[0] === targetElements[0] ) {
            return;
        }
    }
    targetElements = elems;
    
    var first = targetElements[0];
    if(first){
        if(!originalTargetElement || !first.contains(originalTargetElement)){
            originalTargetElement = first;
            //alert('setto: ' + first.outerHTML)
        }
    }else{
        originalTargetElement = null;
        //alert('setnull')
    }
    
    
    var sel = getSelectorForCurrentTarget();
    var pickerDoc = pickerRoot.contentWindow.document;
    if(!pickerDoc.getElementById('current-selector')){
        var cur = pickerDoc.createElement('div');
        cur.id = 'current-selector';
        cur.style.color = 'white';
        cur.style.position = 'fixed';
        cur.style.fontSize = '15pt';
        cur.style.fontWeight = 'bold';
        pickerDoc.body.appendChild(cur);
    }
    pickerDoc.getElementById('current-selector').textContent = sel || '';
    
    //if(!originalTargetElement ||)
    //if(!isNarrowLooseAdjustment) originalTargetElements = targetElements;

    var ow = pickerRoot.contentWindow.innerWidth;
    var oh = pickerRoot.contentWindow.innerHeight;
    var ocean = [
        'M0 0',
        'h', ow,
        'v', oh,
        'h-', ow,
        'z'
    ];
    var islands = [];

    var elem, rect, poly;
    for ( var i = 0; i < elems.length; i++ ) {
        elem = elems[i];
        if ( elem === pickerRoot ) {
            continue;
        }
        rect = getElementBoundingClientRect(elem);

        // Ignore if it's not on the screen
        if ( rect.left > ow || rect.top > oh ||
             rect.left + rect.width < 0 || rect.top + rect.height < 0 ) {
            continue;
        }

        poly = 'M' + rect.left + ' ' + rect.top +
               'h' + rect.width +
               'v' + rect.height +
               'h-' + rect.width +
               'z';
        ocean.push(poly);
        islands.push(poly);
    }
    svgOcean.setAttribute('d', ocean.join(''));
    svgIslands.setAttribute('d', islands.join('') || 'M0 0');
};

/******************************************************************************/

// https://github.com/gorhill/uBlock/issues/1897
// Ignore `data:` URI, they can't be handled by an HTTP observer.

var backgroundImageURLFromElement = function(elem) {
    var style = window.getComputedStyle(elem),
        bgImg = style.backgroundImage || '',
        matches = /^url\((["']?)([^"']+)\1\)$/.exec(bgImg),
        url = matches !== null && matches.length === 3 ? matches[2] : '';
    return url.lastIndexOf('data:', 0) === -1 ? url.slice(0, 1024) : '';
};

/******************************************************************************/

// https://github.com/gorhill/uBlock/issues/1725#issuecomment-226479197
// Limit returned string to 1024 characters.
// Also, return only URLs which will be seen by an HTTP observer.

var resourceURLFromElement = function(elem) {
    var tagName = elem.localName, s;
    if (
        (s = netFilter1stSources[tagName]) ||
        (s = netFilter2ndSources[tagName])
    ) {
        s = elem[s];
        if ( typeof s === 'string' && /^https?:\/\//.test(s) ) {
            return s.slice(0, 1024);
        }
    }
    return backgroundImageURLFromElement(elem);
};

/******************************************************************************/

var netFilterFromUnion = (function() {
    var reTokenizer = /[^0-9a-z%*]+|[0-9a-z%]+|\*/gi;
    var a = document.createElement('a');

    return function(to, out) {
        a.href= to;
        to = a.pathname + a.search;
        var from = lastNetFilterUnion;

        // Reset reference filter when dealing with unrelated URLs
        if ( from === '' || a.host === '' || a.host !== lastNetFilterHostname ) {
            lastNetFilterHostname = a.host;
            lastNetFilterUnion = to;
            vAPI.messaging.send(
                'elementPicker',
                {
                    what: 'elementPickerEprom',
                    lastNetFilterSession: lastNetFilterSession,
                    lastNetFilterHostname: lastNetFilterHostname,
                    lastNetFilterUnion: lastNetFilterUnion
                }
            );
            return;
        }

        // Related URLs
        lastNetFilterHostname = a.host;

        var fromTokens = from.match(reTokenizer);
        var toTokens = to.match(reTokenizer);
        var toCount = toTokens.length, toIndex = 0;
        var fromToken, pos;

        for ( var fromIndex = 0; fromIndex < fromTokens.length; fromIndex += 1 ) {
            fromToken = fromTokens[fromIndex];
            if ( fromToken === '*' ) {
                continue;
            }
            pos = toTokens.indexOf(fromToken, toIndex);
            if ( pos === -1 ) {
                fromTokens[fromIndex] = '*';
                continue;
            }
            if ( pos !== toIndex ) {
                fromTokens.splice(fromIndex, 0, '*');
                fromIndex += 1;
            }
            toIndex = pos + 1;
            if ( toIndex === toCount ) {
                fromTokens = fromTokens.slice(0, fromIndex + 1);
                break;
            }
        }
        from = fromTokens.join('').replace(/\*\*+/g, '*');
        if ( from !== '/*' && from !== to ) {
            var filter = '||' + lastNetFilterHostname + from;
            if ( out.indexOf(filter) === -1 ) {
                out.push(filter);
            }
        } else {
            from = to;
        }
        lastNetFilterUnion = from;

        // Remember across element picker sessions
        vAPI.messaging.send(
            'elementPicker',
            {
                what: 'elementPickerEprom',
                lastNetFilterSession: lastNetFilterSession,
                lastNetFilterHostname: lastNetFilterHostname,
                lastNetFilterUnion: lastNetFilterUnion
            }
        );
    };
})();

/******************************************************************************/

// Extract the best possible net filter, i.e. as specific as possible.

var netFilterFromElement = function(elem) {
    if ( elem === null ) {
        return 0;
    }
    if ( elem.nodeType !== 1 ) {
        return 0;
    }
    var src = resourceURLFromElement(elem);
    if ( src === '' ) {
        return 0;
    }

    if ( candidateElements.indexOf(elem) === -1 ) {
        candidateElements.push(elem);
    }

    var candidates = netFilterCandidates;
    var len = candidates.length;

    // Remove fragment
    var pos = src.indexOf('#');
    if ( pos !== -1 ) {
        src = src.slice(0, pos);
    }

    var filter = src.replace(/^https?:\/\//, '||');

    if ( bestCandidateFilter === null ) {
        bestCandidateFilter = {
            type: 'net',
            filters: candidates,
            slot: candidates.length
        };
    }

    candidates.push(filter);

    // Suggest a less narrow filter if possible
    pos = filter.indexOf('?');
    if ( pos !== -1 ) {
        candidates.push(filter.slice(0, pos));
    }

    // Suggest a filter which is a result of combining more than one URL.
    netFilterFromUnion(src, candidates);

    return candidates.length - len;
};

var netFilter1stSources = {
     'audio': 'src',
     'embed': 'src',
    'iframe': 'src',
       'img': 'src',
    'object': 'data',
     'video': 'src'
};

var netFilter2ndSources = {
       'img': 'srcset'
};

var filterTypes = {
     'audio': 'media',
     'embed': 'object',
    'iframe': 'subdocument',
       'img': 'image',
    'object': 'object',
     'video': 'media',
};

/******************************************************************************/

// Extract the best possible cosmetic filter, i.e. as specific as possible.

// https://github.com/gorhill/uBlock/issues/1725
// Also take into account the `src` attribute for `img` elements -- and limit
// the value to the 1024 first characters.

var cosmeticFilterFromElement = function(elem, realtime) {
    if ( elem === null ) {
        return 0;
    }
    if ( elem.nodeType !== 1 ) {
        return 0;
    }

    if (!realtime && candidateElements.indexOf(elem) === -1 ) {
        candidateElements.push(elem);
    }

    var tagName = elem.localName;
    var selector = '';
    var v, i;
    
    selector += tagName;

    // Id
    v = typeof elem.id === 'string' && CSS.escape(elem.id);
    if ( v ) {
        selector += '#' + v;
    }

    // Class(es)
    v = elem.classList;
    if ( v ) {
        i = v.length || 0;
        while ( i-- ) {
            selector += '.' + CSS.escape(v.item(i));
        }
    }

    // Tag name
    // https://github.com/gorhill/uBlock/issues/1901
    // Trim attribute value, this may help in case of malformed HTML.
    if ( selector === '' ) {
        selector = tagName;
        var attributes = [], attr;
        switch ( tagName ) {
        case 'a':
            v = elem.getAttribute('href');
            if ( v ) {
                v = v.trim().replace(/\?.*$/, '');
                if ( v.length ) {
                    attributes.push({ k: 'href', v: v });
                }
            }
            break;
        case 'iframe':
        case 'img':
            v = elem.getAttribute('src');
            if ( v && v.length !== 0 ) {
                attributes.push({ k: 'src', v: v.trim().slice(0, 1024) });
                break;
            }
            v = elem.getAttribute('alt');
            if ( v && v.length !== 0 ) {
                attributes.push({ k: 'alt', v: v });
                break;
            }
            break;
        default:
            break;
        }
        while ( (attr = attributes.pop()) ) {
            if ( attr.v.length === 0 ) {
                continue;
            }
            v = elem.getAttribute(attr.k);
            if ( attr.v === v ) {
                selector += '[' + attr.k + '="' + attr.v + '"]';
            } else if ( v.lastIndexOf(attr.v, 0) === 0 ) {
                selector += '[' + attr.k + '^="' + attr.v + '"]';
            } else {
                selector += '[' + attr.k + '*="' + attr.v + '"]';
            }
        }
    }

    // https://github.com/chrisaljoudi/uBlock/issues/637
    // If the selector is still ambiguous at this point, further narrow using
    // `nth-of-type`. It is preferable to use `nth-of-type` as opposed to
    // `nth-child`, as `nth-of-type` is less volatile.
    var parentNode = elem.parentNode;
    if (safeQuerySelectorAll(parentNode, cssScope + selector).length > 1 ) {
        i = 1;
        while ( elem.previousSibling !== null ) {
            elem = elem.previousSibling;
            if ( typeof elem.localName !== 'string' || elem.localName !== tagName ) {
                continue;
            }
            i++;
        }
        selector += ':nth-of-type(' + i + ')';
    }

    if(realtime) return selector;

    if ( bestCandidateFilter === null ) {
        bestCandidateFilter = {
            type: 'cosmetic',
            filters: cosmeticFilterCandidates,
            slot: cosmeticFilterCandidates.length
        };
    }

    cosmeticFilterCandidates.push('##' + selector);

    return 1;
};

/******************************************************************************/

var filtersFrom = function(x, y) {
    bestCandidateFilter = null;
    netFilterCandidates.length = 0;
    cosmeticFilterCandidates.length = 0;
    candidateElements.length = 0;

    // We need at least one element.
    var first = null;
    if ( typeof x === 'number' ) {
        first = elementFromPoint(x, y);
    } else if ( x instanceof HTMLElement ) {
        first = x;
        x = undefined;
    } else if (x === null){
        first = targetElements[0];
        if(!first) return 0;
        //alert(first.outerHTML)
    }

    // Network filter from element which was clicked.
    if ( first !== null ) {
        netFilterFromElement(first);
    }

    // Cosmetic filter candidates from ancestors.
    var elem = first;
    while ( elem && elem !== document.body ) {
        cosmeticFilterFromElement(elem);
        elem = elem.parentNode;
    }
    // The body tag is needed as anchor only when the immediate child
    // uses`nth-of-type`.
    var i = cosmeticFilterCandidates.length;
    if ( i !== 0 && cosmeticFilterCandidates[i-1].indexOf(':nth-of-type(') !== -1 ) {
        cosmeticFilterCandidates.push('##body');
    }

    // https://github.com/gorhill/uBlock/issues/1545
    // Network filter candidates from all other elements found at point (x, y).
    if ( typeof x === 'number' ) {
        var attrName = pickerRoot.id + '-clickblind';
        var previous;
        elem = first;
        while ( elem !== null ) {
            previous = elem;
            elem.setAttribute(attrName, '');
            elem = elementFromPoint(x, y);
            if ( elem === null || elem === previous ) {
                break;
            }
            netFilterFromElement(elem);
        }
        var elems = document.querySelectorAll('[' + attrName + ']');
        i = elems.length;
        while ( i-- ) {
            elems[i].removeAttribute(attrName);
        }

        netFilterFromElement(document.body);
    }

    return netFilterCandidates.length + cosmeticFilterCandidates.length;
};

/*******************************************************************************

    filterToDOMInterface.set
    @desc   Look-up all the HTML elements matching the filter passed in
            argument.
    @param  string, a cosmetic or network filter.
    @param  function, called once all items matching the filter have been
            collected.
    @return array, or undefined if the filter is invalid.

    filterToDOMInterface.preview
    @desc   Apply/unapply filter to the DOM.
    @param  string, a cosmetic of network filter, or literal false to remove
            the effects of the filter on the DOM.
    @return undefined.

    TODO: need to be revised once I implement chained cosmetic operators.

*/
var filterToDOMInterface = (function() {
    // Net filters: we need to lookup manually -- translating into a foolproof
    // CSS selector is just not possible.
    var fromNetworkFilter = function(filter) {
        var out = [];
        // https://github.com/chrisaljoudi/uBlock/issues/945
        // Transform into a regular expression, this allows the user to edit and
        // insert wildcard(s) into the proposed filter.
        var reStr = '';
        if ( filter.length > 1 && filter.charAt(0) === '/' && filter.slice(-1) === '/' ) {
            reStr = filter.slice(1, -1);
        }
        else {
            var rePrefix = '', reSuffix = '';
            if ( filter.slice(0, 2) === '||' ) {
                filter = filter.replace('||', '');
            } else {
                if ( filter.charAt(0) === '|' ) {
                    rePrefix = '^';
                    filter = filter.slice(1);
                }
            }
            if ( filter.slice(-1) === '|' ) {
                reSuffix = '$';
                filter = filter.slice(0, -1);
            }
            reStr = rePrefix +
                    filter.replace(/[.+?${}()|[\]\\]/g, '\\$&').replace(/[\*^]+/g, '.*') +
                    reSuffix;
        }
        var reFilter = null;
        try {
            reFilter = new RegExp(reStr);
        }
        catch (e) {
            return out;
        }

        // Lookup by tag names.
        var src1stProps = netFilter1stSources;
        var src2ndProps = netFilter2ndSources;
        var srcProp, src;
        var elems = document.querySelectorAll(Object.keys(src1stProps).join()),
            iElem = elems.length,
            elem;
        while ( iElem-- ) {
            elem = elems[iElem];
            srcProp = src1stProps[elem.localName];
            src = elem[srcProp];
            if ( typeof src !== 'string' || src.length === 0 ) {
                srcProp = src2ndProps[elem.localName];
                src = elem[srcProp];
            }
            if ( src && reFilter.test(src) ) {
                out.push({
                    type: 'network',
                    elem: elem,
                    src: srcProp,
                    opts: filterTypes[elem.localName],
                });
            }
        }

        // Find matching background image in current set of candidate elements.
        elems = candidateElements;
        iElem = elems.length;
        while ( iElem-- ) {
            elem = elems[iElem];
            if ( reFilter.test(backgroundImageURLFromElement(elem)) ) {
                out.push({
                    type: 'network',
                    elem: elem,
                    style: 'background-image',
                    opts: 'image',
                });
            }
        }

        return out;
    };

    // Cosmetic filters: these are straight CSS selectors.
    // TODO: This is still not working well for a[href], because there are many
    // ways to compose a valid href to the same effective URL. One idea is to
    // normalize all a[href] on the page, but for now I will wait and see, as I
    // prefer to refrain from tampering with the page content if I can avoid it.
    var fromPlainCosmeticFilter = function(filter) {
        var elems;
        try {
            elems = document.querySelectorAll(filter);
        }
        catch (e) {
            return;
        }
        var out = [], iElem = elems.length;
        while ( iElem-- ) {
            out.push({ type: 'cosmetic', elem: elems[iElem]});
        }
        return out;
    };

    // https://github.com/gorhill/uBlock/issues/1772
    // Handle procedural cosmetic filters.
    var fromCompiledCosmeticFilter = function(raw) {
        if ( typeof raw !== 'string' ) { return; }
        var o;
        try {
            o = JSON.parse(raw);
        } catch(ex) {
            return;
        }
        var elems;
        if ( o.style ) {
            elems = document.querySelectorAll(o.style[0]);
            lastAction = o.style[0] + ' {' + o.style[1] + '}';
        } else if ( o.tasks ) {
            elems = vAPI.domFilterer.createProceduralFilter(o).exec();
        }
        if ( !elems ) { return; }
        var out = [];
        for ( var i = 0, n = elems.length; i < n; i++ ) {
            out.push({ type: 'cosmetic', elem: elems[i] });
        }
        return out;
    };

    var lastFilter,
        lastResultset,
        lastAction,
        appliedStyleTag,
        applied = false,
        previewing = false;

    var queryAll = function(filter, callback) {
        filter = filter.trim();
        if ( filter === lastFilter ) {
            callback(lastResultset);
            return;
        }
        unapply();
        if ( filter === '' ) {
            lastFilter = '';
            lastResultset = [];
            callback(lastResultset);
            return;
        }
        lastFilter = filter;
        lastAction = undefined;
        if ( filter.lastIndexOf('##', 0) === -1 ) {
            lastResultset = fromNetworkFilter(filter);
            if ( previewing ) { apply(); }
            callback(lastResultset);
            return;
        }
        var selector = filter.slice(2);
        lastResultset = fromPlainCosmeticFilter(selector);
        if ( lastResultset ) {
            if ( previewing ) { apply(); }
            callback(lastResultset);
            return;
        }
        // Procedural cosmetic filter
        vAPI.messaging.send(
            'elementPicker',
            { what: 'compileCosmeticFilterSelector', selector: selector },
            function(response) {
                lastResultset = fromCompiledCosmeticFilter(response);
                if ( previewing ) { apply(); }
                callback(lastResultset);
            }
        );
    };

    var applyHide = function() {
        var htmlElem = document.documentElement,
            items = lastResultset,
            item, elem, style;
        for ( var i = 0, n = items.length; i < n; i++ ) {
            item = items[i];
            elem = item.elem;
            // https://github.com/gorhill/uBlock/issues/1629
            if ( elem === pickerRoot ) {
                continue;
            }
            style = elem.style;
            if (
                (elem !== htmlElem) &&
                (item.type === 'cosmetic' || item.type === 'network' && item.src !== undefined)
            ) {
                item.display = style.getPropertyValue('display');
                item.displayPriority = style.getPropertyPriority('display');
                style.setProperty('display', 'none', 'important');
            }
            if ( item.type === 'network' && item.style === 'background-image' ) {
                item.backgroundImage = style.getPropertyValue('background-image');
                item.backgroundImagePriority = style.getPropertyPriority('background-image');
                style.setProperty('background-image', 'none', 'important');
            }
        }
    };

    var unapplyHide = function() {
        var items = lastResultset, item;
        for ( var i = 0, n = items.length; i < n; i++ ) {
            item = items[i];
            if ( item.hasOwnProperty('display') ) {
                item.elem.style.setProperty(
                    'display',
                    item.display,
                    item.displayPriority
                );
                delete item.display;
            }
            if ( item.hasOwnProperty('backgroundImage') ) {
                item.elem.style.setProperty(
                    'background-image',
                    item.backgroundImage,
                    item.backgroundImagePriority
                );
                delete item.backgroundImage;
            }
        }
    };

    var unapplyStyle = function() {
        if ( !appliedStyleTag || appliedStyleTag.parentNode === null ) {
            return;
        }
        appliedStyleTag.parentNode.removeChild(appliedStyleTag);
    };

    var applyStyle = function() {
        if ( !appliedStyleTag ) {
            appliedStyleTag = document.createElement('style');
            appliedStyleTag.setAttribute('type', 'text/css');
        }
        appliedStyleTag.textContent = lastAction;
        if ( appliedStyleTag.parentNode === null ) {
            document.head.appendChild(appliedStyleTag);
        }
    };

    var apply = function() {
        if ( applied ) {
            unapply();
        }
        if ( lastResultset === undefined ) {
            return;
        }
        if ( typeof lastAction === 'string' ) {
            applyStyle();
        } else {
            applyHide();
        }
        applied = true;
    };

    var unapply = function() {
        if ( !applied ) {
            return;
        }
        if ( typeof lastAction === 'string' ) {
            unapplyStyle();
        } else {
            unapplyHide();
        }
        applied = false;
    };

    var preview = function(filter) {
        previewing = filter !== false;
        if ( previewing ) {
            queryAll(filter, function(items) {
                if ( items !== undefined ) {
                    apply();
                }
            });
        } else {
            unapply();
        }
        pickerBody.classList.toggle('preview', previewing);
    };

    return {
        previewing: function() { return previewing; },
        preview: preview,
        set: queryAll
    };
})();

/******************************************************************************/

var userFilterFromCandidate = function(callback) {
    var v = rawFilterFromTextarea();
    filterToDOMInterface.set(v, function(items) {
        if ( !items || items.length === 0 ) {
            callback();
            return;
        }

        // https://github.com/gorhill/uBlock/issues/738
        // Trim dots.
        var hostname = window.location.hostname;
        if ( hostname.slice(-1) === '.' ) {
            hostname = hostname.slice(0, -1);
        }

        // Cosmetic filter?
        if ( v.lastIndexOf('##', 0) === 0 ) {
            callback(hostname + v);
            return;
        }

        // Assume net filter
        var opts = [];

        // If no domain included in filter, we need domain option
        if ( v.lastIndexOf('||', 0) === -1 ) {
            opts.push('domain=' + hostname);
        }

        var item = items[0];
        if ( item.opts ) {
            opts.push(item.opts);
        }

        if ( opts.length ) {
            v += '$' + opts.join(',');
        }

        callback(v);
    });
};

/******************************************************************************/

var onCandidateChanged = (function() {
    var process = function(items) {
        var elems = [], valid = items !== undefined;
        if ( valid ) {
            for ( var i = 0; i < items.length; i++ ) {
                elems.push(items[i].elem);
            }
        }
        pickerBody.querySelector('#resultsetCount').textContent = valid ?
            items.length.toLocaleString() :
            'E';
        dialog.querySelector('section').classList.toggle('invalidFilter', !valid);
        dialog.querySelector('#create').disabled = elems.length === 0;
        highlightElements(elems, true);
    };

    return function() {
        filterToDOMInterface.set(rawFilterFromTextarea(), process);
    };
})();

/******************************************************************************/

var candidateFromFilterChoice = function(filterChoice) {
    var slot = filterChoice.slot;
    var filters = filterChoice.filters;
    var filter = filters[slot];

    if ( filter === undefined ) {
        return '';
    }

    // For net filters there no such thing as a path
    if ( filter.lastIndexOf('##', 0) !== 0 ) {
        return filter;
    }

    // At this point, we have a cosmetic filter

    // Modifier means "target broadly". Hence:
    // - Do not compute exact path.
    // - Discard narrowing directives.
    if ( filterChoice.modifier ) {
        filter = filter.replace(/:nth-of-type\(\d+\)/, '');
        // Remove the id if one or more classes exist.
        if ( filter.charAt(2) === '#' && filter.indexOf('.') !== -1 ) {
            filter = filter.replace(/#[^#.]+/, '');
        }
        return filter;
    }

    // Return path: the target element, then all siblings prepended
    var selector = '', joiner = '';
    for ( ; slot < filters.length; slot++ ) {
        filter = filters[slot];
        // Remove all classes when an id exists.
        if ( filter.charAt(2) === '#' ) {
            filter = filter.replace(/\..+$/, '');
        }
        selector = filter.slice(2) + joiner + selector;
        // Stop at any element with an id: these are unique in a web page
        if ( filter.lastIndexOf('###', 0) === 0 ) {
            break;
        }
        // Stop if current selector matches only one element on the page
        if ( document.querySelectorAll(selector).length === 1 ) {
            break;
        }
        joiner = ' > ';
    }

    // https://github.com/gorhill/uBlock/issues/2519
    if (
        slot === filters.length &&
        document.querySelectorAll(selector).length > 1
    ) {
        selector = 'body > ' + selector;
    }

    return '##' + selector;
};

/******************************************************************************/

var filterChoiceFromEvent = function(ev) {
    var li = ev.target;
    var isNetFilter = li.textContent.slice(0, 2) !== '##';
    var r = {
        filters: isNetFilter ? netFilterCandidates : cosmeticFilterCandidates,
        slot: 0,
        modifier: ev.ctrlKey || ev.metaKey
    };
    while ( li.previousSibling !== null ) {
        li = li.previousSibling;
        r.slot += 1;
    }
    return r;
};

/******************************************************************************/

var onDialogClicked = function(ev) {
    if ( ev.isTrusted === false ) { return; }

    // If the dialog is hidden, clicking on it force it to become visible.
    if ( dialog.classList.contains('hide') ) {
        dialog.classList.add('show');
        dialog.classList.remove('hide');
    }

    else if ( ev.target === null ) {
        /* do nothing */
    }

    else if ( ev.target.id === 'create' ) {
        // We have to exit from preview mode: this guarantees matching elements
        // will be found for the candidate filter.
        filterToDOMInterface.preview(false);
        userFilterFromCandidate(function(filter) {
            if ( !filter ) { return; }
            var d = new Date();
            vAPI.messaging.send(
                'elementPicker',
                {
                    what: 'createUserFilter',
                    filters: '! ' + d.toLocaleString() + ' ' + window.location.href + '\n' + filter,
                    pageDomain: window.location.hostname
                }
            );
            filterToDOMInterface.preview(rawFilterFromTextarea());
            stopPicker();
        });
    }

    else if ( ev.target.id === 'pick' ) {
        unpausePicker();
    }

    else if ( ev.target.id === 'quit' ) {
        filterToDOMInterface.preview(false);
        stopPicker();
    }

    else if ( ev.target.id === 'preview' ) {
        if ( filterToDOMInterface.previewing() ) {
            filterToDOMInterface.preview(false);
        } else {
            filterToDOMInterface.preview(rawFilterFromTextarea());
        }
        highlightElements(targetElements, true);
    }

    else if ( ev.target.parentNode.classList.contains('changeFilter') ) {
        taCandidate.value = candidateFromFilterChoice(filterChoiceFromEvent(ev));
        onCandidateChanged();
    }

    ev.stopPropagation();
    ev.preventDefault();
};

/******************************************************************************/

var removeAllChildren = function(parent) {
    while ( parent.firstChild ) {
        parent.removeChild(parent.firstChild);
    }
};

/******************************************************************************/

// TODO: for convenience I could provide a small set of net filters instead
// of just a single one. Truncating the right-most part of the path etc.

var showDialog = function(options) {
    pausePicker();

    options = options || {};

    // Typically the dialog will be forced to be visible when using a
    // touch-aware device.
    dialog.classList.toggle('show', options.show === true);
    dialog.classList.remove('hide');

    // Create lists of candidate filters
    var populate = function(src, des) {
        var root = dialog.querySelector(des);
        var ul = root.querySelector('ul');
        removeAllChildren(ul);
        var li;
        for ( var i = 0; i < src.length; i++ ) {
            li = document.createElement('li');
            li.textContent = src[i];
            ul.appendChild(li);
        }
        root.style.display = src.length !== 0 ? '' : 'none';
    };

    populate(netFilterCandidates, '#netFilters');
    populate(cosmeticFilterCandidates, '#cosmeticFilters');

    dialog.querySelector('ul').style.display =
        netFilterCandidates.length || cosmeticFilterCandidates.length
            ? ''
            : 'none';
    dialog.querySelector('#create').disabled = true;

    // Auto-select a candidate filter

    if ( bestCandidateFilter === null ) {
        taCandidate.value = '';
        return;
    }

    var filterChoice = {
        filters: bestCandidateFilter.filters,
        slot: bestCandidateFilter.slot,
        modifier: options.modifier || false
    };

    taCandidate.value = candidateFromFilterChoice(filterChoice);
    onCandidateChanged();
};

function getSelectorForCurrentTarget(){
/*
    cosmeticFilterFromElement()
    if(!bestCandidateFilter) return null;
    var filterChoice = {
        filters: bestCandidateFilter.filters,
        slot: bestCandidateFilter.slot,
        modifier: true
    };
*/
    var first = targetElements[0];
    if(!first) return null;

    return cosmeticFilterFromElement(first, true) || null;
    //return candidateFromFilterChoice(filterChoice);
}

/******************************************************************************/

var zap = function() {
    if ( targetElements.length === 0 ) { return; }
    var elem = targetElements[0],
        style = window.getComputedStyle(elem);
    // Heuristic to detect scroll-locking: remove such lock when detected.
    if ( parseInt(style.zIndex, 10) >= 1000 || style.position === 'fixed' ) {
        document.body.style.setProperty('overflow', 'auto', 'important');
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
    }
    elem.parentNode.removeChild(elem);
    elem = elementFromPoint();
    highlightElements(elem ? [elem] : []);
};

/******************************************************************************/

var elementFromPoint = (function() {
    var lastX, lastY;

    return function(x, y) {
        if ( x !== undefined ) {
            lastX = x; lastY = y;
        } else if ( lastX !== undefined ) {
            x = lastX; y = lastY;
        } else {
            return null;
        }
        if ( !pickerRoot ) { return null; }
        pickerRoot.style.pointerEvents = 'none';
        var elem = document.elementFromPoint(x, y);
        if ( elem === document.body || elem === document.documentElement ) {
            elem = null;
        }
        pickerRoot.style.pointerEvents = '';
        return elem;
    };
})();

/******************************************************************************/

var onSvgHovered = (function() {
    var timer = null;
    var mx = 0, my = 0;

    var onTimer = function() {
        timer = null;
        var elem = elementFromPoint(mx, my);
        highlightElements(elem ? [elem] : []);
    };

    return function onMove(ev) {
        mx = ev.clientX;
        my = ev.clientY;
        if ( timer === null ) {
            timer = vAPI.setTimeout(onTimer, 40);
        }
    };
})();

/*******************************************************************************

    Swipe right:
        If picker not paused: quit picker
        If picker paused and dialog visible: hide dialog
        If picker paused and dialog not visible: quit picker

    Swipe left:
        If picker paused and dialog not visible: show dialog

*/

var onSvgTouchStartStop = (function() {
    var startX,
        startY;
    return function onTouch(ev) {
        if ( ev.type === 'touchstart' ) {
            startX = ev.touches[0].screenX;
            startY = ev.touches[0].screenY;
            return;
        }
        if ( startX === undefined ) { return; }
        if ( ev.cancelable === false ) { return; }
        var stopX = ev.changedTouches[0].screenX,
            stopY = ev.changedTouches[0].screenY,
            angle = Math.abs(Math.atan2(stopY - startY, stopX - startX)),
            distance = Math.sqrt(
                Math.pow(stopX - startX, 2),
                Math.pow(stopY - startY, 2)
            );
        // Interpret touch events as a click events if swipe is not valid.
        if ( distance < 32 ) {
            onSvgClicked({
                type: 'touch',
                target: ev.target,
                clientX: ev.changedTouches[0].pageX,
                clientY: ev.changedTouches[0].pageY,
                isTrusted: ev.isTrusted
            });
            ev.preventDefault();
            return;
        }
        if ( distance < 64 ) { return; }
        var angleUpperBound = Math.PI * 0.25 * 0.5,
            swipeRight = angle < angleUpperBound;
        if ( swipeRight === false && angle < Math.PI - angleUpperBound ) {
            return;
        }
        ev.preventDefault();
        // Swipe left.
        if ( swipeRight === false ) {
            if ( pickerBody.classList.contains('paused') ) {
                dialog.classList.remove('hide');
                dialog.classList.add('show');
            }
            return;
        }
        // Swipe right.
        if (
            pickerBody.classList.contains('paused') &&
            dialog.classList.contains('show')
        ) {
            dialog.classList.remove('show');
            dialog.classList.add('hide');
            return;
        }
        stopPicker();
    };
})();

/******************************************************************************/

var onSvgClicked = function(ev) {
    if ( ev.isTrusted === false ) { return; }

    // If zap mode, highlight element under mouse, this makes the zapper usable
    // on touch screens.
    if ( pickerBody.classList.contains('zap') ) {
        var elem = targetElements.lenght !== 0 && targetElements[0];
        if ( !elem || ev.target !== svgIslands ) {
            elem = elementFromPoint(ev.clientX, ev.clientY);
            if ( elem !== null ) {
                highlightElements([elem]);
                return;
            }
        }
        zap();
        if ( !ev.shiftKey ) {
            stopPicker();
        }
        return;
    }
    // https://github.com/chrisaljoudi/uBlock/issues/810#issuecomment-74600694
    // Unpause picker if:
    // - click outside dialog AND
    // - not in preview mode
    if ( pickerBody.classList.contains('paused') ) {
        if ( filterToDOMInterface.previewing() === false ) {
            unpausePicker();
        }
        return;
    }
    if ( filtersFrom(null /*ev.clientX, ev.clientY*/) === 0 ) {
        return;
    }
    showDialog({ show: ev.type === 'touch' });
};

/******************************************************************************/

var svgListening = function(on) {
    var action = (on ? 'add' : 'remove') + 'EventListener';
    svgRoot[action]('mousemove', onSvgHovered, { passive: true });
};



function hideAllExcept(node){
    hideAllExceptInternal(node, document.body);
}
function hideAllExceptInternal(node, b){
    if(node == b) return;
    if(b.contains(node)){
        for(var c = b.firstChild; c; c = c.nextSibling){
            hideAllExceptInternal(node, c);
        }
    }else{
        hide(b);
    }
}

function hide(b, strong){
    if(b.style){
        for(var i = 0; i < hiddenElements.length; i++){
            if(hiddenElements[i].element == b){
                if(strong) hiddenElements[i].strong = true;
                return;
            }
        }
        
        hiddenElements.push({ element: b, display: b.style.display, visibility: b.style.visibility, strong: strong });
        b.style.display = 'none';
        b.style.visibility = 'hidden';
    }
}

window.hideAllExcept = hideAllExcept;
window.hide = hide;
  
var hiddenElements = [];

function unhideElements(totalReset){
    if(!hiddenElements.length) return;
    hiddenElements.forEach(x => {
        if(totalReset || !x.strong){
            x.element.style.display = x.display;
            x.element.style.visibility = x.visibility;
        }
    });
    if(totalReset) hiddenElements = [];
    else hiddenElements = hiddenElements.filter(x => x.strong);
    highlightElements(targetElements, true);
}



/******************************************************************************/

var onKeyPressed = function(ev) {

    if(ev.key === 's'){
        
        var first = targetElements[0];
        if(first && first.parentElement){
            highlightElements([first.parentElement], false);
            //showDialog();
        }
        
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    
    if(ev.key == ' '){
        unpausePicker();
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    
    if(ev.key == 'r'){
        unhideElements(true);
      
  
      setvalues(() => {
        
        blogInfo.to_delete = null;
        blogInfo.article_selector = null;

        xhr('PATCH', '/shaman_bloginfo?' + hostQuery, { article_selector: null, to_delete: null}, result => {

        });
      });
      
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    if(ev.key == 'x'){
        var first = targetElements[0];
        if(first){
            hide(first, true);
            originalTargetElement = first.parentElement;
            highlightElements([], true);
          
          
      
            
            setvalues(() => {
                var f = cosmeticFilterFromElement(first, true);
                if(!blogInfo.to_delete || blogInfo.to_delete.split("\n").indexOf(f) == -1)
                  blogInfo.to_delete = blogInfo.to_delete ? blogInfo.to_delete + "\n" + f : f;
                
                xhr('PATCH', '/shaman_bloginfo?' + hostQuery, { example_url: window.location.href, to_delete: blogInfo.to_delete}, result => {
                    
                });
            });
            
        }
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    if(ev.key == 'p'){
        unhideElements();
        var first = targetElements[0];
        if(first){
            hideAllExcept(first);
            highlightElements(targetElements, true);
            
            
            setvalues(() => {
                xhr('PATCH', '/shaman_bloginfo?' + hostQuery, {example_url: window.location.href, article_selector: cosmeticFilterFromElement(first, true)}, result => {
                    
                });
            });
            
            
            
        }
    
        ev.stopPropagation();
        ev.preventDefault();
        return;        
    }
    if(ev.key === 'Enter'){
    
        if ( filtersFrom(null) !== 0 ){
            showDialog({ show: ev.type === 'touch' });
        }
    
    
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    if(ev.key === 'w'){
        var current = targetElements[0];
        var k = originalTargetElement;
        if(k && current){
            var next = null;
            while(k){
                if(k.parentElement == current){ next = k; break; }
                k = k.parentElement
            }
            if(next){
                highlightElements([next], false, true);
                //showDialog();
            }
        }
    
        ev.stopPropagation();
        ev.preventDefault();
        return;
    }
    // Delete
    if ( ev.key === 'Delete' && pickerBody.classList.contains('zap') ) {
        ev.stopPropagation();
        ev.preventDefault();
        zap();
        return;
    }
    // Esc
    if ( ev.key === 'Escape' || ev.which === 27 ) {
        ev.stopPropagation();
        ev.preventDefault();
        filterToDOMInterface.preview(false);
        stopPicker();
        return;
    }
    
};

/******************************************************************************/

// https://github.com/chrisaljoudi/uBlock/issues/190
// May need to dynamically adjust the height of the overlay + new position
// of highlighted elements.

var onScrolled = function() {
    highlightElements(targetElements, true);
};

/******************************************************************************/

var pausePicker = function() {
    pickerBody.classList.add('paused');
    svgListening(false);
};

/******************************************************************************/

var unpausePicker = function() {
    filterToDOMInterface.preview(false);
    pickerBody.classList.remove('paused');
    svgListening(true);
};

/******************************************************************************/

// Let's have the element picker code flushed from memory when no longer
// in use: to ensure this, release all local references.

var stopPicker = function() {
    vAPI.shutdown.remove(stopPicker);

    targetElements = [];
    candidateElements = [];
    bestCandidateFilter = null;

    if ( pickerRoot === null ) { return; }

    // https://github.com/gorhill/uBlock/issues/2060
    if ( vAPI.domFilterer instanceof Object ) {
        vAPI.userStylesheet.remove(pickerCSS1);
        vAPI.userStylesheet.remove(pickerCSS2);
        vAPI.userStylesheet.apply();
    }
    vAPI.domFilterer.unexcludeNode(pickerRoot);

    window.removeEventListener('scroll', onScrolled, true);
    window.removeEventListener('resize', onScrolled, true);
    pickerRoot.contentWindow.removeEventListener('keydown', onKeyPressed, true);
    taCandidate.removeEventListener('input', onCandidateChanged);
    dialog.removeEventListener('click', onDialogClicked);
    svgListening(false);
    svgRoot.removeEventListener('click', onSvgClicked);
    svgRoot.removeEventListener('touchstart', onSvgTouchStartStop);
    svgRoot.removeEventListener('touchend', onSvgTouchStartStop);
    pickerRoot.parentNode.removeChild(pickerRoot);
    pickerRoot.removeEventListener('load', stopPicker);
    pickerRoot =
    pickerBody =
    dialog =
    svgRoot = svgOcean = svgIslands =
    taCandidate = null;

    window.focus();
};

/******************************************************************************/

var startPicker = function(details) {
    pickerRoot.addEventListener('load', stopPicker);

    var frameDoc = pickerRoot.contentDocument;
    var parsedDom = (new DOMParser()).parseFromString(
        details.frameContent,
        'text/html'
    );
//alert(">>>>" + details.frameContent)
    // Provide an id users can use as anchor to personalize uBO's element
    // picker style properties.
    parsedDom.documentElement.id = 'ublock0-epicker';

    frameDoc.replaceChild(
        frameDoc.adoptNode(parsedDom.documentElement),
        frameDoc.documentElement
    );

    pickerBody = frameDoc.body;
    pickerBody.setAttribute('lang', navigator.language);
    pickerBody.classList.toggle('zap', details.zap === true);
//alert(pickerBody.outerHTML)
    dialog = pickerBody.querySelector('aside');
    dialog.addEventListener('click', onDialogClicked);

    taCandidate = dialog.querySelector('textarea');
    taCandidate.addEventListener('input', onCandidateChanged);

    svgRoot = pickerBody.querySelector('svg');
    svgOcean = svgRoot.firstChild;
    svgIslands = svgRoot.lastChild;
    svgRoot.addEventListener('click', onSvgClicked);
    svgRoot.addEventListener('touchstart', onSvgTouchStartStop);
    svgRoot.addEventListener('touchend', onSvgTouchStartStop);
    svgListening(true);

    window.addEventListener('scroll', onScrolled, true);
    window.addEventListener('resize', onScrolled, true);
    pickerRoot.contentWindow.addEventListener('keydown', onKeyPressed, true);
    pickerRoot.contentWindow.focus();

    // Restore net filter union data if it originate from the same URL.
    var eprom = details.eprom || null;
    if ( eprom !== null && eprom.lastNetFilterSession === lastNetFilterSession ) {
        lastNetFilterHostname = eprom.lastNetFilterHostname || '';
        lastNetFilterUnion = eprom.lastNetFilterUnion || '';
    }

    // Auto-select a specific target, if any, and if possible

    highlightElements([], true);

    // Try using mouse position
    if ( details.clientX !== -1 ) {
        if ( filtersFrom(details.clientX, details.clientY) !== 0 ) {
            showDialog();
            return;
        }
    }

    // No mouse position available, use suggested target
    var target = details.target || '';
    var pos = target.indexOf('\t');
    if ( pos === -1 ) {
        return;
    }
    var srcAttrMap = {
        'a': 'href',
        'audio': 'src',
        'embed': 'src',
        'iframe': 'src',
        'img': 'src',
        'video': 'src',
    };
    var tagName = target.slice(0, pos);
    var url = target.slice(pos + 1);
    var attr = srcAttrMap[tagName];
    if ( attr === undefined ) {
        return;
    }
    var elems = document.querySelectorAll(tagName + '[' + attr + ']');
    var i = elems.length;
    var elem, src;
    while ( i-- ) {
        elem = elems[i];
        src = elem[attr];
        if ( typeof src !== 'string' || src === '' ) {
            continue;
        }
        if ( src !== url ) {
            continue;
        }
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        filtersFrom(elem);
        showDialog({ modifier: true });
        return;
    }

    // A target was specified, but it wasn't found: abort.
    stopPicker();
};

/******************************************************************************/

var bootstrapPicker = function() {
    pickerRoot.removeEventListener('load', bootstrapPicker);
    vAPI.shutdown.add(stopPicker);
    vAPI.messaging.send(
        'elementPicker',
        { what: 'elementPickerArguments' },
        startPicker
    );
    setTimeout(function(){
        pickerRoot.contentWindow.focus();
    }, 100);
    
};


/******************************************************************************/

pickerRoot = document.createElement('iframe');
pickerRoot.id = vAPI.sessionId;

var pickerCSSStyle = [
    'background: transparent',
    'border: 0',
    'border-radius: 0',
    'box-shadow: none',
    'display: block',
    'height: 100%',
    'left: 0',
    'margin: 0',
    'max-height: none',
    'max-width: none',
    'opacity: 1',
    'outline: 0',
    'padding: 0',
    'position: fixed',
    'top: 0',
    'visibility: visible',
    'width: 100%',
    'z-index: 2147483647',
    ''
].join(' !important;');
pickerRoot.style.cssText = pickerCSSStyle;

var pickerCSS1 = [
    '#' + pickerRoot.id + ' {',
        pickerCSSStyle,
    '}'
].join('\n');
var pickerCSS2 = [
    '[' + pickerRoot.id + '-clickblind] {',
        'pointer-events: none !important;',
    '}'
].join('\n');

// https://github.com/gorhill/uBlock/issues/1529
//   In addition to inline styles, harden the element picker styles by using
//   dedicated CSS rules.
vAPI.userStylesheet.add(pickerCSS1);
vAPI.userStylesheet.add(pickerCSS2);
vAPI.userStylesheet.apply();

// https://github.com/gorhill/uBlock/issues/2060
vAPI.domFilterer.excludeNode(pickerRoot);

pickerRoot.addEventListener('load', bootstrapPicker);
document.documentElement.appendChild(pickerRoot);


/******************************************************************************/

})();



/*
var menu = document.createElement('menu');
menu.type = 'context'
var m = document.createElement('menuitem');


m.label = "Create selector";
m.addEventListener('click', event =>{
  alert(event.target);
  
  
});
menu.id = 'ShamanVisualSelectorGeneratorMenu';
menu.appendChild(m);
document.body.appendChild(menu);
document.body.setAttribute('contextmenu', menu.id);
*/


onPickerLoaded();
