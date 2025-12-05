"use client"
import React from 'react';

const Ranger = () => {
    return (
        <div data-indexer-rule="show" data-show-counter="" data-change-counter="always" jsf-filter="">
            <div>Prix</div>

            <div data-query-type="meta_query" data-query-var="_price" data-smart-filter="range" data-filter-id="142276" data-apply-type="ajax" data-content-provider="epro-loop-builder" data-additional-providers="" data-query-id="produit_grid" data-active-label="Prix" data-layout-options="{&quot;show_label&quot;:true,&quot;display_options&quot;:{&quot;show_items_label&quot;:false,&quot;show_decorator&quot;:false,&quot;filter_image_size&quot;:&quot;full&quot;,&quot;show_counter&quot;:false}}" data-query-var-suffix="range" data-apply-on="value" data-format="{&quot;decimal_num&quot;:0,&quot;decimal_sep&quot;:&quot;.&quot;,&quot;thousands_sep&quot;:&quot;&quot;}">
                <fieldset>
                    <legend className='hidden'>Prix - slider</legend>
                    <div>
                        <div></div>
                    </div>
                    <input type="range" step="1" min="1165" max="2730" value="1165" aria-label="Minimal value" />
                    <input type="range" step="1" min="1165" max="2730" value="2730" aria-label="Maximum value" />
                </fieldset>
                <div>
                    <span>€</span><span>1165</span><span>.00</span> — <span>€</span><span>2730</span><span>.00</span>
                </div>

            </div>
        </div>

    );
};

export default Ranger;

