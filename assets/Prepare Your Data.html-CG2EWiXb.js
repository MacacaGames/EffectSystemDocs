import{_ as n,c as a,a as e,o as t}from"./app-ClPqehFf.js";const p="/EffectSystemDocs/assets/effectgroup-BExpNSHB.png",o={};function c(i,s){return t(),a("div",null,s[0]||(s[0]=[e('<h1 id="prepare-your-data" tabindex="-1"><a class="header-anchor" href="#prepare-your-data"><span>Prepare Your Data</span></a></h1><p>After understanding the concept of the EffectSystem, it&#39;s time to prepare your data. In previous examples, we directly created new <code>EffectInfo</code> using constructors, but there are other methods for setting up your effect data.</p><h3 id="unity-serialization" tabindex="-1"><a class="header-anchor" href="#unity-serialization"><span>Unity Serialization</span></a></h3><p>A straightforward approach is to create a <code>List&lt;EffectInfo&gt;</code> within a script (either a MonoBehaviour or ScriptableObject) in your project, and use the Unity Inspector to edit them.</p><h3 id="effectgroup" tabindex="-1"><a class="header-anchor" href="#effectgroup"><span>EffectGroup</span></a></h3><p><code>EffectGroup</code> is a pre-defined Unity ScriptableObject designed to help you store <code>EffectInfo</code> in your project. It offers several useful features:</p><ul><li>Group a List of EffectInfos. Use EffectGroup directly in EffectSystem APIs.</li><li>Export <code>EffectInfo</code> data to JSON format.</li><li>Import <code>EffectInfo</code> data from JSON.</li><li></li></ul><img src="'+p+`"><h3 id="google-sheet-template" tabindex="-1"><a class="header-anchor" href="#google-sheet-template"><span>Google Sheet Template</span></a></h3><p>For more convenient batch data editing, we’ve designed a Google Sheet template to assist with this process.</p><p>Here’s an example table: <a href="https://docs.google.com/spreadsheets/d/1N_Bzdc1XSgyqXYlBlHYp0-XWBlFA-AAw_AUBdIEWj5U/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Effect Data Sample Table</a></p><p>On the <code>Effects</code> tab in the sheet, the <code>A1</code> field converts the entire Google Sheet&#39;s columns into a JSON file. You can save the JSON string anywhere (such as in a .json file) and deserialize it into a <code>List&lt;EffectInfo&gt;</code> at runtime.</p><p>Please make a copy of this sample and modify it as needed!</p><h3 id="pre-baked-string-for-strong-type-usage" tabindex="-1"><a class="header-anchor" href="#pre-baked-string-for-strong-type-usage"><span>Pre Baked String for strong Type usage</span></a></h3><p>On the <code>ScriptOptions</code> tab in the sheet, you can copy the <code>A1</code> field directly into the Effect Editor Window to pre-bake all string parameters from your sheet into a script.</p><blockquote><p>First, press the Select button to choose the path where the script will be saved. Then, paste the JSON into the input box below, and press Bake to add a new C# script to the specified path.</p></blockquote><p>Since the system uses strings as IDs to reference other resources, it’s recommended to use pre-baked strings for all your parameters to ensure safer and more reliable usage.</p><h3 id="effectdataprovider" tabindex="-1"><a class="header-anchor" href="#effectdataprovider"><span>EffectDataProvider</span></a></h3><p><code>EffectDataProvider</code> supplies the runtime data resources needed for the system. For example, if you’re using the <code>subInfo</code> feature, the system requires a delegate to retrieve <code>EffectInfo</code> by its ID at runtime. Since different projects manage their own <code>EffectInfo</code> data, you need to register the appropriate methods to ensure all features work correctly.</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">EffectDataProvider</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Func<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> List<span class="token punctuation">&lt;</span>EffectInfo<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> GetEffectInfo <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetEffectInfoDelegate</span><span class="token punctuation">(</span><span class="token class-name">Func<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> List<span class="token punctuation">&lt;</span>EffectInfo<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> GetEffectInfo<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        EffectDataProvider<span class="token punctuation">.</span>GetEffectInfo <span class="token operator">=</span> GetEffectInfo<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Func<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> List<span class="token punctuation">&lt;</span>EffectViewInfo<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> GetEffectViewInfo <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SeEffectViewInfoDelegate</span><span class="token punctuation">(</span><span class="token class-name">Func<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">,</span> List<span class="token punctuation">&lt;</span>EffectViewInfo<span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> GetEffectViewInfo<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        EffectDataProvider<span class="token punctuation">.</span>GetEffectViewInfo <span class="token operator">=</span> GetEffectViewInfo<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Func<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> GetEffectDescriptionString <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">private</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetEffectDescriptionStringDelegate</span><span class="token punctuation">(</span><span class="token class-name">Func<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> GetEffectDescriptionString<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        EffectDataProvider<span class="token punctuation">.</span>GetEffectDescriptionString <span class="token operator">=</span> GetEffectDescriptionString<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20)]))}const r=n(o,[["render",c],["__file","Prepare Your Data.html.vue"]]),u=JSON.parse('{"path":"/Prepare%20Your%20Data.html","title":"Prepare Your Data","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"Unity Serialization","slug":"unity-serialization","link":"#unity-serialization","children":[]},{"level":3,"title":"EffectGroup","slug":"effectgroup","link":"#effectgroup","children":[]},{"level":3,"title":"Google Sheet Template","slug":"google-sheet-template","link":"#google-sheet-template","children":[]},{"level":3,"title":"Pre Baked String for strong Type usage","slug":"pre-baked-string-for-strong-type-usage","link":"#pre-baked-string-for-strong-type-usage","children":[]},{"level":3,"title":"EffectDataProvider","slug":"effectdataprovider","link":"#effectdataprovider","children":[]}],"git":{"updatedTime":1729752875000,"contributors":[{"name":"oldman","email":"oldman@macaca.onmicrosoft.com","commits":2}]},"filePathRelative":"Prepare Your Data.md"}');export{r as comp,u as data};